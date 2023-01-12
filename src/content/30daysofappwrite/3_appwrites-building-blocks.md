---
day: 3
title: "Appwrite’s building blocks"
description: "Learn about the different microservices that Appwrite uses under the hood."
slug: "building-blocks"
devto_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-s-building-blocks-1936"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--DieyregT--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l3bozwuywt8n49udl0nk.png"
created_at: "2021-05-03T13:36:32Z"
updated_at: "2022-07-04T17:29:26Z"
published_at: "2021-05-03T13:44:32Z"
tags: ["webdev","javascript","flutter","30daysofappwrite"]
user:
  name: "Christy Jacob"
  username: "christyjacob4"
  twitter_username: null
  github_username: "christyjacob4"
  user_id: "119691"
  website_url: null
  profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--xsn7j9ry--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png"
  profile_image_90: "https://res.cloudinary.com/practicaldev/image/fetch/s--IX4ROHsY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png"
---
# Intro
Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a full-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Microservices of Appwrite 
Welcome to Day 3 👋 

Today, we take a deep dive into Appwrite's technology stack and learn what goes on under the hood. We will cover [Appwrite's docker-compose file](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml) and go through all the containers that Appwrite uses. Appwrite was designed to work in a Cloud Native environment, and in keeping this spirit alive,  Appwrite is conveniently packaged as a set of docker containers (18, to be precise!). 

![Appwrite Architecture](https://raw.githubusercontent.com/appwrite/appwrite/master/docs/specs/overview.drawio.svg#1)

This is an overview of Appwrite's architecture, and we will talk about most of these components in the upcoming section. Each container in Appwrite handles a single microservice on its own. Since they've been containerized, each service can scale independently of any of the other microservices.

Currently, all of the Appwrite microservices communicate over the TCP protocol over [a private network](https://docs.docker.com/network/bridge/). You should be aware not to expose any of the services to the public-facing network besides the public ports 80 and 443, which, by default, are used to expose the Appwrite HTTP API.

## Appwrite
This is the main [Appwrite container](https://gist.github.com/eldadfux/977869ff6bdd7312adfd4e629ee15cc5#file-docker-compose-yml-L29), and this is where all the fancy things happen! This container is built off a Dockerfile hosted [here](https://github.com/appwrite/appwrite/blob/master/Dockerfile). The main Appwrite container implements the Appwrite API protocols, and handles authentication, authorization, and rate-limiting. This microservice is completely stateless and can be easily replicated for scalability. 

## Traefik
Traefik is a modern reverse proxy and load balancer written in Go that makes deploying microservices easy. Traefik integrates with your existing infrastructure components and configures itself automatically and dynamically. We use Traefik as the main entry point for the different Appwrite APIs. Traefik is also responsible for serving Appwrite's auto-generated SSL certificates. This microservice is completely stateless.

## Redis
Appwrite uses Redis to serve three main functions. 

* **Caching**: Appwrite uses Redis in-memory cache to fetch database queries faster.  
* **Pub/Sub**: Appwrite uses Redis with Resque as a pub/sub mechanism to transmit messages between the Appwrite API and the different workers. 
* **Scheduled tasks**: Appwrite uses Redis to store and trigger future tasks using the schedule container.

## Appwrite's Workers  
There are a lot of asynchronous tasks that need to happen in Appwrite - a good example is recording usage stats for the Appwrite API. 

We use an internal pub/sub system - [Resque](https://github.com/resque/php-resque) - to accumulate all these tasks. The respective workers consume these tasks and perform the executions independently. We have eight message queues and eight workers paired with them.  

* #### Audits worker 
The [Audits worker](https://github.com/appwrite/appwrite/blob/master/app/workers/audits.php) consumes messages from the `v1-audits` queue. Appwrite has a defined set of system events that can be found [here](https://appwrite.io/docs/webhooks#events). When these events occur, the Audits worker logs them into `mariadb`. The Audits worker makes use of the [utopia-php/audit](https://github.com/utopia-php/audit) library.

* #### Certificates Worker
The [Certificates worker](https://github.com/appwrite/appwrite/blob/master/app/workers/certificates.php) consumes messages from the `v1-certificates` queue. The certificate worker uses `certbot` from Let's Encrypt to create and periodically renew SSL certificates. We will be covering SSL certificates and more about the certificates worker in our upcoming article. So stay tuned to learn more. 

* #### Deletes Worker
The [Deletes worker](https://github.com/appwrite/appwrite/blob/master/app/workers/deletes.php) consumes messages from the `v1-deletes` queue. As the name suggests, it performs deletions in the Appwrite Database. Delete requests for Documents, Users, Projects, Functions etc. are handled by the Deletes Worker. In the present state, the deletes worker is triggered on certain API requests, as well as by the Maintenance worker. 

* #### Functions Worker
The [Functions worker](https://github.com/appwrite/appwrite/blob/master/app/workers/functions.php) consumes messages from the `v1-functions` queue and handles all of the tasks related to Appwrite's Asynchronous Cloud Functions. Synchronous functions skip the Functions worker and are directly sent to the Executor.

* #### The Executor
The [Executor](https://github.com/appwrite/appwrite/blob/master/app/executor.php) is responsible for all communication between Appwrite and the orchestration service in use. It handles executing functions, deleting functions, building the functions, and more.

Cloud functions in Appwrite can be triggered in three ways:
1. [Asynchronously using Events](https://appwrite.io/docs/webhooks#events)
2. [Using a CRON Schedule](https://en.wikipedia.org/wiki/Cron)
3. [Using the Appwrite HTTP API](https://appwrite.io/docs/client/functions?sdk=web#functionsCreateExecution)

The Executor does all the heavy lifting required to get Cloud Functions up and running. From pulling Docker images for the respective environments on startup to managing and running containers and responding to errors, the Executor takes care of it all! 

* #### Mails Worker
The [Mails worker](https://github.com/appwrite/appwrite/blob/master/app/workers/mails.php) consumes messages from the `v1-mails` queue and is responsible for only one function: sending emails! It simply gathers information and uses [PHPMailer](https://github.com/PHPMailer/PHPMailer) to send them.


* #### Tasks Worker
The [Tasks worker](https://github.com/appwrite/appwrite/blob/master/app/workers/tasks.php) consumes messages from the `v1-tasks` queue.

Appwrite's Tasks API allows you to schedule any repeating tasks your app might need to run in the background. Each task is created by defining a CRON schedule and a target HTTP endpoint.

Each task can define any HTTP endpoint with any HTTP method, headers or basic HTTP authentication. Inside your Appwrite console, you can view all your tasks, their current statuses, previous and next runtime, and a response log to view the result of previous executions.


* #### Usage Worker
The [Usage worker](https://github.com/appwrite/appwrite/blob/master/app/workers/usage.php) consumes messages from the `v1-usage` queue and makes use of `statsd` to send messages to `telegraf` over a UDP connection. The usage stats are then logged in `influxDB`, including function execution stats, the total number of requests, storage stats, etc.

* #### Database Worker
The [Database worker](https://github.com/appwrite/appwrite/blob/master/app/workers/databases.php) handles the creation and deletion of database attributes and indexes.

* #### Webhooks Worker
The [Webhooks worker](https://github.com/appwrite/appwrite/blob/master/app/workers/webhooks.php) consumes messages from the `v1-webhooks` queue and triggers the webhooks that were registered in the Appwrite console. The worker checks for the event that occurs and fires the corresponding webhook by making a CURL request.

Webhooks allow you to build or set up integrations that subscribe to certain [events](https://appwrite.io/docs/webhooks#events) on Appwrite. When one of those events is triggered, we send an HTTP POST payload to the webhook's configured URL. Webhooks can be used to purge cache from CDNs, calculate data or send a Slack notification. You're only limited by your imagination.

Additionally we have two more workers that delegate tasks to other workers. 
* #### Maintenance Worker
The maintenance worker corresponds to the `appwrite-maintenance` service in the docker-compose file. The Maintenance worker lies [here](https://github.com/appwrite/appwrite/blob/master/app/tasks/maintenance.php) and performs some housekeeping tasks so your Appwrite server does not blow up over time! In its current state, the maintenance worker delegates deletion tasks to `appwrite-worker-deletes` which then performs the actual deletion. We use the Maintenance worker to schedule three kinds of deletions:

* Cleaning up Abuse logs
* Cleaning up Audit Logs
* Cleaning up Execution Logs

* #### Schedules Worker
The Schedules worker corresponds to the `appwrite-schedule` service in the docker-compose file. The Schedules worker uses a [Resque Scheduler](https://github.com/resque/resque) under the hood and handles the scheduling of CRON jobs across Appwrite. This includes CRON jobs from the Tasks API, Webhooks API and the functions API. 

## Mariadb
Appwrite uses MariaDB as the default database for project collections, documents and all other metadata. Appwrite is agnostic to the database you use under the hood and support for more databases like [Postgres](https://www.postgresql.org/), [CockroachDB](https://www.cockroachlabs.com/), [MySQL](https://www.mysql.com/) and [MongoDB](https://www.mongodb.com/2) is currently under active development! 😊

## ClamAV
ClamAV is a TCP Anti-virus server responsible for scanning all user uploads to the Appwrite storage. The ClamAV microservice is optional and can be disabled using Appwrite environment variables. Starting with Appwrite verson 0.8, this functionality is disabled by default to save memory on smaller setups. If you are having issues with excessive memory utilisation, you can learn to disable it [here](https://dev.to/appwrite/learn-how-to-disable-clamav-in-your-appwrite-stack-and-reduce-memory-usage-2e37) 

## Influxdb
Appwrite uses InfluxDB for storing your projects' API usage metrics and stats. This is the engine used for generating your API usage graphs and handling time-series data. 

## Telegraf
Telegraf is a plugin-driven server agent for collecting and sending metrics and events from multiple sources to multiple destinations. Telegraf kind of protects InfluxDB by aggregating the data before sending it to the database. Telegraf operates on the UDP protocol, which makes data transfer blazing fast!

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

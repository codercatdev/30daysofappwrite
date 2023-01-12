---
day: 28
title: "#30DaysOfAppwrite: Docker Swarm Integration"
description: "The fiercest of enemies may be overcome by a swarm."
slug: "docker-swarm-integration"
devto_url: "https://dev.to/appwrite/30daysofappwrite-docker-swarm-integration-2io9"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--6GEyPwwA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/676k9mpl72nalo0oks5r.png"
created_at: "2021-05-28T11:44:32Z"
updated_at: "2022-04-12T17:55:57Z"
published_at: "2021-05-28T12:43:54Z"
tags: ["javascript","webdev","flutter","30daysofappwrite"]
user:
  name: "kodumbeats"
  username: "kodumbeats"
  twitter_username: null
  github_username: "kodumbeats"
  user_id: "391679"
  website_url: "https://kodumbeats.dev"
  profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--e8LZR0bd--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/391679/7b6ec8dd-dae7-4b56-bc9d-d2aaa4be7935.jpeg"
  profile_image_90: "https://res.cloudinary.com/practicaldev/image/fetch/s--E9dttZhp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/391679/7b6ec8dd-dae7-4b56-bc9d-d2aaa4be7935.jpeg"
---
## Intro
[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Deploy with Docker Swarm

Welcome to Day 28 👋 ! Your app has become an overnight success. Everyone is using your app, from celebrities to your friends. You never anticipated this and found yourself in a situation where your app isn't able to keep up with the overwhelming number of requests. Fret not! Appwrite was designed with exactly this in mind. As you already know, Appwrite is designed as a set of stateless microservices with scalability as one of our top priorities! While there are many ways to achieve scalability with lots of orchestration services, we will take a look at one of the most intuitive ones. Today, we're going to discuss horizontally scaling Appwrite with Docker Swarm.

## What is Docker Swarm?

Docker Swarm is a container orchestration tool built right into the Docker CLI, which allows us to deploy our Docker services to a cluster of hosts instead of just the one allowed with [Docker Compose](https://docs.docker.com/compose/). This is known as Swarm Mode, not to be confused with the classic Docker Swarm that is [no longer being developed](https://github.com/docker/classicswarm) as a standalone product. Docker Swarm works great with Appwrite as it builds upon the [Compose specification](https://docs.docker.com/compose/compose-file/), meaning we can use Appwrite's `docker-compose` configuration to deploy to a swarm (with a few changes here and there). Its simplicity allows us to get started right away!

## Deploying Appwrite with Swarm

### Prerequisites

For this example, we'll need the following:

- [Docker is installed](https://docs.docker.com/get-docker/) on each of your hosts.
- The following ports must be open between your hosts:
  - TCP port 2377 for cluster management communications
  - TCP and UDP port 7946 for communication among nodes
  - UDP port 4789 for overlay network traffic
- The "leader" server has Appwrite's [Compose files](https://gist.github.com/eldadfux/977869ff6bdd7312adfd4e629ee15cc5).

### Creating the Swarm

We'll create the swarm on whichever host we want to be the "leader." Initialize the swarm with:

```bash
docker swarm init
```
Which should output:
```
Swarm initialized: current node (7db8w7aurb7qrhvm0c0ttd4ky) is now a manager.
```

To add a worker to this swarm, run the following command:

```bash
docker swarm join --token SWMTKN-1-0wagrl3qt4loflf9jcadj8gx53fj2dzmbwaato7r50vghmgiwp-cvo3jflyfh2gnu46pzjtaexv2 your.ip.addr.ess:2377
```
Which should output:
```
To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

Now, let's run the provided command on our other system(s) - we're looking for the message `This node joined a swarm as a worker.` Once that's complete, we can go back to the "leader" host and can see both systems with:

```bash
docker node ls
```
Which should display the following:
```
ID                            HOSTNAME          STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
yfl7xsy5birfbpiw040chef67     appwrite          Ready     Active                          20.10.6
op3nf4ab6f5v1lulwkpyy2a83 *   appwrite_leader   Ready     Active         Leader           20.10.6
```

### Update `docker-compose.yml`

Now that the swarm is ready, we'll need to make some changes to `docker-compose.yml` to make it Swarm-compatible.

Volumes in a Docker swarm aren't shared between hosts by default, so we'll use NFS to share directories between the hosts. Shared data can be accomplished in a variety of ways, but this is the simplest to get started. To do so, we'll replace all the named volumes with NFS mounts. DigitalOcean has a [great guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nfs-mount-on-ubuntu-20-04) on configuring NFS, so refer to that guide for more details.

We're going to configure these NFS volumes on our "leader" host and share those folders with other hosts in the swarm. We'll use the following directories to replace the Docker volumes and share via NFS:

```bash
mkdir -p /nfs/{mariadb,redis,cache,uploads,certificates,functions,influxdb,config}
```

Next, we'll create the corresponding `/nfs` directories on the second host (with the same command as above), where we'll mount the NFS share from the "leader" host.

Now, replace each named volume in `docker-compose.yml` with its corresponding NFS directory:

```bash
# - appwrite-uploads:/storage/uploads:rw
- /nfs/uploads:/storage/uploads:rw

# - appwrite-certificates:/storage/certificates:rw
- /nfs/certificates:/storage/certificates:rw

``` 

Then, we'll need to remove the `depends_on` and `container_name` stanzas from `docker-compose.yml`, as they aren't supported by Docker Swarm.

### Overlay Networks

Docker uses [overlay networks](https://docs.docker.com/network/overlay/) to connect each node together in the swarm, so containers can communicate with each other regardless of where it is deployed. We could create the overlay network with the Docker CLI, but instead, let's capture this change in `docker-compose.yml`:

```bash
networks:
  gateway:
  appwrite:
    driver: overlay
```

### Ready to Deploy

Once everything is in place, we'll set our [Appwrite environment variables](https://appwrite.io/docs/environment-variables) and deploy them to the swarm with:

```bash
docker stack deploy -c <(docker-compose config) appwrite
```

> If you see `docker-compose config` warnings, try upgrading the Compose version to `version: '3.8'` at the head of `docker-compose.yml` to utilize the latest Compose specification.

Our microservice workers rely on Redis to handle pub/sub, so you may see them restart until the stack self-heals. Once everything is deployed, you can check the status of the services with:

```bash
$ docker service ls
ID             NAME                                    MODE         REPLICAS   IMAGE                     PORTS
ktfto6dap451   appwrite_appwrite                       replicated   1/1        appwrite/appwrite:0.8.0   
hazw2csk4epd   appwrite_appwrite-maintenance           replicated   1/1        appwrite/appwrite:0.8.0   
fshro0zn8iw6   appwrite_appwrite-schedule              replicated   1/1        appwrite/appwrite:0.8.0   
jep5n0gnmvy6   appwrite_appwrite-worker-audits         replicated   1/1        appwrite/appwrite:0.8.0   
oiftp636aq6v   appwrite_appwrite-worker-certificates   replicated   1/1        appwrite/appwrite:0.8.0   
tlu7yxvtrr0r   appwrite_appwrite-worker-deletes        replicated   1/1        appwrite/appwrite:0.8.0   
rda2kspenbzr   appwrite_appwrite-worker-functions      replicated   1/1        appwrite/appwrite:0.8.0   
im800v9tct4n   appwrite_appwrite-worker-mails          replicated   1/1        appwrite/appwrite:0.8.0   
ry0u3v726o8h   appwrite_appwrite-worker-tasks          replicated   1/1        appwrite/appwrite:0.8.0   
734y2mr6gzkc   appwrite_appwrite-worker-usage          replicated   1/1        appwrite/appwrite:0.8.0   
bkotuk5kwmxx   appwrite_appwrite-worker-webhooks       replicated   1/1        appwrite/appwrite:0.8.0   
ff6iicbmf5my   appwrite_influxdb                       replicated   1/1        appwrite/influxdb:1.0.0   
892923vq96on   appwrite_mariadb                        replicated   1/1        appwrite/mariadb:1.2.0    
uw3l8bkoc3sl   appwrite_redis                          replicated   1/1        redis:6.0-alpine3.12      
ulp1cy06plnv   appwrite_telegraf                       replicated   1/1        appwrite/telegraf:1.0.0   
9aswnz3qq693   appwrite_traefik                        replicated   1/1        traefik:2.3               *:80->80/tcp, *:443->443/tcp
```

> I've included my completed Compose file in a [GitHub gist](https://gist.github.com/kodumbeats/5f2a52297bbc0edb04385bdd43083d7d) for reference.

## Configuration

Docker Swarm has a lot of configuration options available, so we won't cover everything here. Instead, let's talk about some of the most useful stanzas when configuring your deployment.

### Replicas

Since Appwrite is largely stateless, you can scale each service up or down individually, depending on your app's needs. For example, we may want to have two Functions workers so we can handle twice as many function executions:

```
deploy:
  replicas: 1
```

We can check that the replica was deployed by filtering for the specific service:

```bash
$ docker service ls --filter name=appwrite_appwrite-worker-functions 
ID             NAME                                 MODE         REPLICAS   IMAGE                     PORTS 
rda2kspenbzr   appwrite_appwrite-worker-functions   replicated   2/2        appwrite/appwrite:0.8.0
```

### Node Constraints

Docker Swarm allows us to control where containers deploy in the swarm using placement constraints. For example, we could configure Traefik or MariaDB to just reside on a manager node with the following added to `docker-compose.yml`:

```
deploy:
  placement:
    constraints: [node.role == manager]
```

## What's Next

We just covered the tip of the iceberg. For further reading on running Appwrite in a Docker Swarm:

- Docker's [admin guide](https://docs.docker.com/engine/swarm/admin_guide/) has a lot of extra information about how to manage nodes in a swarm and some considerations for production.
- [Docker secrets](https://docs.docker.com/engine/swarm/secrets/) and [Docker configs](https://docs.docker.com/engine/swarm/configs/) can be used to more easily control and distribute sensitive data through the swarm.

## Credits
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

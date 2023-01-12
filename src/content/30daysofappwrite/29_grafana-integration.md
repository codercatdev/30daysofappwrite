---
day: 29
title: "Grafana Integration"
description: "In God we trust. Everyone else must bring data."
slug: "grafana-integration"
devto_url: "https://dev.to/appwrite/grafana-integration-50p9"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--LFHcVAzt--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m14mdi2r9w0madxkr5pv.png"
created_at: "2021-05-29T12:51:23Z"
updated_at: "2022-04-12T18:01:03Z"
published_at: "2021-05-29T13:13:04Z"
tags: ["javascript","webdev","flutter","30daysofappwrite"]
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
## Intro
Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Grafana Integration
Welcome to Day 29 👋 - today marks the last day of #30DaysOfAppwrite, and we thought it would be a fun little exercise to show you how you can add external services to the Appwrite stack and make it work seamlessly! We love Dashboards, and we thought it would be great to add Grafana support to Appwrite. 

Appwrite doesn't come with Grafana out of the box for several reasons. First, you may already have your own set of monitoring tools in your stack, and we believe that our stack should be un-opinionated and allow you to work with the tools you feel comfortable with. The second reason is that we try to ship the Appwrite setup with minimal components to make Appwrite easy to start but still flexible enough to grow.  

## Add Grafana to Appwrite

We will be creating two Dashboards: one for monitoring Appwrite's usage stats and one for monitoring your Server stats. 

The first step is to add the Grafana service to Appwrite's [`docker-compose.yml` file](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml#L476). 


```yaml
  grafana:
    image: grafana/grafana
    container_name: appwrite-grafana
    ports:
      - "3000:3000"
    networks:
      - appwrite
    volumes:
      - appwrite-grafana:/var/lib/grafana
```

Next, you need to add the `appwrite-grafana` volume to the [list of all volumes](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml#L532). This will allow your Grafana container to persist data. 

```yaml 
volumes:
  appwrite-mariadb:
  appwrite-redis:
  appwrite-cache:
  appwrite-uploads:
  appwrite-certificates:
  appwrite-functions:
  appwrite-influxdb:
  appwrite-config:
  appwrite-grafana:
```

Now run:
```sh
docker-compose up -d
```

## Dashboard #1 - Appwrite Metrics
We don't need any additional configuration for your first Dashboard in our services. Now head over to `http://localhost:3000` to configure Grafana. You can log in using the default credentials: 

```sh
username : admin
password : admin
```

You will be prompted to enter a new password, and it is **highly recommended** that you change the default password. Learn more about managing users and passwords in their [official guide](https://grafana.com/docs/grafana/latest/manage-users/user-admin/change-your-password/). 

The first step is to configure your Data Source. In our case, we will be using the InfluxDB plugin. 

![Add Datasource](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvi5ma8ubrqfm0p8fm2h.png)

Once you add the InfluxDB data source, it's time to configure it. Here, you need to fill in the values of 2 fields, 
* **URL** - http://influxdb:8086
* **Database** - telegraf

Finally, click **Save and Test** to check your database connection. If all goes well, you will see a success message.

![Configure Datasource](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/490bpq9m7vgerh34f7oj.png)

The next step is to import the Dashboard we created for you. Head to the [Grafana's Dashboard Library](https://grafana.com/grafana/dashboards/14508) and copy the ID of our Dashboard.

You can then **Import the Dashboard** in your Grafana instance like so. 

![Importing Appwrite data](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wgjns1oja5gywo3mxcte.png)

And that's it! You should now see this fancy Dashboard

![Appwrite Metrics](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0s5az7aspk879hngza2k.png)


## Dashboard #2 - Server Metrics

The [next Dashboard](https://grafana.com/grafana/dashboards/5955) is one that will monitor our server metrics. This includes CPU usage, Disk I/O, Network I/O, and much more. This Dashboard requires some additional info, so we need to make a few changes in our `telegraf` Docker image to make this information available.   

We'll start by cloning Appwrite's `telegraf` image
```sh
git clone https://github.com/appwrite/docker-telegraf.git 
cd docker-telegraf
```

We need to make more metrics available to the collector. Add the following lines to [line 83](https://github.com/appwrite/docker-telegraf/blob/master/telegraf.conf#L83)

```sh
[[inputs.cpu]]
    percpu = true
    totalcpu = true
    collect_cpu_time = false
    report_active = false
[[inputs.disk]]
    ignore_fs = ["tmpfs", "devtmpfs", "devfs"]
[[inputs.io]]
[[inputs.mem]]
[[inputs.net]]
[[inputs.system]]
[[inputs.swap]]
[[inputs.netstat]]
[[inputs.processes]]
[[inputs.kernel]]
```

Now we need to build a new Docker image using the changes we made.

```sh
docker build -t telegraf-local .
```

Once this build is complete, we can make use of our new `telegraf-local` image in the main Appwrite `docker-compose.yml`. Replace the `appwrite/telegraf:1.1.0` image in [line 434](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml#L434) with our `telegraf-local` image. 

```yaml
  telegraf:
    image: telegraf-local
    container_name: appwrite-telegraf
    networks:
      - appwrite
```

Now run `docker-compose up -d --remove-orphans` from your `appwrite` directory to restart your services.
Now head over to your Grafana Dashboard and import [this new Dashboard](https://grafana.com/grafana/dashboards/5955) the same way as you did the previous one, and if everything goes well, you should see the following Dashboard!

![System Metrics](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oz4shqwqquffliey1fb5.png)
 

And just like that, you now have access to all your server information in one place! This was just the tip of the iceberg! Grafana has many more amazing features. It's completely open-source, has support for over 30 Data Sources, has support for Alerting etc. You can set up custom alerts, and Grafana will continuously evaluate and send notifications to systems like Slack, PagerDuty, VictorOps, and OpsGenie. You can learn more about all of Grafana's features in their dedicated [tutorials section](https://grafana.com/tutorials/).

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

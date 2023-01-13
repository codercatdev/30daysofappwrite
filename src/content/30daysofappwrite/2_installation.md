---
weight: 2
title: 'Installation'
description: 'Learn to set up Appwrite on any machine of your choice.'
slug: 'installation'
devto_url: 'https://dev.to/appwrite/installing-appwrite-366o'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s---_YIDH5J--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/357y7eg0kdhvpbtny7qk.png'
created_at: '2021-05-02T12:16:31Z'
updated_at: '2021-05-02T12:16:31Z'
published_at: '2021-05-02T12:16:31Z'
tags: []
authors:
  - name: 'Alex Patterson'
    username: 'codercatdev'
    twitter_username: 'CodingCatDev'
    github_username: 'codercatdev'
    user_id: '135713'
    website_url: 'https://alexpatterson.dev'
    profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--DuCm1EvK--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/135713/499d4f5c-6676-497f-b645-a68d3fb8d588.png'
    profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ubBJbE_D--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/135713/499d4f5c-6676-497f-b645-a68d3fb8d588.png'
---

## Intro

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Installing Appwrite

Let's kick off Day 2 of `#30DaysofAppwrite` by discussing the first step of your Appwrite journey: **Installing Appwrite**. We'll cover the different ways to install Appwrite, as well as some tips to debug common issues you may face during the installation.
Appwrite uses Docker to install and run its services, so we can install Appwrite on any system that supports Docker, including MacOS, Linux and Windows. To develop locally on our machine, we need to first install Docker. If you have not already installed Docker, please visit the [Docker official installation docs](https://docs.docker.com/engine/install/).

Installing Appwrite on any platform is as simple as running a single command in the terminal/command prompt. We just need to choose the appropriate command for our platform. Below are the installation commands for different platforms.
Make sure you use the latest Appwrite version from [here](https://appwrite.io/docs/installation)

## Linux, MacOS and any Unix Compatible Machine

```bash
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:latest
```

## Windows

If you are on command prompt use

```powershell
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:latest
```

If you are on powershell use

```powershell
docker run -it --rm ,
    --volume /var/run/docker.sock:/var/run/docker.sock ,
    --volume ${pwd}/appwrite:/usr/src/code/appwrite:rw ,
    --entrypoint="install" ,
    appwrite/appwrite:latest
```

## Possible Errors

If you run into issues during installation, here are some common problems to investigate. First, make sure you have enough disk space and RAM to run Appwrite. Appwrite requires at least 1 CPU core and 512MB (2GB Recommended) of RAM. If your system doesn't have enough memory or CPU power, your installation may terminate without any information or error message.

Another common error that might occur during installation is caused by the Docker Hub pull rate limits. The installation script needs to pull the `appwrite/appwrite` Docker image from Docker Hub, so if you are not signed in to Docker Hub, you might run into this error. To resolve this error, you just need to log into Docker Hub using `docker login` command. For more information, visit the [official Docker docs](https://docs.docker.com/docker-hub/download-rate-limit/).

## Upgrading Appwrite

If you already have an Appwrite server running and want to upgrade to a new version, the Appwrite migration tool is there to help. In order to upgrade Appwrite, make sure you are in the same folder you ran your Appwrite installation script previously. This folder should contain a folder `appwrite` inside which there should be your `docker-compose.yml` and `.env` files. Run the installation for the next version from the folder containing the `appwrite` folder. Once you successfully install the new version, you can run the migration tool. **Make sure to backup your data, your `docker-compose.yml` file and `.env` file and settings before running the migration.**
You can run the migration tool using the following command from the folder containing your `docker-compose.yml` file.

```bash
docker-compose exec appwrite migrate
```

More information on upgrading and migration can be found in the [official docs](https://appwrite.io/docs/upgrade).

## Installing Appwrite on Cloud Providers

Installing Appwrite on cloud providers is not much different than installing locally. We can deploy Linux virtual machines on any cloud providers and follow the UNIX installation code to install Appwrite.

## Checking the Health of Your Appwrite Installation

Once you have successfully installed Appwrite, you can check the health and the status of your Appwrite server. In order to run initial checks, you can use Appwrite's `doctor` command, executed via `docker-compose exec appwrite doctor`. This command should be run from the directory you installed Appwrite in, where your `docker-compose.yml` file exists.

Running this command will show you the details of your Appwrite Server and status of various services.

![Appwrite Doctor](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qhwl8f2zn99vbhf9gla9.png)

## Checking the logs

If you look at the `docker-compose.yml` file, you can see the list of various different services. Whenever you have an issue, you can look into the logs of each service or the logs of the whole stack. From the same directory containing your `docker-compose.yml` file, you can run the following commands to view the logs.

- `docker-compose logs`: To view the logs of all the services together
- `docker-compose logs <name_of_the_service>`: To view the logs of the individual service.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

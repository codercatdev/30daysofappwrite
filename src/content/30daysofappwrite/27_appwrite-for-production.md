---
day: 27
title: "Appwrite for Production"
description: "Get ready to go to war ⚔️ with Appwrite."
slug: "appwrite-for-production"
devto_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-for-production-56hi"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--hJTCX_rP--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mfn4yy6fmort1n9fczbh.png"
created_at: "2021-05-26T19:48:00Z"
updated_at: "2022-04-12T17:54:55Z"
published_at: "2021-05-27T12:38:54Z"
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
Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Appwrite for Production

Welcome to Day 27 👋. Now that we've covered many of the capabilities of Appwrite, we should discuss running Appwrite in production once your app is finally ready for users.

First and foremost, good security is a moving target. Appwrite provides a suite of APIs that abstracts many security requirements of your application, but hosting software online means exposing a computer to the internet. While we can't cover everything, let's discuss some security best practices when running Appwrite in production.

## The Server

Before discussing the steps to run Appwrite in production, we need to talk about the _system_ on which Appwrite will run. These tips assume you're running Appwrite on a Linux-based server, but the principles apply to any operating system.

### Updates

Most security breaches occur on systems that run out-of-date software versions with security vulnerabilities. The problem is understandable - it's hard to keep up with system updates. Running updates on a [cron](https://man7.org/linux/man-pages/man5/crontab.5.html) schedule isn't the best either, as security updates are best installed immediately. Use tools like Ubuntu's [`unattended-upgrades`](https://help.ubuntu.com/community/AutomaticSecurityUpdates) and Fedora's [`dnf-automatic`](https://fedoraproject.org/wiki/AutoUpdates) packages to run with the latest updates for your software.

### Firewall and SSH

A security best practice is a deny-by-default security policy - we should only give explicit access to the services we want. Appwrite considers this in its default configuration: the only service exposed to the outside world is what we need, the [Traefik](https://traefik.io/traefik/) proxy. So, if Appwrite is the only service we want to expose on the server publicly, we can use firewall tools to block access to any other unused ports.

If you use SSH to administer your system, don't forget to leave that open in your firewall! SSH is considered a private service, meaning that it should be publicly accessible, but only to authorized accounts. The best practice is to use cryptographic tools like [SSH keys](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys) instead of passwords, as they're much, much harder to falsify.

### More Reading

Here are some additional resources that go into more detail about best practices:

- [Docker security](https://docs.docker.com/engine/security/)
- [DigitalOcean Recommended Security Measures](https://www.digitalocean.com/community/tutorials/recommended-security-measures-to-protect-your-servers)

## Securing Appwrite

Now, let's discuss setting up Appwrite for production.

### Environment Variables

You can easily configure Appwrite for production with the many environment variables that it offers. The following variables should be set in the hidden `.env` file in your `appwrite` installation directory when deploying for production:

- `_APP_ENV`: Change to `production`.
- `_APP_OPTIONS_ABUSE`: Enables abuse checks and rate-limiting for the API. Set to `enabled`.
- `_APP_OPTIONS_FORCE_HTTPS`: Forces connections to use HTTPS for secure data transfer. Set to `enabled`.
- `_APP_OPENSSL_KEY_V1`: This is the secret used to encrypt information like sessions and passwords. Please change this to something secure and random, and **keep it safe and backed up**.
- `_APP_DOMAIN`: Set this to [your domain name](https://appwrite.io/docs/custom-domains) for Appwrite to auto-generate an SSL certificate.

#### Restrict Console Access

Three environment variables are available to restrict access to the Appwrite console:

- `_APP_CONSOLE_WHITELIST_EMAILS`
- `_APP_CONSOLE_WHITELIST_IPS`
- `_APP_CONSOLE_WHITELIST_ROOT`

Set the `_ROOT` var to `enabled` if you only want a single account to have access to the console. You can restrict access to specific email and IP addresses with their respective environment variables for multiple users.

#### Antivirus

For production, you can enable `clamav` scanning of uploaded files for any known malicious objects. Set `_APP_STORAGE_ANTIVIRUS` to `enabled` and [uncomment the service](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml#L417-L423) in `docker-compose.yml` to use this feature. Don't forget to also uncomment `clamav` in the [`depends_on` section](https://github.com/appwrite/appwrite/blob/master/docker-compose.yml#L74) of the main `appwrite` service. 

#### Functions

Cloud Functions can be customized to suit the needs of your production system, largely for controlling resources available to Function executions:

- `_APP_FUNCTIONS_CPUS`: The maximum number of CPU cores that Cloud Functions can use.
- `_APP_FUNCTIONS_MEMORY`: The maximum memory available to Cloud Functions (in megabytes).
- `_APP_FUNCTIONS_CONTAINERS`: The maximum number of containers Appwrite keeps alive defaults to 10. Increase this number to increase the number of warm functions.
- `_APP_FUNCTIONS_RUNTIMES`: A list of available runtimes for new Cloud Functions.

> All Appwrite environment variables can be found in our [docs](https://appwrite.io/docs/environment-variables).

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
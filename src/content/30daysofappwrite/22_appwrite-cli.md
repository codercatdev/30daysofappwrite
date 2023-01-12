---
day: 22
title: "Appwrite CLI"
description: "Did you just think you could build an app without using a CLI?"
slug: "appwrite-cli"
devto_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-cli-2mde"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--WUo0LGU5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ohddxxw5ic7x56pc9gw.png"
social_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--W6TXb6x9--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ohddxxw5ic7x56pc9gw.png"
canonical_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-cli-2mde"
created_at: "2021-05-21T17:53:15Z"
updated_at: "2022-04-12T20:20:18Z"
published_at: "2021-05-22T13:21:07Z"
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
[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these 
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Appwrite CLI 
Welcome to Day 21 👋. For a really long time, we found ourselves needing to set up an SDK to test new functionalities quickly, so we decided to build ourselves a CLI! The CLI is packaged both as an npm module and a standalone binary for your operating system, making it completely dependency-free, platform independent, and language agnostic. The CLI is generated automatically using our Swagger specification and our very own [SDK generator](https://github.com/appwrite/sdk-generator). 


Appwrite CLI features all the powerful features of the server-side SDKs and more with the convenience of using your terminal. You can even use it to automate tasks on your CI pipeline. The Appwrite CLI can be used to deploy and manage functions and collections specified in a config file called `appwrite.json`. The config file allows you to use the Appwrite CLI to replicate collection and function setups across Appwrite instances quickly!

## Installation

* **Install with NPM**

```bash
npm install -g appwrite-cli
```

* **Install from Binary**

* **Windows**
```powershell
iwr -useb https://appwrite.io/cli/install.ps1 | iex
```

* **Mac OS**

Install using [Homebrew](https://brew.sh/):
```bash
brew tap appwrite/sdk-for-cli https://github.com/appwrite/sdk-for-cli
brew update
brew install --HEAD appwrite
```

Install using cURL:
```bash
curl -sL https://appwrite.io/cli/install.sh | bash
```

* **Linux**

Install using cURL:
```bash
curl -sL https://appwrite.io/cli/install.sh | bash
```

* **Verify Your Installation**

You should see your Appwrite CLI's version number if you run:
```bash
appwrite -v
```

## Initializing Your CLI

To communicate with your Appwrite server, you will need first to initialize your CLI. The CLI needs to know which Appwrite instance it must point to, so we first pass in your Appwrite instance's endpoint:

```bash
appwrite client --endpoint "http://<API endpoint>/v1"
```

After providing your Appwrite CLI with an endpoint, you can log in to your Appwrite server by running:

```bash
appwrite login
```

Finally, we need to point the CLI to an Appwrite project, so navigate to an empty directory. You can initialize the project with the following commands:

```bash
# This command is interactive
appwrite init project
```

Ensure to select the project we have been working on for 30 Days of Appwrite. Remember and note down the directory. We will be using it in the coming days.

## Trying the CLI

Let's make a request to the **Locale Service**: 

```sh
appwrite locale getContinents
```

Which will output the following:
```
total : 7
continents

  name          │ code
 ───────────────┼──────
  Africa        │ AF
 ───────────────┼──────
  Antarctica    │ AN
 ───────────────┼──────
  Asia          │ AS
 ───────────────┼──────
  Europe        │ EU
 ───────────────┼──────
  North America │ NA
 ───────────────┼──────
  Oceania       │ OC
 ───────────────┼──────
  South America │ SA

✓ Success
```

You might experience an SSL error in case you are trying to connect to a domain without a valid SSL certificate. By default, requests to domains with self-signed SSL certificates (or no certificates) are disabled. If you trust the domain, you can bypass the certificate validation by using.

```sh
appwrite client --selfSigned true 
```

Great, now let's try executing a command that has some parameters. Let's say you want to create a new user in your project. Prior to the CLI, you would have to set up the server-side SDK to make this request. With the CLI, you can use the `appwrite users create` command.


```sh
appwrite users create --userId 'unique()' --email "chris@hemsworth.com" --password "very_strong_password" --name="Chris Hemsworth"
```

Which will output the following:
```
$id : 6255c478548f6ec74c6b
name : Chris Hemsworth
registration : 1649788024
status : true
passwordUpdate : 1649788024
email : chris@hemsworth.com
emailVerification : false
prefs
✓ Success
```

You can list your users using. 

```sh
appwrite users list
```

Which will output the following:
```
total : 1
users

  $id                  │ name            │ registration │ status │ passwordUpdate │ email                       │ emailVerification │ prefs
 ──────────────────────┼─────────────────┼──────────────┼────────┼────────────────┼─────────────────────────────┼───────────────────┼────────
  6255c478548f6ec74c6b │ Chris Hemsworth │ 1649788024   │ true   │ 1649788024     │ chris@hemsworth.com         │ false             │ object

✓ Success
```

If you ever get stuck with the usage of a particular command, you can always use the `help` command like this:

```sh
appwrite users help
appwrite database help
```

![Appwrite Users Help](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8547081plpsr7tim4g11.png)

In the upcoming session, we will talk about Cloud Functions and highlight how the CLI can be used to easily create, package and deploy cloud functions without ever leaving your console!

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

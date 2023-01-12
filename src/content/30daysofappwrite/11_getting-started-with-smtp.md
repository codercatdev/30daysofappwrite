---
day: 11
title: "Getting Started with SMTP"
description: "Integrate Appwrite with any email API service."
slug: "getting-started-with-smtp"
path: "/appwrite/30daysofappwrite-getting-started-with-smtp-1e2e"
url: "https://dev.to/appwrite/30daysofappwrite-getting-started-with-smtp-1e2e"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--5uu7ttX5--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vdinc7s1g235lcji904b.png"
created_at: "2021-05-11T12:43:40Z"
updated_at: "2022-04-12T16:10:14Z"
published_at: "2021-05-11T14:53:01Z"
tags: ["javascript","flutter","webdev","30daysofappwrite"]
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
[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused at giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these 
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Getting Started with SMTP
Welcome to Day 11 👋. **SMTP** stands for **Simple Mail Transfer Protocol**. As with any other protocol, it defines some steps and guidelines that need to be adhered to by all the computers on a network. SMTP is an application layer protocol in the TCP/IP stack and works closely with something called the **Mail Transfer Agent (MTA)** to send your communication to the right computer and email inbox.

In order to enable email functionality in Appwrite, you will need to set up a proper SMTP configuration. Because email deliverability can be both tricky and hard, it is often easier to delegate this responsibility to a 3rd-party SMTP provider like [MailGun](https://www.mailgun.com/) or [SendGrid](https://sendgrid.com/). These providers help you abstract the complexity of passing SPAM filters by doing a lot of the advanced configuration and validation for you.

Feel free to register with any provider of your choice and skip to the **Configuration** section. Otherwise, follow along to learn how to get the SMTP credentials from Sendgrid.

## Setting up SendGrid

1. Create a SendGrid account [here](https://signup.sendgrid.com/).

2. Verify ownership of a single email address to use as a sender. Instructions can be found [here](https://sendgrid.com/docs/ui/sending-email/sender-verification/).

3. Setup an SMTP Relay under [Email API -> Integration Guide](https://app.sendgrid.com/guide/integrate) and create an API Key.

4. Down below, you should see all the credentials you need to set up SendGrid with Appwrite in the next step.

## Configuration

Appwrite offers multiple [environment variables](https://appwrite.io/docs/environment-variables#smtp) to customize your server setup to your needs. In order to enable SMTP, you need to change the Appwrite container's environment variables. The following are important for us:

| Name               | Description                                                                                                                                            |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| _APP_SMTP_HOST     | SMTP server hostname address. Use an empty string to disable all mail sending from the server. The default value for this variable is an empty string |
| _APP_SMTP_PORT     | SMTP server TCP port. Empty by default.                                                                                                                |
| _APP_SMTP_SECURE   | SMTP secure connection protocol. This environment variable is empty by default. Change this variable to 'tls' if running on a secure connection.                                                  |
| _APP_SMTP_USERNAME | SMTP server user name. Empty by default.                                                                                                               |
| _APP_SMTP_PASSWORD | SMTP server user password. Empty by default.                                                                                                           |

To change these variables according to your needs, navigate to the `appwrite` directory where Appwrite was installed and edit the hidden `.env` file.

```
_APP_SMTP_HOST=smtp.sendgrid.net
_APP_SMTP_PORT=587
_APP_SMTP_SECURE=tls
_APP_SMTP_USERNAME=YOUR-SMTP-USERNAME
_APP_SMTP_PASSWORD=YOUR-SMTP-PASSWORD
```

In addition to these variables, you will also need to update `_APP_SYSTEM_EMAIL_ADDRESS` environment variable to match the **Sender Email** configured in your SMTP service. This is the email address recipients will see when they receive emails from your Appwrite instance. You can also update `_APP_SYSTEM_EMAIL_NAME`, which will update the **Sender Name** found on sent emails.

After you have finished updating, you need to restart your Appwrite stack using the following command from your terminal:
```sh
docker-compose up -d --remove-orphans --build --force-recreate
```

## That's it! 

Go to your Appwrite console, log out from your account and try to recover your password by navigating to **Forgot password?**. If you have followed along with setting up the SMTP Server using SendGrid - this should also verify your integration.

If everything goes well, you should receive an email with instructions to reset your password. Obviously, this is not necessary and is only a test to check if the SMTP server is working.

Tomorrow we will discuss how we can use our SMTP server to allow our users to verify their accounts with the associated email address.

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
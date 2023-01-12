---
day: 6
title: "SSL Certificates"
description: "SSL can be a bummer - here are some tips."
slug: "ssl-certificates"
devto_url: "https://dev.to/appwrite/30daysofappwrite-ssl-certificates-c08"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--x9Y_Muzm--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jprpjnemjgychrhikue2.png"
created_at: "2021-05-03T20:37:49Z"
updated_at: "2022-04-12T14:50:00Z"
published_at: "2021-05-06T12:39:49Z"
tags: []
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

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a full-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## SSL Certificates in Appwrite

Welcome to Day 6 👋 of `#30DaysofAppwrite`. Today, we're going to discuss how to secure your Appwrite API traffic with SSL certificates: what they do, how to get them, and how to troubleshoot SSL problems in Appwrite.

## What is SSL?

SSL is a security protocol that cryptographically provides authentication for computers communicating with each other on the Internet, improved and later replaced by [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS) years ago. Despite TLS replacing SSL, both names are commonly used to refer to the same process: secure HTTP sessions with certificate keypairs (fancy text files) signed by a [Certificate Authority](https://developer.mozilla.org/en-US/docs/Glossary/Certificate_authority), CA for short. 

### Trusting Certificates

The TLS protocol provides cryptographically unique keypairs that not only provide encryption, but also include domain, host, and organization information in the certificate. However, since TLS technology is [open-source](https://github.com/openssl/openssl), anyone can operate as a CA and sign certificates. To keep users secure, computers and browsers ship with lists of pre-vetted CAs to trust automatically[1]. Websites that use certificates issued by these trusted sources get the all-important lock🔒 next to their domain in the URL bar. Websites without them, however, face the dreaded `Warning: Potential Security Risk Ahead`.

> [1] For the curious, here's Mozilla's list of [trusted sources](https://wiki.mozilla.org/CA/Included_Certificates) for Firefox.

![Self Signed Warning](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pc4dhphr1ym63hyjtml1.png)
 

The process of becoming a universally trusted CA on these lists [can be costly](https://en.wikipedia.org/wiki/Key_ceremony), which is why organizations like IdenTrust and DigiCert charge money for their services. These companies have the resources and knowledge to provide a range of security guarantees, protecting financial institutions, governments, militaries, and more. Though, I'm assuming that you're not starting a bank, and don't have the funds to get a commercial SSL certificate. Where are the free options?

### Welcome, Let's Encrypt

Let's Encrypt is a free, automated, and trusted Certificate Authority that aims to provide for a safer, more secure Internet. Appwrite uses their popular [`certbot`](https://certbot.eff.org/) tool under the hood to automatically handle certificate generation and renewal, so you can focus on building your app. 

## Securing Appwrite with HTTPS

To illustrate by example, let's assume I've installed Appwrite on a  VPS and bought the domain `example.com` for my next Appwrite-powered project. What steps are necessary to serve my app on `example.com`? 

### Domain records

Your registrar ultimately has control over your domain (our `example.com`), so we'll need to start there to point the domain at the IP address of your VPS. For this, we can use a DNS A record. Adding DNS records to your domain varies by registrar, so check out our docs on [Custom Domains](https://appwrite.io/docs/custom-domains) for a bunch of helpful links and more specific instructions.

### SSL Certificates in Development

As mentioned before, all the required technology to generate your own SSL certificate is open-source, but it just isn't globally trusted by browsers. That's totally fine for development (assuming you trust yourself 😂) - Appwrite provides a self-signed certificate out-of-the-box (via the Traefik proxy), so your work is immediately encrypted. To do this, we need to let Appwrite know we're trying to use the self-signed certificate. Our SDKs all accept a `client.setSelfSigned()` method to handle this. Here's an example using our [Web SDK](https://appwrite.io/docs/getting-started-for-web):

```javascript
import * as Appwrite from "appwrite";

let client = new Appwrite();

client
    .setEndpoint('https://example.com/v1')
    .setProject('5df5acd0d48c2')
    .setSelfSigned()
;
```

### SSL Certificates in Production

Now, say you're past the development stage for `example.com`, and you're ready to move to production. The following is required for Appwrite to issue a production-ready SSL certificate (with the lock🔒):

- Appwrite in `production` mode via `_APP_ENV=production`
- A valid email set via `_APP_SYSTEM_SECURITY_EMAIL_ADDRESS`
- A public-facing domain set via `_APP_DOMAIN`
- Traefik (proxy webserver) listening on port 80
- Remove references to `client.setSelfSigned`

> Our docs on [Appwrite environment variables](https://appwrite.io/docs/environment-variables) are a good reference when changing Appwrite's configuration. 

To apply new environment variables, run:

```bash
docker-compose up -d
```

This is where the Appwrite Certificates worker takes the reigns, calling `certbot` to generate a certificate signed by Let's Encrypt. The worker then stores the certificates in a Docker volume for persistence and queues up a job to check the certificate renewal periodically (Let's Encrypt certificates are valid for 90 days by default).  

## Debugging

The first place to look for any certificate problems is the Certificates worker. You can check the service logs with:

```bash
docker-compose logs appwrite-worker-certificates
```

If you've configured your domain after your Appwrite server has started, you can re-trigger the Certificates worker by restarting Appwrite:

```bash
docker-compose restart appwrite
```

If you still can't figure it out, you can find help on [Discord](https://appwrite.io/discord).

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

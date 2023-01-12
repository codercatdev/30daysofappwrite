---
day: 26
title: "JWT Support in Appwrite"
description: "JWhaT?"
slug: "jwt-support-in-appwrite"
devto_url: "https://dev.to/appwrite/30daysofappwrite-jwt-l08"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--I8cDLpjx--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gy2cl0tctidsm7m1msmw.png"
created_at: "2021-05-26T12:59:23Z"
updated_at: "2022-04-12T17:53:08Z"
published_at: "2021-05-26T13:57:39Z"
tags: ["javascript","webdev","flutter","30daysofappwrite"]
user:
  name: "Torsten Dittmann"
  username: "torstendittmann"
  twitter_username: "DittmannTorsten"
  github_username: "TorstenDittmann"
  user_id: "206882"
  website_url: "https://dittmann.dev"
  profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s---17jeBDQ--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/206882/20323e85-2ed6-4239-a5b6-4ae557bb943b.jpg"
  profile_image_90: "https://res.cloudinary.com/practicaldev/image/fetch/s--DamjbYDz--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/206882/20323e85-2ed6-4239-a5b6-4ae557bb943b.jpg"
---
## Intro

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside, we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## What is a JWT

JWT (**J**SON **W**eb **T**oken) is a standard used to create access tokens for an application. It works this way: the server generates a token that certifies the user identity and sends it to the client. The client will send the token back to the server for every subsequent request, so the server knows the request comes from a particular identity.

A well-formed JWT consists of three concatenated **Base64** url-encoded strings, separated by dots (`.`):

- **Header**: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- **Payload**: contains verifiable security statements, such as the identity of the user and the permissions they are allowed.
- **Signature**: used to validate that the token is trustworthy and has not been tampered with.

![JWT](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2jd51zv2sxx6bwbw9cbl.png) 

This architecture proves to be very effective in modern Web Apps, whereafter the user is authenticated, we perform API requests either to a REST or a GraphQL API. 

Anyway, it is not always recommended to use JWTs for sessions. Using a regular server-side session combined with Cookies is usually much more efficient and less prone to data exposure.

### So, why do we need a JWT then?

In the modern web, you will often have several entities communicating with each other. Certain features will naturally be restricted and require some sort of authorization mechanism. At Appwrite we use Cookies for the client-side to communicate with the backend. 

Using a JWT, you will be able to authorize the user on the Server-Side within a Cloud Function, Microservice, or SSR.

## Create a JWT

Version 0.8 of Appwrite introduced JWT, and it's really easy to generate using the Web or Flutter SDK. Because JWTs are used for authentication and authorization - we can only generate them when we are authenticated.

### Web

```js
appwrite.account.createJWT().then(response => {
    console.log(response); // Success
}, error => {
    console.log(error); // Failure
});
```

### Flutter

```flutter
account.createJWT().then((response) {
    print(response);
}).catchError((error) {
    print(error.response);
});
```

The `createJWT()` method will receive an object like this:

```json
{
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6I..."
}
```

This JWT will be valid for 15 minutes and can only be generated **10 times** every **60 minutes** per **user account**.

## JWT with Server SDK

Now that we can get our hands on a JWT, we can use it to do actions on the server on behalf of a user without needing to log in or provide an API Key.  

For demonstration, let's try to get our current user with a Node.js script:

```
mkdir appwrite-jwt-test
cd appwrite-jwt-test
npm init -y
```

Now add `node-appwrite` as a dependency:

```
npm install node-appwrite
```

Create `index.js` file and put in the following content:

```js
const appwrite = require('node-appwrite');
const client = new appwrite.Client();
const account = new appwrite.Account(client);

client
    .setEndpoint("[ENDPOINT]") // Your API Endpoint
    .setProject("[PROJECT_ID]") // Your project ID
    .setJWT("[INSERT_JWT_HERE]") // Your users JWT
;

account.get().then(r => console.log(r));
```

> Remember to fill out the endpoint, project ID, and JWT. Keep in mind that a JWT is only valid for 15 minutes after generation.

Now we can execute this file with `node index.js`, and if everything goes well, we should see our user's object :clap:

## JWT With Cloud Functions

Remember from [Day 23](https://dev.to/appwrite/30daysofappwrite-appwrite-cloud-functions-1pf2) that users can execute Cloud Functions over the Rest API? If a user does this, the Cloud Function will be passed a JWT in the `APPWRITE_FUNCTION_JWT` environment variable by default for the user who executed the function.

This way, we don't even have to create a JWT from the client-side and pass it around :tada:

## JWT With SSR

With release 3.0.0 of the Web SDK for Appwrite, we have refactored it to be isomorphic. This is important in the ecosystem of JavaScript - since, with the rising popularity of SSR, libraries need to work in the Browser - as well as on the Server Side with Node.js.

That's why we have added the `setJWT(jwt)` method, found in the Server SDK, to the Web SDK as well - which allows developers to use the same SDK for Client and Server Side actions with Frameworks like [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/) and [Svelte Kit](https://kit.svelte.dev/).

## Credits 

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

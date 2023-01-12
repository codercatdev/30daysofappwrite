---
day: 25
title: "Cloud Function with CRON"
description: "You cannot get away without CRON!"
slug: "cloud-function-with-cron"
devto_url: "https://dev.to/appwrite/30daysofappwrite-cloud-function-with-cron-258c"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--KNo35V09--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/flfdw94iam3p0tla2l53.png"
created_at: "2021-05-25T08:50:00Z"
updated_at: "2022-04-12T17:50:33Z"
published_at: "2021-05-25T13:13:26Z"
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these 
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Creating Statistics

On Day 24, we created a Cloud Function that was triggered by an event. This comes in handy when you want to react to interactions from the Client Side. For Day 25, we are going to create a Cloud Function that will be triggered at particular intervals of time. We can accomplish this by adding a CRON Schedule to our Cloud Function. 

For Day 25, we are creating a Cloud Function that will run every day and create statistics for our App. We are going to save the number of profiles and posts every day in a Collection - this data allows us to develop Graphs and Statistics to track.

First of all, we are going to create a new __Statistics__ collection with the following **Rules**:

- Profiles:
  - __ID:__ profiles
  - __Rule Type:__ Integer

- Posts:
  - __ID:__ posts
  - __Rule Type:__ Integer
- Timestamp:
  - __ID:__ timestamp
  - __Rule Type:__ Integer

The __Permissions__ will be `role:all` for *read*, so anyone can retrieve the statistic, and we are going to leave the *write* permissions empty. Leaving the *write* empty will block anyone from writing to that Collection, except when they're using an API key.

![Rules](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cx7byt3y42pc18tvadnw.png)

Now that the Collection is prepared let's start with our cloud function. For this example, we are going to create another Node.js Cloud Function. As environment variables, we are going to add the following:

- __APPWRITE_PROJECT_ID__: Insert your project ID.
- __APPWRITE_ENDPOINT__: Insert your Appwrite endpoint.
- __APPWRITE_API_KEY__: Insert an API key that has _documents.read_ and _documents.write_ permissions.
- __STATISTICS_COLLECTION__: Insert the ID of the Statistics collection.
- __PROFILE_COLLECTION__: Insert the ID of the Profile collection.
- __POST_COLLECTION__: Insert the ID of the Post collection.

Under the __Settings__ page of this Cloud Function, you also need to add a value in the __Schedule (CRON Syntax)__ field. For our use case, we are setting it to `0 12 * * *`, which will execute this function every day at 12:00.

We will again move to our project directory and use the Appwrite CLI to create a NodeJS 16.0 function called `create-statistics`.

```bash
appwrite init function
```

Within the `src/index.js`, put in the following content:

```js
const appwrite = require("node-appwrite");

module.exports = async function(req, res) {
  const STATISTICS_COLLECTION = req.env.STATISTICS_COLLECTION;
  const PROFILE_COLLECTION = req.env.PROFILE_COLLECTION;
  const POST_COLLECTION = req.env.POST_COLLECTION;
  
  // Initialise the client SDK
  const client = new appwrite.Client();
  const database = new appwrite.Database(client);
  
  client
      .setEndpoint(req.env.APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(req.env.APPWRITE_PROJECT_ID) // Your project ID
      .setKey(req.env.APPWRITE_API_KEY) // Your secret API key
  ;
  
  // Get the sum of Profiles and Posts
  const profiles = database.listDocuments(PROFILE_COLLECTION, [], 0).then(r => r.total);
  const posts = database.listDocuments(POST_COLLECTION, [appwrite.Query.equal('published', true)], 0).then(r => r.total);


  // Waiting for all promises to resolve and write into the Statistics Collection
  Promise.all([profiles, posts]).then(([profiles, posts]) => {
      return database.createDocument(STATISTICS_COLLECTION, "unique()", {
          posts: posts,
          profiles: profiles,
          timestamp: Date.now()
      }, ['role:all']);
  }).then(res.send).catch((err) => res.send(err, 500));
};
```

We will then deploy the function to our instance, go ahead and change our directory to the project one and run the following command:

```sh
appwrite deploy function
```

Make sure to select our `create-statistics` function and deploy it.

## Testing Our Cloud Function

We can easily test out our function by waiting for 12:00 or just executing it manually on your Functions page. If the function was executed successfully, you could head over to the __Statistics__ Collection, and you should find a document like this:

![Function Execution Result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t1cpgzcr2pwnf2q7bhk6.png)

With this data, we can create Charts and Statistics to monitor the usage of our application. 

Feel free to share how you would leverage this data and implement it in the Medium clone!

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

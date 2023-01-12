---
day: 4
title: "Appwrite Dashboard"
description: "Manage your Appwrite data with our dark-mode-friendly dashboard."
slug: "appwrite-dashboard"
path: "/appwrite/30daysofappwrite-appwrite-dashboard-15cc"
devto_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-dashboard-15cc"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--EJU8niHw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5xsi0uja61vzb1l1nxaw.png"
created_at: "2021-05-04T12:48:13Z"
updated_at: "2022-04-12T20:20:52Z"
published_at: "2021-05-04T13:05:33Z"
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

## Appwrite Dashboard
Welcome to Day 4 👋. It's time to finally take a look at Appwrite's shiny dashboard and look at all of Appwrite's features. This will only be a high-level overview as we will be going through each section in detail in our later tutorials.

## Welcome 
After logging into your Appwrite console, you will be greeted with a getting started page. This is where you can create your first project. 

![Create Project UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fsj5cg9pl5sq4xj59o9b.png)

Once you create a new project or select a project, you will be taken to the project home page 😊. 
## Home
On the home page, you will be greeted with some pretty graphs that highlight your project's usage stats. Here you can find the total number of requests that Appwrite has handled, the total bandwidth consumed, the total number of documents in your collections, the total number of users in your project, and more. 

![Appwrite Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gbh93jbu3bocojn9hcy2.png)
 

Below this you will find the **Platforms** section. This is where you can add a Web or Flutter project to Appwrite ( Stay tuned for more platforms coming soon 🤩 ). Adding a Platform is important because it tells Appwrite about trusted domains and restricts requests coming in from domains that are not listed here. This also fixes those nasty CORS issues 😏.

Let's start with the first item on the sidebar, **Database**.
## Database
The database section allows you to view, create, and edit your collections. It also allows you to view all the documents in your project. The main screen is where you can create your collection.

![Database UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5i7vp7js32ihvmcdqijh.png)
 
Once you create a collection, you can then click on it to configure it further. 

Under the **Documents** tab, you will find the documents added to your collection. 

![Documents UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hd60d3ld5uraqw8x77e5.png)
 
Under the **Attributes** tab, you'll be able to define the structure of the data in your collection. 

![Attributes UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/np1iw9toz75ab0b3v3y3.png)

Under the **Indexes** tab, you'll be able to define indexes that can be used to query your data. 

![Indexes UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ju0tnll80z178xd0v8t.png)

Under the **Activities** and **Usage** tab, you can find usage data about your collection. 

![Usage UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ij90of67yi3zhyylbjx6.png)

Under the **Settings** tab, you will find the collection ID, options to change the collection name, change the read and write permissions for your collection, delete your collection and more. 

![Settings UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jlsmbrwyr8ks2edf1c2m.png)
 

We will cover these concepts in detail in the upcoming days. For now, you just need to know where to find them.


## Storage 
The second option in the sidebar is **Storage**. This is where you can manage all the files uploaded to your server. Like documents in a collection, your files are organized into groups using Buckets. You can create buckets using the **Add Bucket** button.

![Bucket UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ecsq585iuak39wgb4woz.png)
 

You can upload files in the console using the **Add File** button at the bottom left. You can of course upload files using any of our SDKs or our CLI.

![File UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xpazye52a7qdlvlxbdfg.png)
 

Once you are done uploading your file, you can always update its permissions or delete it.

![Update File UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p3sg4llpnkdpgtswfbxr.png)
 
## Users 
This is the third section in the sidebar and where you manage all your projects' users. You can use this section to create, delete or even block certain users.

![Users UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mvpu6nt489u46v6xllti.png)

**Teams** tab allows you to create and manage your Teams.

![Teams UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdeye6zeqxrj0hc2dv3p.png)

 **Settings** tab allows you to enable and disable auth methods and OAuth providers. We have a total of 28 different OAuth providers(!), most of which are contributed by the community. So, if there is still a provider that we are missing, feel free to take a look at [how you can help add a new OAuth Provider](https://github.com/appwrite/appwrite/blob/master/docs/tutorials/add-oauth2-provider.md).

![User Settings UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hctmsx4gbymx6j81sudy.png)

## Functions
The fourth option on the sidebar is **Functions** - one of Appwrite's most powerful features! As the name suggests, Functions allow you and your users to execute serverless functions. As of writing this tutorial, we support 13 different environments for languages, including Node, PHP, Python, Ruby, Deno, Dart, and .NET. You can find more information about Functions [here](https://appwrite.io/docs/functions) 

![Cloud Functions UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/il4nmv4pczda9rfbvk79.png)

Once you create a function, you can deploy new versions of your function by creating a new **tag**. Each tag gets its own ID and exclusive container for executing its code. This can be done using the UI or the CLI.

Under the **Monitors** section, you will find visualizations that highlight executions, CPU utilisation and failures.

Under the **Logs** section, you will find execution logs for each execution of the function. 

Finally, under the **Settings** section, you can set permissions for executing your function or set up CRON schedules for triggering the function. You can also set up listeners to execute functions triggered by system events. [System Events](https://appwrite.io/docs/webhooks#events) are emitted when certain actions take place on the server, like the creation of a user, creation of a collection, document, etc., which can be used to trigger your cloud function. An example use-case: you would like to send a welcome email when a user signs up with your app. We have [covered this use case](https://dev.to/appwrite/sending-a-custom-welcome-email-using-appwrite-functions-and-mailgun-225a) in-depth and more, over at [dev.to](https://dev.to/appwrite).
Finally, in the **Settings** section of your Cloud Function, you can also add environment variables that this function may require. This could include API keys for third-party APIs that you may be using.

![Functions UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f0nusjw6d3jwe8mdw7bl.png)

## Webhooks 
The next item on our list is **Webhooks**. Webhooks allow you to hit 3rd party endpoints when [server events](https://appwrite.io/docs/webhooks#events) take place inside Appwrite. They are similar to tasks in that they can be used to hit external HTTP endpoints, but they are triggered differently from tasks (which use a CRON schedule).

![Webhooks UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1x01tt3g108e6w8ylo6c.png)

## API Keys
The next section on our list is **API Keys**. API Keys are required to interact with Appwrite from a Server SDK. Each API key is scoped to restrict access to only the selected features and prevent misuse. To create an API Key, simply select **Add API Key**, select the required scopes, give your key a name and click **Create**. You can now use this API key in your Server Side Integration.

![API Keys](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/swln5hn3yp87k20in2lf.png) 

## Settings

The **Settings** tab is where you will find the options to manage your project. You will find options to invite members to your project, set up custom domains, change the project name, delete the project etc.

Oh, and I almost forgot. Here's a fun little treat for your eyes 👀.

![Enable Dark Mode Toggle](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1wdke6bai9kryiq2ub1k.png)

Flip this switch and enter the dark side! 

![Dark Mode Enabled](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ksn4zxblk1ozhgps3gn0.png)

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋
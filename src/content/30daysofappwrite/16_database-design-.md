---
weight: 16
title: 'Database Design 🧐'
description: 'Planning and designing our collections'
slug: 'database-design'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-database-design-140a'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--4-t15_Cc--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5so2807ye8s2nycwkt82.png'
created_at: '2021-05-16T04:53:21Z'
updated_at: '2022-04-19T08:35:39Z'
published_at: '2021-05-16T13:09:46Z'
tags: ['30daysofappwrite', 'flutter', 'webdev', 'javascript']
authors:
  - name: 'Damodar Lohani'
    username: 'lohanidamodar'
    twitter_username: 'LohaniDamodar'
    github_username: null
    user_id: '551623'
    website_url: null
    profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Y2Vg3V3b--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg'
    profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--WbIqGPLg--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg'
---

## Intro

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Database Design 🧐

Welcome back to another session on the Appwrite Database 👋 . We hope you have gone through the [Day 15](link-to-day-15) article. It is important as we build upon the knowledge gained on Day 15 and plan and prepare the database for our demo application.

## Planning Data Structure

We will use the **Collection** and **Attributes** features provided by Appwrite Database to plan the data structures needed for our application. First, let's put down the requirements of our application.

### Post

A post refers to content that can be posted by any authenticated user. Anyone can signup and create a post. Our post will have **title**, **cover** image, **text**, **published** ( to signify whether the post is a draft or published) , **tags**, **created date** and **id** of the creator. Now we will plan this using the **Attributes** provided by Appwrite database.

First, we will create a collection as described on Day 15 and name it **Posts**. Then we will add the following attributes from the console and update the collection.

|              | Title  | Cover image | Text    | Published | Tags   | Created Date | User Id |
| ------------ | ------ | ----------- | ------- | --------- | ------ | ------------ | ------- |
| Type         | String | String      | String  | Boolean   | String | Integer      | String  |
| Attribute ID | title  | cover       | text    | published | tags   | created_at   | user_id |
| Size         | 255    | 1024        | 2000000 | N/A       | 1024   | N/A          | 255     |
| Min          | N/A    | N/A         | N/A     | N/A       | N/A    | leave blank  | N/A     |
| Max          | N/A    | N/A         | N/A     | N/A       | N/A    | leave blank  | N/A     |
| Required     | True   | True        | True    | True      | False  | True         | True    |
| Array        | False  | False       | True    | True      | True   | False        | False   |

Which will look like this in the console:

![Posts Collection UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yhab69jcexsv88gau1pt.png)

For the permissions, the read permission should be [`role:all`] as anyone should be able to read the posts, while the write permission for this collection should be [`role:member`] so that only logged in users can create a post.

We also need to create an index for the **user_id** and **published** attribute which we will use later in the functions to query the posts. For each index set the index _type_ to **Key** and set the _index key_ to the attribute name.

![Post Indexes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f9ndu8pgyb5zyx3c5rg9.png)

## Profile

We want to let our users have their profile with a public name so that we can display the author information in each post. We will also want to add a user's post as an embedded document in the collection so that we can fetch it easily with the user's profile.

Let's create another collection named **Users** with the following attributes

|              | User Id | Name   | Posts  |
| ------------ | ------- | ------ | ------ |
| Type         | String  | String | String |
| Attribute ID | user    | name   | posts  |
| Size         | 255     | 512    | 512    |
| Required     | True    | True   | False  |
| Array        | False   | False  | True   |

![Profile Collection UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6je3g28v2b9bfzrmkl2x.png)

As for the permissions, read permission should be [`role:all`] as anyone should be able to read, and write permission can be [`role:member`] so that anyone signed in can create a profile.

As we did for the posts, we will also create an index for the **user** attribute in the **Profiles** collection. Make sure the index _type_ is set to **key** and the _index key_ is set to the attribute name.

![Profile Indexes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mpeepmcxgvl8otq07m3u.png)

So, this is how easy it is to plan data structures for any application using **Collections** and **Attributes** - it is very similar to traditional Relational Databases where we plan using **tables** and **columns**.

We have now planned the database required for our application. On Day 17, we will continue to use these collections in our application.

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

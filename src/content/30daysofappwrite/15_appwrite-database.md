---
weight: 15
title: 'Appwrite Database'
description: 'What’s an app without a Database!'
slug: 'appwrite-database'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-appwrite-database-22an'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--rtwQh-I_--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wdyqrbys59h7se15tyuy.png'
created_at: '2021-05-15T12:59:00Z'
updated_at: '2022-04-12T17:27:52Z'
published_at: '2021-05-15T13:30:01Z'
tags: ['javascript', 'flutter', 'webdev', '30daysofappwrite']
authors:
  - name: 'Christy Jacob'
    username: 'christyjacob4'
    twitter_username: null
    github_username: 'christyjacob4'
    user_id: '119691'
    website_url: null
    profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--xsn7j9ry--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png'
    profile_image_90: 'https://res.cloudinary.com/practicaldev/image/fetch/s--IX4ROHsY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/119691/5be2bcad-e1ee-4ef8-928b-d71f4e355af6.png'
---

## Intro

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

# Appwrite Database

Welcome to Day 15 👋. Today is finally the day to cover storing data in the Appwrite database. Appwrite offers an easy-to-use, document-based database API for storing your app's data. We built our NoSQL interface on top of MariaDB, inspired by [Wix](https://www.wix.engineering/post/scaling-to-100m-mysql-is-a-better-nosql), who did the same. MariaDB provides its battle-tested stability and performance, and you can manage Appwrite using existing, familiar database tools like MySQLWorkbench, phpMyAdmin, and more. Collections, documents, attributes, and permissions can all be managed with the Appwrite console or with our [SDKs](https://appwrite.io/docs/sdks). There's a lot to cover, so let's dive in.

> A database refactor is underway to improve overall performance and add support for a variety of databases, including PostgreSQL, MongoDB, and more!

## Glossary

Each database comes with its own set of technical jargon - before we get too far, let's go over ours.

- **Collection**: A group of **documents**. Each **collection** has **attributes** to define its **document** structure and **permissions** for _read_ and _write_.
- **Document**: A structured JSON object of _keys_ and _values_, belonging to a **collection**. _Keys_ and their types are defined in a **collection attribute**.
- **Attributes**: The definition of each **document** attribute. Each attribute has _key_, _attribute type_, _default_, _required_ and _array_ properties, which define the type and structure of expected data. Think of them as columns in a traditional relational database.
- **Permissions**: Array of strings that define the access control to **documents**, **collections**, and files in storage.

Now, let's review each in more detail.

## Collections and Documents

In short: _collections_ hold _documents_. If you're a SQL veteran, you might know these better as _tables_ and _rows_ (and internally, that's technically correct). Each collection is identified by `collectionID` and holds many similarly formatted documents where each document is a piece of data. The kind of data accepted by Appwrite is governed by the **attributes** defined for the collection.

The ID for a collection or a document can be custom or randomly generated. For custom IDs, simply pass in a string ID of your choice. For randomly generated IDs, you can pass in the string `unique()` to indicate that an ID should be unique and randomly generated.

## Attributes

Simply put, **attributes** outline what your documents should look like. With this approach, Appwrite's rule validators ensure the data going into your database is the exact format you expect. So, for each key-value pair of our document, we provide:

| Property | Description                     |
| -------- | ------------------------------- |
| key      | Name of the attribute.          |
| type     | Data type of the attribute.     |
| default  | Default value of the attribute. |
| required | If the attribute is required.   |
| array    | If the attribute is an array.   |

Here are the validators available for _attribute types_:

| Attribute Type | Description                     |
| -------------- | ------------------------------- |
| String         | Any string value.               |
| Integer        | Any integer value.              |
| Float          | Any float value.                |
| boolean        | Any boolean value.              |
| url            | Any valid URL.                  |
| email          | Any valid email address.        |
| ip             | Any valid IPv4 or IPv6 address. |
| enum           | Any enum defined by you.        |

## Permissions

To control access to resources, Appwrite offers developers a flexible permission system that is aware of Appwrite users and teams. Let's cover the most used permissions:

| Permission             | Description                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `role:all`             | Wildcard permission. Grants anyone read or write access.                                                                                     |
| `user:[userID]`        | Grants access to a specific user by userID.                                                                                                  |
| `team:[teamID]`        | Grants access to any member of the specific team. Note: the user must be the team owner or have accepted a team invite to grant this access. |
| `team:[teamID]/[role]` | Grants access to any member who possesses a specific role in a team. Roles can be assigned on invite.                                        |
| `member:[memberID]`    | Grants access to a specific member of a team, only while they are still a member of the team.                                                |
| `role:guest`           | Grants access to any guest user who **isn't** logged in.                                                                                     |
| `role:member`          | Grants access to any logged-in user (a user with a valid session). Logged in users don't have access to `role:guest` resources.              |

> Note: documents don't inherit permissions from their parent collection if the collection's permission level is set to _Document Level_.

## Query Building

After building **Indexes** for your collection, you can query these indexes using any of our [client side SDKs](https://appwrite.io/docs/client/database) or [server side SDKs](https://appwrite.io/docs/server/database). Each SDK comes packaged with a `Query` class which allows you to build query statements. The `Query` class will turn the provided queries into a string. You can write query strings directly if you're not using an SDK, but we will be using the `Query` class in our posts.

Let's start with a simple example:

Here's an example which finds movies with the title `Avatar` or `Lord of the Rings` from years after 1999:

```javascript
sdk.database.listDocuments('movies', [
	Query.equal('title', ['Avatar', 'Lord of the Rings']),
	Query.greater('year', 1999)
]);
```

Here's the same example with Dart/Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() async {
    final client = Client();
    final database = Database(client);
    try {
        final docs = await database.listDocuments(
            collectionId: 'movies',
            queries: [
                Query.equal('title', ['Avatar', 'Lord of the Rings']),
                Query.greater('year', 1999),
                ]);
        print(docs.toMap());
    } on AppwriteException catch(e) {
        print(e);
    }
}
```

Appwrite supports seven types of query operations:

| Operator     | Description                |
| ------------ | -------------------------- |
| equal        | Equal to.                  |
| notEqual     | Not equal to.              |
| lesser       | Lesser than.               |
| lesserEqual  | Less than or equal to.     |
| greater      | Greater than.              |
| greaterEqual | Greater than or equal to.  |
| search       | Requires a Fulltext Index. |

When passed into `listDocuments()`, an `AND` operation is applied to the list of query operations. For `OR` behavior, pass in an array of values into an operator.

## Putting it all together

As an example, let's create a collection of books in Appwrite. While some projects require creating collections programmatically, others are easier to create with the Appwrite console.

![Create collection](./new_collection.png)

A book has a _title_, _author_, and year it was _published_. Let's add those, starting with _title_ using the _text_ rule type:

![Add Title Rule](./create_rule_title.png)

If you see, new attributes are not _required_ by default. Let's make _title_ required:

![Make Title Required](./create_rule_title_required.png)

Now, we can do the same for _author_ and _published_, using the _numeric_ rule type for publication year, so we now have:

![Add Published Rule](./create_rule_published.png)

### Permissions, by example

Now that our Books collection has the necessary attributes, we can create documents and restrict access as necessary. Check out the following code:

```javascript
let sdk = new Appwrite();
sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let promise = sdk.database.createDocument(
	'609bdea2f0f99', // collectionID for Books
	'unique()', // unique() will create a random ID
	{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: 1925 },
	['role:member'],
	['team:5c1f88b87435e/owner', 'user:6095f2933a96f']
);
```

In this example, the new book from [`createDocument`](https://appwrite.io/docs/client/database#databaseCreateDocument) can be read by any logged in user, but only the **owner** of Team **5c1f88b87435e** and User **6095f2933a96f** have the permissions to write (or update).

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

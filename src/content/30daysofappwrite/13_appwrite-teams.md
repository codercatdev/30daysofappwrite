---
weight: 13
title: 'Appwrite Teams'
description: 'How to organize your users into groups.'
slug: 'appwrite-teams'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-appwrite-teams-2fjd'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--2gJ7oK60--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gzdwiyfpzt92dzrl657l.png'
created_at: '2021-05-13T13:04:54Z'
updated_at: '2022-04-12T16:15:05Z'
published_at: '2021-05-13T13:09:02Z'
tags: ['javascript', 'webdev', 'flutter', '30daysofappwrite']
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Teams API

Welcome to Day 13 👋. Today we'll go through the Teams API and understand how it allows us to manage permissions for groups of users easily. The main purpose of Teams API is to create groups of users and grant bulk permissions in an easy way. These permissions can then be used to control access to Appwrite's resources like documents and files in storage.

Let's say you have a text file that you would like to share with a group of friends. In that case, you can create a team and give different roles to the team members. (view, edit, comment, owner etc.)

Team permissions in Appwrite use one the following syntaxes

- **team:[TEAM_ID]**

  This permission grants access to any member of the specific team. To gain access to this permission, the user must be the team creator (owner), or receive and accept an invitation to join this team.

- **member:[MEMBER_ID]**

  This permissions grants access to a specific member of a team. This permission will only be valid as long as the user is still an active member of the specific team. To view a user's member ID, fetch the team members list using the [Get Team Memberships](https://appwrite.io/docs/client/teams?sdk=web#teamsGetMemberships) endpoint.

- **team:[TEAM_ID]/[ROLE]**

  This permission grants access to any member who possesses a specific role in a team. To gain access to this permission, the user must be a member of the specific team and have the given role assigned to them. Team roles can be assigned when inviting a user to become a team member. `ROLE` can be any string. However, the `owner` role is created automatically when a new team is created from a Client SDK.

Let's take a few examples to make this clear:

| Permission       | Description                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| team:abcd        | access to all members of team abcd                                                                                |
| team:abc         | Access to all members of team abc                                                                                 |
| member:abc       | Access to a user with membershipId abc                                                                            |
| team:abcd/owner  | Access to members of team abcd who have the role `owner`. By default, only the creator of the team has this role. |
| team:abcd/viewer | Access to members of team abcd who have the role `viewer`.                                                        |

The Teams API is accessible from both the Client and Server SDKs. We will cover how to create these teams and assign roles using both the Client and Server SDKs 😊.

## Gotchas

There are notable differences between when you create a team from a client-side SDK and when you create a team using a server-side SDK.

When a user creates a team using a Client SDK, they become the team owner and are automatically assigned the **`team:[TEAM_ID]/owner`** role.

When you create a team using a Server SDK using an API key, there is no logical owner since API keys run in [admin mode](https://appwrite.io/docs/admin). In this case, the Server SDK should also create the first member of the team and explicitly assign the owner permissions. We will cover these with an example.

## Client SDK

This is where you can find the docs for the [Client Teams API](https://appwrite.io/docs/client/teams). Creating a team is really simple - all you need to do is think of a "Really Cool Name".

```js
let promise = sdk.teams.create('unique()', 'Really Cool Name');
promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

Notice the first parameter we passed in, which is the string `'unique()'`, which tells Appwrite to generate a random team ID for the new team. Appwrite supports custom IDs, so you can pass in your own custom IDs using this parameter, too.

This will create a team with the current user as the `owner`. You can verify this by heading to your **Appwrite Console** > **Users** > **Teams** > **Really Cool Name**

![Teams UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hag6hf6tbp58ykfz813b.png)

To add new members to this team, you can make use of the [`createMembership()`](https://appwrite.io/docs/client/teams#teamsCreateMembership) function. Only `owners` of a team can add new members to the team. An email with a link to join the team will be sent to the new member's email address. If the member doesn't exist in the project, it will be created automatically.

> Before this, ensure that you have SMTP setup on your Appwrite Server. We covered this in our previous tutorial on Day 11.

Let's say you would like to invite a new member ( `email@example.com` ) to your team and grant them two new roles in the team, namely: `viewer` and `editor`. You can do this using the following snippet. Use the 'URL' parameter to redirect the user from the invitation email back to your app. When the user is redirected, use the [Update Team Membership Status](https://appwrite.io/docs/client/teams?sdk=web#teamsUpdateMembershipStatus) endpoint to allow the user to accept the invitation to the team.

```js
let promise = sdk.teams.createMembership(
	'[TEAM_ID]',
	'email@example.com',
	'',
	['viewer', 'editor'],
	'https://example.com/acceptTeamInvite'
);

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

When the user clicks on the team invitation email from their inbox, they will be redirected to `https://example.com/acceptTeamInvite?teamId=xxx&inviteId=yyy&userId=zzz&secret=xyz`. The four parameters can then be extracted from the query string, and the `updateMembershipStatus()` method can be called to confirm membership to the team.

```js
let promise = sdk.teams.updateMembershipStatus('[TEAM_ID]', '[INVITE_ID]', '[USER_ID]', '[SECRET]');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

We will use this in practice in tomorrow's tutorial where we add support to invite users to a team in our blog app!

## Server SDK

The server version of the function looks really similar to the client version, but the key difference here is the usage of an API key with a `teams.read` and `teams.write` scopes. This function creates a team, but unlike the Client SDK, this team has no members yet.

```js
const sdk = require('node-appwrite');

// Init SDK
let client = new sdk.Client();

let teams = new sdk.Teams(client);

client
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('<Your Project ID>') // Your project ID
	.setKey('<Your API Key>'); // Your secret API key

let promise = teams.create('unique()', 'Really Cool Team');

promise.then(
	function (response) {
		console.log(response);
	},
	function (error) {
		console.log(error);
	}
);
```

We need to explicitly add members to this team using the Server version of [`createMembership()`](https://appwrite.io/docs/server/teams?sdk=nodejs#teamsCreateMembership). The parameters here are exactly the same as the Client version.

```js
let promise = teams.createMembership(
	'[TEAM_ID]',
	'email@example.com',
	'',
	['owner'],
	'https://example.com/acceptTeamInvite'
);

promise.then(
	function (response) {
		console.log(response);
	},
	function (error) {
		console.log(error);
	}
);
```

When a new member is added to the team from the server, email verification is not required, and hence no email will be sent in this case.

That's a wrap! You now know how to add new members to your team, both from the client and the server. In the next article, we will add this functionality to our demo app!

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

---
day: 14
title: "Using Team Invites"
description: "Send out email invites to your new teams."
slug: "using-team-invites"
devto_url: "https://dev.to/appwrite/30daysofappwrite-using-team-invites-gk1"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--kgxPIVKI--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/48ypwz7hq6525bhzby9e.png"
created_at: "2021-05-14T12:50:16Z"
updated_at: "2022-04-12T17:25:32Z"
published_at: "2021-05-14T12:54:32Z"
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month long event focused at giving developers a walk through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully featured Medium clone to demonstrate how these
concepts can be applied when building a real world app. We also have some exciting prizes for developers who follow along with us!

# Using Team Invites

Welcome to Day 14 👋 . Yesterday, we talked in depth about the teams API and the conventions of creating team permissions in Appwrite. We will build upon yesterday's concept's to add some cool features to our demo app.

We will incorporate the following features into our demo app in this article.
1. [Create Teams](https://appwrite.io/docs/client/teams?sdk=web#teamsCreate) 
2. [List User's Teams](https://appwrite.io/docs/client/teams?sdk=web#teamsList)
3. [Delete Team](https://appwrite.io/docs/client/teams?sdk=web#teamsDelete)
4. [Get Team by ID](https://appwrite.io/docs/client/teams?sdk=web#teamsGet)
5. [Get members of a team](https://appwrite.io/docs/client/teams#teamsGetMemberships)
6. [Add a new team member](https://appwrite.io/docs/client/teams#teamsCreateMembership)
7. [Update Membership status](https://appwrite.io/docs/client/teams#teamsUpdateMembershipStatus)
8. [Remove a user from a team](https://appwrite.io/docs/client/teams#teamsDeleteMembership)

We will be creating three new routes in our project. 
1. A `/profile/:id/teams` route to allow a user to see all the teams they're part of and also create new teams. This route will implement features [1,2,3]
2. A `/team/:id` route that will display details of a particular team ID and allow users to manage members of the team. This route will implement features [3,4,5,6,8]
3. An `/acceptMembership` route that will enable a new team member to accept a team invite. This route will implement feature [7]

## Setup 
So let's get started. In `src/App.svelte` create three new routes.

```js
import Team from "./routes/Team.svelte";
import Teams from "./routes/Teams.svelte";
import AcceptMembership from "./routes/AcceptMembership.svelte";

const routes = {
    ...
    "/profile/:id/teams" : Teams,
    "/team/:id" : Team,
    "/acceptMembership": AcceptMembership,
    ...
};
```

Head over to `src/appwrite.js` and add the following functions:

```js
...

fetchUserTeams: () => sdk.teams.list(),
createTeam: name => sdk.teams.create('unique()', name),
deleteTeam: id => sdk.teams.delete(id),
getTeam: id => sdk.teams.get(id),
getMemberships: teamId => sdk.teams.getMemberships(teamId),
createMembership: (teamId, email, roles, url, name) =>
    sdk.teams.createMembership(teamId, email, roles, url, name),
updateMembership: (teamId, inviteId, userId, secret) =>
    sdk.teams.updateMembershipStatus(teamId, inviteId, userId, secret),
deleteMembership: (teamId, inviteId) =>
    sdk.teams.deleteMembership(teamId, inviteId)
...
```

In `src/lib/Navigation.svelte` we will create a link to the main `/profile/:id/teams` route. 

```html
...
{#if $state.user}
    <a href={`/profile/${$state.user.$id}`} use:link>{$state.user.name}</a>
    <a href={`/profile/${$state.user.$id}/teams`} use:link>My Teams</a>
    <a href="/logout" use:link>Logout</a>
{:else}
...
```

## Create a page to display all of the user's teams
Create a file `src/routes/Teams.svelte`. This is where the user can view all of their teams and create new teams. Add the following code in the `<script>` section.

```html
<script>
  import { link } from "svelte-spa-router";
  import Avatar from "../lib/Avatar.svelte";
  import Loading from "../lib/Loading.svelte";
  import { api } from "../appwrite";
  export let params = {};

  let name;

  const fetchUser = () => api.fetchUser(params.id);
  const getAvatar = (name) => api.getAvatar(name);
  const fetchTeams = () => api.fetchUserTeams().then((r) => r.teams);
  const createTeam = (name) => api.createTeam(name);
  const deleteTeam = (id) => api.deleteTeam(id);
  let all = Promise.all([fetchUser(), fetchTeams()]);
</script>
```

Let's now write some basic markup:

```html
<section>
    {#await all}
        <Loading />
    {:then [author, teams]}
        <section class="author">
            <Avatar src={getAvatar(author.name)} />
            <h3>{author.name}</h3>
        </section>
        <section>
            <h1>My Teams</h1>
            <ul>
                {#each teams as team}
                    <li>
                        <a href={`/team/${team.$id}`} use:link>{team.name}</a>
                        <button
                            on:click={async () => {
                                await deleteTeam(team["$id"]);
                                all = Promise.all([
                                    author,
                                    fetchTeams(),
                                ]);
                                console.log("Deleted team", team["$id"]);
                            }}>❌</button>
                    </li>
                {/each}
            </ul>
        </section>

        <section>
            <h1>Create Team</h1>
            <div>
                <label for="team" />
                <input
                    type="text"
                    name="team"
                    placeholder="Enter Team Name"
                    bind:value={name} />
                <button
                    on:click={async () => {
                        await createTeam(name);
                        all = Promise.all([author, fetchTeams()]);
                        console.log("team created");
                    }}>Create Team</button>
            </div>
        </section>
    {:catch error}
        {error}
        <p>
            Public profile not found
            <a href="/profile/create" use:link>Create Public Profile</a>
        </p>
    {/await}
</section>
```

The above markup does the following. 
* Displays a list of teams that the user is a part of.
* Defines a button to delete a team.
* Defines a button to create new teams.


Next, let's create a page to display the details of each team as defined by the `<a>` tag in the markup above. 

## Create a page to display details of a particular team
Create a new file `src/routes/Team.svelte`. 
Under the `<script>` tag add the following:

```html
<script>
    import { link } from "svelte-spa-router";
    import Loading from "../lib/Loading.svelte";
    import { api } from "../appwrite";
    import { state } from "../store";

    export let params = {};

    let name = "",
        email = "";

    const fetchTeam = () => api.getTeam(params.id);
    const fetchMemberships = () =>
        api.getMemberships(params.id).then(r => r.memberships);
    const createMembership = (email, name) =>
        api.createMembership(
            params.id,
            email,
            ["member"],
            `${window.origin}/#/acceptMembership`,
            name
        );
    const deleteMembership = async (teamId, membershipId) => {
        try {
            await api.deleteMembership(teamId, membershipId);
            all = Promise.all([fetchTeam(), fetchMemberships()]);
        } catch (error) {
            alert(error.message);
        }
    };

    let all = Promise.all([fetchTeam(), fetchMemberships()]);
</script>
```

Let's add some markup to define the layout:

```html
<section>
    {#await all}
        <Loading />
    {:then [team, memberships]}
        <section>
            <div class="header">
                <h1>{team.name}</h1>
                <button
                    on:click={async () => {
                        api.deleteTeam(params.id).then(() => {
                            window.history.go(-1);
                        });
                    }}>❌ Delete Team</button>
            </div>
            <div>
                <label for="email" />
                <input
                    type="text"
                    name="email"
                    placeholder="Enter Email Address"
                    bind:value={email} />
                <label for="name" />
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    bind:value={name} />
                <button
                    on:click={async () => {
                        await createMembership(email, name);
                        all = Promise.all([fetchTeam(), fetchMemberships()]);
                        console.log("membership created");
                    }}>➕ Add Member</button>
            </div>
            <h3>Members</h3>
            <ul>
                {#each memberships as member}
                    <li>
                        <div>
                            <div>
                                <p>Name : {member.name}</p>
                                {#if member.userId != $state.user.$id}
                                <button on:click={() => deleteMembership(params.id, member.$id)}
                                    >❌ Delete Member</button>
                                {/if}
                            </div>

                            <p>Email: {member.email}</p>
                            <p>
                                Invited on : {new Date(member.invited * 1000)}
                            </p>
                            <p>Joined on : {new Date(member.joined * 1000)}</p>
                            <p>Confirmed : {member.confirm}</p>
                            <p>Roles : {member.roles}</p>
                        </div>
                    </li>
                {/each}
            </ul>
        </section>
    {:catch error}
        {error}
        <p>
            Team not found
            <a href="/" use:link>Go Home</a>
        </p>
    {/await}
</section>
```

We will be ignoring the styling here. For more details about the styling you can take a look at the [project's repo](https://github.com/christyjacob4/30-days-of-appwrite).

The above markup does a couple of things:
* Displays a list of members in a particular team.
* Allow the user to add new members to the team 
* Allow the user to delete members from the team.
* Allow the user to delete the team.

## Create a page to accept team membership
When we click the `Add Member` button, an email is sent to the invitee with an invite link. The link should redirect the invitee back to your app, where you need to call the [Update Team Membership Status](https://appwrite.io/docs/client/teams#teamsUpdateMembershipStatus) method to confirm the membership. In our case, the link would take the user to `https://<your domain>/#/acceptMembership`. For users who already have an account in your app, it simply adds them to the team. For new users, it creates a new account for them in addition to adding them to the team.

Create a new file `src/routes/AcceptMembership.svelte` and add the following code in the `<script>` section:

```html
<script>
    import { api } from "../appwrite";
    let urlSearchParams = new URLSearchParams(window.location.search);
    let inviteId = urlSearchParams.get("inviteId");
    let secret = urlSearchParams.get("secret");
    let teamId = urlSearchParams.get("teamId");
    let userId = urlSearchParams.get("userId");
    api.updateMembership(teamId, inviteId, userId, secret).then(() => {
        window.location = "/"
    });
</script> 
```

Just like that, you can now create and manage teams in your application! Kudos for making it this far. 

## Credits

We hope you liked this post. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

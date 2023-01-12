---
day: 18
title: "Create Blog Posts"
description: "Allow users to create blog posts in our demo app."
slug: "create-blog-posts"
devto_url: "https://dev.to/appwrite/30daysofappwrite-create-blog-posts-31fi"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--8jroqjg1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/705igi7mb6o8c0fa1m46.png"
created_at: "2021-05-18T13:04:31Z"
updated_at: "2022-04-12T17:33:43Z"
published_at: "2021-05-18T13:08:52Z"
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
[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside, we will also be building a fully-featured Medium clone to demonstrate how these 
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Retrieving Blog Posts
Welcome back to another session on the Appwrite Database 👋 . We hope you have gone through the [Day 17](https://dev.to/appwrite/30daysofappwrite-create-user-profiles-1c3m) article. It is important as we build upon the knowledge gained in Day [16](https://dev.to/appwrite/30daysofappwrite-database-design-140a) and [17](https://dev.to/appwrite/30daysofappwrite-create-user-profiles-1c3m). Now it's time to integrate our main feature into our app, Blog Posts.

We will use the **Post** Collection to have users create posts that are embedded into their profiles.

For this, we need to add several methods to our `appwrite.js` file:

- Fetch all Posts
- Fetch all Posts from a User
- Fetch a single Post
- Create/Edit/Delete a Post

The first method to add will be the one that fetches all posts. Technically, we want to retrieve the latest 25 posts with the [`listDocuments`](https://appwrite.io/docs/client/database?sdk=web#databaseListDocuments) method, sorted from new to old, which have the `published` attribute to `true` from the server. For this, we are going to add the following to the `appwrite.js` file:

```js
export const api = {
    //...
    fetchPosts: (limit, offset) => {
        return sdk.database.listDocuments(
            postsCollection,
            [Query.equal("published", 1)],
            limit,
            offset,
            "created_at",
            "DESC",
            "int"
        );
    },
    //...
}
```

To fetch all posts from a user, we are going to write a similar method - except that we will filter by a **User ID** in the `user_id` attribute:

```js
export const api = {
  //...
    fetchUserPosts: userId => {
        return sdk.database.listDocuments(
            postsCollection,
            [
                Query.equal("published", 1),
                Query.equal("user_id", userId),
            ],
            100,
            0,
            "created_at",
            "DESC",
            "int"
        );
  },
  //...
}
```

 To fetch a single post, we will use the [`getDocument`](https://appwrite.io/docs/client/database?sdk=web#databaseGetDocument) method where we can pass an ID, instead of the previously used [`listDocuments`](https://appwrite.io/docs/client/database?sdk=web#databaseListDocuments).

```js
export const api = {
    //...
    fetchPost: id => sdk.database.getDocument(postsCollection, id),
    //...
}
```

And for deleting a post, we can use the [`deleteDocument`](https://appwrite.io/docs/client/database?sdk=web#databaseDeleteDocument) method like this:

```js
export const api = {
    //...
    deletePost: id => sdk.database.deleteDocument(postsCollection, id),
    //...
}
```
We will also add two more methods to create and edit a post, these will use [`createDocument`](https://appwrite.io/docs/client/database#databaseCreateDocument) and [`updateDocument`](https://appwrite.io/docs/client/database#databaseUpdateDocument) respectively.

```js
export const api = {
    createPost: async (data, userId, profileId) => {
        return sdk.database.createDocument(
            postsCollection,
            "unique()",
            data,
            ["role:all"],
            [`user:${userId}`]
        );
    },
    updatePost: async (id, data, userId) => {
        return sdk.database.updateDocument(
            postsCollection,
            id,
            data,
            ["role:all"],
            [`user:${userId}`]
        );
    },
}
```

We will also quickly create the `src/lib/Author.svelte` file and add the following contents to it:
```html
<script>
    import { api } from "../appwrite";
    import Avatar from "./Avatar.svelte";
    import Loading from "./Loading.svelte";
    export let user;
    const getAvatar = name => api.getAvatar(name);
    const fetchUser = api.fetchUser(user);
</script>

<a class="author" href={`#/profile/${user}`}>
    {#await fetchUser}
        <Loading />
    {:then author}
        <Avatar src={getAvatar(author.name)} />
        <h3>{author.name}</h3>
    {/await}
</a>

<style>
    a.author {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>
```
We will also create the `src/lib/Avatar.svelte` file and write this:
```html
<script>
    export let src;
</script>

<img {src} alt="" />

<style>
    img {
        border-radius: 100%;
        height: 3rem;
    }
</style>
```
Next we will introduce the API functionality for the newly created Author component, go ahead and open up `appwrite.js` and update the code to add the following new method:
```js
export const api = {
    getAvatar: name => {
        return sdk.avatars.getInitials(name);
    },
}
```

Now that we have all the API requests ready to retrieve blog posts, we now need to add Routes and Components for it. For this, we edit the `src/routes/Index.svelte` file, which will display all blog posts.

```html
<script>
    import md from "snarkdown";
    import Loading from "../lib/Loading.svelte";
    import Action from "../lib/Action.svelte";
    import Author from "../lib/Author.svelte";
    import Preview from "../lib/Preview.svelte";
    import { api } from "../appwrite";
    const data = api
        .fetchPosts(25, 0)
        .then(r => r.documents)
        .then(posts => {
            return {
                promoted: posts[0],
                featured: posts.slice(1, 5),
                latest: posts.slice(5),
            };
        });
</script>

{#await data}
    <Loading />
{:then { promoted, featured, latest }}
    <section class="top">
        <div class="promoted">
            {#if promoted.cover}
                <img src={promoted.cover} alt={promoted.title} />
            {/if}
            <h2>{promoted.title}</h2>
            <Author user={promoted.user_id} />
            <p>
                {@html md(promoted.text)}
            </p>
            <Action href={`#/post/${promoted.$id}`}>Read more</Action>
        </div>
        <div class="cards">
            {#each featured as feature}
                <a class="card" href={`#/post/${feature.$id}`}>
                    {#if feature.cover}
                        <img
                            src={feature.cover}
                            alt={feature.title} />
                    {/if}
                    <h2>{feature.title}</h2>
                </a>
            {/each}
        </div>
    </section>
    <h1>Latest</h1>
    <section class="latest">
        {#each latest as post}
            <Preview {post} />
        {/each}
    </section>
{/await}

<style>
    section.top {
        display: flex;
        justify-content: space-evenly;
        gap: 1rem;
    }
    section.latest {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: auto;
        align-content: start;
        gap: 1rem;
    }
    img {
        width: 100%;
    }
    .promoted img {
        border-radius: 0.5rem;
    }
    .cards {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
    .cards .card {
        font-size: 0.75rem;
        display: flex;
        border-radius: 0.5rem;
        align-items: center;
        gap: 0.5rem;
        background-color: white;
        transition: all 0.2s;
    }
    .cards .card:hover {
        background-color: #f02e65;
        color: white;
        transform: scale(1.05);
    }
    .card img {
        width: 50%;
        height: 100%;
        border-radius: 0.5rem;
        object-fit: cover;
    }
</style>
```

In this example, the `fetchPosts()` method retrieves the latest 25 posts from our Database and splits them up into the following object structure:

- **Promoted** - The latest Post
- **Featured** - The next 4 posts subsequent to **Promoted**
- **Latest** - All the remaining Posts

On Day 17, we created a Profile page, but there were no posts yet. To add this feature, we will revisit `src/routes/Profile.svelte` and update the following code.

```html
<script>
    import Preview from "../lib/Preview.svelte";
    import MyPost from "../lib/MyPost.svelte";
    //...
    const fetchUser = () => api.fetchUser(params.id);
    const fetchPosts = () => api.fetchUserPosts(params.id).then(r => r.documents);
    let all = Promise.all([fetchUser(), fetchPosts()]);
</script>

<section>
    {#await all}
        <Loading />
    {:then [author, posts]}
        <section class="author">
            <h3>{author.name}</h3>
        </section>
        {#if $state.user.$id == params.id}
            <h1>My Posts</h1>
            <p><a class="button" href="/create" use:link>Create</a></p>
            <section class="my-post">
                {#each posts as post}
                    <MyPost on:deleted={() => {all = Promise.all([fetchUser(), fetchPosts()]); console.log("deleted")} } {post} />
                {/each}
            </section>
        {:else}
            <h1>Latest Posts</h1>
            <section class="latest">
                {#each posts as post}
                    <Preview {post} />
                {/each}
            </section>
        {/if}
    {:catch error}
        {error}
        <p>
            Public profile not found
            <a href="/profile/create" use:link>Create Public Profile</a>
        </p>
    {/await}
</section>

```

We are using two components here that haven't been created yet. `MyPost` is an editable component that will be shown only to the post owner and allow them to edit and delete their posts.  
On the other hand, the `Preview` component is a read-only component that is used solely to display a preview of a blog post. We will reuse this component in the `Index` route.

**src/lib/Preview.svelte**

```html
<script>
    export let post;
</script>

<a href={`#/post/${post.$id}`}>
    {#if post.cover}
        <img
            class="cover"
            src={post.cover}
            alt={post.title} />
    {/if}
    <h2>{post.title}</h2>
</a>

<style>
    img.cover {
        width: 100%;
        border-radius: 0.5rem;
    }
    a {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-radius: 0.5rem;
        background-color: white;
        max-width: 18rem;
        font-size: 1.1rem;
        line-height: 2rem;
        transition: all 0.2s;
    }
    a:hover {
        background-color: #f02e65;
        color: white;
        transform: scale(1.05);
    }
    h2 {
        font-size: 1.1rem;
        margin: 0.5rem;
        text-align: center;
    }
</style>
```

**src/lib/MyPost.svelte**

```html
<script>
    import { createEventDispatcher } from "svelte";
    import { link } from "svelte-spa-router";
    import { api } from "../appwrite";
    export let post;
    const dispatch = createEventDispatcher()
    const deletePost = async id => {
        if (confirm("are you sure you want to delete?")) {
            await api.deletePost(id);
            dispatch('deleted');
        }
    };
</script>

<article class="card">
    {#if post.cover}
        <img
            class="cover"
            src={post.cover}
            alt={post.title} />
    {/if}
    <h2>{post.title}</h2>
    <a href="/post/{post.$id}" use:link class="button">Preview</a>
    <a href="/post/{post.$id}/edit" use:link class="button">Edit</a>
    <a
        href="/delete"
        on:click|preventDefault={() => deletePost(post.$id)}
        class="button">Delete</a>
</article>

<style>
    article.card {
        background-color: white;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
    }
    img.cover {
        width: 8rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
    h2 {
        font-size: 1.1rem;
        margin: 0.5rem;
        text-align: center;
    }
</style>
```

Now the component to display a single blog post is left. For this, we are going to create **src/routes/Post.svelte** with the following content:

```html
<script>
    import md from "snarkdown";
    import Loading from "../lib/Loading.svelte";
    import Author from "../lib/Author.svelte";
    import { api } from "../appwrite";
  
    export let params = {};
  
    let postFetch = api.fetchPost(params.slug);
</script>

{#await postFetch}
    <Loading />
{:then post}
    <h1>
        {post.title}
    </h1>
    <Author user={post.user_id} />
    {#if post.cover}
        <img class="cover" src={post.cover} alt={post.title} />
    {/if}
    <section class="content">
        {@html md(post.text)}
    </section>
    <h2>Comments</h2>
{/await}

<style>
    img.cover {
        width: 100%;
        border-radius: 0.5rem;
    }
    section.content {
        font-size: 1.1rem;
        line-height: 2rem;
    }
</style>
```

Now all blog posts can be read. Unfortunately, we have no way to verify this as our users cannot create posts yet. We will take care of this in the next section.

## Creating Blog Posts

Now we are going to add the first component, which is going to write data to our Appwrite database. For this, we are going to add the `src/routes/Create.svelte` file and fill it with the following content:

```html
<script>
    import EasyMDE from "easymde";
    import { api } from "../appwrite";
    import { state } from "../store";
    import { onMount } from "svelte";
    import { replace } from 'svelte-spa-router';
    import "../../node_modules/easymde/dist/easymde.min.css";
    import Loading from "../lib/Loading.svelte";
    export let params = {};
    let published = false,
        title = "",
        easyMDE,
        message = "",
        loading = false,
        cover,
        post,
        content = "";
    let postFetch = async () => {
        post = await api.fetchPost(params.slug);
        title = post.title;
        easyMDE.value(post.text);
        cover = post.cover;
    };
    onMount(() => {
        if (params.slug) {
            postFetch();
        }
        easyMDE = new EasyMDE({ element: document.getElementById("content"), renderingConfig: {
            singleLineBreaks: true,
        } });
    });
    const submit = async () => {
        message = "";
        loading = true;
        let content = easyMDE.value();
        if (title.trim() == "" || content.trim() == "") {
            message = "Title and content are both required";
            console.log("title and content are both required");
            loading = false;
            return;
        }
        console.log({
            title: title,
            text: content,
            published: published,
            user: $state.user.$id,
            profile: $state.profile.$id,
        });
        try {
            let data = {
                    title: title,
                    text: content,
                    published: published,
                    user_id: $state.user.$id,
                    created_at: params.slug ? post.created_at :  new Date().getTime(),
                };
            if(params.slug) {
                //update
                await api.updatePost(params.slug,data,$state.user.$id)
                replace('/profile/'+$state.user.$id);
            } else {
                await api.createPost(
                    data,
                    $state.user.$id,
                    $state.profile.$id
                );
                easyMDE.value("");
                title = "";
                content = "";
                console.log("post created successfully");
                message = "Post created successfully";
            }
        } catch (error) {
            console.log(error);
            message = error;
        } finally {
            loading = false;
        }
    };
</script>

<section>
    {#if params.slug}
        <h2>Edit Post</h2>
    {:else}
        <h2>Create Post</h2>
    {/if}
    {#if message}
        <div class="alert">{message}</div>
    {/if}
    <form on:submit|preventDefault={submit}>
        <label for="title">Title</label>
        <input
            required
            type="text"
            placeholder="Enter title"
            bind:value={title} />
        <label for="content">Content</label>
        <textarea
            bind:value={content}
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="Enter content" />
        <label for="status">Status</label>
        <select name="status" id="status" bind:value={published}>
            <option value={false}>Draft</option>
            <option value={true}>Published</option>
        </select>
        <button disabled={loading ? true : false} class="button" type="submit"
            >{ params.slug ? 'Save' : 'Create'}</button>
    </form>
</section>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-top: 1rem;
    }
    .alert {
        background-color: #ff000066;
        padding: 1rem;
    }
</style>
```

This allows users to create and edit their posts. The final step is to add all the components to our router over at `src/App.svelte`.

```html
<script>
    //...
     import Post from "./routes/Post.svelte";
     import Create from "./routes/Create.svelte";
    //..    
    const routes = {
        //...
        "/create": Create,
        "/post/:slug": Post,
        "/post/:slug/edit": Create
    };
</script>
```

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

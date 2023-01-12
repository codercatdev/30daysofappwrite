---
day: 20
title: "File Uploads and Downloads"
description: "A picture speaks a thousand words."
slug: "file-uploads-and-downloads"
devto_url: "https://dev.to/appwrite/30daysofappwrite-file-uploads-and-downloads-1dld"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--BLWhtRn8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/djaarnyip2y4dgkhgdo1.png"
created_at: "2021-05-20T06:10:41Z"
updated_at: "2022-04-12T17:41:49Z"
published_at: "2021-05-20T13:02:06Z"
tags: ["30daysofappwrite","flutter","webdev","javascript"]
user:
  name: "Damodar Lohani"
  username: "lohanidamodar"
  twitter_username: "LohaniDamodar"
  github_username: null
  user_id: "551623"
  website_url: null
  profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--Y2Vg3V3b--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg"
  profile_image_90: "https://res.cloudinary.com/practicaldev/image/fetch/s--WbIqGPLg--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/551623/d6834701-4563-4984-8f1d-7c6735acd3b6.jpg"
---
## Intro
Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside, we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## File Uploads and Downloads
Uploading files, previewing images, and downloading files are easy through Appwrite's Storage API. As we learned before, the Storage API also provides options to manipulate images and display previews.

In today's session, we will look into leveraging Appwrite's Storage API to add cover images to our blog posts. Based on whether we are viewing the details of a post or just listing the post, we can crop the image thumbnail to an appropriate size to display as the preview. Let's learn how.

## New Post Component
First, we will modify the new post component `src/routes/Create.svelte` to add a File input field above the title field.

```html
<label for="cover">Cover</label>
<input type="file" bind:files />
```

Then we will modify the submit function in the scripts section of the same file to handle the files input.

```js
let cover;

const submit = async () => {
    //...code before
    if (files && files.length == 1) {
        let file = await api.uploadFile(files[0], $state.user.$id);
        cover = file.$id;
    }
    //... code after
}
```

Now we need to create an `uploadFile()` function in `src/appwrite.js`.

```js
export const api = {
    //...existing code
    uploadFile: (file, userId) =>
        sdk.storage.createFile(bucketId, "unique()", file, ["role:all"], [`user:${userId}`]),
}
```

Now, when editing the post, the files have to be handled. If a user uploads a new cover image, we will delete the old one and upload the new one. So first let's add `deleteFile()` function in `src/appwrite.js`.


```js
export const api = {
    //...existing codes
    deleteFile: (id) => sdk.storage.deleteFile(bucketId, id),
}
```

Also, modify the submit function in `src/routes/Create.svelte` to handle deleting while editing.

```js
const submit = async () => {
    //...code before
    if (files && files.length == 1) {
        if(params.slug) {
            await api.deleteFile(cover);
        }
        let file = await api.uploadFile(files[0], $state.user.$id);
        cover = file.$id;
    }
    //... code after
}
```

## Image Preview
Appwrite's storage API provides an easy way to generate preview thumbnails using its simple rest API. Let's create a method called `getThumbnail` in `src/appwrite.js` that will generate the thumbnail for our blog post with the appropriate size.

```js
getThumbnail: (id, width = 1000, height = 600) =>
    sdk.storage.getFilePreview(bucketId, id, width, height),
```

The above function will generate the image thumbnail with the provided width and height.

Now we will use that function to display the image in our index component, post preview component, and the user's own post preview component.

First, in `src/routes/Index.svelte` under-promoted and featured section, let's add the image preview if the cover image exists.

Promoted post
```html
<div class="promoted">
    {#if promoted.cover}
        <img src={api.getThumbnail(promoted.cover)} alt="" />
    {/if}
    <h2>{promoted.title}</h2>
    <Author user={promoted.user_id} />
    <p>
        {@html md(promoted.text)}
    </p>
    <Action href={`#/post/${promoted.$id}`}>Read more</Action>
</div>
```

Featured post
```html
<a class="card" href={`#/post/${feature.$id}`}>
    {#if feature.cover}
        <img
            src={api.getThumbnail(feature.cover, 600, 400)}
            alt="" />
    {/if}
    <h2>{feature.title}</h2>
</a>
```

Let's modify the `src/lib/Preview.svelte` also to show the cover image:

```html
<a href={`#/post/${post.$id}`}>
    {#if post.cover}
        <img
            class="cover"
            src={api.getThumbnail(post.cover, 400, 250)}
            alt="" />
    {/if}
    <h2>{post.title}</h2>
</a>
```

Similarly, modify the `src/lib/MyPost.svelte` also to show the cover image:

```html
<article class="card">
    {#if post.cover}
        <img
            class="cover"
            src={api.getThumbnail(post.cover, 400, 250)}
            alt="" />
    {/if}
    <h2>{post.title}</h2>
    <a href="/post/{post.$id}" use:link class="button">Preview</a>
    <a href="/post/{post.$id}/edit" use:link class="button">Edit</a>
    <a
        href="/delete"
        on:click|preventDefault={() => deletePost(post.$id)}
        class="button">Delete</a>
</article>
```

Finally, modify the `src/routes/Post.svelte` as well:

```html
<h1>
    {post.title}
</h1>
<Author user={post.user_id} />
{#if post.cover}
    <img class="cover" src={api.getThumbnail(post.cover)} alt="" />
{/if}
<section class="content">
    {@html md(post.text)}
</section>
```

That's how easy it is to upload files and display image thumbnails of different sizes using Appwrite - no need to use any external libraries. Once generated, the thumbnails are cached in the server, so the responses are super fast at runtime.

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

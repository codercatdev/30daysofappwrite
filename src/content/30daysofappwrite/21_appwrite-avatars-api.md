---
day: 21
title: "Appwrite Avatars API"
description: "Sharing is caring."
slug: "appwrite-avatars-api"
devto_url: "https://dev.to/appwrite/30daysofappwrite-appwrite-avatars-api-epi"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--Rjm2mKqA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l6ppxe9qf991jv53qyip.png"
social_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--LkCDR2H2--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l6ppxe9qf991jv53qyip.png"
created_at: "2021-05-21T13:30:47Z"
updated_at: "2022-04-12T17:43:35Z"
published_at: "2021-05-21T13:42:36Z"
tags: ["javascript","webdev","30daysofappwrite","flutter"]
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these
concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Appwrite Avatars API
Welcome to Day 21 👋 . Today we're going to take a look at Appwrite's Avatars API and check out some neat features it has under the hood!
The Avatars API primarily allows you to generate icons and avatars for a variety of use cases. Let's take an in-depth look into what it has to offer.

### Credit Card Icons
You can easily get credit card icons for the most popular Credit Card companies like AmEx, Discover, JCB, Mastercard, Visa, Maestro, etc. [The Get Credit Card Icon endpoint](https://appwrite.io/docs/client/avatars#avatarsGetCreditCard) also allows you to customize the icon size and quality while requesting for it. You can find the complete list of supported credit cards [here](https://github.com/appwrite/appwrite/tree/master/app/config/avatars/credit-cards).


### Browser icons
[The Get Browser Icon endpoint](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetBrowser) allows you to get icons of some commonly used browsers conveniently. If you haven't seen it already, we use this endpoint in the Appwrite console to display information about a user's session. 

![Browser Icons Example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tzhtxle5tvo5k2w7zw76.png)

You can find the complete list of supported browser icons [here](https://github.com/appwrite/appwrite/tree/master/app/config/avatars/browsers).

### Country flags
Similar to the browser icons endpoint, [the Get Country Flag endpoint](https://appwrite.io/docs/client/avatars#avatarsGetFlag) allows you to get icons for country flags. You can see it in use in the Appwrite console screenshot above. You can find the complete list of all the country codes and flags [here](https://github.com/appwrite/appwrite/tree/master/app/config/avatars/flags).

### Images from a URL
[The Get Image from URL endpoint](https://appwrite.io/docs/client/avatars#avatarsGetImage) is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.

### Get Favicon
A favicon is a small icon or collection of icons associated with a website, web page, or web application. It's displayed within the browser tabs and bookmarks bar. [The Get Favicon endpoint](https://appwrite.io/docs/client/avatars#avatarsGetFavicon) allows you to fetch the favicon of any remote URL.

![Favicon Example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5wq5qr8tigbbsuvn4gko.png)

### QR Code
[The Get QR Code endpoint](https://appwrite.io/docs/client/avatars#avatarsGetQR) allows you to generate QR codes for any string. How you use this is only limited by your creativity, as you can use this to share URLs, phone numbers, and even base64 encoded images. We will use this functionality to add a social sharing feature to our demo app. 

### Get User Initials
[The Get User Initials endpoint](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) provides a convenient way to get avatars for your users based on their initials. You can use this as a placeholder until the user uploads a profile image. You can also use this endpoint to generate avatars for any string (not necessarily a name). Additionally, you can tweak the image size, text color, and background color if you aren't happy with the defaults.

## Let's write some Code
In our demo app, we will add a share article feature. This feature will allow the user to share the article to various social media platforms and even generate a QR code for the current URL, which can be shared with your friends.

The first step is to add a new function in `src/appwrite.js` to make a call to the Avatars service:

```js
export const api = {
    ...
    getQRcode: text => sdk.avatars.getQR(text)
    ...
}
```

The network layer is now ready. Let's head to the `src/routes/Post.svelte` component, where we will create the buttons for sharing. Copy the following markup into the last section of the HTML:

```html
<!-- Share -->
<section>
  <div class="share-buttons-container">
    <div class="share-list">
      <!-- FACEBOOK -->
      <a class="fb-h" on:click="{fbs_click}" target="_blank">
        <img
          src="https://img.icons8.com/material-rounded/96/000000/facebook-f.png"
        />
      </a>

      <!-- TWITTER -->
      <a class="tw-h" on:click="{tbs_click}" target="_blank">
        <img
          src="https://img.icons8.com/material-rounded/96/000000/twitter-squared.png"
        />
      </a>

      <!-- LINKEDIN -->
      <a class="li-h" on:click="{lbs_click}" target="_blank">
        <img
          src="https://img.icons8.com/material-rounded/96/000000/linkedin.png"
        />
      </a>

      <!-- REDDIT -->
      <a class="re-h" on:click="{rbs_click}" target="_blank">
        <img src="https://img.icons8.com/ios-glyphs/90/000000/reddit.png" />
      </a>

      <!-- PINTEREST -->
      <a
        data-pin-do="buttonPin"
        data-pin-config="none"
        class="pi-h"
        on:click="{pbs_click}"
        target="_blank"
      >
        <img src="https://img.icons8.com/ios-glyphs/90/000000/pinterest.png" />
      </a>

      <!-- QR Code -->
      <a class="pi-h" on:click="{qrcode_click}" target="_blank">
        <img
          src="https://img.icons8.com/ios-glyphs/60/000000/qr-code--v1.png"
        />
      </a>
    </div>
  </div>
  {#if qrCode}
  <img src="{qrCode}" alt="No QR Code" />
  {/if}
</section>
```

We need to add some styling to this as well. I'd recommend copying all the styling from [here](https://github.com/christyjacob4/30-days-of-appwrite/blob/add-qr-code-share/src/routes/Post.svelte#L157-L209).

Now it's time to add some Javascript to stitch it all together. In the `<script>` section of `src/routes/Post.svelte` add the following code:

```js
let qrCode = null;
var pageLink = window.location.href;
var pageTitle = String(document.title).replace(/\&/g, "%26");
const fbs_click = () => {
  window.open(
    `http://www.facebook.com/sharer.php?u=${pageLink}&quote=${pageTitle}`,
    "sharer",
    "toolbar=0,status=0,width=626,height=436"
  );
  return false;
};
const tbs_click = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageLink}`,
    "sharer",
    "toolbar=0,status=0,width=626,height=436"
  );
  return false;
};
const lbs_click = () => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${pageLink}`,
    "sharer",
    "toolbar=0,status=0,width=626,height=436"
  );
  return false;
};
const rbs_click = () => {
  window.open(
    `https://www.reddit.com/submit?url=${pageLink}`,
    "sharer",
    "toolbar=0,status=0,width=626,height=436"
  );
  return false;
};
const pbs_click = () => {
  window.open(
    `https://www.pinterest.com/pin/create/button/?&text=${pageTitle}&url=${pageLink}&description=${pageTitle}`,
    "sharer",
    "toolbar=0,status=0,width=626,height=436"
  );
  return false;
};
let qrcode_click = async () => {
  qrCode = await api.getQRcode(pageLink);
};
```

That's it. Really! You can now share your article to social media platforms with one click and share a QR code with a link to the article. If you want to see the exact file changes in this feature, you can look at [this PR](https://github.com/christyjacob4/30-days-of-appwrite/pull/6/files).

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

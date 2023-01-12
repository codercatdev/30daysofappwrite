---
day: 5
title: "Your First Request"
description: "Take your first steps with Flutter or web apps."
slug: "your-first-request"
devto_url: "https://dev.to/appwrite/30daysofappwrite-your-first-request-4oco"
cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--LqlDgYUa--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0qa85ruzvn08ft57cxit.png"
created_at: "2022-04-12T14:48:17Z"
updated_at: "2022-04-12T14:48:17Z"
published_at: "2021-05-05T12:58:52Z"
tags: ["30daysofappwrite","javascript","flutter","webdev"]
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
Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a full-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

# Your First Request
Over the last few days, we've covered Appwrite's admin console, microservices layout, and installation. It's finally time to start building with Appwrite! Today, we're going to discuss how to get started with web and Flutter applications. Let's begin.

## Adding Platforms to your Project
Adding platforms to the project helps us validate requests that come from clients. We validate the origin of the request against the platforms added in the project in the console. Any origin not matching the available platforms will be rejected.

### Adding a platform
On the console home page below the usage graph, you can find the list of platforms and the **Add Platform** button. To add a new platform, tap the **Add Platform** button and select one of the available options. 

![Add Platform Button](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0zn10mht3cmutl0n2k4i.png)

### Web
To add a web platform, all you need is a **Name** and **Host**. **Name** can be anything you want to name your platform, and the **Host** can be the domain under which your web project is running. For building and testing web projects locally, the **Host** can be `http://localhost`.

![Add Web Platform](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j9i5lh6lyujlx73cop05.png)

### Flutter
When adding a Flutter Platform, you have two options: Android and iOS. You can add either Android or iOS or both based on what platforms you're building for. You can also add other platforms like desktop applications for Linux, Windows, or MacOS. You can find the details in our [documentation](https://appwrite.io/docs/getting-started-for-flutter).

Once you've selected Android or iOS, all you need is a **name** and the **application id**. **Name** can be anything you want to name your platform and the **Application Id** can be found in your project. For Android, it can be found in your Flutter project's `android/app/build.gradle` file. For iOS, it can be found by opening your iOS app in XCode. By default, it will be the same for both Android and iOS.

![Add Flutter Platform](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg07bjb6gb01imsqxhz4.png)

For Flutter web, you add the platform as Web as described above.

### Other Platforms
Appwrite also supports Android native and iOS native, with even more platforms planned down the road. They won't be the focus of this series of posts, but you can read more about them in our [documentation](https://appwrite.io/docs/installation).

Now you've set up your project with platforms, you're ready to make your first requests. Let's look at how we can do that for Web and Flutter.

## Making Requests to an Appwrite Server
Though we can make requests to an Appwrite server with direct REST API calls, using SDKs provides an easier and more structured experience. In this series, we'll focus on using Appwrite's SDKs.

### Web
Appwrite's [Web SDK](https://github.com/appwrite/sdk-for-web) is very simple to use. You can add it to your project  using a package manager like [NPM](https://npmjs.org) or [Yarn](https://yarnpkg.com). The following command adds the Appwrite Web SDK to your project.

```bash
npm install appwrite
```
Or you can install directly from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/appwrite@7.0.0"></script>
```
Once you add the dependency, you can use the Appwrite SDK in your project. In order to make the request, we first need to initialize the SDK with an endpoint and project details as follows:

```js
var appwrite = new Appwrite();

appwrite
    .setEndpoint('http://localhost/v1') // Set your endpoint
    .setProject('<Your Project ID>') // Your Appwrite Project UID
;
```
You can find your project ID in the settings menu of your Appwrite Dashboard.

Now let's make a request using the SDK. The first parameter taken by `appwrite.account.create()` is the user ID. We can pass in a custom user ID, or pass in the string `'unique()'` to generate a unique ID.

```js
// Register User
appwrite
    .account.create('unique()', 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
```

More information can be found on our [Getting Started for Web](https://appwrite.io/docs/getting-started-for-web) guide.

### Flutter
Appwrite's Flutter SDK is super easy to get started with. First, you need to add the Appwrite's SDK as a dependency in your `pubspec.yaml` file:
```yml
dependencies:
    appwrite: ^4.0.1 #use the latest version available
```
Once the dependency is added and `pub get appwrite` is run, you can import and use the Appwrite SDK in your project. Before making a request, you must first initialize the SDK with the required endpoint and project ID.

```dart
import 'package:appwrite/appwrite.dart';

Client client = Client();

client
    .setEndpoint('https://localhost/v1') // Your Appwrite Endpoint
    .setProject('<Your Project ID>') // Your project ID
    .setSelfSigned(status: true) // For self signed certificates, only use for development
;
```
Now you can make requests and handle responses easily:

```dart
// Register User
Account account = Account(client);

Response user = await account
    .create(
        userId: 'unique()',
        email: 'me@appwrite.io',
        password: 'password',
        name: 'My Name'
    );
```

More information can be found on our [Getting Started for Flutter](https://appwrite.io/docs/getting-started-for-flutter) guide.

## Credits 
We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

* [Discord Server](https://appwrite.io/discord)
* [Appwrite Homepage](https://appwrite.io/)  
* [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

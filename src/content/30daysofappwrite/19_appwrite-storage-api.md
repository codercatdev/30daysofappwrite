---
weight: 19
title: 'Appwrite Storage API'
description: 'Storing more than just database records.'
slug: 'appwrite-storage-api'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-appwrite-storage-api-hgm'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--xkaC0c_N--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v7undyet8k3nf7awzvd9.png'
social_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--1eM-rBMu--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v7undyet8k3nf7awzvd9.png'
created_at: '2021-05-19T12:23:12Z'
updated_at: '2022-04-12T17:41:13Z'
published_at: '2021-05-19T13:02:35Z'
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

Appwrite is an open-source, self-hosted Backend-as-a-Service that makes app development **easier** with a suite of SDKs and APIs to accelerate app development. [#30DaysOfAppwrite](http://30days.appwrite.io/) is a month long event focused on giving developers a walkthrough of all of Appwrite's features, starting from the basics to more advanced features like cloud functions! Alongside we will also be building a fully featured Medium clone to demonstrate how these concepts can be applied when building a real world app. We also have some exciting prizes for developers who follow along with us!

## Appwrite Storage API

Every application needs more than just a database, it needs **Storage**. Appwrite comes bundled with an extensive Storage API which allows you to manage your projects' files. Appwrite's Storage service provides us with a sleek API to upload, download, preview and manipulate images.

## How Is Storage Implemented

As of now, Appwrite mounts a Docker volume using the host machine's storage to provide the Storage service. So, it's using the local filesystem to store all the files that you upload to Appwrite. We are working on adding support for external object storage like AWS S3, DigitalOcean Spaces or other similar services. You can check the progress regarding this in our [utopia-php/storage](https://github.com/utopia-php/storage) library.

## Managing Storage using Appwrite Console

Appwrite's console supports easy management of files in storage. From here you can create files, update metadata of files, view or download files, and also delete files.

![Storage UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyzzzns2eeft0pof3dvu.png)

You can create a new file easily by clicking on the circular **+** button at the bottom right corner.

![Storage New UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/78efi4cf3st0rvpyfs88.png)

Each file in the service is granted with read and write permissions to manage who has access to view or edit it. These permissions work in the same way the database permissions work, which is already covered in [Day 15](https://dev.to/appwrite/30daysofappwrite-appwrite-database-22an) for you to review.

For existing files in storage, you can see a preview and update permissions right from the console. You can also view the original file in new window or download the file.

![Storage Edit UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dvmuqo07quf55234g6bf.png)

## Services

The Storage API provides us with few different endpoints to manipulate our files.

### Create File

We can make a **POST** `<ENDPOINT>/storage/files` request to upload a file. In SDKs this endpoint is exposed as `storage.createFile()`. It requires three parameters: the binary `file`, an array of strings to define the `read` permissions, and the same for `write` permissions.

We can use the below code to create file from our Web SDK.

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://demo.appwrite.io/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let promise = sdk.storage.createFile(
	document.getElementById('uploader').files[0],
	['*'],
	['role:member']
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

Or in Flutter we could use

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://demo.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
  Future result = storage.createFile(
    file: await MultipartFile.fromFile('./path-to-files/image.jpg', 'image.jpg'),
    read: ['*'],
    write: ['role:member'],
  );

  result
    .then((response) {
      print(response);
    }).catchError((error) {
      print(error.response);
  });
}
```

### List Files

We can make a **GET** `<ENDPOINT>/storage/files` request in order to list files. In SDKs this is exposed as `storage.listFiles()`. We can also use the `search` parameter to filter results. You can also include `limit`, `offset` and `orderType` parameters to further customize the returned results.

With the Web SDK:

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://demo.appwrite.io/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let promise = sdk.storage.listFiles();

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

And with Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://demo.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
  Future result = storage.listFiles();

  result
    .then((response) {
      print(response);
    }).catchError((error) {
      print(error.response);
  });
}
```

### Get File

We can make a **GET** `<ENDPOINT>/storage/files/{fileid}` request to an individual file by its id. It returns a JSON object with the file metadata. In SDKs this endpoint is exposed as `storage.getFiles()` which requires the `fileId` parameter.

With the Web SDK:

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let promise = sdk.storage.getFile('[FILE_ID]');

promise.then(
	function (response) {
		console.log(response); // Success
	},
	function (error) {
		console.log(error); // Failure
	}
);
```

With Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
  Future result = storage.getFile(
    fileId: '[FILE_ID]',
  );

  result
    .then((response) {
      print(response);
    }).catchError((error) {
      print(error.response);
  });
}
```

### File Preview

The preview endpoint allows you to generate preview images for your files. Using the preview endpoint, you can also manipulate the resulting image so that it will fit perfectly inside your app in terms of dimensions, file size, and style. Additionally, the preview endpoint allows you to change the resulting image file format for better compression or change the image quality for better delivery over the network.

We can make a **GET** `<ENDPOINT>/storage/files/{fileId}/preview` request to get a preview for image files. It supports parameters like `width`, `height`, `quality`, `background` and `output` format to manipulate the preview image. This method is exposed as `storage.getFilePreview()` and requires a `fileId`.

> We have even more awesome features like border, border radius, and opacity support for the preview endpoint in the upcoming Appwrite 0.8 release.

With the Web SDK:

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let result = sdk.storage.getFilePreview('[FILE_ID]', 100, 100); //crops the image into 100x100

console.log(result); // Resource URL
```

And with Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
}

//displaying image
FutureBuilder(
  future: storage.getFilePreview(
    fileId: '[FILE_ID]',
    width: 100
    height: 100
  ),
  builder: (context, snapshot) {
    return snapshot.hasData && snapshot.data != null
      ? Image.memory(
          snapshot.data.data,
        )
      : CircularProgressIndicator();
  },
);
```

### File Download

We can make a **GET** `<ENDPOINT>/storage/files/{fileId}/download` request to get the contents of a file by its unique ID. The endpoint response includes a `Content-Disposition: attachment` header that tells the browser to start downloading the file to user downloads directory. This method is exposed as `storage.getFileDownload()`, and a `fileId` is required.

With the Web SDK:

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let result = sdk.storage.getFileDownload('[FILE_ID]');

console.log(result); // Resource URL
```

With Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
}

//displaying image
FutureBuilder(
  future: storage.getFileDownload(
    fileId: '[FILE_ID]',
  ),
  builder: (context, snapshot) {
    return snapshot.hasData && snapshot.data != null
      ? Image.memory(
          snapshot.data.data,
        )
      : CircularProgressIndicator();
  },
);
```

### File View

We can make a **GET** `<ENDPOINT>/storage/files/{fileId}/view` request to get the contents of a file by its unique ID. This endpoint is similar to the download method but returns with no `Content-Disposition: attachment` header.

With the Web SDK:

```js
let sdk = new Appwrite();

sdk
	.setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
	.setProject('5df5acd0d48c2'); // Your project ID

let result = sdk.storage.getFileView('[FILE_ID]');

console.log(result); // Resource URL
```

With Flutter:

```dart
import 'package:appwrite/appwrite.dart';

void main() { // Init SDK
  Client client = Client();
  Storage storage = Storage(client);

  client
    .setEndpoint('https://<HOSTNAME_OR_IP>/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
  ;
}

//displaying image
FutureBuilder(
  future: storage.getFileView(
    fileId: '[FILE_ID]',
  ),
  builder: (context, snapshot) {
    return snapshot.hasData && snapshot.data != null
      ? Image.memory(
          snapshot.data.data,
        )
      : CircularProgressIndicator();
  },
);
```

More detailed information about the Storage service can be found in [our docs](https://appwrite.io/docs/client/storage).

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

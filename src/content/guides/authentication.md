---
weight: 2
title: 'Storage'
description: Appwrite Storage allows you to manage files in your project. You can use it to store images, videos, documents, and other files for your projects.'
slug: 'storage'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--6CxukSVg--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3z61jqtkebbcd7g89hub.png'
created_at: '2022-12-09T00:00:00Z'
updated_at: '2023-01-14T00:00:00Z'
published_at: '2023-01-14T00:00:00Z'
tags: []
authors:
  - name: 'Vincent Ge'
    twitter_username: 'WenYuGe1'
    github_username: 'gewenyu99'
    website_url: 'https://www.linkedin.com/in/wen-yu-ge/'
    profile_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--l_EdK-t5--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/785242/7c4f39ff-7e9b-41ba-a9e2-d426c308a64d.jpeg'
---

# Storage

Appwrite Storage allows you to manage files in your project. You can use it to store images, videos, documents, and other files for your projects. It provides APIs to upload, download, delete, and list files. Not only that Appwrite storage service provides APIs to manipulate images. Using the preview endpoint, you can crop, resize, rotate, add borders and border-radius and select the desired output format for your image. The preview API also allows you to change your image's quality, format, or compression, including WebP support for maximum optimization of your network bandwidth.

## [Buckets](/docs/storage#bucket)

With version 0.13 of Appwrite, we also have introduced storage buckets. Storage buckets are similar to collections we have in our [Databases](/docs/databases) service. The difference is buckets also provide more power to decide what kinds of files, what sizes you want to allow in that bucket, whether or not to encrypt the files, scan with antivirus, and more. Let's look at how we can create a bucket and configure it to your needs.

### [Create Bucket](/docs/storage#createBucket)

You can create your bucket from your Appwrite project's dashboard, using any of our server-side SDKs, or directly using our REST API authenticated using an API Key. To create a bucket from the Appwrite Console, access your Storage dashboard from your project's left navigation panel. Click **Add Bucket** button and choose your bucket's name. You can also set a custom ID for your bucket instead of an auto-generated ID for convenience. This will create a new bucket and take you to its settings page, where you can configure various options for your bucket.

You can manage your buckets programmatically using one of Appwrite's Server [SDKs](/docs/sdks#server) or REST API paired with an API Key. You can manage files with both Server and Client side.

#### [Permissions](/docs/storage#permission)

The Storage Service allows you to configure permissions at both the bucket level and the file level. When a user has the appropriate type of [access permissions](/docs/permissions/) granted at **either** the bucket or the file level, they will be able to access the file. If the permission field is left empty, no one can access the file.

##### File Level Permissions

File level permissions grant access to individual files. File level permissions are only enabled if File Security is enabled in the settings of your bucket.

##### Bucket Level Permissions

Bucket level permissions apply to every file in the bucket.

#### [More Bucket Configurations](/docs/storage#bucketConfig)

Storage buckets have many configuration options, including the type and maximum size of files in the bucket, whether encryption or anti-virus is enabled, and the compression algorithm to use. If you look at the bucket settings or the REST API example above, you can find these configurations. Let's look at what those are:

| Parameter             | Description                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowedFileExtensions | This parameter allows you to provide a list of file extensions that will be accepted into the bucket.                                                             |
| maximumFileSize       | This parameter allows you to set the maximum size of a file that a bucket accepts. The buckets will accept any file less than or equal to the size provided here. |
| encryption            | This parameter allows you to configure whether or not the files inside the bucket will be encrypted. We don't encrypt files bigger than 20MB.                     |
| antivirus             | This parameter allows you to configure whether or not the files being added inside the bucket be scanned by antivirus. We don't scan files bigger than 20MB.      |

You can learn more about storage buckets and APIs you can use to manage storage buckets from our [Storage documentation](docs/server/storage). Now that we know how to create and configure buckets for our applications, let's look at how to manage files using the storage service.

## [Create File](/docs/storage#createFile)

After you create a bucket or have navigated to bucket details, you can access the **Files** tab so you can upload, view, delete and update files in the bucket using the Appwrite project's dashboard. You can also perform all those operations from Appwrite's client SDK, server SDKs, and REST APIs as long as you have the proper permission.

When you are in the **Files** tab, you can click **Add File** and select a file to upload. If the bucket is configured to accept the file type and size you are uploading, your file will be uploaded, and you will see the file in the list of files.

You can also upload files programmatically using our SDKs

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Storage } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const storage = new Storage(client);

  const promise = storage.createFile(
  	'[BUCKET_ID]',
  	ID.unique(),
  	document.getElementById('uploader').files[0]
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

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() { // Init SDK
    final client = Client()
      .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
      .setProject('[PROJECT_ID]');

    final storage = Storage(client);

    final file = await storage.createFile(
      bucketId: '[BUCKET_ID]',
      fileId: ID.unique(),
      file: InputFile(path: './path-to-files/image.jpg', filename: 'image.jpg'),
    );
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.services.Storage

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1") // Your API Endpoint
          .setProject("5df5acd0d48c2") // Your project ID

      val storage = Storage(client)

      val file = storage.createFile(
          bucketId = "[BUCKET_ID]",
          fileId = ID.unique(),
          file = File("./path-to-files/image.jpg"),
      )
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite

  func main() async throws {
      let client = Client()
        .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
        .setProject("[PROJECT_ID]")

      let storage = Storage(client)

      let file = try await storage.createFile(
          bucketId: "[BUCKET_ID]",
          fileId: ID.unique(),
          file: InputFile.fromBuffer(yourByteBuffer,
              filename: "image.jpg",
              mimeType: "image/jpeg"
          )
      )
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```http
  POST /v1/storage/buckets/{bucketId}/files HTTP/1.1
  Content-Type: multipart/form-data; boundary="cec8e8123c05ba25"
  Content-Length: *Length of your entity body in bytes*
  X-Appwrite-Project: 5df5acd0d48c2

  --cec8e8123c05ba25
  Content-Disposition: form-data; name="operations"

  { "query": "mutation CreateFile($bucketId: String!, $fileId: String!, $file: InputFile!) { storageCreateFile(bucketId: $bucketId, fileId: $fileId, file: $file) { id } }", "variables": { "bucketId": "[BUCKET_ID]", "fileId": "[FILE_ID]", "file": null } }
  --cec8e8123c05ba25
  Content-Disposition: form-data; name="map"

  { "0": ["variables.file"] }
  --cec8e8123c05ba25
  Content-Disposition: form-data; name="0"; filename="file.txt"
  Content-Type: text/plain

  File content.

  --cec8e8123c05ba25--
  ```

  _Click Here to Copy_

When you are trying to upload any files above 5MB, you will need to upload them in chunks. Don't worry; if you are using Appwrite's console or any of our SDKs, we handle that internally, so it will work no matter what file size you try to upload.

## [Image Manipulation](/docs/storage#imagePreview)

Another great built-in feature of Appwrite is the image manipulation feature. With Appwrite Storage's [preview endpoint](/docs/client/storage#storageGetFilePreview) you can manipulate resolution, add borders and the border-radius, add background-color, set the opacity for the image, and get the image in the appropriate output format.

This enables a wide range of possibilities! You can manipulate images resolution to display appropriately on responsive websites. You can also adjust the image border, background color, and border-radius to match the theming of your application. The Appwrite Storage also allows you to change the format and compression of your images for network transfer optimization and to help you speed your application. You can do all that without caring about how the image was originally uploaded.

Below you can find all the different parameters offered by the preview endpoint to manipulate the image.

| Parameter    | Description                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| height       | Set the height of the output image in pixels, the image will be resized keeping the aspect ratio intact. Accepts integer between 0-4000                                       |
| width        | Set the width of the output image in pixels, the image will be resized keeping the aspect ratio intact. Accepts integer between 0-4000                                        |
| gravity      | The gravity while cropping the image providing either width, height or both. Accepts any of: center, top-left, top, top-right, left, right, bottom-left, bottom, bottom-right |
| quality      | Set the quality of the output image. Accepts integer between 0-100, where 100 is the highest quality.                                                                         |
| borderWidth  | Set a border with given width in pixels to the output image. Accepts integer between 0-100                                                                                    |
| borderColor  | Set a border-color for the output image. Accepts any valid Hex color value without the leading #.                                                                             |
| borderRadius | Set a border-radius in pixels. Accepts an integer between 0-4000.                                                                                                             |
| opacity      | Set opacity for the output image. Accepts a float value between 0-1, where 0 makes it transparent. Only works with output format supporting alpha channel like png.           |
| rotation     | Rotate the output image by a degree. Accepts an integer between -360 to 360.                                                                                                  |
| background   | Set a background-color. Accepts any valid Hex color value without the leading #. Only works with output format supporting alpha channel like png.                             |
| output       | Set the output image format. If not provided, will use the original image's format. Supported formats are: jpg, jpeg, png, gif and webp                                       |

## [Downloading and Streaming with Range](/docs/storage#streaming)

Apart from previewing files and images, downloading is another important feature. With 0.13 we also support streamed download using the [HTTP range header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range). If you are using our SDKs or console, nothing is different. Even if you want to download the whole file at once, even if you use the REST endpoint directly, there isn't any difference. However, if you want to get only a part of a file from storage, you can supply the range header and the server will respond with an appropriate chunk of the file.

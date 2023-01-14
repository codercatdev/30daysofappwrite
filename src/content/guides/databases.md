---
weight: 1
title: 'Databases'
description: The Databases Service allows you to store your application and users' data and fetch it using different supported queries.'
slug: 'databases'
# cover_image: 'https://i.ytimg.com/vi/GeJtr63xvck/maxresdefault.jpg'
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

# Databases

The Databases Service allows you to store your application and users' data and fetch it using different supported queries. Using your Appwrite Databases, you can create multiple databases, organize your data into collections and documents using the Appwrite REST API. You can also use the Appwrite [Realtime API](/docs/realtime) to subscribe to live changes in your collections and documents. In addition, the Databases Service provides built-in validation to check the integrity of your incoming data, custom indexing for query performance, as well as a flexible permissions mechanism to allow you to easily segment data between different users, teams, and roles.

## [Create Your Databases](/docs/databases#databases)

Appwrite's Databases Service allows you to create multiple databases. Each database can contain many collections and can be backed by a different database adaptor in future versions.

You can create your database by adding it to your Appwrite project's dashboard. Access the Databases Service settings from your project's left-hand navigation panel. To create a new database, click the **Add Database** button. Name your new database, and optionally provide a custom database ID.

You can also create databases with the [Appwrite CLI](/docs/command-line) or the [Appwrite Server SDKs](/docs/getting-started-for-server).

## [Create Your Collections](/docs/databases#collection)

Appwrite uses collections as containers of documents. The terms collections and documents are used because the Appwrite JSON REST API resembles the API of a traditional NoSQL database. That said, internally, Appwrite will support both SQL and NoSQL database adapters like MariaDB, MySQL, or MongoDB. When working with an SQL adapter, Appwrite will treat your collections as tables and documents as rows on native SQL tables.

To add a collection to a database, first navigate to the desired database's dashboard. In the database's dashboard, click the **Add Collection** button and choose your collection's name. For convenience, you can also set a custom ID for your collection instead of an auto-generated ID.

You can manage your collections programmatically using the [Appwrite CLI](/docs/command-line) or one of [Appwrite Server SDKs](/docs/getting-started-for-server). You can manage documents with both the Server and Client SDKs.

### [Permissions](/docs/databases#permissions)

Appwrite provides permissions to restrict access to documents at two levels, document and collection level. When a user has the appropriate type of [access permissions](/docs/permissions) granted at **either** the document or the collection level, they will be able to access or change the document. If the permission field is left empty, Client SDKs cannot access the document.

#### Document Level Permissions

Document level permissions grant access to individual documents. Document level permissions are only applied if Document Security is enabled in the settings of your collection.

#### Collection Level Permissions

Collection level permissions apply to every document in the collection.

## [Create Attributes](/docs/databases#attributes)

Once you choose your permission model, navigate to your collection's **Attributes** tab. Attributes are used to define the structure of your documents and help the Appwrite API validate your users' input. Add your first attribute by clicking the **Add Attribute** button. You can choose between the following types:

| Attribute | Description                             |
| --------- | --------------------------------------- |
| string    | String attribute.                       |
| integer   | Integer attribute.                      |
| float     | Float attribute.                        |
| boolean   | Boolean attribute.                      |
| enum      | Enum attribute.                         |
| ip        | IP address attribute for IPv4 and IPv6. |
| email     | Email address attribute.                |
| url       | URL attribute.                          |

If an attribute must be present in all documents, set it as required. If not, a default value might be handy. Additionally, decide if the attribute should be a primitive or array of values.

When adding or removing attributes, your requests are processed in the background, indicated by the attribute's status. Depending on your collection's size and other factors, this could take anywhere from a few seconds to a few minutes to complete. You are able to create a document while your attributes are still being processed, however you are not able to use the attributes on the documents until they are available.

### [Create Documents](/docs/databases#create-documents)

Navigate to the **Documents** tab of your collection and click the **Add Document** button, or add a document programmatically:

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Databases } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const databases = new Databases(client);

  const promise = databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', ID.unique(), {});

  promise.then(
  	function (response) {
  		console.log(response);
  	},
  	function (error) {
  		console.log(error);
  	}
  );
  ```

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() async {
      final client = Client()
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      final databases = Databases(client);

      try {
          final document = databases.createDocument(
              databaseId: '[DATABASE_ID]',
              collectionId: '[COLLECTION_ID]',
              documentId: ID.unique(),
              data: {}
          );
      } on AppwriteException catch(e) {
          print(e);
      }
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.services.Databases

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      val databases = Databases(client)

      try {
          val document = databases.createDocument(
              databaseId = "[DATABASE_ID]",
              collectionId = "[COLLECTION_ID]",
              documentId = ID.unique(),
              data = mapOf("a" to "b"),
          )
      } catch (e: Exception) {
          Log.e("Appwrite", "Error: " + e.message)
      }
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite
  import AppwriteModels

  func main() async throws {
      let client = Client()
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")")

      let databases = Databases(client)

      do {
          let document = try await databases.createDocument(
              databaseId: "[DATABASE_ID]",
              collectionId: "[COLLECTION_ID]",
              documentId: ID.unique(),
              data: [:]
          )
      } catch {
          print(error.localizedDescription)
      }
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  mutation {
  	databasesCreateDocument(
  		databaseId: "[DATABASE_ID]"
  		collectionId: "[COLLECTION_ID]"
  		documentId: "[DOCUMENT_ID]"
  		data: "{}"
  	) {
  		_id
  		_collectionId
  		_databaseId
  		_createdAt
  		_updatedAt
  		_permissions
  		data
  	}
  }
  ```

  _Click Here to Copy_

### [Querying Documents](/docs/databases#querying-documents)

#### Indexes Required

You can only query indexed attributes. You can easily add new indexes from both the Appwrite console or any of the [server SDKs](/docs/sdks#server). Appwrite uses this limitation to enforce optimized queries for maximum performance and scalability of your collection. You can learn more about it in the [Appwrite Indexes](/docs/databases#indexes) section.

To find specific documents in a collection, pass an array of query strings as a parameter to the [listDocuments](/docs/server/databases#databasesListDocuments) endpoint. The SDKs provide a **Query** class to make query building simpler:

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Databases, Query } from "appwrite";

  const client = new Client()
      .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
      .setProject("[PROJECT_ID]")")

  const databases = new Databases(client);

  let promise = databases.listDocuments(
      "[DATABASE_ID]"
      "[COLLECTION_ID]",
      [
          Query.equal('title', 'Avatar')
      ]
  );

  promise.then(function (response) {
      console.log(response);
  }, function (error) {
      console.log(error);
  });

  ```

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() async {
      final client = Client()
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")")

      final databases = Databases(client);

      try {
          final documents = await databases.listDocuments(
              databaseId: '[DATABASE_ID]',
              collectionId: '[COLLECTION_ID]',
              queries: [
                  Query.equal('title', 'Avatar')
              ]
          );
      } on AppwriteException catch(e) {
          print(e);
      }
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin

  import io.appwrite.Client
  import io.appwrite.Query
  import io.appwrite.services.Databases

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      val databases = Databases(client)

      try {
          val documents = databases.listDocuments(
              databaseId = "[DATABASE_ID]",
              collectionId = "[COLLECTION_ID]",
              queries = listOf(
                  Query.equal("title", "Avatar")
              )
          )
      } catch (e: AppwriteException) {
          Log.e("Appwrite", "Error: " + e.message)
      }
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite
  import AppwriteModels

  func main() async throws{
      let client = Client()
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      let databases = Databases(client)

      do {
          let documents = try await databases.listDocuments(
              databaseId: "[DATABASE_ID]",
              collectionId: "[COLLECTION_ID]",
              queries: [
                  Query.equal("title", "Avatar")
              ]
          )
      } catch {
          print(error.localizedDescription)
      }
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  query {
  	databasesListDocuments(
  		databaseId: "[DATABASE_ID]"
  		collectionId: "[COLLECTION_ID]"
  		queries: ["equal(\"title\", [\"Avatar\"])"]
  	) {
  		total
  		documents {
  			_id
  			data
  		}
  	}
  }
  ```

  _Click Here to Copy_

The following query methods are currently supported:

| Query Method     | SDK Method Example                      | Description                                                                                                                     |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| equal            | Query.equal("title", \["Iron Man"\])    | Returns document if attribute is equal to any value in the provided array. Applies to any indexed attribute.                    |
| notEqual         | Query.notEqual("title", \["Iron Man"\]) | Returns document if attribute is not equal to any value in the provided array. Applies to any indexed attribute.                |
| lessThan         | Query.lessThan("score", 10)             | Returns document if attribute is less than the provided value. Applies to any indexed attribute.                                |
| lessThanEqual    | Query.lessThanEqual("score", 10)        | Returns document if attribute is less than or equal to the provided value. Applies to any indexed attribute.                    |
| greaterThan      | Query.greaterThan("score", 10)          | Returns document if attribute is greater than the provided value. Applies to any indexed attribute.                             |
| greaterThanEqual | Query.greaterThanEqual("score", 10)     | Returns document if attribute is greater than or equal to the provided value. Applies to any indexed attribute.                 |
| search           | Query.search("text", "key words")       | Searches string attributes for provided keywords. Applies to any string attribute with a full-text index.                       |
| orderDesc        | Query.orderDesc("attribute")            | Orders results in descending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order. |
| orderAsc         | Query.orderAsc("attribute")             | Orders results in ascending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order.  |
| limit            | Query.limit(25)                         | Limits the number of results returned by the query. Used for [pagination](/docs/pagination#offset-pagination).                  |
| offset           | Query.offset(0)                         | Offset the results returned by skipping some of the results. Used for [pagination](/docs/pagination#offset-pagination).         |
| cursorAfter      | Query.cursorAfter("62a7...f620")        | Places the cursor after the specified resource ID. Used for [pagination](/docs/pagination#cursor-pagination).                   |
| cursorBefore     | Query.cursorBefore("62a7...a600")       | Places the cursor before the specified resource ID. Used for [pagination](/docs/pagination#cursor-pagination).                  |

Each query string is logically separated via AND. For OR logic, pass multiple values, separated by commas:

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Databases, Query } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const databases = new Databases(client);

  databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]', [
  	Query.equal('title', ['Avatar', 'Lord of the Rings']),
  	Query.greaterThan('year', 1999)
  ]);
  ```

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() async {
      final client = Client()
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      final databases = Databases(client);

      try {
          final documents = await databases.listDocuments(
              '[DATABASE_ID]',
              '[COLLECTION_ID]',
              [
                  Query.equal('title', ['Avatar', 'Lord of the Rings']),
                  Query.greaterThan('year', 1999)
              ]
          );
      } on AppwriteException catch(e) {
          print(e);
      }
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.Query
  import io.appwrite.services.Databases

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      val databases = Databases(client)

      try {
          val documents = databases.listDocuments(
              databaseId = "[DATABASE_ID]",
              collectionId = "[COLLECTION_ID]",
              queries = listOf(
                  Query.equal("title", listOf("Avatar", "Lord of the Rings")),
                  Query.greaterThan("year", 1999)
              )
          )
      } catch (e: AppwriteException) {
          Log.e("Appwrite", e.message)
      }
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite
  import AppwriteModels

  func main() async throws {
      let client = Client()
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      let databases = Databases(client)

      do {
          let documents = try await databases.listDocuments(
              databaseId: "[DATABASE_ID]",
              collectionId: "[COLLECTION_ID]",
              queries: [
                  Query.equal("title", ["Avatar", "Lord of the Rings"]),
                  Query.greaterThan("year", 1999)
              ]
          )
      } catch {
          print(error.localizedDescription)
      }
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  query {
  	databasesListDocuments(
  		databaseId: "[DATABASE_ID]"
  		collectionId: "[COLLECTION_ID]"
  		queries: [
  			"equal(\"title\", [\"Avatar\", \"Lord of the Rings\"])"
  			"greaterThan(\"year\", 1999)"
  		]
  	) {
  		total
  		documents {
  			_id
  			data
  		}
  	}
  }
  ```

  _Click Here to Copy_

When performing a query against multiple attributes, a single index with all query attributes is required. In the example above, a single index with **both** title and year is required.

## [Indexes](/docs/databases#indexes)

Indexes are used by Databases to quickly locate data without having to search through every document for results. To ensure the best performance, Appwrite requires an index for every query. You can create an index by navigating to the **Indexes** tab of your collection or by using your favorite Server SDK. If you plan to query multiple attributes in a single query, you will need an index with **all** queried attributes.

It should be noted that Appwrite's database was designed to protect your queries from performing a full-table scan as this is a footgun and could cause catastrophic performance degradation as you scale up your Appwrite project.

The following indexes are currently supported:

| Type     | Description                            |
| -------- | -------------------------------------- |
| key      | Plain Index to allow queries.          |
| unique   | Unique Index to disallow duplicates.   |
| fulltext | For searching within string attributes |

### [Ordering Results](/docs/databases#ordering)

When querying using the [listDocuments](/docs/server/databases#databasesListDocuments) endpoint, you can specify the order of the documents returned using the `Query.orderAsc()` and `Query.orderDesc()` query methods.

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Databases, Query } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const databases = new Databases(client);

  databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]', [Query.orderAsc('title')]);
  ```

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() async {
      final client = Client()
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      final databases = Databases(client);

      try {
          final documents = await databases.listDocuments(
              databaseId: '[DATABASE_ID]',
              collectionId: '[COLLECTION_ID]',
              queries: [
                  Query.orderAsc('title')
              ]
          );
      } on AppwriteException catch(e) {
          print(e);
      }
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.Query
  import io.appwrite.services.Databases

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      val databases = Databases(client)

      try {
          val documents = databases.listDocuments(
              databaseId = "[DATABASE_ID]",
              collectionId = "[COLLECTION_ID]",
              queries = [
                  Query.orderAsc("title")
              ]
          )
      } catch (e: AppwriteException) {
          Log.e("Appwrite", e.message)
      }
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite
  import AppwriteModels

  func main() async throws {
      let client = Client()
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      let databases = Databases(client)

      do {
          let documents = try await databases.listDocuments(
              databaseId: "[DATABASE_ID]",
              collectionId: "[COLLECTION_ID]",
              queries: [
                  Query.orderAsc("title")
              ]
          )
      } catch {
          print(error.localizedDescription)
      }
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  query {
  	databasesListDocuments(
  		databaseId: "[DATABASE_ID]"
  		collectionId: "[COLLECTION_ID]"
  		queries: ["orderAsc(\"title\")"]
  	) {
  		total
  		documents {
  			_id
  			data
  		}
  	}
  }
  ```

  _Click Here to Copy_

To sort based on multiple attributes, simply provide multiple query methods.

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Databases, Query } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const databases = new Databases(client);

  databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]', [
  	Query.orderAsc('title'), // Order by title in ascending order
  	Query.orderDesc('year') // Order by year in descending order
  ]);
  ```

  _Click Here to Copy_

- ### Flutter

  ```dart
  import 'package:appwrite/appwrite.dart';

  void main() async {
      final client = Client()
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]");

      final databases = Databases(client);
      try {
          final documents = await databases.listDocuments(
              databaseId: '[DATABASE_ID]',
              collectionId: '[COLLECTION_ID]',
              queries: [
                  Query.orderAsc('title'), // Order by title in ascending order
                  Query.orderDesc('year')  // Order by year in descending order
              ]
          );
      } on AppwriteException catch(e) {
          print(e);
      }
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.Query
  import io.appwrite.services.Databases

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      val databases = Databases(client)

      try {
          val documents = databases.listDocuments(
              databaseId = "[DATABASE_ID]",
              collectionId = "[COLLECTION_ID]",
              queries = [
                  Query.orderAsc("title"), // Order by title in ascending order
                  Query.orderDesc("year")  // Order by year in descending order
              ]
          )
      } catch (e: AppwriteException) {
          Log.e("Appwrite", e.message)
      }
  }
  ```

  _Click Here to Copy_

- ### Apple

  ```swift
  import Appwrite
  import AppwriteModels

  func main() async throws {
      let client = Client()
        .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
        .setProject("[PROJECT_ID]")

      let databases = Databases(client)

      do {
          let documents = try await databases.listDocuments(
              databaseId: "[DATABASE_ID]",
              collectionId: "[COLLECTION_ID]",
              queries: [
                  Query.orderAsc("title"), // Order by title in ascending order
                  Query.orderDesc("year")  // Order by year in descending order
              ]
          )
      } catch {
          print(error.localizedDescription)
      }
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  query {
  	databasesListDocuments(
  		databaseId: "[DATABASE_ID]"
  		collectionId: "[COLLECTION_ID]"
  		queries: ["orderAsc(\"title\")", "orderDesc(\"year\")"]
  	) {
  		total
  		documents {
  			_id
  			data
  		}
  	}
  }
  ```

  _Click Here to Copy_

In the example above, the movies returned will be first sorted by title in ascending order, then sorted by year in descending order.

### [Pagination](/docs/databases#pagination)

Appwrite has full support for pagination to better optimize and scale up your applications built on Appwrite. Detailed documentation on pagination and how to implement it can be found on the [pagination guide.](/docs/pagination)

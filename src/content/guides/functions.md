---
weight: 4
title: 'Functions'
description: Appwrite Functions allow you to extend and customize your Appwrite server functionality by executing your custom code'
slug: 'functions'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Sh7mHcCx--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0syv49wrvji1hbykrw9c.png'
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

# Functions

Appwrite Functions allow you to extend and customize your Appwrite server functionality by executing your custom code. Appwrite can execute your custom code in response to any [Appwrite system event](/docs/events) like account creation, user login, or document update. You can also schedule your functions to run according to a CRON schedule or start them manually by triggering your function from an HTTP endpoint using the Appwrite client or server APIs.

Appwrite Functions run in a secure, isolated Docker container. By default, Appwrite supports multiple runtimes for different languages that you can use to run your code.

## [Getting Started](/docs/functions#gettingStarted)

The quickest way to get started with Appwrite Functions is using the [Appwrite CLI](/docs/command-line). The CLI comes with starter code and some simple commands to quickly create and deploy your functions. Once you have the CLI installed and setup with an Appwrite project, create your first function using:

```bash
appwrite init function
```

_Click Here to Copy_

Give your function a name and choose your runtime. This will create a new starter function in the current directory and also add it to your **appwrite.json** file. Go ahead and deploy your function using :

```bash
appwrite deploy function
```

_Click Here to Copy_

You can now head over to your Appwrite Dashboard, navigate to the Function settings and execute your function. You can find the status of your execution under the **Logs** tab.

Feel free to modify and play around with the starter code and use the **appwrite deploy** command to instantly deploy your changes to the Appwrite server.

The following sections will dive deeper into some more terminology and advanced concepts which can be useful when writing your function from scratch.

## [Writing your own Function](/docs/functions#writingYourOwnFunction)

When writing your own Appwrite Function, you must export the code in certain ways depending on the language. This varies between languages so refer to the examples below.

- Node.js
- PHP
- Python
- Ruby
- Deno
- Dart
- Swift
- .NET
- Kotlin
- Java
- C++

- ### Node.js

  ```js
  module.exports = async (req, res) => {
  	const payload = req.payload || 'No payload provided. Add custom data when executing function.';

  	const secretKey =
  		req.variables.SECRET_KEY ||
  		'SECRET_KEY variable not found. You can set it in Function settings.';

  	const randomNumber = Math.random();

  	const trigger = req.variables.APPWRITE_FUNCTION_TRIGGER;

  	res.json({
  		message: 'Hello from Appwrite!',
  		payload,
  		secretKey,
  		randomNumber,
  		trigger
  	});
  };
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **package.json** file along with your function, and Appwrite handles the rest! The best practice is to make sure that the **node_modules** folder is **not** a part of your tarball.

- ### PHP

  ```php
  <?php

  return function ($req, $res) {
    $payload =
      $req['payload'] ?:
      'No payload provided. Add custom data when executing function.';

    $secretKey =
      $req['variables']['SECRET_KEY'] ?:
      'SECRET_KEY variable not found. You can set it in Function settings.';

    $randomNumber = \mt_rand() / \mt_getrandmax();

    $trigger = $req['variables']['APPWRITE_FUNCTION_TRIGGER'];

    $res->json([
      'message' => 'Hello from Appwrite!',
      'payload' => $payload,
      'secretKey' => $secretKey,
      'randomNumber' => $randomNumber,
      'trigger' => $trigger,
    ]);
  };
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **composer.json** file along with your function, make sure to require autoload.php from vendor folder, and Appwrite handles the rest!. The best practice is to make sure that the **vendor** directory is **not** a part of your tarball.

- ### Python

  ```python
  import random

  def main(req, res):
    payload = req.payload or 'No payload provided. Add custom data when executing function.'

    secretKey = req.variables.get(
      'SECRET_KEY',
      'SECRET_KEY variable not found. You can set it in Function settings.'
    )

    randomNumber = random.random()

    trigger = req.variables['APPWRITE_FUNCTION_TRIGGER']

    return res.json({
      'message': 'Hello from Appwrite!',
      'payload': payload,
      'secretKey': secretKey,
      'randomNumber': randomNumber,
      'trigger': trigger,
    })
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **requirements.txt** file with your function- Appwrite handles the rest!

- ### Ruby

  ```ruby
  def main(req, res)
    payload =
      !req.payload.empty? ? req.payload :
      'No payload provided. Add custom data when executing function.'

    secretKey =
      req.variables['SECRET_KEY'] ||
      'SECRET_KEY variable not found. You can set it in Function settings.'

    randomNumber = rand()

    trigger = req.variables['APPWRITE_FUNCTION_TRIGGER']

    return res.json({
      :message => 'Hello from Appwrite!',
      :payload => payload,
      :secretKey => secretKey,
      :randomNumber => randomNumber,
      :trigger => trigger,
    })
  end
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **Gemfile** with your function- Appwrite handles the rest!

- ### Deno

  ```typescript
  export default async function (req: any, res: any) {
  	const payload = req.payload || 'No payload provided. Add custom data when executing function.';

  	const secretKey =
  		req.variables.SECRET_KEY ||
  		'SECRET_KEY variable not found. You can set it in Function settings.';

  	const randomNumber = Math.random();

  	const trigger = req.variables.APPWRITE_FUNCTION_TRIGGER;

  	res.json({
  		message: 'Hello from Appwrite!',
  		payload,
  		secretKey,
  		randomNumber,
  		trigger
  	});
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  No special steps are required for Deno- Appwrite handles everything!

- ### Dart

  ```dart
  import 'dart:math';
  import 'dart:async';

  Future <void> start(final req, final res) async {
    final payload =
      !req.payload?.isEmpty ? req.payload :
      'No payload provided. Add custom data when executing function.';

    final secretKey =
      req.variables['SECRET_KEY'] ??
      'SECRET_KEY variable not found. You can set it in Function settings.';

    final randomNumber = new Random().nextDouble();

    final trigger = req.variables['APPWRITE_FUNCTION_TRIGGER'];

    res.json({
      'message': 'Hello from Appwrite!',
      'payload': payload,
      'secretKey': secretKey,
      'randomNumber': randomNumber,
      'trigger': trigger,
    });
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **pubspec.yaml** file with your function- Appwrite handles the rest!

- ### Swift

  ```swift
  func main(req: RequestValue, res: RequestResponse) throws -> RequestResponse {
      let payload = req.payload.isEmpty
          ? "No payload provided. Add custom data when executing function"
          : req.payload

      let secretKey = req.variables["SECRET_KEY"]
          ?? "SECRET_KEY variable not found. You can set it in Function settings."

      let randomNumber = Double.random(in: 0...1)

      let trigger = req.variables["APPWRITE_FUNCTION_TRIGGER"]

      return res.json(data: [
          "message": "Hello from Appwrite!",
          "payload": payload,
          "secretKey": secretKey,
          "randomNumber": randomNumber,
          "trigger": trigger,
      ])
  }
  ```

  _Click Here to Copy_

  With Swift, your **entrypoint** can be empty since Appwrite automatically infers it from the location of your **main()** function. Just ensure that your cloud function has a **single declaration of main()** across your source files.

  **Installing Dependencies**

  Include a **Package.swift** file with your function- Appwrite handles the rest!

- ### .NET

  ```csharp
  public async Task Main(RuntimeRequest req, RuntimeResponse res)
  {
    var payload = (string.IsNullOrEmpty(req.Payload))
                  ? "No payload provided. Add custom data when executing function."
                  : req.Payload;

    var secretKey = req.Variables.ContainsKey("SECRET_KEY")
                    ? req.Variables["SECRET_KEY"]
                    : "SECRET_KEY variable not found. You can set it in Function settings.";

    var randomNumber = new Random().NextDouble();

    var trigger = req.Variables["APPWRITE_FUNCTION_TRIGGER"];

    return res.Json(new()
    {
      { "message", "Hello from Appwrite!" },
      { "payload", payload },
      { "secretKey", secretKey },
      { "randomNumber", randomNumber },
      { "trigger", trigger },
    });
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **Function.csproj** file with your function- Appwrite handles the rest!

- ### Kotlin

  ```kotlin
  import kotlin.random.Random

  @Throws(Exception::class)
  fun main(req: RuntimeRequest, res: RuntimeResponse): RuntimeResponse {

      val payload = if (req.payload.isEmpty()) "No payload provided. Add custom data when executing function." else req.payload

      val secretKey = req.variables["SECRET_KEY"] ?: "SECRET_KEY variable not found. You can set it in Function settings."

      val randomNumber = Random.nextDouble(0.0, 1.0)

      val trigger = req.variables["APPWRITE_FUNCTION_TRIGGER"]

      return res.json(mapOf(
          "message" to "Hello from Appwrite!",
          "payload" to payload,
          "secretKey" to secretKey,
          "randomNumber" to randomNumber,
          "trigger" to trigger
      ))
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **deps.gradle** file with your function- Appwrite handles the rest!

- ### Java

  ```java
  import java.util.Map;
  import java.util.HashMap;

  public RuntimeResponse main(RuntimeRequest req, RuntimeResponse res) throws Exception {

      String payload = (req.getPayload().isEmpty())
                       ? "No payload provided. Add custom data when executing function."
                       : req.getPayload();

      Map variables = req.getVariables();

      String secretKey = variables.containsKey("SECRET_KEY")
                         ? variables.get("SECRET_KEY")
                         : "SECRET_KEY variable not found. You can set it in Function settings.";

      double randomNumber = Math.random();

      String trigger = variables.get("APPWRITE_FUNCTION_TRIGGER");

      Map response = new HashMap();
          response.put("message", "Hello from Appwrite!");
          response.put("payload", payload);
          response.put("secretKey", secretKey);
          response.put("randomNumber", randomNumber);
          response.put("trigger", trigger);

      return res.json(response);
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **deps.gradle** file with your function- Appwrite handles the rest!

- ### C++

  ```csharp
  #include <iostream>
  #include <string>

  static RuntimeResponse &main(const RuntimeRequest &req, RuntimeResponse &res) {

      std::string payload = req.payload.empty() ?
                            "No payload provided. Add custom data when executing function." :
                            req.payload;

      std::string secretKey = req.variables.get("SECRET_KEY", "SECRET_KEY variable not found. You can set it in Function settings.").asString();

      double randomNumber = ((double) rand() / (RAND_MAX));

      std::string trigger = req.variables["APPWRITE_FUNCTION_TRIGGER"].asString();

      Json::Value response;
      response["message"] = "Hello from Appwrite!";
      response["payload"] = payload;
      response["secretKey"] = secretKey;
      response["randomNumber"] = randomNumber;
      response["trigger"] = trigger;

      return res.json(response);
  }
  ```

  _Click Here to Copy_

  **Installing Dependencies**

  Include a **CMakeLists.txt** file with your function- Appwrite handles the rest!

When your function is called, you receive two parameters, a **request** and a **response** object. The request object contains all data that was sent to the function including function variables. A schema of the request object can be found below and is the same for all runtimes.

| Property  | Description                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| headers   | An object containing all the request headers.                                                                                                  |
| payload   | A JSON string containing the data when you [created the execution.](/docs/client/functions#functionsCreateExecution)                           |
| variables | An object containing all the function variables. This includes [variables](/docs/functions#functionVariables) automatically added by Appwrite. |

The response object has two functions, **send()** and **json()** that can be used to send data back to the client. The types and implementation of these functions vary depending on runtime due to all languages being slightly different. You can check out implementation in the specific languages to learn more about them. The schema of the response object can be found below:

| Function           | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| send(text, status) | Function to return a text response. Status code defaults to 200 |
| json(obj, status)  | Function to return a JSON response. Status code defaults to 200 |

## [Create your Function](/docs/functions#createFunction)

Before you can deploy your function, you will need to create a new function from your Appwrite project's dashboard. Access the Function settings from your project's left navigation panel. Click the 'Add Function' button and choose a function name and runtime. In your Functions settings page, you can also set your function event triggers, CRON schedule, and set secure function variables for your function.

## [Deploy Your Function](/docs/functions#deployFunction)

Once you've written your function, you can now deploy it using the [Appwrite CLI](/docs/command-line), the Appwrite [Server API](/docs/getting-started-for-server) or manually from the Appwrite console.

- Unix
- CMD
- PowerShell

- ### Unix

  ```bash
  appwrite functions createDeployment \
      --functionId=6012cc93d5a7b \
      --activate=true \
      --entrypoint="index.js" \
      --code="."
  ```

  _Click Here to Copy_

- ### CMD

  ```bash
  appwrite functions createDeployment ^
      --functionId=6012cc93d5a7b ^
      --activate=true ^
      --entrypoint="index.js" ^
      --code="."
  ```

  _Click Here to Copy_

- ### PowerShell

  ```bash
  appwrite functions createDeployment `
      --functionId=6012cc93d5a7b `
      --activate=true `
      --entrypoint="index.js" `
      --code="."
  ```

  _Click Here to Copy_

The command above accepts three parameters:

| Name       | Description                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| functionId | The ID of the Function you created in the previous step. You can find your function ID on your function page in your project dashboard.                        |
| entrypoint | The file name of your custom code that is executed when the function is triggered.                                                                             |
| code       | Path to your function tarball. When used with the Appwrite CLI, simply pass the path to your code directory, and the CLI will automatically package your code. |

[You can also create new code deployments using the Appwrite server API](/docs/server/functions#functionsCreateDeployment)

## [Builds](/docs/functions#build)

Deployments needs to be built before they can be activated. This is automatically done after creating a deployment and the time taken can vary depending on the runtime.

If a build fails for any reason, the deployment's status is set to **failed** and you won't be able to activate it. You can however retry a build if you think it was caused by an external factor using the **Retry Button** on the Appwrite Dashboard or [Retry Build](/docs/server/functions#functionsRetryBuild) endpoint with the **buildId** from the deployment.

To find more details about a deployment and reasons for its failure, you can use the [Get Deployment](/docs/server/functions#functionsGetDeployment) endpoint using the **deploymentId**.

Deployments that have been built successfully are marked as **ready** and can be activated and executed.

### Build Times

Compiled runtimes such as Rust and Swift take much longer to build however yield better performance over their interpreted counterparts such as Node.

## [Execute](/docs/functions#execute)

Besides setting a schedule or allowing your function to listen to Appwrite’s system events, you can also manually execute your cloud functions from your Appwrite console or API.

![Function settings page.](/images-ee/docs/functions-light.png?v=501) ![Function settings page.](/images-ee/docs/functions-dark.png?v=501)

Function settings page.

To execute a function from the Appwrite console, click the 'Execute Now' button on your function's overview page. To execute a function from the API, send a POST request to the [function execution endpoint](/docs/client/functions#functionsCreateExecution).

The function execution endpoint is available from both Appwrite client and server APIs. To execute your function from the **server API**, you need an API key with 'execution.write' scope.

Executing the function from the **client API** requires the current user to have execution permission for the function. You can change the execution permission from the function's settings page in the Appwrite console, by default no user, team, or role has this permission.

- Web
- Flutter
- Android
- Apple
- GraphQL

- ### Web

  ```javascript
  import { Client, Functions } from 'appwrite';

  const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('[PROJECT_ID]');

  const functions = new Functions(client);

  let promise = functions.createExecution('[FUNCTION_ID]');

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

  void main() async {
      final client = Client()
          .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
          .setProject('[PROJECT_ID]');

      final functions = Functions(client);

      final execution = await functions.createExecution(
          functionId: '[FUNCTION_ID]'
      );
  }
  ```

  _Click Here to Copy_

- ### Android

  ```kotlin
  import io.appwrite.Client
  import io.appwrite.services.Functions

  suspend fun main() {
      val client = Client(applicationContext)
          .setEndpoint("https://[HOSTNAME_OR_IP]/v1")
          .setProject("[PROJECT_ID]")

      val functions = Functions(client)

      val execution = functions.createExecution(
          functionId = "[FUNCTION_ID]"
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

      let functions = Functions(client)

      let execution = try await functions.createExecution(
          functionId: "[FUNCTION_ID]"
      )
  }
  ```

  _Click Here to Copy_

- ### GraphQL

  ```graphql
  mutation {
  	functionsCreateExecution(functionId: "[FUNCTION_ID]") {
  		_id
  		statusCode
  		response
  		stdout
  		stderr
  		duration
  	}
  }
  ```

  _Click Here to Copy_

### [Abuse and Limits](/docs/functions#abuseLimits)

Appwrite Functions can be executed using Client or Server SDKs. Client SDKs must be authenticated with an account that has been granted execution [permissions](/docs/permissions) on the function's settings page. Server SDKs require an API key with the correct scopes.

The Functions Service APIs are rate limited to 60 calls per minute per account when using a Client SDK. Learn more about [rate limiting](docs/rate-limits). The response size of a Cloud Function is limited to 1MB. Responses larger than 1MB should be handled using Appwrite's Databases or Storage service.

Each execution has a default timeout of 15 seconds to prevent hanging functions from blocking resources. This timeout can be configured per function on a function's settings page or in appwrite.json for up to 900 seconds.

The maximum configurable timeout can be increased by changing the \_APP_FUNCTIONS_TIMEOUT environment variable. This environment variable changes the configurable maximum but does not alter existing individual configurations.

## [Ignore Files](/docs/functions#ignoreFiles)

Library folders such as **node_modules** or **vendor** should not be included in your tarball since these dependencies will be installed during your function's build process. Similarly, you should **not** include files containing secrets in your deployment. You can use the Appwite CLI's **file ignoring** feature to exclude specific files from a deployment.

You can use the **ignore** property in your **appwrite.json** file to specify which files and folders should be ignored. This value must be an array of paths, as seen in the example below:

```json
{
    ...
    "functions": [
        {
            "$id": "6213b58cb21dda6c3263",
            "name": "My Awesome Function",
            "runtime": "node-17.0",
            "path": "My Awesome Function",
            "entrypoint": "src/index.js",
            "ignore": [ "node_modules", ".env" ]
        },
        ...
    ],
}
```

_Click Here to Copy_

The example configuration above would not deploy the folder **node_modules** and the file **.env**.

Alternatively, you can add a **.gitignore** file into your function folder and Appwrite CLI will ignore files specified in there. Keep in mind that if present, the **ignore** configuration in **appwrite.json** will nullify the **.gitignore** file configuration.

If you need to use a **.gitignore** file for your version control but don't want the Appwrite CLI to use it, you can specify the **ignore** key in **appwrite.json** to be an empty array.

## [Supported Runtimes](/docs/functions#supportedRuntimes)

Appwrite provides multiple code runtimes to execute your custom functions. Each runtime uses a Docker image tied to a specific language version to provide a safe, isolated playground to run your team's code.

Below is a list of supported Cloud Functions runtimes. The Appwrite team continually adds support for new runtimes.

|                                               | Name        | Image                                                                       | Architectures |
| --------------------------------------------- | ----------- | --------------------------------------------------------------------------- | ------------- |
| ![Function Env.](/images/runtimes/node.png)   | node-14.5   | [openruntimes/node:v2-14.5](https://hub.docker.com/r/openruntimes/node)     | x86 / arm     |
| ![Function Env.](/images/runtimes/node.png)   | node-16.0   | [openruntimes/node:v2-16.0](https://hub.docker.com/r/openruntimes/node)     | x86 / arm     |
| ![Function Env.](/images/runtimes/node.png)   | node-18.0   | [openruntimes/node:v2-18.0](https://hub.docker.com/r/openruntimes/node)     | x86 / arm     |
| ![Function Env.](/images/runtimes/php.png)    | php-8.0     | [openruntimes/php:v2-8.0](https://hub.docker.com/r/openruntimes/php)        | x86 / arm     |
| ![Function Env.](/images/runtimes/php.png)    | php-8.1     | [openruntimes/php:v2-8.1](https://hub.docker.com/r/openruntimes/php)        | x86 / arm     |
| ![Function Env.](/images/runtimes/ruby.png)   | ruby-3.0    | [openruntimes/ruby:v2-3.0](https://hub.docker.com/r/openruntimes/ruby)      | x86 / arm     |
| ![Function Env.](/images/runtimes/ruby.png)   | ruby-3.1    | [openruntimes/ruby:v2-3.1](https://hub.docker.com/r/openruntimes/ruby)      | x86 / arm     |
| ![Function Env.](/images/runtimes/python.png) | python-3.8  | [openruntimes/python:v2-3.8](https://hub.docker.com/r/openruntimes/python)  | x86 / arm     |
| ![Function Env.](/images/runtimes/python.png) | python-3.9  | [openruntimes/python:v2-3.9](https://hub.docker.com/r/openruntimes/python)  | x86 / arm     |
| ![Function Env.](/images/runtimes/python.png) | python-3.10 | [openruntimes/python:v2-3.10](https://hub.docker.com/r/openruntimes/python) | x86 / arm     |
| ![Function Env.](/images/runtimes/deno.png)   | deno-1.21   | [openruntimes/deno:v2-1.21](https://hub.docker.com/r/openruntimes/deno)     | x86           |
| ![Function Env.](/images/runtimes/deno.png)   | deno-1.24   | [openruntimes/deno:v2-1.24](https://hub.docker.com/r/openruntimes/deno)     | x86           |
| ![Function Env.](/images/runtimes/dart.png)   | dart-2.15   | [openruntimes/dart:v2-2.15](https://hub.docker.com/r/openruntimes/dart)     | x86 / arm     |
| ![Function Env.](/images/runtimes/dart.png)   | dart-2.16   | [openruntimes/dart:v2-2.16](https://hub.docker.com/r/openruntimes/dart)     | x86 / arm     |
| ![Function Env.](/images/runtimes/dart.png)   | dart-2.17   | [openruntimes/dart:v2-2.17](https://hub.docker.com/r/openruntimes/dart)     | x86 / arm     |
| ![Function Env.](/images/runtimes/dotnet.png) | dotnet-3.1  | [openruntimes/dotnet:v2-3.1](https://hub.docker.com/r/openruntimes/dotnet)  | x86 / arm     |
| ![Function Env.](/images/runtimes/dotnet.png) | dotnet-6.0  | [openruntimes/dotnet:v2-6.0](https://hub.docker.com/r/openruntimes/dotnet)  | x86 / arm     |
| ![Function Env.](/images/runtimes/java.png)   | java-8.0    | [openruntimes/java:v2-8.0](https://hub.docker.com/r/openruntimes/java)      | x86 / arm     |
| ![Function Env.](/images/runtimes/java.png)   | java-11.0   | [openruntimes/java:v2-11.0](https://hub.docker.com/r/openruntimes/java)     | x86 / arm     |
| ![Function Env.](/images/runtimes/java.png)   | java-17.0   | [openruntimes/java:v2-17.0](https://hub.docker.com/r/openruntimes/java)     | x86 / arm     |
| ![Function Env.](/images/runtimes/java.png)   | java-18.0   | [openruntimes/java:v2-18.0](https://hub.docker.com/r/openruntimes/java)     | x86 / arm     |
| ![Function Env.](/images/runtimes/swift.png)  | swift-5.5   | [openruntimes/swift:v2-5.5](https://hub.docker.com/r/openruntimes/swift)    | x86 / arm     |
| ![Function Env.](/images/runtimes/kotlin.png) | kotlin-1.6  | [openruntimes/kotlin:v2-1.6](https://hub.docker.com/r/openruntimes/kotlin)  | x86 / arm     |
| ![Function Env.](/images/runtimes/cpp.png)    | cpp-17.0    | [openruntimes/cpp:v2-17](https://hub.docker.com/r/openruntimes/cpp)         | x86 / arm     |

By default, the following runtimes are enabled: "node-16.0, php-8.0, python-3.9, ruby-3.0". To enable or disable runtimes, you can edit the \_APP_FUNCTIONS_RUNTIMES [environment variable](docs/environment-variables#functions).

## [Function Variables](/docs/functions#functionVariables)

Function variables supplied by Appwrite in addition to your own defined function variables that you can access from your function code. These variables give you information about your execution runtime environment.

| Name                              | Description                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| APPWRITE_FUNCTION_ID              | Your function's unique ID.                                                                                                                                                           |
| APPWRITE_FUNCTION_NAME            | Your function's name.                                                                                                                                                                |
| APPWRITE_FUNCTION_DEPLOYMENT      | Your function's code deployment unique ID.                                                                                                                                           |
| APPWRITE_FUNCTION_TRIGGER         | Either 'event' when triggered by one of the selected scopes, 'http' when triggered by an HTTP request or the Appwrite Console, or 'schedule' when triggered by the cron schedule.    |
| APPWRITE_FUNCTION_RUNTIME_NAME    | Your function runtime name. Can be any of Appwrite supported execution runtimes.                                                                                                     |
| APPWRITE_FUNCTION_RUNTIME_VERSION | Your function runtime version.                                                                                                                                                       |
| APPWRITE_FUNCTION_EVENT           | Your function event name. This value is available only when your function trigger is 'event.' This variable value can be any of Appwrite [system events](/docs/events).              |
| APPWRITE_FUNCTION_EVENT_DATA      | Your function event payload. This value is available only when your function trigger is 'event'. This variable value contains a string in JSON format with your specific event data. |

| APPWRITE_FUNCTION_DATA
version >= 0.8.0

| Your function's custom execution data. This variable's value contains a string in any format. If the custom data is in JSON FORMAT, it must be parsed inside the function code. Note that this variable can be set only when triggering a function using the [SDK or HTTP API](../client/functions) and the Appwrite Dashboard. |
| APPWRITE_FUNCTION_PROJECT_ID

version >= 0.8.0

| Your function's project ID. |
| APPWRITE_FUNCTION_USER_ID

version >= 0.8.0

| The userId of the user that triggered your function's execution. Executions triggered in the Appwrite console will be prepended with "admin-". |
| APPWRITE_FUNCTION_JWT

version >= 0.8.0

| A [JSON Web Token](https://jwt.io/) generated for the user that executes your function. |
| APPWRITE_FUNCTION_EVENT_PAYLOAD

<!-- version < 0.8.0 (deprecated)

| Your function event payload. Deprecated in favor of APPWRITE_FUNCTION_EVENT_DATA in version 0.8.0. |
| APPWRITE_FUNCTION_ENV_NAME

version < 0.8.0 (deprecated)

| Your function environment name. Can be any of Appwrite supported execution environments. |
| APPWRITE_FUNCTION_ENV_VERSION

version < 0.8.0 (deprecated)

| Your function environment version. | -->

### Using an Appwrite SDK in Your Function

Appwrite Server SDKs require an API key, an endpoint, and a project ID for authentication. Appwrite passes in your project ID with the function variable APPWRITE_FUNCTION_PROJECT_ID, but not the endpoint and API key. If you need to use a Server SDK, you will need to add function variables for your endpoint and API key in the 'Settings' tab of your function.

If you are running a **local Appwrite instance**, you will need to pass in the machine's public IP instead of 'https://localhost/v1'. Localhost inside the function's runtime container is not the same as localhost of your machine.

## [Appwrite SDKs in Functions](/docs/functions#appwriteSDKInFunctions)

You can integrate Appwrite Functions with other Appwrite services by using the appropriate [Server SDK](/docs/getting-started-for-server) for your runtime. You can find starter code for your function's runtime in the [Appwrite Function Starter repository](https://github.com/appwrite/functions-starter).

To initialize a Server SDK in a function, you need to provide your Appwrite endpoint and an [API key](/docs/keys) in the **Variables** tab of your Function. The ID of your Appwrite project is passed in automatically as APPWRITE_FUNCTION_PROJECT_ID.

## [Monitor & Debug](/docs/functions#monitorDebug)

You can monitor your function execution usage stats and logs from your Appwrite console. To access your functions usage stats and logs, click the 'Usage' tab in your function dashboard.

The usage screen in your console will allow you to track the number of execution and your function CPU usage time. You can also review a detailed log of your function execution history, including the function exit code, output log, and error log.

![Function usage and logs tracking.](/images-ee/docs/functions-monitor-light.png?v=501) ![Function usage and logs tracking.](/images-ee/docs/functions-monitor-dark.png?v=501)

Function usage and logs tracking.

## [Demos & Examples](/docs/functions#demosExamples)

There are many Cloud Function demos and examples created by the Appwrite team and community in multiple coding languages. These examples are available at our [examples repository](https://github.com/open-runtimes/examples) on GitHub. You can also submit your examples by submitting a [pull-request](https://github.com/open-runtimes/examples/pulls).

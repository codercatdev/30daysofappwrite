---
weight: 23
title: 'Appwrite Cloud Functions'
description: 'Learn how Cloud functions can boost your workflow.'
slug: 'appwrite-cloud-functions'
devto_url: 'https://dev.to/appwrite/30daysofappwrite-appwrite-cloud-functions-1pf2'
cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--XtuIOG9K--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j337xcj1xlljvtcurrl7.png'
created_at: '2021-05-23T11:42:01Z'
updated_at: '2022-04-12T20:15:32Z'
published_at: '2021-05-23T13:34:14Z'
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

[#30DaysOfAppwrite](http://30days.appwrite.io/) is a month-long event focused on giving developers a walk-through of all of Appwrite's features, starting from the basics to more advanced features like Cloud Functions! Alongside we will also be building a fully-featured Medium clone to demonstrate how these concepts can be applied when building a real-world app. We also have some exciting prizes for developers who follow along with us!

## Appwrite Cloud Functions

Welcome to Day 23 👋

If you're familiar with the world of serverless, you probably already know what a **Cloud Function** is. For those of you who don't, think of cloud functions as a stateless piece of code that can execute independently without the need for you to manage servers. If you've used **AWS Lambdas** or similar offerings, you will feel right at home with **Appwrite Cloud Functions**. Appwrite supports over **13 different runtimes** for languages like Python, Deno, .NET, and many more!

Today, we will walk you through the Functions dashboard in the Appwrite Console and learn how to create and deploy functions.

Cloud Functions in Appwrite can be triggered in 3 ways

- **REST API** - You can use any HTTP client or our SDKs to create and trigger cloud functions.
- **Events** - Appwrite emits events when certain actions occur in the server, like the creation of a user, the creation of a document, and many more. You can configure a function to listen to these events. You can learn more about all the system events in [our documentation](https://appwrite.io/docs/webhooks#events)
- **CRON Schedule** - You can also configure your functions to trigger based on a [CRON Schedule](https://en.wikipedia.org/wiki/Cron).

We will focus on the **REST API** trigger in today's example. Functions in Appwrite can be deployed using both the CLI and the Appwrite Console. We'll cover both methods in the following sections, but we highly recommend using the CLI, as it's a simpler workflow and can be automated.

## Deploying a Function Using the CLI

In this section, you will create a `hello-world` function in Python using the Appwrite CLI.

### 💻 Create your Function

Navigate to the project directory you created the previous day, then create a function using the CLI's `init function` command.

```sh
appwrite init function
```

Set its name to whatever you like and select the **Python 3.9** runtime when prompted.

### ✍️ Create a Deployment

The next step is for us to create a new deployment. Think of a deployment as a new version/revision of your function. We will use the **deploy** command within the Appwrite CLI.

```sh
appwrite deploy function
```

Which outputs the following:

```
ℹ Info Deploying function My Awesome Function ( 62540346c6f6418c7ac0 )
✓ Success Deployed My Awesome Function ( 62540346c6f6418c7ac0 )
```

Select the function you have just created, and the CLI will automatically deploy the function ready for execution.

### 🚀 Run your function

After you have waited a couple of seconds for the function to build, you can run your function by creating an execution using the `createExecution` command of the `functions` service. This command only requires one parameter, which is your `functionId`. You can perform this step either from the CLI, SDKs or the Appwrite Console. We'll stick to the CLI for now.

The `functionId` can be found at the end of the previous command in a pair of brackets. We are also using an optional parameter called `async`, this option will execute our function synchronously and return the result to us directly, saving us an additional call to the `getExecution` function.

```sh
appwrite functions createExecution --functionId 62540346c6f6418c7ac0 --async false
```

Which outputs the following:

```
$id : 6255cbb4896a4991544d # executionId
$read
[
  "user:6255c478548f6ec74c6b"
]
functionId : 62540346c6f6418c7ac0
dateCreated : 1649787327
trigger : http
status : completed
statusCode : 0
stdout : {"areDevelopersAwesome":true}
stderr :
time : 0.0281238822937
```

## Deploying a Function Using the Console

As you can see it's quite easy to deploy a simple function using the Appwrite CLI. In this section, we'll once again deploy the same function from the previous section. But this time, we'll walk you through the steps for a manual deployment using the Appwrite Console instead of the CLI.

### 📦 Packaging the Cloud Function

Before we can deploy the function, we need to package it into a tar file. To package your function, run the following commands in your project directory:

```sh
$ cd functions/{your-function-name}
$ tar -zcvf code.tar.gz .

a .
a ./requirements.txt
a ./README.md
a ./.gitignore
a ./src
a ./src/index.py
```

Now, head back to your function in the console and click **Create Deployment**. In the subsequent dialog, select the **Manual** Tab.
You will need to provide your entrypoint which will be the path to your function file. In our case, this is `src/index.py`. Next, upload the tar file that we just created and check the **Activate Deployment after build** option. Double-check your selection, and click **Create**.

![Create Deployment](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4uj8bcz2r0eccrx5qa3e.png)

### ✅ Activate and Execute

Once you create the deployment, you will need to wait for the build to complete. Wait a minute or so, and it should be completed and marked as **Ready**. Click on **Execute Now**. In the dialog that pops up, you will be asked to enter any custom data that you would like to pass to your function. You can leave this empty and proceed with the execution.

You can now head over to the **Logs** tab and examine the output of our function!

![Execution Logs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/whmb5yd5r0akslzpbzhn.png)

Perfect! You have just created and executed your first function using 2 different methods! You can explore our [examples repository](https://github.com/open-runtimes/examples) for more cool examples and use cases of Cloud Functions.

## Monitoring and Configuring your Functions

Within your dashboard you can access more information about your functions, including the status of the function, any previous execution responses and you can also configure your function's environment variables, which will be available to your function when it is executed.

In this section we will go through the three other tabs in your function's dashboard and explain what each tab does.

### ⚙️ Settings

![Function Settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0v22u08kvzuf7s84hizs.png)

This is where you can configure all aspects of your function.

| Field                  | Description                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Name                   | Your function Name                                                                             |
| Execute Access         | Manage who can execute this function using [permissions](https://appwrite.io/docs/permissions) |
| Timeout (seconds)      | Limit the execution time of your function to prevent abuse                                     |
| Events                 | The Events which trigger this function                                                         |
| Schedule (CRON Syntax) | Set a CRON Schedule to execute this function                                                   |
| Variables              | Securely store secrets and other values using the environment variables                        |

### 📊 Monitors

Here, you'll be able to find some useful information about your function's executions and some usage metrics like CPU time, executions, errors, etc.

![Monitors](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fvlyv9zvqvjcrk7do845.png)

### 📑 Logs

This is where you can check all your execution logs. You can also inspect your function's previous responses.

![Logs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u8nvl8yi3bddqyavs3nd.png)

## Credits

We hope you liked this write-up. You can follow [#30DaysOfAppwrite](https://twitter.com/search?q=%2330daysofappwrite) on Social Media to keep up with all of our posts. The complete event timeline can be found [here](http://30days.appwrite.io)

- [Discord Server](https://appwrite.io/discord)
- [Appwrite Homepage](https://appwrite.io/)
- [Appwrite's Github](https://github.com/appwrite)

Feel free to reach out to us on Discord if you would like to learn more about Appwrite, Aliens, or Unicorns 🦄. Stay tuned for tomorrow's article! Until then 👋

Gatsby, Netlify and Fauna application
===

![](https://i.imgur.com/UnXY1QH.png)

- **Part 1** [Setup Gatsby with Netlify Functions](https://employbl.com/blog/setup-gatsby-with-netlify-functions): In this tutorial we’re going to build an application that submits a form with React.js and triggers an AWS Lambda function with Netlify.

- **Part 2** [Connect Fauna database to a Gatsby serverless application](https://employbl.com/blog/connect-fauna-database-gatsby-serverless): Here I’m going to build upon the application built in the last tutorial. I have a Gatsby site that can trigger AWS Lambda functions via Netlify. Now it’s time to create a Fauna database, connect to, read from and write to it.

## Getting started

In one tab run `gatsby develop` this will run the UI on `http://localhost:8000`.

In another tab from project root run `npm run serve:lambda`. This will help us with the proxy and running our Netlify Functions locally.

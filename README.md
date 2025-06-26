# TaskHub Project

This is the project help user to create and manage the tasks where user can login via openid connect service provider and manage their tasks
this project created using the React, nodejs, serverless technology i,e aws lambda, aws sam, aws dynamodb, amazon cognito

## project installation and setup

1. clone the repository
2. install the dependency
3. add the .env variables
4. run the server with npm run dev command

## Project Hosting and deployment steps

1. clone the repository
2. install the dependencies
3. edit .env according to the environment eg. cognito clientId
4. execute npm run build for creating the build file
5. copy this build content to s3 bucket via s3 cp dist/ s3://taskhub-static-site --recursive --profile profile_name command
6. go to amplify console and deploy this app via s3 option

## authentication

## important links

1. consuming graphql api :</br>
   https://medium.com/@layne_celeste/fetching-data-in-react-from-a-graphql-api-9282e7835485</br>
   https://www.freecodecamp.org/news/5-ways-to-fetch-data-react-graphql/
2. Authntication with aws cognito service:</br>

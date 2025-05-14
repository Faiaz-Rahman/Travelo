# Travelo

This is a travel blogging app where users can share their travel stories and upload images. They can send messages via this app.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

> **Note**: For This project yarn has been used as the package manager.

## Typescript

Typescript has been throughout all the project instead of Javascript for a better structured project and avoiding null or, undefined errors. Also, Type definitions has been done into a separate file for better project structure.

## Authentication

For Authentication **Firebase** has been used to authenticate users.

## Database

For Database **Firebase Firestore** has been used to store user credentials and information.

## Storage

For storing image uploaded by user **Supabase** has been used to store the image as binary.
First the image is converted to base64 and then, converted to binary internally. Hence, uploaded to the supabase storage.

As, per Firebase policy from **October, 2024**, user with **Spark Plan** won't be able to use storage. User would need **Pay as you go Blaze Plan** for using the Firebase storage.

## Custom Components

For components no third-party library has been used so that, the bundle size for the application remain smaller.

## Global Store

For this application **Redux toolkit** has been used for global store. **Redux - Thunk** has been used for Asynchronous requests to Firebase and Supabase. **Redux-Persist** has been used to persist data, even if the app is in the background or, quit state.

## Form Validation

For Form validation, **Yup** and, **Formik** has been used, for dynamic form validation.

## Credentials

```
   email: test@xyz.com
   password: Password@321
```

## To run the project locally

Move to the project's root directory after cloning the project and, run

```
   yarn start
```

## Socket for live status of user

Custom **Socket** server has been implemented and deployed to [**Render**]("https://render.com/") for free using **socket-io**. As soon as an user logs in the live status of user is shown right in the header. Clicking on it, it displays the list of active user whom he can send messages to.

## Realtime messaging

For realtime messaging firebase has been used. Also, for the messaging screen, **react-native-gifted-chat** has been used for a better experience.

## Versioning

React-Native version **0.75.3** has been used for this project, as locally I had the gradle, gradle wrapper already set up, to reduce the production time.

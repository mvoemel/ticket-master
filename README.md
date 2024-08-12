# Ticket Master

This application allows you to buy and sell tickets online. It was developed using an event-based microservices approach.

## Development

_Prerequisits: You need to have **docker**, **kubernetes** and **skaffold** installed. Also you may need to install **ingress-nginx**._

Add an entry `127.0.0.1 ticket-master.dev` to the local hosts `/etc/hosts` (on MacOS and Linux) file on your machine.

To startup dev environment type `skaffold dev` in the root directory of this project.

You may need to create some docker images. If you need to do so the following way. Docker image for **client**: `docker build -t YOURDOCKERID/client .`.

Type `ticket-master.dev` in your browser to access the application.

If you get the `Your connection is not private` error click anywhere in the window and type `thisisunsafe` on your keyboard (works in Chromium based browsers like Chrome, Brave, ...) and the window should now render all the content.

## Error Common Response Structure

```ts
{
    errors: {
        message: string,
        field?: string
    }[]
}
```

## Secrets

- JWT Secret:

```bash
kubectl create secret generic jwt-secret --from-literal JWT_KEY=your-jwt-secret
```

- Stripe Secret:

```bash
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=your-stripe-secret-key
```

## Test

Run `npm run test` to test a microservice.

## Publish new npm Version of Common Package

First login with `npm login` then `npm publish --access public`. Make sure that you got the right name in the `common/package.json` file.

After doing that you can now simply run `npm run pub` to publish new changes to the common package to **npm**.

Then in your microservice run `npm update @YOUR_PACKAGE_NAME/common` to get the new version into your microservices application.

## Common Event Definitions

In this project we have all our microservices written in **TypeScript** and all the different event types are saved in the common module and distributed by it. But if you have an architecture that uses several different languages you cannot use this approach to secure type safety. Instead you can use the following **cross language support** libraries/frameworks:

- JSON Schema
- Protobuf

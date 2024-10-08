# Ticket Master

This application allows you to buy and sell tickets online. It was developed using an asynchronous event-based microservices approach.

## Deployment

If you deploy on DigitalOcean you first need to purchase a k8s cluster with at least three nodes. Than you need to create an access token and paste it in the GitHub secrets with a specific name, which is defined in the `.github/workflows` files. Moreover you need to add your Docker username and password as a secret. After that you need to install `ingress-nginx` on the DigitalOcean k8s cluster and also set the jwt and the stripe secret. Then you need to uncomment all the stuff inside the `.github/workflows` files. You also need a load balancer on DigitalOcean. Furthermore you need to own a domain name, which you need to specify in the `infrastructure/k8s-prod/ingress-srv.yml` file. Also you need to change the `client/api/build-client.js` file.

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
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your-jwt-secret
```

- Stripe Secret:

```bash
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your-stripe-secret-key
```

## Test

Run `npm run test` to run a test suit in a microservice. Run `npm run test:ci` to run tests only once without the `--watchAll` flag.

## Publish new npm Version of Common Package

First login with `npm login` then `npm publish --access public`. Make sure that you got the right name in the `common/package.json` file.

After doing that you can now simply run `npm run pub` to publish new changes to the common package to **npm**.

Then in your microservice run `npm update @YOUR_PACKAGE_NAME/common` to get the new version into your microservices application.

## Common Event Definitions

In this project we have all our microservices written in **TypeScript** and all the different event types are saved in the common module and distributed by it. But if you have an architecture that uses several different languages you cannot use this approach to secure type safety. Instead you can use the following **cross language support** libraries/frameworks:

- JSON Schema
- Protobuf

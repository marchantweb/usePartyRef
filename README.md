# usePartyRef

![usePartyRef](cover.jpg)

`usePartyRef()` is a Vue 3 composable that extends the functionality of the standard `ref()` to enable real-time,
synchronized state across multiple clients globally.

It transforms any local reactive state into a shared state across all connected clients, effectively allowing you to
build multiplayer interactive experiences using the Vue lifecycle hooks you're familiar with. Just like `refs()`, you
can watch them, bind them to inputs, and use them in computed properties.

Under the hood, it's using [PartyKit](https://www.partykit.io/) websockets, based
on [CloudFlare Durable Objects](https://developers.cloudflare.com/durable-objects/) to keep values in sync.

## 📦 Installation

Install `usePartyRef` via npm by running:

```bash
npm install usepartyref
```

---

## 🚀 Usage

Below is a comparison of using Vue's native `ref()` versus `usePartyRef()` to illustrate how you can seamlessly use
globally shared state as easily as using a normal ref:

```ts
// Use Vue's native ref() for local state
const count: Ref<number> = ref(0)

// Use usePartyRef() for shared state
const sharedCount: Ref<number> = usePartyRef({
    project: 'my-project', // Choose something unique
    name: "count",
    defaultValue: 0
})
```

With `usePartyRef()`, the count state is synchronized in real time across all clients that subscribe to it. That might
be two browser tabs on your local machine, or another computer on the other side of the planet.

### Seamless integration w/ the rest of Vue's reactivity system

`usePartyRef` returns a `Ref` object, which means it can be used seamlessly with other Vue 3 features such as watchers,
computed properties, and bindings within your components. Let's take a look...

```ts
import {watch, computed} from 'vue'

// Let's track a shared `count` variable
const count: Ref<number> = usePartyRef({
    project: 'my-project',
    name: "count",
    defaultValue: 0
})

// Watch for state changes
watch(count, (newValue, oldValue) => {
    console.log(`The count has changed from ${oldValue} to ${newValue}`)
})

// Compute a new value based on the count
const doubledCount = computed(() => count.value * 2)
```

---

## 💪 Managed vs. Self-Hosting

`usePartyRef` is built on top of [PartyKit](https://www.partykit.io/), a managed service that handles the real-time
synchronization of state across clients. This means you don't need to worry about setting up your own server or managing
the infrastructure.

By default, `usePartyRef` uses the PartyKit server hosted by the package author. This is great for getting started quickly, but it's not recommended for production use.

Running the PartyKit server on your own PK account is a simple as forking this repo, running `server:deploy` with your
own PartyKit credentials, and configuring the `usePartyRef` composable to point at it by setting the `host` option:

```ts
const count: Ref<number> = usePartyRef({
    project: 'my-project',
    name: "count",
    defaultValue: 0,
    host: 'https://[projectname].[username].partykit.dev'
})
```

You can also go as far as actually self-hosting on CloudFlare. For that, see
the [PartyKit documentation](https://docs.partykit.io/guides/deploy-to-cloudflare/).

---

## 🔗 Links

- [PartyKit](https://partykit.io/)
- [Follow on Twitter](https://twitter.com/marchantweb)
- [Chat on Discord](https://discord.gg/hKyfDAddsK)

---

## 📄 License

Copyright (c) 2024 Simon Le Marchant _(Marchant Web, LLC.)_

`usePartyRef` is licensed under the [MIT License](https://github.com/vuexyz/vuexyz/blob/main/LICENSE). Licensed works,
modifications, and larger works may be distributed under different terms and without source code.

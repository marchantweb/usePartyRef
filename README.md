# usePartyRef

`usePartyRef()` is a Vue 3 composable that extends the functionality of the standard `ref()` to enable real-time, synchronized state across multiple clients globally.

It transforms any local reactive state into a shared state across all connected clients, effectively allowing you to build multiplayer interactive experiences using the Vue lifecycle hooks you're familiar with. Just like `refs()`, you can watch them, bind them to inputs, and use them in computed properties.

Under the hood, it's using [PartyKit](https://www.partykit.io/) websockets, based on [CloudFlare Durable Objects](https://developers.cloudflare.com/durable-objects/) to keep values in sync.

## Installation

Install `usePartyRef` via npm by running:

```bash
npm install usepartyref
```

## Usage

Below is a comparison of using Vue's native `ref()` versus `usePartyRef()` to illustrate how you can seamlessly convert local state into a shared state:

```ts

// Using Vue's native ref() for local state
const count: Ref<number> = ref(0)

// Using usePartyRef() for shared state across clients
const count: Ref<number> = usePartyRef(0)

```
With `usePartyRef()`, the count state is synchronized in real time across all clients that subscribe to it.

---

### Seamless integration w/ the rest of Vue's reactivity system

`usePartyRef` returns a `Ref` object, which means it can be used seamlessly with other Vue 3 features such as watchers, computed properties, and bindings within your components. Let's take a look...

```ts
import { watch, computed } from 'vue'

// Let's track a `count` variable, shared across all clients
const count: Ref<number> = usePartyRef(0)

// Watch for state changes
watch(count, (newValue, oldValue) => {
  console.log(`The count has changed from ${oldValue} to ${newValue}`)
})

// Compute a new value based on the count
const doubledCount = computed(() => count.value * 2)

```

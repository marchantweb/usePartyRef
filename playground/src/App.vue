<script setup lang="ts">
import {usePartyRef} from '../../src/index'
import {computed, ComputedRef, Ref} from "vue";

const count: Ref<number> = usePartyRef({
  namespace: "usepartyref-playground",
  key: "count",
  defaultValue: 0
})

const double: ComputedRef<number> = computed(() => count.value * 2)
</script>

<template>
  <div>
    <a href="https://partykit.io" target="_blank">
      <img src="/pk.png" class="logo" alt="PartyKit logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <h1>usePartyRef</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button><button type="button" @click="count = 0">reset</button>
    <p><strong>Computed double: {{ double }} </strong></p>
    <p>
      Open another browser tab to see <code>count</code> remain in sync across all connected clients.
    </p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em rgba(255, 100, 100, 0.67));
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

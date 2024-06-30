<script setup lang="ts">
import {usePartyRef} from '../../src/index'
import {computed, ComputedRef, Ref} from "vue";

const count: Ref<number> = usePartyRef({
  id: "count",
  namespace: "participants",
  defaultValue: 0
})

const double: ComputedRef<number> = computed(() => count.value * 2)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <h1>usePartyRef</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
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
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup lang="ts">
import CountExample from "./components/CountExample.vue";
import CheckboxExample from "./components/CheckboxExample.vue";
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
  <!--<CountExample/>-->
  <CheckboxExample />
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

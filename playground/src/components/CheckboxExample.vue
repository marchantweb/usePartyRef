<script setup lang="ts">
import {usePartyRef, PartyRef} from '../../../src/index'
import {computed, ComputedRef} from "vue";

const checkboxes: PartyRef<boolean[]> = usePartyRef({
  namespace: "usepartyref-playground",
  key: "checkboxes-v2",
  defaultValue: Array(100).fill(false)
})

const totalChecked: ComputedRef<number> = computed(() => checkboxes.value.filter(Boolean).length)
const isReady: ComputedRef<boolean> = computed(() => checkboxes.ready.value)

</script>

<template>
  <div class="card">
    <div class="checkboxes">
      <input type="checkbox" v-for="(value, index) in checkboxes" v-model="checkboxes[index]"/>
    </div>
    <p><strong>Total checked boxes: {{ totalChecked }} / {{ checkboxes.length }} </strong> <em>(Connection Ready: {{ isReady ? 'Yes' : 'No' }})</em></p>
    <p>
      Everyone visiting this website can check/uncheck these checkboxes in real-time. If everyone leaves, they reset.
    </p>
  </div>
</template>

<style scoped>
.checkboxes {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1rem;
}

input[type="checkbox"] {
  width: 1.3rem;
  height: 1.3rem;
}
</style>

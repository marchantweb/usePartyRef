<script setup lang="ts">
import {usePartyRef} from '../../../src/index'
import {computed, ComputedRef, Ref} from "vue";

const checkboxes: Ref<boolean[]> = usePartyRef({
  namespace: "usepartyref-playground",
  key: "checkboxes",
  defaultValue: [false, false, false, false, false, false, false, false, false, false]
})

const totalChecked: ComputedRef<number> = computed(() => checkboxes.value.filter(Boolean).length)
</script>

<template>
  <div class="card">
    <div v-for="(value, index) in checkboxes" :key="index">
      <input type="checkbox" v-model="checkboxes[index]" />
      {{ index + 1 }}
    </div>
    <p><strong>Total checked boxes: {{ totalChecked }} </strong></p>
    <p>
      Everyone visiting this website can check/uncheck these checkboxes in real-time.
    </p>
  </div>
</template>

<style scoped>

</style>

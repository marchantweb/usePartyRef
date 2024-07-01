<script setup lang="ts">
import {usePartyRef} from '../../../src/index'
import {computed, ComputedRef, Ref} from "vue";

const count: Ref<number> = usePartyRef({
  namespace: "usepartyref-playground",
  key: "count",
  defaultValue: 0
})

const double: ComputedRef<number> = computed(() => count.value * 2)
</script>

<template>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button><button type="button" @click="count = 0">reset</button>
    <p><strong>Computed double: {{ double }} </strong></p>
    <p>
      Open another browser tab to see <code>count</code> remain in sync across all connected clients.
    </p>
  </div>
</template>

<style scoped>

</style>

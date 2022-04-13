<template>
  <div :class="`alert alert-${type}`" role="alert">
    {{ message }}
  </div>
</template>
<script lang="ts">
export default {
  props: ['message', 'type']
}
</script>
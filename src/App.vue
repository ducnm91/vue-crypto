<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Alert from "./components/commons/Alert.vue";
</script>

<template>
  <Alert />
  <RouterView />
</template>
<style lang="scss">
@import "@/assets/sass/app.scss";
</style>

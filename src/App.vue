<script>
import { RouterLink, RouterView } from "vue-router";
import Alert from "./components/commons/Alert.vue";
import MainMenu from "./components/MainMenu.vue";
export default {
  components: {
    MainMenu
  }
}
</script>

<template>
  <!-- <Alert /> -->
  <MainMenu />
  <RouterView />
</template>
<style lang="scss">
@import "@/assets/sass/app.scss";
</style>

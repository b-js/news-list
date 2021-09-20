<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';

// @Options({
//   components: { EssentialLink },
// })
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
</script>
<style lang="scss">
  body {
    background-color: #FBFBFB;
  }
</style>

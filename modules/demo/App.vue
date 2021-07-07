<template>
  <div class="container">
    <h1 class="title" v-text="title" />

    <h2 class="title">logo:</h2>
    <app-logo />

    <h2 class="title">image:</h2>
    <img class="logo" :src="logo">
  </div>
</template>

<script>
import AppLogo from '@frontend/components/AppLogo.vue';
import logo from '@frontend/assets/images/logo.png';

export default {
  components: {
    AppLogo,
  },
  data() {
    return {
      title: 'demo',
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
$title-font-color: #444;

.container {
  width: 80vw;
  margin: auto;

  .title {
    color: $title-font-color;
  }

  .logo {
    width: 100px;
  }
}
</style>

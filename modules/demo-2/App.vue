<template>
  <div class="container">
    <h1 class="title" v-text="title" />
    <img class="logo" :src="logo">
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png';

export default {
  data() {
    return {
      title: 'demo-2',
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

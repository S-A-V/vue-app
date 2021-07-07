<template>
  <img class="logo" :src="logo">
</template>

<script>
import logo from '@frontend/assets/images/logo.png';

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  @include size(64px);
}
</style>

<template>
  <div>
    <h1>hi, {{name}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  props: {
    name: String
  }
}
</script>


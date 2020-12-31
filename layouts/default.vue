<template>
  <div class="flex flex-col max-w-3xl min-h-screen mx-auto text-black">
    <Header />
    <nuxt />
  </div>
</template>
<script lang="ts">
import Header from '../components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

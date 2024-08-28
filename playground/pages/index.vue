<script lang="ts" setup>
const { user } = useSanctumAuth();
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    "
  >
    <h1 style="text-align: center">Home Page</h1>
    <pre v-if="user">{{ user }}</pre>
  </div>
</template>

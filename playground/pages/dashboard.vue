<script lang="ts" setup>
definePageMeta({
  middleware: ['$auth'],
});

const { user } = useSanctum();
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
    <h1 style="text-align: center">Dashboard</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

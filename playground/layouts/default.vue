<script lang="ts" setup></script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <NuxtLoadingIndicator />
    <nav class="nav">
      <ul>
        <li>
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth/login"> Login </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth/register"> Register </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard"> Dashboard </NuxtLink>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>

    <slot />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.nav li {
  margin-right: 20px;
}

.nav li a {
  text-decoration: none;
  color: #fff;
}

.nav li a:hover {
  color: #ddd;
}
</style>

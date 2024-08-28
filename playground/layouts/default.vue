<script lang="ts" setup>
const { isLoggedIn, user, logout } = useSanctumAuth<{ name: string }>();

async function logoutUser() {
  await logout(() => {
    console.log('logout successfully');
    navigateTo('/auth/login');
  });
}
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <NuxtLoadingIndicator />
    <nav class="nav">
      <ul>
        <li>
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <template v-if="!isLoggedIn">
          <li>
            <NuxtLink to="/auth/login"> Login </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/auth/register"> Register </NuxtLink>
          </li>
        </template>
        <template v-if="isLoggedIn">
          <li>
            <NuxtLink to="/dashboard"> Dashboard </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile"> Profile </NuxtLink>
          </li>
          <li>
            <button @click="logoutUser">Logout</button>
          </li>
          <li>
            {{ user?.name }}
          </li>
        </template>
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

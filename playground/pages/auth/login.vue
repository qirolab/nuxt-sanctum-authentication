<script setup lang="ts">
definePageMeta({
  middleware: ['$guest'],
});

const form = ref({
  email: '',
  password: '',
});

const { login } = useSanctum();

async function submit() {
  await login(form.value);
}
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <form @submit.prevent="submit">
    <div class="login-form">
      <h1 class="heading">Login</h1>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" />
      </div>
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<style scoped>
.heading {
  font-size: 25px;
  margin: auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px;
  margin: 20px auto;
}

.login-form label {
  display: block;
}

.login-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #000;
}
</style>

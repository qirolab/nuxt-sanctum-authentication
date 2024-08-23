<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:guest'],
});

const { refreshUser } = useSanctumAuth();

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const sanctumFetch = useSanctumFetch();

async function submit() {
  try {
    await sanctumFetch('/register', {
      method: 'post',
      body: form.value,
    });

    await refreshUser();
    return navigateTo('/profile');
  } catch (error) {
    console.error(error);
  }
}
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <form @submit.prevent="submit">
    <div class="register-form">
      <h1 class="heading">Register</h1>
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" />
      </div>
      <div>
        <label for="password_confirmation">Password Confirmation</label>
        <input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
        />
      </div>
      <button type="submit">Register</button>
    </div>
  </form>
</template>

<style scoped>
.heading {
  font-size: 25px;
  margin: auto;
}

.register-form {
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

.register-form label {
  display: block;
}

.register-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-form button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #000;
}
</style>

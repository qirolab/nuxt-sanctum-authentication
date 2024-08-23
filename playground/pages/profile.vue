<script lang="ts" setup>
import { FetchError } from 'ofetch';

definePageMeta({
  middleware: ['sanctum:auth'],
});

const { user, refreshUser } = useSanctumAuth<{ name: string; email: string }>();

const form = ref({
  name: '',
  email: '',
});

const errors = ref<{ [key: string]: string[] }>({});

const sanctumFetch = useSanctumFetch();

async function submit() {
  try {
    await sanctumFetch('/api/profile', {
      method: 'post',
      body: form.value,
    });

    await refreshUser();
  } catch (error) {
    if (error instanceof FetchError && error.response?.status === 422) {
      errors.value = error.response?._data.errors;
      console.log(error.response?._data.errors);
    }
  }
}

onMounted(() => {
  form.value.name = user.value!.name;
  form.value.email = user.value!.email;
});
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <form @submit.prevent="submit">
    <div class="profile-form">
      <h1 class="heading">Profile</h1>
      {{ user }}
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" />
        <span v-if="errors.name">{{ errors.name[0] }}</span>
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" />
        <span v-if="errors.email">{{ errors.email[0] }}</span>
      </div>
      <button type="submit">Save</button>
    </div>
  </form>
</template>

<style scoped>
.heading {
  font-size: 25px;
  margin: auto;
}

.profile-form {
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

.profile-form label {
  display: block;
}

.profile-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-form button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.profile-form button:hover {
  background-color: #000;
}
</style>

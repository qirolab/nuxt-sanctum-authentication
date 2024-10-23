<script lang="ts" setup>
definePageMeta({
  middleware: ['$auth'],
});

const { user, refreshUser } = useSanctum<{
  name: string;
  email: string;
  avatar: string;
}>();

interface UserProfileForm extends Record<string, unknown> {
  name: string;
  email: string;
  avatar: File | null;
}

const form = useSanctumForm<UserProfileForm>('patch', '/api/profile', {
  name: user.value!.name,
  email: user.value!.email,
  avatar: null,
});

interface User {
  name: string;
  email: string;
}
async function submit() {
  await form.submit<User>();
  await refreshUser();
}

function resetForm() {
  form.reset();
}
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <form @submit.prevent="submit">
    <div class="profile-form">
      <h1 v-if="user" class="heading">Profile: {{ user.name }}</h1>
      <div
        v-if="user && user.avatar"
        style="display: flex; justify-content: center"
      >
        <img
          :src="user.avatar"
          style="width: 5rem; height: 5rem; border-radius: 9999px"
        />
      </div>
      <!-- <pre>{{ user }}</pre> -->
      <div>
        <label for="avatar">Avatar</label>
        <input
          id="avatar"
          type="file"
          :class="{ 'border-danger': form.invalid('avatar') }"
          @change="
            (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files) {
                form.avatar = target.files[0];
              }

              form.forgetError('avatar');
            }
          "
        />
        <span v-if="form.invalid('avatar')" class="text-danger">
          {{ form.errors.avatar }}
        </span>
      </div>
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          :class="{ 'border-danger': form.invalid('name') }"
          @input="form.forgetError('name')"
        />
        <span v-if="form.invalid('name')" class="text-danger">
          {{ form.errors.name }}
        </span>
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="text"
          :class="{ 'border-danger': form.invalid('email') }"
          @input="form.forgetError('email')"
        />
        <span v-if="form.invalid('email')" class="text-danger">
          {{ form.errors.email }}
        </span>
      </div>
      <button type="submit">{{ form.processing ? 'Saving' : 'Save' }}</button>
      <button type="button" @click="resetForm">Reset</button>
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

.text-danger {
  color: red;
}
.border-danger {
  border: 1px solid red !important;
}
</style>

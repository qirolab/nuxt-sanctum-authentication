<script lang="ts" setup>
definePageMeta({
  middleware: ['$auth'],
});

const { user, refreshUser } = useSanctum<{ name: string; email: string }>();

// const form = ref({
//   name: '',
//   email: '',
// });

const form = useSanctumForm<{
  name: string;
  email: string;
  avatar: File | null;
}>('post', '/api/profile', {
  name: '',
  email: '',
  avatar: null,
});
// const errors = ref<{ [key: string]: string[] }>({});
interface User {
  name: string;
  email: string;
}
async function submit() {
  console.log(form.data());

  try {
    await form.submit<User>();
    // await useSanctumFetch('/api/profile', {
    //   method: 'post',
    //   body: form.data(),
    // });

    await refreshUser();
  } catch (error) {
    // if (error instanceof FetchError && error.response?.status === 422) {
    //   errors.value = error.response?._data.errors;
    //   console.log(error.response?._data.errors);
    // }
  }
}

onMounted(() => {
  form.setData({
    name: user.value!.name,
    email: user.value!.email,
  });
  // form.value.name = user.value!.name;
  // form.value.email = user.value!.email;
});
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <form @submit.prevent="submit">
    <div class="profile-form">
      <h1 class="heading">Profile</h1>
      <pre>{{ user }}</pre>
      <pre>{{ form.errors }}</pre>
      <pre>Has Error:{{ form.hasErrors }}</pre>

      <div>
        <label for="name">Name</label>
        <input
          id="avatar"
          type="file"
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
        {{ form.avatar }}
        <span v-if="form.invalid('avatar')">{{ form.errors.avatar }}</span>
      </div>
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          @blur="form.forgetError('name')"
        />
        {{ form.name }}
        <span v-if="form.invalid('name')">{{ form.errors.name }}</span>
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="text"
          @blur="form.forgetError('email')"
        />
        {{ form.email }}
        <span v-if="form.invalid('email')">{{ form.errors.email }}</span>
      </div>
      <button type="submit">Save {{ form.processing }}</button>
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

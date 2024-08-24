import MyModule from '../../../src/module';

export default defineNuxtConfig({
  modules: [MyModule],

  runtimeConfig: {
    public: {
      sanctumAuth: {
        apiUrl: 'http://localhost:80',
      },
    },
  },
});

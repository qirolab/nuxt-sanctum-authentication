// import MyModule from '../../../src/module';

export default defineNuxtConfig({
  // modules: [MyModule],

  runtimeConfig: {
    public: {
      laravelSanctum: {
        apiUrl: 'http://localhost:80',
      },
    },
  },
});

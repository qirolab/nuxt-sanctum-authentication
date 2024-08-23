export default defineNuxtConfig({
  ssr: true,
  modules: ['../src/module'],
  devtools: { enabled: false },
  devServer: {
    host: 'laravel-api.test',
  },
  sanctumAuth: {
    apiUrl: 'http://laravel-api.test',
    redirect: {
      enableIntendedRedirect: true,
      loginPath: '/auth/login',
      guestOnlyRedirect: '/profile',
      redirectToAfterLogin: '/dashboard',
      redirectToAfterLogout: '/auth/login',
    },
  },
});

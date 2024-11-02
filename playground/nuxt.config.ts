export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  devServer: {
    host: 'localhost',
  },

  laravelSanctum: {
    apiUrl: 'http://localhost:8000',
    authMode: 'cookie',
    userStateKey: 'sanctum.authenticated.user',
    userResponseWrapperKey: 'data',

    token: {
      storageKey: 'AUTH_TOKEN',
      provider: 'cookie',
      // responseKey: 'data.token',
      responseKey: 'token',
    },
    fetchClientOptions: {
      retryAttempts: false,
    },
    csrf: {
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    },
    sanctumEndpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/login',
      // login: '/api/tokens/create',
      logout: '/logout',
      // logout: '/api/tokens/delete',
      user: '/api/user',
    },
    redirect: {
      enableIntendedRedirect: true,
      loginPath: '/auth/login',
      guestOnlyRedirect: '/profile',
      redirectToAfterLogin: '/dashboard',
      redirectToAfterLogout: '/auth/login',
    },
    middlewareNames: {
      auth: '$auth',
      guest: '$guest',
    },
    logLevel: 3,
  },

  compatibilityDate: '2024-08-26',
});

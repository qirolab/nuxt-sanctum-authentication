import{_ as s,c as a,o as i,a5 as e}from"./chunks/framework.BmV27xUm.js";const g=JSON.parse('{"title":"Customizing Middleware Names","description":"","frontmatter":{},"headers":[],"relativePath":"middlewares/customizing-middleware-names.md","filePath":"middlewares/customizing-middleware-names.md"}'),n={name:"middlewares/customizing-middleware-names.md"},t=e(`<h1 id="customizing-middleware-names" tabindex="-1">Customizing Middleware Names <a class="header-anchor" href="#customizing-middleware-names" aria-label="Permalink to &quot;Customizing Middleware Names&quot;">​</a></h1><p>The default names for these middlewares are <code>$auth</code> and <code>$guest</code>, but you have the flexibility to rename them to suit your project&#39;s conventions or preferences. This can be done through the module&#39;s configuration settings.</p><h2 id="how-to-rename-middlewares" tabindex="-1">How to Rename Middlewares <a class="header-anchor" href="#how-to-rename-middlewares" aria-label="Permalink to &quot;How to Rename Middlewares&quot;">​</a></h2><p>To rename the <code>$auth</code> and <code>$guest</code> middlewares, you can specify new names in the <code>middlewareNames</code> option within the <code>laravelSanctum</code> configuration in your <code>nuxt.config.ts</code> or <code>nuxt.config.js</code> file. Here&#39;s how you can do it:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineNuxtConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    modules: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;nuxt-sanctum-authentication&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    laravelSanctum: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        apiUrl: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://laravel-api.test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Your Laravel API base URL</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        middlewareNames: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            auth: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;$auth&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Custom name for the auth middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            guest: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;$guest&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Custom name for the guest middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>In this example, you can replace <code>&#39;$auth&#39;</code> and <code>&#39;$guest&#39;</code> with any other names you prefer. Once renamed, you will need to use the new names in your page components or route configurations.</p><h2 id="example-with-custom-middleware-names" tabindex="-1">Example with Custom Middleware Names <a class="header-anchor" href="#example-with-custom-middleware-names" aria-label="Permalink to &quot;Example with Custom Middleware Names&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineNuxtConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    modules: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;nuxt-sanctum-authentication&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    laravelSanctum: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        apiUrl: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://laravel-api.test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        middlewareNames: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            auth: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;authenticated&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Renamed auth middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            guest: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;guestOnly&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Renamed guest middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>Now, to use these custom middleware names in your pages:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">definePageMeta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  middleware: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;authenticated&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Applies the renamed auth middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">definePageMeta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  middleware: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;guestOnly&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Applies the renamed guest middleware</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>By leveraging these middlewares, you can effectively manage user access to different parts of your application, ensuring that only the right users see the right content.</p>`,12),l=[t];function h(p,d,r,k,o,E){return i(),a("div",null,l)}const m=s(n,[["render",h]]);export{g as __pageData,m as default};
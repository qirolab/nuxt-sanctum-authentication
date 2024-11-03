import{_ as s,c as a,o as i,a5 as e}from"./chunks/framework.BmV27xUm.js";const g=JSON.parse('{"title":"useSanctumFetch()","description":"","frontmatter":{},"headers":[],"relativePath":"composables/use-sanctum-fetch.md","filePath":"composables/use-sanctum-fetch.md"}'),t={name:"composables/use-sanctum-fetch.md"},n=e(`<h1 id="usesanctumfetch" tabindex="-1"><code>useSanctumFetch()</code> <a class="header-anchor" href="#usesanctumfetch" aria-label="Permalink to &quot;\`useSanctumFetch()\`&quot;">​</a></h1><p><code>useSanctumFetch()</code> provides a pre-configured <code>ofetch</code> client tailored for use with Laravel Sanctum. This composable simplifies making API requests that require CSRF token management and cookie handling.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li><p><strong>CSRF Token Handling</strong>: <br> The <code>ofetch</code> client provided by <code>useSanctumFetch()</code> automatically manages the CSRF token, ensuring that all requests to your Laravel backend are secure and authenticated.</p></li><li><p><strong>Cookie Management</strong>: <br> The client also handles cookies, particularly the CSRF token cookie, which is necessary for maintaining session security in Laravel.</p></li><li><p><strong>Integration with</strong> <code>useAsyncData()</code>: You can use <code>useSanctumFetch()</code> in combination with Nuxt 3&#39;s <code>useAsyncData()</code> to handle data fetching in a reactive and efficient manner. Example:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">refresh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">clear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useAsyncData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;users&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useSanctumFetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/api/users&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></li><li><p><strong>$Fetch Interface Compatibility</strong>: <br> The client implements the <code>$Fetch</code> interface, meaning you can use it as you would with a regular <code>ofetch</code> client. This provides flexibility in how you structure and make API requests in your application.</p></li></ul><blockquote><p>For more advanced usage, refer to the <a href="https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-create-fetch-with-default-options" target="_blank" rel="noreferrer">ofetch documentation</a>.</p></blockquote><h2 id="base-url-configuration" tabindex="-1">Base URL Configuration <a class="header-anchor" href="#base-url-configuration" aria-label="Permalink to &quot;Base URL Configuration&quot;">​</a></h2><p>All requests made with <code>useSanctumFetch()</code> will be sent to the <code>apiUrl</code> specified in your module&#39;s configuration. This ensures that all API calls are correctly routed to your Laravel backend.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineNuxtConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // nuxt-sanctum-authentication options</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    laravelSanctum: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // Replace with your Laravel API URL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        apiUrl: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://laravel-api.test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>`,8),l=[n];function h(r,o,c,p,k,d){return i(),a("div",null,l)}const E=s(t,[["render",h]]);export{g as __pageData,E as default};
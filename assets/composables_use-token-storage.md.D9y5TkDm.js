import{_ as s,c as a,o as i,a5 as e}from"./chunks/framework.BmV27xUm.js";const g=JSON.parse('{"title":"useTokenStorage()","description":"","frontmatter":{},"headers":[],"relativePath":"composables/use-token-storage.md","filePath":"composables/use-token-storage.md"}'),t={name:"composables/use-token-storage.md"},n=e(`<h1 id="usetokenstorage" tabindex="-1"><code>useTokenStorage()</code> <a class="header-anchor" href="#usetokenstorage" aria-label="Permalink to &quot;\`useTokenStorage()\`&quot;">​</a></h1><p><code>useTokenStorage()</code> is a specialized composable for managing authentication tokens, particularly in applications using token-based authentication (<code>authMode: &#39;token&#39;</code>).</p><h2 id="features" tabindex="-1"><strong>Features</strong> <a class="header-anchor" href="#features" aria-label="Permalink to &quot;**Features**&quot;">​</a></h2><ul><li><p><strong>Set Token</strong>: The composable allows you to store a new authentication token in your application. This is essential for maintaining user sessions in token-based authentication setups.</p><p>Example:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nuxtApp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useNuxtApp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">useTokenStorage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(nuxtApp).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;token-value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></li><li><p><strong>Get Token</strong>: You can also retrieve the stored authentication token, enabling you to include it in API requests or other operations that require the token.</p><p>Example:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nuxtApp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useNuxtApp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> token</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useTokenStorage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(nuxtApp).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div></li></ul>`,4),o=[n];function p(l,h,k,r,c,d){return i(),a("div",null,o)}const E=s(t,[["render",p]]);export{g as __pageData,E as default};
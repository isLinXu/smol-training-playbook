const b="modulepreload",k=function(n){return"./"+n},u={},y=function(m,s,l){let c=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),e=t?.nonce||t?.getAttribute("nonce");c=Promise.allSettled(s.map(r=>{if(r=k(r),r in u)return;u[r]=!0;const o=r.endsWith(".css"),d=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${d}`))return;const i=document.createElement("link");if(i.rel=o?"stylesheet":b,o||(i.as="script"),i.crossOrigin="",i.href=r,e&&i.setAttribute("nonce",e),document.head.appendChild(i),o)return new Promise((p,f)=>{i.addEventListener("load",p),i.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function a(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return c.then(t=>{for(const e of t||[])e.status==="rejected"&&a(e.reason);return m().catch(a)})},g=()=>document.querySelectorAll("pre.mermaid").length>0;g()?(console.log("[astro-mermaid] Mermaid diagrams detected, loading mermaid.js..."),y(()=>import("./mermaid.core.BFahRmTF.js").then(n=>n.bE),[]).then(async({default:n})=>{const m=[];if(m&&m.length>0){console.log("[astro-mermaid] Registering",m.length,"icon packs");const a=m.map(t=>({name:t.name,loader:new Function("return "+t.loader)()}));await n.registerIconPacks(a)}const s={startOnLoad:!1,theme:"neutral"},l={light:"default",dark:"dark"};async function c(){console.log("[astro-mermaid] Initializing mermaid diagrams...");const a=document.querySelectorAll("pre.mermaid");if(console.log("[astro-mermaid] Found",a.length,"mermaid diagrams"),a.length===0)return;let t=s.theme;{const e=document.documentElement.getAttribute("data-theme"),r=document.body.getAttribute("data-theme");t=l[e||r]||s.theme,console.log("[astro-mermaid] Using theme:",t,"from",e?"html":"body")}n.initialize({...s,theme:t,gitGraph:{mainBranchName:"main",showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0}});for(const e of a){if(e.hasAttribute("data-processed"))continue;e.hasAttribute("data-diagram")||e.setAttribute("data-diagram",e.textContent||"");const r=e.getAttribute("data-diagram")||"",o="mermaid-"+Math.random().toString(36).slice(2,11);console.log("[astro-mermaid] Rendering diagram:",o);try{const d=document.getElementById(o);d&&d.remove();const{svg:i}=await n.render(o,r);e.innerHTML=i,e.setAttribute("data-processed","true"),console.log("[astro-mermaid] Successfully rendered diagram:",o)}catch(d){console.error("[astro-mermaid] Mermaid rendering error for diagram:",o,d),e.innerHTML=`<div style="color: red; padding: 1rem; border: 1px solid red; border-radius: 0.5rem;">
            <strong>Error rendering diagram:</strong><br/>
            ${d.message||"Unknown error"}
          </div>`,e.setAttribute("data-processed","true")}}}c();{const a=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="data-theme"&&(document.querySelectorAll("pre.mermaid[data-processed]").forEach(r=>{r.removeAttribute("data-processed")}),c())});a.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),a.observe(document.body,{attributes:!0,attributeFilter:["data-theme"]})}document.addEventListener("astro:after-swap",()=>{g()&&c()})}).catch(n=>{console.error("[astro-mermaid] Failed to load mermaid:",n)})):console.log("[astro-mermaid] No mermaid diagrams found on this page, skipping mermaid.js load");const h=document.createElement("style");h.textContent=`
            /* Prevent layout shifts by setting minimum height */
            pre.mermaid {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2rem 0;
              padding: 1rem;
              background-color: transparent;
              border: none;
              overflow: auto;
              min-height: 200px; /* Prevent layout shift */
              position: relative;
            }
            
            /* Loading state with skeleton loader */
            pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            
            /* Dark mode skeleton loader */
            [data-theme="dark"] pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
              background-size: 200% 100%;
            }
            
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            
            /* Show processed diagrams with smooth transition */
            pre.mermaid[data-processed] {
              animation: none;
              background: transparent;
              min-height: auto; /* Allow natural height after render */
            }
            
            /* Ensure responsive sizing for mermaid SVGs */
            pre.mermaid svg {
              max-width: 100%;
              height: auto;
            }
            
            /* Optional: Add subtle background for better visibility */
            @media (prefers-color-scheme: dark) {
              pre.mermaid[data-processed] {
                background-color: rgba(255, 255, 255, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            @media (prefers-color-scheme: light) {
              pre.mermaid[data-processed] {
                background-color: rgba(0, 0, 0, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            /* Respect user's color scheme preference */
            [data-theme="dark"] pre.mermaid[data-processed] {
              background-color: rgba(255, 255, 255, 0.02);
              border-radius: 0.5rem;
            }
            
            [data-theme="light"] pre.mermaid[data-processed] {
              background-color: rgba(0, 0, 0, 0.02);
              border-radius: 0.5rem;
            }
          `;document.head.appendChild(h);export{y as _};

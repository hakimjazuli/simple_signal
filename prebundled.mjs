class t{static T=t=>new Promise((e=>setTimeout(e,t)));static IA=t=>"AsyncFunction"===t.constructor.name}class e{D;constructor(t,e=!1){this.D=[t,e]}}class s{Q=[];IR=!1;A=t=>{this.P(t),this.IR||this.R()};P=t=>{this.Q.push(t.D)};R=async()=>{for(this.IR=!0;0!==this.Q.length;)for(let e=0;e<this.Q.length;e++){const[s,i]=this.Q[e];if(this.Q.shift(),i&&await t.T(i),t.IA(s)){await s();break}s();break}this.IR=!1}}const i=new class{S=null;QH=new s;D=!1;P="hf_ss-binded_viewport";PX="hf_ss-binded_viewport_on_exit";V="hf_ss-binded_value";LC="hf_ss-binded_lifcycle"};class n{remove$=t=>{this.S=this.S.filter((e=>t.E!==e))};S=[];V_;constructor(t,e=void 0,s=void 0){this.V_=t,e&&new o((async()=>{((t,e,s,n)=>{const o=Array.from(s.querySelectorAll(`[${e}]`));if(s instanceof ShadowRoot||s instanceof Document||!s.hasAttribute(e)||o.push(s),o)for(let s=0;s<o.length;s++){const r=o[s],a=(r.getAttribute(e)??"").split(";");for(let s=0;s<a.length;s++){const o=a[s];try{if(!(o in r))throw"";if(r[o]=t,"value"===o&&"value"in r&&r.parentNode&&!r.hasAttribute(i.V)){r.setAttribute(i.V,"");const t=()=>{n.value=r.value};r.addEventListener("input",t),new MutationObserver(((e,s)=>{for(let i of e)if("childList"===i.type)for(let e=0;e<i.removedNodes.length;e++)if(i.removedNodes[e]===r)return r.removeEventListener("input",t),void s.disconnect()})).observe(r.parentNode,{childList:!0})}}catch(s){if(t=JSON.stringify(t).replace(/^"(.*)"$/,"$1"),""==o)return void console.warn({element:r,attributeName:e,message:"doesn't have target"});r.setAttribute(o,t)}}}})(this.value,e,s??document,this)}))}get value(){return i.S&&!this.S.some((t=>t===i.S))&&this.S.push(i.S),this.V_}set value(t){this.V_!==t&&(this.V_=t,this.S&&i.QH.A(new e((async()=>{await Promise.all(this.S.map((async t=>{try{return await t(!1)}catch(t){throw console.error("Error in callback:",t),t}}))).catch((t=>{console.error("Promise.all failed:",t)}))}),i.D)))}}class o{E;first=!0;constructor(t){this.E=t,i.QH.A(new e((async()=>{i.S=t,await t(this.first),this.first=!1,i.S=null}),i.D))}}const r=new n(""),a=new MutationObserver((t=>{t.forEach((t=>{r.value=t}))}));a.observe(document,{childList:!0,subtree:!0});window.Lifecycle=class{O;ML;constructor(t,e=document){this.AL=t,this.DS=e,e===document?(this.O=a,this.ML=r):(this.ML=new n(""),this.O=new MutationObserver((t=>{t.forEach((t=>{this.ML.value=t}))})),this.O.observe(e,{childList:!0,subtree:!0})),this.$=new o((async t=>{const e=this.ML.value;t?await this.I():await this.CE(e)}))}I=async()=>{for(const t in this.AL){const e=this.AL[t],s=this.DS.querySelector(`[${t}]`);if(!s)return;this.DC[t]=await e(s,this.unObserve)}};DC={};CE=async t=>{if("childList"===t.type)for(const e in this.AL){const s=this.AL[e];for(const i of t.addedNodes)console.log("lifecycleCalls"),(i instanceof HTMLElement||i instanceof Element)&&i.hasAttribute(e)&&!this.DC[e]&&(this.DC[e]=await s(i,this.unObserve));for(const s of t.removedNodes)(s instanceof HTMLElement||s instanceof Element)&&s.hasAttribute(e)&&this.DC[e]&&(console.log("removedNodes"),await this.DC[e](),delete this.DC[e],0===Object.keys(this.DC).length&&this.ML.remove$(this.$))}};unObserve=()=>{if(this.DC){let t=[];for(const e in this.DC)t.push(this.DC[e]);i.QH.A(new e((async()=>{await Promise.all(t.map((async t=>{try{return await t()}catch(t){throw console.error("Error in callback:",t),t}}))).catch((t=>{console.error("Promise.all failed:",t)}))}),i.D)),this.DC={}}this.ML.remove$(this.$),this.DS!==document&&this.O.disconnect()}},window.Let=n,window.Derived=class extends n{constructor(t,e=void 0,s=void 0){super("",e,s),new o((async()=>{super.value=await t()}))}get value(){return super.value}set value(t){console.warn("you are not allowed to change Derived value manually")}},window.Ping=class{constructor(t){this.AC=t,this.ping(!0)}ping=(t=!1)=>{i.QH.A(new e((async()=>{await this.AC(t)}),i.D))}},window.$=o,window.OnViewPort=class{constructor(t,s,n=(async(t,e)=>{e()}),o=document){const r=o.querySelectorAll(`[${t}]`);if(!r)return;const a=new IntersectionObserver(((t,o)=>{i.QH.A(new e((async()=>{for(let e=0;e<t.length;e++){const r=t[e].target;t[e].isIntersecting?(r.setAttribute(i.PX,""),await s(r)):r.hasAttribute(i.PX)&&await n(r,(()=>o.disconnect()))}}),i.D))}),{threshold:[0,0]});for(let t=0;t<r.length;t++){const e=r[t];if(e.hasAttribute(i.P))return;e.setAttribute(i.P,""),a.observe(e)}}};

class t{static T=t=>new Promise((e=>setTimeout(e,t)));static IA=t=>"AsyncFunction"===t.constructor.name}class e{D;constructor(t,e=!1){this.D=[t,e]}}const s={S:null,QH:new class{Q=[];IR=!1;A=t=>{this.P(t),this.IR||this.R()};P=t=>{this.Q.push(t.D)};R=async()=>{for(this.IR=!0;0!==this.Q.length;)for(let e=0;e<this.Q.length;e++){const[s,n]=this.Q[e];if(this.Q.shift(),n&&await t.T(n),t.IA(s)){await s();break}s();break}this.IR=!1}},D:!1,B:"hf_ss:binded_value",E:"hf_ss:binded_event"};class n{S=[];V_;constructor(t,e=void 0,n=document){this.V_=t,e&&new o((async()=>{((t,e,n,o)=>{const r=Array.from(n.querySelectorAll(`[${e}]`));if(n instanceof ShadowRoot||n instanceof Document||!n.hasAttribute(e)||r.push(n),r)for(let n=0;n<r.length;n++){const i=r[n];t=JSON.stringify(t).replace(/^"(.*)"$/,"$1");const c=(i.getAttribute(e)??"").split(";");for(let e=0;e<c.length;e++){const n=c[e];try{if(!(n in i))throw"";if(i[n]=t,"value"===n&&"value"in i&&i.parentNode&&!i.hasAttribute(s.B)){i.setAttribute(s.B,"");const t=()=>{o.value=i.value};i.addEventListener("input",t),new MutationObserver(((e,s)=>{for(let n of e)if("childList"===n.type)for(let e of n.removedNodes)if(e===i)return i.removeEventListener("input",t),void s.disconnect()})).observe(i.parentNode,{childList:!0})}}catch(e){i.setAttribute(n,t)}}}})(this.value,e,n,this)}))}get value(){return s.S&&!this.S.some((t=>t===s.S))&&this.S.push(s.S),this.V_}set value(t){this.V_!==t&&(this.V_=t,this.S&&s.QH.A(new e((async()=>{await Promise.all(this.S.map((async t=>{try{return await t()}catch(t){throw console.error("Error in callback:",t),t}}))).catch((t=>{console.error("Promise.all failed:",t)}))}),s.D)))}}class o{constructor(t){s.QH.A(new e((async()=>{s.S=t,await t(),s.S=null}),s.D))}}window.Lifecycle=class{constructor(t,n,o=document){const r=`[${t}]`,i=()=>{const i=Array.from(o.querySelectorAll(r));if(o instanceof ShadowRoot||o instanceof Document||!o.hasAttribute(t)||i.push(o),i)for(let t=0;t<i.length;t++){const o=i[t];o.hasAttribute(s.E)||(o.setAttribute(s.E,""),s.QH.A(new e((async()=>{if(!o.parentNode)return;const t=await n(o);new MutationObserver(((n,r)=>{for(let i of n)if("childList"===i.type)for(let n of i.removedNodes)if(n===o)return void s.QH.A(new e((async()=>{await t(),r.disconnect()})))})).observe(o.parentNode,{childList:!0})}))))}};new MutationObserver(((t,e)=>{for(let e of t)"childList"===e.type&&i()})).observe(o,{childList:!0,subtree:!0}),i()}},window.Let=n,window.Derived=class extends n{constructor(t,e=void 0,s=document){super("",e,s),new o((async()=>{super.value=await t()}))}get value(){return super.value}set value(t){console.log("you are not allowed to change derived value manually")}},window.$=o,window.OnViewPort=class{constructor(t,n,o=document){this.OnViewCallback=n;const r=`[${t}]`,i=o.querySelectorAll(r);i&&i.forEach((t=>{(t=>{let n=null;const o=new IntersectionObserver((r=>{const i=()=>o.disconnect();s.QH.A(new e((async()=>{for(let e=0;e<r.length;e++){const s=r[e];s.isIntersecting?n=await t(s,i):n&&(await n(),n=null)}})))}),{threshold:[0,1]});return o})(n).observe(t)}))}};

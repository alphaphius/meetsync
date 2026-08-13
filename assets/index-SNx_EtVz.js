const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./exporter-D0ysRip3.js","./rolldown-runtime-hePW80VL.js"])))=>i.map(i=>d[i]);
import{n as e,r as t}from"./rolldown-runtime-hePW80VL.js";import{i as n}from"./exporter-D0ysRip3.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var r=`true`,i=`false`,a=r===`true`,o=i===`true`;function s(e={}){let{immediate:t=!1,onNeedReload:r,onNeedRefresh:i,onOfflineReady:s,onRegistered:c,onRegisteredSW:l,onRegisterError:u}=e,d,f,p,m=async(e=!0)=>{await f,a||p==null||p()};async function h(){if(`serviceWorker`in navigator){if(d=await n(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-zd_v-k4h.js`);return{Workbox:e}},[],import.meta.url).then(({Workbox:e})=>new e(`./sw.js`,{scope:`./`,type:`classic`})).catch(e=>{u==null||u(e)}),!d)return;if(p=()=>{d==null||d.messageSkipWaiting()},!o){if(a)d.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(r?r():window.location.reload())}),d.addEventListener(`installed`,e=>{e.isUpdate||s==null||s()});else{let e=!1,t=()=>{e=!0,d==null||d.addEventListener(`controlling`,e=>{e.isUpdate&&(r?r():window.location.reload())}),i==null||i()};d.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&(s==null||s()):n.isExternal?t():!e&&(s==null||s()):n.isUpdate||s==null||s()}),d.addEventListener(`waiting`,t)}}d.register({immediate:t}).then(e=>{l?l(`./sw.js`,e):c==null||c(e)}).catch(e=>{u==null||u(e)})}}return f=h(),m}function c(e=`id`){return e+`_`+Date.now().toString(36)+`_`+Math.random().toString(36).slice(2,8)}function l(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}function u(e){return String(e==null?``:e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function d(e){let t=document.createElement(`div`);return t.innerHTML=String(e==null?``:e),t.querySelectorAll(`script, iframe, object, embed, style, link, meta`).forEach(e=>e.remove()),t.querySelectorAll(`*`).forEach(e=>{[...e.attributes].forEach(t=>{t.name.toLowerCase().startsWith(`on`)&&e.removeAttribute(t.name),/^(href|src)$/i.test(t.name)&&/^\s*javascript:/i.test(t.value)&&e.removeAttribute(t.name)})}),t.innerHTML}function f(){return new Date().toISOString()}function p(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function m(e){if(!e)return``;let t=new Date(e.length===10?e+`T00:00:00`:e);return isNaN(t)?e:t.toLocaleDateString(`th-TH`,{day:`numeric`,month:`short`,year:`numeric`})}function h(e){return e||``}function g(e,t){let n=[m(e)];return t&&n.push(t),n.join(` · `)}function _(e){if(!e)return``;let t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return`just now`;if(n<60)return`${n}m ago`;let r=Math.floor(n/60);if(r<24)return`${r}h ago`;let i=Math.floor(r/24);return i<7?`${i}d ago`:m(e.slice(0,10))}var v={high:{label:`High`,tone:`error`,bar:`bg-error`,badge:`bg-error-container text-on-error-container border border-error/20`,dot:`bg-error`},medium:{label:`Medium`,tone:`tertiary`,bar:`bg-tertiary-container`,badge:`bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20`,dot:`bg-tertiary-container`},low:{label:`Low`,tone:`secondary`,bar:`bg-secondary`,badge:`bg-secondary-fixed text-on-secondary-fixed border border-secondary/20`,dot:`bg-secondary`}};function y(e){return String(e||`?`).trim().split(/\s+/).slice(0,2).map(e=>e[0]).join(``).toUpperCase()}function b(){return navigator.onLine!==!1}var x=null,S=null;function C(e,t=``){return`<span class="material-symbols-outlined ${t}" aria-hidden="true">${e}</span>`}var w={show(e,t=`info`,n=3200){x||(x=document.createElement(`div`),x.className=`fixed left-1/2 -translate-x-1/2 z-[120] flex flex-col items-center gap-2 px-4 w-full max-w-md pointer-events-none`,x.style.bottom=`calc(88px + env(safe-area-inset-bottom, 0px))`,document.body.appendChild(x));let r=document.createElement(`div`),i={info:`bg-inverse-surface text-inverse-on-surface`,success:`bg-primary text-on-primary`,error:`bg-error text-on-error`,warn:`bg-tertiary-container text-on-tertiary-container`};r.className=`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-cardlg ${i[t]||i.info} fade-anim max-w-full`,r.innerHTML=`${C({info:`info`,success:`check_circle`,error:`error`,warn:`warning`}[t]||`info`,`text-[18px] shrink-0`)}<span class="text-sm font-medium leading-tight break-words">${u(e)}</span>`,x.appendChild(r),setTimeout(()=>{r.style.transition=`opacity .3s ease, transform .3s ease`,r.style.opacity=`0`,r.style.transform=`translateY(8px)`,setTimeout(()=>r.remove(),300)},n)}};function T(){return S||(S=document.createElement(`div`),S.id=`modal-root`,document.body.appendChild(S),S)}function ee(e){let t=T(),n=document.createElement(`div`);n.className=`fixed inset-0 z-[110] flex items-center justify-center p-4`,n.style.background=`rgba(0,0,0,.45)`,n.style.backdropFilter=`blur(4px)`,n.innerHTML=e,t.appendChild(n);let r=e=>{n.style.opacity=`0`,n.style.transition=`opacity .2s ease`,setTimeout(()=>n.remove(),200),n._resolve&&n._resolve(e)};return n._close=r,n.addEventListener(`click`,e=>{e.target===n&&r(null)}),n}var te={confirm({title:e,message:t,confirmText:n=`Confirm`,cancelText:r=`Cancel`,danger:i=!1,pin:a=null}){return new Promise(o=>{let s=ee(`
        <div class="card p-6 w-full max-w-sm fade-anim scale-in-anim" role="dialog" aria-modal="true" aria-label="${u(e)}">
          <div class="flex items-center gap-3 mb-3 ${i?`text-error`:`text-primary`}">
            ${C(i?`lock`:`help`,`text-[22px]`)}
            <h3 class="text-lg font-semibold text-on-surface">${u(e)}</h3>
          </div>
          <p class="text-sm text-on-surface-variant mb-4 leading-relaxed">${u(t)}</p>
          ${a?`
          <input type="password" inputmode="numeric" maxlength="6" placeholder="Security PIN"
            class="input mb-1 text-center text-xl tracking-[0.5em]" data-pin />
          <p class="text-xs text-on-surface-variant mb-3">Enter your security PIN to continue.</p>`:``}
          <div class="flex gap-3 mt-4">
            <button class="btn btn-outline flex-1" data-act="cancel">${u(r)}</button>
            <button class="btn ${i?`btn-danger`:`btn-primary`} flex-1" data-act="ok">${u(n)}</button>
          </div>
        </div>`);s._resolve=e=>o(e),s.querySelector(`[data-act="cancel"]`).addEventListener(`click`,()=>s._close(null)),s.querySelector(`[data-act="ok"]`).addEventListener(`click`,()=>{let e=a?(s.querySelector(`[data-pin]`).value||``).trim():null;s._close(e)});let c=s.querySelector(`[data-pin]`);c&&c.focus()})},dismiss(){S&&S.childNodes.forEach(e=>e._close&&e._close(null))}};function ne(e){let t=v[e]||v.medium;return`<span class="badge ${t.badge}">${t.label} Priority</span>`}function E(e,t=8,n=3){let r=Array.isArray(e)?e:[],i=r.slice(0,n),a=r.length-i.length,o=`<div class="flex -space-x-2">`;return i.forEach(e=>{e.avatar?o+=`<img class="w-${t} h-${t} rounded-full border-2 border-surface-container-lowest object-cover" loading="lazy" decoding="async"
        src="${u(e.avatar)}" alt="${u(e.name||``)}" />`:o+=`<div class="w-${t} h-${t} rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-semibold text-on-surface-variant">${u(y(e.name))}</div>`}),a>0&&(o+=`<div class="w-${t} h-${t} rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center text-[10px] font-semibold text-on-surface-variant">+${a}</div>`),o+=`</div>`,o}function D({icon:e=`inbox`,title:t,message:n,action:r}){return`
    <div class="flex flex-col items-center justify-center text-center py-12 px-6 fade-anim">
      <div class="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
        ${C(e,`text-[32px]`)}
      </div>
      <h3 class="text-base font-semibold text-on-surface mb-1">${u(t)}</h3>
      <p class="text-sm text-on-surface-variant max-w-xs mb-5">${u(n)}</p>
      ${r||``}
    </div>`}function O(e=120){return`<div class="skeleton w-full" style="height:${e}px"></div>`}var k=`ms.store.v1`,A={projects:[],meetings:[],contacts:[],groups:[],settings:{theme:`light`,accent:`primary`,deletePin:`0000`,userName:``,userAvatar:``},lastSync:null,serverTime:null,status:`idle`},j=ie(),re=new Set;function ie(){try{let e=localStorage.getItem(k);return e?{...structuredClone(A),...JSON.parse(e)}:structuredClone(A)}catch(e){return structuredClone(A)}}function M(){try{localStorage.setItem(k,JSON.stringify(j))}catch(e){try{j.meetings.forEach(e=>{e.attachments=(e.attachments||[]).map(e=>({...e,preview:void 0}))}),localStorage.setItem(k,JSON.stringify(j))}catch(e){}}}var N={get:()=>j,subscribe(e){return re.add(e),()=>re.delete(e)},emit(){re.forEach(e=>e(j))},set(e){j={...j,...e},M(),this.emit()},setSettings(e){j.settings={...j.settings,...e},M(),this.emit()},reset(){j=structuredClone(A),M(),this.emit()},hydrate(e){var t,n,r,i,a;j={...j,projects:(t=e.projects)==null?j.projects:t,meetings:(n=e.meetings)==null?j.meetings:n,contacts:(r=e.contacts)==null?j.contacts:r,groups:(i=e.groups)==null?j.groups:i,serverTime:(a=e.serverTime)==null?null:a,status:`online`},M(),this.emit()},upsertMeeting(e){let t=j.meetings.findIndex(t=>t.id===e.id);t>=0?j.meetings[t]={...j.meetings[t],...e}:j.meetings.unshift(e),M(),this.emit()},upsertProject(e){let t=j.projects.findIndex(t=>t.id===e.id);t>=0?j.projects[t]={...j.projects[t],...e}:j.projects.push(e),M(),this.emit()},removeMeeting(e){j.meetings=j.meetings.filter(t=>t.id!==e),M(),this.emit()},removeProject(e){j.projects=j.projects.filter(t=>t.id!==e),j.meetings=j.meetings.filter(t=>t.projectId!==e),M(),this.emit()},meeting(e){return j.meetings.find(t=>t.id===e)},project(e){return j.projects.find(t=>t.id===e)},meetingsForProject(e){return j.meetings.filter(t=>t.projectId===e).sort((e,t)=>String(t.date+` `+t.time).localeCompare(String(e.date+` `+e.time)))}};function ae(){j.lastSync=f(),M(),N.emit()}var oe=`ms.execUrl`;function se(){return localStorage.getItem(oe)||`https://script.google.com/macros/s/AKfycby0yBQsZ9asgmGNUbeOLz0y5GhXTRpMFSdP0WB_Cef-MLO6o0ZkgtmR2892bxgwXd7Y/exec`}function ce(e){localStorage.setItem(oe,e.trim())}var le=(e,t=480)=>`https://drive.google.com/thumbnail?id=${encodeURIComponent(e)}&sz=w${t}`,ue=e=>`https://drive.google.com/uc?export=view&id=${encodeURIComponent(e)}`,de=e({ApiError:()=>P,api:()=>I,request:()=>F}),fe=2e4;async function pe(e,t,n=fe){let r=new AbortController,i=setTimeout(()=>r.abort(),n);try{return await fetch(e,{...t,signal:r.signal,redirect:`follow`})}finally{clearTimeout(i)}}var P=class extends Error{constructor(e,t=0){super(e),this.status=t}};async function F(e,{method:t=`GET`,payload:n,timeout:r}={}){let i=`${se()}?action=${encodeURIComponent(e)}`;t===`GET`&&(i+=`&r=${Date.now()}`);let a;try{a=await pe(i,{method:t,headers:t===`POST`?{"Content-Type":`text/plain;charset=utf-8`}:void 0,body:t===`POST`?JSON.stringify(n==null?{}:n):void 0},r)}catch(e){throw e.name===`AbortError`?new P(`Request timed out. Check your connection.`,0):new P(`Network error. You may be offline.`,0)}let o;try{o=await a.json()}catch(e){throw new P(`Server returned an invalid response (${a.status}).`)}if(o&&o.ok===!1)throw new P(o.error||`Server error`,a.status);return o}var I={ping(){return F(`ping`,{timeout:12e3})},getDashboard(){return F(`getDashboard`)},getProjects(){return F(`getProjects`)},getMeetings(e){return F(`getMeetings`,{payload:{projectId:e},method:`POST`})},getContacts(){return F(`getContacts`)},getGroups(){return F(`getGroups`)},getSettings(){return F(`getSettings`)},getExports(){return F(`getExports`)},saveProject(e){return F(`saveProject`,{method:`POST`,payload:{project:e}})},saveMeeting(e){return F(`saveMeeting`,{method:`POST`,payload:{meeting:e}})},deleteMeeting(e,t){return F(`deleteMeeting`,{method:`POST`,payload:{id:e,pin:t}})},deleteProject(e,t){return F(`deleteProject`,{method:`POST`,payload:{id:e,pin:t}})},saveContacts(e){return F(`saveContacts`,{method:`POST`,payload:{contacts:e}})},saveGroups(e){return F(`saveGroups`,{method:`POST`,payload:{groups:e}})},saveSettings(e){return F(`saveSettings`,{method:`POST`,payload:{settings:e}})},saveExport(e){return F(`saveExport`,{method:`POST`,payload:{export:e}})},uploadImage(e){return F(`uploadImage`,{method:`POST`,payload:{name:e.name,mime:e.mime,data:e.data},timeout:6e4})}},me=`ms.queue.v2`;function he(){try{return JSON.parse(localStorage.getItem(me))||[]}catch(e){return[]}}function L(){try{localStorage.setItem(me,JSON.stringify(R))}catch(e){}}var R=he(),ge=new Set,z=!1,B=b();function V(){ge.forEach(e=>e({ops:R,online:B,pending:_e()}))}function _e(){return R.filter(e=>e.status===`pending`||e.status===`running`).length}var H={subscribe(e){return ge.add(e),()=>ge.delete(e)},getOps:()=>R,pendingCount:_e,isOnline:()=>B,enqueue(e){R.push({id:c(`op`),status:`pending`,attempts:0,createdAt:f(),...e}),L(),V(),z||U()},enqueueMeetingSave(e){this.enqueue({type:`saveMeeting`,payload:{meeting:e}})},enqueueProjectSave(e){this.enqueue({type:`saveProject`,payload:{project:e}})},enqueueMeetingDelete(e,t){this.enqueue({type:`deleteMeeting`,payload:{id:e,pin:t}})},enqueueProjectDelete(e,t){this.enqueue({type:`deleteProject`,payload:{id:e,pin:t}})},enqueueSettingsSave(e){this.enqueue({type:`saveSettings`,payload:{settings:e}})},enqueueContactsSave(e){this.enqueue({type:`saveContacts`,payload:{contacts:e}})},clearErrors(){R=R.filter(e=>e.status!==`error`),L(),V()},retryFailed(){R.forEach(e=>{e.status===`error`&&(e.status=`pending`,e.attempts=0)}),L(),V(),z||U()}};async function U(){if(z||R.length===0)return;z=!0,B=b();let e=0;for(;e++<50;){let e=R.find(e=>e.status===`pending`);if(!e)break;e.status=`running`,e.attempts+=1,L(),V();try{await ve(e),R=R.filter(t=>t.id!==e.id),L(),e.type,ae()}catch(t){e.status=`error`,e.error=String(t.message||t),L()}V()}z=!1}async function ve(e){switch(e.type){case`saveMeeting`:{let t={...e.payload.meeting},n=t.attachments||[],r=[];for(let e of n)if(e.data){let t=await I.uploadImage({name:e.name,mime:e.mime,data:e.data});r.push({fileId:t.id,name:e.name,mime:e.mime,size:e.size,url:t.url})}else r.push(e);t.attachments=r;let i=await I.saveMeeting(t);i&&i.meeting&&N.upsertMeeting(i.meeting);break}case`saveProject`:{let t=await I.saveProject(e.payload.project);t&&t.project&&N.upsertProject(t.project);break}case`deleteMeeting`:{let t=await I.deleteMeeting(e.payload.id,e.payload.pin);t&&t.ok&&N.removeMeeting(e.payload.id);break}case`deleteProject`:{let t=await I.deleteProject(e.payload.id,e.payload.pin);t&&t.ok&&N.removeProject(e.payload.id);break}case`saveSettings`:await I.saveSettings(e.payload.settings);break;case`saveContacts`:await I.saveContacts(e.payload.contacts);break;case`saveGroups`:await I.saveGroups(e.payload.groups);break;case`saveExport`:await I.saveExport(e.payload.exp);break;default:throw Error(`Unknown op type: ${e.type}`)}}window.addEventListener(`online`,()=>{B=!0,V(),U()}),window.addEventListener(`offline`,()=>{B=!1,V()});function ye(){z||U()}function W({title:e,left:t,right:n}){return`
    <header class="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-outline-variant/40 px-4"
      style="padding-top:env(safe-area-inset-top,0px)">
      <div class="max-w-[1200px] mx-auto flex items-center justify-between h-14">
        <div class="flex items-center gap-2 min-w-0">
          ${t||``}
          <h1 class="text-lg font-bold text-on-surface tracking-tight truncate">${u(e)}</h1>
        </div>
        <div class="flex items-center gap-1 shrink-0">${n||``}</div>
      </div>
    </header>`}function G(e=`Back`){return`<button class="icon-btn -ml-2" data-back aria-label="${u(e)}">${C(`arrow_back`)}</button>`}function be(e,t){return e?`<button class="w-9 h-9 rounded-full overflow-hidden border border-outline-variant shrink-0" data-avatar aria-label="Profile">
      <img src="${u(e)}" alt="${u(t||`Profile`)}" class="w-full h-full object-cover" loading="lazy" decoding="async" /></button>`:`<button class="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-bold shrink-0" data-avatar aria-label="Profile">${u((t||`M`)[0].toUpperCase())}</button>`}var xe=[{key:`home`,label:`Home`,icon:`home`,href:`#/`},{key:`planner`,label:`Planner`,icon:`calendar_today`,href:`#/planner`},{key:`projects`,label:`Projects`,icon:`folder`,href:`#/projects`},{key:`export`,label:`Export`,icon:`ios_share`,href:`#/export`},{key:`settings`,label:`Settings`,icon:`settings`,href:`#/settings`}];function K(e=`home`){return`
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant/50 flex justify-around items-center px-1 pt-1"
      style="padding-bottom:env(safe-area-inset-bottom,0px)">
      ${xe.map(t=>`
        <a href="${t.href}" class="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${e===t.key?`text-primary`:`text-on-surface-variant hover:bg-surface-container-high`}">
          <span class="material-symbols-outlined text-[22px] ${e===t.key?`font-bold`:``}" style="${e===t.key?`font-variation-settings:'FILL' 1`:``}">${t.icon}</span>
          <span class="text-[10px] font-medium ${e===t.key?`font-bold`:``}">${t.label}</span>
        </a>`).join(``)}
    </nav>`}function Se(e,t=`Add`){return`<a href="${e}" class="fab bottom-6 right-6 md:bottom-8 md:right-8" aria-label="${t}">${C(`add`,`text-[26px]`)}</a>`}function Ce(){let e=document.createElement(`div`);e.id=`sync-indicator`,e.className=`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none opacity-0`,e.style.bottom=`calc(76px + env(safe-area-inset-bottom, 0px))`,e.style.transform=`translate(-50%, 8px)`,e.style.display=`none`,document.body.appendChild(e);let t=0,n=0;function r(){let r=H.getOps(),a=r.filter(e=>e.status===`pending`||e.status===`running`).length,o=r.filter(e=>e.status===`error`).length,s=!H.isOnline(),c=n>0&&a===0&&o===0;n=a;let l=``;if(a>0)l=`<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-inverse-surface text-inverse-on-surface shadow-cardlg">
        <svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        <span class="text-xs font-semibold">${a} item${a>1?`s`:``} syncing…</span></span>`;else if(c){t=Date.now(),l=`<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-on-primary shadow-cardlg">
        ${C(`check_circle`,`text-[16px]`)}<span class="text-xs font-semibold">All saved</span></span>`,e.style.display=`flex`,e.style.opacity=`1`,e.style.transform=`translate(-50%, 0)`,setTimeout(()=>{Date.now()-t>=1900&&i()},2e3);return}else if(o>0)l=`<button data-retry class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-error text-on-error shadow-cardlg pointer-events-auto">
        ${C(`sync_problem`,`text-[16px]`)}<span class="text-xs font-semibold">${o} failed · Retry</span></button>`;else if(s)l=`<span class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-tertiary-container text-on-tertiary-container shadow-cardlg">
        ${C(`cloud_off`,`text-[16px]`)}<span class="text-xs font-semibold">Offline</span></span>`;else{e.style.opacity=`0`,e.style.transform=`translate(-50%, 8px)`,setTimeout(()=>{!H.pendingCount()&&!H.getOps().some(e=>e.status===`error`)&&(e.style.display=`none`)},300);return}e.innerHTML=l,e.style.display=`flex`,e.style.opacity=`1`,e.style.transform=`translate(-50%, 0)`}function i(){e.style.opacity=`0`,e.style.transform=`translate(-50%, 8px)`,setTimeout(()=>{e.style.display=`none`},300)}e.addEventListener(`click`,e=>{e.target.closest(`[data-retry]`)&&H.retryFailed()}),H.subscribe(r),N.subscribe(r),r()}function we(e){let t=e.color===`secondary`?`bg-secondary-fixed text-on-secondary-fixed`:e.color===`tertiary`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-primary-fixed text-on-primary-fixed`,n=e.color===`secondary`?`bg-secondary`:e.color===`tertiary`?`bg-tertiary`:`bg-primary`,r=Math.max(0,Math.min(100,Number(e.progress)||0));return`
    <a href="#/projects/${encodeURIComponent(e.id)}" class="min-w-[270px] max-w-[300px] bg-surface-container-lowest rounded-2xl p-4 shadow-card border border-outline-variant/30 flex-shrink-0 hover:shadow-cardlg transition-all group">
      <div class="flex justify-between items-start mb-3">
        <div class="w-10 h-10 rounded-xl ${t} flex items-center justify-center">
          ${C(e.icon||`folder`,`text-[20px]`)}
        </div>
        <span class="chip text-[10px]">${u(e.category||`General`)}</span>
      </div>
      <h3 class="text-base font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">${u(e.name||`Untitled`)}</h3>
      <p class="text-[13px] text-on-surface-variant line-clamp-2 mb-3 min-h-[36px]">${u(e.description||`No description yet.`)}</p>
      <div class="flex items-center gap-2">
        <div class="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
          <div class="${n} h-full rounded-full" style="width:${r}%"></div>
        </div>
        <span class="text-[11px] font-semibold text-on-surface-variant">${r}%</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <span class="text-[11px] text-outline">${e.meetingsCount||0} meetings</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">${C(`arrow_forward`,`text-[16px]`)}</span>
      </div>
    </a>`}function Te(e,t={}){var n,r,i;let a=((n=v[e.priority])==null?void 0:n.bar)||v.medium.bar,o=(r=t.projectName)==null?e.projectId?(i=N.project(e.projectId))==null?void 0:i.name:null:r,s=g(e.date,e.time);return`
    <a href="#/meetings/${encodeURIComponent(e.id)}" class="card relative overflow-hidden flex p-4 pl-5 hover:shadow-cardlg transition-all" data-meeting="${u(e.id)}">
      <div class="absolute left-0 top-0 bottom-0 w-1.5 ${a}"></div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start gap-2 mb-1.5">
          ${ne(e.priority)}
          <span class="text-[13px] text-on-surface-variant shrink-0">${u(s)}</span>
        </div>
        <h3 class="text-[15px] font-semibold text-on-surface mb-0.5 leading-snug">${u(e.title||`Untitled meeting`)}</h3>
        <p class="text-[13px] text-on-surface-variant truncate mb-2.5">${u(o||`No project`)}</p>
        <div class="flex items-center gap-2">
          ${E(e.participants,8,3)}
          ${t.attachments&&(e.attachments||[]).length?`<span class="text-on-surface-variant flex items-center gap-0.5 text-[12px] ml-1">${C(`image`,`text-[16px]`)}${e.attachments.length}</span>`:``}
        </div>
      </div>
    </a>`}function Ee(e){var t,n,r;let i=((t=v[e.priority])==null?void 0:t.badge)||v.medium.badge;return`
    <a href="#/meetings/${encodeURIComponent(e.id)}" class="card p-4 flex flex-col gap-3 hover:shadow-cardlg transition-all group relative overflow-hidden">
      <div class="absolute left-0 top-0 bottom-0 w-1 ${((n=v[e.priority])==null?void 0:n.bar)||`bg-secondary`}"></div>
      <div class="flex justify-between items-start pl-2">
        <span class="badge ${i}">${u(((r=v[e.priority])==null?void 0:r.label)||`Medium`)} Priority</span>
        ${(e.attachments||[]).length?`<span class="text-outline-variant">${C(`attachment`,`text-[18px]`)}</span>`:``}
      </div>
      <div class="pl-2">
        <h3 class="text-[15px] font-semibold text-on-surface leading-snug mb-1">${u(e.title||`Untitled meeting`)}</h3>
        <div class="flex items-center gap-1 text-[13px] text-on-surface-variant">
          ${C(`event`,`text-[15px]`)}<span>${u(g(e.date,e.time))}</span>
        </div>
      </div>
      <div class="pt-3 border-t border-surface-variant flex items-center justify-between pl-2">
        ${E(e.participants,8,3)}
        <span class="text-primary text-[13px] font-medium">View Details ${C(`chevron_right`,`text-[16px]`)}</span>
      </div>
    </a>`}var De={id:`dashboard`,title:`Home`,render(){let e=N.get(),t=e.settings.userName||`Guest`,n=e.settings.userAvatar;return`
      ${W({title:`MeetSync`,left:be(n,t),right:`<button class="icon-btn relative" data-notif aria-label="Notifications">${C(`notifications`)}
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error hidden" data-notif-dot></span></button>`})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12">
        <div class="mt-4 md:mt-6 relative">
          ${C(`search`,`absolute left-4 top-1/2 -translate-y-1/2 text-outline`)}
          <input data-search class="input pl-12 py-3 text-[15px]" placeholder="Search meetings, projects…" aria-label="Search" />
        </div>

        <section class="mt-6" data-projects>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-on-surface">Active Projects</h2>
            <a href="#/projects" class="text-sm font-medium text-primary">View all</a>
          </div>
          <div data-projects-body></div>
        </section>

        <section class="mt-8" data-meetings>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-on-surface">Recent Meetings</h2>
            <a href="#/planner" class="text-sm font-medium text-primary">View all</a>
          </div>
          <div data-meetings-body class="flex flex-col gap-3"></div>
        </section>
      </main>
      ${Se(`#/meetings/new`)}
      ${K(`home`)}`},mount(e){var t,n;let r=e.root;function i(e=``){let t=r.querySelector(`[data-projects-body]`),n=N.get(),i=e.trim().toLowerCase(),a=n.projects.filter(e=>e.status===`active`||!e.status).filter(e=>!i||(e.name+` `+e.description+` `+e.category).toLowerCase().includes(i)).slice(0,8);if(n.status===`loading`&&!n.projects.length){t.innerHTML=`<div class="flex gap-4 overflow-x-auto hide-scrollbar">${O(180)+O(180)+O(180)}</div>`;return}if(!a.length){t.innerHTML=D({icon:`folder_open`,title:`No projects yet`,message:`Create your first project to organize meetings.`,action:`<a href="#/meetings/new" class="btn btn-primary">New summary</a>`});return}t.innerHTML=`<div class="flex gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">${a.map(we).join(``)}</div>`}function a(e=``){let t=r.querySelector(`[data-meetings-body]`),n=N.get(),i=e.trim().toLowerCase(),a=n.meetings.filter(e=>!i||(e.title+` `+(e.summary||``)).toLowerCase().includes(i)).slice(0,8);if(n.status===`loading`&&!n.meetings.length){t.innerHTML=O(100)+O(100)+O(100);return}if(!a.length){t.innerHTML=D({icon:`event_note`,title:`No meetings yet`,message:`Tap + to write your first meeting summary. It will be saved to Google Sheets in the background.`,action:`<button class="btn btn-primary" data-new>New summary</button>`});return}t.innerHTML=a.map(e=>Te(e,{projectName:!0})).join(``)}function o(e){i(e),a(e)}let s=r.querySelector(`[data-search]`),c=l(e=>o(e.target.value),180);s.addEventListener(`input`,c),(t=r.querySelector(`[data-new]`))==null||t.addEventListener(`click`,()=>Q(`/meetings/new`)),r.querySelector(`[data-notif]`).addEventListener(`click`,()=>w.show(`No new notifications.`,`info`)),(n=r.querySelector(`[data-avatar]`))==null||n.addEventListener(`click`,()=>Q(`/settings`)),i(),a();let u=N.subscribe(()=>{s.value.trim()||(i(),a())});return()=>{u()}}},Oe=`ms.draft.v1`,ke={id:`editor`,title:`Editor`,render(e){let t=!!e.params.id,n=t?N.meeting(e.params.id):null;if(t&&!n)return`
        ${W({title:`Meeting`,left:G()})}
        <main class="max-w-[1200px] mx-auto px-4">${D({icon:`search_off`,title:`Meeting not found`,message:`This meeting may have been deleted.`,action:`<a href="#/" class="btn btn-primary">Back home</a>`})}</main>`;this._draft=Ae();let r=!t&&this._draft?this._draft:null,i=t?n.title||``:(r==null?void 0:r.title)||``,a=t?n.projectId||``:(r==null?void 0:r.projectId)||``,o=t?n.priority||`medium`:(r==null?void 0:r.priority)||`medium`,s=t?n.date||``:(r==null?void 0:r.date)||p(),c=t?n.time||``:(r==null?void 0:r.time)||`09:00`;t?n.participants:r!=null&&r.participants;let l=t?n.attachments||[]:(r==null?void 0:r.attachments)||[];return t?n.summary:r!=null&&r.summary,`
      ${W({title:t?`Edit Meeting`:`New Summary`,left:G(),right:`<button class="btn btn-primary h-10 px-4" data-save>
          ${C(`save`,`text-[18px]`)}<span class="hidden sm:inline">Save</span></button>`})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-32 md:pb-16 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          <!-- Metadata -->
          <div class="md:col-span-4 flex flex-col gap-4">
            <div class="card p-4 flex flex-col gap-4">
              <div>
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Meeting Title</label>
                <input data-title class="input" placeholder="e.g. Q3 Roadmap Review" value="${u(i)}" maxlength="120" />
              </div>
              <div>
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Project</label>
                <div class="relative">
                  <select data-project class="input appearance-none pr-9">
                    <option value="">Select a project…</option>
                    ${N.get().projects.map(e=>`<option value="${u(e.id)}" ${e.id===a?`selected`:``}>${u(e.name)}</option>`).join(``)}
                    <option value="__new__">＋ New project…</option>
                  </select>
                  ${C(`arrow_drop_down`,`absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none`)}
                </div>
              </div>
            </div>

            <div class="card p-4">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-2 block">Priority</label>
              <div class="flex bg-surface-container rounded-xl p-1" data-priority>
                ${Object.entries(v).map(([e,t])=>`
                  <button data-val="${e}" class="flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all
                    ${o===e?e===`high`?`bg-error-container text-on-error-container`:e===`medium`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-secondary-fixed text-on-secondary-fixed`:`text-on-surface-variant hover:bg-surface-variant`}">${t.label}</button>`).join(``)}
              </div>
            </div>

            <div class="card p-4 flex flex-col gap-3">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Participants</label>
              <div class="relative">
                ${C(`search`,`absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]`)}
                <input data-participant class="input pl-9 py-2 text-[13px]" placeholder="Add names or emails…" autocomplete="off" />
              </div>
              <div data-participants class="flex flex-wrap gap-1.5 min-h-[28px]"></div>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  ${C(`calendar_today`,`absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]`)}
                  <input data-date type="date" value="${u(s)}" class="input pl-9 py-2 text-[13px]" />
                </div>
                <div class="relative flex-1">
                  ${C(`schedule`,`absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]`)}
                  <input data-time type="time" value="${u(c)}" class="input pl-9 py-2 text-[13px]" />
                </div>
              </div>
            </div>

            ${t?`<div class="card p-4 border-error/30">
              <button data-delete class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-error hover:bg-error-container/40 transition-colors text-sm font-semibold">
                ${C(`delete`,`text-[18px]`)} Delete meeting</button>
            </div>`:``}
          </div>

          <!-- Content -->
          <div class="md:col-span-8 flex flex-col gap-4">
            <div class="card p-4 flex flex-col min-h-[320px]">
              <div class="flex items-center justify-between border-b border-surface-variant pb-2.5 mb-2.5">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  ${C(`description`,`text-[16px]`)} Meeting Summary & Details</label>
              </div>
              <div class="flex items-center gap-0.5 text-on-surface-variant overflow-x-auto hide-scrollbar pb-1" data-toolbar>
                ${[[`bold`,`format_bold`,`Bold`],[`italic`,`format_italic`,`Italic`],[`underline`,`format_underlined`,`Underline`],[`u_list`,`format_list_bulleted`,`Bullet list`],[`o_list`,`format_list_numbered`,`Numbered list`],[`quote`,`format_quote`,`Quote`],[`link`,`link`,`Insert link`],[`clear`,`format_clear`,`Clear formatting`]].map(([e,t,n])=>`
                  <button class="p-2 rounded-lg hover:bg-surface-variant transition-colors shrink-0" data-cmd="${e}" title="${n}">${C(t,`text-[18px]`)}</button>`).join(``)}
              </div>
              <div data-editor class="flex-1 min-h-[220px] text-[15px] leading-relaxed text-on-surface focus:outline-none" contenteditable="true" data-placeholder="Start typing the meeting notes here…"></div>
            </div>

            <div class="card p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  ${C(`attach_file`,`text-[16px]`)} Attachments <span class="text-outline normal-case font-normal">(${l.length})</span></label>
                <button data-add-image class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors text-[13px] font-medium">
                  ${C(`add_photo_alternate`,`text-[17px]`)} Add Images</button>
                <input type="file" accept="image/*" multiple hidden data-file />
              </div>
              <div data-attachments class="flex gap-3 overflow-x-auto hide-scrollbar py-1 min-h-[96px]"></div>
              <p class="text-[11px] text-outline mt-2">Images are uploaded to Google Drive when you save. You can keep working — it syncs in the background.</p>
            </div>
          </div>
        </div>
      </main>`},mount(e){var t,n,r,i,a,o,s,l,f;let m=e.root,h=!!e.params.id,g=h?N.meeting(e.params.id):null;if(h&&!g)return;let _={title:g?g.title:((t=this._draft)==null?void 0:t.title)||``,projectId:g?g.projectId:((n=this._draft)==null?void 0:n.projectId)||``,priority:g?g.priority:((r=this._draft)==null?void 0:r.priority)||`medium`,date:g?g.date:((i=this._draft)==null?void 0:i.date)||p(),time:g?g.time:((a=this._draft)==null?void 0:a.time)||`09:00`,participants:g?[...g.participants||[]]:[...((o=this._draft)==null?void 0:o.participants)||[]],attachments:g?[...g.attachments||[]]:[...((s=this._draft)==null?void 0:s.attachments)||[]],summary:g?g.summary:((l=this._draft)==null?void 0:l.summary)||``},v=m.querySelector(`[data-editor]`),y=m.querySelector(`[data-title]`),b=m.querySelector(`[data-project]`),x=m.querySelector(`[data-date]`),S=m.querySelector(`[data-time]`),T=m.querySelector(`[data-participant]`),ee=m.querySelector(`[data-participants]`),ne=m.querySelector(`[data-attachments]`),E=m.querySelector(`[data-file]`);y.value=_.title,b.value=_.projectId,x.value=_.date,S.value=_.time,v.innerHTML=_.summary,!_.summary&&!h&&(v.innerHTML=``),D(),O();function D(){ee.innerHTML=_.participants.length?_.participants.map(e=>`
            <span class="chip bg-secondary-container text-on-secondary-container" data-part="${u(e.id)}">
              ${u(e.name)}${C(`close`,`text-[14px] cursor-pointer hover:text-error ml-0.5`)}</span>`).join(``):`<span class="text-[12px] text-outline">No participants added</span>`}function O(){ne.innerHTML=_.attachments.map((e,t)=>`
        <div class="relative w-24 h-24 rounded-xl border border-outline-variant overflow-hidden group shrink-0">
          <img src="${u(e.preview||(e.fileId?le(e.fileId,240):``))}" alt="${u(e.name||`attachment`)}"
            class="w-full h-full object-cover" loading="lazy" decoding="async" />
          ${e.data?`<span class="absolute top-1 left-1 bg-surface-container-highest/90 text-on-surface rounded-full px-1.5 py-0.5 text-[10px] font-semibold">new</span>`:``}
          <button data-remove="${t}" class="absolute top-1 right-1 bg-surface-container-highest/90 text-on-surface p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove">${C(`close`,`text-[14px]`)}</button>
        </div>`).join(``)+`<button data-add-image-2 class="w-24 h-24 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shrink-0">
          ${C(`add`,`text-[24px]`)}<span class="text-[11px] font-medium">Add</span></button>`}ne.addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove]`);if(t){_.attachments.splice(Number(t.dataset.remove),1),O(),j();return}e.target.closest(`[data-add-image-2]`)&&E.click()}),m.querySelector(`[data-add-image]`).addEventListener(`click`,()=>E.click()),E.addEventListener(`change`,async()=>{let e=Array.from(E.files||[]);E.value=``;for(let t of e){if(!t.type.startsWith(`image/`)){w.show(`"${t.name}" is not an image.`,`error`);continue}if(t.size>8388608){w.show(`"${t.name}" is over 8MB.`,`error`);continue}let e=URL.createObjectURL(t);_.attachments.push({preview:e,name:t.name,mime:t.type,size:t.size})}O(),j(),w.show(`Images will upload when you save.`,`info`,2400)}),T.addEventListener(`keydown`,e=>{if(e.key===`Enter`||e.key===`,`){e.preventDefault();let t=T.value.trim();t&&(_.participants.push({id:c(`p`),name:t}),T.value=``,D(),j())}}),ee.addEventListener(`click`,e=>{let t=e.target.closest(`[data-part]`);t&&(_.participants=_.participants.filter(e=>e.id!==t.dataset.part),D(),j())}),m.querySelector(`[data-toolbar]`).addEventListener(`mousedown`,e=>e.preventDefault()),m.querySelector(`[data-toolbar]`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-cmd]`);if(!t)return;let n=t.dataset.cmd;if(v.focus(),n===`link`){let e=prompt(`Link URL:`);e&&document.execCommand(`createLink`,!1,e)}else n===`clear`?document.execCommand(`removeFormat`):document.execCommand({bold:`bold`,italic:`italic`,underline:`underline`,u_list:`insertUnorderedList`,o_list:`insertOrderedList`,quote:`formatBlock`}[n],!1,n===`quote`?`blockquote`:null);j()}),v.addEventListener(`paste`,e=>{e.preventDefault();let t=(e.clipboardData||window.clipboardData).getData(`text/plain`);document.execCommand(`insertText`,!1,t)}),v.addEventListener(`input`,()=>{k(),j()}),v.addEventListener(`blur`,j);function k(){v.querySelectorAll(`script, iframe`).forEach(e=>e.remove());let e=v.innerHTML;d(e)!==e&&(v.innerHTML=d(e))}y.addEventListener(`input`,e=>{_.title=e.target.value,j()}),b.addEventListener(`change`,async e=>{if(e.target.value===`__new__`){let t=prompt(`New project name:`);if(t&&t.trim()){let n={id:c(`prj`),name:t.trim(),category:`General`,progress:0,status:`active`,createdAt:new Date().toISOString()};N.upsertProject(n),H.enqueueProjectSave(n),e.target.value=n.id}else e.target.value=_.projectId}_.projectId=e.target.value,j()}),x.addEventListener(`change`,e=>{_.date=e.target.value,j()}),S.addEventListener(`change`,e=>{_.time=e.target.value,j()}),m.querySelector(`[data-priority]`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-val]`);t&&(_.priority=t.dataset.val,m.querySelectorAll(`[data-priority] [data-val]`).forEach(e=>{e.className=`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all text-on-surface-variant hover:bg-surface-variant`}),t.className=`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${_.priority===`high`?`bg-error-container text-on-error-container`:_.priority===`medium`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-secondary-fixed text-on-secondary-fixed`}`,j())}),m.querySelector(`[data-save]`).addEventListener(`click`,()=>A());function A(){if(!_.title.trim()){w.show(`Please enter a meeting title.`,`warn`),y.focus();return}k();let e={id:g?g.id:c(`mtg`),projectId:_.projectId||``,title:_.title.trim(),summary:v.innerHTML,priority:_.priority,date:_.date||p(),time:_.time,participants:_.participants,attachments:_.attachments.map(e=>{var t;return{fileId:e.fileId||``,name:e.name||`image`,mime:e.mime||`image/png`,size:e.size||0,data:e.data||(e.fileId?void 0:(t=e.preview)!=null&&t.startsWith(`data:`)?e.preview:void 0)}}),status:`done`,createdAt:(g==null?void 0:g.createdAt)||new Date().toISOString()};N.upsertMeeting(e),H.enqueueMeetingSave(e),je(),w.show(`Saved — syncing in background.`,`success`),Q(h?`/meetings/`+e.id:`/`)}(f=m.querySelector(`[data-delete]`))==null||f.addEventListener(`click`,async()=>{let e=await te.confirm({title:`Delete meeting`,message:`This will permanently remove this meeting from Google Sheets. Enter your security PIN to continue.`,confirmText:`Delete`,danger:!0,pin:!0});if(e){if(!await Me(e)){w.show(`Incorrect PIN.`,`error`);return}N.removeMeeting(g.id),H.enqueueMeetingDelete(g.id,e),w.show(`Meeting deleted.`,`success`),Q(`/`)}});function j(){if(h)return;let e={title:_.title,projectId:_.projectId,priority:_.priority,date:_.date,time:_.time,participants:_.participants,attachments:_.attachments.map(e=>({...e})),summary:v.innerHTML};try{localStorage.setItem(Oe,JSON.stringify(e))}catch(e){}}}};function Ae(){try{var e,t;let n=JSON.parse(localStorage.getItem(Oe)||`null`);if(n&&(n.title||n.summary||(e=n.participants)!=null&&e.length||(t=n.attachments)!=null&&t.length))return n}catch(e){}return null}function je(){localStorage.removeItem(Oe)}async function Me(e){let{api:t}=await n(async()=>{let{api:e}=await Promise.resolve().then(()=>de);return{api:e}},void 0,import.meta.url);try{let n=await t.getSettings();if(n&&n.settings&&n.settings.pin!==void 0)return String(n.settings.pin)===String(e)}catch(e){}return String(N.get().settings.deletePin)===String(e)}var Ne=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],Pe=[`M`,`T`,`W`,`T`,`F`,`S`,`S`];function q(e,t,n){return`${e}-${String(t+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function Fe(){let e={};return N.get().meetings.forEach(t=>{t.date&&(e[t.date]=e[t.date]||[]).push(t)}),e}var Ie={id:`planner`,title:`Planner`,render(){let e=p(),t=new Date;return this._state={year:t.getFullYear(),month:t.getMonth(),selected:e},`
      ${W({title:`Planner`,left:``,right:`<button class="icon-btn" data-search aria-label="Search">${C(`search`)}</button>
                <button class="icon-btn" data-notif aria-label="Notifications">${C(`notifications`)}</button>`})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section class="lg:col-span-7 xl:col-span-8">
          <div class="card p-4">
            <div class="flex items-center justify-between mb-3">
              <h2 data-month class="text-lg font-semibold text-on-surface"></h2>
              <div class="flex items-center gap-1">
                <button class="btn btn-ghost h-9 px-3 text-[13px]" data-today>Today</button>
                <button class="icon-btn w-9 h-9" data-prev aria-label="Previous month">${C(`chevron_left`)}</button>
                <button class="icon-btn w-9 h-9" data-next aria-label="Next month">${C(`chevron_right`)}</button>
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-on-surface-variant mb-1">
              ${Pe.map((e,t)=>`<div class="py-1.5 ${t>4?`text-outline`:``}">${e}</div>`).join(``)}
            </div>
            <div data-calendar class="grid grid-cols-7 gap-1"></div>
          </div>
        </section>
        <section class="lg:col-span-5 xl:col-span-4">
          <div class="flex items-center justify-between mb-3">
            <h3 data-events-title class="text-base font-semibold text-on-surface">Events</h3>
            <a href="#/meetings/new" class="btn btn-tonal h-9 px-3 text-[13px]">${C(`add`,`text-[16px]`)} New meeting</a>
          </div>
          <div data-events class="flex flex-col gap-2.5"></div>
        </section>
      </main>
      ${K(`planner`)}`},mount(e){let t=e.root,n=this._state,r=t.querySelector(`[data-calendar]`),i=t.querySelector(`[data-events]`),a=t.querySelector(`[data-month]`),o=t.querySelector(`[data-events-title]`),s=Fe();function c(){let e=Fe(),t=(new Date(n.year,n.month,1).getDay()+6)%7,i=new Date(n.year,n.month+1,0).getDate(),o=new Date(n.year,n.month,0).getDate(),s=p(),c=``;for(let e=t-1;e>=0;e--)q(n.month===0?n.year-1:n.year,n.month===0?11:n.month-1,o-e),c+=`<div class="p-2 rounded-lg text-[13px] text-outline-variant cursor-default text-center">${o-e}</div>`;for(let t=1;t<=i;t++){var u,d,f;let r=q(n.year,n.month,t),i=e[r]||[],a=r===n.selected,o=r===s,l=i.slice(0,3).map(e=>{var t;return((t=v[e.priority])==null?void 0:t.dot)||v.medium.dot}).join(``);c+=`
          <div data-day="${r}" role="button" tabindex="0" class="p-1.5 md:p-2 rounded-lg text-[13px] cursor-pointer transition-all text-center relative flex flex-col items-center justify-center min-h-[44px] hover:bg-surface-container
            ${a?`bg-primary text-on-primary font-bold shadow-sm`:o?`ring-1 ring-primary text-primary font-semibold`:`text-on-surface`}">
            <span>${t}</span>
            ${i.length?`<div class="flex gap-0.5 mt-0.5">
              ${l?`<span class="w-1.5 h-1.5 rounded-full ${(u=v[i[0].priority])==null?void 0:u.dot}"></span>`:``}
              ${i.length>1?`<span class="w-1.5 h-1.5 rounded-full ${(d=v[i[1].priority])==null?void 0:d.dot}"></span>`:``}
              ${i.length>2?`<span class="w-1.5 h-1.5 rounded-full ${(f=v[i[2].priority])==null?void 0:f.dot}"></span>`:``}
            </div>`:``}
          </div>`}let m=7-((t+i)%7||7);for(let e=1;e<=m;e++)q(n.month===11?n.year+1:n.year,n.month===11?0:n.month+1,e),c+=`<div class="p-2 rounded-lg text-[13px] text-outline-variant cursor-default text-center">${e}</div>`;r.innerHTML=c,a.textContent=`${Ne[n.month]} ${n.year}`,l()}function l(){let e=(s[n.selected]||[]).sort((e,t)=>String(e.time).localeCompare(String(t.time)));if(o.textContent=`Events · ${n.selected.slice(8,10)} ${Ne[n.month]}`,!e.length){i.innerHTML=D({icon:`event_available`,title:`No meetings`,message:`Nothing scheduled for this day yet.`,action:`<a href="#/meetings/new" class="btn btn-primary">Plan a meeting</a>`});return}i.innerHTML=e.map(e=>{var t,n,r;return`
        <a href="#/meetings/${encodeURIComponent(e.id)}" class="card p-4 flex overflow-hidden group hover:shadow-cardlg transition-all cursor-pointer">
          <div class="w-1.5 ${((t=v[e.priority])==null?void 0:t.bar)||`bg-secondary`} rounded-l-xl shrink-0"></div>
          <div class="flex-1 min-w-0 pl-3">
            <div class="flex justify-between items-start gap-2">
              <span class="badge ${(n=v[e.priority])==null?void 0:n.badge}">${u(((r=v[e.priority])==null?void 0:r.label)||`Medium`)}</span>
              <span class="text-[12px] text-on-surface-variant shrink-0">${u(h(e.time)||``)}</span>
            </div>
            <h4 class="text-[14px] font-semibold text-on-surface mt-1.5 leading-snug">${u(e.title||`Untitled meeting`)}</h4>
            <div class="flex items-center justify-between mt-2">
              ${E(e.participants,6,3)}
              <span class="text-primary text-[13px] font-medium group-hover:underline">View ${C(`chevron_right`,`text-[15px]`)}</span>
            </div>
          </div>
        </a>`}).join(``)}r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-day]`);t&&t.dataset.day&&(n.selected=t.dataset.day,c())}),r.addEventListener(`keydown`,e=>{if(e.key!==`Enter`&&e.key!==` `)return;let t=e.target.closest(`[data-day]`);t&&(e.preventDefault(),n.selected=t.dataset.day,c())}),t.querySelector(`[data-prev]`).addEventListener(`click`,()=>{n.month--,n.month<0&&(n.month=11,n.year--),n.selected=q(n.year,n.month,1),c()}),t.querySelector(`[data-next]`).addEventListener(`click`,()=>{n.month++,n.month>11&&(n.month=0,n.year++),n.selected=q(n.year,n.month,1),c()}),t.querySelector(`[data-today]`).addEventListener(`click`,()=>{let e=new Date;n.year=e.getFullYear(),n.month=e.getMonth(),n.selected=p(),c()}),t.querySelector(`[data-search]`).addEventListener(`click`,()=>Q(`/`)),t.querySelector(`[data-notif]`).addEventListener(`click`,()=>w.show(`No new notifications.`,`info`)),c();let d=N.subscribe(()=>{let e=Fe();Object.assign(s,e),c()});return()=>{d()}}},Le=[`all`,`active`,`completed`],Re={id:`projects`,title:`Projects`,render(){return`
      ${W({title:`Projects`,left:``,right:`<button class="btn btn-tonal h-10 px-4" data-new>${C(`add`,`text-[18px]`)}<span class="hidden sm:inline">New Project</span></button>`})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="relative mb-4">
          ${C(`search`,`absolute left-4 top-1/2 -translate-y-1/2 text-outline`)}
          <input data-search class="input pl-12" placeholder="Search projects…" aria-label="Search projects" />
        </div>
        <div class="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
          ${Le.map(e=>`<button data-filter="${e}" class="chip ${e===`all`?`chip-active`:``}">${e[0].toUpperCase()+e.slice(1)}</button>`).join(``)}
        </div>
        <div data-grid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </main>
      ${Se(`#/meetings/new`)}
      ${K(`projects`)}`},mount(e){var t;let n=e.root,r=n.querySelector(`[data-grid]`),i=n.querySelector(`[data-search]`),a=`all`;function o(){let e=i.value.trim().toLowerCase(),t=N.get().projects.filter(e=>a===`all`||(a===`active`?e.status===`active`||!e.status:e.status===`completed`)).filter(t=>!e||(t.name+` `+t.description+` `+t.category).toLowerCase().includes(e));if(!t.length){r.innerHTML=D({icon:`folder_open`,title:`No projects found`,message:`Projects appear here once you create them.`,action:`<button class="btn btn-primary" data-new>New Project</button>`});return}r.innerHTML=t.map(e=>{let t=e.color===`secondary`?`bg-secondary-fixed text-on-secondary-fixed`:e.color===`tertiary`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-primary-fixed text-on-primary-fixed`,n=e.color===`secondary`?`bg-secondary`:e.color===`tertiary`?`bg-tertiary`:`bg-primary`,r=Math.max(0,Math.min(100,Number(e.progress)||0));return`
          <a href="#/projects/${encodeURIComponent(e.id)}" class="card p-5 flex flex-col hover:shadow-cardlg transition-all group">
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl ${t} flex items-center justify-center">${C(e.icon||`folder`,`text-[22px]`)}</div>
              <button data-del="${u(e.id)}" class="icon-btn w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete project">${C(`delete`,`text-[18px]`)}</button>
            </div>
            <h3 class="text-base font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">${u(e.name||`Untitled`)}</h3>
            <p class="text-[13px] text-on-surface-variant line-clamp-2 mb-4 flex-1">${u(e.description||`No description.`)}</p>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden"><div class="${n} h-full rounded-full" style="width:${r}%"></div></div>
              <span class="text-[11px] font-semibold text-on-surface-variant">${r}%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="chip text-[10px]">${u(e.category||`General`)}</span>
              <span class="text-[12px] text-outline">${e.meetingsCount||0} meetings</span>
            </div>
          </a>`}).join(``)}i.addEventListener(`input`,l(o,150)),n.querySelectorAll(`[data-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{n.querySelectorAll(`[data-filter]`).forEach(e=>e.classList.remove(`chip-active`)),e.classList.add(`chip-active`),a=e.dataset.filter,o()})}),(t=n.querySelector(`[data-new]`))==null||t.addEventListener(`click`,()=>{let e=prompt(`New project name:`);if(e&&e.trim()){let t={id:c(`prj`),name:e.trim(),category:`General`,progress:0,status:`active`,createdAt:f()};N.upsertProject(t),H.enqueueProjectSave(t),w.show(`Project created.`,`success`),o()}}),n.querySelectorAll(`[data-del]`).forEach(e=>{e.addEventListener(`click`,async t=>{t.preventDefault(),t.stopPropagation();let n=e.dataset.del,r=await te.confirm({title:`Delete project`,message:`This deletes the project and all its meetings. Enter your security PIN.`,confirmText:`Delete`,danger:!0,pin:!0});r&&(N.removeProject(n),H.enqueueProjectDelete(n,r),w.show(`Project deleted.`,`success`),o())})}),o();let s=N.subscribe(()=>o());return()=>{s()}}},ze={id:`projectDetail`,title:`Project`,render(e){let t=N.project(e.params.id);if(!t)return`
        ${W({title:`Project`,left:G()})}
        <main class="max-w-[1200px] mx-auto px-4">${D({icon:`search_off`,title:`Project not found`,message:`This project may have been deleted.`,action:`<a href="#/projects" class="btn btn-primary">All projects</a>`})}</main>`;let n=t.color===`secondary`?`bg-secondary-fixed text-on-secondary-fixed`:t.color===`tertiary`?`bg-tertiary-fixed text-on-tertiary-fixed`:`bg-primary-fixed text-on-primary-fixed`,r=Math.max(0,Math.min(100,Number(t.progress)||0));return`
      ${W({title:t.name||`Project`,left:G(),right:`<button class="icon-btn" data-more aria-label="More actions">${C(`more_vert`)}</button>`})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="card p-5 mb-5">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl ${n} flex items-center justify-center shrink-0">${C(t.icon||`folder`,`text-[24px]`)}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="chip text-[10px]">${u(t.category||`General`)}</span>
                <span class="chip ${t.status===`completed`?`bg-secondary-fixed text-on-secondary-fixed`:`chip-active`} text-[10px]">${u(t.status===`completed`?`Completed`:`Active`)}</span>
              </div>
              <p class="text-[14px] text-on-surface-variant mt-2 leading-relaxed">${u(t.description||`No description.`)}</p>
              <div class="flex items-center gap-2 mt-4">
                <div class="flex-1 h-2 rounded-full bg-surface-container overflow-hidden"><div class="${n.split(` `)[0]==`bg-secondary-fixed`?`bg-secondary`:n.split(` `)[0]==`bg-tertiary-fixed`?`bg-tertiary`:`bg-primary`} h-full rounded-full" style="width:${r}%"></div></div>
                <span class="text-[12px] font-semibold text-on-surface-variant">${r}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-3 mb-5">
          <div class="relative flex-1">
            ${C(`search`,`absolute left-4 top-1/2 -translate-y-1/2 text-outline`)}
            <input data-search class="input pl-12" placeholder="Search meetings…" aria-label="Search meetings" />
          </div>
          <div class="flex gap-2 overflow-x-auto hide-scrollbar">
            <select data-time class="input appearance-none py-2.5 text-[13px] cursor-pointer">
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select data-prio class="input appearance-none py-2.5 text-[13px] cursor-pointer">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <a href="#/meetings/new" class="btn btn-tonal shrink-0">${C(`add`,`text-[18px]`)} New meeting</a>
        </div>

        <div data-grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </main>
      ${K(`projects`)}`},mount(e){let t=e.root,n=N.project(e.params.id);if(!n)return;let r=t.querySelector(`[data-grid]`),i=t.querySelector(`[data-search]`),a=t.querySelector(`[data-time]`),o=t.querySelector(`[data-prio]`);function s(e,t){if(t===`all`||!e.date)return!0;let n=new Date(e.date+`T00:00:00`),r=new Date;if(t===`week`){let e=new Date(r);e.setDate(r.getDate()-r.getDay()+(r.getDay()===0?-6:1));let t=new Date(e);return t.setDate(e.getDate()+6),n>=e&&n<=t}return n.getMonth()===r.getMonth()&&n.getFullYear()===r.getFullYear()}function c(){let e=i.value.trim().toLowerCase(),t=N.meetingsForProject(n.id).filter(t=>!e||(t.title+` `+(t.summary||``)).toLowerCase().includes(e)).filter(e=>s(e,a.value)).filter(e=>o.value===`all`||e.priority===o.value);if(!t.length){r.innerHTML=D({icon:`event_note`,title:`No meetings found`,message:`Try adjusting your filters or write a new summary.`,action:`<a href="#/meetings/new" class="btn btn-primary">New summary</a>`});return}r.innerHTML=t.map(Ee).join(``)}i.addEventListener(`input`,l(c,150)),a.addEventListener(`change`,c),o.addEventListener(`change`,c),t.querySelector(`[data-more]`).addEventListener(`click`,async()=>{let t=await te.confirm({title:`Delete project`,message:`Delete "${n.name}" and all its meetings? This cannot be undone. Enter your security PIN.`,confirmText:`Delete`,danger:!0,pin:!0});t&&(N.removeProject(n.id),H.enqueueProjectDelete(n.id,t),w.show(`Project deleted.`,`success`),e.navigate(`/projects`))}),c();let u=N.subscribe(()=>c());return()=>{u()}}},Be={id:`export`,title:`Export`,render(){let e=N.get().projects;return`
      ${W({title:`Export Data`,left:``,right:``})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 flex flex-col gap-5">
          <!-- Format -->
          <section class="card p-5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-1">${C(`description`,`text-primary`)} Select Format</h2>
            <p class="text-[13px] text-on-surface-variant mb-4">Generate a clean shareable report of your meeting summaries.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${[[`pdf`,`picture_as_pdf`,`PDF Document`,`Best for sharing multi-page reports and printing.`],[`png`,`image`,`High-Res Image (PNG)`,`Ideal for a single long summary to share in chat.`]].map(([e,t,n,r])=>`
                <label class="relative flex cursor-pointer rounded-xl border p-4 hover:bg-surface-container-low transition-colors outline-variant">
                  <input type="radio" name="fmt" value="${e}" class="sr-only peer" ${e===`pdf`?`checked`:``} />
                  <div class="flex items-start gap-3 w-full">
                    <div class="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 border-outline-variant peer-checked:border-primary peer-checked:border-[6px] transition-all"></div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between gap-2">
                        <span class="text-sm font-semibold text-on-surface">${n}</span>
                        ${C(t,`text-secondary text-[20px]`)}
                      </div>
                      <p class="text-[12px] text-on-surface-variant mt-1">${r}</p>
                    </div>
                  </div>
                </label>`).join(``)}
            </div>
          </section>

          <!-- Filters -->
          <section class="card p-5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`filter_list`,`text-secondary`)} Filter Content</h2>
            <div class="space-y-4">
              <div>
                <label class="text-[12px] font-medium text-on-surface block mb-1.5">Project</label>
                <select data-project class="input appearance-none cursor-pointer">
                  <option value="">All Projects</option>
                  ${e.map(e=>`<option value="${u(e.id)}">${u(e.name)}</option>`).join(``)}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[12px] font-medium text-on-surface block mb-1.5">From</label>
                  <input data-from type="date" class="input" />
                </div>
                <div>
                  <label class="text-[12px] font-medium text-on-surface block mb-1.5">To</label>
                  <input data-to type="date" class="input" />
                </div>
              </div>
              <div>
                <label class="text-[12px] font-medium text-on-surface block mb-2">Include sections</label>
                <div class="flex flex-wrap gap-2">
                  ${[[`header`,`Summary header`],[`notes`,`Meeting notes`],[`people`,`Participants`],[`files`,`Attachments`]].map(([e,t])=>`
                    <label class="cursor-pointer">
                      <input type="checkbox" data-sec="${e}" class="peer sr-only" checked />
                      <span class="chip peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary-fixed-dim border border-outline-variant">${t}</span>
                    </label>`).join(``)}
                </div>
              </div>
            </div>
            <div class="mt-5 pt-4 border-t border-surface-container-high flex flex-col sm:flex-row sm:justify-end gap-2">
              <button data-generate class="btn btn-primary px-6">
                ${C(`download`,`text-[18px]`)} <span data-gen-label>Generate Export</span>
              </button>
            </div>
          </section>
        </div>

        <!-- Recent exports -->
        <div class="flex flex-col gap-5">
          <section class="card p-5 h-full flex flex-col">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`history`,`text-outline`)} Recent Exports</h2>
            <div data-recent class="flex-1 space-y-2"></div>
          </section>
        </div>
      </main>
      ${K(`export`)}`},async mount(e){let r=e.root,i=r.querySelector(`[data-generate]`),a=r.querySelector(`[data-gen-label]`),o=r.querySelector(`[data-recent]`),s=[];async function l(){try{let e=await I.getExports();s=e&&e.exports||[]}catch(e){}d()}function d(){if(!s.length){o.innerHTML=D({icon:`history`,title:`No exports yet`,message:`Generated reports will appear here.`});return}o.innerHTML=s.slice(0,8).map(e=>`
        <div class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
          <div class="w-9 h-9 rounded-lg ${e.format===`pdf`?`bg-error-container text-on-error-container`:`bg-secondary-container text-on-secondary-container`} flex items-center justify-center shrink-0">
            ${C(e.format===`pdf`?`picture_as_pdf`:`image`,`text-[18px]`)}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-on-surface truncate">${u(e.fileName||`Report`)}</p>
            <p class="text-[11px] text-on-surface-variant">${u(_(e.createdAt))}</p>
          </div>
          <span class="badge ${e.format===`pdf`?`bg-error-container text-on-error-container`:`bg-secondary-container text-on-secondary-container`}">${e.format.toUpperCase()}</span>
        </div>`).join(``)}i.addEventListener(`click`,async()=>{let e=r.querySelector(`input[name="fmt"]:checked`).value,o=r.querySelector(`[data-project]`).value,s=r.querySelector(`[data-from]`).value,u=r.querySelector(`[data-to]`).value,d=r.querySelectorAll(`[data-sec]:checked`),f={};d.forEach(e=>{f[e.dataset.sec]=!0});let p=[...N.get().meetings];if(o&&(p=p.filter(e=>e.projectId===o)),s&&(p=p.filter(e=>!e.date||e.date>=s)),u&&(p=p.filter(e=>!e.date||e.date<=u)),p.sort((e,t)=>String(t.date+` `+t.time).localeCompare(String(e.date+` `+e.time))),!p.length){w.show(`No meetings match the filters.`,`warn`);return}i.disabled=!0,a.textContent=`Generating…`;try{var m;let{default:r}=await n(async()=>{let{default:e}=await import(`./exporter-D0ysRip3.js`).then(e=>t(e.n(),1));return{default:e}},__vite__mapDeps([0,1]),import.meta.url),i=Ve(p,f);document.body.appendChild(i),i.style.display=`block`,await new Promise(e=>setTimeout(e,350));let a=await r(i,{scale:2,backgroundColor:`#ffffff`,logging:!1,useCORS:!0}),d=o?((m=N.project(o))==null?void 0:m.name)||`project`:`all`,h=new Date().toISOString().slice(0,10),g=`MeetSync_${d.replace(/[^a-z0-9]+/gi,`_`)}_${h}`;if(e===`png`)Ge(a.toDataURL(`image/png`),`${g}.png`);else{let{jsPDF:e}=await n(async()=>{let{jsPDF:e}=await import(`./exporter-D0ysRip3.js`).then(e=>e.t);return{jsPDF:e}},__vite__mapDeps([0,1]),import.meta.url),t=new e({orientation:`landscape`,unit:`mm`,format:`a4`}),r=a.width/a.height,i=281/r,o=Math.ceil(i/194);for(let e=0;e<o;e++){e>0&&t.addPage(`a4`,`landscape`);let n=e*194*r,i=Math.min(194*r,a.height-n),o=document.createElement(`canvas`);o.width=a.width,o.height=i,o.getContext(`2d`).drawImage(a,0,n,a.width,i,0,0,a.width,i),t.addImage(o.toDataURL(`image/jpeg`,.92),`JPEG`,8,8,281,i/r*1||281*(i/a.height))}t.save(`${g}.pdf`)}i.remove(),H.enqueue({type:`saveExport`,payload:{exp:{id:c(`exp`),format:e,filters:{projectId:o,from:s,to:u},fileName:`${g}.${e}`}}}),w.show(`Export generated.`,`success`),l()}catch(e){w.show(`Export failed: `+e.message,`error`)}finally{i.disabled=!1,a.textContent=`Generate Export`}}),l();let f=N.subscribe(()=>{});return()=>{f()}}};function Ve(e,t){let n=document.createElement(`div`);n.style.cssText=`position:fixed;left:-10000px;top:0;background:#fff;width:1000px;z-index:-1`;let r=e=>{var t;return((t=N.project(e.projectId))==null?void 0:t.name)||``};return n.innerHTML=`
    <div style="padding:32px;font-family:Inter,-apple-system,Segoe UI,sans-serif;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:26px;font-weight:800;color:#000666;letter-spacing:-.02em;">MeetSync</div>
        <div style="font-size:12px;color:#767683;margin-top:4px;">Meeting Summaries Report · Generated ${new Date().toLocaleString(`th-TH`)}</div>
      </div>
      ${e.map(e=>{var n;return`
    <div style="border:1px solid #e4e1ea;border-left:6px solid ${He(e.priority)};border-radius:12px;padding:20px;margin-bottom:16px;break-inside:avoid;">
      ${t.header?`
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;">
        <div>
          <div style="font-size:11px;font-weight:600;color:${We(e.priority)};background:${Ue(e.priority)};display:inline-block;padding:3px 10px;border-radius:99px;margin-bottom:8px;">${(((n=v[e.priority])==null?void 0:n.label)||`Medium`)+` Priority`}</div>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#1b1b21;">${J(e.title||`Untitled meeting`)}</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#767683;">${J(g(e.date,e.time))}${r(e)?` · `+J(r(e)):``}</p>
        </div>
      </div>`:``}
      ${t.people&&(e.participants||[]).length?`
      <div style="margin-bottom:${t.notes&&e.summary?`14px`:`0`};">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin-bottom:6px;">Participants</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">${e.participants.map(e=>`<span style="display:inline-flex;align-items:center;gap:6px;background:#efecf5;border-radius:99px;padding:4px 12px;font-size:12px;color:#1b1b21;">${y(e.name)} ${J(e.name)}</span>`).join(``)}</div>
      </div>`:``}
      ${t.notes&&e.summary?`
      <div style="font-size:13px;line-height:1.65;color:#1b1b21;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin:0 0 8px;">Meeting Notes</div>
        <div class="ms-report-body">${d(e.summary)}</div>
      </div>`:``}
      ${t.files&&(e.attachments||[]).length?`
      <div style="margin-top:14px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin-bottom:8px;">Attachments (${e.attachments.length})</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">${e.attachments.slice(0,9).map(e=>`<img src="${J(e.fileId?ue(e.fileId):``)}" style="width:84px;height:84px;object-fit:cover;border-radius:8px;border:1px solid #e4e1ea;" />`).join(``)}</div>
      </div>`:``}
    </div>`}).join(``)}
    </div>
    <style>.ms-report-body img{max-width:100%;border-radius:8px}.ms-report-body a{color:#000666}</style>`,n}function J(e){return String(e==null?``:e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function He(e){return{high:`#ba1a1a`,medium:`#5c1800`,low:`#505f76`}[e]||`#505f76`}function Ue(e){return{high:`#ffdad6`,medium:`#ffdbd0`,low:`#d3e4fe`}[e]||`#d3e4fe`}function We(e){return{high:`#93000a`,medium:`#390c00`,low:`#0b1c30`}[e]||`#0b1c30`}function Ge(e,t){let n=document.createElement(`a`);n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove()}var Y=null;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),Y=e,window.dispatchEvent(new CustomEvent(`ms:installable`))});var Ke={canInstall:()=>!!Y,async prompt(){return Y?(Y.prompt(),await Y.userChoice,Y=null,!0):!1}};function qe(e){window.addEventListener(`ms:installable`,e),Y&&e()}var Je=[{path:`/`,view:De},{path:`/planner`,view:Ie},{path:`/meetings/new`,view:ke},{path:`/meetings/:id`,view:ke},{path:`/projects`,view:Re},{path:`/projects/:id`,view:ze},{path:`/export`,view:Be},{path:`/settings`,view:{id:`settings`,title:`Settings`,render(){let e=N.get().settings;return`
      ${W({title:`Settings`,left:``,right:``})}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Profile -->
          <section class="card p-5 md:col-span-2">
            <div class="flex items-center gap-4">
              <div data-avatar class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold overflow-hidden shrink-0">
                ${e.userAvatar?`<img src="${u(e.userAvatar)}" class="w-full h-full object-cover" alt="Avatar" />`:u((e.userName||`M`)[0].toUpperCase())}
              </div>
              <div class="flex-1">
                <label class="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant block mb-1">Display name</label>
                <input data-name class="input" placeholder="Your name" value="${u(e.userName||``)}" maxlength="60" />
              </div>
            </div>
          </section>

          <!-- App customization -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`palette`,`text-primary-container`)} App Customization</h2>
            <div class="mb-4">
              <label class="text-[12px] font-medium text-on-surface block mb-1.5">Theme</label>
              <div class="flex bg-surface-container rounded-xl p-1" data-theme-group>
                ${[`light`,`dark`,`system`].map(t=>`<button data-theme="${t}" class="flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${e.theme===t?`bg-surface-container-lowest shadow text-on-surface`:`text-on-surface-variant hover:bg-surface-variant`}">${t[0].toUpperCase()+t.slice(1)}</button>`).join(``)}
              </div>
            </div>
            <div>
              <label class="text-[12px] font-medium text-on-surface block mb-2">Accent color</label>
              <div class="flex gap-3" data-accent-group>
                ${[[`primary`,`bg-primary-container`],[`secondary`,`bg-secondary-container`],[`tertiary`,`bg-tertiary-fixed`]].map(([t,n])=>`
                  <button data-accent="${t}" aria-label="Accent ${t}" class="w-9 h-9 rounded-full ${n} transition-all ${e.accent===t?`ring-2 ring-offset-2 ring-primary`:`opacity-60 hover:opacity-100`}"></button>`).join(``)}
              </div>
            </div>
          </section>

          <!-- API -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`code`,`text-primary-container`)} Apps Script API</h2>
            <label class="text-[12px] font-medium text-on-surface block mb-1.5">/exec Endpoint URL</label>
            <div class="relative">
              <input data-exec class="input pr-24 font-mono text-[12px]" value="${u(se())}" spellcheck="false" />
              <button data-test class="absolute right-1.5 top-1/2 -translate-y-1/2 btn btn-outline h-8 px-3 text-[12px]">Test</button>
            </div>
            <p data-conn class="text-[12px] text-on-surface-variant mt-2 flex items-center gap-1.5"></p>
          </section>

          <!-- Sync status -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`sync`,`text-primary-container`)} Sync</h2>
            <div data-sync-status class="flex flex-col gap-2 text-[13px] text-on-surface-variant"></div>
            <div class="flex gap-2 mt-4">
              <button data-force class="btn btn-outline flex-1 text-[13px]">${C(`refresh`,`text-[16px]`)} Force sync</button>
              <button data-clear-errors class="btn btn-outline flex-1 text-[13px] hidden">Clear errors</button>
            </div>
          </section>

          <!-- Security -->
          <section class="card p-5">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`lock`,`text-primary-container`)} Security</h2>
            <label class="text-[12px] font-medium text-on-surface block mb-1.5">Delete PIN (4–6 digits)</label>
            <input data-pin type="password" inputmode="numeric" maxlength="6" class="input" placeholder="••••" value="${u(e.deletePin||`0000`)}" />
            <p class="text-[11px] text-outline mt-2">Required before deleting meetings or projects.</p>
          </section>

          <!-- Contacts & Groups -->
          <section class="card p-5 md:col-span-2">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${C(`group`,`text-primary-container`)} Group & Contact Management</h2>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label class="text-[12px] font-medium text-on-surface block mb-1.5">Add contact</label>
                <div class="flex gap-2">
                  <input data-contact class="input flex-1" placeholder="Name" />
                  <input data-contact-email type="email" class="input flex-1" placeholder="Email (optional)" />
                  <button data-add-contact class="btn btn-tonal shrink-0">Add</button>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-4" data-contacts></div>
            <div class="mt-4">
              <label class="text-[12px] font-medium text-on-surface block mb-2">Groups</label>
              <div class="flex flex-wrap gap-2" data-groups>
                <button data-new-group class="chip border border-dashed border-outline-variant hover:bg-surface-container-high">+ New Group</button>
              </div>
            </div>
          </section>

          <!-- Install -->
          <section class="card p-5 md:col-span-2">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-1">${C(`download_for_offline`,`text-primary-container`)} Install App</h2>
                <p class="text-[13px] text-on-surface-variant">Install MeetSync on this device for offline use and faster loading.</p>
              </div>
              <button data-install class="btn btn-primary hidden">Install</button>
            </div>
          </section>
        </div>
      </main>
      ${K(`settings`)}`},mount(e){let t=e.root,n=N.get().settings;t.querySelectorAll(`[data-theme]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.theme;N.setSettings({theme:n}),t.querySelectorAll(`[data-theme]`).forEach(e=>{e.className=`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all ${e.dataset.theme===n?`bg-surface-container-lowest shadow text-on-surface`:`text-on-surface-variant hover:bg-surface-variant`}`})})}),t.querySelectorAll(`[data-accent]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.accent;N.setSettings({accent:n}),t.querySelectorAll(`[data-accent]`).forEach(e=>{e.classList.toggle(`ring-2`,e.dataset.accent===n),e.classList.toggle(`ring-offset-2`,e.dataset.accent===n),e.classList.toggle(`ring-primary`,e.dataset.accent===n),e.classList.toggle(`opacity-60`,e.dataset.accent!==n)})})});let r=t.querySelector(`[data-name]`),i=t.querySelector(`[data-pin]`),a=t.querySelector(`[data-conn]`);t.querySelector(`[data-test]`).addEventListener(`click`,async()=>{let e=t.querySelector(`[data-exec]`).value.trim();e&&ce(e),a.innerHTML=`${C(`sync`,`text-[15px] animate-spin`)} Testing connection…`;try{let e=await I.ping();a.innerHTML=`${C(`check_circle`,`text-[16px] text-primary`)} Connected — MeetSync backend v${e.version||`?`} responded OK.`,w.show(`Connection successful.`,`success`)}catch(e){a.innerHTML=`${C(`error`,`text-[16px] text-error`)} ${u(e.message)}`,w.show(`Connection failed.`,`error`)}});let o=t.querySelector(`[data-sync-status]`);function s(){var e;let n=N.get(),r=H.getOps(),i=r.filter(e=>e.status===`pending`||e.status===`running`).length,a=r.filter(e=>e.status===`error`).length;o.innerHTML=`
        <div class="flex items-center justify-between"><span>Status</span>
          <span class="flex items-center gap-1 font-medium ${H.isOnline()?`text-primary`:`text-error`}">${H.isOnline()?C(`cloud_done`,`text-[16px]`)+` Online`:C(`cloud_off`,`text-[16px]`)+` Offline`}</span></div>
        <div class="flex items-center justify-between"><span>Pending changes</span><span class="font-medium text-on-surface">${i}</span></div>
        <div class="flex items-center justify-between"><span>Failed</span><span class="font-medium ${a?`text-error`:`text-on-surface`}">${a}</span></div>
        <div class="flex items-center justify-between"><span>Last sync</span><span class="font-medium text-on-surface">${n.lastSync?_(n.lastSync):`never`}</span></div>`,(e=t.querySelector(`[data-clear-errors]`))==null||e.classList.toggle(`hidden`,a===0)}s();let l=H.subscribe(s);t.querySelector(`[data-force]`).addEventListener(`click`,async()=>{H.retryFailed();try{let e=await I.getDashboard();e.data&&N.hydrate(e.data),ae(),w.show(`Synced with Google Sheets.`,`success`),s()}catch(e){w.show(e.message,`error`)}}),t.querySelector(`[data-clear-errors]`).addEventListener(`click`,()=>{H.clearErrors(),s()});let d=null,p=()=>{clearTimeout(d),d=setTimeout(()=>{let e=i.value.trim()||n.deletePin||`0000`;N.setSettings({userName:r.value.trim(),deletePin:e}),H.enqueueSettingsSave({theme:N.get().settings.theme,accent:N.get().settings.accent,userName:r.value.trim(),deletePin:e}),w.show(`Settings saved.`,`success`)},600)};r.addEventListener(`input`,p),i.addEventListener(`input`,p);let m=t.querySelector(`[data-contacts]`),h=[...N.get().contacts];function g(){if(!h.length){m.innerHTML=`<span class="text-[12px] text-outline w-full">No contacts yet — add team members to invite them quickly.</span>`;return}m.innerHTML=h.map(e=>`
        <span class="chip bg-secondary-container text-on-secondary-container" data-cid="${u(e.id)}">
          ${e.name}${e.email?`<span class="text-on-secondary-container/60 ml-0.5">· ${u(e.email)}</span>`:``}
          ${C(`close`,`text-[14px] cursor-pointer hover:text-error ml-0.5`)}</span>`).join(``)}g(),m.addEventListener(`click`,e=>{let t=e.target.closest(`[data-cid]`);t&&(h=h.filter(e=>e.id!==t.dataset.cid),H.enqueueContactsSave(h),g())}),t.querySelector(`[data-add-contact]`).addEventListener(`click`,()=>{let e=t.querySelector(`[data-contact]`).value.trim(),n=t.querySelector(`[data-contact-email]`).value.trim();if(!e){w.show(`Enter a name.`,`warn`);return}h.push({id:c(`ctc`),name:e,email:n,createdAt:f()}),t.querySelector(`[data-contact]`).value=``,t.querySelector(`[data-contact-email]`).value=``,H.enqueueContactsSave(h),g(),w.show(`Contact added.`,`success`)});let v=t.querySelector(`[data-groups]`),y=[...N.get().groups];function b(){let e=y.map(e=>`
        <span class="chip bg-surface-container" data-gid="${u(e.id)}">${u(e.name)}${C(`close`,`text-[14px] cursor-pointer hover:text-error ml-0.5`)}</span>`).join(``);v.innerHTML=e+`<button data-new-group class="chip border border-dashed border-outline-variant hover:bg-surface-container-high">+ New Group</button>`}b(),v.addEventListener(`click`,e=>{let t=e.target.closest(`[data-gid]`);if(t){y=y.filter(e=>e.id!==t.dataset.gid),H.enqueueContactsSave(h),b();return}if(e.target.closest(`[data-new-group]`)){let e=prompt(`Group name:`);e&&e.trim()&&(y.push({id:c(`grp`),name:e.trim(),memberIds:[],createdAt:f()}),b())}});let x=t.querySelector(`[data-install]`);function S(){x.classList.toggle(`hidden`,!Ke.canInstall())}x.addEventListener(`click`,async()=>{await Ke.prompt()&&w.show(`Installing…`,`info`)}),S(),qe(S);let T=N.subscribe(s);return()=>{T(),l()}}}}];function Ye(){let e=location.hash.replace(/^#/,``)||`/`;return e.startsWith(`/`)?e:`/`+e}function Xe(e){let t=e.split(`?`)[0].split(`/`).filter(Boolean);for(let e of Je){let n=e.path.split(`/`).filter(Boolean);if(n.length!==t.length)continue;let r={},i=!0;for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))r[n[e].slice(1)]=decodeURIComponent(t[e]);else if(n[e]!==t[e]){i=!1;break}if(i)return{view:e.view,params:r}}return{view:De,params:{}}}var X=null,Z=null;function Q(e){location.hash===`#`+e?Ze():location.hash=e}function Ze(){let{view:e,params:t}=Xe(Ye());if(Z&&Z.view!==e)try{Z.unmount&&Z.unmount()}catch(e){}if(!X)return;let n={root:X,params:t,navigate:Q};X.innerHTML=e.render?e.render(n):``,Z={view:e,params:t,unmount:e.mount?e.mount(n):null},window.scrollTo({top:0,behavior:`instant`in window?`instant`:`auto`})}function Qe(e){return X=e,window.addEventListener(`hashchange`,Ze),Ze(),{current:()=>Z}}var $e=document.getElementById(`meta-theme`);function et(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches}function tt(){let{theme:e,accent:t}=N.get().settings,n=e===`dark`||e===`system`&&et(),r=document.documentElement;r.classList.toggle(`dark`,n),r.dataset.accent=t||`primary`;let i=getComputedStyle(r).getPropertyValue(`--primary`);$e&&$e.setAttribute(`content`,`rgb(${i.trim()})`)}tt(),N.subscribe(tt),window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{N.get().settings.theme===`system`&&tt()});var nt=!1;async function rt(){if(!nt){nt=!0,N.set({status:`loading`});try{let e=await I.getDashboard();e&&e.data&&N.hydrate(e.data)}catch(e){N.set({status:`error`});let t=N.get();t.projects.length||t.meetings.length||w.show(`Cannot reach the database. Check the API endpoint in Settings.`,`error`,5e3)}finally{N.set({status:`ready`}),ye()}}}var $=s({immediate:!0});$&&$.then&&$.then(()=>{});var it=document.getElementById(`app`);it.innerHTML=``,Ce(),Qe(it),rt();
(()=>{"use strict";var t,e,r,s=function(t,e,r,s){if("a"===r&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?s:"a"===r?s.call(t):s?s.value:e.get(t)};class a{constructor(e,r){this.type=e,this.payload=r,t.set(this,!1)}preventDefault(){!function(t,e,r,s,a){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===s?a.call(t,r):a?a.value=r:e.set(t,r)}(this,t,!0,"f")}get defaultPrevented(){return s(this,t,"f")}}t=new WeakMap;class n{constructor(){e.set(this,new Map),r.set(this,new Set)}addEventListener(t,a){return t?(s(this,e,"f").has(t)||s(this,e,"f").set(t,new Set),s(this,e,"f").get(t)?.add(a)):s(this,r,"f").add(a),a}removeEventListener(t,a){null===t?s(this,r,"f").delete(a):s(this,e,"f").get(t)?.delete(a)}emitEvent(t,n){const o=new a(t,n);return s(this,e,"f").get(t)?.forEach((t=>t(o))),s(this,r,"f").forEach((t=>t(o))),o}clearListeners(){s(this,r,"f").clear(),s(this,e,"f").clear()}}function o(t,e){return t.data&&"object"==typeof t.data&&t.data.__type===e?t.data:null}e=new WeakMap,r=new WeakMap;const i="undefined"!=typeof window&&window===window.self;function h(t,e,r="*",s){i?window.parent.postMessage({...e,__type:t},r,s||[]):self.postMessage({...e,__type:t},r,s||[])}const l=t=>{if(u())return removeEventListener("message",l);const e=o(t,"meta");var r;e&&(console.log("Meta received",e.meta),r=e.meta,globalThis.$ER||(globalThis.$ER={}),globalThis.$ER.meta=r,c(e.meta.initialState),h("ready",{__token:e.meta.authToken}),removeEventListener("message",l))};function u(){return globalThis.$ER?.meta}function d(){return globalThis.$ER?.state||{}}function c(t){globalThis.$ER||(globalThis.$ER={}),globalThis.$ER.state=t||{}}addEventListener("message",l),new class extends n{constructor(t){super(),this.init=t,this.id="adapter_id:"+function(){let t="";for(let e=0;e<25;e++)t+="abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(36*Math.random())];return t}(),this.started=!1,this.listen()}listen(){addEventListener("message",(async t=>{if("string"==typeof t?.data?.__type)switch(t.data.__type){case"state_push":let e;e=t.data.options?.merge?this.init.mergeStates?this.init.mergeStates(d(),t.data.state):{...d(),...t.data.state}:t.data.state,c(e),console.log("Received state_push",this.id,"New state:",this.state),this.emitEvent("state_push",t.data.state);break;case"operation":const{args:r,operation:s,__port:a}=t.data;if(!a)return this.err("Operation Channel Error","Port not found");let n=await(this.init.out?.[s]);if("function"!=typeof n&&(n=null),a.onmessageerror=t=>{this.err("Operation Channel Error",t)},n)try{const t=await n.apply(this,r);a.postMessage({__type:"operation:result",payload:t}),this.emitEvent(`op:${s}`,{args:r,result:t,error:null})}catch(t){const e=this.err("Operation Execution Error",t);return void this.emitEvent(`op:${s}`,{args:r,result:void 0,error:e})}else this.emitEvent(`op:${s}`,{args:r,result:void 0,error:null})}}))}async start(t){return this.started?(t&&t.apply(this,[this]),this):(this.started=!0,new Promise(((e,r)=>{let s=!1;setTimeout((()=>{if(!s)return s=!0,r(new Error("Provider start timeout"))}),this.init.startTimeout||5e3),addEventListener("message",(r=>{o(r,"meta")&&!s&&(s=!0,t&&t.apply(this,[this]),e(this))}))})))}get meta(){const t=u();if(!t)throw new Error("Meta not defined. "+(this.started?"(unexpected)":"The adapter has not been started"));return t}get state(){return d()}err(t,e){const r=e instanceof Event?(e.message||e.data||"").toString():e instanceof Error?e.message:"",s=new Error(`${t}${r?": "+r:""}`);return console.error(t,s),s}async execute(t,...e){return await async function(t,e,r,s="*",a,n=5e3){return new Promise(((i,h)=>{const l=new MessageChannel,u=l.port1,d=l.port2;let c=!1;setTimeout((()=>{c||h(new Error("Operation timeout"))}),n||5e3),u.onmessage=async t=>{const r=o(t,e+":result");r&&(c=!0,i(r.payload))},d.onmessageerror=t=>{h(new Error("Channel Error (in)"))},u.onmessageerror=t=>{h(new Error("Channel Error (out)"))},t.postMessage({...r,__type:e,__port:d},{targetOrigin:s,transfer:[d,...a||[]]})}))}(i?parent:self,"operation",{args:e,operation:t,__token:this.meta.authToken},"*",[],this.init.operationTimeout)}async pushState(t,e){console.log("pushState",this.id,t),!1!==e?.populate&&h("state_populate",{state:t,options:{}},"*"),c(t)}}({provider:"",out:{add:function(t,e){return Number.isInteger(t)||(t=0),Number.isInteger(e)||(e=0),t+e},substract:function(t,e){return Number.isInteger(t)||(t=0),Number.isInteger(e)||(e=0),t-e}}}).start((t=>{t.execute("alert","Math Adapter started"),t.addEventListener("op:logArea",(t=>{const[e]=t.payload.args,r=Math.PI*e*e;console.log("Area of circle with width",e,":",r)}))}))})();
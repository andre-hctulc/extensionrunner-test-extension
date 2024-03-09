(()=>{var t,e,r,a=function(t,e,r,a,s){if("m"===a)throw TypeError("Private method is not writable");if("a"===a&&!s)throw TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!s:!e.has(t))throw TypeError("Cannot write private member to an object whose class did not declare it");return"a"===a?s.call(t,r):s?s.value=r:e.set(t,r),r},s=function(t,e,r,a){if("a"===r&&!a)throw TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?a:"a"===r?a.call(t):a?a.value:e.get(t)};class i{constructor(e,r){this.type=e,this.payload=r,t.set(this,!1)}preventDefault(){a(this,t,!0,"f")}get defaultPrevented(){return s(this,t,"f")}}t=new WeakMap;class n{constructor(){e.set(this,new Map),r.set(this,new Set)}addEventListener(t,a){return t?(s(this,e,"f").has(t)||s(this,e,"f").set(t,new Set),s(this,e,"f").get(t)?.add(a)):s(this,r,"f").add(a),a}removeEventListener(t,a){null===t?s(this,r,"f").delete(a):s(this,e,"f").get(t)?.delete(a)}emitEvent(t,a){let n=new i(t,a);return s(this,e,"f").get(t)?.forEach(t=>t(n)),s(this,r,"f").forEach(t=>t(n)),n}clearListeners(){s(this,r,"f").clear(),s(this,e,"f").clear()}}function o(t,e){return t.data&&"object"==typeof t.data&&t.data.__type===e?t.data:null}e=new WeakMap,r=new WeakMap;let l="undefined"!=typeof window&&window===window.self;async function h(t,e,r,a="*",s,i=5e3){return new Promise((n,l)=>{let h=new MessageChannel,u=h.port1,d=h.port2,p=!1;setTimeout(()=>{p||l(Error("Operation timeout"))},i||5e3),u.onmessage=async t=>{let r=o(t,e+":result");r&&(p=!0,n(r.payload))},d.onmessageerror=t=>{l(Error("Channel Error (in)"))},u.onmessageerror=t=>{l(Error("Channel Error (out)"))},t.postMessage({...r,__type:e,__port:d},{targetOrigin:a,transfer:[d,...s||[]]})})}let u="https://cdn.jsdelivr.net";async function d(t,e,r,a){a.startsWith("/")?a=a.slice(1):a.startsWith("./")&&(a=a.slice(2));let s=await fetch(function(t,e,r,a){var s;let i;if("github"===t){let[t,a]=e.split("/");i=`${u}/gh/${t}/${a}@${r}/`}else if("npm"===t)i=`${u}/npm/${e}@${r}/`;else throw Error("Invalid type ('npm' or 'github' expected)");return a?((s=a).startsWith("./")?s=s.slice(2):s.startsWith("/")&&(s=s.slice(1)),i+(a=s)):i}(t,e,r,a),{});if(!s.ok)throw Error(`Failed to load file: ${s.statusText}`).response=s,Error(`Failed to load file: ${s.statusText}`);return s}let p=t=>{var e;if(c())return removeEventListener("message",p);let r=o(t,"meta");r&&(e=r.meta,globalThis.$ER||(globalThis.$ER={}),globalThis.$ER.meta=e,f(r.meta.initialState),m("ready",{__token:r.meta.authToken},"*"),removeEventListener("message",p))};function c(){return globalThis.$ER?.meta}function f(t){globalThis.$ER||(globalThis.$ER={}),globalThis.$ER.state=t||{}}function m(t,e,r,a){l?window.parent.postMessage({...e,__type:t},r,a||[]):self.postMessage({...e,__type:t},r,a||[])}addEventListener("message",p),new class extends n{constructor(t){super(),this.init=t,this.id="adapter_id:"+function(){let t="abcdefghijklmnopqrstuvwxyz0123456789",e="";for(let r=0;r<25;r++){let r=Math.floor(Math.random()*t.length);e+=t[r]}return e}(),this._started=!1,this.listen()}listen(){addEventListener("message",async t=>{if(console.log("ADAPTER RECEIVED:",t),console.log("ADAPTER META:",this.meta),console.log("ADAPTER INIT:",this.init),t.origin===this.init.provider&&"string"==typeof t?.data?.__type)switch(t.data.__type){case"state_push":let e=t.data.state;if(!e||"object"!=typeof e)return this.err("Invalid state received",t);f(e),this.emitEvent("state_update",t.data.state);break;case"operation":let{args:r,operation:a,__port:s}=t.data;if(!s)return this.err("Operation Channel Error","Port not found");let i=await this.init.out?.[a];if("function"!=typeof i&&(i=null),s.onmessageerror=t=>{this.err("Operation Channel Error",t)},i)try{let t=await i.apply(this,r);s.postMessage({__type:"operation:result",payload:t}),this.emitEvent(`op:${a}`,{args:r,result:t,error:null})}catch(e){let t=this.err("Operation Execution Error",e);this.emitEvent(`op:${a}`,{args:r,result:void 0,error:t});return}else this.emitEvent(`op:${a}`,{args:r,result:void 0,error:null})}})}async start(t){return this._started?this:(this._started=!0,c())?(t&&t.apply(this,[this]),this):new Promise((e,r)=>{let a=!1;setTimeout(()=>{if(!a)return a=!0,r(Error("Provider start timeout"))},this.init.startTimeout||5e3),addEventListener("message",r=>{o(r,"meta")&&!a&&(a=!0,t&&t.apply(this,[this]),e(this))})})}get meta(){let t=c();if(!t)throw Error("Meta not defined. "+(this._started?"(unexpected)":"The adapter has not been started"));return t}get state(){return globalThis.$ER?.state||{}}err(t,e){let r=e instanceof Event?(e.message||e.data||"").toString():e instanceof Error?e.message:"",a=Error(`${t}${r?": "+r:""}`);return console.error(t,a),this.emitEvent("error",a),a}async execute(t,...e){return await h(l?parent:self,"operation",{args:e,operation:t,__token:this.meta.authToken},this.init.provider,[],this.init.operationTimeout)}async pushState(t,e){m("state_populate",{state:t,options:{merge:!e?.merge,populate:e?.populate!==!1},__token:this.meta.authToken},this.init.provider)}async loadFile(t){return await d(this.meta.type,this.meta.name,this.meta.version,t)}}({provider:"",out:{add:function(t,e){return Number.isInteger(t)||(t=0),Number.isInteger(e)||(e=0),t+e},substract:function(t,e){return Number.isInteger(t)||(t=0),Number.isInteger(e)||(e=0),t-e}}}).start(t=>{t.execute("alert","Math Adapter started"),t.addEventListener("op:logArea",t=>{let[e]=t.payload.args;console.log("Area of circle with width",e,":",Math.PI*e*e)})})})();
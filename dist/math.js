(()=>{"use strict";var e,t=function(e,t,r,a){if("a"===r&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?a:"a"===r?a.call(e):a?a.value:t.get(e)};function r(e,t){return e.data&&"object"==typeof e.data&&e.data.__type===t?e.data:null}class a{constructor(){e.set(this,new Map)}addEventListener(r,a){t(this,e,"f").has(r)||t(this,e,"f").set(r,new Set),t(this,e,"f").get(r)?.add(a)}removeEventListener(r,a){t(this,e,"f").get(r)?.delete(a)}notifyListeners(r,...a){t(this,e,"f").get(r)?.forEach((e=>e(...a)))}}e=new WeakMap;const n=e=>{if(globalThis.meta&&"object"==typeof globalThis.meta)return removeEventListener("message",n);const t=r(e,"meta");t&&(globalThis.meta=t.meta,removeEventListener("message",n),postMessage({__type:"ready",__token:t.meta.authToken}))};addEventListener("message",n);let s="circle";new class extends a{constructor(e){super(),this.init=e,this.listen()}listen(){addEventListener("message",(async e=>{if("string"==typeof e?.data?.__type)switch(e.data.__type){case"state_push":this.init.onPushState?.(e.data.state);break;case"event":this.notifyListeners?.(e.data.event,e.data.args);break;case"operation":const{args:t,operation:r,__port:a}=e.data;if(!a)return this.err("Operation Channel Error","Port not found");const n=await(this.init.out?.[r]);if("function"!=typeof n)return this.err("Operation not found",null);a.onmessageerror=e=>{this.err("Operation Channel Error",e)};try{const e=await n(...t||[]);a.postMessage({__type:"operation:result",payload:e})}catch(e){return this.err("Operation Execution Error",e)}}}))}get meta(){const e=globalThis.meta;if(!e||"object"!=typeof e)throw new Error("Meta not defined");return e}err(e,t){const r=t instanceof Event?(t.message||t.data||"").toString():t instanceof Error?t.message:"",a=new Error(`${e}${r?": "+r:""}`);return this?.init?.onError?.(a),a}postMessage(e,t,r){postMessage({...t,__type:e,__token:this.meta.authToken},"*",r)}async execute(e,...t){return await async function(e,t,a,n,s=5e3){return new Promise(((o,i)=>{const c=new MessageChannel,u=c.port1,h=c.port2;let p=!1;setTimeout((()=>{p||i(new Error("Operation timeout"))}),s||5e3),u.onmessage=async e=>{const a=r(e,t+":result");a&&(p=!0,o(a.payload))},h.onmessageerror=e=>{i(new Error("Channel Error (in)"))},u.onmessageerror=e=>{i(new Error("Channel Error (out)"))},e.postMessage({...a,__type:t,__port:h},{transfer:[h,...n]})}))}(globalThis,"operation",{args:t,operation:e,__token:this.meta.authToken},[],this.init.operationTimeout)}async emitEvent(e,t){this.postMessage("event",{event:e,args:t})}async pushState(e,t=!0){this.postMessage("state_push",{state:e,populate:t})}}({provider:"",out:{add:function(e,t){return Number.isInteger(e)||(e=0),Number.isInteger(t)||(t=0),e+t},substract:function(e,t){return Number.isInteger(e)||(e=0),Number.isInteger(t)||(t=0),e-t},logArea:function(e=1){let t;switch(Number.isInteger(e)||(e=1),s){case"circle":t=Math.PI*e*e;break;case"square":t=e*e;break;case"rectangle":t=e*e/2;default:t="unknown area"}console.log("Area of",s,"with width",e,":",t)}}}).addEventListener("shape_change",(e=>{s=e,console.log("Shape changed to",e)}))})();
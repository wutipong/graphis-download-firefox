!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},t=e.parcelRequiredb1b;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in n){let t=n[e];delete n[e];let s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,r){n[e]=r},e.parcelRequiredb1b=t),t.register("4KHtv",(function(e,r){!function(n,t){if("function"==typeof define&&define.amd)define("webextension-polyfill",["module"],t);else if(void 0!==r)t(e);else{var s={exports:{}};t(s),n.browser=s.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const r="The message port closed before a response was received.",n="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",t=e=>{const t={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(t).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class s extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const a=(r,n)=>(...t)=>{e.runtime.lastError?r.reject(new Error(e.runtime.lastError.message)):n.singleCallbackArg||t.length<=1&&!1!==n.singleCallbackArg?r.resolve(t[0]):r.resolve(t)},i=e=>1==e?"argument":"arguments",o=(e,r,n)=>new Proxy(r,{apply:(r,t,s)=>n.call(t,e,...s)});let g=Function.call.bind(Object.prototype.hasOwnProperty);const m=(e,r={},n={})=>{let t=Object.create(null),s={has:(r,n)=>n in e||n in t,get(s,l,c){if(l in t)return t[l];if(!(l in e))return;let A=e[l];if("function"==typeof A)if("function"==typeof r[l])A=o(e,e[l],r[l]);else if(g(n,l)){let r=((e,r)=>function(n,...t){if(t.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${i(r.minArgs)} for ${e}(), got ${t.length}`);if(t.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${i(r.maxArgs)} for ${e}(), got ${t.length}`);return new Promise(((s,i)=>{if(r.fallbackToNoCallback)try{n[e](...t,a({resolve:s,reject:i},r))}catch(a){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,a),n[e](...t),r.fallbackToNoCallback=!1,r.noCallback=!0,s()}else r.noCallback?(n[e](...t),s()):n[e](...t,a({resolve:s,reject:i},r))}))})(l,n[l]);A=o(e,e[l],r)}else A=A.bind(e);else if("object"==typeof A&&null!==A&&(g(r,l)||g(n,l)))A=m(A,r[l],n[l]);else{if(!g(n,"*"))return Object.defineProperty(t,l,{configurable:!0,enumerable:!0,get:()=>e[l],set(r){e[l]=r}}),A;A=m(A,r[l],n["*"])}return t[l]=A,A},set:(r,n,s,a)=>(n in t?t[n]=s:e[n]=s,!0),defineProperty:(e,r,n)=>Reflect.defineProperty(t,r,n),deleteProperty:(e,r)=>Reflect.deleteProperty(t,r)},l=Object.create(e);return new Proxy(l,s)},l=e=>({addListener(r,n,...t){r.addListener(e.get(n),...t)},hasListener:(r,n)=>r.hasListener(e.get(n)),removeListener(r,n){r.removeListener(e.get(n))}}),c=new s((e=>"function"!=typeof e?e:function(r){const n=m(r,{},{getContent:{minArgs:0,maxArgs:0}});e(n)}));let A=!1;const u=new s((e=>"function"!=typeof e?e:function(r,t,s){let a,i,o=!1,g=new Promise((e=>{a=function(r){A||(console.warn(n,(new Error).stack),A=!0),o=!0,e(r)}}));try{i=e(r,t,a)}catch(e){i=Promise.reject(e)}const m=!0!==i&&((l=i)&&"object"==typeof l&&"function"==typeof l.then);var l;if(!0!==i&&!m&&!o)return!1;const c=e=>{e.then((e=>{s(e)}),(e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",s({__mozWebExtensionPolyfillReject__:!0,message:r})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)}))};return c(m?i:g),!0})),d=({reject:n,resolve:t},s)=>{e.runtime.lastError?e.runtime.lastError.message===r?t():n(new Error(e.runtime.lastError.message)):s&&s.__mozWebExtensionPolyfillReject__?n(new Error(s.message)):t(s)},f=(e,r,n,...t)=>{if(t.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${i(r.minArgs)} for ${e}(), got ${t.length}`);if(t.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${i(r.maxArgs)} for ${e}(), got ${t.length}`);return new Promise(((e,r)=>{const s=d.bind(null,{resolve:e,reject:r});t.push(s),n.sendMessage(...t)}))},x={devtools:{network:{onRequestFinished:l(c)}},runtime:{onMessage:l(u),onMessageExternal:l(u),sendMessage:f.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:f.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},h={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return t.privacy={network:{"*":h},services:{"*":h},websites:{"*":h}},m(e,x,t)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");e.exports=t(chrome)}else e.exports=browser}))}));var s,a,i=t("4KHtv"),o={},g={},m=g={};function l(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function A(e){if(s===setTimeout)return setTimeout(e,0);if((s===l||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(r){try{return s.call(null,e,0)}catch(r){return s.call(this,e,0)}}}!function(){try{s="function"==typeof setTimeout?setTimeout:l}catch(e){s=l}try{a="function"==typeof clearTimeout?clearTimeout:c}catch(e){a=c}}();var u,d=[],f=!1,x=-1;function h(){f&&u&&(f=!1,u.length?d=u.concat(d):x=-1,d.length&&p())}function p(){if(!f){var e=A(h);f=!0;for(var r=d.length;r;){for(u=d,d=[];++x<r;)u&&u[x].run();x=-1,r=d.length}u=null,f=!1,function(e){if(a===clearTimeout)return clearTimeout(e);if((a===c||!a)&&clearTimeout)return a=clearTimeout,clearTimeout(e);try{a(e)}catch(r){try{return a.call(null,e)}catch(r){return a.call(this,e)}}}(e)}}function v(e,r){this.fun=e,this.array=r}function b(){}function y(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function w(e,r){for(var n,t="",s=0,a=-1,i=0,o=0;o<=e.length;++o){if(o<e.length)n=e.charCodeAt(o);else{if(47===n)break;n=47}if(47===n){if(a===o-1||1===i);else if(a!==o-1&&2===i){if(t.length<2||2!==s||46!==t.charCodeAt(t.length-1)||46!==t.charCodeAt(t.length-2))if(t.length>2){var g=t.lastIndexOf("/");if(g!==t.length-1){-1===g?(t="",s=0):s=(t=t.slice(0,g)).length-1-t.lastIndexOf("/"),a=o,i=0;continue}}else if(2===t.length||1===t.length){t="",s=0,a=o,i=0;continue}r&&(t.length>0?t+="/..":t="..",s=2)}else t.length>0?t+="/"+e.slice(a+1,o):t=e.slice(a+1,o),s=o-a-1;a=o,i=0}else 46===n&&-1!==i?++i:i=-1}return t}m.nextTick=function(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)r[n-1]=arguments[n];d.push(new v(e,r)),1!==d.length||f||A(p)},v.prototype.run=function(){this.fun.apply(null,this.array)},m.title="browser",m.browser=!0,m.env={},m.argv=[],m.version="",m.versions={},m.on=b,m.addListener=b,m.once=b,m.off=b,m.removeListener=b,m.removeAllListeners=b,m.emit=b,m.prependListener=b,m.prependOnceListener=b,m.listeners=function(e){return[]},m.binding=function(e){throw new Error("process.binding is not supported")},m.cwd=function(){return"/"},m.chdir=function(e){throw new Error("process.chdir is not supported")},m.umask=function(){return 0};var E={resolve:function(){for(var e,r="",n=!1,t=arguments.length-1;t>=-1&&!n;t--){var s;t>=0?s=arguments[t]:(void 0===e&&(e=g.cwd()),s=e),y(s),0!==s.length&&(r=s+"/"+r,n=47===s.charCodeAt(0))}return r=w(r,!n),n?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(e){if(y(e),0===e.length)return".";var r=47===e.charCodeAt(0),n=47===e.charCodeAt(e.length-1);return 0!==(e=w(e,!r)).length||r||(e="."),e.length>0&&n&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return y(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var n=arguments[r];y(n),n.length>0&&(void 0===e?e=n:e+="/"+n)}return void 0===e?".":E.normalize(e)},relative:function(e,r){if(y(e),y(r),e===r)return"";if((e=E.resolve(e))===(r=E.resolve(r)))return"";for(var n=1;n<e.length&&47===e.charCodeAt(n);++n);for(var t=e.length,s=t-n,a=1;a<r.length&&47===r.charCodeAt(a);++a);for(var i=r.length-a,o=s<i?s:i,g=-1,m=0;m<=o;++m){if(m===o){if(i>o){if(47===r.charCodeAt(a+m))return r.slice(a+m+1);if(0===m)return r.slice(a+m)}else s>o&&(47===e.charCodeAt(n+m)?g=m:0===m&&(g=0));break}var l=e.charCodeAt(n+m);if(l!==r.charCodeAt(a+m))break;47===l&&(g=m)}var c="";for(m=n+g+1;m<=t;++m)m!==t&&47!==e.charCodeAt(m)||(0===c.length?c+="..":c+="/..");return c.length>0?c+r.slice(a+g):(a+=g,47===r.charCodeAt(a)&&++a,r.slice(a))},_makeLong:function(e){return e},dirname:function(e){if(y(e),0===e.length)return".";for(var r=e.charCodeAt(0),n=47===r,t=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(r=e.charCodeAt(a))){if(!s){t=a;break}}else s=!1;return-1===t?n?"/":".":n&&1===t?"//":e.slice(0,t)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');y(e);var n,t=0,s=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var i=r.length-1,o=-1;for(n=e.length-1;n>=0;--n){var g=e.charCodeAt(n);if(47===g){if(!a){t=n+1;break}}else-1===o&&(a=!1,o=n+1),i>=0&&(g===r.charCodeAt(i)?-1==--i&&(s=n):(i=-1,s=o))}return t===s?s=o:-1===s&&(s=e.length),e.slice(t,s)}for(n=e.length-1;n>=0;--n)if(47===e.charCodeAt(n)){if(!a){t=n+1;break}}else-1===s&&(a=!1,s=n+1);return-1===s?"":e.slice(t,s)},extname:function(e){y(e);for(var r=-1,n=0,t=-1,s=!0,a=0,i=e.length-1;i>=0;--i){var o=e.charCodeAt(i);if(47!==o)-1===t&&(s=!1,t=i+1),46===o?-1===r?r=i:1!==a&&(a=1):-1!==r&&(a=-1);else if(!s){n=i+1;break}}return-1===r||-1===t||0===a||1===a&&r===t-1&&r===n+1?"":e.slice(r,t)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,r){var n=r.dir||r.root,t=r.base||(r.name||"")+(r.ext||"");return n?n===r.root?n+t:n+e+t:t}("/",e)},parse:function(e){y(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var n,t=e.charCodeAt(0),s=47===t;s?(r.root="/",n=1):n=0;for(var a=-1,i=0,o=-1,g=!0,m=e.length-1,l=0;m>=n;--m)if(47!==(t=e.charCodeAt(m)))-1===o&&(g=!1,o=m+1),46===t?-1===a?a=m:1!==l&&(l=1):-1!==a&&(l=-1);else if(!g){i=m+1;break}return-1===a||-1===o||0===l||1===l&&a===o-1&&a===i+1?-1!==o&&(r.base=r.name=0===i&&s?e.slice(1,o):e.slice(i,o)):(0===i&&s?(r.name=e.slice(1,a),r.base=e.slice(1,o)):(r.name=e.slice(i,a),r.base=e.slice(i,o)),r.ext=e.slice(a,o)),i>0?r.dir=e.slice(0,i-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};E.posix=E,o=E;let k=[];const T=document.getElementById("name"),C=document.getElementById("category"),L=document.getElementById("directory");function P(){const e=document.getElementById("history-list");e.innerHTML="",k.sort(((e,r)=>e.timestamp<r.timestamp)),k.length>25&&(k.length=25),k.forEach((function(r){const n=document.createElement("OPTION");n.innerHTML=r.key,e.appendChild(n)}))}i.storage.local.get(["name","history","category","directory"],(function(e){if(null!=e.name&&(T.value=e.name),k=e.history,null==k&&(k=[]),k.length>0&&(k[0]instanceof String||"string"==typeof k[0]))for(let e=0;e<k.length;e++){const r=k[e];k[e]={key:r,timestamp:Date.now()}}null!=e.category&&(C.selectedIndex=e.category),null!=e.directory&&(L.value=e.directory),P()})),T.addEventListener("change",(function(e){let r=T.value.replace("\\"," ");r=r.replace("/"," "),r=r.trim(),T.value=r,i.storage.local.set({name:r})})),L.addEventListener("change",(function(e){let r=L.value;r=r.trim(),L.value=r,i.storage.local.set({directory:r})})),C.addEventListener("change",(function(e){const r=C.selectedIndex;i.storage.local.set({category:r})}));document.getElementById("clear").addEventListener("click",(function(){T.value="";const e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),T.dispatchEvent(e)}));const I=document.getElementById("history-list");I.addEventListener("change",(function(){if(I.selectedIndex<0)return;const e=I.options[I.selectedIndex].text.split("\\");if(2===e.length){T.value=e[1];for(let r=0;r<C.options.length;r++)C.options[r].text===e[0]&&(C.selectedIndex=r)}else T.value=e[0];const r=document.createEvent("HTMLEvents");r.initEvent("change",!0,!1),T.dispatchEvent(r),C.dispatchEvent(r)}));document.getElementById("download").addEventListener("click",(function(){i.tabs.query({active:!0,currentWindow:!0},(function(e){i.tabs.sendMessage(e[0].id,{command:"download"},(function(e){const r=T.value,n=C[C.selectedIndex].text,t=n+"\\"+r,s=k.findIndex((e=>e.key===t));-1===s?k.unshift({key:t,timestamp:Date.now()}):k[s].timestamp=Date.now(),P(),i.storage.local.set({history:k});const a=o.join(0===L.value.length?"":L.value,n,r),g=[];e.urls.forEach((function(e){g.push({url:e.url,filename:o.join(a,e.name)})})),void 0===e.profile&&void 0===e.comments||function(e,r,n){const t={version:1,profile:r.profile,comments:r.comments},s=JSON.stringify(t),a=(new TextEncoder).encode(s),i=new Blob([a],{type:"application/json;charset=utf-8"}),g=URL.createObjectURL(i);e.push({url:g,filename:o.join(n,"info.json")})}(g,e,a),g.forEach((function(e){i.downloads.download({url:e.url,filename:e.filename})}))}))}))}));document.getElementById("paste").addEventListener("click",(async function(){const e=await navigator.clipboard.readText();T.value=e;const r=document.createEvent("HTMLEvents");r.initEvent("change",!0,!1),T.dispatchEvent(r)}));document.getElementById("populate").addEventListener("click",(function(){i.tabs.query({active:!0,currentWindow:!0},(function(e){i.tabs.sendMessage(e[0].id,{command:"populate"},(function(e){T.value=e.name;const r=document.createEvent("HTMLEvents");r.initEvent("change",!0,!1),T.dispatchEvent(r)}))}))}))}();
//# sourceMappingURL=popup.604bc9f8.js.map

!function(n,t){function e(n){var t=parseFloat(n)*u;return"string"==typeof n&&n.match(/rem$/)&&(t+="px"),t}function i(n){var t=parseFloat(n)/u;return"string"==typeof n&&n.match(/px$/)&&(t+="rem"),t}function o(){var t=s.getBoundingClientRect(),e=t.width,o=s.clientHeight;d.maxAspectRatio!==1/0&&d.maxAspectRatio<e/o&&(e=o),e=Math.min(e,d.maxWidth),u=100*e/d.designWidth,s.style.fontSize=u+"px";var r=n.getComputedStyle(s)["font-size"].replace(/px/gi,"");u!==r&&(s.style.fontSize=u*u/r+"px"),d.rem=u,d.info={dpr:c,rem:u,width:e,height:o,remWidth:i(e),remHeight:i(o)};for(var a=0,p=f.length;a<p;a++)f[a](d.info)}var r,a=n.document,s=a.documentElement,c=0,u="12px",f=[],d=t.flexible||(t.flexible={});d.info={},d.resize=function(n){f.push(n),n(d.info)};var p=n.navigator.appVersion.match(/iphone/gi),l=n.devicePixelRatio;c=p?l>=3&&(!c||c>=3)?3:l>=2&&(!c||c>=2)?2:1:1,d.dpr=n.dpr=c,d.refreshRem=o,d.rem2px=e,d.px2rem=i,d.init=function(t){var e={designWidth:750,maxWidth:1/0,maxAspectRatio:1/0};t=t||{};for(var i in e)d[i]=t[i]||e[i];s.setAttribute("data-dpr",c),"complete"===a.readyState?a.body.style.fontSize="12px":a.addEventListener("DOMContentLoaded",function(){a.body.style.fontSize="12px"},!1);var u="onorientationchange"in window?"orientationchange":"resize";n.addEventListener(u,function(){clearTimeout(r),r=setTimeout(o,100)},!1),n.addEventListener("pageshow",function(n){n.persisted&&(clearTimeout(r),r=setTimeout(o,100))},!1),o()}}(window,window.PAGECTRL||(window.PAGECTRL={})),function(n,t){function e(n,t,e,i){var o=n._historyData;o[t]=o[t]||[],o[t].push(e),i&&(i.done&&i.historyDataLength<1&&(i.historyDataLength=1),o[t].length>i.historyDataLength&&o[t].splice(0,o[t].length-i.historyDataLength))}function i(n,t){return n.hasOwnProperty(t)}function o(n,t,e){var i=n._historyData;if(e.done&&i[t])for(var o=i[t],r=0,s=o.length;r<s;r++){var c=o[r];a(n,t,c,e)}}function r(){this.clear()}var a=function(n,t,e,i){var o=n._historyData;i.listener.apply(i.context,[e,o[t]]),i.once&&n.off(t,i.listener)};r.prototype={clear:function(){var n=this;n._optionsMap={},n._historyData={}},on:function(n,t,e){var r=this,a=r._optionsMap;e=e||{};var s={done:!1,historyDataLength:0,context:r,once:!1,listener:t};for(var c in s)i(e,c)||(e[c]=s[c]);a[n]=a[n]||[],a[n].push(e),o(r,n,e)},once:function(n,t,e){var i=this;e=e||{},e.once=!0,i.on(n,t,e)},off:function(n,t){var e=this,o=e._optionsMap;if(void 0===t)delete o[n];else if(i(e._optionsMap,n)){for(var r=o[n],a=[],s=r.length;s--;)r[s].listener!==t&&a.unshift(r[s]);o[n]=a}},trigger:function(n,t){var o,r=this,s=r._optionsMap;if(i(r._optionsMap,n)){var c=s[n];e(r,n,t,c[0]);for(var u=0,f=c.length;u<f;u++)o=c[u],a(r,n,t,o)}else e(r,n,t,o)}},t.Event=t,t.event=new r}(window,window.PAGECTRL||(window.PAGECTRL={})),function(n,t){var e=function(){if(!/micromessenger/i.test(navigator.userAgent))return function(){};var n,t,e=function(){function n(n,t){for(var e=0,i=n.length;e<i;++e)if(!t(n[e]))return c;return 1}function t(t,e){n(t,function(n){return e(n),1})}function e(r,a,s){function c(n){return n.call?n():p[n]}function f(){if(!--w){p[v]=1,m&&m();for(var e in h)n(e.split("|"),c)&&!t(h[e],c)&&(h[e]=[])}}r=r[u]?r:[r];var d=a&&a.call,m=d?a:s,v=d?r.join(""):a,w=r.length;return setTimeout(function(){t(r,function n(t,e){return null===t?f():(e||/^https?:\/\//.test(t)||!o||(t=-1===t.indexOf(".js")?o+t+".js":o+t),g[t]?(v&&(l[v]=1),2==g[t]?f():setTimeout(function(){n(t,!0)},0)):(g[t]=1,v&&(l[v]=1),void i(t,f)))})},0),e}function i(n,t){var e,i=a.createElement("script");i.onload=i.onerror=i[d]=function(){i[f]&&!/^c|loade/.test(i[f])||e||(i.onload=i[d]=null,e=1,g[n]=2,t())},i.async=1,i.src=r?n+(-1===n.indexOf("?")?"?":"&")+r:n,s.insertBefore(i,s.lastChild)}var o,r,a=document,s=a.getElementsByTagName("head")[0],c=!1,u="push",f="readyState",d="onreadystatechange",p={},l={},h={},g={};return e.get=i,e.order=function(n,t,i){!function o(r){r=n.shift(),n.length?e(r,o):e(r,t,i)}()},e.path=function(n){o=n},e.urlArgs=function(n){r=n},e.ready=function(i,o,r){i=i[u]?i:[i];var a=[];return!t(i,function(n){p[n]||a[u](n)})&&n(i,function(n){return p[n]})?o():function(n){h[n]=h[n]||[],h[n][u](o),r&&r(a)}(i.join("|")),e},e.done=function(n){e([null],n)},e}(),i=!1,o="cb_3eb0d6a6_7dae_e792_47d6_379feae19526",r=document.location.protocol,a=[r+"//mp.sina.cn/aj/wechat/gettoken?callback="+o+"&url="+encodeURIComponent(window.location.href),r+"//res.wx.qq.com/open/js/jweixin-1.0.0.js"];return function(r){function s(e){t=e,i=!0,"function"==typeof r?r(t,n):(t.config({appId:n.appid,timestamp:n.time,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ"]}),t.ready(function(){t.onMenuShareAppMessage(r),t.onMenuShareTimeline(r),t.onMenuShareQQ(r)}))}window[o]=function(t){n=t.data},i?s(t):"function"==typeof define&&"function"==typeof require&&define.amd?require(a,function(n,t){s(t)}):(e(a,"all"),e.ready("all",function(){s(wx)}))}}();t.wxReady=e}(window,window.PAGECTRL||(window.PAGECTRL={})),function(n,t){var e=window.navigator.userAgent.toLowerCase();t.viewInfo={ua:e,isSports:/sinasports?/i.test(e),isNews:/sinanews?/i.test(e),isWX:/micromessenger?/i.test(e)}}(window,window.PAGEDATA||(window.PAGEDATA={}));

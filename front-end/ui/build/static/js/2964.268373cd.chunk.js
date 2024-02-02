"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[2964],{2964:function(e,t,n){n.d(t,{c:function(){return we}});var r="top",o="bottom",i="right",a="left",s="auto",f=[r,o,i,a],c="start",u="end",p="clippingParents",l="viewport",d="popper",h="reference",m=f.reduce((function(e,t){return e.concat([t+"-"+c,t+"-"+u])}),[]),v=[].concat(f,[s]).reduce((function(e,t){return e.concat([t,t+"-"+c,t+"-"+u])}),[]),g=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function y(e){return e?(e.nodeName||"").toLowerCase():null}function b(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function w(e){return e instanceof b(e).Element||e instanceof Element}function x(e){return e instanceof b(e).HTMLElement||e instanceof HTMLElement}function O(e){return"undefined"!==typeof ShadowRoot&&(e instanceof b(e).ShadowRoot||e instanceof ShadowRoot)}var j={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];x(o)&&y(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});x(r)&&y(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]};function E(e){return e.split("-")[0]}var D=Math.max,A=Math.min,k=Math.round;function L(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function W(){return!/^((?!chrome|android).)*safari/i.test(L())}function M(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&x(e)&&(o=e.offsetWidth>0&&k(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&k(r.height)/e.offsetHeight||1);var a=(w(e)?b(e):window).visualViewport,s=!W()&&n,f=(r.left+(s&&a?a.offsetLeft:0))/o,c=(r.top+(s&&a?a.offsetTop:0))/i,u=r.width/o,p=r.height/i;return{width:u,height:p,top:c,right:f+u,bottom:c+p,left:f,x:f,y:c}}function P(e){var t=M(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function B(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&O(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function H(e){return b(e).getComputedStyle(e)}function R(e){return["table","td","th"].indexOf(y(e))>=0}function T(e){return((w(e)?e.ownerDocument:e.document)||window.document).documentElement}function C(e){return"html"===y(e)?e:e.assignedSlot||e.parentNode||(O(e)?e.host:null)||T(e)}function S(e){return x(e)&&"fixed"!==H(e).position?e.offsetParent:null}function V(e){for(var t=b(e),n=S(e);n&&R(n)&&"static"===H(n).position;)n=S(n);return n&&("html"===y(n)||"body"===y(n)&&"static"===H(n).position)?t:n||function(e){var t=/firefox/i.test(L());if(/Trident/i.test(L())&&x(e)&&"fixed"===H(e).position)return null;var n=C(e);for(O(n)&&(n=n.host);x(n)&&["html","body"].indexOf(y(n))<0;){var r=H(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}function q(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function N(e,t,n){return D(e,A(t,n))}function I(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function F(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var U={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,s=e.name,c=e.options,u=n.elements.arrow,p=n.modifiersData.popperOffsets,l=E(n.placement),d=q(l),h=[a,i].indexOf(l)>=0?"height":"width";if(u&&p){var m=function(e,t){return I("number"!==typeof(e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:F(e,f))}(c.padding,n),v=P(u),g="y"===d?r:a,y="y"===d?o:i,b=n.rects.reference[h]+n.rects.reference[d]-p[d]-n.rects.popper[h],w=p[d]-n.rects.reference[d],x=V(u),O=x?"y"===d?x.clientHeight||0:x.clientWidth||0:0,j=b/2-w/2,D=m[g],A=O-v[h]-m[y],k=O/2-v[h]/2+j,L=N(D,k,A),W=d;n.modifiersData[s]=((t={})[W]=L,t.centerOffset=L-k,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r)))&&B(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function z(e){return e.split("-")[1]}var _={top:"auto",right:"auto",bottom:"auto",left:"auto"};function X(e){var t,n=e.popper,s=e.popperRect,f=e.placement,c=e.variation,p=e.offsets,l=e.position,d=e.gpuAcceleration,h=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=p.x,y=void 0===g?0:g,w=p.y,x=void 0===w?0:w,O="function"===typeof m?m({x:y,y:x}):{x:y,y:x};y=O.x,x=O.y;var j=p.hasOwnProperty("x"),E=p.hasOwnProperty("y"),D=a,A=r,L=window;if(h){var W=V(n),M="clientHeight",P="clientWidth";if(W===b(n)&&"static"!==H(W=T(n)).position&&"absolute"===l&&(M="scrollHeight",P="scrollWidth"),f===r||(f===a||f===i)&&c===u)A=o,x-=(v&&W===L&&L.visualViewport?L.visualViewport.height:W[M])-s.height,x*=d?1:-1;if(f===a||(f===r||f===o)&&c===u)D=i,y-=(v&&W===L&&L.visualViewport?L.visualViewport.width:W[P])-s.width,y*=d?1:-1}var B,R=Object.assign({position:l},h&&_),C=!0===m?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:k(n*o)/o||0,y:k(r*o)/o||0}}({x:y,y:x},b(n)):{x:y,y:x};return y=C.x,x=C.y,d?Object.assign({},R,((B={})[A]=E?"0":"",B[D]=j?"0":"",B.transform=(L.devicePixelRatio||1)<=1?"translate("+y+"px, "+x+"px)":"translate3d("+y+"px, "+x+"px, 0)",B)):Object.assign({},R,((t={})[A]=E?x+"px":"",t[D]=j?y+"px":"",t.transform="",t))}var Y={passive:!0};var G={left:"right",right:"left",bottom:"top",top:"bottom"};function J(e){return e.replace(/left|right|bottom|top/g,(function(e){return G[e]}))}var K={start:"end",end:"start"};function Q(e){return e.replace(/start|end/g,(function(e){return K[e]}))}function Z(e){var t=b(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function $(e){return M(T(e)).left+Z(e).scrollLeft}function ee(e){var t=H(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function te(e){return["html","body","#document"].indexOf(y(e))>=0?e.ownerDocument.body:x(e)&&ee(e)?e:te(C(e))}function ne(e,t){var n;void 0===t&&(t=[]);var r=te(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=b(r),a=o?[i].concat(i.visualViewport||[],ee(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(ne(C(a)))}function re(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function oe(e,t,n){return t===l?re(function(e,t){var n=b(e),r=T(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,f=0;if(o){i=o.width,a=o.height;var c=W();(c||!c&&"fixed"===t)&&(s=o.offsetLeft,f=o.offsetTop)}return{width:i,height:a,x:s+$(e),y:f}}(e,n)):w(t)?function(e,t){var n=M(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):re(function(e){var t,n=T(e),r=Z(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=D(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=D(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+$(e),f=-r.scrollTop;return"rtl"===H(o||n).direction&&(s+=D(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(T(e)))}function ie(e,t,n,r){var o="clippingParents"===t?function(e){var t=ne(C(e)),n=["absolute","fixed"].indexOf(H(e).position)>=0&&x(e)?V(e):e;return w(n)?t.filter((function(e){return w(e)&&B(e,n)&&"body"!==y(e)})):[]}(e):[].concat(t),i=[].concat(o,[n]),a=i[0],s=i.reduce((function(t,n){var o=oe(e,n,r);return t.top=D(o.top,t.top),t.right=A(o.right,t.right),t.bottom=A(o.bottom,t.bottom),t.left=D(o.left,t.left),t}),oe(e,a,r));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function ae(e){var t,n=e.reference,s=e.element,f=e.placement,p=f?E(f):null,l=f?z(f):null,d=n.x+n.width/2-s.width/2,h=n.y+n.height/2-s.height/2;switch(p){case r:t={x:d,y:n.y-s.height};break;case o:t={x:d,y:n.y+n.height};break;case i:t={x:n.x+n.width,y:h};break;case a:t={x:n.x-s.width,y:h};break;default:t={x:n.x,y:n.y}}var m=p?q(p):null;if(null!=m){var v="y"===m?"height":"width";switch(l){case c:t[m]=t[m]-(n[v]/2-s[v]/2);break;case u:t[m]=t[m]+(n[v]/2-s[v]/2)}}return t}function se(e,t){void 0===t&&(t={});var n=t,a=n.placement,s=void 0===a?e.placement:a,c=n.strategy,u=void 0===c?e.strategy:c,m=n.boundary,v=void 0===m?p:m,g=n.rootBoundary,y=void 0===g?l:g,b=n.elementContext,x=void 0===b?d:b,O=n.altBoundary,j=void 0!==O&&O,E=n.padding,D=void 0===E?0:E,A=I("number"!==typeof D?D:F(D,f)),k=x===d?h:d,L=e.rects.popper,W=e.elements[j?k:x],P=ie(w(W)?W:W.contextElement||T(e.elements.popper),v,y,u),B=M(e.elements.reference),H=ae({reference:B,element:L,strategy:"absolute",placement:s}),R=re(Object.assign({},L,H)),C=x===d?R:B,S={top:P.top-C.top+A.top,bottom:C.bottom-P.bottom+A.bottom,left:P.left-C.left+A.left,right:C.right-P.right+A.right},V=e.modifiersData.offset;if(x===d&&V){var q=V[s];Object.keys(S).forEach((function(e){var t=[i,o].indexOf(e)>=0?1:-1,n=[r,o].indexOf(e)>=0?"y":"x";S[e]+=q[n]*t}))}return S}function fe(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,c=n.allowedAutoPlacements,u=void 0===c?v:c,p=z(r),l=p?s?m:m.filter((function(e){return z(e)===p})):f,d=l.filter((function(e){return u.indexOf(e)>=0}));0===d.length&&(d=l);var h=d.reduce((function(t,n){return t[n]=se(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[E(n)],t}),{});return Object.keys(h).sort((function(e,t){return h[e]-h[t]}))}var ce={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,f=e.name;if(!t.modifiersData[f]._skip){for(var u=n.mainAxis,p=void 0===u||u,l=n.altAxis,d=void 0===l||l,h=n.fallbackPlacements,m=n.padding,v=n.boundary,g=n.rootBoundary,y=n.altBoundary,b=n.flipVariations,w=void 0===b||b,x=n.allowedAutoPlacements,O=t.options.placement,j=E(O),D=h||(j===O||!w?[J(O)]:function(e){if(E(e)===s)return[];var t=J(e);return[Q(e),t,Q(t)]}(O)),A=[O].concat(D).reduce((function(e,n){return e.concat(E(n)===s?fe(t,{placement:n,boundary:v,rootBoundary:g,padding:m,flipVariations:w,allowedAutoPlacements:x}):n)}),[]),k=t.rects.reference,L=t.rects.popper,W=new Map,M=!0,P=A[0],B=0;B<A.length;B++){var H=A[B],R=E(H),T=z(H)===c,C=[r,o].indexOf(R)>=0,S=C?"width":"height",V=se(t,{placement:H,boundary:v,rootBoundary:g,altBoundary:y,padding:m}),q=C?T?i:a:T?o:r;k[S]>L[S]&&(q=J(q));var N=J(q),I=[];if(p&&I.push(V[R]<=0),d&&I.push(V[q]<=0,V[N]<=0),I.every((function(e){return e}))){P=H,M=!1;break}W.set(H,I)}if(M)for(var F=function(e){var t=A.find((function(t){var n=W.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return P=t,"break"},U=w?3:1;U>0;U--){if("break"===F(U))break}t.placement!==P&&(t.modifiersData[f]._skip=!0,t.placement=P,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ue(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function pe(e){return[r,i,o,a].some((function(t){return e[t]>=0}))}var le={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,s=n.offset,f=void 0===s?[0,0]:s,c=v.reduce((function(e,n){return e[n]=function(e,t,n){var o=E(e),s=[a,r].indexOf(o)>=0?-1:1,f="function"===typeof n?n(Object.assign({},t,{placement:e})):n,c=f[0],u=f[1];return c=c||0,u=(u||0)*s,[a,i].indexOf(o)>=0?{x:u,y:c}:{x:c,y:u}}(n,t.rects,f),e}),{}),u=c[t.placement],p=u.x,l=u.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=l),t.modifiersData[o]=c}};var de={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,s=e.name,f=n.mainAxis,u=void 0===f||f,p=n.altAxis,l=void 0!==p&&p,d=n.boundary,h=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,y=void 0===g||g,b=n.tetherOffset,w=void 0===b?0:b,x=se(t,{boundary:d,rootBoundary:h,padding:v,altBoundary:m}),O=E(t.placement),j=z(t.placement),k=!j,L=q(O),W="x"===L?"y":"x",M=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,R="function"===typeof w?w(Object.assign({},t.rects,{placement:t.placement})):w,T="number"===typeof R?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,S={x:0,y:0};if(M){if(u){var I,F="y"===L?r:a,U="y"===L?o:i,_="y"===L?"height":"width",X=M[L],Y=X+x[F],G=X-x[U],J=y?-H[_]/2:0,K=j===c?B[_]:H[_],Q=j===c?-H[_]:-B[_],Z=t.elements.arrow,$=y&&Z?P(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[F],ne=ee[U],re=N(0,B[_],$[_]),oe=k?B[_]/2-J-re-te-T.mainAxis:K-re-te-T.mainAxis,ie=k?-B[_]/2+J+re+ne+T.mainAxis:Q+re+ne+T.mainAxis,ae=t.elements.arrow&&V(t.elements.arrow),fe=ae?"y"===L?ae.clientTop||0:ae.clientLeft||0:0,ce=null!=(I=null==C?void 0:C[L])?I:0,ue=X+ie-ce,pe=N(y?A(Y,X+oe-ce-fe):Y,X,y?D(G,ue):G);M[L]=pe,S[L]=pe-X}if(l){var le,de="x"===L?r:a,he="x"===L?o:i,me=M[W],ve="y"===W?"height":"width",ge=me+x[de],ye=me-x[he],be=-1!==[r,a].indexOf(O),we=null!=(le=null==C?void 0:C[W])?le:0,xe=be?ge:me-B[ve]-H[ve]-we+T.altAxis,Oe=be?me+B[ve]+H[ve]-we-T.altAxis:ye,je=y&&be?function(e,t,n){var r=N(e,t,n);return r>n?n:r}(xe,me,Oe):N(y?xe:ge,me,y?Oe:ye);M[W]=je,S[W]=je-me}t.modifiersData[s]=S}},requiresIfExists:["offset"]};function he(e,t,n){void 0===n&&(n=!1);var r=x(t),o=x(t)&&function(e){var t=e.getBoundingClientRect(),n=k(t.width)/e.offsetWidth||1,r=k(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),i=T(t),a=M(e,o,n),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(r||!r&&!n)&&(("body"!==y(t)||ee(i))&&(s=function(e){return e!==b(e)&&x(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:Z(e);var t}(t)),x(t)?((f=M(t,!0)).x+=t.clientLeft,f.y+=t.clientTop):i&&(f.x=$(i))),{x:a.left+s.scrollLeft-f.x,y:a.top+s.scrollTop-f.y,width:a.width,height:a.height}}function me(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function ve(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var ge={placement:"bottom",modifiers:[],strategy:"absolute"};function ye(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function be(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?ge:o;return function(e,t,n){void 0===n&&(n=i);var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},ge,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],s=!1,f={state:o,setOptions:function(n){var s="function"===typeof n?n(o.options):n;c(),o.options=Object.assign({},i,o.options,s),o.scrollParents={reference:w(e)?ne(e):e.contextElement?ne(e.contextElement):[],popper:ne(t)};var u=function(e){var t=me(e);return g.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)));return o.orderedModifiers=u.filter((function(e){return e.enabled})),o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect;if("function"===typeof i){var s=i({state:o,name:t,instance:f,options:r}),c=function(){};a.push(s||c)}})),f.update()},forceUpdate:function(){if(!s){var e=o.elements,t=e.reference,n=e.popper;if(ye(t,n)){o.rects={reference:he(t,V(n),"fixed"===o.options.strategy),popper:P(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,c=i.options,u=void 0===c?{}:c,p=i.name;"function"===typeof a&&(o=a({state:o,options:u,name:p,instance:f})||o)}else o.reset=!1,r=-1}}},update:ve((function(){return new Promise((function(e){f.forceUpdate(),e(o)}))})),destroy:function(){c(),s=!0}};if(!ye(e,t))return f;function c(){a.forEach((function(e){return e()})),a=[]}return f.setOptions(n).then((function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var we=be({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,f=b(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach((function(e){e.addEventListener("scroll",n.update,Y)})),s&&f.addEventListener("resize",n.update,Y),function(){i&&c.forEach((function(e){e.removeEventListener("scroll",n.update,Y)})),s&&f.removeEventListener("resize",n.update,Y)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=ae({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:E(t.placement),variation:z(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,X(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,X(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},j,le,ce,de,U,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=se(t,{elementContext:"reference"}),s=se(t,{altBoundary:!0}),f=ue(a,r),c=ue(s,o,i),u=pe(f),p=pe(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":p})}}]})}}]);
//# sourceMappingURL=2964.268373cd.chunk.js.map
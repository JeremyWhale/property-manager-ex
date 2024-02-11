import{r as l,h as r,g as c}from"./index-CXEYW8wC.js";import{o as d,a as b}from"./helpers-c597f246-uPXFvDyQ.js";import"./types-6f6b41a5-azgwIdyq.js";const p=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z"/>
</svg>
`,h=`/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block;position:absolute;right:0}button{position:fixed;right:var(--ic-space-md);bottom:var(--ic-space-md);height:2.5rem;align-items:center;padding:var(--ic-space-xs) var(--ic-space-md) var(--ic-space-xs)
    var(--ic-space-sm);margin:0;gap:var(--ic-space-xs);display:flex;background-color:var(--ic-architectural-white);border:var(--ic-border-width) solid var(--ic-action-default);outline-width:inherit;box-sizing:border-box;box-shadow:var(--ic-elevation-overlay);border-radius:5rem;text-decoration:none;visibility:hidden;opacity:0;transition:visibility 0s linear var(--ic-transition-duration-slow),
    opacity var(--ic-transition-duration-slow);cursor:pointer;z-index:var(--ic-z-index-back-to-top)}button:hover{text-decoration:none;background-color:var(--ic-action-default-bg-hover-no-alpha);border:var(--ic-border-width) solid var(--ic-action-default-hover)}button:active{text-decoration:none;background-color:var(--ic-action-default-bg-active-no-alpha);border:var(--ic-border-width) solid var(--ic-action-default-active)}button:focus{box-shadow:var(--ic-border-focus)}.ic-back-to-top-link.show{visibility:visible;opacity:1;transition:visibility 0s linear 0s,
    opacity var(--ic-transition-duration-slow),
    box-shadow var(--ic-easing-transition-fast)}.ic-back-to-top-link.by-footer{position:relative;right:var(--ic-space-md);bottom:3.5rem}.ic-back-to-top-link.offset-banner{margin-bottom:var(--ic-space-lg)}.ic-back-to-top-icon{fill:var(--ic-action-default);padding-left:var(--ic-space-xxs);padding-top:var(--ic-space-xxxs)}.ic-back-to-top-icon>svg{height:var(--ic-space-md);width:var(--ic-space-md);display:inline-block}.ic-back-to-top-link span{color:var(--ic-action-default)}.ic-back-to-top-link:hover .ic-back-to-top-icon{fill:var(--ic-action-default-hover)}.ic-back-to-top-link:hover span{color:var(--ic-action-default-hover)}@media (forced-colors: active){.ic-back-to-top-icon{fill:currentcolor}}`,a="Back to top",u=class{constructor(e){l(this,e),this.topObserver=null,this.setTargetElVisible=t=>{this.targetElVisible=t},this.setFooterVisible=t=>{this.checkForClassificationBanner(),typeof window<"u"&&window.scrollY===0?this.footerVisible=!1:this.footerVisible=t},this.targetElObserverCallback=t=>{this.setTargetElVisible(t[0].isIntersecting)},this.footerObserverCallback=t=>{this.setFooterVisible(t[0].isIntersecting)},this.findTargetEl=t=>{let o=null;return t==null?console.log("Error: No target ID specified for back to top component - defaulting to top of page"):(o=document.querySelector(t.indexOf("#")===0?t:"#"+t),o===null&&console.log(`Error: Back to top target element '${t}' not found - defaulting to top of page`)),o},this.createTopObserver=t=>{this.targetEl=this.findTargetEl(t);let o;if(this.topObserver!==null){const n=document.querySelector("#ic-back-to-top-target");n!==null&&(this.topObserver.unobserve(n),n.remove())}this.targetEl===null?(o=document.body,this.targetEl=o.firstElementChild,this.isTargetElNull=!0):(o=this.targetEl.parentNode,this.isTargetElNull=!1);const i=document.createElement("div");i.setAttribute("id","ic-back-to-top-target"),o.insertBefore(i,this.targetEl);const s=getComputedStyle(this.targetEl).marginTop;this.topObserver=new IntersectionObserver(this.targetElObserverCallback,{threshold:[0],rootMargin:`${s} 0px 0px 0px`}),this.topObserver.observe(i)},this.handleClick=()=>{this.isTargetElNull?window.scrollTo(0,0):this.targetEl.scrollIntoView()},this.checkForClassificationBanner=()=>{const t=document.querySelectorAll("ic-classification-banner:not([inline='true'])");this.bannerOffset=t.length>0},this.bannerOffset=!1,this.footerVisible=!1,this.targetElVisible=!0,this.target=void 0}watchPropHandler(e,t){d(t,e,()=>{this.createTopObserver(e)})}componentWillLoad(){this.createTopObserver(this.target),this.checkForClassificationBanner();let e=document.querySelectorAll("ic-footer");if(e.length===0&&(e=document.querySelectorAll("footer")),e.length){const t=e[e.length-1],o=this.bannerOffset?.15:0;new IntersectionObserver(this.footerObserverCallback,{threshold:[o]}).observe(t)}}componentDidLoad(){b([{prop:this.target,propName:"target"}],"Back to Top")}render(){const{bannerOffset:e,targetElVisible:t,footerVisible:o}=this;return r("button",{class:{"ic-back-to-top-link":!0,"offset-banner":e,show:!t,"by-footer":o},"aria-label":a,onClick:this.handleClick},r("span",{class:"ic-back-to-top-icon",innerHTML:p}),r("ic-typography",{variant:"subtitle-small"},r("span",null,a)))}static get delegatesFocus(){return!0}get el(){return c(this)}static get watchers(){return{target:["watchPropHandler"]}}};u.style=h;export{u as ic_back_to_top};

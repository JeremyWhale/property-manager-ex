import{r as h,c as u,h as e,H as p,g as b}from"./index-PlWJ260r.js";import{c as v}from"./close-icon-539ec8d1-vKrvZSL7.js";import{i as r,V as c,d as g,a as f,L as y}from"./helpers-c597f246-uPXFvDyQ.js";import{I as w}from"./types-6f6b41a5-azgwIdyq.js";const x='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{--bottom-position:var(--ic-space-xl);position:fixed;bottom:var(--bottom-position);left:50%;transform:translate(-50%);animation:fadein var(--ic-transition-duration-slow) ease-in-out;z-index:var(--ic-z-index-toast)}:host(.hidden){display:none;animation:fadeout var(--ic-transition-duration-slow) ease-in-out}.container{max-width:32.5rem;min-width:18rem;box-shadow:var(--ic-elevation-overlay);min-height:3.5rem;background-color:var(--ic-architectural-800);color:var(--ic-color-white-text);display:flex;align-items:center;position:relative;border-radius:var(--ic-border-radius)}.toast-icon-container{height:100%;display:flex;align-items:center}.divider{height:100%;width:var(--ic-space-xs);position:absolute;border-radius:var(--ic-space-xxxs) 0 0 var(--ic-space-xxxs)}.divider-neutral{background-color:var(--ic-status-unknown)}.divider-info{background-color:var(--ic-status-info-contrast)}.divider-warning{background-color:var(--ic-status-warning-contrast)}.divider-error{background-color:var(--ic-status-error-contrast)}.divider-success{background-color:var(--ic-status-success-contrast)}.toast-icon,::slotted(svg){height:var(--ic-space-lg);width:var(--ic-space-lg);margin-left:var(--ic-space-md)}:host([variant="neutral"]) .toast-icon svg,::slotted(svg){fill:var(--ic-status-unknown)}:host([variant="info"]) .toast-icon svg{fill:var(--ic-status-info-contrast)}:host([variant="warning"]) .toast-icon svg{fill:var(--ic-status-warning-contrast)}:host([variant="error"]) .toast-icon svg{fill:var(--ic-status-error-contrast)}:host([variant="success"]) .toast-icon svg{fill:var(--ic-status-success-contrast)}.toast-content{margin-left:var(--ic-space-xs);width:100%}.no-icon{margin-left:var(--ic-space-md)}.toast-message{padding:var(--ic-space-xs) var(--ic-space-xs) var(--ic-space-xs) 0}.toast-action-container{padding-bottom:var(--ic-space-md)}ic-button,.toast-dismiss-timer{padding:var(--ic-space-xs)}@media (max-width: 576px){:host{--bottom-position:var(--ic-space-lg);width:calc(100% - 2 * var(--ic-space-md))}}@media (min-width: 993px){:host{--bottom-position:calc(var(--ic-space-xl) + var(--ic-space-xs))}}@media (forced-colors: active){.container{border:var(--ic-hc-border)}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:var(--bottom-position);opacity:1}}@keyframes fadeout{from{bottom:var(--bottom-position);opacity:1}to{bottom:0;opacity:0}}',l=1e3,k=70,T=140,I=class{constructor(t){h(this,t),this.icDismiss=u(this,"icDismiss",7),this.interactiveElements=[],this.dismissAction=()=>{this.icDismiss.emit()},this.handleProgressChange=()=>{this.timerProgress-=l/this.autoDismissTimeout*100},this.timerProgress=100,this.visible=!1,this.autoDismissTimeout=5e3,this.dismissButtonAriaLabel="dismiss",this.dismissMode="manual",this.heading=void 0,this.message=void 0,this.neutralIconAriaLabel=void 0,this.variant=void 0}disconnectedCallback(){window.clearTimeout(this.dismissTimeout),window.clearInterval(this.timerRefreshInterval)}componentWillLoad(){var t,i;if(this.handleLongText(this.heading.length>k,((t=this.message)===null||t===void 0?void 0:t.length)>T),this.autoDismissTimeout<5e3&&(this.autoDismissTimeout=5e3),r(this.el,"action")&&(this.dismissMode="manual"),this.isManual=this.dismissMode==="manual",r(this.el,"neutral-icon")&&(this.variant="neutral"),this.variant==="neutral"&&(this.neutralVariantLabel=(i=this.neutralIconAriaLabel)!==null&&i!==void 0?i:c[this.variant].ariaLabel),this.isManual){const s=g(this.message)?`. ${this.message}`:"";this.el.setAttribute("aria-label",this.variant?this.neutralVariantLabel||c[this.variant].ariaLabel:this.heading),(this.variant||this.message)&&this.el.setAttribute("aria-description",this.variant?`${this.heading}${s}`:this.message)}}componentDidLoad(){f([{prop:this.heading,propName:"heading"}],"Toast");const t=y(this.el,"action"),i=this.el.shadowRoot.querySelector("ic-button");t&&this.interactiveElements.push(t),i&&this.interactiveElements.push(i)}handleDismiss(){this.visible=!1,clearInterval(this.timerRefreshInterval),this.timerProgress=100}handleKeyboard(t){if(this.isManual&&this.visible)switch(t.key){case"Tab":t.preventDefault(),this.findNextInteractiveElement(t.shiftKey).setFocus();break;case"Escape":!t.repeat&&this.dismissAction(),t.stopImmediatePropagation();break}}handleTimer(t){if(!this.isManual)switch(t.type){case"mouseenter":window.clearTimeout(this.dismissTimeout),window.clearInterval(this.timerRefreshInterval),this.timerProgress=100;break;case"mouseleave":this.dismissTimeout=window.setTimeout(this.dismissAction,this.autoDismissTimeout),this.timerRefreshInterval=window.setInterval(this.handleProgressChange,l);break}}async setVisible(){return this.visible||(this.visible=!0),this.isManual?(window.setTimeout(()=>this.interactiveElements[0].setFocus(),200),document.activeElement):(this.dismissTimeout=window.setTimeout(this.dismissAction,this.autoDismissTimeout),this.timerRefreshInterval=window.setInterval(this.handleProgressChange,l),null)}handleLongText(t,i){(i||t)&&console.error(`Too many characters in toast ${t?"heading":""}${t&&i?" and ":""}${i?"message":""}. Refer to character limits specified in the prop description`)}findNextInteractiveElement(t){const i=this.interactiveElements[0],s=this.interactiveElements[this.interactiveElements.length-1],a=t?i:s,o=t?s:i;if(this.isActive(a))return o;let n;return this.interactiveElements.some((d,m)=>this.isActive(d)?(n=m,!0):!1)?this.interactiveElements[n+(t?-1:1)]:i}isActive(t){return t===this.el?!!this.el.shadowRoot.activeElement:document.activeElement===t}render(){const{variant:t,heading:i,message:s,visible:a,isManual:o,dismissButtonAriaLabel:n}=this;return e(p,{class:{hidden:!a},role:o?"dialog":"status"},e("div",{class:"container"},t&&a&&e("div",{class:"toast-icon-container"},e("div",{class:{divider:!0,[`divider-${t}`]:!0}}),t==="neutral"?e("slot",{name:"neutral-icon"}):e("span",{class:"toast-icon",innerHTML:c[t].icon})),e("div",{class:{"toast-content":!0,"no-icon":t==="neutral"&&!r(this.el,"neutral-icon")}},e("div",{class:"toast-message"},e("ic-typography",{variant:"subtitle-large"},a&&e("h5",null,i)),s&&e("ic-typography",{variant:"body"},a&&e("p",null,s))),r(this.el,"action")&&e("div",{class:"toast-action-container"},e("slot",{name:"action"}))),o?e("ic-button",{id:"dismiss-button",innerHTML:v,onClick:this.dismissAction,variant:"icon",appearance:w.Light,"aria-label":n}):e("ic-loading-indicator",{class:"toast-dismiss-timer",appearance:"light",size:"icon",progress:this.timerProgress})))}get el(){return b(this)}};I.style=x;export{I as ic_toast};

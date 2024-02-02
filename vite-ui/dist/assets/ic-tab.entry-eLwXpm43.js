import{r as s,c as i,h as e,H as n,g as r}from"./index-PlWJ260r.js";import{I as c}from"./types-6f6b41a5-azgwIdyq.js";import{j as l,i as d}from"./helpers-c597f246-uPXFvDyQ.js";const b=`/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{--indicator-initial-color:rgba(23 89 188 / 0%);--indicator-color:var(--ic-action-default);--focus-indicator:var(--ic-border-focus);--label-color:var(--ic-color-primary-text);--background-color-hover:var(--ic-action-default-bg-hover);--background-color-active:var(--ic-action-default-bg-active);display:flex;align-items:center;border-radius:0;color:var(--label-color);height:2.5rem;padding:0 var(--ic-space-md);cursor:pointer;position:relative;border-bottom:var(--ic-space-xxs) solid var(--indicator-initial-color);gap:var(--ic-space-xs);transition:all var(--ic-easing-transition-fast)}:host(:focus){box-shadow:var(--focus-indicator);border-radius:var(--ic-border-radius)}:host(:focus-visible){outline:var(--ic-hc-focus-outline)}:host(:hover){background-color:var(--background-color-hover)}:host(:active){background-color:var(--background-color-active)}:host(.ic-tab-light){--indicator-initial-color:rgb(255 255 255 / 0%);--indicator-color:rgb(255 255 255 / 100%);--focus-indicator:var(--ic-border-focus);--label-color:white;--background-color-hover:var(--ic-action-dark-bg-hover);--background-color-active:var(--ic-action-dark-bg-active)}:host(.selected){border-bottom:var(--ic-space-xxs) solid var(--indicator-color)}:host(.disabled){pointer-events:none;color:var(--ic-architectural-300)}:host(.selected.with-transition){transition:all var(--ic-easing-transition-slow),
    border-color var(--ic-transition-duration-slow)}.ic-tab-label{pointer-events:none}::slotted(svg){fill:currentcolor}@media (forced-colors: active){:host{border-bottom:var(--ic-space-xxs) solid canvas}:host(.disabled){color:GrayText}}`,h=class{constructor(t){s(this,t),this.tabClick=i(this,"tabClick",7),this.tabCreated=i(this,"tabCreated",7),this.tabEnabled=i(this,"tabEnabled",7),this.tabFocus=i(this,"tabFocus",7),this.tabRemoved=i(this,"tabRemoved",7),this.focusFromClick=!1,this.isInitialRender=!0,this.handleClick=()=>{this.tabClick.emit({tabId:this.tabId,contextId:this.contextId,position:this.tabPosition}),this.focusFromClick&&(this.tabFocus.emit({tabId:this.tabId,contextId:this.contextId,position:this.tabPosition}),this.focusFromClick=!1)},this.handleFocus=()=>{this.focusFromClick||(this.focusTabId=this.tabId,this.tabFocus.emit({tabId:this.tabId,contextId:this.contextId,position:this.tabPosition}))},this.handleMouseDown=()=>{this.focusFromClick=!0},this.appearance="dark",this.contextId="default",this.disabled=!1,this.selected=!1,this.tabId=void 0,this.tabPosition=void 0}disabledWatchHandler(){this.tabEnabled.emit()}connectedCallback(){this.tabCreated.emit(this.el)}disconnectedCallback(){const t=document.querySelector(`ic-tab-context[context-id=${this.contextId}]`);t&&t.tabRemovedHandler(!!this.focusTabId)}componentWillLoad(){l(this.disabled,this.el)}componentDidUpdate(){this.isInitialRender=!1}async setFocus(){this.el&&this.el.focus()}render(){const{disabled:t,selected:o,appearance:a}=this;return e(n,{class:{"with-transition":!this.isInitialRender,"ic-tab-light":a===c.Light,selected:o,disabled:t},role:"tab","aria-selected":o?"true":"false",onClick:this.handleClick,onFocus:this.handleFocus,onMouseDown:this.handleMouseDown,"aria-disabled":t?"true":"false",tabindex:this.selected?0:-1},this.el.querySelector('[slot="icon"]')&&e("slot",{name:"icon"}),e("ic-typography",{class:"ic-tab-label",variant:"label"},e("span",null,e("slot",null))),d(this.el,"badge")&&e("slot",{name:"badge"}))}get el(){return r(this)}static get watchers(){return{disabled:["disabledWatchHandler"]}}};h.style=b;export{h as ic_tab};

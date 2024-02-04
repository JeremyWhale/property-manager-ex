import{r as a,h as i,H as s,g as r}from"./index-zYbNANVr.js";const d='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}.group-title-container{padding:var(--ic-space-xs);display:flex;justify-content:space-between;align-items:center}:host(.small) .group-title-container{padding:var(--ic-space-xxs) var(--ic-space-xs)}:host(.large) .group-title-container{padding:var(--ic-space-sm) var(--ic-space-xs)}:host(.light){color:var(--ic-architectural-white)}:host(.accordion-group.dark) ::slotted(ic-accordion){color:var(--ic-architectural-white)}';let c=0;const l=class{constructor(t){a(this,t),this.accordionGroupId=`ic-accordion-group-${c++}`,this.handleExpanded=()=>{this.areAllAccordionsOpen?(this.expanded=!1,this.accordions.forEach(e=>{e.expanded=this.expanded})):(this.expanded=!0,this.accordions.forEach(e=>{e.expanded=this.expanded})),this.setExpandedToAreAllAccordionsOpen()},this.linkAccordions=()=>{this.accordions.forEach(e=>{e.setAttribute("context-id",this.accordionGroupId)})},this.setExpandedToAreAllAccordionsOpen=()=>{this.areAllAccordionsOpen=this.accordions.every(e=>!!e.expanded)},this.accordions=void 0,this.areAllAccordionsOpen=void 0,this.appearance="default",this.expanded=!1,this.groupTitle="",this.singleExpansion=!1,this.size="default"}componentDidLoad(){const t=this.el.children;this.accordions=Array.from(t).filter(e=>e.tagName==="IC-ACCORDION"),this.linkAccordions(),this.accordions.forEach(e=>{e.appearance=this.appearance}),this.accordions.forEach(e=>{e.size=this.size}),this.expanded?(this.accordions.forEach(e=>{e.expanded=!0}),this.setExpandedToAreAllAccordionsOpen()):(this.setExpandedToAreAllAccordionsOpen(),this.expanded=this.areAllAccordionsOpen)}handleAccordionClicked(t){this.singleExpansion?this.accordions.forEach(e=>{e.expanded&&t.detail.id!==e.id&&(e.expanded=!1)}):this.setExpandedToAreAllAccordionsOpen()}render(){const{appearance:t,size:e,groupTitle:o,singleExpansion:n}=this;return i(s,{"context-id":this.accordionGroupId,class:{[`${t}`]:!0,[`${e}`]:!0,"accordion-group":!0}},i("div",{class:"group-title-container"},i("ic-typography",{variant:"h4"},i("h3",null,o)),!n&&i("ic-button",{appearance:t==="light"?"light":"default",onClick:this.handleExpanded,variant:"tertiary"},this.areAllAccordionsOpen?"Hide all":"See all")),i("slot",null))}static get delegatesFocus(){return!0}get el(){return r(this)}};l.style=d;export{l as ic_accordion_group};

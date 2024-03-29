import{r as d,c as r,h as n,H as c,g as l}from"./index-FqWIt-Fv.js";import{i as s}from"./helpers-c597f246-uPXFvDyQ.js";import{C as h}from"./chevron-icon-589e3b46-dgpT5mks.js";import"./types-6f6b41a5-azgwIdyq.js";const p='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block;border-bottom:var(--ic-border-default)}:host(.light) ic-typography,:host(.light) .expanded-content,:host(.light) .icon-container,:host(.light) .expand-chevron{color:var(--ic-architectural-white)}:host(.disabled) ic-typography,:host(.disabled) .icon-container,:host(.disabled) .expand-chevron{color:var(--ic-architectural-500)}.section-button.small{padding:var(--ic-space-xxs) var(--ic-space-xs)}.section-button.large{padding:var(--ic-space-sm) var(--ic-space-xs)}:host(:first-of-type){border-top:var(--ic-border-default)}:focus{outline:none}.section-button{background-color:transparent;display:flex;align-items:center;width:100%;padding:var(--ic-space-xs);font-weight:var(--ic-font-weight-bold);border:none}.section-header{text-align:left;flex:1 0}button:hover:enabled{background-color:var(--ic-action-dark-bg-hover);cursor:pointer}button:active{background-color:var(--ic-action-dark-bg-active)}button:focus{box-shadow:var(--ic-border-focus);border-radius:var(--ic-border-radius);transition:var(--ic-transition-duration-fast)}button:disabled{pointer-events:none}.icon-container{margin:0 var(--ic-space-xs) 0 0;display:flex;align-items:center;width:var(--ic-space-lg);height:var(--ic-space-lg)}::slotted(svg){width:var(--ic-space-md);height:var(--ic-space-md)}.expand-chevron{width:var(--ic-space-lg);height:var(--ic-space-lg);margin-left:calc(var(--ic-space-xl) + var(--ic-space-xs));transform:rotate(90deg);justify-self:end}.content-expanded-chevron{transform:rotate(-90deg)}.expanded-content{height:0;overflow:hidden;display:flex;flex-direction:column;visibility:var(--ic-expanded-content-visiblity, hidden)}.expanded-content-inner{padding:var(--ic-space-xs)}.expanded-content-opened{overflow:visible}';let b=0;const u=class{constructor(i){d(this,i),this.accordionClicked=r(this,"accordionClicked",7),this.accordionId=`ic-accordion-${b++}`,this.CONTENT_VISIBILITY_PROPERTY="--ic-expanded-content-visiblity",this.toggleExpanded=()=>{this.expanded=!this.expanded,this.accordionClicked.emit({id:this.accordionId})},this.setAccordionAnimation=(t,e,o,a)=>{t.style.transitionDuration=`${e}ms`,t.style.transitionProperty=o,t.style.transitionDelay=a},this.setExpandedContentStyle=(t,e)=>{t.propertyName==="height"&&e.clientHeight>0&&(e.classList.add("expanded-content-opened"),e.style.height="auto")},this.hideExpandedContent=(t,e)=>{t.propertyName==="height"&&e.clientHeight===0&&e.style.setProperty(this.CONTENT_VISIBILITY_PROPERTY,"hidden")},this.animateExpandedContent=()=>{const t=this.expandedContentEl.scrollHeight;t>0&&this.expanded?(this.expandedContentEl.style.setProperty(this.CONTENT_VISIBILITY_PROPERTY,"visible"),this.expandedContentEl.style.height=`${t}px`,this.setAccordionAnimation(this.expandedContentEl,"300","height","ease-out"),this.expandedContentEl.addEventListener("transitionend",e=>{this.setExpandedContentStyle(e,this.expandedContentEl)})):this.expanded||(this.expandedContentEl.style.height=`${this.expandedContentEl.scrollHeight}px`,this.expandedContentEl.scrollHeight>0&&!this.expanded&&(this.expandedContentEl.style.height="0",this.setAccordionAnimation(this.expandedContentEl,"300","height","ease-in"),this.expandedContentEl.classList.remove("expanded-content-opened")),this.expandedContentEl.addEventListener("transitionend",e=>{this.hideExpandedContent(e,this.expandedContentEl)}))},this.appearance="default",this.disabled=!1,this.expanded=!1,this.heading="",this.message="",this.size="default"}handleExpandedWatch(){this.animateExpandedContent()}async setFocus(){this.accordionBtnHeading&&this.accordionBtnHeading.focus()}disconnectedCallback(){this.expandedContentEl&&(this.expandedContentEl.removeEventListener("transitionend",i=>this.setExpandedContentStyle(i,this.expandedContentEl),!0),this.expandedContentEl.removeEventListener("transitionend",i=>this.hideExpandedContent(i,this.expandedContentEl),!0))}componentDidLoad(){this.expanded&&(this.expandedContentEl.style.height="auto",this.expandedContentEl.style.setProperty(this.CONTENT_VISIBILITY_PROPERTY,"visible"))}render(){const{appearance:i,size:t,disabled:e,expanded:o}=this;return n(c,{id:this.accordionId,class:{[`${i}`]:!0,disabled:e},"aria-disabled":e?"true":"false"},n("button",{ref:a=>this.accordionBtnHeading=a,id:`${this.accordionId}-button`,disabled:e,tabindex:e?-1:0,class:{[`${t}`]:!0,"section-button":!0,"section-button-open":o&&!e},"aria-expanded":`${o}`,"aria-controls":"expanded-content-area",onClick:this.toggleExpanded},s(this.el,"icon")&&n("div",{class:"icon-container"},n("slot",{name:"icon"})),n("ic-typography",{variant:"subtitle-large",class:"section-header"},s(this.el,"heading")?n("slot",{name:"heading"}):this.heading),n("span",{class:{"expand-chevron":!0,"content-expanded-chevron":o&&!e},"aria-hidden":"true",innerHTML:h})),n("div",{class:{"expanded-content":!0},"aria-labelledby":`${this.accordionId}-button`,role:"region","aria-hidden":`${!o}`,id:"expanded-content-area",ref:a=>this.expandedContentEl=a},n("div",{class:"expanded-content-inner"},n("slot",null))))}get el(){return l(this)}static get watchers(){return{expanded:["handleExpandedWatch"]}}};u.style=p;export{u as ic_accordion};
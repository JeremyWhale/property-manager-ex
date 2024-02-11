import{r as f,c as h,h as e,H as g,g as b}from"./index-CXEYW8wC.js";import{e as c,I as i,u,f as v,i as s,v as y}from"./helpers-c597f246-uPXFvDyQ.js";import{I as r}from"./types-6f6b41a5-azgwIdyq.js";const k='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block;--footer-compliance-padding:1rem 0}:host(.footer-sparse){--footer-links-padding:1.5rem 0;--footer-logo-margin-bottom:var(--ic-space-lg);--footer-link-inner-flex-direction:row}:host(.footer-small){--footer-links-padding:0 0;--footer-logo-margin-bottom:var(--ic-space-md);--footer-link-inner-flex-direction:column}:host(.footer-light){--footer-theme-secondary:var(--ic-theme-secondary);--footer-theme-tertiary:var(--ic-theme-tertiary);--footer-keyline:var(--ic-keyline-lighten)}:host(.footer-dark){--footer-theme-secondary:var(--ic-theme-secondary-light);--footer-theme-tertiary:var(--ic-theme-tertiary-light);--footer-keyline:var(--ic-keyline-darken)}:host(.footer-small.footer-ungrouped){--footer-links-padding:var(--ic-space-md) 0 0 0}footer{display:flex;flex-direction:column;width:100%}.footer-description{background-color:var(--footer-theme-secondary);color:var(--ic-theme-text);border-bottom:var(--footer-keyline)}.footer-description-inner{padding:1rem 0}.footer-links{padding:var(--footer-links-padding);background-color:var(--footer-theme-secondary);color:var(--ic-theme-text)}.footer-links-inner{display:flex;flex-direction:var(--footer-link-inner-flex-direction)}.footer-compliance{background-color:var(--footer-theme-tertiary);color:var(--ic-theme-text)}.footer-compliance-inner{padding:var(--footer-compliance-padding)}.footer-logo{margin-bottom:var(--footer-logo-margin-bottom);display:flex;gap:var(--ic-space-xxl)}.footer-logo>::slotted(){margin-right:var(--ic-space-md)}.footer-caption{margin-bottom:var(--ic-space-md)}.classification-spacing{margin-bottom:var(--ic-space-lg)}@media (forced-colors: active){footer{border-top:var(--ic-hc-border)}}',z=class{constructor(t){f(this,t),this.footerResized=h(this,"footerResized",7),this.resizeObserver=null,this.resizeObserverCallback=o=>{o!==this.deviceSize&&(this.deviceSize=o),this.footerResized.emit()},this.runResizeObserver=()=>{this.resizeObserver=new ResizeObserver(()=>{const o=c();this.resizeObserverCallback(o)}),this.resizeObserver.observe(this.footerEl)},this.deviceSize=i.XL,this.foregroundColor=u(),this.aligned="left",this.breakpoint="medium",this.caption=void 0,this.copyright=!0,this.description=void 0,this.groupLinks=!1}disconnectedCallback(){this.resizeObserver!==null&&this.resizeObserver.disconnect()}componentWillLoad(){this.deviceSize=c()}componentDidLoad(){v(this.runResizeObserver)}themeChangeHandler(t){const o=t.detail;this.foregroundColor=o.mode}isSmall(){const t=this.breakpoint;return t==="extra small"?this.deviceSize<i.XS:t==="small"?this.deviceSize<i.S:t==="medium"?this.deviceSize<i.M:t==="large"?this.deviceSize<i.L:t==="extra large"?this.deviceSize<i.XL:!1}render(){const{aligned:t,caption:o,copyright:d,description:p,groupLinks:a,foregroundColor:n}=this,l=this.isSmall();return e(g,{class:{footer:!0,[`footer-${l?"small":"sparse"}`]:!0,[`footer-${a?"grouped":"ungrouped"}`]:!0,[`footer-${n}`]:!0,[r.Dark]:n===r.Dark,[r.Light]:n===r.Light}},e("footer",{ref:m=>this.footerEl=m},e("div",{class:"footer-description"},e("ic-section-container",{aligned:t,fullHeight:!0},e("div",{class:"footer-description-inner"},e("ic-typography",{variant:"body"},e("slot",{name:"description"},p))))),s(this.el,"link")&&e("div",{class:"footer-links"},a&&l?e("div",{class:"footer-links-inner"},e("slot",{name:"link"})):e("ic-section-container",{fullHeight:!0,aligned:t},e("div",{class:"footer-links-inner"},e("slot",{name:"link"})))),e("div",{class:"footer-compliance"},e("ic-section-container",{aligned:t,fullHeight:!0},e("div",{class:"footer-compliance-inner"},s(this.el,"logo")&&e("div",{class:"footer-logo"},e("slot",{name:"logo"})),(s(this.el,"caption")||o)&&e("div",{class:"footer-caption"},e("ic-typography",{variant:this.deviceSize<=i.M?"caption":"body"},e("slot",{name:"caption"},o))),d&&e("div",{class:{"footer-copyright":!0,"classification-spacing":y()}},e("ic-typography",{variant:this.deviceSize<=i.M?"caption-uppercase":"label-uppercase"},"© Crown Copyright")))))))}get el(){return b(this)}};z.style=k;export{z as ic_footer};

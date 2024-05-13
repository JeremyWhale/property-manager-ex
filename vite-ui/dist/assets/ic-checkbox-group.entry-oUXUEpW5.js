import{r as s,c as n,h as t,H as r,g as l}from"./index-cO6eslmw.js";import{j as d,a as c,q as p,s as h}from"./helpers-c597f246-uPXFvDyQ.js";import"./types-6f6b41a5-azgwIdyq.js";const b='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block}ic-input-label.error{color:var(--ic-status-error)}ic-input-label ic-typography{margin-bottom:var(--ic-space-sm)}:host(.small) ic-input-label ic-typography{margin-bottom:calc(var(--ic-space-sm) / 2)}ic-input-validation{margin-top:var(--ic-space-sm)}:host(.small) ic-input-validation{margin-top:calc(var(--ic-space-sm) / 2)}.checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxs))}:host(.small) .checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxxs))}.screen-reader-only-text{position:absolute;left:-9999px;background-color:#fff;color:#000;text-transform:none}',u=class{constructor(e){s(this,e),this.icChange=n(this,"icChange",7),this.disabled=!1,this.helperText="",this.hideLabel=!1,this.label=void 0,this.name=void 0,this.required=!1,this.size="default",this.small=!1,this.validationStatus="",this.validationText=""}handleChange(e){e.target.tagName==="IC-TEXT-FIELD"&&e.stopImmediatePropagation()}componentWillLoad(){d(this.disabled,this.el)}componentDidLoad(){Array.from(this.el.querySelectorAll("ic-checkbox")).forEach(e=>{e.name||(e.name=this.name),e.groupLabel=this.label}),c([{prop:this.label,propName:"label"},{prop:this.name,propName:"name"}],"Checkbox Group")}selectHandler(e){const a=Array.from(this.el.querySelectorAll("ic-checkbox")).filter(i=>i.checked&&!i.disabled);this.icChange.emit({value:a.map(i=>i.value),checkedOptions:a.map(i=>{var o;return{checkbox:i,textFieldValue:(o=i.querySelector("ic-text-field"))===null||o===void 0?void 0:o.value}}),selectedOption:e.target})}render(){const e=p(this.name,this.helperText!=="",this.validationStatus!==""),a=h(this.validationStatus,this.disabled);return t(r,{class:{small:this.small,[`${this.size}`]:!0}},(this.validationStatus==="error"||this.required||this.hideLabel)&&t("span",{id:"screenReaderOnlyText",class:"screen-reader-only-text","aria-hidden":"true"},this.label," ",this.validationStatus==="error"?"invalid data ":null," ",this.required?"required":null),t("fieldset",{id:this.name,"aria-labelledby":`${this.validationStatus==="error"||this.required||this.hideLabel?"screenReaderOnlyText":""} ${e}`.trim(),disabled:this.disabled},!this.hideLabel&&t("legend",null,t("ic-input-label",{class:{[`${this.validationStatus}`]:!0},label:this.label,helperText:this.helperText,required:this.required,disabled:this.disabled,for:this.name})),t("div",{class:"checkboxes-container"},t("slot",null))),a&&t("ic-input-validation",{for:this.name,ariaLiveMode:"polite",status:this.validationStatus,message:this.validationText}))}get el(){return l(this)}};u.style=b;export{u as ic_checkbox_group};
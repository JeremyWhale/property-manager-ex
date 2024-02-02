"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[6857],{6857:function(e,t,i){i.r(t),i.d(t,{ic_checkbox_group:function(){return l}});var a=i(4942),o=i(5671),n=i(3144),s=i(7231),r=i(3422),l=(i(2158),function(){function e(t){(0,o.Z)(this,e),(0,s.r)(this,t),this.icChange=(0,s.c)(this,"icChange",7),this.disabled=!1,this.helperText="",this.hideLabel=!1,this.label=void 0,this.name=void 0,this.required=!1,this.size="default",this.small=!1,this.validationStatus="",this.validationText=""}return(0,n.Z)(e,[{key:"componentWillLoad",value:function(){(0,r.f)(this.disabled,this.host)}},{key:"componentDidLoad",value:function(){var e=this;Array.from(this.host.querySelectorAll("ic-checkbox")).forEach((function(t){t.name||(t.name=e.name),t.groupLabel=e.label})),(0,r.a)([{prop:this.label,propName:"label"},{prop:this.name,propName:"name"}],"Checkbox Group")}},{key:"selectHandler",value:function(e){var t=Array.from(this.host.querySelectorAll("ic-checkbox")).filter((function(e){return e.checked&&!e.disabled}));this.icChange.emit({value:t.map((function(e){return e.value})),checkedOptions:t.map((function(e){var t;return{checkbox:e,textFieldValue:null===(t=e.querySelector("ic-text-field"))||void 0===t?void 0:t.value}})),selectedOption:e.target})}},{key:"render",value:function(){var e,t=(0,r.p)(this.name,""!==this.helperText,""!==this.validationStatus),i=(0,r.q)(this.validationStatus,this.disabled);return(0,s.h)(s.H,{class:(e={},(0,a.Z)(e,"small",this.small),(0,a.Z)(e,"".concat(this.size),!0),e)},("error"===this.validationStatus||this.required||this.hideLabel)&&(0,s.h)("span",{id:"screenReaderOnlyText",class:"screen-reader-only-text","aria-hidden":"true"},this.label," ","error"===this.validationStatus?"invalid data ":null," ",this.required?"required":null),(0,s.h)("fieldset",{id:this.name,"aria-labelledby":"".concat("error"===this.validationStatus||this.required||this.hideLabel?"screenReaderOnlyText":""," ").concat(t).trim(),disabled:this.disabled},!this.hideLabel&&(0,s.h)("legend",null,(0,s.h)("ic-input-label",{class:(0,a.Z)({},"".concat(this.validationStatus),!0),label:this.label,helperText:this.helperText,required:this.required,disabled:this.disabled,for:this.name})),(0,s.h)("div",{class:"checkboxes-container"},(0,s.h)("slot",null))),i&&(0,s.h)("ic-input-validation",{for:this.name,ariaLiveMode:"polite",status:this.validationStatus,message:this.validationText}))}},{key:"host",get:function(){return(0,s.g)(this)}}]),e}());l.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block}ic-input-label.error{color:var(--ic-status-error)}ic-input-label ic-typography{margin-bottom:var(--ic-space-sm)}:host(.small) ic-input-label ic-typography{margin-bottom:calc(var(--ic-space-sm) / 2)}ic-input-validation{margin-top:var(--ic-space-sm)}:host(.small) ic-input-validation{margin-top:calc(var(--ic-space-sm) / 2)}.checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxs))}:host(.small) .checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxxs))}.screen-reader-only-text{position:absolute;left:-9999px;background-color:#fff;color:#000;text-transform:none}'}}]);
//# sourceMappingURL=6857.d8fe03a6.chunk.js.map
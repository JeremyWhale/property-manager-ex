"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[7765],{7765:function(t,e,i){i.r(e),i.d(e,{ic_text_field:function(){return p}});var a=i(4942),n=i(4165),o=i(5861),s=i(3433),l=i(5671),r=i(3144),h=i(7231),u=i(2158),c=i(3422),d=0,p=function(){function t(e){var i=this;(0,l.Z)(this,t),(0,h.r)(this,e),this.getValidationText=(0,h.c)(this,"getValidationText",7),this.icBlur=(0,h.c)(this,"icBlur",7),this.icChange=(0,h.c)(this,"icChange",7),this.icFocus=(0,h.c)(this,"icFocus",7),this.icInput=(0,h.c)(this,"icInput",7),this.icKeydown=(0,h.c)(this,"icKeydown",7),this.inheritedAttributes={},this.showLeftIcon=this.hasLeftIconSlot(),this.onInput=function(t){i.value=t.target.value,i.icInput.emit({value:i.value})},this.onBlur=function(t){var e=t.target.value;i.icBlur.emit({value:e})},this.onFocus=function(t){var e=t.target.value;i.icFocus.emit({value:e})},this.isTextArea=function(){return i.rows>1},this.getInlineValidationText=function(){i.getValidationText.emit({value:i.validationText})},this.hasStatus=function(t){return""!==t&&!i.disabled},this.showStatusText=function(t){return i.hasStatus(t)&&!(t==u.a.Success&&i.validationInline)&&!i.validationInlineInternal},this.handleFormReset=function(){i.value=i.initialValue},this.numChars=0,this.maxLengthExceeded=!1,this.maxValueExceeded=!1,this.minValueUnattained=!1,this.ariaActiveDescendant=void 0,this.ariaAutocomplete=void 0,this.ariaExpanded=void 0,this.ariaOwns=void 0,this.autocapitalize="off",this.autocomplete="off",this.autocorrect="off",this.autoFocus=!1,this.disabled=!1,this.fullWidth=!1,this.helperText="",this.hideLabel=!1,this.hiddenInput=!0,this.inputId="ic-text-field-input-".concat(d++),this.inputmode="text",this.label=void 0,this.max=void 0,this.maxLength=0,this.min=void 0,this.name=this.inputId,this.placeholder="",this.readonly=!1,this.required=!1,this.resize=!1,this.role=void 0,this.rows=1,this.small=!1,this.spellcheck=!1,this.truncateValue=void 0,this.type="text",this.validationInline=!1,this.validationInlineInternal=!1,this.validationStatus="",this.validationText="",this.debounce=0,this.value="",this.initialValue=this.value}return(0,r.Z)(t,[{key:"debounceChanged",value:function(){this.icChange=(0,c.L)(this.icChange,this.debounce)}},{key:"watchValueHandler",value:function(t){this.inputEl&&this.inputEl.value!==t&&(this.inputEl.value=t),this.numChars=t.length,"number"===this.type&&(t&&Number(t)<Number(this.min)?this.minValueUnattained=!0:this.minValueUnattained=!1,Number(t)>Number(this.max)?this.maxValueExceeded=!0:this.maxValueExceeded=!1),this.maxLength>0&&(t.length>this.maxLength?this.maxLengthExceeded=!0:this.maxLengthExceeded=!1),this.icChange.emit({value:t})}},{key:"connectedCallback",value:function(){this.debounceChanged()}},{key:"disconnectedCallback",value:function(){(0,c.l)(this.el,this.handleFormReset)}},{key:"componentWillLoad",value:function(){this.watchValueHandler(this.value),this.inheritedAttributes=(0,c.v)(this.el,[].concat((0,s.Z)(c.w),["title","aria-autocomplete","aria-haspopup"])),this.readonly&&(this.maxLengthExceeded=!1,this.maxValueExceeded=!1,this.minValueUnattained=!1),(0,c.k)(this.el,this.handleFormReset),(0,c.f)(this.disabled,this.el)}},{key:"componentDidLoad",value:function(){(0,c.a)([{prop:this.label,propName:"label"}],"Text Field"),this.validationInlineInternal&&this.getInlineValidationText()}},{key:"handleKeyDown",value:function(t){this.icKeydown.emit({event:t})}},{key:"setFocus",value:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.inputEl&&this.inputEl.focus();case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"hasLeftIconSlot",value:function(){return null!==this.el.querySelector('[slot="icon"]')}},{key:"render",value:function(){var t,e,i,n,o=this,s=this.inputId,l=this.name,r=this.label,d=this.required,p=this.small,m=this.placeholder,b=this.helperText,f=this.rows,v=this.resize,x=this.disabled,y=this.value,g=this.min,w=this.max,k=this.maxLength,I=this.numChars,z=this.readonly,L=this.maxLengthExceeded,E=this.minValueUnattained,V=this.maxValueExceeded,F=this.validationStatus,T=this.validationText,Z=this.validationInline,C=this.validationInlineInternal,S=this.spellcheck,A=this.inputmode,B=this.fullWidth,q=this.truncateValue,M=this.hiddenInput,N=!!z||x,U=x?"":m,W=L||V||E?u.a.Error:F,j=L?"Maximum length exceeded":V?"Maximum value of ".concat(w," exceeded"):E?"Minimum value of ".concat(g," not met"):T,D=z?0:k,H=L||V||E||0===k&&W===u.a.Error?"assertive":"polite",K=this.showStatusText(W),O=this.isTextArea(),R=k>0?s+"-charcount-desc":"",_=(R+" "+(0,c.p)(s,""!==b,K)).trim();this.showLeftIcon&&!z&&N&&(this.showLeftIcon=!1);var G=W===u.a.Error?"true":"false",J=N&&!z;return M&&(0,c.m)(!0,this.el,l,y,N),(0,h.h)(h.H,{class:(0,a.Z)({},"fullwidth",B)},(0,h.h)("ic-input-container",{readonly:z,disabled:N},!this.hideLabel&&(0,h.h)("ic-input-label",{for:s,label:r,helperText:b,required:d,disabled:J,readonly:z}),(0,h.h)("ic-input-component-container",{small:p,validationStatus:W,multiLine:O,disabled:N,readonly:z,validationInline:Z,fullWidth:B},this.showLeftIcon&&(0,h.h)("span",{class:(t={},(0,a.Z)(t,"readonly",z),(0,a.Z)(t,"has-value",y.length>0),t),slot:"left-icon"},(0,h.h)("slot",{name:"icon"})),!O&&(0,h.h)("input",Object.assign({id:s,name:l,ref:function(t){return o.inputEl=t},type:this.type,min:g,max:w,value:y,class:(e={},(0,a.Z)(e,"no-left-pad",!this.showLeftIcon&&z),(0,a.Z)(e,"readonly",z),(0,a.Z)(e,"truncate-value",q),e),placeholder:U,required:d,disabled:N,readonly:z,onInput:this.onInput,onBlur:this.onBlur,onFocus:this.onFocus,"aria-label":r,"aria-describedby":_,"aria-invalid":G,"aria-activedescendant":this.ariaActiveDescendant,"aria-expanded":this.ariaExpanded,"aria-owns":this.ariaOwns,autocomplete:this.autocomplete,autocapitalize:this.autocapitalize,autoFocus:this.autoFocus,spellcheck:S,inputmode:A,role:this.role},this.inheritedAttributes)),O&&(0,h.h)("textarea",Object.assign({id:s,class:(i={},(0,a.Z)(i,"no-resize",!1===v||z),(0,a.Z)(i,"no-left-pad",!this.showLeftIcon&&z),(0,a.Z)(i,"readonly",z),i),name:l,ref:function(t){return o.inputEl=t},value:y,rows:f,required:d,disabled:N,placeholder:U,readonly:z,onInput:this.onInput,onBlur:this.onBlur,onFocus:this.onFocus,"aria-label":r,"aria-describedby":_,"aria-invalid":G,autocapitalize:this.autocapitalize,autoFocus:this.autoFocus,spellcheck:S,inputmode:A},this.inheritedAttributes)),(0,c.i)(this.el,"clear-button")&&(0,h.h)("slot",{name:"clear-button"}),(0,c.i)(this.el,"search-submit-button")&&(0,h.h)("slot",{name:"search-submit-button"})),(0,c.i)(this.el,"menu")&&(0,h.h)("slot",{name:"menu"}),(!(0,c.F)(F)||!(0,c.F)(T)||D>0||V||E)&&!C&&(0,h.h)("ic-input-validation",{status:!1===this.hasStatus(W)||W===u.a.Success&&Z||C?"":W,message:K?j:"",ariaLiveMode:H,for:s,fullWidth:B},!z&&D>0&&(0,h.h)("div",{slot:"validation-message-adornment"},(0,h.h)("ic-typography",{variant:"caption",class:(n={},(0,a.Z)(n,"maxlengthtext",!0),(0,a.Z)(n,"error",L),(0,a.Z)(n,"disabled",J),n)},(0,h.h)("span",{"aria-live":"polite",id:"".concat(s,"-charcount"),class:"charcount"},I,"/",D),(0,h.h)("span",{hidden:!0,id:R},"Field can contain a maximum of ",D," characters."))))))}},{key:"el",get:function(){return(0,h.g)(this)}}],[{key:"watchers",get:function(){return{debounce:["debounceChanged"],value:["watchValueHandler"]}}}]),t}();p.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block}:host(.fullwidth){width:100%}::-moz-placeholder{color:var(--ic-color-tertiary-text);opacity:1}::placeholder{color:var(--ic-color-tertiary-text);opacity:1}input,textarea{border:0;border-radius:var(--ic-border-radius);background-color:var(--ic-architectural-white);line-height:1.5rem;letter-spacing:0.005rem;width:100%;padding-right:var(--ic-space-xs);padding-left:var(--ic-space-xs)}textarea{min-height:var(--ic-space-lg);resize:vertical;padding-top:0.375rem}input:focus,textarea:focus{border:0;outline:0}input:disabled,textarea:disabled{color:var(--ic-architectural-200)}input.readonly,textarea.readonly{color:var(--ic-color-primary-text)}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type="number"]{-moz-appearance:textfield}textarea.no-resize{resize:none}.maxlengthtext{color:var(--ic-color-secondary-text)}.no-left-pad{padding-left:0}::slotted([slot="icon"]){fill:var(--ic-color-tertiary-text)}.has-value ::slotted([slot="icon"]){fill:var(--ic-color-primary-text)}.charcount{margin-right:calc(-1 * var(--ic-space-xxxs))}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration,input[type="search"]::-webkit-search-results-button,input[type="search"]::-webkit-search-results-decoration{display:none}input[type="search"].truncate-value{width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}@media (forced-colors: active){input.readonly,textarea.readonly{color:canvastext}.has-value ::slotted([slot="icon"]){fill:currentcolor}}'}}]);
//# sourceMappingURL=7765.e6ac00f9.chunk.js.map
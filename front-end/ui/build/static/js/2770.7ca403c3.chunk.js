"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[2770],{2770:function(e,t,i){i.r(t),i.d(t,{ic_search_bar:function(){return d}});var n=i(4165),a=i(5861),s=i(4942),o=i(5671),l=i(3144),r=i(7231),u=i(2158),h=i(3422),c=0,d=function(){function e(t){var i=this;(0,o.Z)(this,e),(0,r.r)(this,t),this.icChange=(0,r.c)(this,"icChange",7),this.icClear=(0,r.c)(this,"icClear",7),this.icInput=(0,r.c)(this,"icInput",7),this.icInputBlur=(0,r.c)(this,"icInputBlur",7),this.icInputFocus=(0,r.c)(this,"icInputFocus",7),this.icOptionSelect=(0,r.c)(this,"icOptionSelect",7),this.icMenuChange=(0,r.c)(this,"icMenuChange",7),this.icClearBlur=(0,r.c)(this,"icClearBlur",7),this.icRetryLoad=(0,r.c)(this,"icRetryLoad",7),this.icSubmitSearch=(0,r.c)(this,"icSubmitSearch",7),this.icSubmitSearchBlur=(0,r.c)(this,"icSubmitSearchBlur",7),this.icSearchBarBlur=(0,r.c)(this,"icSearchBarBlur",7),this.icSearchBarFocus=(0,r.c)(this,"icSearchBarFocus",7),this.assistiveHintEl=null,this.hasTimedOut=!1,this.inputId="ic-search-bar-input-".concat(c++),this.menuCloseFromMenuChangeEvent=!1,this.menuId="".concat(this.inputId,"-menu"),this.preLoad=!0,this.preventSubmit=!1,this.prevNoOption=!1,this.retryButtonClick=!1,this.truncateValue=!1,this.handleClear=function(e){var t=e;"click"!==e.type&&"Enter"!==t.code&&"Space"!==t.code||(i.value="",i.inputEl.value="",i.loading=!1,clearTimeout(i.timeoutTimer),i.filteredOptions=i.options,i.el.setFocus(),i.icClear.emit(),e.preventDefault(),i.preventSubmit=!0)},this.onInput=function(e){var t;i.value=e.target.value;var n=[(t={},(0,s.Z)(t,i.labelField,i.emptyOptionListText),(0,s.Z)(t,i.valueField,""),t)];if(i.options.length>0&&(i.setMenuChange(!0),i.preLoad=!1,!1===i.disableFilter)){var a=(0,h.A)(i.options,!1,i.value,"anywhere",i.labelField);i.filteredOptions=a.length>0?a:n}i.showClearButton||i.handleShowClearButton(!0),i.debounceAriaLiveUpdate()},this.onInputBlur=function(e){var t=e.target.value,n=e.relatedTarget;i.icInputBlur.emit({value:t,relatedTarget:n})},this.onInputFocus=function(e){var t=e.target.value;i.icInputFocus.emit({value:t}),i.handleShowClearButton(!0)},this.handleClearBlur=function(e){var t=e.relatedTarget;i.icClearBlur.emit({relatedTarget:t}),i.clearButtonFocused=!1},this.handleSubmitSearchBlur=function(e){var t=e.relatedTarget;i.icSubmitSearchBlur.emit({relatedTarget:t}),i.searchSubmitFocused=!1},this.handleMouseDown=function(e){e.preventDefault()},this.handleSubmitSearchFocus=function(){i.searchSubmitFocused=!0},this.handleSubmitSearch=function(){i.highlightedValue&&(i.value=i.highlightedValue),i.highlightedValue=void 0,i.icSubmitSearch.emit({value:i.value});var e=i.el.closest("FORM");i.searchSubmitButton&&e&&!i.preventSubmit&&(0,h.B)(e,i.searchSubmitButton)},this.handleSubmitSearchKeyDown=function(e){" "===e.key&&(e.preventDefault(),i.handleSubmitSearch())},this.handleRetry=function(e){i.retryViaKeyPress="Enter"===e.detail.keyPressed,i.icRetryLoad.emit({value:e.detail.value}),i.triggerLoading(),i.retryButtonClick=!0},this.triggerLoading=function(){var e,t=[(e={},(0,s.Z)(e,i.labelField,i.loadingLabel),(0,s.Z)(e,i.valueField,""),(0,s.Z)(e,"loading",!0),e)];i.filteredOptions!==t&&(i.filteredOptions=t),i.timeout&&(i.timeoutTimer=window.setTimeout((function(){var e;i.filteredOptions=[(e={},(0,s.Z)(e,i.labelField,i.loadingErrorLabel),(0,s.Z)(e,i.valueField,""),(0,s.Z)(e,"timedOut",!0),e)]}),i.timeout))},this.handleOptionSelect=function(e){e.detail.label!==i.emptyOptionListText?(i.value=e.detail.value,i.icOptionSelect.emit({value:i.value})):i.el.setFocus()},this.handleMenuOptionHighlight=function(e){var t,n=null===(t=e.detail.optionId)||void 0===t?void 0:t.replace("".concat(i.menuId,"-"),"");n&&(i.highlightedValue=n),e.detail.optionId?i.ariaActiveDescendant=e.detail.optionId:i.ariaActiveDescendant=void 0},this.handleMenuChange=function(e){i.setMenuChange(e.detail.open),e.detail.open||(i.handleMenuCloseFromMenuChange(!0),(void 0===e.detail.focusInput||e.detail.focusInput)&&i.el.setFocus())},this.setMenuChange=function(e){i.open!==e&&(i.open=e,i.icMenuChange.emit({open:e}))},this.handleHostFocus=function(){i.options&&i.value&&!i.menuCloseFromMenuChangeEvent&&i.setMenuChange(!0),i.handleTruncateValue(!1),i.icSearchBarFocus.emit()},this.handleHostBlur=function(e){var t=e.relatedTarget;i.open&&i.options&&t!==i.menu&&!i.retryViaKeyPress&&!i.retryButtonClick&&i.setMenuChange(!1),(i.retryButtonClick||i.retryViaKeyPress)&&i.inputEl.setFocus(),i.handleShowClearButton(!1),i.handleMenuCloseFromMenuChange(!1),i.handleTruncateValue(!0),i.icSearchBarBlur.emit({relatedTarget:t,value:i.value}),i.retryViaKeyPress=!1,i.retryButtonClick=!1},this.handleShowClearButton=function(e){i.showClearButton=e},this.handleFocusClearButton=function(){i.clearButtonFocused=!0},this.handleMenuCloseFromMenuChange=function(e){i.menuCloseFromMenuChangeEvent=e},this.handleTruncateValue=function(e){i.truncateValue=e},this.renderAssistiveHintEl=function(){var e,t,n=null===(t=null===(e=i.el.shadowRoot.querySelector("ic-text-field"))||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector("#".concat(i.inputId));n&&Object.keys(n).length>0&&i.hasOptionsOrFilterDisabled()&&(i.assistiveHintEl=document.createElement("span"),i.assistiveHintEl.innerText=i.hintText,i.assistiveHintEl.id="".concat(i.inputId,"-assistive-hint"),i.assistiveHintEl.style.display="none",void 0!==n.after&&n.after(i.assistiveHintEl))},this.updateSearchResultAriaLive=function(){var e=i.el.shadowRoot.querySelector(".search-results-status");!i.open||""===i.value||i.value.length<i.charactersUntilSuggestion?e.innerText="":i.hasOptionsOrFilterDisabled()&&i.filteredOptions.length>0&&i.open&&e&&!i.filteredOptions[0].loading&&(i.hadNoOptions()?e.innerText=i.emptyOptionListText:e.innerText="".concat(i.filteredOptions.length," result").concat(i.filteredOptions.length>1?"s":""," available"))},this.hasOptionsOrFilterDisabled=function(){return i.options.length>0||i.disableFilter},this.hadNoOptions=function(){return 1===i.filteredOptions.length&&i.filteredOptions[0][i.labelField]===i.emptyOptionListText&&"navigation"===i.searchMode},this.isSubmitDisabled=function(){var e=void 0===i.value||null===i.value||""===i.value,t=i.value.length<i.charactersUntilSuggestion;return e||t||i.disabled||i.hadNoOptions()||i.hasTimedOut||i.loading},this.highlightFirstOptionAfterNoResults=function(){i.prevNoOption&&i.menu&&!i.hasTimedOut&&(i.menu.handleSetFirstOption(),i.prevNoOption=!1),i.filteredOptions.find((function(e){return e[i.labelField]===i.emptyOptionListText||e[i.labelField]===i.loadingErrorLabel||e[i.labelField]===i.loadingLabel}))&&(i.prevNoOption=!0)},this.ariaActiveDescendant=void 0,this.clearButtonFocused=!1,this.highlightedValue=void 0,this.open=!1,this.searchSubmitFocused=!1,this.showClearButton=!1,this.autocapitalize="off",this.autocomplete="off",this.autocorrect="off",this.autofocus=!1,this.charactersUntilSuggestion=2,this.disabled=!1,this.disableFilter=!1,this.debounce=0,this.emptyOptionListText="No results found",this.focusOnLoad=!1,this.fullWidth=!1,this.helperText="",this.hideLabel=!1,this.hintText="When autocomplete results are available use the up and down arrows to choose and press enter to select",this.label=void 0,this.labelField="label",this.loading=!1,this.loadingErrorLabel="Loading Error",this.loadingLabel="Loading...",this.name=this.inputId,this.placeholder="Search",this.readonly=!1,this.required=!1,this.searchMode="navigation",this.small=!1,this.spellcheck=!1,this.timeout=void 0,this.valueField="value",this.filteredOptions=[],this.options=[],this.value=""}return(0,l.Z)(e,[{key:"loadingHandler",value:function(e){e&&!this.hasTimedOut&&(this.preLoad=!1,this.triggerLoading())}},{key:"filteredOptionsHandler",value:function(e){this.hasTimedOut=e.some((function(e){return e.timedOut}))}},{key:"watchOptionsHandler",value:function(e){if(this.disableFilter&&!this.hasTimedOut)if(this.loading=!1,clearTimeout(this.timeoutTimer),e.length>0)this.filteredOptions=e;else{var t;if(this.hadNoOptions())return;this.setMenuChange(!0),!this.preLoad&&(this.filteredOptions=[(t={},(0,s.Z)(t,this.labelField,this.emptyOptionListText),(0,s.Z)(t,this.valueField,""),t)]),this.preLoad=!0}this.debounceAriaLiveUpdate()}},{key:"watchValueHandler",value:function(e){this.inputEl&&this.options&&(0,h.C)(e,this.options,this.valueField,this.labelField)?this.inputEl.value=(0,h.C)(e,this.options,this.valueField,this.labelField):this.inputEl&&this.inputEl.value!==e&&(this.inputEl.value=e)}},{key:"disconnectedCallback",value:function(){this.assistiveHintEl&&this.assistiveHintEl.remove()}},{key:"componentWillLoad",value:function(){this.watchValueHandler(this.value),(0,h.f)(this.disabled,this.el)}},{key:"componentDidLoad",value:function(){this.focusOnLoad&&this.el.setFocus(),this.hasOptionsOrFilterDisabled()&&(this.renderAssistiveHintEl(),this.disableFilter&&(this.filteredOptions=this.options)),(0,h.a)([{prop:this.label,propName:"label"}],"Search Bar"),void 0!==this.inputEl&&(this.anchorEl=this.inputEl.shadowRoot.querySelector("ic-input-component-container"))}},{key:"componentWillRender",value:function(){this.highlightFirstOptionAfterNoResults()}},{key:"handleKeyDown",value:function(e){var t=e.detail.event;this.menu&&this.open&&this.menu.handleKeyboardOpen(t)}},{key:"handleKeyUp",value:function(e){if("Enter"===e.key){if(this.preventSubmit||this.isSubmitDisabled())return;this.handleSubmitSearch(),this.setMenuChange(!1)}"Escape"===e.key&&this.setMenuChange(!1),this.preventSubmit&&(this.preventSubmit=!1)}},{key:"setFocus",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.retryViaKeyPress=!1,this.retryButtonClick=!1,this.inputEl&&this.inputEl.setFocus();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"debounceAriaLiveUpdate",value:function(){var e=this;clearTimeout(this.debounceAriaLive),this.debounceAriaLive=window.setTimeout((function(){e.updateSearchResultAriaLive()}),500)}},{key:"render",value:function(){var e,t,i,n=this,a=this.inputId,o=this.name,l=this.label,c=this.required,d=this.small,p=this.placeholder,b=this.helperText,v=this.disabled,m=this.value,f=this.readonly,g=this.spellcheck,y=this.fullWidth,w=this.options,F=this.open,S=this.hideLabel,O=this.menuId,C=this.ariaActiveDescendant,k=this.truncateValue,L=this.autofocus,x=this.autocapitalize,B=this.autocomplete,T=this.filteredOptions,M=!(!f&&!v),E=(0,h.p)(a,""!==b,!1).trim();i=""!==E&&this.hasOptionsOrFilterDisabled()?"".concat(E," ").concat(this.inputId,"-assistive-hint"):this.hasOptionsOrFilterDisabled()?"".concat(this.inputId,"-assistive-hint"):""!==E?E:void 0;var I,D=M&&!f,H=m&&this.hasOptionsOrFilterDisabled(),z=H&&F&&T.length>0,Z=z&&m.length>=this.charactersUntilSuggestion,V=1===this.filteredOptions.length&&(this.filteredOptions[0][this.labelField]===this.loadingLabel||T[0][this.labelField]===this.loadingErrorLabel);return I=w.length>0?z?"true":"false":void 0,(0,h.m)(!0,this.el,o,m,M),(0,r.h)(r.H,{class:(e={},(0,s.Z)(e,"search",!0),(0,s.Z)(e,"fullwidth",y),(0,s.Z)(e,"disabled",v),(0,s.Z)(e,"small",d),e),onFocus:this.handleHostFocus,onBlur:this.handleHostBlur},(0,r.h)("ic-text-field",{ref:function(e){return n.inputEl=e},inputId:a,label:l,helperText:b,required:c,disabled:D,readonly:f,small:d,hideLabel:S,fullWidth:y,name:o,truncateValue:k,value:w&&(0,h.C)(m,w,this.valueField,this.labelField)?(0,h.C)(m,w,this.valueField,this.labelField):m,placeholder:p,onInput:this.onInput,onBlur:this.onInputBlur,onFocus:this.onInputFocus,"aria-label":S?l:"","aria-describedby":i,"aria-owns":Z?O:void 0,"aria-haspopup":w.length>0?"listbox":void 0,ariaExpanded:I,ariaActiveDescendant:C,"aria-autocomplete":H?"list":void 0,role:H?"combobox":void 0,autocomplete:B,autocapitalize:x,autoFocus:L,spellcheck:g,inputmode:"search",debounce:this.debounce},(0,r.h)("div",{class:{"clear-button-container":!0,"clear-button-visible":m&&!M&&this.showClearButton},slot:"clear-button"},(0,r.h)("ic-button",{id:"clear-button",class:"clear-button","aria-label":"Clear",innerHTML:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M15.8327 5.34199L14.6577 4.16699L9.99935 8.82533L5.34102 4.16699L4.16602 5.34199L8.82435 10.0003L4.16602 14.6587L5.34102 15.8337L9.99935 11.1753L14.6577 15.8337L15.8327 14.6587L11.1743 10.0003L15.8327 5.34199Z" fill="currentColor"/>\n</svg>\n',onClick:this.handleClear,onMouseDown:this.handleMouseDown,size:d?"small":"default",onFocus:this.handleFocusClearButton,onBlur:this.handleClearBlur,onKeyDown:this.handleClear,type:"submit",variant:"icon",appearance:this.clearButtonFocused?u.I.Light:u.I.Dark}),(0,r.h)("div",{class:"divider"})),(0,r.h)("div",{class:{"search-submit-button-container":!0,"search-submit-button-disabled":this.isSubmitDisabled()},slot:"search-submit-button"},(0,r.h)("ic-button",{id:"search-submit-button","aria-label":"Search",ref:function(e){return n.searchSubmitButton=e},class:(t={},(0,s.Z)(t,"search-submit-button",!0),(0,s.Z)(t,"search-submit-button-small",!!d),t),disabled:this.isSubmitDisabled(),innerHTML:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n    <path d="M13.1292 11.8792H12.4708L12.2375 11.6542C13.0542 10.7042 13.5458 9.47083 13.5458 8.12916C13.5458 5.13749 11.1208 2.71249 8.12916 2.71249C5.13749 2.71249 2.71249 5.13749 2.71249 8.12916C2.71249 11.1208 5.13749 13.5458 8.12916 13.5458C9.47083 13.5458 10.7042 13.0542 11.6542 12.2375L11.8792 12.4708V13.1292L16.0458 17.2875L17.2875 16.0458L13.1292 11.8792ZM8.12916 11.8792C6.05416 11.8792 4.37916 10.2042 4.37916 8.12916C4.37916 6.05416 6.05416 4.37916 8.12916 4.37916C10.2042 4.37916 11.8792 6.05416 11.8792 8.12916C11.8792 10.2042 10.2042 11.8792 8.12916 11.8792Z" fill="currentColor"/>\n</svg>',size:d?"small":"default",onClick:this.handleSubmitSearch,onMouseDown:this.handleMouseDown,onBlur:this.handleSubmitSearchBlur,onFocus:this.handleSubmitSearchFocus,onKeyDown:this.handleSubmitSearchKeyDown,type:"submit",variant:"icon",appearance:this.searchSubmitFocused?u.I.Light:u.I.Default})),(0,r.h)("div",{class:{"menu-container":!0,fullwidth:y},slot:"menu"},Z&&(0,r.h)("ic-menu",{class:{"no-results":this.hadNoOptions()||V},activationType:"manual",anchorEl:this.anchorEl,autoFocusOnSelected:!1,searchMode:this.searchMode,inputEl:this.inputEl,inputLabel:l,ref:function(e){return n.menu=e},small:d,fullWidth:y,menuId:O,open:!0,options:T,onMenuOptionSelect:this.handleOptionSelect,onMenuStateChange:this.handleMenuChange,onMenuOptionId:this.handleMenuOptionHighlight,onRetryButtonClicked:this.handleRetry,parentEl:this.el,value:m,labelField:this.labelField,valueField:this.valueField}))),(0,r.h)("div",{"aria-live":"polite",role:"status",class:"search-results-status"}))}},{key:"el",get:function(){return(0,r.g)(this)}}],[{key:"delegatesFocus",get:function(){return!0}},{key:"watchers",get:function(){return{loading:["loadingHandler"],filteredOptions:["filteredOptionsHandler"],options:["watchOptionsHandler"],value:["watchValueHandler"]}}}]),e}();d.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host(.search){--divider-height:1.5rem}:host(.search.small){--divider-height:1rem}:host(.fullwidth){width:100%}:host(.search) .disabled:hover{border-color:var(--ic-architectural-200)}:host(.search.disabled) .disabled svg{color:var(--ic-architectural-200)}:host(.search) .disabled svg{color:var(--ic-architectural-400)}.clear-button-container{align-items:center;margin-right:var(--ic-space-1px);display:none;visibility:hidden}.clear-button{border-radius:var(--ic-border-radius);transition:box-shadow var(--ic-easing-transition),\n    border-radius var(--ic-easing-transition)}.clear-button:focus,.clear-button:active{background-color:var(--ic-focus-blue);box-shadow:inset 0 0 0 0.125rem var(--ic-focus-glow);border-radius:0.25rem}.clear-button:focus,.clear-button:active *{fill:white}.clear-button-visible{visibility:visible;display:flex}.search-submit-button-container{display:flex;align-items:center}.search-submit-button-disabled .ic-tooltip-container{display:none !important}.search-submit-button:focus,.search-submit-button:active{background-color:var(--ic-focus-blue) !important;box-shadow:inset 0 0 0 0.125rem var(--ic-focus-glow) !important;border-radius:var(--ic-space-xxs)}.search-submit-button:focus,.search-submit-button:active *{fill:white}.divider{width:var(--ic-space-1px);background-color:var(--ic-action-dark-active);height:var(--divider-height)}:host(.dark) .divider{background-color:var(--ic-architectural-200)}.menu-container{width:var(--input-width, 20rem);position:relative;top:var(--ic-space-xxxs)}.menu-container.fullwidth{width:100%}.no-results{cursor:not-allowed}.search-results-status{border:0;clip:rect(0, 0, 0, 0, 0);height:var(--ic-space-1px);margin-bottom:calc(-1 * var(--ic-space-1px));margin-right:calc(-1 * var(--ic-space-1px));overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:var(--ic-space-1px)}'}}]);
//# sourceMappingURL=2770.7ca403c3.chunk.js.map
"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[6818],{7123:function(e,t,n){n.d(t,{C:function(){return i}});var i='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M9.70687 6L8.29688 7.41L12.8769 12L8.29688 16.59L9.70687 18L15.7069 12L9.70687 6Z" fill="currentColor"/>\n</svg>\n'},6300:function(e,t,n){n.r(t),n.d(t,{ic_accordion:function(){return h}});var i=n(4942),o=n(4165),a=n(5861),d=n(5671),r=n(3144),s=n(7231),c=n(3422),l=n(7123),p=(n(2158),0),h=function(){function e(t){var n=this;(0,d.Z)(this,e),(0,s.r)(this,t),this.accordionClicked=(0,s.c)(this,"accordionClicked",7),this.accordionId="ic-accordion-".concat(p++),this.toggleExpanded=function(){n.expanded=!n.expanded,n.accordionClicked.emit({id:n.accordionId})},this.setAccordionAnimation=function(e,t,n,i){e.style.transitionDuration="".concat(t,"ms"),e.style.transitionProperty=n,e.style.transitionDelay=i},this.setExpandedContentStyle=function(e,t){"height"===e.propertyName&&t.clientHeight>0&&(t.classList.add("expanded-content-opened"),t.style.height="auto")},this.hideExpandedContent=function(e,t){"height"===e.propertyName&&0===t.clientHeight&&t.style.setProperty("--ic-expanded-content-visiblity","hidden")},this.animateExpandedContent=function(){var e=n.expandedContentEl.scrollHeight;e>0&&n.expanded?(n.expandedContentEl.style.setProperty("--ic-expanded-content-visiblity","visible"),n.expandedContentEl.style.height="".concat(e,"px"),n.setAccordionAnimation(n.expandedContentEl,"300","height","ease-out"),n.expandedContentEl.addEventListener("transitionend",(function(e){n.setExpandedContentStyle(e,n.expandedContentEl)}))):n.expanded||(n.expandedContentEl.style.height="".concat(n.expandedContentEl.scrollHeight,"px"),n.expandedContentEl.scrollHeight>0&&!n.expanded&&(n.expandedContentEl.style.height="0",n.setAccordionAnimation(n.expandedContentEl,"300","height","ease-in"),n.expandedContentEl.classList.remove("expanded-content-opened")),n.expandedContentEl.addEventListener("transitionend",(function(e){n.hideExpandedContent(e,n.expandedContentEl)})))},this.appearance="default",this.disabled=!1,this.expanded=!1,this.heading="",this.message="",this.size="default"}return(0,r.Z)(e,[{key:"handleExpandedWatch",value:function(){this.animateExpandedContent()}},{key:"setFocus",value:function(){var e=(0,a.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.accordionBtnHeading&&this.accordionBtnHeading.focus();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"disconnectedCallback",value:function(){var e=this;this.expandedContentEl&&(this.expandedContentEl.removeEventListener("transitionend",(function(t){return e.setExpandedContentStyle(t,e.expandedContentEl)}),!0),this.expandedContentEl.removeEventListener("transitionend",(function(t){return e.hideExpandedContent(t,e.expandedContentEl)}),!0))}},{key:"componentDidLoad",value:function(){this.expanded&&(this.expandedContentEl.style.height="auto")}},{key:"render",value:function(){var e,t,n,o=this,a=this.appearance,d=this.size,r=this.disabled,p=this.expanded;return(0,s.h)(s.H,{id:this.accordionId,class:(e={},(0,i.Z)(e,"".concat(a),!0),(0,i.Z)(e,"disabled",r),e),"aria-disabled":r?"true":"false"},(0,s.h)("button",{ref:function(e){return o.accordionBtnHeading=e},id:"".concat(this.accordionId,"-button"),disabled:r,tabindex:r?-1:0,class:(t={},(0,i.Z)(t,"".concat(d),!0),(0,i.Z)(t,"section-button",!0),(0,i.Z)(t,"section-button-open",p&&!r),t),"aria-expanded":"".concat(p),"aria-controls":"expanded-content-area",onClick:this.toggleExpanded},(0,c.i)(this.el,"icon")&&(0,s.h)("div",{class:"icon-container"},(0,s.h)("slot",{name:"icon"})),(0,s.h)("ic-typography",{variant:"subtitle-large",class:"section-header"},(0,c.i)(this.el,"heading")?(0,s.h)("slot",{name:"heading"}):this.heading),(0,s.h)("span",{class:(n={},(0,i.Z)(n,"expand-chevron",!0),(0,i.Z)(n,"content-expanded-chevron",p&&!r),n),"aria-hidden":"true",innerHTML:l.C})),(0,s.h)("div",{class:(0,i.Z)({},"expanded-content",!0),"aria-labelledby":"".concat(this.accordionId,"-button"),role:"region","aria-hidden":"".concat(!p),id:"expanded-content-area",ref:function(e){return o.expandedContentEl=e}},(0,s.h)("div",{class:"expanded-content-inner"},(0,s.h)("slot",null))))}},{key:"el",get:function(){return(0,s.g)(this)}}],[{key:"watchers",get:function(){return{expanded:["handleExpandedWatch"]}}}]),e}();h.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block;border-bottom:var(--ic-border-default)}:host(.light) ic-typography,:host(.light) .expanded-content,:host(.light) .icon-container,:host(.light) .expand-chevron{color:var(--ic-architectural-white)}:host(.disabled) ic-typography,:host(.disabled) .icon-container,:host(.disabled) .expand-chevron{color:var(--ic-architectural-500)}.section-button.small{padding:var(--ic-space-xxs) var(--ic-space-xs)}.section-button.large{padding:var(--ic-space-sm) var(--ic-space-xs)}:host(:first-of-type){border-top:var(--ic-border-default)}:focus{outline:none}.section-button{background-color:transparent;display:flex;align-items:center;width:100%;padding:var(--ic-space-xs);font-weight:var(--ic-font-weight-bold);border:none}.section-header{text-align:left;flex:1 0}button:hover:enabled{background-color:var(--ic-action-dark-bg-hover);cursor:pointer}button:active{background-color:var(--ic-action-dark-bg-active)}button:focus{box-shadow:var(--ic-border-focus);border-radius:var(--ic-border-radius);transition:var(--ic-transition-duration-fast)}button:disabled{pointer-events:none}.icon-container{margin:0 var(--ic-space-xs) 0 0;display:flex;align-items:center;width:var(--ic-space-lg);height:var(--ic-space-lg)}::slotted(svg){width:var(--ic-space-md);height:var(--ic-space-md)}.expand-chevron{width:var(--ic-space-lg);height:var(--ic-space-lg);margin-left:calc(var(--ic-space-xl) + var(--ic-space-xs));transform:rotate(90deg);justify-self:end}.content-expanded-chevron{transform:rotate(-90deg)}.expanded-content{height:0;overflow:hidden;display:flex;flex-direction:column;visibility:var(--ic-expanded-content-visiblity, hidden)}.expanded-content-inner{padding:var(--ic-space-xs)}.expanded-content-opened{overflow:visible}'}}]);
//# sourceMappingURL=6818.c6e13524.chunk.js.map
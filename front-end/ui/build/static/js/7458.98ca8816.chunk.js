"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[7458],{7458:function(e,t,o){o.r(t),o.d(t,{ic_popover_menu:function(){return l}});var n=o(4165),i=o(5861),r=o(5671),s=o(3144),a=o(7231),u=o(3422),c=o(2964),l=(o(2158),function(){function e(t){var o=this;(0,r.Z)(this,e),(0,a.r)(this,t),this.ARIA_LABEL="aria-label",this.firstRender=!0,this.popoverMenuEls=[],this.setButtonFocus=function(){var e;null===(e=o.popoverMenuEls[o.currentFocus])||void 0===e||e.focus()},this.findAnchorEl=function(e){var t=null;return null===e||void 0===e?void 0===o.submenuId&&console.error("No anchor specified for popover component"):null===(t=document.querySelector(0===e.indexOf("#")?e:"#"+e))&&console.error("Popover anchor element '".concat(e,"' not found")),t},this.isNotPopoverMenuEl=function(e){var t=e.target;return t.id!==o.anchor&&"IC-MENU-ITEM"!==t.tagName&&"IC-MENU-GROUP"!==t.tagName&&"IC-POPOVER-MENU"!==t.tagName},this.closeMenu=function(){var e;o.open=!1,null===(e=o.anchorEl)||void 0===e||e.focus()},this.getNextItemToSelect=function(e,t){var n=o.popoverMenuEls.length-1;e<1&&(e=0);var i=t?e+1:e-1;return i<0?i=n:i>n&&(i=0),i},this.addMenuItems=function(e){for(var t=0;t<e.length;t++){var n=e[t];if("IC-MENU-ITEM"===n.tagName)o.popoverMenuEls.push(n);else if("IC-MENU-GROUP"===n.tagName){var i=n.shadowRoot.querySelector("ul"),r=(0,u.y)(i);o.addMenuItems(r)}}},this.getMenuAriaLabel=function(){var e=o.host.getAttribute(o.ARIA_LABEL);return void 0!==o.submenuId?"".concat(e,", within nested level ").concat(o.submenuLevel," ").concat(o.parentLabel," submenu,"):e},this.handleBackButtonClick=function(){o.parentPopover.openFromChild(),o.open=!1},this.openingFromChild=!1,this.openingFromParent=!1,this.anchor=void 0,this.parentLabel=void 0,this.parentPopover=void 0,this.submenuId=void 0,this.submenuLevel=1,this.open=void 0}return(0,s.Z)(e,[{key:"watchOpenHandler",value:function(){this.open&&(void 0===this.parentPopover||this.popoverMenuEls.some((function(e){return e.id}))||this.popoverMenuEls.unshift(this.backButton),this.currentFocus=void 0!==this.submenuId?1:0,setTimeout(this.setButtonFocus,50))}},{key:"disconnectedCallback",value:function(){void 0!==this.popperInstance&&this.popperInstance.destroy()}},{key:"componentDidLoad",value:function(){var e=this.host.shadowRoot.querySelector("ul.button"),t=(0,u.y)(e);null!==t&&this.addMenuItems(t),void 0===this.submenuId&&null===this.host.getAttribute(this.ARIA_LABEL)&&console.error("No aria-label specified for popover menu component - aria-label required")}},{key:"componentWillRender",value:function(){this.anchorEl=this.findAnchorEl(this.anchor)}},{key:"componentDidRender",value:function(){if(this.firstRender&&this.open){this.firstRender=!1;var e=!1,t=this.host.closest("ic-dialog");if(null!==t){this.host.classList.add("on-dialog");var o,n=this.host.getBoundingClientRect(),i=t.getBoundingClientRect().bottom,r=this.anchorEl.getBoundingClientRect().height;"false"===t.getAttribute("data-overflow")?i-n.top<n.height&&(e=!0,o=n.height+r+8):(e=!0,o=n.height+r+8+100),!1===e?this.host.classList.add("on-dialog-fix-translate"):(this.host.style.setProperty("--translate-y","".concat(o,"px"),"important"),this.host.classList.add("on-dialog-translate-y"))}this.popperInstance=e?(0,c.c)(this.anchorEl,this.host,{placement:"top"}):(0,c.c)(this.anchorEl,this.host,{placement:"bottom-start",modifiers:[{name:"offset",options:{offset:[0,4]}},{name:"flip",options:{fallbackPlacements:["top-start","top-end","bottom-end"],rootBoundary:"viewport"}}]})}else this.open&&this.popperInstance.update()}},{key:"handleMenuItemClick",value:function(e){e.detail.hasSubMenu||"Back"===e.detail.label||this.closeMenu()}},{key:"handleSubmenuChange",value:function(e){var t=e.target;this.open=!1;var o=document.querySelector("ic-popover-menu[submenu-id=".concat(t.submenuTriggerFor,"]"));o.parentPopover=this.host,o.anchor=this.anchor,o.ariaLabel=this.host.getAttribute(this.ARIA_LABEL),o.openFromParent(),o.submenuLevel=this.submenuLevel+1,o.parentLabel=t.label}},{key:"handleClick",value:function(e){this.open&&this.isNotPopoverMenuEl(e)&&this.closeMenu()}},{key:"handleKeyDown",value:function(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.currentFocus=this.getNextItemToSelect(this.currentFocus,!0),this.setButtonFocus();break;case"ArrowUp":e.preventDefault(),this.currentFocus=this.getNextItemToSelect(this.currentFocus,!1),this.setButtonFocus();break;case"Home":this.currentFocus=0,this.setButtonFocus();break;case"End":this.currentFocus=this.popoverMenuEls.length-1,this.setButtonFocus();break;case"Escape":case"Tab":this.open&&(this.closeMenu(),this.host.blur())}}},{key:"openFromChild",value:function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t=this;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.open=!0,this.openingFromChild=!0,setTimeout((function(){return t.openingFromChild=!1}),1e3);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"openFromParent",value:function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t=this;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.open=!0,this.openingFromParent=!0,setTimeout((function(){return t.openingFromParent=!1}),1e3);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return(0,a.h)(a.H,{class:{open:this.open}},(0,a.h)("div",{id:void 0===this.parentPopover?"ic-popover-submenu-".concat(this.submenuId):"",class:{menu:!0},tabindex:open?"0":"-1"},(0,a.h)("div",{class:{"opening-from-parent":this.openingFromParent,"opening-from-child":this.openingFromChild}},void 0!==this.submenuId&&(0,a.h)("div",null,(0,a.h)("ic-menu-item",{class:"ic-popover-submenu-back-button",ref:function(t){return e.backButton=t},label:"Back",onClick:this.handleBackButtonClick,id:"ic-popover-submenu-back-button-".concat(this.submenuLevel)},(0,a.h)("svg",{slot:"icon",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",class:"submenu-back-icon"},(0,a.h)("path",{d:"M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z",fill:"currentColor"}))),(0,a.h)("ic-typography",{variant:"subtitle-small",class:"parent-label"},this.parentLabel)),(0,a.h)("ul",{class:"button","aria-label":this.getMenuAriaLabel(),role:"menu","aria-owns":void 0!==this.submenuId&&"ic-popover-submenu-back-button-".concat(this.submenuLevel),"aria-controls":void 0!==this.submenuId&&"ic-popover-submenu-back-button-".concat(this.submenuLevel)},(0,a.h)("slot",null)))))}},{key:"host",get:function(){return(0,a.g)(this)}}],[{key:"delegatesFocus",get:function(){return!0}},{key:"watchers",get:function(){return{open:["watchOpenHandler"]}}}]),e}());l.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}@media (prefers-reduced-motion: no-preference){:host .opening-from-parent{animation:slide-in var(--ic-transition-duration-slow) ease-in-out}:host .opening-from-child{animation:slide-out var(--ic-transition-duration-slow) ease-in-out}}:host{border-radius:var(--ic-border-radius);color:var(--ic-color-primary-text);background-color:var(--ic-architectural-white);position:relative;z-index:var(--ic-z-index-popover);box-sizing:border-box;box-shadow:var(--ic-elevation-overlay);display:none}:host(.on-dialog){inset:auto !important}:host(.on-dialog-fix-translate){transform:translate(0, var(--ic-space-xs)) !important}:host(.on-dialog-translate-y){transform:translate(0, calc(-1 * var(--translate-y))) !important}.menu{border:var(--ic-border-default);border-radius:var(--ic-border-radius);background-color:var(--ic-architectural-white);visibility:hidden;height:0}.button{text-decoration:none;list-style-type:none}:host(:focus-within){box-shadow:var(--ic-border-focus)}.menu:focus-visible{outline:none}:host(.open){display:block;min-width:calc(20rem - var(--ic-space-xl));width:var(--popover-width, 20rem);max-width:calc(100vw - var(--ic-space-xl))}:host(.open) .menu{visibility:visible;height:-moz-fit-content;height:fit-content;max-height:var(--max-height, -moz-fit-content);max-height:var(--max-height, fit-content);overflow-y:auto;overflow-x:hidden}.parent-label{color:var(--ic-color-tertiary-text);margin:var(--ic-space-xs) var(--ic-space-xs) 0}@keyframes slide-in{from{opacity:0;transform:translateX(10rem)}to{opacity:1;transform:translateX(0)}}@keyframes slide-out{from{opacity:0;transform:translateX(-10rem)}to{opacity:1;transform:translateX(0)}}'}}]);
//# sourceMappingURL=7458.98ca8816.chunk.js.map
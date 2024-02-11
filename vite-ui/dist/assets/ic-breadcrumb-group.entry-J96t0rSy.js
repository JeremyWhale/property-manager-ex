import{r as d,h as t,H as c,g as b}from"./index-CXEYW8wC.js";import{D as l,e as i,f as o}from"./helpers-c597f246-uPXFvDyQ.js";import"./types-6f6b41a5-azgwIdyq.js";const n=":host{display:block}:host ol{display:flex;list-style-type:none;align-items:center;flex-wrap:wrap;padding:0;margin:0}:host(.back) ol ::slotted(ic-breadcrumb){display:none}:host(.back) ol ::slotted(ic-breadcrumb.show){display:flex}:host(.collapsed) ol ::slotted(ic-breadcrumb.hide){display:none;opacity:0;visibility:hidden}:host(.collapsed) ol ::slotted(ic-breadcrumb.visuallyhidden){display:block;opacity:0;transition:all var(--ic-easing-transition-slow)}:host(.collapsed) ol ::slotted(ic-breadcrumb.fade){opacity:1}",h=class{constructor(r){d(this,r),this.ADD_CLASS_DELAY=50,this.IC_BREADCRUMB="ic-breadcrumb",this.resizeObserver=null,this.SHOW_BACK_ICON="show-back-icon",this.setBackBreadcrumb=()=>{this.backBreadcrumbOnly&&this.setBackBreadcrumbAttr()},this.setBackBreadcrumbAttr=()=>{this.lastParentBreadcrumb&&(this.lastParentBreadcrumb.classList.add("show"),this.lastParentBreadcrumb.setAttribute(this.SHOW_BACK_ICON,"true"))},this.getLastParentBreadcrumb=()=>{const e=Array.from(this.el.querySelectorAll(this.IC_BREADCRUMB));return e.length===1?null:(this.breadcrumbs=e.filter(s=>!s.getAttribute("current")),this.breadcrumb=this.breadcrumbs[this.breadcrumbs.length-1],this.breadcrumb)},this.lastParentBreadcrumb=this.getLastParentBreadcrumb(),this.setDefaultBreadcrumbs=()=>{Array.from(this.el.querySelectorAll(this.IC_BREADCRUMB)).forEach(s=>{s.setAttribute(this.SHOW_BACK_ICON,"false")})},this.setCollapsed=()=>{if(this.collapsed){const e=Array.from(this.el.querySelectorAll(this.IC_BREADCRUMB));this.collapsedBreadcrumbs=e.splice(1,e.length-2).filter(a=>!a.classList.contains("collapsed-breadcrumb-wrapper")),this.collapsedBreadcrumbs.forEach(a=>a.classList.add("hide"));const s=e[0];s&&s.insertAdjacentElement("afterend",this.collapsedBreadcrumbWrapper)}},this.clickHandler=()=>{this.handleHiddenCollapsedBreadcrumbs(this.collapsedBreadcrumbWrapper)},this.renderCollapsedBreadcrumb=()=>{this.collapsedBreadcrumbWrapper=document.createElement("ic-breadcrumb"),this.collapsedBreadcrumbWrapper.classList.add("collapsed-breadcrumb-wrapper"),this.collapsedBreadcrumbEl=document.createElement("button");const e=document.createElement("span");e.id="collapsed-button-label",e.innerText="Collapsed breadcrumbs",e.className="hide",this.collapsedBreadcrumbEl.setAttribute("aria-labelledby","collapsed-button-label");const s=document.createElement("span");return s.id="collapsed-button-described",s.innerText="Select to view collapsed breadcrumbs",s.className="hide",this.collapsedBreadcrumbEl.setAttribute("aria-describedby","collapsed-button-described"),this.collapsedBreadcrumbEl.id="collapsed-ellipsis",this.collapsedBreadcrumbEl.innerText="...",this.collapsedBreadcrumbEl.classList.add("collapsed-breadcrumb"),this.collapsedBreadcrumbEl.addEventListener("click",this.clickHandler),this.collapsedBreadcrumbWrapper.append(s),this.collapsedBreadcrumbWrapper.append(e),this.collapsedBreadcrumbWrapper.append(this.collapsedBreadcrumbEl),this.collapsedBreadcrumbWrapper},this.handleHiddenCollapsedBreadcrumbs=e=>{e.remove(),this.collapsedBreadcrumbs.forEach(s=>{s.classList.add("visuallyhidden"),s.classList.remove("hide"),setTimeout(()=>{s.classList.add("fade")},this.ADD_CLASS_DELAY),this.removeVisuallyHiddenClass(s)}),this.expandedBreadcrumbs=!0},this.transitionendHandler=e=>{e.propertyName==="opacity"&&e.target.classList.remove("visuallyhidden")},this.removeVisuallyHiddenClass=e=>{e.addEventListener("transitionend",this.transitionendHandler)},this.setLastParentCollapsedBackBreadcrumb=()=>{this.setBackBreadcrumbAttr(),this.lastParentBreadcrumb.classList.remove("hide")},this.revertLastParentCollapsedBreadcrumb=()=>{this.lastParentBreadcrumb.setAttribute(this.SHOW_BACK_ICON,"false")},this.resizeObserverCallback=e=>{e!==this.deviceSize&&(this.deviceSize=e,this.deviceSize<=l.S?(this.el.setAttribute("back-breadcrumb-only","true"),this.collapsed?this.setLastParentCollapsedBackBreadcrumb():this.setBackBreadcrumb()):(this.el.setAttribute("back-breadcrumb-only","false"),this.collapsed&&this.breadcrumbs&&this.breadcrumbs.length>2?(this.revertLastParentCollapsedBreadcrumb(),this.expandedBreadcrumbs?this.setDefaultBreadcrumbs():this.setCollapsed()):this.setDefaultBreadcrumbs()))},this.runResizeObserver=()=>{this.resizeObserver=new ResizeObserver(()=>{const e=i();this.resizeObserverCallback(e)}),this.resizeObserver.observe(this.el)},this.deviceSize=l.XL,this.expandedBreadcrumbs=!1,this.appearance="default",this.backBreadcrumbOnly=!1,this.collapsed=!1}componentWillLoad(){const r=Array.from(this.el.querySelectorAll(this.IC_BREADCRUMB));this.appearance!=="default"&&r.forEach(e=>{e.setAttribute("appearance",this.appearance)}),this.backBreadcrumbOnly?this.setBackBreadcrumb():o(this.runResizeObserver),this.collapsed&&(this.collapsedBreadcrumbWrapper=this.renderCollapsedBreadcrumb(),r.length>2&&(i()===l.S?this.setLastParentCollapsedBackBreadcrumb():this.setCollapsed()))}disconnectedCallback(){this.breadcrumb&&this.breadcrumb.removeEventListener("transitionend",this.transitionendHandler),this.collapsedBreadcrumbEl&&this.collapsedBreadcrumbEl.removeEventListener("click",this.clickHandler)}render(){return t(c,{class:{back:this.backBreadcrumbOnly,collapsed:this.collapsed}},t("nav",{"aria-label":"breadcrumbs"},t("ol",null,t("slot",null))))}get el(){return b(this)}};h.style=n;export{h as ic_breadcrumb_group};

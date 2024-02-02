import{r as n,h as s,H as a,g as c}from"./index-PlWJ260r.js";import{O as h,z as d,f as m}from"./helpers-c597f246-uPXFvDyQ.js";import{I as l}from"./types-6f6b41a5-azgwIdyq.js";const p=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.0875 6.175L11.9125 5L6.91251 10L11.9125 15L13.0875 13.825L9.27084 10L13.0875 6.175Z"/>
</svg>`,f=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z"/>
</svg>`,b='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{--border-bottom-color:var(--ic-architectural-300);--splitter-color:var(--ic-architectural-100);display:flex;max-width:100%}:host(.light){--splitter-color:var(--ic-keyline-lighten-rgb)}:host(.dark){--splitter-color:var(--ic-keyline-darken-rgb)}::slotted(*){overflow-x:scroll;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;margin:calc(var(--ic-space-xs) * -1) !important;padding:var(--ic-space-xs) !important}:host(.visible) ::slotted(*){margin:calc(var(--ic-space-xs) * -1) 0 !important;padding:var(--ic-space-xs) !important}.tabs-container::-webkit-scrollbar{display:none}.scroll-container-left,.scroll-container-right{display:flex}.scroll-container-left{margin-left:var(--ic-space-xxs)}.scroll-container-right{margin-right:var(--ic-space-xxs)}.hidden{display:none}.scroll-arrow{margin:var(--ic-space-xxs) 0}.disabled .ic-tooltip-container{display:none !important}.scroll-splitter-left,.scroll-splitter-right{display:flex;height:var(--ic-space-lg);width:var(--ic-space-1px);margin-top:var(--ic-space-xs);border-radius:var(--ic-space-1px);background-color:var(--splitter-color)}.scroll-splitter-left{margin-left:calc(var(--ic-space-xxs) - var(--ic-space-1px))}.scroll-splitter-right{margin-right:calc(var(--ic-space-xxs) - var(--ic-space-1px))}.disabled .scroll-splitter-left,.disabled .scroll-splitter-right{background-color:transparent}.disabled ic-button>svg{color:var(--ic-keyline-darken-rgb)}:host(.dark) .disabled ic-button>svg,:host(.light) .disabled ic-button>svg{color:var(--splitter-color) !important}',o=200,u=class{constructor(t){n(this,t),this.buttonStateSet=!1,this.focusHandler=e=>{this.itemFocusHandler(Array.from(this.items).indexOf(e.target))},this.resizeObserverCallback=()=>{this.el.clientWidth>=this.itemsContainerEl.scrollWidth?this.itemOverflow=!1:this.itemOverflow=h(this.itemsContainerEl),this.itemOverflow&&(this.lastItemVisible=this.itemsContainerEl.offsetWidth+this.itemsContainerEl.scrollLeft>=this.itemsContainerEl.scrollWidth)},this.runResizeObserver=()=>{this.resizeObserver=new ResizeObserver(()=>{this.resizeObserverCallback()}),this.resizeObserver.observe(this.itemsContainerEl)},this.scrollLeft=()=>{this.scrollItemIntoView(this.getCurrentLeftItem()-1)},this.scrollRight=()=>{this.scrollItemIntoView(this.getCurrentLeftItem()+1)},this.longScrollRight=()=>{this.scrollRight(),this.scrollDelay=window.setTimeout(this.longScrollRight,o)},this.longScrollLeft=()=>{this.scrollLeft(),this.scrollDelay=window.setTimeout(this.longScrollLeft,o)},this.leftArrowMouseDownHandler=e=>{e.preventDefault(),this.scrollDelay=window.setTimeout(this.longScrollLeft,o)},this.rightArrowMouseDownHandler=e=>{e.preventDefault(),this.scrollDelay=window.setTimeout(this.longScrollRight,o)},this.arrowMouseUpHandler=()=>{window.clearTimeout(this.scrollDelay)},this.getCurrentLeftItem=()=>{const e=this.itemOffsets.findIndex(i=>i>Math.round(this.itemsContainerEl.scrollLeft));return e<0?0:e},this.scrollHandler=()=>{window.clearTimeout(this.isScrolling),this.isScrolling=window.setTimeout(this.scrollStopped,50)},this.scrollStopped=()=>{const e=Math.round(this.itemsContainerEl.scrollLeft);this.buttonStateSet===!1&&(this.firstItemVisible=e===0,this.lastItemVisible=this.itemsContainerEl.offsetWidth+e>=this.itemsContainerEl.scrollWidth),this.buttonStateSet=!1},this.firstItemVisible=!0,this.itemOverflow=!1,this.lastItemVisible=!1,this.appearance="default",this.focusTrigger="focus"}componentWillLoad(){this.itemsContainerEl=this.el.children[0],this.itemsContainerEl.addEventListener("scroll",this.scrollHandler),this.items=d(this.itemsContainerEl)||Array.from(this.itemsContainerEl.children),this.items.forEach(t=>{t.addEventListener&&t.addEventListener(this.focusTrigger,this.focusHandler)})}componentDidLoad(){let t=0;this.itemOffsets=this.items.map(i=>(t+=i.offsetWidth,t)),m(this.runResizeObserver);const e=Array.from(this.el.shadowRoot.querySelectorAll("div"));["mouseup","mouseleave"].forEach(i=>{e.forEach(r=>r.addEventListener(i,this.arrowMouseUpHandler))})}disconnectedCallback(){this.resizeObserver!==void 0&&this.resizeObserver.disconnect();const t=Array.from(this.el.shadowRoot.querySelectorAll("div"));["mouseup","mouseleave"].forEach(e=>{t.forEach(i=>i.removeEventListener(e,this.arrowMouseUpHandler))}),this.items.forEach(e=>{e.removeEventListener&&e.removeEventListener(this.focusTrigger,this.focusHandler)}),this.itemsContainerEl.removeEventListener("scroll",this.scrollHandler)}async scrollItemIntoView(t){this.firstItemVisible=t<=0;const e=t<=0?0:this.itemOffsets[t-1];this.lastItemVisible=this.itemsContainerEl.offsetWidth+e>=this.itemsContainerEl.scrollWidth,this.buttonStateSet=!0,this.itemsContainerEl.scrollLeft=e}itemFocusHandler(t){this.itemOverflow&&this.scrollItemIntoView(t)}render(){const{appearance:t,firstItemVisible:e,lastItemVisible:i,itemOverflow:r}=this;return s(a,{class:{visible:r,dark:this.appearance===l.Dark,light:this.appearance===l.Light}},s("div",{"aria-hidden":"true",class:{"scroll-container-left":!0,hidden:!r,disabled:e},role:"tab"},s("ic-button",{class:"scroll-arrow",variant:"icon","aria-label":"Scroll left",appearance:t,innerHTML:p,disabled:e,tabindex:"-1",onClick:this.scrollLeft,onMouseDown:this.leftArrowMouseDownHandler}),s("span",{class:"scroll-splitter-left"})),s("slot",null),s("div",{"aria-hidden":"true",class:{"scroll-container-right":!0,hidden:!r,disabled:i},role:"tab"},s("span",{class:"scroll-splitter-right"}),s("ic-button",{class:"scroll-arrow",variant:"icon","aria-label":"Scroll right",appearance:t,innerHTML:f,disabled:i,tabindex:"-1",onClick:this.scrollRight,onMouseDown:this.rightArrowMouseDownHandler})))}get el(){return c(this)}};u.style=b;export{u as ic_horizontal_scroll};

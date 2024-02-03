import{r as c,c as g,h as a,H as b,g as m}from"./index-ED5IkIG6.js";import{j as f,a as y}from"./helpers-c597f246-uPXFvDyQ.js";import"./types-6f6b41a5-azgwIdyq.js";const p=`<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="currentColor"/>
</svg>
`,u=`<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1709 8.825L7.34589 5L11.1709 1.175L9.99589 0L4.99589 5L9.99589 10L11.1709 8.825ZM0.829224 0H2.49589V10H0.829224V0Z" fill="currentColour"/>
</svg>`,v='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{box-sizing:border-box;width:100%;display:flex;justify-content:center}nav{width:100%;display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center}ic-button{cursor:pointer}ic-button.next-previous{--icon-width:var(--ic-space-xs);--icon-height:calc(var(--ic-space-xs) + var(--ic-space-xxxs));padding:0 var(--ic-space-xxs) 0 var(--ic-space-xxxs)}ic-button.first-last{--icon-width:calc(var(--ic-space-sm) + var(--ic-space-xxxs));--icon-height:calc(var(--ic-space-xs) + var(--ic-space-xxxs))}.disabled{color:var(--ic-architectural-200);pointer-events:none;cursor:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.hide-current-page{display:none}',C=class{constructor(i){c(this,i),this.icPageChange=g(this,"icPageChange",7),this.handleClickFirst=()=>{this.currentPage=1,this.icPageChange.emit({value:this.currentPage})},this.handleClickPrevious=()=>{this.currentPage--,this.icPageChange.emit({value:this.currentPage})},this.handleClickNext=()=>{this.currentPage++,this.icPageChange.emit({value:this.currentPage})},this.handleClickLast=()=>{this.currentPage=this.pages,this.icPageChange.emit({value:this.currentPage})},this.firstButton=()=>a("ic-button",{id:"first-page-button","aria-label":"Go to first page",appearance:this.appearance,onClick:this.handleClickFirst,class:"page-button first-last",disabled:this.currentPage===1||this.disabled,variant:"icon",innerHTML:u}),this.previousButton=()=>a("ic-button",{id:"previous-page-button","aria-label":"Go to previous page",appearance:this.appearance,onClick:this.handleClickPrevious,class:"page-button next-previous flip",disabled:this.currentPage===1||this.disabled,variant:"icon",innerHTML:p}),this.nextButton=()=>a("ic-button",{id:"next-page-button","aria-label":"Go to next page",appearance:this.appearance,onClick:this.handleClickNext,class:"page-button next-previous",disabled:this.currentPage===this.pages||this.disabled,variant:"icon",innerHTML:p}),this.lastButton=()=>a("ic-button",{id:"last-page-button","aria-label":"Go to last page",appearance:this.appearance,onClick:this.handleClickLast,class:"page-button first-last flip",disabled:this.currentPage===this.pages||this.disabled,variant:"icon",innerHTML:u}),this.renderStartEllipsis=()=>a("ic-pagination-item",{appearance:this.appearance,type:"ellipsis",id:"start-ellipsis",disabled:this.disabled}),this.renderEndEllipsis=()=>a("ic-pagination-item",{appearance:this.appearance,type:"ellipsis",id:"end-ellipsis",disabled:this.disabled}),this.renderStartItems=()=>this.startItems.map(e=>a("ic-pagination-item",{appearance:this.appearance,selected:e===this.currentPage,id:`pagination-item-${e}`,type:"page",page:e,disabled:this.disabled})),this.renderEndItems=()=>this.endItems.map(e=>a("ic-pagination-item",{appearance:this.appearance,selected:e===this.currentPage,id:`pagination-item-${e}`,type:"page",page:e,disabled:this.disabled})),this.renderMiddleItems=()=>this.midItems.map(e=>a("ic-pagination-item",{appearance:this.appearance,selected:e===this.currentPage,id:`pagination-item-${e}`,type:"page",page:e,disabled:this.disabled})),this.endEllipsis=!1,this.endItems=[],this.midItems=[],this.startEllipsis=!1,this.startItems=[],this.adjacentCount=1,this.appearance="default",this.boundaryCount=1,this.defaultPage=1,this.disabled=!1,this.hideCurrentPage=!1,this.hideFirstAndLastPageButton=!1,this.label="Page",this.pages=void 0,this.type="simple",this.currentPage=this.defaultPage}watchNumberPagesHandler(){this.watchPageChangeHandler()}watchPageChangeHandler(){if(this.type==="simple")return;this.startEllipsis=!1,this.endEllipsis=!1,this.startItems=[],this.endItems=[],this.midItems=[];const i=[];let e=0;const o=[];let l=this.pages;const r=[];let s,n,h=!1,d=!1;if(this.pages<=this.boundaryCount*2+this.adjacentCount*2+3){this.startEllipsis=!1,this.endEllipsis=!1;for(let t=1;t<=this.pages;t++)i.push(t);this.startItems=i;return}if(e=this.boundaryCount===0?1:this.boundaryCount,l=this.boundaryCount===0?this.pages:this.pages-this.boundaryCount+1,this.currentPage<=this.adjacentCount+this.boundaryCount+2){h=!1,d=!0;let t=2*this.adjacentCount+1;this.boundaryCount===0&&t--,s=e+1,n=s+t}else if(h=!0,this.currentPage>this.pages-(this.adjacentCount+this.boundaryCount+2)){let t=2*this.adjacentCount+1;this.boundaryCount===0&&t--,n=this.boundaryCount===0?this.pages-1:this.pages-this.boundaryCount,s=n-t}else d=!0,s=this.currentPage-this.adjacentCount,n=this.currentPage+this.adjacentCount;if(this.boundaryCount>0||this.boundaryCount===0&&h===!1)for(let t=1;t<=e;t++)i.push(t);if(this.boundaryCount>0||this.boundaryCount===0&&d===!1)for(let t=l;t<=this.pages;t++)o.push(t);for(let t=s;t<=n;t++)r.push(t);this.startEllipsis=h,this.endEllipsis=d,this.startItems=i,this.endItems=o,this.midItems=r}componentWillLoad(){this.watchPageChangeHandler(),this.boundaryCount>2&&(this.boundaryCount=2),this.adjacentCount>2&&(this.adjacentCount=2),f(this.disabled,this.el)}componentDidLoad(){y([{prop:this.pages,propName:"pages"}],"Pagination")}paginationItemClickHandler(i){const e=i.detail.page;this.currentPage=e,this.icPageChange.emit({value:this.currentPage})}async setCurrentPage(i){typeof i=="number"&&i>0&&i<=this.pages?this.currentPage=i:console.error("Current page must be a number greater than zero but less than or equal to the total number of pages")}render(){const{type:i,pages:e,currentPage:o,hideCurrentPage:l,disabled:r,hideFirstAndLastPageButton:s,label:n}=this;return a(b,null,i==="simple"&&a("nav",{class:{disabled:r},role:"navigation","aria-label":"Pagination Navigation"},s?null:this.firstButton(),this.previousButton(),a("ic-pagination-item",{pages:e,appearance:this.appearance,type:"simple-current",page:o,label:n,class:{"hide-current-page":l}}),this.nextButton(),s?null:this.lastButton()),i==="complex"&&a("nav",{class:{disabled:r},role:"navigation","aria-label":"Pagination Navigation"},s?null:this.firstButton(),this.previousButton(),this.renderStartItems(),this.startEllipsis&&this.renderStartEllipsis(),this.renderMiddleItems(),this.endEllipsis&&this.renderEndEllipsis(),this.renderEndItems(),this.nextButton(),s?null:this.lastButton()))}get el(){return m(this)}static get watchers(){return{pages:["watchNumberPagesHandler"],currentPage:["watchPageChangeHandler"]}}};C.style=v;export{C as ic_pagination};
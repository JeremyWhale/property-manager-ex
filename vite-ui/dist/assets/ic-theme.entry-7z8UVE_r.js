import{r as i,c as h,h as n,H as a}from"./index-PlWJ260r.js";import{J as o,K as c,W as l,h as m,r as g,u}from"./helpers-c597f246-uPXFvDyQ.js";import"./types-6f6b41a5-azgwIdyq.js";const p=class{constructor(r){i(this,r),this.themeChange=h(this,"themeChange",7),this.checkThemeColorContrast=()=>{o()<c&&o()>l&&console.warn("The theme colour does not provide enough contrast with either of the ICDS black or white foreground colours. Consider choosing a colour with a different brightness to achieve sufficient colour contrast for good visibility. See https://www.w3.org/TR/AERT/#color-contrast for more information about colour contrast.")},this.setThemeColor=()=>{if(this.color!==null){let e=null;const t=this.color.slice(0,1);t==="#"?e=m(this.color):t.toLowerCase()==="r"&&(e=g(this.color)),this.setThemeRGBA(e)}},this.setThemeRGBA=e=>{if(e!==null){const t=document.documentElement;t.style.setProperty("--ic-theme-primary-r",e.r.toString()),t.style.setProperty("--ic-theme-primary-g",e.g.toString()),t.style.setProperty("--ic-theme-primary-b",e.b.toString()),t.style.setProperty("--ic-theme-primary-a",e.a.toString()),this.checkThemeColorContrast();const s=u();this.themeChange.emit({mode:s,color:e})}},this.color=null}watchColorPropHandler(){this.setThemeColor()}componentWillLoad(){this.setThemeColor()}render(){return n(a,null)}static get watchers(){return{color:["watchColorPropHandler"]}}};export{p as ic_theme};

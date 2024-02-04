import{r as l,c as h,h as c,g as o}from"./index-zYbNANVr.js";import{I as d}from"./types-6f6b41a5-azgwIdyq.js";const u=class{constructor(s){l(this,s),this.icTabSelect=h(this,"icTabSelect",3),this.tabSelect=h(this,"tabSelect",3),this.newTabPanels=[],this.newTabs=[],this.linkTabs=()=>{this.tabs.forEach((e,t)=>{const a=`ic-tab-${t}-context-${this.contextId}`,i=`ic-tab-panel-${t}-context-${this.contextId}`,n=`ic-tab--${t}-context-${this.contextId}`,b="context-id";e.setAttribute("id",a),e.tabId=n,e.tabPosition=t,e.setAttribute("aria-controls",i),e.setAttribute(b,this.contextId),this.tabGroup.setAttribute(b,this.contextId),this.tabPanels[t].setAttribute("id",i),this.tabPanels[t].panelId=n,this.tabPanels[t].tabPosition=t,this.tabPanels[t].setAttribute("aria-labelledby",a),this.tabPanels[t].setAttribute(b,this.contextId),this.appearance===d.Light&&(e.appearance=this.appearance,this.tabPanels[t].appearance=this.appearance)}),this.appearance===d.Light&&(this.tabGroup.appearance=this.appearance)},this.getChildren=()=>{this.tabGroup=this.el.querySelector("ic-tab-group"),this.tabs=Array.from(this.tabGroup.querySelectorAll("ic-tab")),this.tabPanels=Array.from(this.el.children).filter(e=>e.tagName==="IC-TAB-PANEL"),this.enabledTabs=this.getEnabledTabs()},this.keydownHandler=e=>{this.activationType==="automatic"?this.handleKeyBoardNavAutomatic(e):this.handleKeyBoardNavManual(e)},this.attatchEventListeners=()=>{this.tabGroup.addEventListener("keydown",this.keydownHandler)},this.setControlledMode=()=>{this.selectedTabIndex!==void 0&&(this.controlledMode=!0,this.selectedTab=this.selectedTabIndex)},this.setInitialTab=()=>{if(this.controlledMode)this.selectedTab=this.selectedTabIndex,this.focusedTabIndex=this.selectedTabIndex;else{const e=this.tabs.findIndex(t=>t.tabId===this.enabledTabs[0].tabId);this.selectedTab=e,this.focusedTabIndex=e}},this.configureTabs=()=>{this.enabledTabs.forEach(e=>{e.selected=e.tabPosition===this.selectedTab}),this.tabPanels.forEach(e=>{e.selectedTab=this.tabs[this.selectedTab].tabId})},this.getEnabledTabs=()=>Array.from(this.tabs).filter(e=>!e.disabled),this.getIndexOfEnabledTab=e=>this.enabledTabs.findIndex(t=>t.tabId===this.tabs[e].tabId),this.keyboardSelectTab=e=>{const t=this.tabs.findIndex(a=>a.tabId===this.enabledTabs[e].tabId);this.enabledTabs[e].focus(),this.controlledMode?(this.icTabSelect.emit({tabIndex:t}),this.tabSelect.emit({tabIndex:t})):this.selectedTab=t},this.keyboardFocusTab=e=>{const t=this.tabs.findIndex(a=>a.tabId===this.enabledTabs[e].tabId);this.enabledTabs[e].focus(),this.focusedTabIndex=t},this.handleKeyBoardNavAutomatic=e=>{const t=e.key,a=this.getIndexOfEnabledTab(this.selectedTab);let i=!0;switch(t){case"Home":this.keyboardSelectTab(0);break;case"End":this.keyboardSelectTab(this.enabledTabs.length-1);break;case"ArrowRight":a<this.enabledTabs.length-1?this.keyboardSelectTab(a+1):this.keyboardSelectTab(0);break;case"ArrowLeft":a>0?this.keyboardSelectTab(a-1):this.keyboardSelectTab(this.enabledTabs.length-1);break;default:i=!1}i&&e.preventDefault()},this.handleKeyBoardNavManual=e=>{const t=e.key,a=this.getIndexOfEnabledTab(this.focusedTabIndex);let i=!0;switch(t){case"Home":this.keyboardFocusTab(0);break;case"End":this.keyboardFocusTab(this.enabledTabs.length-1);break;case"ArrowRight":a<this.enabledTabs.length-1?this.keyboardFocusTab(a+1):this.keyboardFocusTab(0);break;case"ArrowLeft":a>0?this.keyboardFocusTab(a-1):this.keyboardFocusTab(this.enabledTabs.length-1);break;case"Enter":this.keyboardSelectTab(this.focusedTabIndex);break;case" ":this.keyboardSelectTab(this.focusedTabIndex);break;default:i=!1}i&&e.preventDefault()},this.selectedTab=void 0,this.activationType="automatic",this.appearance="dark",this.contextId="default",this.selectedTabIndex=void 0}updateSelectedTab(s){this.selectedTab=s}componentDidLoad(){this.setControlledMode(),this.getChildren(),this.linkTabs(),this.attatchEventListeners(),this.setInitialTab(),this.configureTabs()}componentWillUpdate(){this.configureTabs()}disconnectedCallback(){this.tabGroup.removeEventListener("keydown",this.keydownHandler)}tabClickHandler(s){this.selectedTabIndex===void 0&&s.detail.contextId===this.contextId&&(this.selectedTab=s.detail.position),this.icTabSelect.emit({tabIndex:s.detail.position}),this.tabSelect.emit({tabIndex:s.detail.position}),s.stopImmediatePropagation()}tabCreatedHandler(s){this.tabs&&this.tabPanels&&((s.detail.setFocus?this.newTabs:this.newTabPanels).push(s.detail),this.newTabs.length===this.newTabPanels.length&&(this.tabs.push(...this.newTabs),this.tabPanels.push(...this.newTabPanels),this.enabledTabs=this.getEnabledTabs(),this.linkTabs(),this.newTabs=[],this.newTabPanels=[]))}tabEnabledHandler(){this.enabledTabs=this.getEnabledTabs()}async tabRemovedHandler(s){this.getChildren(),this.enabledTabs=this.getEnabledTabs(),this.linkTabs(),this.tabs[this.selectedTab]&&this.tabPanels[this.selectedTab]?(this.tabs[this.selectedTab].selected=!0,this.tabPanels[this.selectedTab].selectedTab=this.tabs[this.selectedTab].tabId):this.setInitialTab(),s&&this.tabs[this.selectedTab].setFocus()}render(){return c("slot",null)}get el(){return o(this)}static get watchers(){return{selectedTabIndex:["updateSelectedTab"]}}};export{u as ic_tab_context};

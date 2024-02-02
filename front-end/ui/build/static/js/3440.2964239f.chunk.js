"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[3440],{3440:function(e,t,a){a.r(t),a.d(t,{ic_tab_context:function(){return l}});var n=a(4165),s=a(5861),i=a(3433),b=a(5671),c=a(3144),d=a(7231),o=a(2158),l=function(){function e(t){var a=this;(0,b.Z)(this,e),(0,d.r)(this,t),this.icTabSelect=(0,d.c)(this,"icTabSelect",3),this.tabSelect=(0,d.c)(this,"tabSelect",3),this.newTabPanels=[],this.newTabs=[],this.linkTabs=function(){a.tabs.forEach((function(e,t){var n="ic-tab-".concat(t,"-context-").concat(a.contextId),s="ic-tab-panel-".concat(t,"-context-").concat(a.contextId),i="ic-tab--".concat(t,"-context-").concat(a.contextId),b="context-id";e.setAttribute("id",n),e.tabId=i,e.tabPosition=t,e.setAttribute("aria-controls",s),e.setAttribute(b,a.contextId),a.tabGroup.setAttribute(b,a.contextId),a.tabPanels[t].setAttribute("id",s),a.tabPanels[t].panelId=i,a.tabPanels[t].tabPosition=t,a.tabPanels[t].setAttribute("aria-labelledby",n),a.tabPanels[t].setAttribute(b,a.contextId),a.appearance===o.I.Light&&(e.appearance=a.appearance,a.tabPanels[t].appearance=a.appearance)})),a.appearance===o.I.Light&&(a.tabGroup.appearance=a.appearance)},this.getChildren=function(){a.tabGroup=a.host.querySelector("ic-tab-group"),a.tabs=Array.from(a.tabGroup.querySelectorAll("ic-tab")),a.tabPanels=Array.from(a.host.children).filter((function(e){return"IC-TAB-PANEL"===e.tagName})),a.enabledTabs=a.getEnabledTabs()},this.keydownHandler=function(e){"automatic"===a.activationType?a.handleKeyBoardNavAutomatic(e):a.handleKeyBoardNavManual(e)},this.attatchEventListeners=function(){a.tabGroup.addEventListener("keydown",a.keydownHandler)},this.setControlledMode=function(){void 0!==a.selectedTabIndex&&(a.controlledMode=!0,a.selectedTab=a.selectedTabIndex)},this.setInitialTab=function(){if(a.controlledMode)a.selectedTab=a.selectedTabIndex,a.focusedTabIndex=a.selectedTabIndex;else{var e=a.tabs.findIndex((function(e){return e.tabId===a.enabledTabs[0].tabId}));a.selectedTab=e,a.focusedTabIndex=e}},this.configureTabs=function(){a.enabledTabs.forEach((function(e){e.selected=e.tabPosition===a.selectedTab})),a.tabPanels.forEach((function(e){e.selectedTab=a.tabs[a.selectedTab].tabId}))},this.getEnabledTabs=function(){return Array.from(a.tabs).filter((function(e){return!e.disabled}))},this.getIndexOfEnabledTab=function(e){return a.enabledTabs.findIndex((function(t){return t.tabId===a.tabs[e].tabId}))},this.keyboardSelectTab=function(e){var t=a.tabs.findIndex((function(t){return t.tabId===a.enabledTabs[e].tabId}));a.enabledTabs[e].focus(),a.controlledMode?(a.icTabSelect.emit({tabIndex:t}),a.tabSelect.emit({tabIndex:t})):a.selectedTab=t},this.keyboardFocusTab=function(e){var t=a.tabs.findIndex((function(t){return t.tabId===a.enabledTabs[e].tabId}));a.enabledTabs[e].focus(),a.focusedTabIndex=t},this.handleKeyBoardNavAutomatic=function(e){var t=e.key,n=a.getIndexOfEnabledTab(a.selectedTab),s=!0;switch(t){case"Home":a.keyboardSelectTab(0);break;case"End":a.keyboardSelectTab(a.enabledTabs.length-1);break;case"ArrowRight":n<a.enabledTabs.length-1?a.keyboardSelectTab(n+1):a.keyboardSelectTab(0);break;case"ArrowLeft":n>0?a.keyboardSelectTab(n-1):a.keyboardSelectTab(a.enabledTabs.length-1);break;default:s=!1}s&&e.preventDefault()},this.handleKeyBoardNavManual=function(e){var t=e.key,n=a.getIndexOfEnabledTab(a.focusedTabIndex),s=!0;switch(t){case"Home":a.keyboardFocusTab(0);break;case"End":a.keyboardFocusTab(a.enabledTabs.length-1);break;case"ArrowRight":n<a.enabledTabs.length-1?a.keyboardFocusTab(n+1):a.keyboardFocusTab(0);break;case"ArrowLeft":n>0?a.keyboardFocusTab(n-1):a.keyboardFocusTab(a.enabledTabs.length-1);break;case"Enter":case" ":a.keyboardSelectTab(a.focusedTabIndex);break;default:s=!1}s&&e.preventDefault()},this.selectedTab=void 0,this.activationType="automatic",this.appearance="dark",this.contextId="default",this.selectedTabIndex=void 0}return(0,c.Z)(e,[{key:"updateSelectedTab",value:function(e){this.selectedTab=e}},{key:"componentDidLoad",value:function(){this.setControlledMode(),this.getChildren(),this.linkTabs(),this.attatchEventListeners(),this.setInitialTab(),this.configureTabs()}},{key:"componentWillUpdate",value:function(){this.configureTabs()}},{key:"disconnectedCallback",value:function(){this.tabGroup.removeEventListener("keydown",this.keydownHandler)}},{key:"tabClickHandler",value:function(e){void 0===this.selectedTabIndex&&e.detail.contextId===this.contextId&&(this.selectedTab=e.detail.position),this.icTabSelect.emit({tabIndex:e.detail.position}),this.tabSelect.emit({tabIndex:e.detail.position}),e.stopImmediatePropagation()}},{key:"tabCreatedHandler",value:function(e){var t,a;this.tabs&&this.tabPanels&&((e.detail.setFocus?this.newTabs:this.newTabPanels).push(e.detail),this.newTabs.length===this.newTabPanels.length&&((t=this.tabs).push.apply(t,(0,i.Z)(this.newTabs)),(a=this.tabPanels).push.apply(a,(0,i.Z)(this.newTabPanels)),this.enabledTabs=this.getEnabledTabs(),this.linkTabs(),this.newTabs=[],this.newTabPanels=[]))}},{key:"tabEnabledHandler",value:function(){this.enabledTabs=this.getEnabledTabs()}},{key:"tabRemovedHandler",value:function(){var e=(0,s.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.getChildren(),this.enabledTabs=this.getEnabledTabs(),this.linkTabs(),this.tabs[this.selectedTab]&&this.tabPanels[this.selectedTab]?(this.tabs[this.selectedTab].selected=!0,this.tabPanels[this.selectedTab].selectedTab=this.tabs[this.selectedTab].tabId):this.setInitialTab(),t&&this.tabs[this.selectedTab].setFocus();case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return(0,d.h)("slot",null)}},{key:"host",get:function(){return(0,d.g)(this)}}],[{key:"watchers",get:function(){return{selectedTabIndex:["updateSelectedTab"]}}}]),e}()},2158:function(e,t,a){var n,s;a.d(t,{I:function(){return s},a:function(){return n}}),function(e){e.Warning="warning",e.Error="error",e.Success="success"}(n||(n={})),function(e){e.Default="default",e.Dark="dark",e.Light="light"}(s||(s={}))}}]);
//# sourceMappingURL=3440.2964239f.chunk.js.map
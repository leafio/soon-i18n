(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("soon-i18n-common")):typeof define=="function"&&define.amd?define(["exports","soon-i18n-common"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["soon-i18n"]={},t["soon-i18n-common"]))})(this,function(t,e){"use strict";const u=s=>{const a=e.flatTreeKey(s);return(n,...c)=>e.formatObjKey(a,n,...c)},d=(s,a={})=>{let n=s.lang??"";const c=s.fallbacks,l={};return e.loadSyncLocales(a,l),{tLocales:(o={})=>{const r={};return e.loadSyncLocales(o,r),(g,...y)=>{const i={};return[n,...c].reverse().forEach(f=>{Object.assign(i,l[f],r[f])}),e.formatObjKey(i,g,...y)}},getLang:()=>n,setLang:o=>{n=o}}};t.createI18n=d,t.yi=u,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
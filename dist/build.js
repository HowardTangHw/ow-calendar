!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("owCalendar",[],t):"object"==typeof exports?exports.owCalendar=t():e.owCalendar=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=2)}([function(e,t){function a(e,t){var a=e[1]||"",i=e[3];if(!i)return a;if(t&&"function"==typeof btoa){var o=n(i);return[a].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return[a].join("\n")}function n(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=a(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,a){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(n[o]=!0)}for(i=0;i<e.length;i++){var r=e[i];"number"==typeof r[0]&&n[r[0]]||(a&&!r[2]?r[2]=a:a&&(r[2]="("+r[2]+") and ("+a+")"),t.push(r))}},t}},function(e,t,a){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var i=a(10),o=a(11);t.a={name:"owCalendar",mixins:[o.a],data:function(){return{allMonthData:[],checkInDate:{day:null,month:null},checkOutDate:{day:null,month:null},util:i.a}},props:{showMonthNumbers:{type:[Number,String],default:12},startDate:{type:[String],default:i.a.format(new Date,"yyyy/MM/dd")},disabledDate:{type:Array,default:function(){return[]}},multiple:{type:Boolean,default:!1},transition:{type:String,default:"pop-fade"},needChoiceDays:{type:[Number,String],default:0},infoText:{type:String,default:""},formatType:{type:String,default:"yyyy/MM/dd"},maxChoiceDays:{type:[Number,String],default:15}},created:function(){this.getAllMonthData(this.showMonthNumbers)},computed:{resultDate:function(){if(this.checkInDate.day&&this.checkInDate.day.isCheckInDate&&!this.multiple)return[this.formatFn(this.checkInDate.day.date)];if(this.multiple){var e=this.checkInDate.day&&this.checkInDate.day.isCheckInDate?this.checkInDate.day.date:void 0,t=this.checkOutDate.day&&this.checkOutDate.day.isCheckOutDate?this.checkOutDate.day.date:void 0;return[this.formatFn(e),this.formatFn(t),this.choiceDaysCount]}return[]},choiceDaysCount:function(){var e=this.leftDate,t=this.rightDate;return parseInt(Math.abs(e-t)/1e3/60/60/24)+1},choiceFlag:function(){return this.checkInDate.day?this.multiple?this.checkOutDate.day&&this.checkOutDate.day.isCheckOutDate?this.choiceDaysCount<this.needChoiceDays&&this.choiceDaysCount<=this.maxChoiceDays?3:!(this.choiceDaysCount>this.maxChoiceDays)||4:2:1:0},choiceInfo:function(){switch(this.choiceFlag){case 0:return"未选择";case 1:return"已选择  "+this.formatFn(this.checkInDate.day.date);case 2:return"请选择结束日期";case 3:var e="请至少选择"+this.needChoiceDays+"天"+(this.needChoiceDays-1)+"晚";return this.$emit.apply(this,["multiple-choice-end"].concat(n(this.resultDate))),this.needChoiceDays>0&&this.infoText.length>0&&(e=this.infoText),e;case 4:var t="最多选择"+this.maxChoiceDays+"天"+(this.maxChoiceDays-1)+"晚";return this.$emit.apply(this,["multiple-choice-end"].concat(n(this.resultDate))),t;default:return this.$emit.apply(this,["multiple-choice-end"].concat(n(this.resultDate))),this.needChoiceDays>0&&this.infoText.length>0?this.infoText:""}},leftDate:function(){return new Date(this.checkInDate.day.date.replace(/-/g,"/"))},rightDate:function(){return new Date(this.checkOutDate.day.date.replace(/-/g,"/"))}},methods:{formatFn:function(e){return i.a.format(new Date(e),this.formatType)},getMonthData:function(e,t){for(var a=this,n=[],i=new Date(e,t-1,1),o=i.getDay(),r=i.getDay(),s=r-1,c=new Date(e,t,0),l=c.getDate(),f=0;f<38;f++){(function(i){var r=i-s,c=r,f=e+"/"+(t<10?"0"+t:t)+"/"+(c<10?"0"+c:c),h=-1!==a.disabledDate.findIndex(function(e){return a.formatFn(e)===a.formatFn(f)});if(r<=0)c="";else if(r>l)return"continue";var d=(c+o)%7==0||(c+o)%7==1;n.push({showDate:c,isWeekend:d,isCheckInDate:!1,isCheckOutDate:!1,isDisable:h,date:f})})(f)}return n},getAllMonthData:function(e){for(var t=new Date(this.startDate.replace(/-/g,"/")),a=t.getFullYear(),n=t.getMonth()+1,i=[],o=0;o<e;o++)n>12&&(a+=1,n=1),i[o]={year:a,month:n,date:this.getMonthData(a,n)},n+=1;var r=!0,s=!1,c=void 0;try{for(var l,f=i[0].date[Symbol.iterator]();!(r=(l=f.next()).done);r=!0){var h=l.value,d=new Date(this.startDate.replace(/-/g,"/"));if(h.showDate>=d.getDate())break;h.isDisable=!0}}catch(e){s=!0,c=e}finally{try{!r&&f.return&&f.return()}finally{if(s)throw c}}this.allMonthData=i},setCheckInDate:function(e,t){this.checkInDate={day:t,month:e}},setCheckOutDate:function(e,t){this.checkOutDate={day:t,month:e}},decideSetCheckOutDate:function(e,t){new Date(t.date.replace(/-/g,"/"))>this.leftDate&&this.disabledFlag(t.date)?(t.isCheckOutDate=!0,t.isCheckInDate=!1,this.setCheckOutDate(e,t)):(this.checkInDate.day.isCheckInDate=!1,t.isCheckInDate=!0,this.setCheckInDate(e,t))},selectDate:function(e,t){if(!t.isDisable){if(null==this.checkInDate.day||!this.multiple)return this.checkInDate.day&&(this.checkInDate.day.isCheckInDate=!1),t.isCheckInDate=!0,void this.setCheckInDate(e,t);if(null==this.checkOutDate.day||!this.checkOutDate.day.isCheckOutDate)return void this.decideSetCheckOutDate(e,t);this.checkInDate.day.isCheckInDate=!1,this.checkOutDate.day.isCheckOutDate=!1,t.isCheckInDate=!0,this.setCheckInDate(e,t)}},selectCss:function(e){if(!this.multiple)return!1;var t=new Date(e.replace(/-/g,"/"));if(null==this.checkInDate.day||null==this.checkOutDate.day||!this.checkInDate.day.isCheckInDate||!this.checkOutDate.day.isCheckOutDate)return!1;var a=this.leftDate,n=this.rightDate;return a<=t&&t<=n},confirm:function(){return!0!==this.choiceFlag&&1!==this.choiceFlag||(this.show=!1,this.$emit.apply(this,["confirm"].concat(n(this.resultDate)))),!1},disabledFlag:function(e){var t=this.leftDate,a=new Date(e.replace(/-/g,"/"));return-1===this.disabledDate.findIndex(function(e){var n=new Date(e.replace(/-/g,"/"));return t<n&&n<a})}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),i={install:function(e,t){e.component(n.a.name,n.a)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(i),t.default=i},function(e,t,a){"use strict";function n(e){a(4)}var i=a(1),o=a(12),r=a(9),s=n,c=r(i.a,o.a,!1,s,"data-v-975e06f0",null);t.a=c.exports},function(e,t,a){var n=a(5);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(7)("bf1be538",n,!0,{})},function(e,t,a){t=e.exports=a(0)(!1),t.i(a(6),""),t.push([e.i,'@font-face{font-family:iconfont;src:url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUAAAsAAAAAB2wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kgOY21hcAAAAYAAAABeAAABhpnIBr5nbHlmAAAB4AAAATIAAAFYm+t2FGhlYWQAAAMUAAAALwAAADYRrGkfaGhlYQAAA0QAAAAcAAAAJAfeA4RobXR4AAADYAAAAAwAAAAMC+kAAGxvY2EAAANsAAAACAAAAAgAdgCsbWF4cAAAA3QAAAAfAAAAIAESAF1uYW1lAAADlAAAAUUAAAJtPlT+fXBvc3QAAATcAAAAIwAAADTK8dt6eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDxTYW7438AQw9zA0AAUZgTJAQAmCAyQeJzFkMENgDAMAy9t6QMxRh88GIgXc3TirlFMKA8mqCXHimMpUYAFiOIhJrAL48Ep19yPrO4nz2SpEait9K7+U0U0y65BJTMNNm/1H5vXfXT6CnVQJ7byknADqh8MHwAAeJxtzz1Lw1AUBuBz7jVfbZrYm++kaZrE5irVgjHWQWwXF8VBcHJpcXHTtYtDF8HBwdmtRfAvOPTPiOLPiKa6ejhweOHlwAMCwPc7XVIXDNiEXTiGcwAUe5hoJMSYF33SQysWLMfUKE95LKVJnx6hk4imnQ+KzBElUUcN27gX5wPeJxz3iyE5xNwOEb3Av2DdFqNPWHN5+748JQu0orSlD3fKk+2RmXcMeaoy5jH2KIuCIBOypmt449iKoNTE8kXQfWsZbZEIVY/7Z5eNTsCuHorbsOsoiLMZGkFHex01/Wa1d75tME9ab8iu30g3TJx+1l1DDbMPqAYr6zP9otcQACiYVYTqx8pxoOAKwxWsRIlEoByrkavivJyoTlzHBS5WuZzg/De//d1y/H8P4Af+gjjrAAB4nGNgZGBgAOKmuuV34vltvjJwszCAwHW3SRMR9P9ZLAzMaUAuBwMTSBQAP2gKxAB4nGNgZGBgbvjfwBDDwgACQJKRARUwAwBHCQJsBAAAAAPpAAAEAAAAAAAAAAB2AKx4nGNgZGBgYGYIZGBlAAEmIOYCQgaG/2A+AwAQ9wFwAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBsYItvTQxLymTgQEAFb8DEQA=") format("woff"),url("//at.alicdn.com/t/font_705538_8kmnfm7zzr3.ttf?t=1528852881476") format("truetype"),url("//at.alicdn.com/t/font_705538_8kmnfm7zzr3.svg?t=1528852881476#iconfont") format("svg")}.header .close[data-v-975e06f0],.iconfont[data-v-975e06f0]{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.header .close[data-v-975e06f0]:before,.icon-guanbi[data-v-975e06f0]:before{content:"\\E624"}.ow-calendar-wrapper[data-v-975e06f0]{position:fixed;top:0;left:0;width:100%;height:100%;flex-direction:column;display:flex;justify-content:space-between;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;z-index:1010;background:#fff}.tit[data-v-975e06f0]{height:36px;font-size:36px;line-height:36px;color:#0a0a0a;font-weight:500;margin-bottom:67px;width:100%}.days-list[data-v-975e06f0]{border-radius:10px 10px 0 0;background:#f5f5f5;font-size:28px;display:flex;height:80px;line-height:80px;margin-bottom:10px;width:100%}.days-list span[data-v-975e06f0]{flex:1;text-align:center;display:block}.calendar-tit[data-v-975e06f0]{padding:25px 0 14px 26px;line-height:40px;color:#b8b8b8}.calendar-tit span[data-v-975e06f0]{font-size:36px;color:#2885a6}.calendar[data-v-975e06f0]{margin-bottom:20px}.calendar ul[data-v-975e06f0]{display:flex;flex-wrap:wrap}.calendar li[data-v-975e06f0]{display:block;text-align:center;color:#5a4b41;height:80px;line-height:80px;font-size:28px;margin-bottom:18px;width:14.2%}.calendar li span[data-v-975e06f0]{width:80px;display:inline-block;margin:0 auto}.calendar .disable[data-v-975e06f0]{color:#c5c5c5}.calendar .select-b span[data-v-975e06f0],.calendar .select span[data-v-975e06f0]{background:#209cdf;border-radius:80px;color:#fff}.header[data-v-975e06f0]{top:0;left:0;width:100%;padding:40px 40px 10px;background:#fff;display:flex;flex-wrap:wrap;position:relative}.header .close[data-v-975e06f0]{position:absolute;right:40px;top:40px;font-size:32px}.content[data-v-975e06f0]{padding:0 40px;background:#fff;position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:auto;-webkit-overflow-scrolling:touch}.footer[data-v-975e06f0]{height:140px;background:#f5f5f5;padding:0 40px}.footer .info[data-v-975e06f0]{font-size:28px;line-height:140px;color:#0a0a0a}.footer .btn[data-v-975e06f0]{border-radius:6px;background:#209cdf;height:76px;width:170px;text-align:center;line-height:76px;font-size:28px;color:#fff;margin-top:36px;float:right}.footer .btn-cancel[data-v-975e06f0]{background:#e5e5e5}.footer .cancel[data-v-975e06f0]{font-size:28px;color:#209cdf;margin-right:56px;float:right;line-height:140px}.pop-fade-enter-active[data-v-975e06f0],.pop-fade-leave-active[data-v-975e06f0]{transition:opacity .3s}.pop-fade-enter[data-v-975e06f0],.pop-fade-leave-to[data-v-975e06f0]{opacity:0}',""])},function(e,t,a){t=e.exports=a(0)(!1),t.push([e.i,"*{margin:0;padding:0;box-sizing:border-box}em,i{font-style:normal}li{list-style:none}img{border:0;vertical-align:middle}button{cursor:pointer}a{color:#666;text-decoration:none}a:hover{color:#c81623}.ow-overflow-hidden{overflow:hidden!important}",""])},function(e,t,a){function n(e){for(var t=0;t<e.length;t++){var a=e[t],n=f[a.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](a.parts[i]);for(;i<a.parts.length;i++)n.parts.push(o(a.parts[i]));n.parts.length>a.parts.length&&(n.parts.length=a.parts.length)}else{for(var r=[],i=0;i<a.parts.length;i++)r.push(o(a.parts[i]));f[a.id]={id:a.id,refs:1,parts:r}}}}function i(){var e=document.createElement("style");return e.type="text/css",h.appendChild(e),e}function o(e){var t,a,n=document.querySelector("style["+g+'~="'+e.id+'"]');if(n){if(p)return A;n.parentNode.removeChild(n)}if(y){var o=u++;n=d||(d=i()),t=r.bind(null,n,o,!1),a=r.bind(null,n,o,!0)}else n=i(),t=s.bind(null,n),a=function(){n.parentNode.removeChild(n)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else a()}}function r(e,t,a,n){var i=a?"":n.css;if(e.styleSheet)e.styleSheet.cssText=D(t,i);else{var o=document.createTextNode(i),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(o,r[t]):e.appendChild(o)}}function s(e,t){var a=t.css,n=t.media,i=t.sourceMap;if(n&&e.setAttribute("media",n),v.ssrId&&e.setAttribute(g,t.id),i&&(a+="\n/*# sourceURL="+i.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=a(8),f={},h=c&&(document.head||document.getElementsByTagName("head")[0]),d=null,u=0,p=!1,A=function(){},v=null,g="data-vue-ssr-id",y="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,a,i){p=a,v=i||{};var o=l(e,t);return n(o),function(t){for(var a=[],i=0;i<o.length;i++){var r=o[i],s=f[r.id];s.refs--,a.push(s)}t?(o=l(e,t),n(o)):o=[];for(var i=0;i<a.length;i++){var s=a[i];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete f[s.id]}}}};var D=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var a=[],n={},i=0;i<t.length;i++){var o=t[i],r=o[0],s=o[1],c=o[2],l=o[3],f={id:e+":"+i,css:s,media:c,sourceMap:l};n[r]?n[r].parts.push(f):a.push(n[r]={id:r,parts:[f]})}return a}},function(e,t){e.exports=function(e,t,a,n,i,o){var r,s=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(r=e,s=e.default);var l="function"==typeof s?s.options:s;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),a&&(l.functional=!0),i&&(l._scopeId=i);var f;if(o?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=f):n&&(f=n),f){var h=l.functional,d=h?l.render:l.beforeCreate;h?(l._injectStyles=f,l.render=function(e,t){return f.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,f):[f]}return{esModule:r,exports:s,options:l}}},function(e,t,a){"use strict";var n={format:function(e,t){var a={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in a)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?a[n]:("00"+a[n]).substr((""+a[n]).length)));return t}};t.a=n},function(e,t,a){"use strict";t.a={data:function(){return{show:!1}},props:{value:{type:Boolean,default:!1}},watch:{value:{handler:function(e){!0===e&&document.body.classList.add("ow-overflow-hidden"),this.show=e},immediate:!0},show:function(e){!1===e&&document.body.classList.remove("ow-overflow-hidden"),this.$emit("input",e),this.$emit("close",e)}}}},function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:e.transition}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"ow-calendar-wrapper",on:{touchmove:function(e){e.preventDefault(),e.stopPropagation()}}},[a("header",{staticClass:"header"},[a("div",{staticClass:"tit"},[e._v("选择时间")]),e._v(" "),a("div",{staticClass:"days-list"},[a("span",[e._v("日")]),e._v(" "),a("span",[e._v("一")]),e._v(" "),a("span",[e._v("二")]),e._v(" "),a("span",[e._v("三")]),e._v(" "),a("span",[e._v("四")]),e._v(" "),a("span",[e._v("五")]),e._v(" "),a("span",[e._v("六")])]),e._v(" "),a("i",{staticClass:"close",on:{click:function(t){e.show=!1}}})]),e._v(" "),a("section",{staticClass:"content"},e._l(e.allMonthData,function(t,n){return a("div",{key:n,staticClass:"calendar"},[a("div",{staticClass:"calendar-tit"},[a("span",[e._v(e._s(t.month)+"月")]),e._v(" "+e._s(t.year)+"\n        ")]),e._v(" "),a("ul",e._l(t.date,function(n,i){return a("li",{key:i,class:{disable:n.isDisable,"can-select":!n.isDisable,select:n.isCheckInDate||n.isCheckOutDate,"select-b":e.selectCss(n.date)},on:{click:function(a){e.selectDate(t,n)}}},[a("span",[e._v(e._s(n.showDate))])])}))])})),e._v(" "),a("footer",{staticClass:"footer"},[a("span",{staticClass:"info"},[e._v(e._s(e.choiceInfo))]),e._v(" "),a("span",{class:["btn",1==e.choiceFlag?"":"btn-cancel"],on:{click:e.confirm}},[e._v("保存")]),e._v(" "),a("span",{staticClass:"cancel",on:{click:function(t){e.show=!1}}},[e._v("取消")])])])])},i=[],o={render:n,staticRenderFns:i};t.a=o}])});
//# sourceMappingURL=build.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b4b796c6"],{7958:function(t,i,e){},"9d47":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-app",{staticClass:"blue-grey lighten-5"},[e("TheSidebar",{attrs:{showsidebar:t.drawer}}),e("v-main",[e("v-container",{attrs:{fluid:""}},[e("router-view",{key:t.$route.fullPath})],1)],1),e("TheFooter")],1)},s=[],a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-navigation-drawer",{attrs:{"mini-variant":t.minify,color:t.sideBarColor,"overlay-opacity":"0.25",app:"",dark:"",permanent:"",width:"200"},scopedSlots:t._u([{key:"append",fn:function(){return[e("v-list",{attrs:{dense:""}},[e("v-list-item",{staticClass:"float-right",attrs:{"justify-end":""}},[e("v-list-item-action",[e("v-icon",{staticClass:"mt-4",attrs:{color:"green lighten-3"},on:{click:t.setSidebarMinified}},[t._v(" "+t._s(t.minify?"mdi-chevron-double-right":"mdi-chevron-double-left")+" ")])],1)],1)],1)]},proxy:!0}])},[e("v-list",{attrs:{dense:""}},[e("v-list-item",{on:{click:function(){return t.$router.push({name:"Home"}).catch((function(){}))}}},[e("v-list-item-action",[e("v-icon",{attrs:{color:"blue lighten-3"}},[t._v("mdi-home")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Home")])],1)],1),e("v-list-item",{on:{click:function(){return t.$router.push({name:"Analytics"}).catch((function(){}))}}},[e("v-list-item-action",[e("v-icon",{attrs:{color:"blue lighten-3"}},[t._v("mdi-google-analytics")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Account Analytics")])],1)],1)],1)],1)},o=[],r=e("5530"),c=e("2f62"),h={name:"TheSidebar",data:function(){return{sideBarColor:"#385F73"}},created:function(){},components:{},props:{showsidebar:{type:Boolean}},methods:{setSidebarMinified:function(){this.$store.dispatch("setSidebarMinified")}},computed:Object(r["a"])({},Object(c["b"])({minify:function(t){return t.sidebarMinified}})),watch:{showsidebar:function(){this.drawer=this.showsidebar}}},u=h,l=e("2877"),d=e("6544"),p=e.n(d),v=e("132d"),f=e("8860"),m=e("da13"),g=e("1800"),b=e("5d23"),y=(e("a9e3"),e("c7cd"),e("99af"),e("7958"),e("adda")),w=e("fe6c"),A=e("58df");function O(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(A["a"])(Object(w["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,i){i?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,i){this.$vuetify.application.unregister(this._uid,i)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,e=i.length;t<e;t++)this.$watch(i[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}var $=e("a9ad"),M=e("b848"),_=e("e4cd"),x=e("e707"),B=e("2b0e"),j=B["a"].extend({name:"ssr-bootable",data:function(){return{isBooted:!1}},mounted:function(){var t=this;window.requestAnimationFrame((function(){t.$el.setAttribute("data-booted","true"),t.isBooted=!0}))}}),k=e("7560"),C=e("a293"),T=e("dc22"),V=e("c3f0"),N=e("80d2"),E=Object(A["a"])(O("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),$["a"],M["a"],_["a"],x["a"],j,k["a"]),R=E.extend({name:"v-navigation-drawer",directives:{ClickOutside:C["a"],Resize:T["a"],Touch:V["a"]},provide:function(){return{isInNav:"nav"===this.tag}},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(r["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&_["a"].options.computed.isMobile.call(this)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX";return{height:Object(N["g"])(this.height),top:this.isBottom?"auto":Object(N["g"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(N["g"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(N["g"])(this.computedTransform,"%"),")"),width:Object(N["g"])(this.computedWidth)}}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,i){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=i&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var i=t.getBoundingClientRect();this.touchArea={left:i.left+50,right:i.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},i=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(y["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[i])},genDirectives:function(){var t=this,i=[{name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||i.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),i},genListeners:function(){var t=this,i={transitionend:function(i){if(i.target===i.currentTarget){t.$emit("transitionend",i);var e=document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)}}};return this.miniVariant&&(i.click=function(){return t.$emit("update:mini-variant",!1)}),this.expandOnHover&&(i.mouseenter=function(){return t.isMouseover=!0},i.mouseleave=function(){return t.isMouseover=!1}),i},genPosition:function(t){var i=Object(N["r"])(this,t);return i?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},i):i},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var i=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(N["r"])(this,"img"))&&i.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),i)}}),S=Object(l["a"])(u,a,o,!1,null,null,null),X=S.exports;p()(S,{VIcon:v["a"],VList:f["a"],VListItem:m["a"],VListItemAction:g["a"],VListItemContent:b["a"],VListItemTitle:b["c"],VNavigationDrawer:R});var H=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-footer",{attrs:{color:"blue-grey lighten-1",app:""}},[e("span",{staticClass:"white--text"},[t._v("Jamie Sokolsky © 2021")]),e("v-spacer"),e("span",{staticClass:"white--text"},[t._v("User: "+t._s(t.userName))])],1)},P=[],L={name:"TheFooter",data:function(){return{userName:"USERNAME"}}},Y=L,z=(e("b5b6"),e("8dd9")),I=Object(A["a"])(z["a"],O("footer",["height","inset"]),j).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(r["a"])(Object(r["a"])({},z["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(r["a"])(Object(r["a"])({},z["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(N["g"])(t),left:Object(N["g"])(this.computedLeft),right:Object(N["g"])(this.computedRight),bottom:Object(N["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var i=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,i,this.$slots.default)}}),W=e("2fa4"),U=Object(l["a"])(Y,H,P,!1,null,null,null),F=U.exports;p()(U,{VFooter:I,VSpacer:W["a"]});var D={data:function(){return{drawer:null}},components:{TheSidebar:X,TheFooter:F}},J=D,q=e("7496"),Z=e("a523"),G=(e("bd0c"),j.extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,i=t.bar,e=t.top,n=t.right,s=t.footer,a=t.insetFooter,o=t.bottom,r=t.left;return{paddingTop:"".concat(e+i,"px"),paddingRight:"".concat(n,"px"),paddingBottom:"".concat(s+a+o,"px"),paddingLeft:"".concat(r,"px")}}},render:function(t){var i={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,i,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})),K=Object(l["a"])(J,n,s,!1,null,null,null);i["default"]=K.exports;p()(K,{VApp:q["a"],VContainer:Z["a"],VMain:G})},b5b6:function(t,i,e){},bd0c:function(t,i,e){},c3f0:function(t,i,e){"use strict";e("159b");var n=e("80d2"),s=function(t){var i=t.touchstartX,e=t.touchendX,n=t.touchstartY,s=t.touchendY,a=.5,o=16;t.offsetX=e-i,t.offsetY=s-n,Math.abs(t.offsetY)<a*Math.abs(t.offsetX)&&(t.left&&e<i-o&&t.left(t),t.right&&e>i+o&&t.right(t)),Math.abs(t.offsetX)<a*Math.abs(t.offsetY)&&(t.up&&s<n-o&&t.up(t),t.down&&s>n+o&&t.down(t))};function a(t,i){var e=t.changedTouches[0];i.touchstartX=e.clientX,i.touchstartY=e.clientY,i.start&&i.start(Object.assign(t,i))}function o(t,i){var e=t.changedTouches[0];i.touchendX=e.clientX,i.touchendY=e.clientY,i.end&&i.end(Object.assign(t,i)),s(i)}function r(t,i){var e=t.changedTouches[0];i.touchmoveX=e.clientX,i.touchmoveY=e.clientY,i.move&&i.move(Object.assign(t,i))}function c(t){var i={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return a(t,i)},touchend:function(t){return o(t,i)},touchmove:function(t){return r(t,i)}}}function h(t,i,e){var s=i.value,a=s.parent?t.parentElement:t,o=s.options||{passive:!0};if(a){var r=c(i.value);a._touchHandlers=Object(a._touchHandlers),a._touchHandlers[e.context._uid]=r,Object(n["x"])(r).forEach((function(t){a.addEventListener(t,r[t],o)}))}}function u(t,i,e){var s=i.value.parent?t.parentElement:t;if(s&&s._touchHandlers){var a=s._touchHandlers[e.context._uid];Object(n["x"])(a).forEach((function(t){s.removeEventListener(t,a[t])})),delete s._touchHandlers[e.context._uid]}}var l={inserted:h,unbind:u};i["a"]=l},dc22:function(t,i,e){"use strict";function n(t,i){var e=i.value,n=i.options||{passive:!0};window.addEventListener("resize",e,n),t._onResize={callback:e,options:n},i.modifiers&&i.modifiers.quiet||e()}function s(t){if(t._onResize){var i=t._onResize,e=i.callback,n=i.options;window.removeEventListener("resize",e,n),delete t._onResize}}var a={inserted:n,unbind:s};i["a"]=a},e4cd:function(t,i,e){"use strict";e("a9e3"),e("caad"),e("b0c0");var n=e("d9bd"),s=e("2b0e");i["a"]=s["a"].extend({name:"mobile",props:{mobileBreakpoint:{type:[Number,String],default:function(){return this.$vuetify?this.$vuetify.breakpoint.mobileBreakpoint:void 0},validator:function(t){return!isNaN(Number(t))||["xs","sm","md","lg","xl"].includes(String(t))}}},computed:{isMobile:function(){var t=this.$vuetify.breakpoint,i=t.mobile,e=t.width,n=t.name,s=t.mobileBreakpoint;if(s===this.mobileBreakpoint)return i;var a=parseInt(this.mobileBreakpoint,10),o=!isNaN(a);return o?e<a:n===this.mobileBreakpoint}},created:function(){this.$attrs.hasOwnProperty("mobile-break-point")&&Object(n["d"])("mobile-break-point","mobile-breakpoint",this)}})}}]);
//# sourceMappingURL=chunk-b4b796c6.ecd00c68.js.map
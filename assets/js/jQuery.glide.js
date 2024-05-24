!function(t,i,s,n){function e(i,s){var n=this;return this.options=t.extend({},a,s),this.currentSlide=0,this.cssSupport=this.css.isSupported("transition")&&this.css.isSupported("transform")?!0:!1,this.offset=this.options.circular?2:0,this.options.beforeInit.call(this),this.parent=i,this.init(),this.play(),this.options.afterInit.call(this),{current:function(){return-n.currentSlide+1},reinit:function(){n.init()},play:function(){n.play()},pause:function(){n.pause()},next:function(t){n.slide(1,!1,t)},prev:function(t){n.slide(-1,!1,t)},jump:function(t,i){n.slide(t-1,!0,i)},nav:function(t){n.navigation.wrapper&&n.navigation.wrapper.remove(),n.options.navigation=t?t:n.options.navigation,n.navigation()},arrows:function(t){n.arrows.wrapper&&n.arrows.wrapper.remove(),n.options.arrows=t?t:n.options.arrows,n.arrows()}}}var o="glide",a={autoplay:4e3,hoverpause:!0,circular:!0,animationDuration:500,animationTimingFunc:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",arrows:!0,arrowsWrapperClass:"slider-arrows",arrowMainClass:"slider-arrow",arrowRightClass:"slider-arrow--right",arrowRightText:"",arrowLeftClass:"slider-arrow--left",arrowLeftText:"",navigation:!0,navigationCenter:!0,navigationClass:"slider-nav",navigationItemClass:"slider-nav__item",navigationCurrentItemClass:"slider-nav__item--current",keyboard:!0,touchDistance:60,beforeInit:function(){},afterInit:function(){},beforeTransition:function(){},afterTransition:function(){}};e.prototype.build=function(){this.bindings(),this.slides.length>1&&(this.options.circular&&this.circular(),this.options.arrows&&this.arrows(),this.options.navigation&&this.navigation()),this.events()},e.prototype.circular=function(){this.firstClone=this.slides.filter(":first-child").clone().width(this.slides.spread),this.lastClone=this.slides.filter(":last-child").clone().width(this.slides.spread),this.wrapper.append(this.firstClone).prepend(this.lastClone).width(this.parent.width()*(this.slides.length+2)).trigger("clearTransition").trigger("setTranslate",[-this.slides.spread])},e.prototype.navigation=function(){this.navigation.items={},this.navigation.wrapper=t("<div />",{"class":this.options.navigationClass}).appendTo(this.options.navigation===!0?this.parent:this.options.navigation);for(var i=0;i<this.slides.length;i++)this.navigation.items[i]=t("<a />",{href:"#","class":this.options.navigationItemClass,"data-distance":i}).appendTo(this.navigation.wrapper);this.navigation.items[0].addClass(this.options.navigationCurrentItemClass),this.options.navigationCenter&&this.navigation.wrapper.css({left:"50%",width:this.navigation.wrapper.children().outerWidth(!0)*this.navigation.wrapper.children().length,"margin-left":-(this.navigation.wrapper.outerWidth(!0)/2)})},e.prototype.arrows=function(){this.arrows.wrapper=t("<div />",{"class":this.options.arrowsWrapperClass}).appendTo(this.options.arrows===!0?this.parent:this.options.arrows),this.arrows.right=t("<a />",{href:"#","class":this.options.arrowMainClass+" "+this.options.arrowRightClass,"data-distance":"1",html:this.options.arrowRightText}).appendTo(this.arrows.wrapper),this.arrows.left=t("<a />",{href:"#","class":this.options.arrowMainClass+" "+this.options.arrowLeftClass,"data-distance":"-1",html:this.options.arrowLeftText}).appendTo(this.arrows.wrapper)},e.prototype.bindings=function(){var i=this,s=this.options,n=this.css.getPrefix();this.wrapper.bind({setTransition:function(){t(this).css(n+"transition",n+"transform "+s.animationDuration+"ms "+s.animationTimingFunc)},clearTransition:function(){t(this).css(n+"transition","none")},setTranslate:function(s,e){i.cssSupport?t(this).css(n+"transform","translate3d("+e+"px, 0px, 0px)"):t(this).css("margin-left",e)}})},e.prototype.events=function(){this.options.touchDistance&&this.parent.on({"touchstart MSPointerDown":t.proxy(this.events.touchstart,this),"touchmove MSPointerMove":t.proxy(this.events.touchmove,this),"touchend MSPointerUp":t.proxy(this.events.touchend,this)}),this.arrows.wrapper&&t(this.arrows.wrapper).children().on("click touchstart",t.proxy(this.events.arrows,this)),this.navigation.wrapper&&t(this.navigation.wrapper).children().on("click touchstart",t.proxy(this.events.navigation,this)),this.options.keyboard&&t(s).on("keyup.glideKeyup",t.proxy(this.events.keyboard,this)),this.options.hoverpause&&this.parent.on("mouseover mouseout",t.proxy(this.events.hover,this)),t(i).on("resize",t.proxy(this.events.resize,this))},e.prototype.events.navigation=function(i){this.wrapper.attr("disabled")||(i.preventDefault(),this.slide(t(i.currentTarget).data("distance"),!0))},e.prototype.events.arrows=function(i){this.wrapper.attr("disabled")||(i.preventDefault(),this.slide(t(i.currentTarget).data("distance"),!1))},e.prototype.events.keyboard=function(t){this.wrapper.attr("disabled")||(39===t.keyCode&&this.slide(1),37===t.keyCode&&this.slide(-1))},e.prototype.events.hover=function(t){this.pause(),"mouseout"===t.type&&this.play()},e.prototype.events.resize=function(){this.dimensions(),this.slide(0)},e.prototype.disableEvents=function(){this.wrapper.attr("disabled",!0)},e.prototype.enableEvents=function(){this.wrapper.attr("disabled",!1)},e.prototype.events.touchstart=function(t){var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0];this.events.touchStartX=i.pageX,this.events.touchStartY=i.pageY,this.events.touchSin=null},e.prototype.events.touchmove=function(t){var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],s=i.pageX-this.events.touchStartX,n=i.pageY-this.events.touchStartY,e=Math.abs(s<<2),o=Math.abs(n<<2),a=Math.sqrt(e+o),r=Math.sqrt(o);this.events.touchSin=Math.asin(r/a),this.events.touchSin*(180/Math.PI)<45&&t.preventDefault()},e.prototype.events.touchend=function(t){var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],s=i.pageX-this.events.touchStartX;s>this.options.touchDistance&&this.events.touchSin*(180/Math.PI)<45?this.slide(-1):s<-this.options.touchDistance&&this.events.touchSin*(180/Math.PI)<45&&this.slide(1)},e.prototype.slide=function(i,s,n){this.pause(),this.options.beforeTransition.call(this);var e=this,o=s?0:this.currentSlide,a=-(this.slides.length-1),r=!1,h=!1;0===o&&-1===i?(r=!0,o=a):o===a&&1===i?(h=!0,o=0):o+=-i;var p=this.slides.spread*o;this.options.circular&&(p-=this.slides.spread,(h||r)&&this.disableEvents(),h&&(p=this.slides.spread*(a-2)),r&&(p=0)),this.cssSupport?this.wrapper.trigger("setTransition").trigger("setTranslate",[p]):this.wrapper.stop().animate({"margin-left":p},this.options.animationDuration),this.options.circular&&((r||h)&&this.afterAnimation(function(){e.wrapper.trigger("clearTransition"),e.enableEvents()}),h&&this.afterAnimation(function(){h=!1,e.wrapper.trigger("setTranslate",[-e.slides.spread])}),r&&this.afterAnimation(function(){r=!1,e.wrapper.trigger("setTranslate",[e.slides.spread*(a-1)])})),this.options.navigation&&this.navigation.wrapper&&t("."+this.options.navigationClass,this.options.navigation===!0?this.parent:this.options.navigation).children().eq(-o).addClass(this.options.navigationCurrentItemClass).siblings().removeClass(this.options.navigationCurrentItemClass),this.currentSlide=o,this.afterAnimation(function(){e.options.afterTransition.call(e),"undefined"!==n&&"function"==typeof n&&n()}),this.play()},e.prototype.play=function(){var t=this;this.options.autoplay&&(this.auto=setInterval(function(){t.slide(1,!1)},this.options.autoplay))},e.prototype.pause=function(){this.options.autoplay&&(this.auto=clearInterval(this.auto))},e.prototype.afterAnimation=function(t){setTimeout(function(){t()},this.options.animationDuration+10)},e.prototype.dimensions=function(){this.slides.spread=this.parent.width(),this.wrapper.width(this.slides.spread*(this.slides.length+this.offset)),this.slides.add(this.firstClone).add(this.lastClone).width(this.slides.spread)},e.prototype.init=function(){this.wrapper=this.parent.children(),this.slides=this.wrapper.children(),this.dimensions(),this.build()},e.prototype.css={isSupported:function(t){var e=!1,o="Khtml ms O Moz Webkit".split(" "),a=s.createElement("div"),r=null;if(t=t.toLowerCase(),a.style[t]!==n&&(e=!0),e===!1){r=t.charAt(0).toUpperCase()+t.substr(1);for(var h=0;h<o.length;h++)if(a.style[o[h]+r]!==n){e=!0;break}}return i.opera&&i.opera.version()<13&&(e=!1),("undefined"===e||e===n)&&(e=!1),e},getPrefix:function(){if(!i.getComputedStyle)return"";var t=i.getComputedStyle(s.documentElement,"");return"-"+(Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/)||""===t.OLink&&["","o"])[1]+"-"}},t.fn[o]=function(i){return this.each(function(){t.data(this,"api_"+o)||t.data(this,"api_"+o,new e(t(this),i))})}}(jQuery,window,document);
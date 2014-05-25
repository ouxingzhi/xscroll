/**
 * 针对modile端的触屏框架
 */

void function(window,document,undefined){

	//utils
	var ap = Array.prototype,
		slice = ap.slice,
		push = ap.push,
		regSelector = /^#([a-z]\w+)|\.([a-z]\w+)|([a-z]+)/i,
		regTag = /^[a-z]+$/i;
	//简单选择器
	function $(selector,rootNode){
		rootNode = rootNode || document;
		var rets = [],r;
		var matches = regSelector.exec(selector);
		if(matches){
			if(matches[1] && rootNode.getElementById){
				r = rootNode.getElementById(matches[1]);
				r && rets.push(r);
				return rets;
			}else if(matches[2] && rootNode.getElementsByClassName){
				r = rootNode.getElementsByClassName(matches[2]);
				r && r.length && push.apply(rets,r);
				return rets;
			}else if(matches[3] && rootNode.getElementsByTagName){
				r = rootNode.getElementsByClassName(matches[3]);
				r && r.length && push.apply(rets,r);
				return rets;
			}
		}
		push.apply(rets,rootNode.querySelectorAll(selector));
		return rets;
	}
	function isElement(o){
		return !!(o && o.addEventListener && o.nodeType === 1);
	}
	function addEvent(el,type,fn){
		el.addEventListener(type,fn,false);
	}

	function removeEvent(el,type,fn){
		el.removeEventListener(type,fn);
	}

	function trigger(el,event){
		el.dispatchEvent(event);
	}

	var C = function(div,attr,events){
		return function(html){
			var dom = null;
			if(regTag.test(html)){
				dom = document.createElement(html);
			}else{
				div.innerHTML = html;
				var child = div.firstChild;
				loop:do{
					if(child && child.nodeType === 1) {
						div.removeChild(child);
						div.innerHTML = '';
						dom = child;
						break loop;
					}
				}while(child = child.nextSibling);
			}
			attr = attr || {};
			for(var i in attr){
				if(i === 'class') i = 'className';
				dom[i] = attr[i];
			}
			events = events || {};
			for(var i in events){
				addEvent(dom,i,events[i]);
			}
			return dom;
		};
	}(document.createElement('div'));
	//获得元素大小
	function getSize(el,useBorder){
		var width,height;
		if(useBorder){
			width = el.offsetWidth;
			height = el.offsetHeight;
		}else{
			width = el.clientWidth;
			height = el.clientHeight;
		}
		return {
			height:height,
			width:width
		};
	}
	//取页面大小
	function getPageSize(){
		return {
			width:Math.max(document.documentElement.offsetWidth,window.innerWidth),
			height:Math.max(document.documentElement.offsetHeight,window.innerHeight)
		};
	}
	//取视口大小
	function getViewPortSize(){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}

	var CLASS_PREFIX = 'xscroll-';

	function xScroll(ops){
		this.html;
		//内层容器
		this.innContainer;
		//外层容器
		this.outContainer;
		//滚动条
		this.scrollBar;

		this._onTouchStart = this.onTouchStart.bind(this);
		this._onTouchMove = this.onTouchMove.bind(this);
		this._onTouchEnd = this.onTouchEnd.bind(this);
		this.events = {};
		this.setOption(ops);
		this.init();
	}

	xScroll.prototype = {
		constructor:xScroll,
		//设置
		on:function(type,data,fn,unique){
			if(!(data instanceof Array)){
				fn = data;
				unique = fn;
				data = null;
			}
			if(!(fn instanceof Function)) fn = function(){};
			var events = this.events[type] = this.events[type] || [];
			if(unique){
				for(var i=events.length-1;i>-1;i--){
					if(fn === events[i].fn) events.splice(i,1);
				}
			}
			events.push({
				data:data,
				fn:fn
			});
			return this;
		},
		off:function(type,fn){
			if(!type) return this;
			var events;
			if(fn){
				var events = this.events[type];
				if(!events) return this;
				for(var i=events.length-1;i>-1;i--){
					if(fn === events[i].fn) events.splice(i,1);
				}
			}else{
				this.events[type] = null;
			}
			return this;
		},
		trigger:function(type,data){
			var events = this.events[type],
				self = this;
			if(!events) return this;
			events.forEach(function(o){
				var args = [];
				if(o.fn instanceof Function){
					o.data && args.push(o.data);
					data && args.push(data);
					o.fn.apply(self,args);
				}
			});
			return this;
		},
		setOption:function(ops){
			if(ops.html){
				if(typeof ops.html === 'string'){
					this.html = C(ops.html);
				}else if(isElement(ops.html)){
					this.html = ops.html;
				}
			}
			var viewSize = getViewPortSize();
			if(ops.minWidth){
				this.minWidth = ops.minWidth;
			}else{
				this.minWidth = viewSize.width;
			}

			if(ops.minHeight){
				this.minHeight = ops.minHeight;
			}else{
				this.minHeight = viewSize.height;
			}

		},
		init:function(){
			this.createHTML();
			this.buildEvent();
		},
		buildEvent:function(){
			addEvent(this.outContainer,'touchstart',this._onTouchStart);
			addEvent(this.outContainer,'touchmove',this._onTouchMove);
			addEvent(this.outContainer,'touchend',this._onTouchEnd);
		},
		onTouchStart:function(){

		},
		onTouchMove:function(){

		},
		onTouchEnd:function(){

		},
		layout:function(){
			var outSize = getSize(this.outContainer),
				innSize = getSize(this.innContainer),
				viewSize = getViewPortSize();

		},
		createHTML:function(){
			this.outContainer = C('div',{
				'class':CLASS_PREFIX+'outer-container'
			});
			this.innContainer = C('div',{
				'class':CLASS_PREFIX+'inner-container'
			});
			this.scrollBar = C('div',{
				'class':CLASS_PREFIX+'scrollbar'
			});
			this.outContainer.appendChild(this.innContainer);
			this.outContainer.appendChild(this.scrollBar);
			this.innContainer.appendChild(this.html);
		}
	};
}(window,document);
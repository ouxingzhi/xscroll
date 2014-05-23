/**
 * 针对modile端的触屏框架
 */

void function(window,document,undefined){

	//utils
	var ap = Array.prototype,
		slice = ap.slice,
		push = ap.push,
		regSelector = /^#([a-z]\w+)|\.([a-z]\w+)|([a-z]+)/i
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
	function getViewSize(){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}


	function xScroll(){

	}
}(window,document);
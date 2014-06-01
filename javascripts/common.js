function XHR(){
	try{
		return new XMLHttpRequest();
	}catch(e){
		try{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			return null;
		}
	}
}
function load(url,callback,error){
	var xhr = XHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			callback(xhr.responseText);
		}else if(xhr.readyState === 4){
			error && error();
		}
	}
	xhr.open('GET',url,true);
	xhr.send();
}

function include(url){
	var id = 'include'+String(Math.random()).replace('.','');
	document.write('<div id="'+id+'"><p style="text-align:center;margin-top:10px">加载中...</p></div>');
	var box = document.getElementById(id);
	load(url,function(html){
		box.innerHTML = html;
	},function(){
		box.innerHTML = '<p style="text-align:center;margin-top:10px">下载失败</p>';
	});
}

function loadHtml(url,box,callback){
	load(url,function(html){
		box.innerHTML = html;
		callback && callback();
	},function(){
		box.innerHTML = '<p style="text-align:center;margin-top:10px">下载失败</p>';
		callback && callback();
	});
}

var C = function(div){
	return function(html){
		div.innerHTML = html;
		var childs = div.childNodes,result = [];
		for(var i=0,len=childs.length;i<len;i++){
			result.push(childs[i]);
		}
		for(var i=childs.length-1;i>-1;i--){
			div.removeChild(childs[i]);
		}
		return result;
	};
}(document.createElement('div'));
xScroll framework 0.1.0
=======

这是个针对modile端的小型滚动条框架   
兼容 IE9+,chrome,firefox,safari及所有现代浏览器   
版本: 0.1.0    
   
xScroll 支持内容动态变化，并且支持多层嵌套。

注意事项：   
容器本身需要明确尺寸，也能js动态调整，但不能不设置高宽，且设置百分比也行。   
   
示例：   
html:    
```html
<div id="scroll">
	内容
</div>
```
javascript:
```javascript
new xScroll({
	el:'#scroll'
});
```
demo:http://ouxingzhi.github.io/xscroll

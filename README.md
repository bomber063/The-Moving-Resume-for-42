# The-Moving-Resume-for-42
## 这个项目是仿照来自于下面的链接做的
* [链接1](https://www.strml.net/),这个链接的效果好一点，但是比较难做。
* [链接2](https://jirengu-inc.github.io/animating-resume/public/)，这个相对简单一点。
## 大概的思路
* 就是通过下面的代码,使得每隔一秒多出现一个字符串，不过这个代码比较傻
```
  setTimeout(()=>{
      document.body.innerHTML='1'
  },1000)

  setTimeout(()=>{
      document.body.innerHTML='12'
  },2000) 

  setTimeout(()=>{
      document.body.innerHTML='123'
  },3000)   
```
* 我们通过两个原生的API，[slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)或者[substring()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
* 我们这里就选择slice()
* 另外还需要知道在HTML里面不管是回车，空格或者TAB，**如果出现多个看不见的字符，比如空格，那么浏览器会把这些空格合并，会认为只有一个空格**，这里就算是用JS来写也是一样的。但是HTML里面有**一个标签是保留回车和空格的**，那就是[pre标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre),因为它全程是preview，就是预览的意思，那么就保留了原有的样式。
* 如果需要代码和样式同时出现效果，那么就写两份，**一份放到style标签里面，一份放到body标签下面的pre标签里面即可**，style标签里面的就会呈现样式，而body标签下面的pre标签就呈现代码。
* JS里面代码大致写成这样
```
var n=0
let id=setInterval(() => {
    n=n+1
    precode.innerHTML=code.slice(0,n)
    stylecode.innerHTML=code.slice(0,n)
    if(n>=code.length){
        window.clearInterval(id)
    }
}, 500);
```
* 如果我们打开开发者工具就可以看到pre标签里面的和style标签里面的代码在同时变化
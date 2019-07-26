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
* 另外还需要知道在HTML里面不管是回车，空格或者TAB，**如果出现多个看不见的字符，比如空格，那么浏览器会把这些空格合并，会认为只有一个空格**，这里就算是用JS来写也是一样的。但是HTML里面有**一个标签是保留回车和空格的**，那就是[pre标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre),因为它全称是preview，就是预览的意思，那么就保留了原有的样式。
* 如果需要代码和样式同时出现效果，那么就写两份，**一份放到style标签里面，一份放到body标签下面的pre标签里面即可，style标签里面的就会呈现样式，而body标签下面的pre标签就呈现代码**。
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
### 用CSS注释增加一些说明,初步完善CSS
* 在css中增减文字说明需要用到CSS的注释，比如说下面的代码
> /**/
* 增加过渡transtion，字体大小font-size，背景颜色background等
### 代码高亮怎么做
* 大致的思路就是给CSS选择器在增加一个span标签来改变颜色，比如
```
<span style='color:red'>html</span>{
    color:rgb(222,222,222);
    background:rgb(0,43,54);
    font-size:16px;
}
```
* 这样html这个CSS选择器就变成了红色啦，**但是这里有一个问题，CSS选择器里面只有CSS的语法，而这里的span标签是HTML语法，虽然最终效果可以实现标签高亮的颜色变换，但是其实这里的原有的样式没有了，所以是互相矛盾的，不可以这样做**。
* 所以说这里**只能改pre里面的代码，不能修改style里面的代码**，这里要单独修改。用到一个[replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace),该方法支持[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，但是这里用不到正则表达式，只是简单的替换字符串即可。比如写成这样就代表把字符串`html`替换为字符串`<span style="color:red;">html</span>`
```
    precode.innerHTML=precode.innerHTML.replace('html','<span style="color:red;">html</span>')
```
* **这里pre标签里面的标签会被当做标签来解释**。
***
* 要把所有选择器都挑出来，我们需要通过[正则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)把每个选择器挑选出来，这样就很麻烦。
* 所以我们需要一个开源的解决这个问题的库就好啦
***
### 选择CSS代码高亮的库
* 通过Google里面搜索js syntax lib,然后我们就可以看到[Prism.js](https://prismjs.com/)或者[highlight.js](https://highlightjs.org/)
* 这里我们选择Prism.js，它能够把一个字符串其中的关键字加上span,我们用CRM(copy-run-modify)套路来学习和熟悉这个库就好了。
* 下载prism.js和prism.css，然后用link引入CSS，用script引入js即可。
* 通过增加一句这个代码
```
    precode.innerHTML=Prism.highlight(precode.innerHTML, Prism.languages.css);
```
* 就代码precode.innerHTML按照css语法来显示高亮，然后我们通过开发者工具可以看到，多了很多span还有一些class，比如
```
<span class="token comment">注释部分
<span class="token property">transition</span>CSS属性部分
<span class="token selector">html</span>CSS选择器部分
<span class="token punctuation">:</span>CSS标点符号部分
<span class="token function">rgb</span>CSS函数部分
等等
```
* 这样，你的注释，属性，选择器，标点符号，函数等部分都会被class包住，然后对应不同的颜色即可，这就是这个库的代码来实现的效果。
***
* 我们让代码在描述**高亮后才显示高亮**
***
* 我们需要先覆盖掉Prism.js库里面的属性，选择器和函数的颜色
* 先在CSS文件里面加入这些代码，覆盖掉原来Prism.js里面的颜色
```
.token.function{
    color:#aaa;
}

.token.selector{
    color:#aaa;
}

.token.property{
    color:#aaa;
}
```
* 然后在code里面增加
```
/*需要一点代码高亮*/
.token.function{
    color:#DD4A68;
}

.token.selector{
    color:#690;
}

.token.property{
    color:#905;
}
```
* 因为code的代码最后会到index文件里面的style里面去，**所有优先会用style里面的样式,于是style的样式又覆盖css里面的样式，于是高亮有出现啦，这样就可以自己来控制什么时候开始显示高亮啦**。
***
* 把代码高亮的思路在小结一下：
1. 首先找到一个高亮库，比如Prism.js这个库，分别把选择器、符号、函数、属性等没有span标签的变成有span标签的，并且每个标签有相应的class。
2. 通过CSS把颜色想不改变。
3. 然后通过code代码与prism.js里面的颜色一样，因为code代码是也是放到index的style里面的，所以覆盖掉原来的CSS颜色。
***
# 接下来做一个小动画
* 比如让代码转一圈
```
/*增加一点3D效果*/
#precode{
    transform:rotate(360deg);
}
```
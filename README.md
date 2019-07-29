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
* 用到[innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)
* JS里面代码大致写成这样
```
var n=0
let id=setInterval(() => {
    n=n+1
    precode.innerHTML=code.slice(0,n)//这里用innerHTML，而不用innerText，是因为需要保留里面的标签，也就是<>
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
### 执行完某写代码后去做另外一个结构，也就是一个paper或者代码。
* 在上面的代码执行完后，也就是if判断结束后执行的内容之后增加另一个函数来做一个paper和其他结构或者代码
```
    if(n>=code.length){
        window.clearInterval(id)
        fn2()//前面的延迟函数，也就是闹钟结束后就执行后面的这两个函数fn2和fn3
        fn3(code)
    }
```
* 因为上一次已经通过Prism.js库增加了span标签了，所以这里需要把上一次的结果传入进来，比如fn3(code)，这样就不用重复加span标签。
```
    var id=setInterval(() => {
        n=n+1
        // precode.innerHTML=x+code2.slice(0,n)//如果是用传进来的x，那么原来的x是不会改变的，所以要用0,n
        // precode.innerHTML=precode.innerHTML+code2.slice(n-1,n)//如果是用precode.innerHTML,这个precode.innerHTML会一直改变，所以要用n-1,n
        //上面的slice也可以改成code2[n-1]
        precode.innerHTML=Prism.highlight(x+code2.slice(0,n), Prism.languages.css);//如果这里把code2直接放入到highlight里面会一瞬间显示出来，所以这里需要写入code2.slice(0,n)
        //因为用到上面一行代码，所以前面的两行代码都可以不需要啦
        //上一次的延迟函数里面已经有span标签了,所以需要传入参数x进来，免得重复加span 
        console.log(precode.innerHTML)
        stylecode.innerHTML=x+code2.slice(0,n)    
        console.log(stylecode.innerHTML)   
        //这里的参数除了可以传入上一次的code以外，还可以传入上一次的precode.innerHTML和stylecode.innerHTML。
        if(code2.length<n){
            clearInterval(id)
        }
    }, 10);
```
### 封装函数优化代码
* 这里**我没有明白为什么函数里面不能再调用外面的函数，而需要用到回调函数。**
* 如果不用回调函数。执行完clearInterval(id)之后**调用外面的函数y**，见jsbin[链接](https://jsbin.com/yehujohiyu/1/edit?html,js,output)
* 如果用到回调函数,回调函数其实是把函数作为**形参**放入进去，执行完clearInterval(id)之后调用自己函数的形参(这个形参也就是一个回调函数，但它需要**外面来定义这个函数**)，见jsbin[链接](https://jsbin.com/seyoqifeve/1/edit?js,output)
* 回调再同步和异步中都可以使用。
* 异步的代码一般有延迟函数，因为代码的执行速度要快于延迟函数，**所以后面的代码就会比前面的延迟函数的代码要先执行，所以回调是解决这个问题的一种方法。**
* 代码修改部分,增加一个函数,通过开始的代码，开始的代码结束后新增的代码及回调函数
```
function WriteCode(beforeCode,newCode,callback){//beforeCode是前面的代码，newCode是beforeCode结束后增加的代码,callback是回调函数
    var n=0
    precode.innerHTML=beforeCode||''//这句话不屑也不影响最后的效果，感觉这句话用处不大，但是还是写上吧
    let id=setInterval(() => {
        n=n+1
        precode.innerHTML=beforeCode+newCode.slice(0,n)
        precode.innerHTML=Prism.highlight(precode.innerHTML, Prism.languages.css);
        console.log(precode.innerHTML)
        stylecode.innerHTML=beforeCode+newCode.slice(0,n)
        if(n>=newCode.length){
            window.clearInterval(id)
            callback()//别的地方来调用这个形参
        }
    }, 10);
}
```
* 同步函数修改名字，并且增加同步函数的回调函数作为参数调用
```
function CreatePaper(callback){
    var div=document.createElement('div')
    div.id='paper'
    var body=document.getElementsByTagName('body')
    console.log(body[0].appendChild(div))
    callback()
}
```
* WriteCode为异步函数，因为是有setTimeout，延迟函数，CreatePaper为同步函数，他们两个都传入的回调函数作为实参，这个回调函数会再自己本身执行完毕后再去执行。
```
WriteCode('',code,()=>{
    CreatePaper(()=>{
        WriteCode(code,code2,()=>{
            console.log('结束')
        })
    })
})
```
* **异步可以理解为：**
1. 也可以说**不等代码这个异步的代码（任务或者函数）执行结束后的结果**，直接执行下一步的代码。
2. 或者简单点说就是，**先写代码后执行**。
3. 代码里面有**setTimeout**的一般都是异步任务（函数）.
4. 也可以通过测试，**如果下一行代码要先于本函数（任务）的执行，那么本函数（任务）就是异步的函数（任务）**
* 拿到异步的结果可以通过**回调函数,回调是拿到异步结果的一种方式**，回调当然也可以拿到同步函数的结果。
* **回调函数就是给别人（别的地方）一个函数，让别人来调用这个回调函数，自己不调用。**
### 异步举例，promise就是一个异步函数
* 有时候**异步函数是拿不到结果的**，比如jQuery发起[get请求](https://www.jquery123.com/jQuery.get/),通过代码$.get('/xxx'),那么返回的是一个promise对象，当返回前的函数成功的时候调用success()函数里面的代码，当返回前的函数失败的时候调用error()函数里面的代码，所以看看成功或者失败的情况。而promise翻译成中文就是承诺的意思，所以这个只是一个承诺会返回一个值，但是这个值是什么需要看情况来定。所以没有结果，只有一个可以有结果的承诺看看代码
```
var promise=$.get('/xxx')
promise.then(success,error)
```
### 设置代码自动向下滚动
* 首先改变一下CSS的样式，使用[vh](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length),[overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)等属性
```
#precode {
    height:100vh;
    overflow: hidden;
}
```
* 自动向下滚动需要用到[scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)，以前也写过scrollTop的[博客](https://zhuanlan.zhihu.com/p/62519712)
* [scrollHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)这个只读属性是一个元素内容高度的度量，**包括由于溢出导致的视图中不可见内容**。
* 代码增加如下
```
        precode.scrollTop=100000//这个要放到最后，因为要生成代码才可以，这段代码也可以写成precode.scrollTop=scrollHeight
```


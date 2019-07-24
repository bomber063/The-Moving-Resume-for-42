var stylecode=document.querySelector('#stylecode')
var precode=document.querySelector('#precode')
// var newDiv=document.createElement('div')
// var body=document.getElementsByTagName('body')
// body[0].append(newDiv)
var code=`/*面试官你好，我是唐艺轰
我将以动画的形式来介绍我自己

只用文字介绍太单调了
我就用代码来介绍吧
首先准备一些样式*/
*{
    transition:all 1s;
}
<span style='color:red'>html</span>{
    color:rgb(222,222,222);
    background:rgb(0,43,54);
    font-size:16px;
}
#precode{
    border:1px solid red;
    padding:16px;
}
`
var n=0
let id=setInterval(() => {
    n=n+1
    precode.innerHTML=code.slice(0,n)
    stylecode.innerHTML=code.slice(0,n)
    if(n>=code.length){
        window.clearInterval(id)
    }
}, 10);





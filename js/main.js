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
html{
    color:rgb(222,222,222);
    background:rgb(0,43,54);
    font-size:16px;
}
#precode{
    border:1px solid red;
    padding:16px;
}
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
/*增加一点3D效果*/
#precode{
    transform:rotate(360deg);
}
`
var n=0
let id=setInterval(() => {
    n=n+1
    precode.innerHTML=code.slice(0,n)//这里用innerHTML，而不用innerText，是因为需要保留里面的标签，也就是<>
    // precode.innerHTML=precode.innerHTML.replace('html','<span style="color:red;">html</span>')
    //这里是直接覆盖所以是code.slice(0,n)
    precode.innerHTML=Prism.highlight(precode.innerHTML, Prism.languages.css);
    console.log(precode.innerHTML)
    stylecode.innerHTML=code.slice(0,n)
    if(n>=code.length){
        window.clearInterval(id)
        fn2()
        fn3(code)
    }
}, 10);

function fn2(){
    var div=document.createElement('div')
    div.id='paper'
    var body=document.getElementsByTagName('body')
    console.log(body[0].appendChild(div))
}

function fn3(x){
    var n=0
    var code2=`
#paper{
    background:white;
    height:100px;
    width:100px;
}
    `
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

}




let duration=20;

function WriteCode(beforeCode,newCode,callback){//beforeCode是前面的代码，newCode是beforeCode结束后增加的代码,callback是回调函数
    var n=0;
    precode.innerHTML=beforeCode||''//这句话不屑也不影响最后的效果，感觉这句话用处不大，但是还是写上吧
    setTimeout(function a() {
        n=n+1
        precode.innerHTML=beforeCode+newCode.slice(0,n)//这里用innerHTML，而不用innerText，是因为需要保留里面的标签，也就是<>
        // precode.innerHTML=precode.innerHTML.replace('html','<span style="color:red;">html</span>')
        //这里是直接覆盖所以是code.slice(0,n)
        precode.innerHTML=Prism.highlight(precode.innerHTML, Prism.languages.css);
        // console.log(precode.innerHTML)
        stylecode.innerHTML=beforeCode+newCode.slice(0,n)
        precode.scrollTop=100000//这个要放到最后，因为要生成代码才可以，这段代码也可以写成precode.scrollTop=scrollHeight
        if (n < newCode.length) {
            // window.clearInterval(id)
            setTimeout(a, duration)//这里的duration就是新的延迟时间

            // fn2()//前面的延迟函数，也就是闹钟结束后就执行后面的这两个函数fn2和fn3
            // fn3(code)
        } else {
            callback()//别的地方来调用这个形参
        }
    }, duration);

    $('.allButton').on('click','button',function (e){
        $(e.currentTarget).addClass('active').siblings().removeClass('active')
        let b=$(e.currentTarget).attr('speed')
        if (b==='50'){
            duration=50
        }
        else if(b==='20'){
            duration=20
        }
        else if(b==='0'){
            duration=0
        }
    })

}

var stylecode=document.querySelector('#stylecode')
var precode=document.querySelector('#precode')
// var newDiv=document.createElement('div')
// var body=document.getElementsByTagName('body')
// body[0].append(newDiv)
var code=`/*面试官你好，我是唐艺轰
我将以动画的形式来介绍我自己

只用文字介绍太单调了
我就用代码来介绍吧
/*调速的按钮*/
.allButton{
    position:absolute;
    top:20px;
    right:20px;
    display: flex;
    flex-direction: column;
}

.allButton>button{
    padding:10px;
    background: #ddd;
    margin:10px;
}
.allButton>button:focus{
    outline:none;
    /* 这个写不写都不影响，方方老师的默认有focue，我这里没有focus的样式，可能是每个浏览器的显示效果不同 */
}

.allButton>button.active{
    box-shadow: 1px 1px 1px rgba(0,0,0,0.8);
    padding:10px;
}

/*首先准备一些样式*/
*{
    transition:all 1s;
}
html{
    background:#eee;
}
#precode{
    padding:16px;
    border: 1px solid #aaa;
}
/*需要一点代码高亮*/

.token.selector{
    color:#690;
}

.token.property{
    color:#905;
}

/*增加一点呼吸效果*/
#precode{
    animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
  }

#paper{
    position:fixed;
    right:0;
    height:100%;
    width:50%;
    background:#444;
    padding:16px;
}

#content{
    width:100%;
    height:100%;
    background:white;
    color:black;
    overflow:auto;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`
var code2=`
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
    `
var md=`
# 自我介绍

我叫唐艺轰，南华大学毕业，自学前端半年，希望应聘前端开发岗位。

# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. [canvas画板](https://bomber063.github.io/Canvas-demo/index)
2. [gulu-bomber UI组件](https://bomber063.github.io/DIY-UI-frame-by-Vue-for-all/)
4. [匹配游戏](https://bomber063.github.io/Cards-Matching-Game/index.html)
5. [可爱皮卡丘](https://bomber063.github.io/The-Moving-Pikachu-for-43/index.html)
3. <p>小程序：遍历翻译</p> <img src="https://mp.weixin.qq.com/wxopen/qrcode?action=show&type=2&fakeid=3852146327&token=947971384" style="height:100px;width:100px">

# 联系方式
* QQ 284995042
* Email tangyihong063@163.com
* 手机 13825293559
`
let code3=`
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

WriteCode('',code,()=>{//先写初步的样式代码
    CreatePaper(()=>{//然后创建一张白纸
        CreateMarkdown(md,()=>{//在白纸上用markdown写字
            WriteCode(code,code2,()=>{//把 Markdown 变成 HTML的文字说明
                convertToHtml(md,()=>{//把 Markdown 变成 HTML的效果
                    WriteCode(code+code2,code3,()=>{//完成后的谢谢说明
                        console.log('完成')
                    })
                })
            })
        })
    })
})


// WriteCode('',code,()=>{
//     CreatePaper(()=>{
//         WriteCode(code,code2,()=>{
//             CreateMarkdown(md,()=>{
//                 convertToHtml(md)
//             })
//         })
//     })
// })

function CreatePaper(callback){
    var div=document.createElement('div')
    var content=document.createElement('pre')
    content.id='content'
    div.id='paper'
    var body=document.getElementsByTagName('body')
    var allButton=document.getElementsByClassName('allButton')
    body[0].appendChild(div)
    div.appendChild(content)
    div.appendChild(allButton[0])
    callback()
}

function CreateMarkdown(markdown,callback){
    var n=0;
    let domPaper = document.querySelector('#content')//这个是markdown改变为HTML之前的操作id
    domPaper.innerHTML=markdown||''//这句话不屑也不影响最后的效果，感觉这句话用处不大，但是还是写上吧
    setTimeout(function a()  {
        n=n+1
        domPaper.innerHTML=markdown.slice(0,n)//这里用innerHTML，而不用innerText，是因为需要保留里面的标签，也就是<>
        // precode.innerHTML=precode.innerHTML.replace('html','<span style="color:red;">html</span>')
        //这里是直接覆盖所以是code.slice(0,n)
        // markdown.innerHTML=Prism.highlight(precode.innerHTML, Prism.languages.css);
        // stylecode.innerHTML=beforeCode+newCode.slice(0,n)
        domPaper.scrollTop=domPaper.scrollHeight//这个要放到最后，因为要生成代码才可以，这段代码也可以写成precode.scrollTop=scrollHeight
        // console.log(domPaper.scrollTop)

        if (n < markdown.length) {
            setTimeout(a, duration)//这里的duration就是新的延迟时间

            // window.clearInterval(id)
            // fn2()//前面的延迟函数，也就是闹钟结束后就执行后面的这两个函数fn2和fn3
            // fn3(code)
        } else {
            callback()//别的地方来调用这个形参
        }
    }, duration);

    $('.allButton').on('click','button',function (e){
        $(e.currentTarget).addClass('active').siblings().removeClass('active')
        let b=$(e.currentTarget).attr('speed')
        if (b==='50'){
            duration=50
        }
        else if(b==='20'){
            duration=20
        }
        else if(b==='0'){
            duration=0
        }
    })

}

function convertToHtml(mdToHTML,callback){
    var markdowncontent=document.getElementById('content')
    var div=document.createElement('div')
    div.className = 'html markdown-body'//因为github-markdown.min.css里面的class就是这个名字
    div.innerHTML =marked(mdToHTML);
    // div.id='convertToHTMLcontent'
    markdowncontent.replaceWith(div)//这里前面是pre，要换成div块级元素，所以重新用转换为HTML的div元素来替换
    callback()
}

// function fn3(x){
//     var n=0
//     var code2=`
// #paper{
//     background:white;
//     height:100px;
//     width:100px;
// }
//     `
//     var id=setInterval(() => {
//         n=n+1
//         // precode.innerHTML=x+code2.slice(0,n)//如果是用传进来的x，那么原来的x是不会改变的，所以要用0,n
//         // precode.innerHTML=precode.innerHTML+code2.slice(n-1,n)//如果是用precode.innerHTML,这个precode.innerHTML会一直改变，所以要用n-1,n
//         //上面的slice也可以改成code2[n-1]
//         precode.innerHTML=Prism.highlight(x+code2.slice(0,n), Prism.languages.css);//如果这里把code2直接放入到highlight里面会一瞬间显示出来，所以这里需要写入code2.slice(0,n)
//         //因为用到上面一行代码，所以前面的两行代码都可以不需要啦
//         //上一次的延迟函数里面已经有span标签了,所以需要传入参数x进来，免得重复加span 
//         console.log(precode.innerHTML)
//         stylecode.innerHTML=x+code2.slice(0,n)    
//         console.log(stylecode.innerHTML)   
//         //这里的参数除了可以传入上一次的code以外，还可以传入上一次的precode.innerHTML和stylecode.innerHTML。
//         if(code2.length<n){
//             clearInterval(id)
//         }
//     }, 10);

// }




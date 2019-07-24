var stylecode=document.querySelector('#stylecode')
var precode=document.querySelector('#precode')
// var newDiv=document.createElement('div')
// var body=document.getElementsByTagName('body')
// body[0].append(newDiv)
var code=`
body{
    background:red;
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
}, 500);





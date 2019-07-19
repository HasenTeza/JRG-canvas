var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
var lineWidth=5
// 全屏
autofullScreen(canvas)



// ----------画笔S------------------------
// 鼠标按下移动松开监听
listenToUser(canvas)
// ----------画笔E------------------------


// ---------橡皮擦S-------------------------
// 控制橡皮擦是否开启
var EraserEnabled =false//原本橡皮擦关闭，点击打开，再点击关闭
pen.onclick = function(){
  EraserEnabled =false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  EraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

black.onclick=function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick=function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick=function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
   black.classList.remove('active')
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick=function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
thin.onclick= function(){
  lineWidth=6
}

thick.onclick=function(){
  lineWidth=12
}

clear.onclick=function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
save.onclick=function(){
  var url=canvas.toDataURL("image/png")
  var a=document.createElement('a')
  document.body.appendChild(a)
  a.href=url
  a.download='我的签名'
  a.target='_blank'
  a.click
}
// ----------橡皮擦E------------------------




// ----------------------------------
//            封装函数S
// ----------------------------------


// *************全屏S*****************************
function autofullScreen(xxx){
// 全屏
fullScreen()
// 监听窗口宽高的位置【对屏幕大小变化进行监听】
window.onresize=function(){ fullScreen() }

//宽高 全屏设置 【背下来的】
function fullScreen(){
  xxx.width = document.documentElement.clientWidth;
  xxx.height = document.documentElement.clientHeight;
}
}
// *************全屏E**********************************



// ------------画笔基础S---------------------------------------------
//1. 画点
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,360);
  context.fill()
}

//2. 点连成线
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)//起点
  context.lineWidth=lineWidth
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath
}
// 3. 鼠标按下移动松开监听

function listenToUser(inid){
  // 设置标记，是否使用
  var using=false;
  var lastPoint={x:undefined,y:undefined}
if (document.body.ontouchstart !== undefined) {
  // 触屏设备
  inid.ontouchstart = function(aaa){
   console.log('开始摸我了')
   console.log(aaa)
   var x = aaa.touches[0].clientX
   var y = aaa.touches[0].clientY
   using= true
   if (EraserEnabled) {
     context.clearRect(x-5,y-5,10,10)
   }else{
    drawCircle(x,y,lineWidth/2)
    lastPoint={x:x,y:y}
  }
}
inid.ontouchmove = function(aaa){
 console.log('又摸又动')
 var x = aaa.touches[0].clientX;
 var y = aaa.touches[0].clientY;
 if (EraserEnabled) {
  if (using) {
    context.clearRect(x-10,y-10,20,20)
  }
}else{
  if (using) {
    drawCircle(x,y,lineWidth/2)
      // 连接点事需要的，不然在画线拐弯的时候会出现断点
      var newPoint={x:x,y:y}
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
      lastPoint=newPoint
    }
  }
}
inid.ontouchend = function(){
  console.log('不摸了')
  using=false
}
}else{
  // 非触屏设备
// 3.1.鼠标按下去
inid.onmousedown = function(aaa){
  var x = aaa.clientX
  var y = aaa.clientY
  using= true
  if (EraserEnabled) {
   context.clearRect(x-5,y-5,10,10)
 }else{
  drawCircle(x,y,lineWidth/2)
  lastPoint={x:x,y:y}
}
}
// 3.2.鼠标移动
inid.onmousemove = function(aaa){
  var x = aaa.clientX;
  var y = aaa.clientY;
  if (EraserEnabled) {
    if (using) {
      context.clearRect(x-10,y-10,20,20)
    }
  }else{
    if (using) {
      drawCircle(x,y,lineWidth/2)
      // 连接点事需要的，不然在画线拐弯的时候会出现断点
      var newPoint={x:x,y:y}
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
      lastPoint=newPoint
    }
  }
}
// 3.3.松开鼠标
inid.onmouseup = function(aaa){
  using=false
}
}
}
// ------------画笔基础E----------------------------------------------------------------




// ------------手机移动端S --------------------



// ------------手机移动端E --------------------
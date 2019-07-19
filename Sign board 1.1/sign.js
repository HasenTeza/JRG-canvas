var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
// 全屏
autofullScreen(canvas)



// ----------画笔S------------------------
// 鼠标按下移动松开监听
listenToMouse(canvas)
// ----------画笔E------------------------


// ---------橡皮擦S-------------------------
// 控制橡皮擦是否开启
var EraserEnabled =false//原本橡皮擦关闭，点击打开，再点击关闭
// eraser.onclick=function(){
// 	EraserEnabled=!EraserEnabled
// }
eraser.onclick=function(){
  EraserEnabled=true
  actions.className='actions x'
}
brush.onclick=function(){
  EraserEnabled=false
  actions.className='actions'
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
	context.strokeStyle='black'
	context.moveTo(x1,y1)//起点
	context.lineWidth=6
	context.lineTo(x2,y2)
	context.stroke()
	context.closePath
}
// 3. 鼠标按下移动松开监听
function listenToMouse(inid){
	// 设置标记，是否开启画画
var using=false;
var lastPoint={x:undefined,y:undefined}
// 3.1.鼠标按下去
inid.onmousedown = function(aaa){
  var x = aaa.clientX
  var y = aaa.clientY
  using= true
  if (EraserEnabled) {
  	 context.clearRect(x-5,y-5,10,10)
  }else{
  	drawCircle(x,y,3)
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
  	  drawCircle(x,y,3)
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
// ------------画笔基础E----------------------------------------------------------------




// ------------橡皮擦S--------------------
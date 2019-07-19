var divmain = document.getElementById('canvas');
// 设置标记，是否开启画画
var painting=false;
// 1.鼠标按下去
divmain.onmousedown = function(a){
  painting= true
  var x = a.clientX;
  var y = a.clientY;
  var divA = document.createElement('div');
  divmain.appendChild(divA);
  divA.style = "width:6px;height:6px;background:black;"
                +"border-radius:3px;"
                +"position:absolute;left:"+(x-3)+"px;"+"top"+(y-3)+"px;";
      }
// 2.鼠标移动
divmain.onmousemove = function(a){
  if(painting){
      var x = a.clientX;
      var y = a.clientY;
      var divA = document.createElement('div');
      divmain.appendChild(divA);
      divA.style = "width:6px;height:6px;background:blue;"
                    +"border-radius:3px;"
                    +"position:absolute;left:"+(x-3)+"px;"+"top"+(y-3)+"px;";
              }
      }
}
// 3.松开鼠标
divmain.onmouseup = function(c){
  painting=false
}

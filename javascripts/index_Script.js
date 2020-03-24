/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
var i, deviation, frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
function update()
{
    updateVariables();
    document.getElementById("frame").style.width = frameWidth+"px";
    document.getElementById("frame").style.minHeight = minFrameHeight+"px";
}
function updateVariables()
{
    //general
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
}
function setVariables()
{
    //variables
    deviation = 0.99;
    //general
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
}
function setElements()
{
    var myFrame = document.getElementById("frame");
    myFrame.style.position = "absolute";
    myFrame.style.width = frameWidth+"px";
    myFrame.style.minHeight = minFrameHeight+"px";
    myFrame.style.zIndex = "0";
}
function start()
{
    setVariables();
    setElements();
    i = setInterval("update()", 1);
    document.location.href = "StartPage.html";
}
window.addEventListener("load",start,false);
var deviation, frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
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
    myFrame.style.width = minFrameWidth+"px";
    myFrame.style.minHeight = minFrameHeight+"px";
    myFrame.style.zIndex = "0";
}
function start()
{
    setVariables();
    setElements();
    document.location.href = "StartPage.html";
}
window.addEventListener("load",start,false);
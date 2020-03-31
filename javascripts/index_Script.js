/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
var i, updateTimes, deviation, frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
function update()
{
    updateVariables();
    document.getElementById("frame").style.width = frameWidth+"px";
    document.getElementById("frame").style.minHeight = minFrameHeight+"px";

    updateTimes++;
    //console.log("updateTimes="+updateTimes);
    if(updateTimes==100)
    {
        //console.log("Frame Width: " + frameWidth + "px,\tFrame Height: "+ frameHeight + "px");
        //console.log("Unit: "+unit+"px");
        updateTimes=0;
    }
}
function updateVariables()
{
    //General
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
}
function setVariables()
{
    //Variables
    deviation = 0.99;
    //General
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
}
function printVariables()
{
    //Variables
    console.log("Variables");
    console.log("\tdeviation: " + deviation);
    //General
    console.log("General");
    console.log("\tunit: " + unit + " px");
    console.log("\tframeWidth: " + frameWidth + " px, frameHeight: " + frameHeight + " px");
    console.log("\tminFrameWidth: " + minFrameWidth + " px, minFrameHeight: " + minFrameHeight + " px");
}
function setElements()
{
    var myFrame = document.getElementById("frame");
    myFrame.style.position = "absolute";
    myFrame.style.width = frameWidth+"px";
    myFrame.style.maxWidth = frameWidth+"px";
    myFrame.style.height = minFrameHeight+"px";
    myFrame.style.maxHeight = minFrameHeight+"px";
    myFrame.style.zIndex = "0";
}
function start()
{
    setVariables();
    setElements();
    printVariables();
    updateTimes=0;
    i = setInterval("update()", 1);
    document.location.href = "StartPage.html";
}
window.addEventListener("load",start,false);
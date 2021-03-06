/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
var i, updateTimes, deviation, frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var animationWidth, animationHeight, animationX, animationY;
var skipWidth, skipHeight, skipX, skipY;
var isGroTion, isSkipVisible, pauseTime;
var timeout;
function update()
{
    updateVariables();
    document.getElementById("frame").style.width = frameWidth+"px";
    document.getElementById("frame").style.minHeight = minFrameHeight+"px";
    if(isGroTion)
    {
        animationWidth = frameWidth;
        animationHeight = minFrameHeight;
        setElementStyle("ani", animationWidth, animationHeight, animationX, animationY, 2);
    }
    else
    {
        animationWidth = (unit*600);
        animationHeight = (unit*500);
        setElementStyle("ani", animationWidth, animationHeight, animationX, animationY, 2);
    }
    setElementStyle("skip", skipWidth, skipHeight, skipX, skipY, 1);

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
    unit = screen.width/1920.0;
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //Animation
    animationWidth = (unit*600);
    animationHeight = (unit*500);
    animationX = (frameWidth/2)-(animationWidth/2);
    animationY = (minFrameHeight/2)-(animationHeight/2);
    //Skip
    skipWidth = (unit*150);
    skipHeight = (unit*80);
    skipX = 0;
    skipY = 0;
}
function setVariables()
{
    //Variables
    isGroTion = false;
    isSkipVisible = false;
    deviation = 0.99;
    pauseTime = 3000;
    //General
    unit = screen.width/1920.0;
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //Animation
    animationWidth = (unit*600);
    animationHeight = (unit*500);
    animationX = (frameWidth/2)-(animationWidth/2);
    animationY = (minFrameHeight/2)-(animationHeight/2);
    //Skip
    skipWidth = (unit*150);
    skipHeight = (unit*80);
    skipX = 0;
    skipY = 0;
}
function printVariables()
{
    //Variables
    console.log("Variables");
    console.log("\tisGroTion: " + isGroTion);
    console.log("\tisSkipVisible: " + isSkipVisible);
    console.log("\tdeviation: " + deviation);
    console.log("\tpauseTime: " + pauseTime);
    //General
    console.log("General");
    console.log("\tunit: " + unit + " px");
    console.log("\tframeWidth: " + frameWidth + " px, frameHeight: " + frameHeight + " px");
    console.log("\tminFrameWidth: " + minFrameWidth + " px, minFrameHeight: " + minFrameHeight + " px");
    //Animation
    console.log("Animation");
    console.log("\tanimationWidth: " + animationWidth + " px, animationHeight: " + animationHeight + " px");
    console.log("\tanimationX: " + animationX + " px, animationY: " + animationY + " px");
    //Skip
    console.log("Skip");
    console.log("\tskipWidth: " + skipWidth + " px, skipHeight: " + skipHeight + " px");
    console.log("\tskipX: " + skipX + " px, skipY: " + skipY + " px");
}
function setElementStyle(id, w, h, left, top, zIndex)
{
    if(document.getElementById(id)!=null)
    {
        var element = document.getElementById(id);
        element.style.position = "absolute";
        element.style.width = w+"px";
        element.style.maxWidth = w+"px";
        element.style.height = h+"px";
        element.style.maxHeight = h+"px";
        element.style.left = left+"px";
        element.style.top = top+"px";
        element.style.zIndex = zIndex;
        element.style.outline = "none";
    }
    else
    {
        console.log("ID: "+id+" NOT Found!");
    }
}
function createInputImgElement(parent, id, src, alt)
{
    var element = document.createElement("input");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("type", "image");
    element.setAttribute("id", id);
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);  
}
function createImgElement(parent, id, src, alt)
{
    var element = document.createElement("img");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("id", id);
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);
}
function setIcon(id, path)
{
    if(document.getElementById(id)!=null)
        document.getElementById(id).setAttribute("src", path);
    else
        console.log("ID: "+id+" NOT Found!");
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
    //Animation
    createImgElement("frame", "ani", "", "ani");
    if(isGroTion)
    {
        animationWidth = frameWidth;
        animationHeight = minFrameHeight;
        setIcon("ani", "resources/StartAnimation/start.gif");
        setElementStyle("ani", animationWidth, animationHeight, animationX, animationY, 2);
        pauseTime = 5000;
    }
    else
    {
        var numOfAni = 1;
        var x = Math.floor((Math.random() * numOfAni));
        var GIFtoSet = "resources/StartAnimation/start"+x+".gif"
        animationWidth = (unit*600);
        animationHeight = (unit*500);
        setIcon("ani", GIFtoSet);
        setElementStyle("ani", animationWidth, animationHeight, animationX, animationY, 2);
        pauseTime = 6000;
    }
    //Skip
    createInputImgElement("frame", "skip", "", "skip");
    if(isSkipVisible)
        setIcon("skip", "resources/images/StartPage_SkipWhite.png"); 
    else
        setIcon("skip", "resources/images/StartPage_SkipBlack.png");
    setElementStyle("skip", skipWidth, skipHeight, skipX, skipY, 1);
    //ButtonEvent
    setBtnEvent("skip", !isGroTion);
}
function setBtnEvent(id, available)
{
    if(document.getElementById(id)!=null)
    {
        if(available)
        {
            //console.log("Set Button("+id+") Event!");
            document.getElementById(id).style.cursor = "pointer";
            document.getElementById(id).addEventListener("mouseover", btnMouseOver, true);
            document.getElementById(id).addEventListener("mouseout", btnMouseOut, true);
            document.getElementById(id).addEventListener("click", btnMouseClick, true);
        }
        else
        {
            //console.log("Remove Button("+id+") Event!");
            document.getElementById(id).style.cursor = "context-menu";
            document.getElementById(id).removeEventListener("mouseover", btnMouseOver, true);
            document.getElementById(id).removeEventListener("mouseout", btnMouseOut, true);
            document.getElementById(id).removeEventListener("click", btnMouseClick, true);
        }
    }
    else
    {
        console.log("ID: "+id+" NOT Found!");
    }
}
function btnMouseClick(event)
{
    var id = event.target.id;
    //console.log("Mouse Click:"+id);
    switch(id)
    {
        case "skip":
            clearTimeout(timeout);
            document.location.href = "HomePage.html";
            break;
        default:
            console.log("Mouse Out Button("+id+") NOT Found!");
            break;
    }
}
function btnMouseOver(event)
{
    var id = event.target.id;
    switch(id)
    {
        case "skip":
            document.getElementById(id).style.cursor = "context-menu";
            if(isSkipVisible)
                setIcon("skip", "resources/images/StartPage_SkipWhite_MouseOn.png");
            else
                setIcon("skip", "resources/images/StartPage_SkipBlack_MouseOn.png");
            break;
        default:
            console.log("Mouse Out Button("+id+") NOT Found!");
            break;
    }
}
function btnMouseOut(event)
{
    var id = event.target.id;
    switch(id)
    {
        case "skip":
            document.getElementById(id).style.cursor = "context-menu";
            if(isSkipVisible)
                setIcon("skip", "resources/images/StartPage_SkipWhite.png");
            else
                setIcon("skip", "resources/images/StartPage_SkipBlack.png");
            break;
        default:
            console.log("Mouse On Button("+id+") NOT Found!");
            break;
    }
}
function start()
{
    setVariables();
    setElements();
    //printVariables();
    updateTimes=0;
    i = setInterval("update()", 1);
    timeout = setTimeout(function(){document.location.href = "HomePage.html";}, pauseTime);
}
window.addEventListener("load",start,false);
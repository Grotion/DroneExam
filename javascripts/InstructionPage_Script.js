/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
var i, updateTimes, deviation, space, instructionText;
var frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var backWidth, backHeight, backX, backY;
function update()
{
    updateVariables();
    document.getElementById("frame").style.width = frameWidth+"px";
    document.getElementById("frame").style.minHeight = minFrameHeight+"px";
    setElementStyle("instruction", frameWidth, minFrameHeight, 0, 0, 1);
    setTextStyle("instructionTitle", (unit*40), (unit*10), (unit*10), (unit*20), (unit*20));
    setTextStyle("instructionText", (unit*20), (unit*10), 0, (unit*40), (unit*20));
    setElementStyle("back", backWidth, backHeight, backX, backY, 1);

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
    //back
    backWidth = (unit*150);
    backHeight = (unit*100);
    backX = frameWidth-backWidth-(unit*15);
    backY = (unit*-10);
}
function setVariables()
{
    //Variables
    deviation = 0.99;
    space = "&nbsp;&nbsp;&nbsp;"
    instructionText = "Report Anything: grotion0720@gmail.com<br>Thank you!<br>Last Update: 2020-04-01<br><br><footer>&copy; Copyright 2020 GROTION</footer>";
    //General
    unit = screen.width/1920.0;
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //back
    backWidth = (unit*150);
    backHeight = (unit*100);
    backX = frameWidth-backWidth-(unit*15);
    backY = (unit*-10);
}
function printVariables()
{
    //Variables
    console.log("Variables");
    console.log("\tdeviation: " + deviation);
    console.log("\tspace: " + space);
    console.log("\tinstructionText: " + instructionText);
    //General
    console.log("General");
    console.log("\tunit: " + unit + " px");
    console.log("\tframeWidth: " + frameWidth + " px, frameHeight: " + frameHeight + " px");
    console.log("\tminFrameWidth: " + minFrameWidth + " px, minFrameHeight: " + minFrameHeight + " px");
    //back
    console.log("back");
    console.log("\tbackWidth: " + backWidth + " px, backHeight: " + backHeight + " px");
    console.log("\tbackX: " + backX + " px, backY: " + backY + " px");
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
function setTextStyle(id, fontSize, marginTop, marginBottom, marginLeft, marginRight)
{
    if(document.getElementById(id)!=null)
    {
        var element = document.getElementById(id);
        element.style.fontSize = fontSize+"px";
        element.style.marginTop = marginTop+"px";
        element.style.marginBottom = marginBottom+"px";
        element.style.marginLeft = marginLeft+"px";
        element.style.marginRight = marginRight+"px";
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
function createDivElement(parent, id)
{
    var element = document.createElement("div");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("id", id);
}
function createPElement(parent, id, initialText)
{
    var element = document.createElement("p");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("id", id);
    element.innerHTML = initialText;
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
    //Instruction
    createDivElement("frame", "instruction");
    setElementStyle("instruction", frameWidth, minFrameHeight, 0, 0, 1);
    //InstructionTitle
    createPElement("instruction", "instructionTitle", "Instructions");
    setTextStyle("instructionTitle", (unit*40), (unit*10), (unit*10), (unit*20), (unit*20));
    //InstructionText
    createPElement("instruction", "instructionText", instructionText);
    setTextStyle("instructionText", (unit*20), (unit*10), 0, (unit*40), (unit*20));
    //Back
    createInputImgElement("frame", "back", "resources/images/InstructionPage_Back.png", "back");
   	setElementStyle("back", backWidth, backHeight, backX, backY, 1);
    //ButtonEvent
   	setBtnEvent("back", true);
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
        case "back":
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
        case "back":
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
        case "back":
            setElementStyle("back", backWidth, backHeight, backX, backY, 1);
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
}
window.addEventListener("load",start,false);
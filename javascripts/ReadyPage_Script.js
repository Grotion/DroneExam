var i,deviation, testType, space, basicInstruction, proInstruction;
var frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var titleWidth, titleHeight, titleX, titleY;
var instructionWidth, instructionHeight, instructionX, instructionY;
var btnWidth, btnHeight, btn1X, btn2X, btnY, btnEnlarge;
function setVariables()
{
    testType = localStorage.getItem("grotion_droneTest_testType");
    if(testType!="basic"&&testType!="pro")
    {
        alert("Test Type NOT Found! Transfer To Home Page!");
        document.location.href = "HomePage.html";
    }
    //variables
    deviation = 0.99;
    space = "&nbsp;&nbsp;&nbsp;"
    basicInstruction = "1. 學科測驗成績最高分為100分，及格標準為80分，測驗考科計4 項如下：<br>"+space+"(1) 民用航空法及相關法規。<br>"+space+"(2) 基礎飛行原理。<br>"+space+"(3) 氣象。<br>"+space+"(4) 緊急處置與飛行決策。<br>"+"2. 普通操作證學科測驗考題分配及測驗時間：共計20題，測驗時間30分鐘<br>"+"3. 題目均為4 選1 之單選題。";
    proInstruction = "1. 學科測驗成績最高分為100分，及格標準為80分，測驗考科計4 項如下：<br>"+space+"(1) 民用航空法及相關法規。<br>"+space+"(2) 基礎飛行原理。<br>"+space+"(3) 氣象。<br>"+space+"(4) 緊急處置與飛行決策。<br>"+"2. 普通操作證學科測驗考題分配及測驗時間：共計40題，測驗時間60分鐘<br>"+"3. 題目均為4 選1 之單選題。";
    //general
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //title
    titleWidth = (unit*700);
    titleHeight = (unit*150);
    titleX = (frameWidth/2-(titleWidth/2));
    titleY = (unit*10);
    //instructionBackground
    instructionWidth = frameWidth*3/4;
    instructionHeight = (unit*400);
    instructionTitleHeight = (unit*60);//Determine By ReadyPage.css
    instructionTextHeight = instructionHeight-instructionTitleHeight;
    instructionX = (frameWidth/2-(instructionWidth/2));
    instructionY = titleY+titleHeight-(unit*10);
    //Buttons
    btnWidth = (unit*470);
    btnHeight = (unit*120);
    btn1X = (frameWidth/2)-btnWidth-(unit*30);
    btn2X = (frameWidth/2)+(unit*30);
    btnY = minFrameHeight-btnHeight-(unit*50);
    btnEnlarge = (unit*10);
}
function setElementStyle(id, w, h, left, top, zIndex)
{
    if(document.getElementById(id)!=null)
    {
        var element = document.getElementById(id);
        element.style.position = "absolute";
        element.style.width = w+"px";
        element.style.height = h+"px";
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
    myFrame.style.width = minFrameWidth+"px";
    myFrame.style.minHeight = minFrameHeight+"px";
    myFrame.style.zIndex = "0";
    //Title
    createImgElement("frame", "title", "", "title");
    setElementStyle("title", titleWidth, titleHeight, titleX, titleY, 1);
    if(testType=="basic")
        setIcon("title", "resources/images/ReadyPage_BasicTitle.png");
    else if(testType=="pro")
        setIcon("title", "resources/images/ReadyPage_ProTitle.png");
    //Instruction
    createDivElement("frame", "instruction");
    setElementStyle("instruction", instructionWidth, instructionHeight, instructionX, instructionY, 1);
    //InstructionBackground
    createImgElement("instruction", "instructionBackground", "resources/images/ReadyPage_Instructions.png", "instructionBackground");
    setElementStyle("instructionBackground", instructionWidth, instructionHeight, 0, 0, 2);
    //InstructionTitle
    createPElement("instruction", "instructionTitle", "測驗說明：");
    setElementStyle("instructionTitle", instructionWidth, instructionTitleHeight, 0, 0, 2);
    //InstructionText
    createPElement("instruction", "instructionText", "");
    setElementStyle("instructionText", instructionWidth, instructionTextHeight, 0, instructionTitleHeight, 2);
    if(testType=="basic")
    	document.getElementById("instructionText").innerHTML = basicInstruction
    else if(testType=="pro")
    	document.getElementById("instructionText").innerHTML = proInstruction
    //Back
    createInputImgElement("frame", "back", "resources/images/ReadyPage_BackBtn.png", "back");
   	setElementStyle("back", btnWidth, btnHeight, btn1X, btnY, 1);
    //Start
    createInputImgElement("frame", "start", "resources/images/ReadyPage_StartBtn.png", "start");
   	setElementStyle("start", btnWidth, btnHeight, btn2X, btnY, 1);
    //ButtonEvent
   	setBtnEvent("back", true);
   	setBtnEvent("start", true);
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
        case "start":
            document.location.href = "TestPage.html";
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
            setElementStyle("back", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btn1X-(btnEnlarge/2), btnY-(btnEnlarge/2), 1);
            break;
        case "start":
            setElementStyle("start", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btn2X-(btnEnlarge/2), btnY-(btnEnlarge/2), 1);
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
            setElementStyle("back", btnWidth, btnHeight, btn1X, btnY, 1);
            break;
        case "start":
            setElementStyle("start", btnWidth, btnHeight, btn2X, btnY, 1);
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
    //i = setInterval("renew()", 1); 
}
window.addEventListener("load",start,false);
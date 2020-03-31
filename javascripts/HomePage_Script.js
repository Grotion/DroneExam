/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
// JavaScript source code
var i, updateTimes, updateTimes,deviation, testType;
var frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var logoWidth, logoHeight, logoX, logoY;
var btnWidth, btnHeight, btnX, btn1Y, btn2Y, btn3Y, btn4Y, btnEnlarge;
var basicBtnMouseOn, proBtnMouseOn, instructionBtnMouseOn;
function update()
{
    updateVariables();
    document.getElementById("frame").style.width = frameWidth+"px";
    document.getElementById("frame").style.minHeight = minFrameHeight+"px";
    setElementStyle("logo", logoWidth, logoHeight, logoX, logoY, 1);
    if(basicBtnMouseOn)
        setElementStyle("basic", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn1Y-(btnEnlarge/2), 1);
    else
        setElementStyle("basic", btnWidth, btnHeight, btnX, btn1Y, 1);
    if(proBtnMouseOn)
        setElementStyle("pro", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn2Y-(btnEnlarge/2), 1);
    else
        setElementStyle("pro", btnWidth, btnHeight, btnX, btn2Y, 1);
    if(instructionBtnMouseOn)
        setElementStyle("instruction", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn3Y-(btnEnlarge/2), 1);
    else
        setElementStyle("instruction", btnWidth, btnHeight, btnX, btn3Y, 1);

    updateTimes++;
    //console.log("updateTimes="+updateTimes);
    if(updateTimes==200)
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
    //Logo
    logoWidth = (unit*600);
    logoHeight = (unit*150);
    logoX = (frameWidth/2-(logoWidth/2));
    logoY = (unit*10);
    //Buttons
    btnWidth = (unit*470);
    btnHeight = (unit*120);
    btnX = (frameWidth/2-(btnWidth/2));
    btn2Y = (minFrameHeight/2-(btnHeight/2));
    btn1Y = btn2Y-btnHeight-(unit*60);
    btn3Y = btn2Y+btnHeight+(unit*60);
    btnEnlarge = (unit*10);
}
function setVariables()
{
    //variables
    testType = "unknown";
    deviation = 0.99;
    basicBtnMouseOn = false;
    proBtnMouseOn = false;
    instructionBtnMouseOn = false;
    //General
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    console.log("Version: 1.0");
    console.log("Frame Width: " + frameWidth + "px,\tFrame Height: "+ frameHeight + "px");
    console.log("Unit: "+unit+"px");
    //Logo
    logoWidth = (unit*600);
    logoHeight = (unit*150);
    logoX = (frameWidth/2-(logoWidth/2));
    logoY = (unit*10);
    //Buttons
    btnWidth = (unit*470);
    btnHeight = (unit*120);
    btnX = (frameWidth/2-(btnWidth/2));
    btn2Y = (minFrameHeight/2-(btnHeight/2));
    btn1Y = btn2Y-btnHeight-(unit*60);
    btn3Y = btn2Y+btnHeight+(unit*60);
    btnEnlarge = (unit*10);
}
function printVariables()
{
    //Variables
    console.log("Variables");
    console.log("\tdeviation: " + deviation);
    console.log("\ttestType: " + testType);
    console.log("\tbasicBtnMouseOn: " + basicBtnMouseOn);
    console.log("\tproBtnMouseOn: " + proBtnMouseOn);
    console.log("\tinstructionBtnMouseOn: " + instructionBtnMouseOn);
    //General
    console.log("General");
    console.log("\tunit: " + unit + " px");
    console.log("\tframeWidth: " + frameWidth + " px, frameHeight: " + frameHeight + " px");
    console.log("\tminFrameWidth: " + minFrameWidth + " px, minFrameHeight: " + minFrameHeight + " px");
    //Logo
    console.log("Logo");
    console.log("\tlogoWidth: " + logoWidth + " px, logoHeight: " + logoHeight + " px");
    console.log("\tlogoX: " + logoX + " px, logoY: " + logoY + " px");
    //Buttons
    console.log("Buttons");
    console.log("\tbtnWidth: " + btnWidth + " px, btnHeight: " + btnHeight + " px");
    console.log("\tbtnX: " + btnX + " px, btn1Y: " + btn1Y + " px, btn2Y: " + btn2Y + " px, btn3Y: " + btn3Y + " px");
    console.log("\tbtnEnlarge: " + btnEnlarge + " px");
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
function createDivElement(parent, id)
{
    var element = document.createElement("div");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("id", id);
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
    //Logo
    createInputImgElement("frame", "logo", "resources/images/HomePage_Title.png", "logo");
    setElementStyle("logo", logoWidth, logoHeight, logoX, logoY, 1);
    //Basic
    createInputImgElement("frame", "basic", "resources/images/HomePage_BasicBtn.png", "basic");
    setElementStyle("basic", btnWidth, btnHeight, btnX, btn1Y, 1);
    //Pro
    createInputImgElement("frame", "pro", "resources/images/HomePage_ProBtn.png", "pro");
    setElementStyle("pro", btnWidth, btnHeight, btnX, btn2Y, 1);
    //Instruction
    createInputImgElement("frame", "instruction", "resources/images/HomePage_InstructionBtn.png", "instruction");
    setElementStyle("instruction", btnWidth, btnHeight, btnX, btn3Y, 1);

    setBtnEvent("logo", true);
    setBtnEvent("basic", true);
    setBtnEvent("pro", true);
    setBtnEvent("instruction", true);
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
        case "logo":
            document.location.href = "StartPage.html";
            break;
        case "basic":
            localStorage.setItem("grotion_droneTest_testType", "basic");
            document.location.href = "ReadyPage.html";
            break;
        case "pro":
            localStorage.setItem("grotion_droneTest_testType", "pro");
            document.location.href = "ReadyPage.html";
            break;
        case "instruction":
            document.location.href = "InstructionPage.html";
            break;
        /*case "exit":
            setExitConfirmVisible(true);
            break;
        case "exitConfirmYes":
            localStorage.clear();
            break;
        case "exitConfirmNo":
            setExitConfirmVisible(false);
            break;
        case "exitConfirmCancel":
            setExitConfirmVisible(false);
            break;*/
        default:
            console.log("Mouse Out Button("+id+") NOT Found!");
            break;
    }
}
function btnMouseOver(event)
{
    var id = event.target.id;
    //console.log("Mouse Out:"+id);
    switch(id)
    {
        case "logo":
            document.getElementById(id).style.cursor = "context-menu";
            break;
        case "basic":
            basicBtnMouseOn = true;
            setElementStyle("basic", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn1Y-(btnEnlarge/2), 1);
            break;
        case "pro":
            proBtnMouseOn = true;
            setElementStyle("pro", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn2Y-(btnEnlarge/2), 1);
            break;
        case "instruction":
            instructionBtnMouseOn = true;
            setElementStyle("instruction", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn3Y-(btnEnlarge/2), 1);
            break;
        /*case "exit":
            setElementStyle("exit", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn4Y-(btnEnlarge/2), 1);
            break;
        case "exitConfirmYes":
            setElementStyle("exitConfirmYes", exitConfirmYesNoWidth+exitConfirmEnlarge, exitConfirmYesNoHeight+exitConfirmEnlarge, exitConfirmYesX-(exitConfirmEnlarge/2), exitConfirmYesNoY-(exitConfirmEnlarge/2), 4);
            break;
        case "exitConfirmNo":
            setElementStyle("exitConfirmNo", exitConfirmYesNoWidth+exitConfirmEnlarge, exitConfirmYesNoHeight+exitConfirmEnlarge, exitConfirmNoX-(exitConfirmEnlarge/2), exitConfirmYesNoY-(exitConfirmEnlarge/2), 4);
            break;
        case "exitConfirmCancel":
            setElementStyle("exitConfirmCancel", (exitConfirmCancelRadis*2)+exitConfirmEnlarge, (exitConfirmCancelRadis*2)+exitConfirmEnlarge, exitConfirmCancelX-(exitConfirmEnlarge/2), exitConfirmCancelY-(exitConfirmEnlarge/2), 4);
            break;*/
        default:
            console.log("Mouse Out Button("+id+") NOT Found!");
            break;
    }
}
function btnMouseOut(event)
{
    var id = event.target.id;
    //console.log("Mouse Over:"+id);
    switch(id)
    {
        case "logo":
            document.getElementById(id).style.cursor = "context-menu";
            break;
        case "basic":
            basicBtnMouseOn = false;
            setElementStyle("basic", btnWidth, btnHeight, btnX, btn1Y, 1);
            break;
        case "pro":
            proBtnMouseOn = false;
            setElementStyle("pro", btnWidth, btnHeight, btnX, btn2Y, 1);
            break;
        case "instruction":
            instructionBtnMouseOn = false;
            setElementStyle("instruction", btnWidth, btnHeight, btnX, btn3Y, 1);
            break;
        /*case "exit":
            setElementStyle("exit", btnWidth, btnHeight, btnX, btn4Y, 1);
            break;
        case "exitConfirmYes":
            setElementStyle("exitConfirmYes", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmYesX, exitConfirmYesNoY, 4);
            break;
        case "exitConfirmNo":
            setElementStyle("exitConfirmNo", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmNoX, exitConfirmYesNoY, 4);
            break;
        case "exitConfirmCancel":
            setElementStyle("exitConfirmCancel", exitConfirmCancelRadis*2, exitConfirmCancelRadis*2, exitConfirmCancelX, exitConfirmCancelY, 4);
            break;*/
        default:
            console.log("Mouse On Button("+id+") NOT Found!");
            break;
    }
}
function setExitConfirmVisible(isVisible)
{
    if(isVisible)
    {
        document.getElementById("exitConfirm").style.visibility = "visible";
        setBtnEvent("logo", false);
        setBtnEvent("basic", false);
        setBtnEvent("pro", false);
        setBtnEvent("instruction", false);
        setBtnEvent("exit", false);
        setBtnEvent("exitConfirmYes", true);
        setBtnEvent("exitConfirmNo", true);
        setBtnEvent("exitConfirmCancel", true);
    }
    else
    {
        document.getElementById("exitConfirm").style.visibility = "hidden";
        setBtnEvent("logo", true);
        setBtnEvent("basic", true);
        setBtnEvent("pro", true);
        setBtnEvent("instruction", true);
        setBtnEvent("exit", true);
        setBtnEvent("exitConfirmYes", false);
        setBtnEvent("exitConfirmNo", false);
        setBtnEvent("exitConfirmCancel", false);
    }
}
function start()
{
    localStorage.clear();
    //console.log("Screen Width: " + screen.width + "px,\tScreen Height: "+ screen.height + "px");
    //console.log("Inner Width: " + window.innerWidth + "px,\tInner Height: "+ window.innerHeight + "px");
    setVariables();
    setElements();
    printVariables();
    updateTimes=0;
    i = setInterval("update()", 1);
    localStorage.setItem("grotion_droneTest_testType", testType);
}
window.addEventListener("load",start,false);
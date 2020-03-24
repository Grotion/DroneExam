/**
 * @author Grotion <grotion0720@gmail.com>
 * © 2020 Grotion All Rights Reserved
 */
var i, deviation, space, score;
var frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var scoreBoxWidth, scoreBoxHeight, scoreBoxX, scoreBoxY;
var passWidth, passHeight, passX, passY;
var aniWidth, aniHeight, aniX, aniY;
var btnWidth, btnHeight, btnX, btn1Y, btn2Y, btnEnlarge;
function setVariables()
{
    //localStorage.setItem("grotion_droneTest_score", 80);
	score = localStorage.getItem("grotion_droneTest_score");
    if(score<0||score==null)
    {
        alert("You Haven't Done Exam Yet! Transfer To Home Page!");
        document.location.href = "HomePage.html";
    }
    //variables
    deviation = 0.99;
    space = "&nbsp;"
    //general
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //Score
    scoreBoxWidth = frameWidth;
    scoreBoxHeight = (unit*40);
    scoreBoxX = (frameWidth/2)-(scoreBoxWidth/2);
    scoreBoxY = (unit*10);
    //Pass
    passWidth = frameWidth;
    passHeight = (unit*80);
    passX = (frameWidth/2)-(passWidth/2);
    passY = scoreBoxY+scoreBoxHeight+(unit*0);
    //Animation
    aniWidth = (unit*600);
    aniHeight = (unit*400);
    aniX = (frameWidth/2)-(aniWidth/2);
    aniY = passY+passHeight+(unit*50);
    //Buttons
    btnWidth = (unit*470);
    btnHeight = (unit*120);
    btnX = (frameWidth/2)-(btnWidth/2);
    btn1Y = aniY+aniHeight+(unit*40);
    btn2Y = btn1Y+btnHeight+(unit*30);
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
function createPElement(parent, id, initialText)
{
    var element = document.createElement("p");
    document.getElementById(parent).appendChild(element);
    element.setAttribute("id", id);
    element.innerHTML = initialText;
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
    myFrame.style.width = minFrameWidth+"px";
    myFrame.style.minHeight = minFrameHeight+"px";
    myFrame.style.zIndex = "0";
    //Score
    createPElement("frame", "scoreBox", "本次測驗您獲得 "+score+" 分");
    setElementStyle("scoreBox", scoreBoxWidth, scoreBoxHeight, scoreBoxX, scoreBoxY, 1);
    //Pass
    createPElement("frame", "pass", "");
    setElementStyle("pass", passWidth, passHeight, passX, passY, 1);
    //Animation
    createImgElement("frame", "ani", "", "ani");
    if(score>=80)
    {
        document.getElementById("pass").innerHTML = "恭喜你通過本次考驗!";
        document.getElementById("pass").style.color = "green";
        var numOfPassAni = 1;
        var x = Math.floor((Math.random() * numOfPassAni));
        var GIFtoSet = "/resources/ResultAnimation/pass"+x+".gif";
        setIcon("ani", GIFtoSet);
        setElementStyle("ani", aniWidth, aniHeight, aniX, aniY, 1);
    }
    else
    {
        document.getElementById("pass").innerHTML = "很抱歉，您未能通過考試：(";
        document.getElementById("pass").style.color = "red";
        var numOfFailAni = 1;
        var x = Math.floor((Math.random() * numOfFailAni));
        var GIFtoSet = "/resources/ResultAnimation/fail"+x+".gif";
        setIcon("ani", GIFtoSet);
        setElementStyle("ani", aniWidth, aniHeight, aniX, aniY, 1);
    }
    //Review
    createInputImgElement("frame", "review", "/resources/images/ScorePage_ReviewBtn.png", "pre");
    setElementStyle("review", btnWidth, btnHeight, btnX, btn1Y, 1);
    //Home
    createInputImgElement("frame", "home", "/resources/images/ScorePage_HomeBtn.png", "next");
    setElementStyle("home", btnWidth, btnHeight, btnX, btn2Y, 1);
    //ButtonEvent
    setBtnEvent("review", true);
    setBtnEvent("home", true);
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
        case "review":
            document.location.href = "TestPage.html";
            break;
        case "home":
            localStorage.clear();
            console.log("Clear!");
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
    //console.log("Mouse Out:"+id);
    switch(id)
    {
        case "review":
            setElementStyle("review", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn1Y-(btnEnlarge/2), 1);
            break;
        case "home":
            setElementStyle("home", btnWidth+btnEnlarge, btnHeight+btnEnlarge, btnX-(btnEnlarge/2), btn2Y-(btnEnlarge/2), 1);
            break;
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
        case "review":
            setElementStyle("review", btnWidth, btnHeight, btnX, btn1Y, 1);
            break;
        case "home":
            setElementStyle("home", btnWidth, btnHeight, btnX, btn2Y, 1);
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
}
window.addEventListener("load",start,false);
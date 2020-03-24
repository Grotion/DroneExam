var i,deviation, space, testType, score, isDone, isDoneStr;
var frameWidth, frameHeight, minFrameWidth, minFrameHeight, unit;
var backWidth, backHeight, backX, backY;
var exitConfirmBackgroundWidth, exitConfirmBackgroundHeight, exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmCancelRadis, exitConfirmEnlarge;
var exitConfirmX, exitConfirmY, exitConfirmYesNoY, exitConfirmYesX, exitConfirmNoX, exitConfirmCancelX, exitConfirmCancelY;
var questionNumWidth, questionNumHeight, questionNumX, questionNumY;
var questionWidth, questionTextWidth, questionHeight, questionX, questionY;
var optionWidth, optionHeight, optionTextWidth, optionTextHeight, optionX, optionA_Y, optionB_Y, optionC_Y, optionD_Y, optionAvailable;
var arrowWidth, arrowHeight, arrowY, preX, nextX, nextAvailable, preAvailable, arrowEnlarge;
let jsonUrl = "examQuestion.json";
var doneQuestionCount, currentQuestionCount;
var basic_question, basic_optionA, basic_optionB, basic_optionC, basic_optionD, basic_correct, basic_used;
var pro_question, pro_optionA, pro_optionB, pro_optionC, pro_optionD, pro_correct, pro_used;
var questionIsDone;
function setVariables()
{
	testType = localStorage.getItem("grotion_droneTest_testType");
    if(testType!="basic"&&testType!="pro")
    {
        alert("Test Type NOT Found! Transfer To Home Page!");
        document.location.href = "HomePage.html";
    }
    isDoneStr = localStorage.getItem("grotion_droneTest_isDone");
    if(isDoneStr=="true")
    {
        isDone = true;
        lastQuestionDone = true;
        score = localStorage.getItem("grotion_droneTest_score");
    }
    else
    {
        isDone = false;
        score = 0;
        lastQuestionDone = false;
    }
    //arrays
    basic_question = [];
    basic_optionA = [];
    basic_optionB = [];
    basic_optionC = [];
    basic_optionD = [];
    basic_correct = [];
    basic_used = [];
    pro_question = [];
    pro_optionA = [];
    pro_optionB = [];
    pro_optionC = [];
    pro_optionD = [];
    pro_correct = [];
    pro_used = [];
    questionIsDone = [];
    //variables
    deviation = 0.99;
    space = "&nbsp;"
    doneQuestionCount = 1;
    currentQuestionCount = 1;
    nextAvailable = false;
    preAvailable = false;
    optionAvailable = true;
    //general
    unit = ((screen.width/1920)+(screen.width%1920));
    frameWidth = screen.width*deviation;
    frameHeight = screen.height*deviation;
    minFrameWidth = (unit*1890);
    minFrameHeight = (unit*928);
    //exitConfirm
    exitConfirmBackgroundWidth = (unit*650);
    exitConfirmBackgroundHeight = (unit*250);
    exitConfirmYesNoWidth = (unit*175);
    exitConfirmYesNoHeight = (unit*75);
    exitConfirmCancelRadis = (unit*25);
    exitConfirmEnlarge = (unit*10);
    exitConfirmX = (frameWidth/2-(exitConfirmBackgroundWidth/2));
    exitConfirmY = (minFrameHeight/2-(exitConfirmBackgroundHeight/2));
    exitConfirmYesNoY = (exitConfirmBackgroundHeight*3/4)-(exitConfirmYesNoHeight/2);
    exitConfirmYesX = (exitConfirmBackgroundWidth/2)-(exitConfirmBackgroundWidth-(2*exitConfirmYesNoWidth))/6-exitConfirmYesNoWidth;
    exitConfirmNoX = (exitConfirmBackgroundWidth/2)+(exitConfirmBackgroundWidth-(2*exitConfirmYesNoWidth))/6;
    exitConfirmCancelX = exitConfirmBackgroundWidth-(exitConfirmCancelRadis*2)-(unit*12);
    exitConfirmCancelY = (unit*5);
    //back
    backWidth = (unit*120);
    backHeight = (unit*60);
    backX = (unit*10);
    backY = (unit*10);
    //questionNum
    questionNumWidth = (unit*130);
    questionNumHeight = (unit*80);
    questionNumX = frameWidth-questionNumWidth-(unit*25);
    questionNumY = (unit*30);
    //question
    questionWidth = (unit*1525);
    questionTextWidth = questionWidth-(unit*40);//Determine By TestPage.css
    questionHeight = (unit*400);
    questionX = (frameWidth/2)-(questionWidth/2);
    questionY = (unit*30);
    //option
    optionWidth = questionWidth;
    optionHeight = (unit*100);
    optionTextWidth = optionWidth-(unit*30);//Determine By TestPage.css
    optionTextHeight = (unit*20);//Determine By TestPage.css
    optionX = (frameWidth/2)-(optionWidth/2);
    optionA_Y = questionY+questionHeight+(unit*30);
    optionB_Y = optionA_Y+optionHeight+(unit*10);
    optionC_Y = optionB_Y+optionHeight+(unit*10);
    optionD_Y = optionC_Y+optionHeight+(unit*10);
    //arrow
    arrowWidth = (unit*100);
    arrowHeight = (unit*100);
    arrowY = optionB_Y+(optionHeight/2);
    preX = ((frameWidth-questionWidth)/4)-(arrowWidth/2);
    nextX = (frameWidth/2)+(questionWidth/2)+((frameWidth-questionWidth)/4)-(arrowWidth/2);
    arrowEnlarge = (unit*10);

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
    //Back
    createInputImgElement("frame", "back", "resources/images/TestPage_TestBackBtn.png", "back");
    setElementStyle("back", backWidth, backHeight, backX, backY, 1);
    //QuestionNum
    createPElement("frame", "questionNum", "");
    setElementStyle("questionNum", questionNumWidth, questionNumHeight, questionNumX, questionNumY, 1);
    //QuestionBox
    createDivElement("frame", "questionBox");
    setElementStyle("questionBox", questionWidth, questionHeight, questionX, questionY, 1);
    //QuestionBackground
    createImgElement("questionBox", "questionBackground", "resources/images/TestPage_QuestionBackground.png", "questionBackground");
    setElementStyle("questionBackground", questionWidth, questionHeight, 0, 0, 2);
    //QuestionText
    createPElement("questionBox", "questionText", "");
    setElementStyle("questionText", questionTextWidth, questionHeight, 0, 0, 3);
    //OptionA_Div
    createDivElement("frame", "optionA");
    setElementStyle("optionA", optionWidth, optionHeight, optionX, optionA_Y, 1);
    document.getElementById("optionA").setAttribute("class", "optionDiv");
    //OptionA_Background
    createImgElement("optionA", "optionA_Background", "resources/images/TestPage_Option_Original.png", "optionA_Background");
    setElementStyle("optionA_Background", optionWidth, optionHeight, 0, 0, 2);
    //OptionA_Text
    createPElement("optionA", "optionA_Text", "A."+space+"");
    setElementStyle("optionA_Text", optionTextWidth, optionTextHeight, 0, 0, 3);
    document.getElementById("optionA_Text").setAttribute("class", "optionText");
    //OptionB_Div
    createDivElement("frame", "optionB");
    setElementStyle("optionB", optionWidth, optionHeight, optionX, optionB_Y, 1);
    //OptionB_Background
    createImgElement("optionB", "optionB_Background", "resources/images/TestPage_Option_Original.png", "optionB_Background");
    setElementStyle("optionB_Background", optionWidth, optionHeight, 0, 0, 2);
    //OptionB_Text
    createPElement("optionB", "optionB_Text", "B."+space+"");
    setElementStyle("optionB_Text", optionTextWidth, optionTextHeight, 0, 0, 3);
    document.getElementById("optionB_Text").setAttribute("class", "optionText");
    //OptionC_Div
    createDivElement("frame", "optionC");
    setElementStyle("optionC", optionWidth, optionHeight, optionX, optionC_Y, 1);
    //OptionC_Background
    createImgElement("optionC", "optionC_Background", "resources/images/TestPage_Option_Original.png", "optionC_Background");
    setElementStyle("optionC_Background", optionWidth, optionHeight, 0, 0, 2);
    //OptionC_Text
    createPElement("optionC", "optionC_Text", "C."+space+"");
    setElementStyle("optionC_Text", optionTextWidth, optionTextHeight, 0, 0, 3);
    document.getElementById("optionC_Text").setAttribute("class", "optionText");
    //OptionD_Div
    createDivElement("frame", "optionD");
    setElementStyle("optionD", optionWidth, optionHeight, optionX, optionD_Y, 1);
    //OptionD_Background
    createImgElement("optionD", "optionD_Background", "resources/images/TestPage_Option_Original.png", "optionD_Background");
    setElementStyle("optionD_Background", optionWidth, optionHeight, 0, 0, 2);
    //OptionD_Text
    createPElement("optionD", "optionD_Text", "D."+space+"");
    setElementStyle("optionD_Text", optionTextWidth, optionTextHeight, 0, 0, 3);
    document.getElementById("optionD_Text").setAttribute("class", "optionText");
    //Pre
    createInputImgElement("frame", "pre", "resources/images/TestPage_PreviousBtn_Unavailable.png", "pre");
    setElementStyle("pre", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, preX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
    //Next
    createInputImgElement("frame", "next", "resources/images/TestPage_NextBtn_Unavailable.png", "next");
    setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
    //ExitComfirm
    createDivElement("frame", "exitConfirm");
    setElementStyle("exitConfirm", exitConfirmBackgroundWidth, exitConfirmBackgroundHeight, exitConfirmX, exitConfirmY, 2);
    //ExitComfirmBackground
    createImgElement("exitConfirm", "exitConfirmBackground", "resources/images/TestPage_ExitConfirm.png", "exitConfirmBackground");
    setElementStyle("exitConfirmBackground", exitConfirmBackgroundWidth, exitConfirmBackgroundHeight, 0, 0, 3);
    //ExitComfirmYes
    createImgElement("exitConfirm", "exitConfirmYes", "resources/images/TestPage_ExitConfirmYes.png", "exitConfirmYes");
    setElementStyle("exitConfirmYes", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmYesX, exitConfirmYesNoY, 4);
    //ExitComfirmNo
    createImgElement("exitConfirm", "exitConfirmNo", "resources/images/TestPage_ExitConfirmNo.png", "exitConfirmNo");
    setElementStyle("exitConfirmNo", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmNoX, exitConfirmYesNoY, 4);
    //ExitComfirmCancel
    createImgElement("exitConfirm", "exitConfirmCancel", "resources/images/TestPage_ExitConfirmCancel.png", "exitConfirmCancel");
    setElementStyle("exitConfirmCancel", exitConfirmCancelRadis*2, exitConfirmCancelRadis*2, exitConfirmCancelX, exitConfirmCancelY, 4);
    //ButtonEvent
    setExitConfirmVisible(false);
    setBtnEvent("next", false);
    //setBtnEvent("pre", false);
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
            if(isDone)
                document.location.href = "ScorePage.html";
            else
                setExitConfirmVisible(true);
            break;
        case "pre":
            preQuestion();
            break;
        case "next":
            nextQuestion();
            break;
        case "optionA_Text": case "optionA_Background":
            doneQuestion("A");
            break;
        case "optionB_Text": case "optionB_Background":
            doneQuestion("B");
            break;
        case "optionC_Text": case "optionC_Background":
            doneQuestion("C");
            break;
        case "optionD_Text": case "optionD_Background":
            doneQuestion("D");
            break;
        case "exitConfirmYes":
            document.location.href = "HomePage.html";
            break;
        case "exitConfirmNo":
            setExitConfirmVisible(false);
            break;
        case "exitConfirmCancel":
            setExitConfirmVisible(false);
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
        case "back":
            setIcon("back", "resources/images/TestPage_TestBackBtn_MouseOn.png");
            break;
        case "pre":
            break;
        case "next":
            break;
        case "optionA_Text": case "optionA_Background":
            break;
        case "optionB_Text": case "optionB_Background":
            break;
        case "optionC_Text": case "optionC_Background":
            break;
        case "optionD_Text": case "optionD_Background":
            break;
        case "exitConfirmYes":
            setElementStyle("exitConfirmYes", exitConfirmYesNoWidth+exitConfirmEnlarge, exitConfirmYesNoHeight+exitConfirmEnlarge, exitConfirmYesX-(exitConfirmEnlarge/2), exitConfirmYesNoY-(exitConfirmEnlarge/2), 4);
            break;
        case "exitConfirmNo":
            setElementStyle("exitConfirmNo", exitConfirmYesNoWidth+exitConfirmEnlarge, exitConfirmYesNoHeight+exitConfirmEnlarge, exitConfirmNoX-(exitConfirmEnlarge/2), exitConfirmYesNoY-(exitConfirmEnlarge/2), 4);
            break;
        case "exitConfirmCancel":
            setElementStyle("exitConfirmCancel", (exitConfirmCancelRadis*2)+exitConfirmEnlarge, (exitConfirmCancelRadis*2)+exitConfirmEnlarge, exitConfirmCancelX-(exitConfirmEnlarge/2), exitConfirmCancelY-(exitConfirmEnlarge/2), 4);
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
        case "back":
            setIcon("back", "resources/images/TestPage_TestBackBtn.png");
            break;
        case "pre":
            break;
        case "next":
            break;
        case "optionA_Text": case "optionA_Background":
            break;
        case "optionB_Text": case "optionB_Background":
            break;
        case "optionC_Text": case "optionC_Background":
            break;
        case "optionD_Text": case "optionD_Background":
            break;
        case "exitConfirmYes":
            setElementStyle("exitConfirmYes", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmYesX, exitConfirmYesNoY, 4);
            break;
        case "exitConfirmNo":
            setElementStyle("exitConfirmNo", exitConfirmYesNoWidth, exitConfirmYesNoHeight, exitConfirmNoX, exitConfirmYesNoY, 4);
            break;
        case "exitConfirmCancel":
            setElementStyle("exitConfirmCancel", exitConfirmCancelRadis*2, exitConfirmCancelRadis*2, exitConfirmCancelX, exitConfirmCancelY, 4);
            break;
        default:
            console.log("Mouse On Button("+id+") NOT Found!");
            break;
    }
}
function setOptionAvailable(isAvailable)
{
    setBtnEvent("optionA_Text", isAvailable);
    setBtnEvent("optionA_Background", isAvailable);
    setBtnEvent("optionB_Text", isAvailable);
    setBtnEvent("optionB_Background", isAvailable);
    setBtnEvent("optionC_Text", isAvailable);
    setBtnEvent("optionC_Background", isAvailable);
    setBtnEvent("optionD_Text", isAvailable);
    setBtnEvent("optionD_Background", isAvailable);
}
function setExitConfirmVisible(isVisible)
{
    if(isVisible)
    {
        document.getElementById("exitConfirm").style.visibility = "visible";
        setBtnEvent("back", false);
        setBtnEvent("next", false);
        setBtnEvent("pre", false);
        setBtnEvent("optionA_Text", false);
        setBtnEvent("optionA_Background", false);
        setBtnEvent("optionB_Text", false);
        setBtnEvent("optionB_Background", false);
        setBtnEvent("optionC_Text", false);
        setBtnEvent("optionC_Background", false);
        setBtnEvent("optionD_Text", false);
        setBtnEvent("optionD_Background", false);
        setBtnEvent("exitConfirmYes", true);
        setBtnEvent("exitConfirmNo", true);
        setBtnEvent("exitConfirmCancel", true);
    }
    else
    {
        document.getElementById("exitConfirm").style.visibility = "hidden";
        setBtnEvent("back", true);
        if(nextAvailable)
            setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
        else
            setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
        setBtnEvent("next", nextAvailable);
        if(preAvailable)
            setElementStyle("pre", arrowWidth, arrowHeight, preX, arrowY, 1);
        else
            setElementStyle("pre", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, preX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
        setBtnEvent("pre", preAvailable);
        setOptionAvailable(optionAvailable);
        setBtnEvent("exitConfirmYes", false);
        setBtnEvent("exitConfirmNo", false);
        setBtnEvent("exitConfirmCancel", false);
    }
}
function resetOptionBackground()
{
    setIcon("optionA_Background", "resources/images/TestPage_Option_Original.png");
    setIcon("optionB_Background", "resources/images/TestPage_Option_Original.png");
    setIcon("optionC_Background", "resources/images/TestPage_Option_Original.png");
    setIcon("optionD_Background", "resources/images/TestPage_Option_Original.png");
}
function doneQuestion(selectedOption)
{
    questionIsDone[doneQuestionCount-1] = true;
    judgeQuestion(selectedOption);
    optionAvailable = false;
    setOptionAvailable(optionAvailable);
    nextAvailable = true;
    setBtnEvent("next", nextAvailable);
    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
    setIcon("next", "resources/images/TestPage_NextBtn.png");
}
function judgeQuestion(selectedOption)
{
    switch(testType)  
    {
        case "basic":
        {
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount, basic_question[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_A", basic_optionA[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_B", basic_optionB[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_C", basic_optionC[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_D", basic_optionD[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_correct", basic_correct[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_selected", selectedOption);
            if(selectedOption == basic_correct[doneQuestionCount-1])
            {
                score += 5;
                setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Correct.png");
            }
            else
            {
                setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Wrong.png");
                setIcon("option"+basic_correct[doneQuestionCount-1]+"_Background", "resources/images/TestPage_Option_Correct.png");
            }
            break;
        }
        case "pro":
        {
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount, pro_question[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_A", pro_optionA[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_B", pro_optionB[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_C", pro_optionC[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_D", pro_optionD[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_correct", pro_correct[doneQuestionCount-1]);
            localStorage.setItem("grotion_droneTest_question"+doneQuestionCount+"_selected", selectedOption);
            if(selectedOption == pro_correct[doneQuestionCount-1])
            {
                score += 2.5;
                setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Correct.png");
            }
             else
            {
                setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Wrong.png");
                setIcon("option"+pro_correct[doneQuestionCount-1]+"_Background", "resources/images/TestPage_Option_Correct.png");
            }
            break;
        }
        default:
            console.log("Test Type NOT Found!");
            break;
    }
}
function judgeDoneQuestion(selectedOption, correctOption)
{
    if(selectedOption == correctOption)
    {
        setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Correct.png");
    }
    else
    {
        setIcon("option"+selectedOption+"_Background", "resources/images/TestPage_Option_Wrong.png");
        setIcon("option"+correctOption+"_Background", "resources/images/TestPage_Option_Correct.png");
    }
}
function nextQuestion()
{
    currentQuestionCount++;
    //console.log("Current: "+currentQuestionCount);
    preAvailable = true;
    setBtnEvent("pre", preAvailable);
    setElementStyle("pre", arrowWidth, arrowHeight, preX, arrowY, 1);
    setIcon("pre", "resources/images/TestPage_PreviousBtn.png");
    if(currentQuestionCount>doneQuestionCount)
    {
        doneQuestionCount++;
        //console.log("Done: "+doneQuestionCount);
        switch(testType)  
        {
            case "basic":
            {
                if(doneQuestionCount>20)
                {
                    localStorage.setItem("grotion_droneTest_isDone", "true");
                    localStorage.setItem("grotion_droneTest_score", score);
                    document.location.href = "ScorePage.html";
                }
                else
                {
                    resetOptionBackground();
                    document.getElementById("questionText").innerHTML = basic_question[doneQuestionCount-1];  
                    document.getElementById("optionA_Text").innerHTML = "A." + space + basic_optionA[doneQuestionCount-1];
                    document.getElementById("optionB_Text").innerHTML = "B." + space + basic_optionB[doneQuestionCount-1];  
                    document.getElementById("optionC_Text").innerHTML = "C." + space + basic_optionC[doneQuestionCount-1];  
                    document.getElementById("optionD_Text").innerHTML = "D." + space + basic_optionD[doneQuestionCount-1];
                    optionAvailable = true;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = false;
                    setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn_Unavailable.png");
                    document.getElementById("questionNum").innerHTML = doneQuestionCount+"/20";
                }
                break;
            }
            case "pro":
            {
                if(doneQuestionCount>40)
                {
                    localStorage.setItem("grotion_droneTest_isDone", "true");
                    localStorage.setItem("grotion_droneTest_score", score);
                    document.location.href = "ScorePage.html";
                }
                else
                {
                    resetOptionBackground();
                    document.getElementById("questionText").innerHTML = pro_question[doneQuestionCount-1];  
                    document.getElementById("optionA_Text").innerHTML = "A." + space + pro_optionA[doneQuestionCount-1];
                    document.getElementById("optionB_Text").innerHTML = "B." + space + pro_optionB[doneQuestionCount-1];  
                    document.getElementById("optionC_Text").innerHTML = "C." + space + pro_optionC[doneQuestionCount-1];  
                    document.getElementById("optionD_Text").innerHTML = "D." + space + pro_optionD[doneQuestionCount-1];
                    optionAvailable = true;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = false;
                    setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn_Unavailable.png");
                    document.getElementById("questionNum").innerHTML = doneQuestionCount+"/40";
                }
                break;
            }
            default:
                console.log("Test Type NOT Found!");
                break;
        }
    }
    else
    {
        //console.log("Done: "+doneQuestionCount);
        switch(testType)  
        {
            case "basic":
            {
                document.getElementById("questionText").innerHTML = basic_question[currentQuestionCount-1];  
                document.getElementById("optionA_Text").innerHTML = "A." + space + basic_optionA[currentQuestionCount-1];
                document.getElementById("optionB_Text").innerHTML = "B." + space + basic_optionB[currentQuestionCount-1];  
                document.getElementById("optionC_Text").innerHTML = "C." + space + basic_optionC[currentQuestionCount-1];  
                document.getElementById("optionD_Text").innerHTML = "D." + space + basic_optionD[currentQuestionCount-1];
                document.getElementById("questionNum").innerHTML = currentQuestionCount+"/20";
                resetOptionBackground();
                if(questionIsDone[currentQuestionCount-1])
                {
                    optionAvailable = false;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = true;
                    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn.png");
                    judgeDoneQuestion(localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_selected"), localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_correct"));
                }
                else
                {
                    optionAvailable = true;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = false;
                    setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn_Unavailable.png");
                }
                break;
            }
            case "pro":
            {
                document.getElementById("questionText").innerHTML = pro_question[currentQuestionCount-1];  
                document.getElementById("optionA_Text").innerHTML = "A." + space + pro_optionA[currentQuestionCount-1];
                document.getElementById("optionB_Text").innerHTML = "B." + space + pro_optionB[currentQuestionCount-1];  
                document.getElementById("optionC_Text").innerHTML = "C." + space + pro_optionC[currentQuestionCount-1];  
                document.getElementById("optionD_Text").innerHTML = "D." + space + pro_optionD[currentQuestionCount-1];
                document.getElementById("questionNum").innerHTML = currentQuestionCount+"/40";
                resetOptionBackground();
                if(questionIsDone[currentQuestionCount-1])
                {
                    optionAvailable = false;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = true;
                    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn.png");
                    judgeDoneQuestion(localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_selected"), localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_correct"));
                }
                else
                {
                    optionAvailable = true;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = false;
                    setElementStyle("next", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, nextX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn_Unavailable.png");
                }
                break;
            }
            default:
                console.log("Test Type NOT Found!");
                break;
        }
    }
}
function preQuestion()
{
    currentQuestionCount--;
    console.log("Current: "+currentQuestionCount);
    console.log("Done: "+doneQuestionCount);
    if(currentQuestionCount==1)
    {
        preAvailable = false;
        setBtnEvent("pre", preAvailable);
        setElementStyle("pre", arrowWidth-arrowEnlarge, arrowHeight-arrowEnlarge, preX+(arrowEnlarge/2), arrowY+(arrowEnlarge/2), 1);
        setIcon("pre", "resources/images/TestPage_PreviousBtn_Unavailable.png");
    }
    optionAvailable = false;
    setOptionAvailable(optionAvailable);
    nextAvailable = true;
    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
    setBtnEvent("next", nextAvailable);
    setIcon("next", "resources/images/TestPage_NextBtn.png");
    if(testType=="basic")
        document.getElementById("questionNum").innerHTML = currentQuestionCount+"/20";
    else
        document.getElementById("questionNum").innerHTML = currentQuestionCount+"/40";
    document.getElementById("questionText").innerHTML = localStorage.getItem("grotion_droneTest_question"+currentQuestionCount);  
    document.getElementById("optionA_Text").innerHTML = "A." + space + localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_A");
    document.getElementById("optionB_Text").innerHTML = "B." + space + localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_B");
    document.getElementById("optionC_Text").innerHTML = "C." + space + localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_C");
    document.getElementById("optionD_Text").innerHTML = "D." + space + localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_D");
    resetOptionBackground();
    judgeDoneQuestion(localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_selected"), localStorage.getItem("grotion_droneTest_question"+currentQuestionCount+"_correct"));
    
}
function resetUsedArr()
{
    var i;
    switch(testType)  
    {
        case "basic":
        {
            for(i=0;i<21;i++)
                basic_used[i] = -1;
            break;
        }
        case "pro":
        {
            for(i=0;i<41;i++)
                pro_used[i] = -1;
            break;
        }
        default:
            console.log("Test Type NOT Found!");
            break;
    }
}
function ifUsed(target)
{
    var found = false;
    switch(testType)  
    {
        case "basic":
        {
            for(i=0;i<21;i++)
                if(basic_used[i]==target)
                {
                    found=true;
                    break;
                }
            break;
        }
        case "pro":
        {
            for(i=0;i<41;i++)
                if(pro_used[i]==target)
                {
                    found=true;
                    break;
                }
            break;
        }
        default:
            console.log("Test Type NOT Found!");
            break;
    }
    return found;
}
function getExamData(jsonUrl)
{
    $.getJSON(jsonUrl, function(data)
    {
        switch(testType)  
        {
            case "basic":
            {
                var i, count, n;
                if(isDone)
                {
                    doneQuestionCount = 20;
                    for(i=1;i<21;i++)
                    {
                        basic_question.push(localStorage.getItem("grotion_droneTest_question"+i));
                        basic_optionA.push(localStorage.getItem("grotion_droneTest_question"+i+"_A"));
                        basic_optionB.push(localStorage.getItem("grotion_droneTest_question"+i+"_B"));
                        basic_optionC.push(localStorage.getItem("grotion_droneTest_question"+i+"_C"));
                        basic_optionD.push(localStorage.getItem("grotion_droneTest_question"+i+"_D"));
                        basic_correct.push(localStorage.getItem("grotion_droneTest_question"+i+"_correct"));
                        questionIsDone.push(true);
                    }
                    optionAvailable = false;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = true;
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn.png");
                    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
                    judgeDoneQuestion(localStorage.getItem("grotion_droneTest_question1_selected"), localStorage.getItem("grotion_droneTest_question1_correct"));
                }
                else
                {
                    //inital array
                    for(i=1;i<21;i++)
                    {
                        basic_question.push("Question"+(i+1));
                        basic_optionA.push("N/A");
                        basic_optionB.push("N/A");
                        basic_optionC.push("N/A");
                        basic_optionD.push("N/A");
                        basic_correct.push("N/A");
                        basic_used.push(-1);
                        questionIsDone.push(false);
                    }
                    count = 0;
                    while(count<10)
                    {
                        n = Math.floor((Math.random() * data.exam.basic.regulations.length));
                        if(!ifUsed(n))
                        {
                            basic_question[count] = data.exam.basic.regulations[n].question;
                            basic_optionA[count] = data.exam.basic.regulations[n].optionA;
                            basic_optionB[count] = data.exam.basic.regulations[n].optionB;
                            basic_optionC[count] = data.exam.basic.regulations[n].optionC;
                            basic_optionD[count] = data.exam.basic.regulations[n].optionD;
                            basic_correct[count] = data.exam.basic.regulations[n].correctAnswer;
                            basic_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<15)
                    {
                        n = Math.floor((Math.random() * data.exam.basic.flightTheory.length));
                        if(!ifUsed(n))
                        {
                            basic_question[count] = data.exam.basic.flightTheory[n].question;
                            basic_optionA[count] = data.exam.basic.flightTheory[n].optionA;
                            basic_optionB[count] = data.exam.basic.flightTheory[n].optionB;
                            basic_optionC[count] = data.exam.basic.flightTheory[n].optionC;
                            basic_optionD[count] = data.exam.basic.flightTheory[n].optionD;
                            basic_correct[count] = data.exam.basic.flightTheory[n].correctAnswer;
                            basic_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<18)
                    {
                        n = Math.floor((Math.random() * data.exam.basic.weather.length));
                        if(!ifUsed(n))
                        {
                            basic_question[count] = data.exam.basic.weather[n].question;
                            basic_optionA[count] = data.exam.basic.weather[n].optionA;
                            basic_optionB[count] = data.exam.basic.weather[n].optionB;
                            basic_optionC[count] = data.exam.basic.weather[n].optionC;
                            basic_optionD[count] = data.exam.basic.weather[n].optionD;
                            basic_correct[count] = data.exam.basic.weather[n].correctAnswer;
                            basic_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<20)
                    {
                        n = Math.floor((Math.random() * data.exam.basic.emergencies.length));
                        if(!ifUsed(n))
                        {
                            basic_question[count] = data.exam.basic.emergencies[n].question;
                            basic_optionA[count] = data.exam.basic.emergencies[n].optionA;
                            basic_optionB[count] = data.exam.basic.emergencies[n].optionB;
                            basic_optionC[count] = data.exam.basic.emergencies[n].optionC;
                            basic_optionD[count] = data.exam.basic.emergencies[n].optionD;
                            basic_correct[count] = data.exam.basic.emergencies[n].correctAnswer;
                            basic_used[count] = n;
                            count++;
                        }
                    }
                }
                //initial UI
                document.getElementById("questionNum").innerHTML = "1/20";
                document.getElementById("questionText").innerHTML = basic_question[0];
                document.getElementById("optionA_Text").innerHTML = "A." + space + basic_optionA[0];
                document.getElementById("optionB_Text").innerHTML = "B." + space + basic_optionB[0];  
                document.getElementById("optionC_Text").innerHTML = "C." + space + basic_optionC[0];  
                document.getElementById("optionD_Text").innerHTML = "D." + space + basic_optionD[0];
                break;
            }
            case "pro":
            {
                var i, count, n;
                if(isDone)
                {
                    doneQuestionCount = 40;
                    for(i=1;i<41;i++)
                    {
                        pro_question.push(localStorage.getItem("grotion_droneTest_question"+i));
                        pro_optionA.push(localStorage.getItem("grotion_droneTest_question"+i+"_A"));
                        pro_optionB.push(localStorage.getItem("grotion_droneTest_question"+i+"_B"));
                        pro_optionC.push(localStorage.getItem("grotion_droneTest_question"+i+"_C"));
                        pro_optionD.push(localStorage.getItem("grotion_droneTest_question"+i+"_D"));
                        pro_correct.push(localStorage.getItem("grotion_droneTest_question"+i+"_correct"));
                        questionIsDone.push(true);
                    }
                    optionAvailable = false;
                    setOptionAvailable(optionAvailable);
                    nextAvailable = true;
                    setBtnEvent("next", nextAvailable);
                    setIcon("next", "resources/images/TestPage_NextBtn.png");
                    setElementStyle("next", arrowWidth, arrowHeight, nextX, arrowY, 1);
                    judgeDoneQuestion(localStorage.getItem("grotion_droneTest_question1_selected"), localStorage.getItem("grotion_droneTest_question1_correct"));
                }
                else
                {
                    //inital array
                    for(i=0;i<41;i++)
                    {
                        pro_question.push("Question"+(i+1));
                        pro_optionA.push("N/A");
                        pro_optionB.push("N/A");
                        pro_optionC.push("N/A");
                        pro_optionD.push("N/A");
                        pro_correct.push("N/A");
                        pro_used.push(-1);
                        questionIsDone.push(false);
                    }
                    count = 0;
                    while(count<14)
                    {
                        n = Math.floor((Math.random() * data.exam.pro.regulations.length));
                        if(!ifUsed(n))
                        {
                            pro_question[count] = data.exam.pro.regulations[n].question;
                            pro_optionA[count] = data.exam.pro.regulations[n].optionA;
                            pro_optionB[count] = data.exam.pro.regulations[n].optionB;
                            pro_optionC[count] = data.exam.pro.regulations[n].optionC;
                            pro_optionD[count] = data.exam.pro.regulations[n].optionD;
                            pro_correct[count] = data.exam.pro.regulations[n].correctAnswer;
                            pro_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<28)
                    {
                        n = Math.floor((Math.random() * data.exam.pro.flightTheory.length));
                        if(!ifUsed(n))
                        {
                            pro_question[count] = data.exam.pro.flightTheory[n].question;
                            pro_optionA[count] = data.exam.pro.flightTheory[n].optionA;
                            pro_optionB[count] = data.exam.pro.flightTheory[n].optionB;
                            pro_optionC[count] = data.exam.pro.flightTheory[n].optionC;
                            pro_optionD[count] = data.exam.pro.flightTheory[n].optionD;
                            pro_correct[count] = data.exam.pro.flightTheory[n].correctAnswer;
                            pro_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<34)
                    {
                        n = Math.floor((Math.random() * data.exam.pro.weather.length));
                        if(!ifUsed(n))
                        {
                            pro_question[count] = data.exam.pro.weather[n].question;
                            pro_optionA[count] = data.exam.pro.weather[n].optionA;
                            pro_optionB[count] = data.exam.pro.weather[n].optionB;
                            pro_optionC[count] = data.exam.pro.weather[n].optionC;
                            pro_optionD[count] = data.exam.pro.weather[n].optionD;
                            pro_correct[count] = data.exam.pro.weather[n].correctAnswer;
                            pro_used[count] = n;
                            count++;
                        }
                    }
                    resetUsedArr();
                    while(count<40)
                    {
                        n = Math.floor((Math.random() * data.exam.pro.emergencies.length));
                        if(!ifUsed(n))
                        {
                            pro_question[count] = data.exam.pro.emergencies[n].question;
                            pro_optionA[count] = data.exam.pro.emergencies[n].optionA;
                            pro_optionB[count] = data.exam.pro.emergencies[n].optionB;
                            pro_optionC[count] = data.exam.pro.emergencies[n].optionC;
                            pro_optionD[count] = data.exam.pro.emergencies[n].optionD;
                            pro_correct[count] = data.exam.pro.emergencies[n].correctAnswer;
                            pro_used[count] = n;
                            count++;
                        }
                    }
                }
                //initial UI
                document.getElementById("questionNum").innerHTML = "1/40";
                document.getElementById("questionText").innerHTML = pro_question[0];  
                document.getElementById("optionA_Text").innerHTML = "A." + space + pro_optionA[0];
                document.getElementById("optionB_Text").innerHTML = "B." + space + pro_optionB[0];  
                document.getElementById("optionC_Text").innerHTML = "C." + space + pro_optionC[0];  
                document.getElementById("optionD_Text").innerHTML = "D." + space + pro_optionD[0];
                break;
            }
            default:
                console.log("Test Type NOT Found!");
                break;
        }
    });
}
function start()
{
    setVariables();
    setElements();
    getExamData(jsonUrl);
}
window.addEventListener("load",start,false);
//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var pickArr = shuffle(["a", "b", "c", "d", "e"]);
    var ans;
    var quest;
    switch(questionNum)
    {
        case 0:
            quest = "Angle "+pickArr[0]+" has two supplements. What are they?";
	    ans = [[pickArr[1], pickArr[4]], [pickArr[4], pickArr[1]]];
	    equationNum = 0;
	    break;
        case 1:
            quest = "Angle "+pickArr[3]+" has one complement. What is it?";
	    ans = [[pickArr[4]]];
	    equationNum = 1;
            break;
        case 2:
	    var vars = getRandom(91, 150, 1);
	    quest = "The measure of angle "+pickArr[0]+" is "+vars[0]+" degrees. What is the measure of its supplement?";
	    ans = [[180-vars[0]]];
	    equationNum = 2;
            break;
        case 3:
	    var vars = getRandom(1, 69, 1);
	    quest = "The measure of angle "+pickArr[0]+" is "+vars[0]+" degrees. What is the measure of its complement?";
	    ans = [[90-vars[0]]];
	    equationNum = 2;
            break;
    }
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest+"<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    addText([-0.5,0.5], pickArr[0]);
    addText([0.5,0.5], pickArr[1]);
    addText([0.5,-0.5], pickArr[2]);
    addText([-0.2,-1], pickArr[3]);
    addText([-0.5,-0.3], pickArr[4]);
    plotData([-5,5], [0.1,0]);
    plotData([-2.9,3.1], [-5,5]);
    plotData([0.1,0.1], [0,-5]);

    equations = [["", "<input type='text' class='mathinput' id='i0' /> and <input type='text' class='mathinput' id='i1' />", ans],
	        ["", "<input type='text' class='mathinput' id='i0' />", ans],
		["", "<input type='number' class='mathinput' id='i0' />", ans]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];

    addInputEventListeners();

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function giveHint()
{
    if(currentStep==1)
    {
        swal("Use the first equation if you are given two points and cannot see the graph of the line. Use the second equation if you are given the graph of the line. Use the third equation if you are confident in your ability to apply the Pythagorean Theorem in your head.");
    } else
    {
        var numCorrect = new Array();
        var studentSolution, input, sol;

        for(var i=0; i<equations[equationNum][2].length; i++)
        {
            numCorrect[i] = testSolution(i);
        }
        studentSolution = indexOfMax(numCorrect);

        sol = equations[equationNum][2][studentSolution];
        for(var i=0; i<sol.length; i++)
        {
            input = document.getElementById("i"+i);
            if(input.value != sol[i])
            {
                input.value = sol[i];
                break;
            }
        }
        checkChanged(input);
    }
}

var numQuestions = 3;

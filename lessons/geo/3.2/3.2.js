//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pickArr;
    var vars = getRandom(-4, 4, 8, [0]);
    var ans;
    vars = getRandom(91, 150, 1);
    var ang;
    switch(questionNum)
    {
        case 0:
	    ang = "a";
	    ans = 180-vars[0];
	    break;
        case 1:
	    ang = "b";
	    ans = vars[0];
            break;
        case 2:
	    ang = "c";
	    ans = 180-vars[0];
            break;
    }
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the measure of angle "+ang+"?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    addText([-1,0.5], vars[0]);
    addText([0.5,2.5], "a");
    addText([2,2.5], "b");
    addText([-0.5,1.5], "c");
    addText([1,1.5], "d");
    addText([-2, -1.5], "e");
    addText([-1,-1.5], "f");
    addText([-3,-2.5], "g");
    addText([-1.5,-2.5], "h");
    plotData([-5,5], [2,2]);
    plotData([-5,5], [-2,-2]);
    plotData([-4,3], [-5,5]);
    equationNum = 0;

    equations = [["", "<input type='number' class='mathinput' id='i0' />", [[ans]]]];
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

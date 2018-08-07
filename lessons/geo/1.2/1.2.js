//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var pickArr;
    var vars = getRandom(-3, 4, 3);
    var ifCon = Math.round(Math.random());
    var ans;
    switch(questionNum)
    {
        case 0:
        case 2:
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Are the below lines congruent?<br />Please enter yes or no.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
	    plotData([-4,vars[0]], [vars[1],vars[1]]);
	    plotData([vars[1]+0.1,vars[1]+0.1], [-4,vars[0]-ifCon]);
	    equationNum = 0
            break;
        case 1:
        case 3:
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Plot A(-4,"+vars[1]+"), B("+vars[0]+","+vars[1]+"), C("+vars[1]+",-4), and D("+vars[1]+","+(vars[0]-ifCon)+") in a coordinate plane. Then determine whether AB and CD are congruent.";
	    equationNum = 0;
            break;
    }
    ans = (ifCon==0)?"yes":"no";

    equations = [["", "<input type='text' class='mathinput' id='i0' />", [[ans]]]];
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

var numQuestions = 4;

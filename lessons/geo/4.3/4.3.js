//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pos = [[-1,-1],[1,-1],[0,1]];
    var ang = new Array();

    var off = getRandom(-1,1,1);
    var ans = (off[0]==0)?"yes":"no";

    if(pos[0][2]==0 && pos[1][2]==0)
    {
	    ang[0] = getRandom(10, 80, 1);
	    ang[1] = parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[0][2]==1 && pos[1][2]==1)
    {
	    ang[0] = getRandom(100, 170, 1);
	    ang[1] = parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[0][2]==0 && pos[1][2]==1)
    {
	    ang[0] = getRandom(10, 80, 1);
	    ang[1] = 180-parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[0][2]==1 && pos[1][2]==0)
    {
	    ang[0] = getRandom(100, 170, 1);
	    ang[1] = 180-parseInt(ang[0])+parseInt(off[0]);
    }

    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Are the two diagonal lines parallel? Please enter <b>yes</b> or <b>no</b>.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    plotData([pos[0][0], pos[1][0]], [pos[0][1], pos[1][1]]);
    plotData([pos[1][0], pos[2][0]], [pos[1][1], pos[2][1]]);
    plotData([pos[2][0], pos[0][0]], [pos[2][1], pos[0][1]]);
    equationNum = 0;

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

var numQuestions = 6;

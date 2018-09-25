//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pos = [[-1,-1],[0,-0.5],[1,-1],[0,1]];

    case(questionNum)
    {
	    switch 0:
		    var transPos = getRandom(-3,3,2);
		    newPos = translate(pos, transPos[0], transPos[1]);
		    break;
	    switch 1:
		    newPos = reflectX(pos);
		    break;
	    switch 2:
		    newPos = reflectY(pos);
		    break;
	    switch 3:
		    var chooseAngles = [45, 90, 135, 180];
		    var choose = getRandom(0,3,1);
		    newPos = rotate(pos, (chooseAngles[choose[0]]*Math.PI/180));
		    break;
	    switch 4:
		    var chooseEnlarge = [2, 3, 4];
		    var choose = getRandom(0,3,1);
		    newPos = enlarge(pos, chooseEnlarge[choose[0]]);
		    break;
    }

    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": THIS LESSON IS NOT YET COMPLETE!! Are the two diagonal lines parallel? Please enter <b>yes</b> or <b>no</b>.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    plotData([pos[0][0], pos[1][0]], [pos[0][1], pos[1][1]]);
    plotData([pos[1][0], pos[2][0]], [pos[1][1], pos[2][1]]);
    plotData([pos[2][0], pos[3][0]], [pos[2][1], pos[3][1]]);
    plotData([pos[3][0], pos[0][0]], [pos[3][1], pos[0][1]]);
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

function translate(pos, x, y)
{
	return [[pos[0][0]+x, pos[0][1]+y], [pos[1][0]+x, pos[1][1]+y], [pos[2][0]+x, pos[2][1]+y], [pos[3][0]+x, pos[3][1]+y]];
}

function reflectX(pos)
{
	return [[pos[0][0], -pos[0][1]], [pos[1][0], -pos[1][1]], [pos[2][0], -pos[2][1]], [pos[3][0], -pos[3][1]]];
}

function reflectY(pos)
{
	return [[-pos[0][0], pos[0][1]], [-pos[1][0], pos[1][1]], [-pos[2][0], pos[2][1]], [-pos[3][0], pos[3][1]]];
}

function rotate(pos, angle)
{
	return [[(pos[0][0]*cos(angle))+(pos[0][1]*sin(angle)), (-pos[0][0]*sin(angle))+(pos[1][1]*cos(angle))], [(pos[1][0]*cos(angle))+(pos[1][1]*sin(angle)), (-pos[1][0]*sin(angle))+(pos[1][1]*cos(angle))],[(pos[2][0]*cos(angle))+(pos[2][1]*sin(angle)), (-pos[2][0]*sin(angle))+(pos[2][1]*cos(angle))],[(pos[3][0]*cos(angle))+(pos[3][1]*sin(angle)), (-pos[3][0]*sin(angle))+(pos[3][1]*cos(angle))]];
}

function enlarge(pos, factor)
{
	return [[factor*pos[0][0], factor*pos[0][1]], [factor*pos[1][0], factor*pos[1][1]], [factor*pos[2][0], factor*pos[2][1]], [factor*pos[3][0], factor*pos[3][1]]];
}

var numQuestions = 5;

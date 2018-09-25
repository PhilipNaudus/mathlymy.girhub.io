var steps = ["Step 1: What type of transformation has been performed on the graph on the left to produce the graph on the right?", "Step 2: What is the degree of the transformation?"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];
var ans;

function setQuestion()
{
    var pos = [[-1,-1],[0,-0.5],[1,-1],[0.2,0],[0,1]];

    switch(questionNum)
    {
	    case 0:
		    var transPos = getRandom(-3,3,2);
		    newPos = translate(pos, transPos[0], transPos[1]);
		    ans = ["Translation", transPos[0], transPos[1]];
		    break;
	    case 1:
		    newPos = reflectX(pos);
		    ans = ["Reflection", 'x'];
		    break;
	    case 2:
		    newPos = reflectY(pos);
		    ans = ["Reflection", 'y'];
		    break;
	    case 3:
		    var chooseAngles = [45, 90, 135, 180];
		    var choose = getRandom(0,3,1);
		    newPos = rotate(pos, (chooseAngles[choose[0]]*Math.PI/180));
		    ans = ["Rotation", chooseAngles[choose[0]]];
		    break;
	    case 4:
		    var chooseEnlarge = [2, 3, 4];
		    var choose = getRandom(0,3,1);
		    newPos = enlarge(pos, chooseEnlarge[choose[0]]);
		    ans = ["Enlargement", chooseEnlarge[choose[0]]];
		    break;
    }

    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": THIS LESSON IS NOT YET COMPLETE!! Are the two diagonal lines parallel? Please enter <b>yes</b> or <b>no</b>.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    plotData([newPos[0][0], newPos[1][0]], [newPos[0][1], newPos[1][1]]);
    plotData([newPos[1][0], newPos[2][0]], [newPos[1][1], newPos[2][1]]);
    plotData([newPos[2][0], newPos[3][0]], [newPos[2][1], newPos[3][1]]);
    plotData([newPos[3][0], newPos[4][0]], [newPos[3][1], newPos[4][1]]);
    plotData([newPos[4][0], newPos[0][0]], [newPos[4][1], newPos[0][1]]);
    equationNum = 0;

    options = "<option value=''>Select</option><option value='Translation'>Translation</option><option value='Reflection'>Reflection</option><option value='Rotation'>Rotation</option><option value='Enlargement'>Enlargement</option>";
    equations = [["", "<select class='mathinput' onchange='changeSelect()' id='i0'>"+options+"</select> <span id='exp1'></span> <input type='text' id='i1'> <span id='exp2'></span> <input type='text' id='i2'> <span id='exp2'></span>", [[ans]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];
    document.getElementById("i1").style.display = "none";
    document.getElementById("i2").style.display = "none";

    addInputEventListeners();

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function changeSelect()
{
	switch(document.getElementById("i0").value)
	{
		case "Translation":
			document.getElementById("exp1").innerHTML = "";
			document.getElementById("exp2").innerHTML = "units in the X direction";
			document.getElementById("exp3").innerHTML = "units in the Y direction";
			document.getElementById("i2").style.display = "inline";
			break;
		case "Reflection":
			document.getElementById("exp1").innerHTML = "about the";
			document.getElementById("exp2").innerHTML = "axis";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i2").style.display = "none";
			break;
		case "Rotation":
			document.getElementById("exp1").innerHTML = "of";
			document.getElementById("exp2").innerHTML = "degrees";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i2").style.display = "none";
			break;
		case "Enlargement":
			document.getElementById("exp1").innerHTML = "by a factor of";
			document.getElementById("exp2").innerHTML = "";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i2").style.display = "none";
			break;
	}
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
	return [[pos[0][0]+x, pos[0][1]+y], [pos[1][0]+x, pos[1][1]+y], [pos[2][0]+x, pos[2][1]+y], [pos[3][0]+x, pos[3][1]+y], [pos[4][0]+x, pos[4][1]+y]];
}

function reflectX(pos)
{
	return [[pos[0][0], -pos[0][1]], [pos[1][0], -pos[1][1]], [pos[2][0], -pos[2][1]], [pos[3][0], -pos[3][1]], [pos[4][0], -pos[4][1]]];
}

function reflectY(pos)
{
	return [[-pos[0][0], pos[0][1]], [-pos[1][0], pos[1][1]], [-pos[2][0], pos[2][1]], [-pos[3][0], pos[3][1]], [-pos[4][0], pos[4][1]]];
}

function rotate(pos, angle)
{
	return [[(pos[0][0]*Math.cos(angle))+(pos[0][1]*Math.sin(angle)), (-pos[0][0]*Math.sin(angle))+(pos[1][1]*Math.cos(angle))], [(pos[1][0]*Math.cos(angle))+(pos[1][1]*Math.sin(angle)), (-pos[1][0]*Math.sin(angle))+(pos[1][1]*Math.cos(angle))],[(pos[2][0]*Math.cos(angle))+(pos[2][1]*Math.sin(angle)), (-pos[2][0]*Math.sin(angle))+(pos[2][1]*Math.cos(angle))],[(pos[3][0]*Math.cos(angle))+(pos[3][1]*Math.sin(angle)), (-pos[3][0]*Math.sin(angle))+(pos[3][1]*Math.cos(angle))],[(pos[4][0]*Math.cos(angle))+(pos[4][1]*Math.sin(angle)), (-pos[4][0]*Math.sin(angle))+(pos[4][1]*Math.cos(angle))]];
}

function enlarge(pos, factor)
{
	return [[factor*pos[0][0], factor*pos[0][1]], [factor*pos[1][0], factor*pos[1][1]], [factor*pos[2][0], factor*pos[2][1]], [factor*pos[3][0], factor*pos[3][1]], [factor*pos[4][0], factor*pos[4][1]]];
}

var numQuestions = 5;

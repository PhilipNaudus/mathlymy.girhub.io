//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pos = [[-2,0.5], [-0.5,0.5], [2,0.5], [3.5,0.5], [-2.5, -0.5], [-1,-0.5], [1.3,-0.5], [3,-0.5]];
    var selectPos = shuffle([[0, 2, "corresponding angles"], [5, 7, "corresponding angles"], [1, 6, "alternate interior angles"], [2, 5, "alternate interior angles"], [0, 7, "alternate exterior angles"], [3, 4, "alternate exterior angles"], [1, 2, "consecutive interior angles"], [5, 6, "consecutive interior angles"]]);
    var ang = new Array();

    /*if(pos[0][2]==0 && pos[1][2]==0)
    {
	    ang[0] = "a";
	    ang[1] = "b";
    } else if(pos[0][2]==1 && pos[1][2]==1)
    {
	    ang[0] = "a";
	    ang[1] = "b";
    } else if(pos[0][2]==0 && pos[1][2]==1)
    {
	    ang[0] = "a";
	    ang[1] = "b";
    } else if(pos[0][2]==1 && pos[1][2]==0)
    {
	    ang[0] = "a";
	    ang[1] = "b";
    }*/

    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Angles a and b are what type of angles?.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    addText([pos[selectPos[0][0]][0], pos[selectPos[0][0]][1]], "a");
    addText([pos[selectPos[0][1]][0], pos[selectPos[0][1]][1]], "b");
    plotData([-5,5], [0,0]);
    plotData([-1,6], [-5,5]);
    plotData([-5,2], [-5,5]);
    equationNum = 0;

    options = "<option value=''>Select</option><option value='corresponding angles'>corresponding angles</option><option value='alternate interior angles'>alternate interior angles</option><option value='alternate exterior angles'>alternate exterior angles</option><option value='consecutive interior angles'>consecutive interior angles</option>";
    equations = [["", "<select class='mathinput' id='i0'>"+options+"</select>", [[selectPos[0][2]]]]];
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

var numQuestions = 8;

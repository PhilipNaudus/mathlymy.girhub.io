//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pos = [[-2,0.5,1], [-0.5,0.5,0], [2,0.5,1], [3.5,0.5,0], [-2.5, -0.5,0], [-1,-0.5,1], [1.3,-0.5,0], [3,-0.5,1]];
    //var pos = [[-2,0.5,1], [-0.5,0.5,0], [2,0.5], [3.5,0.5], [-2.5, -0.5], [-1,-0.5], [1.3,-0.5], [3,-0.5]];
    var selectPos = shuffle([[0, 2, "Corresponding angles converse"], [5, 7, "Corresponding angles converse"], [1, 6, "Alternate interior angles converse"], [2, 5, "Alternate interior converse"], [0, 7, "Alternate exterior angles converse"], [3, 4, "Alternate exterior angles converse"], [1, 2, "Consecutive interior angles converse"], [5, 6, "Consecutive interior angles converse"]]);
    var ang = new Array();

    var off = getRandom(-1,1,1);
    var ans = (off[0]==0)?"Yes. "+selectPos[0][2]:"No";

    if(pos[selectPos[0][0]][2]==0 && pos[selectPos[0][1]][2]==0)
    {
	    ang[0] = getRandom(10, 80, 1);
	    ang[1] = parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[selectPos[0][0]][2]==1 && pos[selectPos[0][1]][2]==1)
    {
	    ang[0] = getRandom(100, 170, 1);
	    ang[1] = parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[selectPos[0][0]][2]==0 && pos[selectPos[0][1]][2]==1)
    {
	    ang[0] = getRandom(10, 80, 1);
	    ang[1] = 180-parseInt(ang[0])+parseInt(off[0]);
    } else if(pos[selectPos[0][0]][2]==1 && pos[selectPos[0][1]][2]==0)
    {
	    ang[0] = getRandom(100, 170, 1);
	    ang[1] = 180-parseInt(ang[0])+parseInt(off[0]);
    }

    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Are the two diagonal lines parallel? If you select 'yes,' also select the <b>reason</b> why they are parallel.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    addText([pos[0][0], pos[0][1]], ang[0]);
    addText([pos[1][0], pos[1][1]], ang[1]);
    plotData([-5,5], [0,0]);
    plotData([-1,6], [-5,5]);
    plotData([-5,2], [-5,5]);
    equationNum = 0;

    options = "<option value=''>Select</option><option value='No'>No</option><option value='Yes. Corresponding angles converse'>Yes. Corresponding angles converse</option><option value='Yes. Alternate interior angles converse'>Yes. Alternate interior angles converse</option><option value='Yes. Alternate exterior angles converse'>Yes. Alternate exterior angles converse</option><option value='Yes. Consecutive interior angles converse'>Yes. Consecutive interior angles converse</option>";
    equations = [["", "<select class='mathinput' id='i0'>"+options+"</select>", [[ans]]]];
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

//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
    var pickArr;
    var vars = getRandom(2, 9, 2);
    var ans;
    var ang;
    var pos = shuffle([[0,2.5,1], [2,2.5,0], [-0.5,1.5,0], [1,1.5,1], [-3, -1.5,1], [-1,-1.5,0], [-3.5,-2.5,0], [-1.5,-2.5,1]]);

    if(pos[0][2]==0 && pos[1][2]==0)
    {
	    do
	    {
		    ans = getRandom(5, 45, 1);
		    ang = (ans*vars[0])+vars[1];
	    } while(ang >= 90);
    } else if(pos[0][2]==1 && pos[1][2]==1)
    {
	    do
	    {
		    ans = getRandom(5, 90, 1);
		    ang = (ans*vars[0])+vars[1];
	    } while(ang <= 90 || ang >= 180);
    } else if(pos[0][2]==0 && pos[1][2]==1)
    {
	    do
	    {
		    ans = getRandom(5, 90, 1);
		    ang = 180-((ans*vars[0])+vars[1]);
	    } while(ang <= 90 || ang >= 180 || ang <= 0);
    } else if(pos[0][2]==1 && pos[1][2]==0)
    {
	    do
	    {
		    ans = getRandom(5, 90, 1);
		    ang = 180-((ans*vars[0])+vars[1]);
	    } while(ang >= 90 || ang <= 0);
    }
    /*switch(questionNum)
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
    }*/
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the value of x?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
    addText([pos[0][0], pos[0][1]], vars[0]+"x+"+vars[1]);
    addText([pos[1][0], pos[1][1]], ang);
    /*addText([pos[2][0], pos[2][1]], "x+"+vars[1]);
    addText([pos[3][0], pos[3][1]], "x+"+vars[1]);
    addText([pos[4][0], pos[4][1]], "x+"+vars[1]);
    addText([pos[5][0], pos[5][1]], "x+"+vars[1]);
    addText([pos[6][0], pos[6][1]], "x+"+vars[1]);
    addText([pos[7][0], pos[7][1]], "x+"+vars[1]);
    /*addText([-1,0.5], vars[0]);
    addText(, "a");
    addText(, "b");
    addText(, "c");
    addText(, "d");
    addText(, "e");
    addText(, "f");
    addText(, "g");
    addText(, "h");*/
    plotData([-5,5], [0,0]);
    plotData([-1,5], [-5,8]);
    plotData([-5,2], [-5,5]);
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

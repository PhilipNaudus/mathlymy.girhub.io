//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var pickArr;
    var vars = getRandom(-4, 4, 8, 0);
    var ans;
    switch(questionNum)
    {
        case 0:
        case 2:
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the measure of angle a?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
	    plotData([0,0], [-5,5]);
	    plotData([-4,-3], [-5,5]);
	    ans = Math.abs(pickArr[0][1] - pickArr[1][1]);
	    equationNum = 0
            break;
        case 1:
        case 3:
	    pickArr = shuffle([["A",0], ["B",0], ["C",0], ["D",0], ["E",1], ["F",1], ["G",1], ["H",1]]);

            vars = getRandom(-4, 4, 8);
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Are the points "+pickArr[0][0]+", "+pickArr[1][0]+", and "+pickArr[2][0]+" collinear?<br />Please enter yes or no.<canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
            addText([vars[0],0], "A");
            addText([vars[1],0], "B");
            addText([vars[2],0], "C");
            addText([vars[3],0], "D");
            addText([0,vars[0]], "E");
            addText([0,vars[1]], "F");
            addText([0,vars[2]], "G");
            addText([0,vars[3]], "H");
	    if(pickArr[0][1] == pickArr[1][1] && pickArr[1][1] == pickArr[2][1]) ans = "yes";
	    else ans = "no";
	    equationNum = 1;
            break;
    }

    equations = [["", "<input type='number' class='mathinput' id='i0' />", [[ans]]],
	        ["", "<input type='text' class='mathinput' id='i0' />", [[ans]]]];
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

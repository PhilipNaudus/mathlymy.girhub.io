//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    switch(questionNum)
    {
        case 0:
        case 1:
            var vars = getRandom(1, 3, 3);
            var n = getRandom(2, 4, 1, [3]);
            quest = "Please solve for x:<br /><sup>"+n[0]+"</sup><div class='sqrt'><span class='overline'>"+(Math.pow(vars[0],n[0]))+"x + "+(Math.pow(vars[0],n[0])*vars[1])+"</span></div> = "+(vars[0]*vars[2]);
	    eq = "x = <input type='number' class='mathinput' id='i0' />";
	    ans = [(Math.pow(vars[2],n[0]) - vars[1])];
            break;
    }

    equationNum = 0;
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;
    equations = [["", eq, [ans]]];
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

function signNumber(theNumber)
{
    if(theNumber >= 0){
        return " + " + theNumber;
    }else{
        return " - " + Math.abs(theNumber);
    }
}

var numQuestions = 6;

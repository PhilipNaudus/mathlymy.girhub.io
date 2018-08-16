//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    var vars = getRandom(2, 10, 4)
    switch(questionNum)
    {
        case 0:
        case 1:
            quest = "Please xolve for x:<br />"+(vars[0]*vars[0])+"x<sup>2</sup> - " + (vars[1]*vars[1]) + " = 0";
	    eq = "x = <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i0' /></span><span class='fracbot'><input type='number' class='mathinput' id='i1' /></span></span>, "
		   +"- <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i2' /></span><span class='fracbot'><input type='number' class='mathinput' id='i3' /></span></span>";
	    ans = [vars[1], vars[0], vars[1], vars[0]];
            break;
        case 2:
        case 3:
            quest = "Please xolve for x by factoring:<br />"+(vars[0]*vars[2])+"x<sup>2</sup> + "+(vars[1]*vars[2])+"x + "+(vars[0]*vars[3])+"x + "+(vars[1]*vars[3])+" = 0";
	    eq = "x = - <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i0' /></span><span class='fracbot'><input type='number' class='mathinput' id='i1' /></span></span>, "
		   +"- <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i2' /></span><span class='fracbot'><input type='number' class='mathinput' id='i3' /></span></span>";
	    ans = [vars[1], vars[0], vars[3], vars[2]];
            break;
        case 4:
        case 5:
            quest = "Please xolve for x using the quadratic formula:<br />"+(vars[0]*vars[2])+"x<sup>2</sup> + "+((vars[1]*vars[2])+(vars[0]*vars[3]))+"x + "+(vars[1]*vars[3])+" = 0";
	    eq = "x = - <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i0' /></span><span class='fracbot'><input type='number' class='mathinput' id='i1' /></span></span>, "
		   +"- <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i2' /></span><span class='fracbot'><input type='number' class='mathinput' id='i3' /></span></span>";
	    ans = [vars[1], vars[0], vars[3], vars[2]];
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
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

var numQuestions = 6;

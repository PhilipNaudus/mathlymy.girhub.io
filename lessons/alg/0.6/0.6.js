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
        case 2:
        case 3:
        case 4:
	    var vars = getRandom(1, 9, 4)

		    
            var x6 = vars[0]*vars[6];
	    var x5 = (vars[0]*vars[7])+(vars[1]*vars[6]);
	    var x4 = (vars[1]*vars[7])+(vars[2]*vars[6]);
	    var x3 = (vars[2]*vars[7])+(vars[3]*vars[6]);
	    var x2 = (vars[3]*vars[7])+(vars[4]*vars[6]);
	    var x1 = (vars[4]*vars[7])+(vars[5]*vars[6]);
	    var x0 = vars[5]*vars[7];
		    
	    quest = "Please divide the polynomials using synthetic division:<br />("+(x6==0)?"":(x6+"x<sup>6</sup> + ")+(x5==0)?"":(x5+"x<sup>5</sup> + ")+(x4==0)?"":(x4+"x<sup>4</sup> + ")+(x3==0)?"":(x3+"x<sup>3</sup> + ")+(x2==0)?"":(x2+"x<sup>2</sup> + ")+(x1==0)?"":(x1+"x + ")+(x0==0)?"":(x0)+") &divide; ("+vars[6]+"x + "+vars[7]+")";
	    eq = "<input type='number' class='mathinput' id='i0' />x<sup>5</sup> + <input type='number' class='mathinput' id='i1' />x<sup>4</sup> + <input type='number' class='mathinput' id='i2' />x<sup>3</sup> + <input type='number' class='mathinput' id='i3' />x<sup>2</sup> + <input type='number' class='mathinput' id='i4' />x + <input type='number' class='mathinput' id='i5' />";
	    ans = [vars[0], vars[1], vars[2], vars[3], vars[4], vars[5]];
	    equationNum = 0;
            break;
    }

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

var numQuestions = 9;

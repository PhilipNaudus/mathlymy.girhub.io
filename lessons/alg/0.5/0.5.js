//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    var vars = getRandom(1, 9, 4)
    switch(questionNum)
    {
        case 0:
        case 1:
            quest = "Please factor the polynomial by removing the common term:<br />"+(vars[0]*vars[1])+"x<sup>2</sup> + "+(vars[0]*vars[2])+"x + "+(vars[0]*vars[3]);
	    eq = "<input type='number' class='mathinput' id='i0' /> (<input type='number' class='mathinput' id='i1' />x<sup>2</sup> + <input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)";
	    ans = [vars[0], vars[1], vars[2], vars[3]];
            break;
        case 2:
        case 3:
            quest = "Please factor the difference of two squares:<br />"+(vars[0]*vars[0])+"x<sup>2</sup> - " + (vars[1]*vars[1]);
	    eq = "(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />) (<input type='number' class='mathinput' id='i2' />x - <input type='number' class='mathinput' id='i3' />)";
	    ans = [vars[0], vars[1], vars[0], vars[1]];
            break;
        case 4:
        case 5:
    quest = "Please factor the perfect squares:<br />"+(vars[0]*vars[0])+"x<sup>2</sup> + "+(2*vars[0]*vars[1])+"x + "+(vars[1]*vars[1]);
	    eq = "(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />) (<input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)";
	    ans = [vars[0], vars[1], vars[0], vars[1]];
            break;
        case 5:
        case 6:
            var posNeg = (Math.round(Math.random())==0)?"-":"+";
            var negPos = (posNeg=="-")?"+":"-";

	    quest = "Please factor:<br />"+Math.pow(vars[0],3)+"x<sup>3</sup> "+posNeg+" "+Math.pow(vars[1],3);
	    eq = "(<input type='number' class='mathinput' id='i0' />x "+posNeg+" <input type='number' class='mathinput' id='i1' />) (<input type='number' class='mathinput' id='i2' />x<sup>2</sup> "+negPos+" <input type='number' class='mathinput' id='i3' />x + <input type='number' class='mathinput' id='i4' />)";
	    ans = [vars[0], vars[1], (vars[0]*vars[0]), (vars[0]*vars[1]), (vars[1]*vars[1])];
            break;
        case 7:
        case 8:
            quest = "Please factor by grouping:<br />("+(vars[0]*vars[2])+"x<sup>2</sup> + "+(vars[1]*vars[2])+"x + "+(vars[0]*vars[3])+"x + "+(vars[1]*vars[3]);
	    eq = "(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />) (<input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)";
	    ans = [vars[0], vars[1], vars[2], vars[3]];
            break;
        case 9:
        case 10:
            quest = "Please factor:<br />("+(vars[0]*vars[2])+"x<sup>2</sup> + "+((vars[1]*vars[2])+(vars[0]*vars[3]))+"x + "+(vars[1]*vars[3]);
	    eq = "(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />) (<input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)";
	    ans = [vars[0], vars[1], vars[2], vars[3]];
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

var numQuestions = 9;

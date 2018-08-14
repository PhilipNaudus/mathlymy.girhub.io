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
	    var vars = getRandom(1, 9, 2)
	    quest = "Please find the coefficient and degree of the monomial "+vars[0]+"x<sup>"+vars[1]+"</sup>"
	    eq = "Coefficient: <input type='number' class='mathinput' id='i0' /><br />Degree: <input type='number' class='mathinput' id='i0' />";
	    ans = [vars[0], vars[1]];
	    equationNum = 0;
            break;
        case 1:
        case 2:
	    var vars = getRandom(1, 9, 6)
	    quest = "Please find the degree of the polynomial "+vars[0]+"x<sup>"+vars[1]+"</sup> + "+vars[2]+"x<sup>"+vars[3]+"</sup> + "+vars[4]+"x<sup>"+vars[5]+"</sup>"
	    eq = "<input type='number' class='mathinput' id='i0' />";
	    ans = [Math.max(vars[1], vars[3], vars[5])];
	    equationNum = 0;
            break;
        case 3:
        case 4:
	    var vars = getRandom(1, 15, 9)
	    quest = "Please add the polynomials: ("+vars[0]+"x<sup>"+vars[1]+"</sup> + "+vars[2]+"x<sup>"+vars[3]+"</sup>) + ("+vars[4]+"x<sup>"+vars[5]+"</sup> + "+vars[5]+"x<sup>"+vars[6]+"</sup> + "+vars[7]+"x<sup>"+vars[3]+"</sup> + "+vars[8]+"x<sup>"+vars[1]+"</sup>)"
	    eq = "<input type='number' class='mathinput' id='i0' />x<sup>"+vars[1]+"</sup> + <input type='number' class='mathinput' id='i1' />x<sup>"+vars[3]+"</sup> + <input type='number' class='mathinput' id='i2' />x<sup>"+vars[5]+"</sup> + <input type='number' class='mathinput' id='i3' />x<sup>"+vars[6]+"</sup> + ";
	    ans = [(vars[0]+vars[8]), (vars[2]+vars[7]), vars[4], vars[5]];
	    equationNum = 0;
            break;
        case 5:
        case 6:
	    var vars = getRandom(1, 9, 4)
	    quest = "Please multiply the polynomials: ("+vars[0]+"x + "+vars[1]+") &times; ("+vars[2]+"x + "+vars[3]+")"
	    eq = "<input type='number' class='mathinput' id='i0' />x<sup>2</sup> + <input type='number' class='mathinput' id='i1' />x + <input type='number' class='mathinput' id='i2' />";
	    ans = [(vars[0]+vars[2]), ((vars[1]+vars[2])+(vars[0]+vars[3])), (vars[1]+vars[3])];
	    equationNum = 0;
            break;
        case 7:
        case 8:
	    var vars = getRandom(1, 9, 4)
	    quest = "Please divide the polynomials: ("+(vars[0]+vars[2])+"x<sup>2</sup>"+((vars[1]+vars[2])+(vars[0]+vars[3]))+"x + "+(vars[1]+vars[3])+") &divide; ("+vars[2]+"x + "+vars[3]+")"
	    eq = "<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />";
	    ans = [vars[0], vars[1]];
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

var numQuestions = 8;

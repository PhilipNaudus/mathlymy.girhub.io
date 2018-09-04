//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["SJXAiT_EKlI", "SJXAiT_EKlI", "moyEyIcDhII", "W0N8-wxmaGc", "PF1Zl6xdHRI"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    switch(questionNum)
    {
        case 0:
        case 1:
	    var vars = getRandom(1, 9, 2)
	    quest = "The two legs of a right triangle are "+vars[0]+" and "+vars[1]+". What is the length of the hypotenuse?"
	    eq = "<div class='sqrt'><span class='overline'><input type='number' class='mathinput' id='i0' /></span></div>";
	    ans = [Math.pow(vars[0],2) + Math.pow(vars[1],2)];
	    equationNum = 0;
            break;
        case 2:
	    var vars = getRandom(1, 9, 2);
	    quest = "Please find the area of a rectangle whose length is "+vars[0]+" inches and width is "+vars[1]+" inches."
	    eq = "<input type='number' class='mathinput' id='i0' /> inches<sup>2</sup>";
	    ans = [vars[0]*vars[1]];
	    equationNum = 0;
            break;
        case 3:
	    var vars = getRandom(1, 10, 2, [3,5,7,9]);
	    quest = "Please find the area of a triangle whose length is "+vars[0]+" inches and width is "+vars[1]+" inches."
	    eq = "<input type='number' class='mathinput' id='i0' /> inches<sup>2</sup>";
	    ans = [vars[0]*vars[1]/2];
	    equationNum = 0;
            break;
        case 4:
	    var vars = getRandom(1, 9, 1);
	    quest = "Please find the area and circumference of a circle whose radius is "+vars[0]+" inches";
	    eq = "Area: <input type='number' class='mathinput' id='i0' />&pi; inches<sup>2</sup><br />Circumference: <input type='number' class='mathinput' id='i1' />&pi; inches";
	    ans = [vars[0]*vars[0], 2*vars[0]];
	    equationNum = 0;
            break;
        case 5:
	    var vars = getRandom(1, 9, 3);
	    quest = "Please find the volume of a closed rectangular box with length "+vars[0]+" inches, width "+vars[1]+" inches, and height "+vars[2]+" inches.";
	    eq = "<input type='number' class='mathinput' id='i0' /> inches<sup>3</sup>";
	    ans = [vars[0]*vars[1]*vars[2]];
	    equationNum = 0;
            break;
        case 6:
	    var vars = getRandom(1, 9, 2);
	    quest = "Please find the volume of a closed right cylinder with radius "+vars[0]+" inches and height "+vars[1]+" inches.";
	    eq = "<input type='number' class='mathinput' id='i0' />&pi; inches<sup>3</sup>";
	    ans = [vars[0]*vars[0]*vars[1]];
	    equationNum = 0;
            break;
        case 7:
	    var vars = getRandom(1, 9, 2);
	    quest = "Please find the surface area of a sphere with radius "+vars[0]+" inches";
	    eq = "<input type='number' class='mathinput' id='i0' />&pi; inches<sup>2</sup>";
	    ans = [4*vars[0]*vars[0]];
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

var numQuestions = 5;

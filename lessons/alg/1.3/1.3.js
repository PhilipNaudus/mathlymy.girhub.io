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
            var vars = getRandom(-9, 9, 4)
            var posNeg = (Math.round(Math.random())==0)?"-":"+";
            quest = "Please evaluate:<br />("+vars[0]+""+signNumber(vars[1])+"i) "+posNeg+" ("+vars[2]+""+signNumber(vars[3])+"i)";
	    eq = "<input type='number' class='mathinput' id='i0' /> + <input type='number' class='mathinput' id='i1' /> i";
	    ans = [((posNeg=="-")?(vars[0]-vars[2]):(vars[0]+vars[2])), ((posNeg=="-")?(vars[1]-vars[3]):(vars[1]+vars[3]))];
            break;
        case 2:
        case 3:
            var vars = getRandom(-9, 9, 4)
            quest = "Please evaluate:<br />("+vars[0]+""+signNumber(vars[1])+"i) &times; ("+vars[2]+""+signNumber(vars[3])+"i)";
	    eq = "<input type='number' class='mathinput' id='i0' /> + <input type='number' class='mathinput' id='i1' /> i";
	    ans = [(vars[0]*vars[2] - vars[1]*vars[3]), (vars[0]*vars[3] + vars[1]*vars[2])];
            break;
        case 4:
        case 5:
            var vars = getRandom(1, 9, 3);
	    vars[2] = -vars[2];
	    vars[3] = -vars[3];
            quest = "Please solve for x:<br />"+(vars[0]*vars[0])+"x<sup>2</sup>"+signNumber(2*(vars[1]*vars[0]))+"x"+signNumber((vars[1]*vars[1])+(vars[2]*vars[2]))+" = 0";
	    eq = "x = <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i0' /></span><span class='fracbot'><input type='number' class='mathinput' id='i1' /></span></span> + "
		    +"<span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i2' /></span><span class='fracbot'><input type='number' class='mathinput' id='i3' /></span></span> i, "
	         +"x = <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i4' /></span><span class='fracbot'><input type='number' class='mathinput' id='i5' /></span></span> - "
		    +"<span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i6' /></span><span class='fracbot'><input type='number' class='mathinput' id='i7' /></span></span> i";
	    ans = [vars[1], vars[0], Math.abs(vars[2]), Math.abs(vars[0]), vars[1], vars[0], Math.abs(vars[2]), Math.abs(vars[0])];
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

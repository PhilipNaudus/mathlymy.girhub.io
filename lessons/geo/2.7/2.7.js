//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var vars = getRandom(1, 9, 5);
    var options;
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    switch(questionNum)
    {
        case 0:
	    equationNum = 0;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Given that &ang;A and &ang;B are right angles, prove that &ang;A &cong &ang;B.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
            addText([-1.5,0.5], "A");
            addText([1.5,0.5], "B");
	    plotData([-4,-1.1], [0,0]);
	    plotData([-1.1,-1.1], [4,0]);
	    plotData([4,1.1], [0,0]);
	    plotData([1.1,1.1], [-4,0]);
	    options = "<option value=''>Select</option><option value='Given'>Given</option><option value='Definition of congruent angles'>Definition of congruent angles</option><option value='Definition of right angle'>Definition of right angle</option><option value='Symmetric Property of Equality'>Symmetric Property of Equality</option><option value='Transitive Property of Equality'>Transitive Property of EqualityTransitive Property of Equality</option>";
	    break;
        case 1:
	    equationNum = 1;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please use the <b>symmetric</b> property to fill in the blanks.";
	    break;
        case 2:
	    equationNum = 2;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please use the <b>transitive</b> property to fill in the blanks.";
	    break;
        case 3:
	    equationNum = 3;
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Given that AC = AB + AB, prove that AB = BC. The proof is given on the left. Please select the reasons on the right.<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
	    break;
    }

    equations = [["", "<table border='0'><tr><td>&ang;A and &ang;B are right angles</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>m&ang;A = 90&deg; and m&ang;B = 90&deg;</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i1'>"+options+"</select></td></tr>"
		    +"<tr><td>m&ang;A = m&ang;B</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i2'>"+options+"</select></td></tr>"
		    +"<tr><td>&ang;A &cong &ang;B</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i3'>"+options+"</select></td></tr>"
		    , [["Given", "Definition of right angle", "Transitive Property of Equality", "Definition of congruent angles"]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];
    /*document.getElementById('i2').style.width = '22em';
    document.getElementById('i5').style.width = '22em';
    document.getElementById('i8').style.width = '22em';*/
	
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
    if(theNumber > 0){
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

function addOrSub(num)
{
	return (num>0)?"Addition Property of Equality":"Subtraction Property of Equality";

}

var numQuestions = 4;

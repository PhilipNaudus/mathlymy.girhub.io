//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
	var quest;
	var ans;
	var eq;
	var options = "<option value=''>Select</option><option value='gt0'>&gt;</option><option value='lt0'>&lt;</option><option value='ge0'>&ge;</option><option value='le0'>&le;</option>";
	switch(questionNum)
	{
		case 0:
		case 1:
			var vars = getRandom(-9,9,3,[0]);

			quest = "If |"+vars[0]+"x"+signNumber(vars[0]*vars[1])+"| = "+Math.abs(vars[0]*vars[2])+", please fill in the blanks below to make a true statement:";
			eq = "x = <input type='number' class='mathinput' id='i0' /><br />and<br />x = <input type='number' class='mathinput' id='i1' />";
			ans = [[(vars[2]-vars[1]), (-vars[2]-vars[1])], [(-vars[2]-vars[1]), (vars[2]-vars[1])]];
			break;
		case 2:
		case 3:
			var n = getRandom(0,3,1);
			var vars = getRandom(1,9,1);
			var ineq;

			switch(n[0])
			{
				case 0:
					ineq = "&lt;";
					ans = [["gt0", -vars[0], "lt0", vars[0]], ["lt0", vars[0]], "gt0", -vars[0]];
					break;
				case 1:
					ineq = "&le;";
					ans = [["ge0", -vars[0], "le0", vars[0]], ["le0", vars[0], "ge0", -vars[0]]];
					break;
				case 2:
					ineq = "&gt;";
					ans = [["lt0", -vars[0], "gt0", vars[0]], ["gt0", vars[0], "lt0", -vars[0]]];
					break;
				case 3:
					ineq = "&ge;";
					ans = [["le0", -vars[0], "ge0", vars[0]], ["ge0", vars[0], "le0", -vars[0]]];
					break;
			}

			quest = "If |x| "+ineq+" "+vars[0]+", please fill in the blanks below to make a true statement:";
			eq = "x <select class='mathinput' id='i0'>"+options+"</select> <input type='number' class='mathinput' id='i1' /><br />and<br />x <select class='mathinput' id='i2'>"+options+"</select> <input type='number' class='mathinput' id='i3' />";
			break;
	}

	equationNum = 0;
	document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;
	equations = [["", eq, ans]];
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

var numQuestions = 4;

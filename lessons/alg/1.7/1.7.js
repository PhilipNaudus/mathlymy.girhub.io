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
			var vars = getRandom(1,7,2,[4,6]);
			vars = vars.sort().reverse();

			quest = "If it takes "+vars[0]+" hours to complete a job, what fraction of the job is done in "+vars[1]+" hours?"
			eq = "x = <span class='fraction'><span class='fractop'><input type='number' class='mathinput' id='i0' /></span><span class='fracbot'><input type='number' class='mathinput' id='i1' /></span></span>";
			ans = [vars[1], vars[0]];
			break;
		case 2:
		case 3:
			var vars = getRandom(30,100,2);
			vars = vars.sort().reverse();

			quest = "You want to mix two chemicals to produce a new mixture, totaling "+vars[0]+" pounds. If you must use "+vars[1]+" gallons of the first chemical, how many gallons of the second chemical should you use?";
			eq = "x = <input type='number' class='mathinput' id='i0' />";
			ans = [(vars[0]-vars[1])];
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

var numQuestions = 4;

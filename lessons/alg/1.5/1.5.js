//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
	var quest;
	var ans;
	var eq;
	var options = "<option value=''>Select</option><option value='gt0'>&gt;</option><option value='lt0'>&lt;</option><option value='ge0'>&ge;</option><option value='le'>&le;</option>";
	switch(questionNum)
	{
		case 0:
		case 1:
			var n = getRandom(0,3,1);
			var vars = getRandom(-9,9,2,[0]);
			var ineq;

			switch(n[0])
			{
				case 0:
					ineq = "&lt;";
					ans = ["lt0", (vars[0]+vars[1])];
					break;
				case 1:
					ineq = "&le;";
					ans = ["le0", (vars[0]+vars[1])];
					break;
				case 2:
					ineq = "&gt;";
					ans = ["gt0", (vars[0]+vars[1])];
					break;
				case 3:
					ineq = "&ge;";
					ans = ["ge0", (vars[0]+vars[1])];
					break;
			}

			quest = "if x "+ineq+" "+vars[0]+", please fill in the blank below to make a true statement:";
			eq = "x"+signNumber(vars[1])+"<select class='mathinput' id='i0'>"+options+"</select> <input type='number' class='mathinput' id='i1' />";
			break;
		case 2:
		case 3:
			var n = getRandom(0,3,1);
			var vars = getRandom(-9,9,2,[0]);
			var ineq;
			switch(n[0])
			{
				case 0:
					ineq = "&lt;";
					ans = [((vars[1]>0)?"lt0":"gt0"), (vars[0]*vars[1])];
					break;
				case 1:
					ineq = "&le;";
					ans = [((vars[1]>0)?"le0":"ge0"), (vars[0]*vars[1])];
					break;
				case 2:
					ineq = "&gt;";
					ans = [((vars[1]>0)?"gt0":"lt0"), (vars[0]*vars[1])];
					break;
				case 3:
					ineq = "&ge;";
					ans = [((vars[1]>0)?"ge0":"le0"), (vars[0]*vars[1])];
					break;
			}

			quest = "if x "+ineq+" "+vars[0]+", please fill in the blank below to make a true statement:";
			eq = signNumber(vars[1])+"x <select class='mathinput' id='i0'>"+options+"</select> <input type='number' class='mathinput' id='i1' />";
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

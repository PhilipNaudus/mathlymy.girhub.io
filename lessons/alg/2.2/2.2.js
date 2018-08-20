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
			var n = getRandom(2,3,2);
			var vars = getRandom(2,3,1);

			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please fill in the blank below to produce a point which lies on the graph of y.<br />y = x<sup>"+n[0]+"</sup> - <sup>"+n[1]+"</sup><div class='sqrt'><span class='overline'>x</span></div>";
			eq = "("+Math.pow(vars[0], n[1])+", <input type='number' class='mathinput' id='i0' />)";
			ans = [(Math.pow(Math.pow(vars[0], n[1]), n[0]) - vars[0])];
			break;
		case 2:
		case 3:
			var n = getRandom(2,3,2);
			var vars = getRandom(1,3,2);

			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please fill in the blank below to produce a point which lies on the graph of y.<br />x<sup>"+n[0]+"</sup> + y<sup>"+n[1]+"</sup> = "+(Math.pow(vars[0],n[0])+Math.pow(vars[1],n[1]));
			eq = "("+vars[0]+", <input type='number' class='mathinput' id='i0' />)";
			ans = [vars[1]];
			break;
		case 3:
			x = new Array();
			y = new Array();
			var vars = getRandom(-3,3,1);

			for(var i=-5; i<5; i+=0.01)
			{
				x.push(i);
				y.push(Math.pow((i+vars[0]),2));
			}
			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the y-intercept of the graph shown below?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
			plotData(x, y);

			eq = "x-intercept: <input type='number' class='mathinput' id='i0' />)";
			ans = [-vars[0]];
			break;
		case 4:
			x = new Array();
			y = new Array();
			var vars = getRandom(-3,3,1);

			for(var i=-5; i<5; i+=0.01)
			{
				y.push(i);
				x.push(Math.pow((i+vars[0]),2));
			}

			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the y-intercept of the graph shown below?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
			plotData(x, y);

			eq = "y-intercept: <input type='number' class='mathinput' id='i0' />)";
			ans = [-vars[0]];
			break;
		case 5:
		case 6:
		case 7:
		case 8:
			x = new Array();
			y = new Array();
			var vars = getRandom(-3,3,2);
			var n = getRandom(0,3,1);

			for(var i=-5; i<5; i+=0.01)
			{
				switch(n[0])
				{
					case 0:
						x.push(i);
						y.push(vars[0]*Math.pow((i+vars[1]),2));
						ans = "x-axis";
						break;
					case 1:
						y.push(i);
						x.push(vars[0]*Math.pow((i+vars[1]),2));
						ans = "y-axis";
						break;
					case 2:
						if(i==0) continue;
						x.push(i);
						y.push(vars[0]/i);
						ans = "origin";
						break;
					case 3:
						x.push(i);
						y.push(vars[0]*Math.pow(i),3);
						ans = "origin";
						break;
				}
			}
			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Is the graph shown below symmetric about the x-axis, y-axis, or the origin?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
			plotData(x, y);

			eq = "Symmetric about the <select class='mathinput' id='i1'><option value='x-axis'>x-axis</option><option value='y-axis'>y-axis</option><option value='origin'>origin</option></select>)";
			ans = [-vars[0]];
			break;
	}

	equationNum = 0;
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

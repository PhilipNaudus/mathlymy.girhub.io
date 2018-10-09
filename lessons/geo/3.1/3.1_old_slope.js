//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["a-pUPq_Cw60", "yW3VEDebkf4", "a-pUPq_Cw60"];

function setQuestion()
{
	var vars = getRandom(-5,5,4);

	switch(questionNum)
	{
		case 0:
		case 2:
			var w = Math.min(window.innerWidth, window.innerHeight, 400);
			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the slope of the line segment shown below?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
			initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
			plotData([vars[0],vars[2]], [vars[1],vars[3]]);
			break;
		case 1:
		case 3:
			document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the slope of the line which passes through the points ("+vars[0]+","+vars[1]+") and ("+vars[2]+","+vars[3]+")?";
			break;
	}
	var slopeSign = ((vars[1]-vars[3])/(vars[0]-vars[2]))>0?1:-1;
	var ans = reduce(Math.abs(vars[1]-vars[3]), Math.abs(vars[0]-vars[2]));

	if(ans[1]==1) equationNum = (practice)?1:3;
	else equationNum = (practice)?0:2;
	equations = [["", "<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i0' />-<input type='number' class='mathinput' id='i1' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i2' />-<input type='number' class='mathinput' id='i3' /></span>"
			+"</span> = <span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i4' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i5' /></span>"
			+"</span>", [[vars[1], vars[3], vars[0], vars[2], ans[0]*slopeSign, ans[1]],
		                     [vars[1], vars[3], vars[0], vars[2], ans[0], ans[1]*slopeSign],
		                     [vars[3], vars[1], vars[2], vars[0], ans[0]*slopeSign, ans[1]],
				     [vars[3], vars[1], vars[2], vars[0], ans[0], ans[1]*slopeSign]]],
                    ["", "<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i0' />-<input type='number' class='mathinput' id='i1' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i2' />-<input type='number' class='mathinput' id='i3' /></span>"
			+"</span> = <input type='number' class='mathinput' id='i4' />",
			            [[vars[1], vars[3], vars[0], vars[2], ans[0]*slopeSign],
		                     [vars[3], vars[1], vars[2], vars[0], ans[0]*slopeSign]]],
	            ["", "<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i0' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i1' /></span>"
			+"</span>" , [[ans[0]*slopeSign, ans[1]], [ans[0], ans[1]*slopeSign]]],
		    ["", "<span class='fractop'><input type='number' class='mathinput' id='i0' />",
		                     [[ans[0]*slopeSign]]]];
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

var numQuestions = 4;

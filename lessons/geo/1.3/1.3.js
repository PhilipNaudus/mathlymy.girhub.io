var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];
var correctEq;
var quizEq;
var numEqs = 2;

function setQuestion()
{
    switch(questionNum)
    {
        case 0:
            vars = getRandom(-5, 5, 4);
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the length of this line?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
            plotData([vars[0], vars[2]], [vars[1], vars[3]]);
	    correctEq = 0;
	    quizEq = 2;
            break;
        case 1:
            vars = getRandom(0, 9, 4);
            if(questionNum>1)
            {
                var rand;
                var count = 0;
                for(var i=0; i<2; i++)
                {
                    rand = Math.round(Math.random()*3);
                    vars[rand] = -Math.abs(vars[rand]);
                }
            }

            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Find the distance between ("+vars[0]+","+vars[1]+") and ("+vars[2]+","+vars[3]+").";
	    correctEq = 0;
	    quizEq = 2;
            break;
	    //TODO////////
        case 2:
            vars = getRandom(-5, 5, 4);
            var w = Math.min(window.innerWidth, window.innerHeight, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the midpoint of this line?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
            plotData([vars[0], vars[2]], [vars[1], vars[3]]);
	    correctEq = 1;
	    quizEq = 3;
            break;
        case 3:
            vars = getRandom(0, 9, 4);
            if(questionNum>1)
            {
                var rand;
                var count = 0;
                for(var i=0; i<2; i++)
                {
                    rand = Math.round(Math.random()*3);
                    vars[rand] = -Math.abs(vars[rand]);
                }
            }

            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Find the midpoint between ("+vars[0]+","+vars[1]+") and ("+vars[2]+","+vars[3]+").";
	    correctEq = 1;
	    quizEq = 3;
            break;
    }

    var ans = Math.pow(vars[0]-vars[2],2)+Math.pow(vars[1]-vars[3],2);
    equations = [["distance.gif",
                    "<div class='sqrt'><span class='overline'>"
                        +"(<input type='number' class='mathinput' id='i0' />-<input type='number' class='mathinput' id='i1' />)"
                        +"<span class='supsub'>"
                            +"<sup><input type='number' class='mathinput' id='i2' /></sup>"
                            +"<sub></sub>"
                        +"</span>"
                        +"+(<input type='number' class='mathinput' id='i3' />-<input type='number' class='mathinput' id='i4' />)"
                        +"<span class='supsub'>"
                            +"<sup><input type='number' class='mathinput' id='i5' /></sup>"
                            +"<sub></sub>"
                            +"</span>"
                            +"</span>"
                    +"</span></div>"
                    +" =&nbsp;<div class='sqrt'><span class='overline'><input type='number' class='mathinput' id='i6' /></span></div>",
                    [[vars[0], vars[2], 2, vars[1], vars[3], 2, ans],
                     [vars[2], vars[0], 2, vars[1], vars[3], 2, ans],
                     [vars[0], vars[2], 2, vars[3], vars[1], 2, ans],
                     [vars[2], vars[0], 2, vars[3], vars[1], 2, ans],
                     [vars[1], vars[3], 2, vars[0], vars[2], 2, ans],
                     [vars[1], vars[3], 2, vars[2], vars[0], 2, ans],
                     [vars[3], vars[1], 2, vars[0], vars[2], 2, ans],
                     [vars[3], vars[1], 2, vars[2], vars[0], 2, ans]]],
                    ["midpoint.gif",
                    "<span style='font-size:300%'>(</span>"
			+"<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i0' />+<input type='number' class='mathinput' id='i1' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i2' /></span>"
			+"</span>,"
			+"<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i3' />+<input type='number' class='mathinput' id='i4' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i5' /></span>"
			+"</span>"
                    +"<span style='font-size:300%'>)</span>"
                    +" =&nbsp;(<input type='number' class='mathinput' id='i6' />, <input type='number' class='mathinput' id='i7' />)",
                    [[vars[0], vars[2], 2, vars[1], vars[3], 2, (vars[0]+vars[2])/2, (vars[1]+vars[3])/2],
                     [vars[2], vars[0], 2, vars[3], vars[1], 2, (vars[0]+vars[2])/2, (vars[1]+vars[3])/2]]],
		     ["onestep.gif",
		     "<div class='sqrt'><span class='overline'><input type='number' class='mathinput' id='i0' /></span></div>",
		     [[ans]]],
		    ["added.gif",
                    "<span style='font-size:300%'>(</span>"
			+"<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i0' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i1' /></span>"
			+"</span>,"
			+"<span class='fraction'>"
                          +"<span class='fractop'><input type='number' class='mathinput' id='i2' /></span>"
			  +"<span class='fracbot'><input type='number' class='mathinput' id='i3' /></span>"
			+"</span>"
                    +"<span style='font-size:300%'>)</span>",
                    [[vars[0]+vars[2], 2, vars[1]+vars[3], 2],
                     [vars[2]+vars[0], 2, vars[3]+vars[1], 2]]]];

    for(var i=0; i<equations.length; i++)
    {
        equations[i][2] = equations[i][2].map(function(j)
                                              {
                                                  return j.map(function(k)
                                                  {
                                                      return k.toString();
                                                  })
                                              });
    }
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 1;

    if(practice)
    {
        document.getElementById("step").innerHTML = steps[0];
        var displayEquations = "<div class='row'>";
        for(var i=0; i<numEqs; i++)
        {
            displayEquations+="<div class='column'><a href='javascript:step2("+i+", false)'><img src='lessons/"+course+"/"+lessonId+"/"+equations[i][0]+"' /></a></div>"
        }
        displayEquations += "</div>";
        document.getElementById("math").innerHTML = displayEquations;
    } else
    {
        step2(quizEq, false);
    }

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function step2(eqNum, ifResetScrolling)
{
    if(practice && eqNum!=correctEq)
    {
        swal("Wrong equation", "Please try again", "error");
	return;
    }
    currentStep = 2;
    equationNum = eqNum;

    switch(practice)
    {
        case true:
            document.getElementById("step").innerHTML = steps[1];
            break;
        case false:
            document.getElementById("step").innerHTML = "";
            break;
    }
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

var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"]

function setQuestion()
{
    switch(questionNum)
    {
        case 0:
        case 2:
            vars = getRandom(-5, 5, 4);
            var w = Math.min(window.innerWidth, 400);
            document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the length of this line?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
            initCanvas();
            plotData([vars[0], vars[2]], [vars[1], vars[3]]);
            break;
        case 1:
        case 3:
            vars = getRandom(0, 9, 4);
            if(questionNum==2)
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
            break;
    }

    var ans = Math.pow(vars[0]-vars[2],2)+Math.pow(vars[1]-vars[3],2);
    equations = [["subtract.gif",
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
                    ["delta.gif",
                    "<div class='sqrt'><span class='overline'>"
                        +"<input type='number' class='mathinput' id='i0' />"
                        +"<span class='supsub'>"
                            +"<sup><input type='number' class='mathinput' id='i1' /></sup>"
                            +"<sub></sub>"
                        +"</span>"
                        +"+<input type='number' class='mathinput' id='i2' />"
                        +"<span class='supsub'>"
                            +"<sup><input type='number' class='mathinput' id='i3' /></sup>"
                            +"<sub></sub>"
                        +"</span>"
                    +"</span></div>"
                    +" =&nbsp;<div class='sqrt'><span class='overline'><input type='number' class='mathinput' id='i4' /></span></div>",
                    [[Math.abs(vars[0]-vars[2]), 2, Math.abs(vars[1]-vars[3]), 2, ans],
                     [-Math.abs(vars[0]-vars[2]), 2, Math.abs(vars[1]-vars[3]), 2, ans],
                     [Math.abs(vars[0]-vars[2]), 2, -Math.abs(vars[1]-vars[3]), 2, ans],
                     [-Math.abs(vars[0]-vars[2]), 2, -Math.abs(vars[1]-vars[3]), 2, ans],
                     [Math.abs(vars[1]-vars[3]), 2, Math.abs(vars[0]-vars[2]), 2, ans],
                     [-Math.abs(vars[1]-vars[3]), 2, Math.abs(vars[0]-vars[2]), 2, ans],
                     [Math.abs(vars[1]-vars[3]), 2, -Math.abs(vars[0]-vars[2]), 2, ans],
                     [-Math.abs(vars[1]-vars[3]), 2, -Math.abs(vars[0]-vars[2]), 2, ans]]],
                    ["onestep.gif",
                    "<span class='sqrt'>"
                        +"<input type='number' class='mathinput' id='i0' />"
                    +"</span>",
                    [[ans]]]];

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
        for(var i=0; i<equations.length; i++)
        {
            displayEquations+="<div class='column'><a href='javascript:step2("+i+", false)'><img src='lessons/"+course+"/"+lessonId+"/"+equations[i][0]+"' /></a></div>"
        }
        displayEquations += "</div>";
        document.getElementById("math").innerHTML = displayEquations;
    } else
    {
        step2(equations.length-1, false);
    }

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function step2(eqNum, ifResetScrolling)
{
    currentStep = 2;

    switch(practice)
    {
        case true:
            equationNum = eqNum;
            document.getElementById("step").innerHTML = steps[1];
            document.getElementById("math").innerHTML = equations[equationNum][1];
            break;
        case false:
            equationNum = equations.length-1;
            document.getElementById("step").innerHTML = "";
            document.getElementById("math").innerHTML = equations[equations.length-1][1];
            break;
    }

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

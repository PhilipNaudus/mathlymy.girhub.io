//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];
var polygonNames = ["heptagon", "nonagon", "octagon", "hexagon", "octagon", "pentagon", "quadrilateral", "hexagon", "pentagon", "quadrilateral", "hexagon", "heptagon"];
var concaveConvex = ["convex", "concave", "convex", "concave", "convex", "convex", "convex", "concave", "convex", "convex", "convex", "concave"];
var regularIrregular = ["regular", "irregular", "regular", "irregular", "irregular", "regular", "irregular", "irregular", "irregular", "regular", "irregular", "irregular"];

function setQuestion()
{
    var vars = getRandom(1, 12, 1);
    switch(questionNum)
    {
        case 0:
	case 1:
            quest = "Please tell whether the polygon shown below is concave or convex.";
	    ans = concaveConvex[vars[0]-1];
	    alert(ans);
	    break;
        case 2:
        case 3:
            quest = "Please tell whether the polygon shown below is regular or irregular.";
	    ans = regularIrregular[vars[0]-1];
            break;
        case 4:
        case 5:
            quest = "Please enter the type of polygon shown below based on its number of sides.<br /><img src='/lessons/geo/1.6/polygonchart.gif' />";
	    ans = polygonNames[vars[0]-1];
            break;
    }
    equationNum = 0;
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest+"<br /><img src='/lessons/geo/1.6/"+vars[0]+".png' /></canvas>";

    equations = [["", "<input type='text' class='mathinput' id='i0' />", ans]];
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

var numQuestions = 6;

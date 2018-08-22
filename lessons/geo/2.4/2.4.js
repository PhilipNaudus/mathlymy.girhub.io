//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["x6CPPzii7eI", "anueSivoknw", "Jy9fmzXYo_M", "uIWWjgWClxo", "UTBWld8_jTE", "UTBWld8_jTE"];

function setQuestion()
{
    var onePlaneTrue = ["All points shown are coplanar", "&ang;AHB and &ang;BHD are supplementary", "&ang;AHF and &ang;BHD are vertical angles", "A, H, J, and D are collinear", "<span style='text-decoration: overline'>AD</span> and <span style='text-decoration: overline'>BF</span> intersect at H"];
    var onePlaneFalse = ["G, F, and E are collinear", "<span style='text-decoration: overline'>BF</span> and <span style='text-decoration: overline'>CE</span> intersect", "<span style='text-decoration: overline'>BF</span> and <span style='text-decoration: overline'>CE</span> are parallel", "&ang;BHA = &ang;CJA", "<span style='text-decoration: overline'>AD</span> &perp; <span style='text-decoration: overline'>BF</span>"];

    var twoPlanesTrue = ["A, B, and F are collinear", "<span style='text-decoration: overline'>AB</span> &perp; plane S", "<span style='text-decoration: overline'>BC</span> &perp; plane T", "<span style='text-decoration: overline'>AF</span> intersects <span style='text-decoration: overline'>BC</span> at point B", "Plane T is perpendicular to plane S"];
    var twoPlanesFalse = ["E, B, and D are collinear", "<span style='text-decoration: overline'>CD</span> &perp; plane T", "<span style='text-decoration: overline'>EC</span> &perp; <span style='text-decoration: overline'>CD</span>", "<span style='text-decoration: overline'>AB</span> intersects <span style='text-decoration: overline'>CD</span>", "&ang;BCD is a right angle"];
    var ans;
    var vars = getRandom(0, 4, 1);
    var trueFalse = getRandom(0, 1, 1);
    switch(questionNum)
    {
        case 0:
        case 1:
        case 2:
	    var statement = (trueFalse[0]==0)?onePlaneTrue[vars[0]]:onePlaneFalse[vars[0]];
	    ans = (trueFalse[0]==0)?"true":"false";
            quest = "Please determine whether this statement is true or false for the diagram shown below:<br /><b>"+statement+"</b><br />Please enter <b>true</b> or <b>false</b><br /><img src='/lessons/geo/2.4/oneplane.png' />";
	    equationNum = 0;
	    break;
        case 3:
        case 4:
        case 5:
	    var statement = (trueFalse[0]==0)?twoPlanesTrue[vars[0]]:twoPlanesFalse[vars[0]];
	    ans = (trueFalse[0]==0)?"true":"false";
            quest = "Please determine whether this statement is true or false for the diagram shown below:<br /><b>"+statement+"</b><br />Please enter <b>true</b> or <b>false</b><br /><img src='/lessons/geo/2.4/twoplanes.png' />";
	    equationNum = 0;
	    break;
    }
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;

    equations = [["", "<input type='text' class='mathinput' id='i0' />", [[ans]]]];
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

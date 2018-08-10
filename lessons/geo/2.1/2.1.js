//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var ans;
    switch(questionNum)
    {
        case 0:
	    var vars = getRandom(1, 5, 1);
	    var num = 1;
	    var text = "";
	    for(var i=1; i<=4; i++)
	    {
		text += num + ", ";
	        num = num * vars[0];
	    }
            quest = "Please enter the next number in the following sequence:<br />"+text+"...";
	    ans = num;
	    break;
        case 1:
	    var vars = getRandom(10, 20, 1);
	    var num = 200;
	    var text = "";
	    for(var i=1; i<=4; i++)
	    {
		text += num + ", ";
	        num = num - vars[0];
	    }
            quest = "Please enter the next number in the following sequence:<br />"+text+"...";
	    ans = num;
	    break;
        case 2:
	    var vars = getRandom(1, 5, 2);
	    var text = ""+vars[0]+", ";
	    var temp;
	    for(var i=1; i<=10; i++)
	    {
		text += vars[1] + ", ";
		temp = vars[1];
		vars[1] = vars[0] + vars[1];
		vars[0] = temp;
	    }
            quest = "Please enter the next number in the following sequence:<br />"+text+"...";
	    ans = vars[1];
	    break;
        case 3:
	    var vars = getRandom(1, 5, 2);
	    var text = ""+vars[0]+", ";
	    var temp;
	    for(var i=1; i<=5; i++)
	    {
		text += vars[1] + ", ";
		temp = vars[1];
		vars[1] = vars[0] * vars[1];
		vars[0] = temp;
	    }
            quest = "Please enter the next number in the following sequence:<br />"+text+"...";
	    ans = vars[1];
	    break;
    }
    equationNum = 0;
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;

    equations = [["", "<input type='number' class='mathinput' id='i0' />", [[ans]]]];
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

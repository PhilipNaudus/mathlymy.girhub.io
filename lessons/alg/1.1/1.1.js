//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var quest;
    var vars = getRandom(-5, 5, 4);
    var A = getRandom(0, 9, 7).sort();
    var B = getRandom(0, 9, 7).sort();
    var ans;
    var eq;
    switch(questionNum)
    {
        case 0:
	    quest = "If A = {"+A.join()+"}  and B = {"+B.join()+"}, please enter the elements of A &cup; B:";
	    var ans = union(A, B).sort();
	    var eq = "<input type='number' class='mathinput' id='i0' />";
	    for(var i=1; i<+ans.length; i++)
	    {
	       eq += ", <input type='number' class='mathinput' id='i"+i+"' />";
	    }
	    equationNum = 0;
            break;
        case 1:
	    quest = "If A = {"+A.join()+"}  and B = {"+B.join()+"}, please enter the elements of A &cap; B:";
	    var ans = (A.filter(value => -1 !== B.indexOf(value))).sort();
	    var eq = "<input type='number' class='mathinput' id='i0' />";
	    for(var i=1; i<+ans.length; i++)
	    {
	       eq += ", <input type='number' class='mathinput' id='i"+i+"' />";
	    }
	    equationNum = 0;
            break;
    }

    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;
    equations = [["", eq, [ans]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    alert(equationNum);
    alert(equations[0]);
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

function unique(x) {
  return x.filter(function(elem, index) { return x.indexOf(elem) === index; });
};

function union(x, y) {
  return unique(x.concat(y));
};


var numQuestions = 4;

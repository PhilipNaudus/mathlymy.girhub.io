//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var hypo = ["it rains", "I eat an apple", "my friend gives me a call", "I read a book", "my computer breaks", "I lose my keys", "I have money"];
    var concl = ["I will go to the store", "I will watch a movie", "I will go to my friend's house", "I will clean my room", "I will eat a banana", "I will do my homework", "I will close my book"];

    var nhypo = ["it does not rains", "I will not eat an apple", "my friend does not give me a call", "I do not read a book", "my computer does not break", "I do not lose my keys", "I do not have money"];
    var nconcl = ["I will not go to the store", "I will not watch a movie", "I will not go to my friend's house", "I will not clean my room", "I will not eat a banana", "I will not do my homework", "I will not close my book"];
    var ans;
    var vars = getRandom(0, 6, 2);
    var fourFive = getRandom(4, 5, 1);
    switch(questionNum)
    {
        case 0:
        case 1:
            quest = "Please enter the <b>hypothesis</b> and <b>conclusion</b> of the below conditional statement:<br /><b>If "+hypo[vars[0]]+", then "+concl[vars[1]]+".</b>";
	    ans = [hypo[vars[0]], concl[vars[1]]];
	    equationNum = 0;
	    break;
        case 2:
        case 3:
            quest = "Please enter the <b>converse</b> of the below conditional statement:<br /><b>If "+hypo[vars[0]]+", then "+concl[vars[1]]+".</b>";
	    ans = ["If "+concl[vars[1]]+", then "+hypo[vars[0]]+"."];
	    equationNum = 1;
	    break;
        case fourFive[0]:
            quest = "Please examine the two conditional sentences below and determine whether the second one is a contrapositive or inverse of the first. Please enter <b>contrapositive</b> or <b>inverse</b>.<br /><b>If "+hypo[vars[0]]+", then "+concl[vars[1]]+".<br />If "+nhypo[vars[0]]+", then "+nconcl[vars[1]]+".</b>";
	    ans = ["inverse"];
	    equationNum = 1;
	    break;
	default:
            quest = "Please examine the two conditional sentences below and determine whether the second one is a contrapositive or inverse of the first. Please enter <b>contrapositive</b> or <b>inverse</b>.<br /><b>If "+hypo[vars[0]]+", then "+concl[vars[1]]+".<br />If "+nconcl[vars[1]]+", then "+nhypo[vars[0]]+".</b>";
	    ans = ["contrapositive"];
	    equationNum = 1;
	    break;
    }
    equationNum = 0;
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;

    equations = [["", "Hypothesis: <input type='text' class='mathinput' id='i0' /><br />Conclusion: <input type='text' class='mathinput' id='i1' />", [ans]],
	        ["", "<input type='text' class='mathinput' id='i0' />", [ans]]];
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

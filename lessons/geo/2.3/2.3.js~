//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];

function setQuestion()
{
    var hypo1 = ["my team loses", "I forget to pack my lunch", "I win a prize", "my teacher calls me", "my computer breaks", "I lose my keys", "I get sick"];
    var concl1 = ["I will ask a question", "I will eat candy", "I will drink water", "I will go to the library", "my friend will help me", "my dog will get sick", "I will go to the doctor"];

    var hypo2 = ["I ask a question", "I eat candy", "I drink water", "I go to the library", "my friend will help me", "I dog will get sick", "I go to the doctor"];
    var concl2 = ["I will go to the store", "I will watch a movie", "I will go to my friend's house", "I will clean my room", "I will eat a banana", "I will do my homework", "I will close my book"];
    var ans;
    var vars = getRandom(0, 6, 3);
    var fourFive = getRandom(4, 5, 1);
    switch(questionNum)
    {
        case 0:
        case 2:
            quest = "Please use deductive reasoning to enter the <b>conclusion</b> of the final conditional statement.<br /><b>If "+hypo1[vars[0]]+", then "+concl1[vars[1]]+".</b><br /><ul><li>If "+hypo1[vars[0]]+", then "+concl1[vars[1]]+".</li><li>If "+hypo2[vars[1]]+", then "+concl2[vars[2]]+".</li></ul>";
	    ans = [concl2[vars[2]]];
	    equationNum = 0;
	    break;
        case 1:
        case 3:
            quest = "Please use deductive reasoning to enter the <b>hypothesis</b> of the final conditional statement.<br /><b>If "+hypo1[vars[0]]+", then "+concl1[vars[1]]+".</b><br /><ul><li>If "+hypo1[vars[0]]+", then "+concl1[vars[1]]+".</li><li>If "+hypo2[vars[1]]+", then "+concl2[vars[2]]+".</li></ul>";
	    ans = [hypo2[vars[1]]];
	    equationNum = 1;
	    break;
        case fourFive[0]:
            quest = "Please examine the logic below and determine if it is inductive or deductive reasoning. Please enter <b>inductive</b> or <b>deductive</b>.<br /><ul><li>If "+hypo1[vars[0]]+", then "+concl1[vars[1]]+".</li><li>If "+hypo2[vars[1]]+", then "+concl2[vars[2]]+".</li><li>"+hypo1[vars[0]].replace(/^\w/, function (chr) { return chr.toUpperCase(); })+". "+concl2[vars[2]].replace(/^\w/, function (chr) { return chr.toUpperCase(); })+".</li></ul>";
	    ans = ["deductive"];
	    equationNum = 2;
	    break;
	default:
            quest = "Please examine the logic below and determine if it is inductive or deductive reasoning. Please enter <b>inductive</b> or <b>deductive</b>.<br /><ul><li>Every time "+hypo1[vars[0]]+", "+concl1[vars[1]]+".</li><li>The next time"+hypo1[vars[0]]+". "+concl1[vars[1]].replace(/^\w/, function (chr) { return chr.toUpperCase(); })+".</li></ul>";
	    ans = ["inductive"];
	    equationNum = 2;
	    break;
    }
    var w = Math.min(window.innerWidth, window.innerHeight, 400);
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;

    equations = [["", "If "+hypo2[vars[1]]+", then <input type='text' class='mathinput' id='i0' />", [ans]],
	        ["", "If <input type='text' class='mathinput' id='i0' />, then "+concl2[vars[2]]+".", [ans]],
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

var numQuestions = 6;

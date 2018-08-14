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
        case 2:
	    var vars = getRandom(1, 9, 4)
	    quest = "In the blank below, please enter &gt;, &lt;, or = to make a true expression."
	    eq = "<span class='fraction'><span class='fractop'>"+vars[0]+"</span>"
			  +"<span class='fracbot'>"+vars[1]+"</span>"
			+"</span>"
			+"&nbsp;<input type='number' class='mathinput' id='i0' />&nbsp;"
			+"<span class='fraction'>"
                          +"<span class='fractop'>"+vars[2]+"</span>"
			  +"<span class='fracbot'>"+vars[3]+"</span>"
			+"</span>";
	    if(((vars[0]/vars[1]) - (vars[2]/vars[3])) < 0.01) ans = "=";
	    else if((vars[0]/vars[1]) > (vars[2]/vars[3])) ans = ">";
	    else ans = "<";
	    equationNum = 0;
            break;
        case 1:
        case 3:
	    var vars = getRandom(1, 9, 4)
	    quest = "In the blank below, please enter &gt;, &lt;, or = to make a true expression."
	    eq = "<span class='fractop'>"+vars[0]+"</span>"
			  +"<span class='fracbot'>"+vars[1]+"</span>"
			+"</span>"
			+"<input type='number' class='mathinput' id='i0' />"
			+ (vars[2]/vars[3]);
	    if(((vars[0]/vars[1]) - (vars[2]/vars[3])) < 0.01) ans = ["="];
	    else if((vars[0]/vars[1]) > (vars[2]/vars[3])) ans = [">"];
	    else ans = ["<"];
	    equationNum = 0;
            break;
        case 4:
        case 5:
	    var vars = getRandom(1, 9, 6)
	    quest = "Please evaluate |"+vars[0]+" - ["+vars[1]+"&times;"+vars[2]+" + ("+vars[3]+" - "+vars[4]+")] &times; "+vars[5]+"|";
	    var ans = [Math.abs(vars[0] - (((vars[1]*vars[2]) + vars[3]-vars[4])*vars[5]))];
	    var eq = "<input type='number' class='mathinput' id='i0' />";
	    equationNum = 0;
            break;
        case 6:
        case 7:
	    var vars = getRandom(-9, 9, 2)
	    quest = "What value of x must be excluded from the domain of "
	                +"<span class='fractop'>x "+signNumber(vars[0])+"</span>"
			  +"<span class='fracbot'>x "+signNumber(vars[1])+"</span>"
			+"</span>";
	    eq = "<input type='number' class='mathinput' id='i0' />"
	    ans = -vars[2];
	    equationNum = 0;
            break;
        case 8:
        case 9:
	    var vars = getRandom(1, 9, 3)
	    quest = "Please write "+vars[0]+"."+vars[1]+" &times; 10<sup>"+vars[2]+"</sup> as a decimal.";
	    eq = "<input type='number' class='mathinput' id='i0' />"
	    ans = (vars[0]+(vars[1]/10))*(Math.pow(10,vars[2]))
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
    if(theNumber > 0){
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

var numQuestions = 8;

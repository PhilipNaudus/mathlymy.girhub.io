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
        case 1:
            var radic = getRandom(4, 9, 1)
            var n = getRandom(3, 5, 1)
            quest = "Please find the value of <sup>"+n[0]+"</sup><div class='sqrt'><span class='overline'>"+Math.pow(radic[0],n[0])+"</span></div> (The answer is between 4 and 9)";
	    eq = "<input type='number' class='mathinput' id='i0' />";
	    ans = [radic[0]];
            break;
        case 2:
        case 3:
            var n = getRandom(2, 5, 4);
            quest = "Please simplify the following expression:<br /><sup>"+n[0]+"</sup><div class='sqrt'><span class='overline'>x<sup>"+(n[0]*n[1])+"</sup>y<sup>"+(n[0]*n[2])+"</sup>z<sup>"+(n[0]*n[3])+"</sup></span></div>";
	    eq = "x<span class='supsub'><sup><input type='number' class='mathinput' id='i0' /></sup><sub></sub></span>"
		 +"y<span class='supsub'><sup><input type='number' class='mathinput' id='i1' /></sup><sub></sub></span>"
		 +"z<span class='supsub'><sup><input type='number' class='mathinput' id='i2' /></sup><sub></sub></span>";
	    ans = [n[1], n[2], n[3]];
            break;
        case 4:
        case 5:
            var n = getRandom(2, 8, 7);
            quest = "Please simplify the following expression:<br /><span style='font-size:300%'>(</span>"
			+"<span class='fraction'>"
                          +"<span class='fractop'>x<sup>"+(n[0]*n[1])+"</sup>y<sup>"+(n[0]*n[2])+"</sup>z<sup>"+(n[0]*n[3])+"</sup></span>"
			  +"<span class='fracbot'>a<sup>"+(n[0]*n[4])+"</sup>b<sup>"+(n[0]*n[5])+"</sup>c<sup>"+(n[0]*n[6])+"</sup></span>"
			+"</span>"
			+"<span style='font-size:300%'>)<sup>1/"+n[0]+"</sup></span>";
	    eq = "<span class='fraction'>"
                          +"<span class='fractop'>x<span class='supsub'><sup><input type='number' class='mathinput' id='i0' /></sup><sub></sub></span>y<span class='supsub'><sup><input type='number' class='mathinput' id='i1' /></sup><sub></sub></span>z<span class='supsub'><sup><input type='number' class='mathinput' id='i2' /></sup><sub></sub></span></span>"
			  +"<span class='fracbot'>a<span class='supsub'><sup><input type='number' class='mathinput' id='i3' /></sup><sub></sub></span>b<span class='supsub'><sup><input type='number' class='mathinput' id='i4' /></sup><sub></sub></span>c<span class='supsub'><sup><input type='number' class='mathinput' id='i5' /></sup><sub></sub></span></span>"
			+"</span>";
	    ans = [n[1], n[2], n[3], n[4], n[5], n[6]];
            break;
    }

    equationNum = 0;
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
    if(theNumber >= 0){
        return "+" + theNumber;
    }else{
        return theNumber.toString();
    }
}

var numQuestions = 6;

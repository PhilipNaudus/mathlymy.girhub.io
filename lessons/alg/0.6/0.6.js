//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["tyBiHyazMOc", "ST4Jq80MWFw", "asobS45OFJY", "ewukx8sw2D8"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    switch(questionNum)
    {
        case 2:
        case 3:
	    var vars = getRandom(1, 9, 8);
	
	    var x = new Array();	    
            x[6] = vars[0]*vars[6];
	    x[5] = (vars[0]*vars[7])+(vars[1]*vars[6]);
	    x[4] = (vars[1]*vars[7])+(vars[2]*vars[6]);
	    x[3] = (vars[2]*vars[7])+(vars[3]*vars[6]);
	    x[2] = (vars[3]*vars[7])+(vars[4]*vars[6]);
	    x[1] = (vars[4]*vars[7])+(vars[5]*vars[6]);
	    x[0] = vars[5]*vars[7];
		    
	    quest = "Please divide the polynomials using synthetic division:<br />("+((x[6]==0)?"":(x[6]+"x<sup>6</sup> + "))+((x[5]==0)?"":(x[5]+"x<sup>5</sup> + "))+((x[4]==0)?"":(x[4]+"x<sup>4</sup> + "))+((x[3]==0)?"":(x[3]+"x<sup>3</sup> + "))+((x[2]==0)?"":(x[2]+"x<sup>2</sup> + "))+((x[1]==0)?"":(x[1]+"x + "))+x[0]+") &divide; ("+vars[6]+"x + "+vars[7]+")";
	    eq = "<input type='number' class='mathinput' id='i0' />x<sup>5</sup> + <input type='number' class='mathinput' id='i1' />x<sup>4</sup> + <input type='number' class='mathinput' id='i2' />x<sup>3</sup> + <input type='number' class='mathinput' id='i3' />x<sup>2</sup> + <input type='number' class='mathinput' id='i4' />x + <input type='number' class='mathinput' id='i5' />";
	    ans = [vars[0], vars[1], vars[2], vars[3], vars[4], vars[5]];
	    equationNum = 0;
            break;
        case 0:
        case 1:
	    var vars = getRandom(1, 9, 6);
	
	    var x = new Array();
	    x[6] = vars[0];
	    x[0] = -vars[5];
	    var j = 0;
            for(var i=5; i>=1; i--)
	    {
		if((Math.round(Math.random())==0)?false:true)
		{
		   vars[j] = vars[j+1];
		}
	        x[i] = vars[j+1] - vars[j];
		j++;
	    }

	    x[5] = vars[1]-vars[0];
	    x[4] = vars[2]-vars[1];
	    x[3] = vars[3]-vars[2];
	    x[2] = vars[4]-vars[3];
	    x[1] = vars[5]-vars[4];
		    
	    quest = "Please divide the polynomials using synthetic division:<br />("+((x[6]==0)?"":(x[6]+"x<sup>6</sup>"))+((x[5]==0)?"":(signNumber(x[5]))+"x<sup>5</sup>")+((x[4]==0)?"":(signNumber(x[4]))+"x<sup>4</sup>")+((x[3]==0)?"":(signNumber(x[3])+"x<sup>3</sup>"))+((x[2]==0)?"":(signNumber(x[2])+"x<sup>2</sup>"))+((x[1]==0)?"":(signNumber(x[1])+"x"))+signNumber(x[0])+") &divide; (x - 1)";
	    eq = "<input type='number' class='mathinput' id='i0' />x<sup>5</sup> + <input type='number' class='mathinput' id='i1' />x<sup>4</sup> + <input type='number' class='mathinput' id='i2' />x<sup>3</sup> + <input type='number' class='mathinput' id='i3' />x<sup>2</sup> + <input type='number' class='mathinput' id='i4' />x + <input type='number' class='mathinput' id='i5' />";
	    ans = [vars[0], vars[1], vars[2], vars[3], vars[4], vars[5]];
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
    if(theNumber >= 0){
        return " + " + theNumber;
    }else{
        return " - " + Math.abs(theNumber);
    }
}

var numQuestions = 4;

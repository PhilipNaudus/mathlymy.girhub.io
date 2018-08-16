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
	    var vars = getRandom(2, 9, 5);
            quest = "Please reduce the rational expression to lowest terms:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[0]*vars[1])+"x + "+(vars[0]*vars[2])+"</span>"
		       +"<span class='fracbot'>"+(vars[1]*vars[3])+"x<sup>2</sup> + "+((vars[2]*vars[3])+(vars[1]*vars[4]))+"x + "+(vars[2]*vars[4])+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'><input type='number' class='mathinput' id='i0' /></span>"
		       +"<span class='fracbot'><input type='number' class='mathinput' id='i1' />x + <input type='number' class='mathinput' id='i2' /></span>"
		   +"</span>";
	    ans = [[vars[0], vars[3], vars[4]]];
            break;
        case 1:
	    var vars = getRandom(2, 9, 5);
            quest = "Please reduce the rational expression to lowest terms:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[1]*vars[3])+"x<sup>2</sup> + "+((vars[2]*vars[3])+(vars[1]*vars[4]))+"x + "+(vars[2]*vars[4])+"</span>"
		       +"<span class='fracbot'>"+(vars[0]*vars[1])+"x + "+(vars[0]*vars[2])+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'><input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' /></span>"
		       +"<span class='fracbot'><input type='number' class='mathinput' id='i2' /></span>"
		   +"</span>";
	    ans = [[vars[3], vars[4], vars[0]]];
            break;
        case 2:
        case 3:
	    var vars = getRandom(2, 9, 5, [8]);
            quest = "Please reduce the rational expression to lowest terms:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[0]*vars[2])+"x<sup>2</sup> + "+((vars[1]*vars[2])+(vars[0]*vars[3]))+"x + "+(vars[1]*vars[3])+"</span>"
		       +"<span class='fracbot'>"+(vars[0]*vars[4])+"x<sup>2</sup> + "+((vars[1]*vars[4])+(vars[0]*vars[5]))+"x + "+(vars[1]*vars[5])+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'><input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' /></span>"
		       +"<span class='fracbot'><input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' /></span>"
		   +"</span>";
	    ans = [[vars[2], vars[3], vars[4], vars[5]]];
            break;
        case 4:
        case 5:
	    var vars = getRandom(11, 29, 10, [19, 20, 21, 22, 24, 26, 28]);
            quest = "Please perform the indicated operation and simplify the result:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[0]*vars[2])+"x<sup>2</sup> + "+((vars[1]*vars[2])+(vars[0]*vars[3]))+"x + "+(vars[1]*vars[3])+"</span>"
		       +"<span class='fracbot'>"+vars[6]+"x + "+vars[7]+"</span>"
		   +"</span> &times;"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+vars[8]+"x + "+vars[9]+"</span>"
		       +"<span class='fracbot'>"+(vars[0]*vars[4])+"x<sup>2</sup> + "+((vars[1]*vars[4])+(vars[0]*vars[5]))+"x + "+(vars[1]*vars[5])+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'>(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />)(<input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)</span>"
		       +"<span class='fracbot'>(<input type='number' class='mathinput' id='i4' />x + <input type='number' class='mathinput' id='i5' />)(<input type='number' class='mathinput' id='i6' />x + <input type='number' class='mathinput' id='i7' />)</span>"
		   +"</span>";
	    ans = [[vars[2], vars[3], vars[8], vars[9], vars[4], vars[5], vars[6], vars[7]],
		   [vars[8], vars[9], vars[2], vars[3], vars[4], vars[5], vars[6], vars[7]],
		   [vars[2], vars[3], vars[8], vars[9], vars[6], vars[7], vars[4], vars[5]],
		   [vars[8], vars[9], vars[2], vars[3], vars[6], vars[7], vars[4], vars[5]]];
            break;
        case 6:
        case 7:
	    var vars = getRandom(11, 29, 10, [19, 20, 21, 22, 24, 26, 28]);
            quest = "Please perform the indicated operation and simplify the result:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[0]*vars[2])+"x<sup>2</sup> + "+((vars[1]*vars[2])+(vars[0]*vars[3]))+"x + "+(vars[1]*vars[3])+"</span>"
		       +"<span class='fracbot'>"+vars[6]+"x + "+vars[7]+"</span>"
		   +"</span> &divide;"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+(vars[0]*vars[4])+"x<sup>2</sup> + "+((vars[1]*vars[4])+(vars[0]*vars[5]))+"x + "+(vars[1]*vars[5])+"</span>"
		       +"<span class='fracbot'>"+vars[8]+"x + "+vars[9]+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'>(<input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' />)(<input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' />)</span>"
		       +"<span class='fracbot'>(<input type='number' class='mathinput' id='i4' />x + <input type='number' class='mathinput' id='i5' />)(<input type='number' class='mathinput' id='i6' />x + <input type='number' class='mathinput' id='i7' />)</span>"
		   +"</span>";
	    ans = [[vars[2], vars[3], vars[8], vars[9], vars[4], vars[5], vars[6], vars[7]],
		   [vars[8], vars[9], vars[2], vars[3], vars[4], vars[5], vars[6], vars[7]],
		   [vars[2], vars[3], vars[8], vars[9], vars[6], vars[7], vars[4], vars[5]],
		   [vars[8], vars[9], vars[2], vars[3], vars[6], vars[7], vars[4], vars[5]]];
            break;
        case 8:
	    var vars = getRandom(2, 9, 6);
            quest = "Please perform the indicated operation and simplify the result:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+vars[0]+"x + "+vars[1]+"</span>"
		       +"<span class='fracbot'>"+vars[2]+"x + "+vars[3]+"</span>"
		   +"</span> +"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+vars[4]+"x + "+vars[5]+"</span>"
		       +"<span class='fracbot'>"+vars[2]+"x + "+vars[3]+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'><input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' /></span>"
		       +"<span class='fracbot'><input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' /></span>"
		   +"</span>";
	    ans = [[(vars[0]+vars[4]), (vars[1]+vars[5]), vars[2], vars[3]]];
        case 9:
	    var vars = getRandom(2, 9, 6);
            quest = "Please perform the indicated operation and simplify the result:<br />"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+vars[0]+"x + "+vars[1]+"</span>"
		       +"<span class='fracbot'>"+vars[2]+"x + "+vars[3]+"</span>"
		   +"</span> -"
		   +"<span class='fraction'>"
		       +"<span class='fractop'>"+vars[4]+"x + "+vars[5]+"</span>"
		       +"<span class='fracbot'>"+vars[2]+"x + "+vars[3]+"</span>"
		   +"</span>";
	    eq = "<span class='fraction'>"
		       +"<span class='fractop'><input type='number' class='mathinput' id='i0' />x + <input type='number' class='mathinput' id='i1' /></span>"
		       +"<span class='fracbot'><input type='number' class='mathinput' id='i2' />x + <input type='number' class='mathinput' id='i3' /></span>"
		   +"</span>";
	    ans = [[(vars[0]-vars[4]), (vars[1]-vars[5]), vars[2], vars[3]]];
            break;
    }

    equationNum = 0;
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest;
    equations = [["", eq, ans]];
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

var numQuestions = 10;

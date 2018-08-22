//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["TuBJ7l4qYJ0", "5_DNMtXnNxE"];

function setQuestion()
{
    var ans;
    var vars = getRandom(1, 9, 5);
    switch(questionNum)
    {
        case 0:
	    equationNum = 0;
	    break;
        case 1:
	    vars[1] = vars[1]*(Math.round(Math.random())==0)?-1:1;
	    vars[2] = vars[2]*(Math.round(Math.random())==0)?-1:1;
	    equationNum = 1;
	    break;
    }
    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": Please fill in the steps to solve the equation while giving reasons for each step.";
    options = "<option value=''>Select</option><option value='Addition Property of Equality'>Addition Property of Equality</option><option value='Subtraction Property of Equality'>Subtraction Property of Equality</option><option value='Multiplication Property of Equality'>Multiplication Property of Equality</option><option value='Division Property of Equality'>Division Property of Equality</option><option value='Distributive Property'>Distributive Property</option>";

    equations = [["", "<table border='0'><tr><td>"+(-vars[0]+vars[1])+"x</td><td>-"+vars[2]+"</td><td>=</td><td>"+vars[1]+"x</td><td>"+signNumber((vars[0]*vars[3])-vars[2])+"</td><td>&nbsp;&nbsp;&nbsp;</td><td><b>Given</b></td></tr>"

	              +"<tr><td><input type='text' class='mathinput' id='i0' /></td><td></td><td></td><td><input type='text' class='mathinput' id='i1' /></td><td></td><td></td><td><select class='mathinput' id='i2'>"+options+"</select></td></tr>"

		      +"<tr><td>-"+vars[0]+"x</td><td>-"+vars[2]+"</td><td>=</td><td></td><td>"+signNumber((vars[0]*vars[3])-vars[2])+"</td></tr>"

	              +"<tr><td></td><td><input type='text' class='mathinput' id='i3' /></td><td></td><td></td><td><input type='text' class='mathinput' id='i4' /></td><td></td><td><select class='mathinput' id='i5'>"+options+"</select></td></tr>"

		      +"<tr><td>-"+vars[0]+"x</td><td></td><td>=</td><td></td><td>+"+(vars[0]*vars[3])+"</td></tr>"

	              +"<tr><td>&divide;<input type='text' class='mathinput' id='i6' /></td><td></td><td></td><td></td><td>&divide;<input type='text' class='mathinput' id='i7' /></td><td></td><td><select class='mathinput' id='i8'>"+options+"</select></td></tr>"

		      +"<tr><td>x</td><td></td><td>=</td><td></td><td><input type='text' class='mathinput' id='i9' /></td></tr>"
		      +"</table>",

	              [["-"+vars[1]+"x", "-"+vars[1]+"x", "Subtraction Property of Equality", "+"+vars[2], "+"+vars[2], "Addition Property of Equality", "-"+vars[0], "-"+vars[0], "Division Property of Equality", "-"+vars[3]]]],

		      /** Begin equation #2 **/

		      ["", "<table border='0'><tr><td>("+(vars[0]+vars[1])+"x </td><td>"+signNumber(vars[2])+")"+vars[3]+"</td><td> =</td><td>"+(vars[1]*vars[3])+"x </td><td>"+signNumber((vars[0]*vars[3]*vars[4])+(vars[2]*vars[3]))+"</td><td>&nbsp;&nbsp;&nbsp;</td><td><b>Given</b></td></tr>"

			+"<tr><td>"+((vars[0]*vars[3])+(vars[1]*vars[3]))+"x</td><td>"+signNumber(vars[2]*vars[3])+"</td><td>=</td><td>"+(vars[1]*vars[3])+"x</td><td>"+signNumber((vars[0]*vars[3]*vars[4])+(vars[2]*vars[3]))+"</td><td></td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
			+"<tr><td><input type='text' class='mathinput' id='i1' /></td><td></td><td>=</td><td><input type='text' class='mathinput' id='i2' /></td><td></td><td></td><td><select class='mathinput' id='i3'>"+options+"</select></td></tr>"

			+"<tr><td>"+(vars[0]*vars[3])+"x</td><td>"+signNumber(vars[2]*vars[3])+"</td><td>=</td><td></td><td>"+((vars[0]*vars[3]*vars[4])+(vars[2]*vars[3]))+"</td></tr>"
			+"<tr><td></td><td><input type='text' class='mathinput' id='i4' /></td><td>=</td><td></td><td><input type='text' class='mathinput' id='i5' /></td><td></td><td><select class='mathinput' id='i6'>"+options+"</select></td></tr>"

			+"<tr><td>"+(vars[0]*vars[3])+"x</td><td></td><td>=</td><td></td><td>"+(vars[0]*vars[3]*vars[4])+"</td></tr>"
			+"<tr><td>&divide;<input type='text' class='mathinput' id='i7' /></td><td></td><td>=</td><td></td><td>&divide;<input type='text' class='mathinput' id='i8' /></td><td></td><td><select class='mathinput' id='i9'>"+options+"</select></td></tr>"

			+"<tr><td>x</td><td></td><td>=</td><td></td><td><input type='text' class='mathinput' id='i10' /></td></tr></table>", [["Distributive Property", signNumber(-vars[1]*vars[3])+"x", signNumber(-vars[1]*vars[3])+"x", addOrSub(-vars[1]*vars[3]), signNumber(-vars[2]*vars[3]), signNumber(-vars[2]*vars[3]), addOrSub(-vars[2]*vars[3]), (vars[0]*vars[3]), (vars[0]*vars[3]), "Division Property of Equality", vars[4]]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];
    /*document.getElementById('i2').style.width = '22em';
    document.getElementById('i5').style.width = '22em';
    document.getElementById('i8').style.width = '22em';*/
	
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

function addOrSub(num)
{
	return (num>0)?"Addition Property of Equality":"Subtraction Property of Equality";

}

var numQuestions = 2;

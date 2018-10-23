//var steps = ["Step 1: Select the best equation", "Step 2: Enter numbers into the equation"];
var videos = ["-ipi4voo86I", "SBUmnWfwAOQ", "-ipi4voo86I", "SBUmnWfwAOQ", "-ipi4voo86I"];

function setQuestion()
{
    var quest;
    var ans;
    var eq;
    switch(questionNum)
    {
        case 0:
		quest = "How do you know that the two triangles shown below are congruent?<br /><img src='/lessons/geo/4.2/congruentTriangles.jpg' />";
		options = "<option value=''>Select</option><option value='< E'>&angle; E</option><option value='< D'>&angle; D</option><option value='< F'>&angle; F</option><option value='E F'>EF</option><option value='D F'>D F</option><option value='E D'>E D</option>";
		eq = "&angle A &cong; <select class='mathinput' id='i0'>"+options+"</select>"
			+= "&angle B &cong; <select class='mathinput' id='i1'>"+options+"</select>"
			+= "&angle C &cong; <select class='mathinput' id='i2'>"+options+"</select>"
			+= "<span style='text-decoration:overline'>AB</span> &cong; <select class='mathinput' id='i2'>"+options+"</select>"
			+= "<span style='text-decoration:overline'>BC</span> &cong; <select class='mathinput' id='i2'>"+options+"</select>"
			+= "<span style='text-decoration:overline'>AC</span> &cong; <select class='mathinput' id='i2'>"+options+"</select>";
		ans = ["< D", "< E", "< F", "E D", "E F", "D F"];
		break;
        case 1:
	    var vars = getRandom(10, 89, 2);
		quest = "&angle; A = "+vars[0]+"&deg; and &angle; B = "+vars[1]+"&deg;. Please refer to the diagram below to determine the value of &angle;F.<br /><img src='/lessons/geo/4.2/congruentTriangles.jpg' />";
		eq += "<input type='number' class='mathinput' id='i0' />";
		ans = [180-vars[0]-vars[1]];
		break;
        case 2:
		quest = "Prove that the two triangles shown below are congruent<br /><img src='/lessons/geo/4.2/congruentTriangles2.jpg' />";
		options = "<option value=''>Select</option><option value='Given'>Given</option><option value='Third angles theorem (If two angles are congruent, the third angle is also congruent)'>Third angles theorem (If two angles are congruent, the third angle is also congruent)</option><option value='Definition of congruent figures (all sides and angles are congruent)'>Definition of congruent figures (all sides and angles are congruent)</option>";
		eq = "<table border='0'><tr><td>&ang;A &cong; &ang;D</td><td>&nbsp;&nbsp;&nbsp;</td><td><select class='mathinput' id='i0'>"+options+"</select></td></tr>"
		    +"<tr><td>&ang;B &cong; &ang;E</td><td></td><td><select class='mathinput' id='i1'>"+options+"</select></td></tr>"
		    +"<tr><td>&ang;C &cong; &ang;F</td><td></td><td><select class='mathinput' id='i2'>"+options+"</select></td></tr>"
		    +"<tr><td><span style='text-decoration:overline'>AB</span> &cong; <span style='text-decoration:overline'>DE</span></td><td></td><td><select class='mathinput' id='i3'>"+options+"</select></td></tr>"
		    +"<tr><td><span style='text-decoration:overline'>BC</span> &cong; <span style='text-decoration:overline'>EF</span></td><td></td><td><select class='mathinput' id='i4'>"+options+"</select></td></tr>"
		    +"<tr><td><span style='text-decoration:overline'>AC</span> &cong; <span style='text-decoration:overline'>DF</span></td><td></td><td><select class='mathinput' id='i5'>"+options+"</select></td></tr>"
		    +"<tr><td>&#9651; ABC &cong; &#9651; DEF</td><td></td><td><select class='mathinput' id='i6'>"+options+"</select></td></tr></table>"
		ans = ["Given", "Given", "Third angles theorem (If two angles are congruent, the third angle is also congruent)", "Given", "Given", "Given", "Definition of congruent figures (all sides and angles are congruent)"]
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

function unique(x) {
  return x.filter(function(elem, index) { return x.indexOf(elem) === index; });
};

function union(x, y) {
  return unique(x.concat(y));
};


var numQuestions = 6;

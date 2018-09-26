var ans;
var sideVids = ["a", "a", "a"];
var angleVids = ["b", "b", "b", "b"];
var side = shuffle([0, 1, 2]);
var angle = shuffle([3, 4, 5, 6]);

var videos = new Array();
for(var i=0; i<5; i++) videos.push(sideVideos[side[i]]);
for(var i=0; i<5; i++) videos.push(angleVideos[angle[i]]);

function setQuestion()
{
    var pos = [[0,0],[1,0.5],[2,0],[3,1],[1,2]];
    var ifRigid;


    if(questionNum<3)
    {
	    quest = "Is the triangle shown below scalene, isosceles, or equilateral?";
	    options = "<option value=''>Select</option><option value='Scalene Triangle'>Scalene Triangle</option><option value='Isosceles Triangle'>Isosceles Triangle</option><option value='Equilateral Triangle'>Equilateral Triangle</option>";
    } else
    {
	    quest = "Is the triangle shown below acute, right, obtuse, or equiangular?";
	    options = "<option value=''>Select</option><option value='Acute Triangle'>Acute Triangle</option><option value='Right Triangle'>Right Triangle</option><option value='Obtuse Triangle'>Obtuse Triangle</option><option value='Equiangular Triangle'>Equiangular Triangle</option>";
    }


    switch(questionNum)
    {
	    case side[0]:
		    img = "00.png";
		    ans = "Scalene Triangle";
		    break;
	    case side[1]:
		    img = "01.png";
		    ans = "Isosceles Triangle";
		    break;
	    case side[2]:
		    img = "02.png";
		    ans = "Equilateral Triangle";
		    break;
	    case angle[0]:
		    img = "10.png";
		    ans = "Acute Triangle";
		    break;
	    case angle[1]:
		    img = "11.png";
		    ans = "Right Triangle";
		    break;
	    case angle[2]:
		    img = "12.png";
		    ans = "Obtuse Triangle";
		    break;
	    case angle[2]:
		    img = "13.png";
		    ans = "Equiangular Triangle";
		    break;
    }

    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest+"<br /><img src='/lessons/geo/4.1/"+img+"' />";

    equations = [["", "<select class='mathinput' id='i0'>"+options+"</select>", [[ans]]]];
}

function step1(ifResetScrolling)
{
    endLoading();
    currentStep = 2;

    document.getElementById("step").innerHTML = "";
    document.getElementById("math").innerHTML = equations[equationNum][1];

    if(questionNum<10)
    {
	    document.getElementById("i1").style.visibility = "hidden";
	    document.getElementById("i2").style.visibility = "hidden";
    }

    addInputEventListeners();

    if(ifResetScrolling) window.scrollTo(0, 0);
    enableDisableButtons();
}

function changeSelect()
{
	switch(document.getElementById("i0").value)
	{
		case "Translation":
			document.getElementById("exp1").innerHTML = "";
			document.getElementById("exp2").innerHTML = "units in the X direction and ";
			document.getElementById("exp3").innerHTML = "units in the Y direction";
			document.getElementById("i1").style.visibility = "visible";
			document.getElementById("i2").style.visibility = "visible";
			break;
		case "Reflection":
			document.getElementById("exp1").innerHTML = "about the";
			document.getElementById("exp2").innerHTML = "axis";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i1").style.visibility = "visible";
			document.getElementById("i2").style.visibility = "hidden";
			break;
		case "Rotation":
			document.getElementById("exp1").innerHTML = "of";
			document.getElementById("exp2").innerHTML = "degrees";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i1").style.visibility = "visible";
			document.getElementById("i2").style.visibility = "hidden";
			break;
		case "Enlargement":
			document.getElementById("exp1").innerHTML = "by a factor of";
			document.getElementById("exp2").innerHTML = "";
			document.getElementById("exp3").innerHTML = "";
			document.getElementById("i1").style.visibility = "visible";
			document.getElementById("i2").style.visibility = "hidden";
			break;
	}
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

function translate(pos, x, y)
{
	return [[pos[0][0]+x, pos[0][1]+y], [pos[1][0]+x, pos[1][1]+y], [pos[2][0]+x, pos[2][1]+y], [pos[3][0]+x, pos[3][1]+y], [pos[4][0]+x, pos[4][1]+y]];
}

function reflectX(pos)
{
	return [[pos[0][0], -pos[0][1]], [pos[1][0], -pos[1][1]], [pos[2][0], -pos[2][1]], [pos[3][0], -pos[3][1]], [pos[4][0], -pos[4][1]]];
}

function reflectY(pos)
{
	return [[-pos[0][0], pos[0][1]], [-pos[1][0], pos[1][1]], [-pos[2][0], pos[2][1]], [-pos[3][0], pos[3][1]], [-pos[4][0], pos[4][1]]];
}

function rotate(pos, angle)
{
	return [[(pos[0][0]*Math.cos(angle))+(pos[0][1]*Math.sin(angle)), (-pos[0][0]*Math.sin(angle))+(pos[1][1]*Math.cos(angle))], [(pos[1][0]*Math.cos(angle))+(pos[1][1]*Math.sin(angle)), (-pos[1][0]*Math.sin(angle))+(pos[1][1]*Math.cos(angle))],[(pos[2][0]*Math.cos(angle))+(pos[2][1]*Math.sin(angle)), (-pos[2][0]*Math.sin(angle))+(pos[2][1]*Math.cos(angle))],[(pos[3][0]*Math.cos(angle))+(pos[3][1]*Math.sin(angle)), (-pos[3][0]*Math.sin(angle))+(pos[3][1]*Math.cos(angle))],[(pos[4][0]*Math.cos(angle))+(pos[4][1]*Math.sin(angle)), (-pos[4][0]*Math.sin(angle))+(pos[4][1]*Math.cos(angle))]];
}

function enlarge(pos, factor)
{
	return [[factor*pos[0][0], factor*pos[0][1]], [factor*pos[1][0], factor*pos[1][1]], [factor*pos[2][0], factor*pos[2][1]], [factor*pos[3][0], factor*pos[3][1]], [factor*pos[4][0], factor*pos[4][1]]];
}

var numQuestions = 10;

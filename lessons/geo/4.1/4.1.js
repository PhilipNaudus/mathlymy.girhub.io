var ans;
var sideVideos = ["a", "a", "a"];
var angleVideos = ["b", "b", "b", "b"];
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
	    case angle[3]:
		    img = "13.png";
		    ans = "Equiangular Triangle";
		    break;
    }

    if(questionNum > 7)
    {
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": "+quest+"<br /><img style='width: 100px; height: auto;' src='/lessons/geo/4.1/"+img+"' />";
	    equationNum = 0;
    } else if(false)
    {
	    var w = Math.min(window.innerWidth, window.innerHeight, 400);
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the sum of angles x, y, and z?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
	    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
	    addText([-2, -1.5], 'x');
	    addText([2, -1.5], 'y');
	    addText([0, 1.5], 'z');
	    plotData([-3, 3], [-2, -2]);
	    plotData([3, 0], [-2, 2]);
	    plotData([0, -3], [2, -2]);

	    ans = 180;
	    equationNum = 1;
    } else
    {
	    var w = Math.min(window.innerWidth, window.innerHeight, 400);
	    var angles = getRandom(10,80,2);
	    var obtuse = getRandom(100,170,1);
	    document.getElementById("question").innerHTML = "Question "+(questionNum+1)+": What is the value of x?<br /><canvas id='canvas' height='"+w+"' width='"+w+"'></canvas>";
	    initCanvas([-5, 5], 1, [-5, 5], 1, ["", ""]);
	    addText([-2, -1.5], acute[0]);
	    addText([0, 1.5], 'x');
	    addText([3.5, -1.5], obtuse[0]);
	    plotData([-3, 5], [-2, -2]);
	    plotData([3, 0], [-2, 2]);
	    plotData([0, -3], [2, -2]);

	    ans = ;
	    equationNum = 1;
    }

    equations = [["", "<select class='mathinput' id='i0'>"+options+"</select>", [[ans]]],
	         ["", "<input class='mathinput' type='number' id='i0' />", [[ans]]]];
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

var numQuestions = 10;

var vars = new Array();
var questionNum, equationNum, equations, practice, currentStep, numCorrectQuestions;
var helpMouseover = false; // This is a hack for iPhones, which don't support click events.
var backMouseover = false; // Instead, we'll have three submit buttons and use hover events to tell them apart.

var ifPractice = 0;        // Did the student take a practice test before taking the quiz?
var ifEnableHints = false; // Did the student begin taking a quiz and then exit by enabling hints?

function quiz(inPractice)
{
    practice = inPractice;
    numCorrectQuestions = 0;

    initInterface();
    document.getElementById("quizFrame").style.display = "inline";

    if(practice)
    {
        swal("You are about to begin a practice problem set", "This is only to help you practice and will not affect your grade.", "info");
        ifPractice = 1;
    } else
    {
        swal("You are about to begin a graded quiz", "Your score will be recorded. Please do your best!", "info");
    }

    questionNum = 0;
    setQuestion();
    goToStep1();
}

// Call the step1 function, which would have been defined in the
// JS which was loaded separately. If the JS hasn't been loaded yet,
// Wait a second and try again.
function goToStep1()
{
    try
    {
        step1(true);
    } catch(e)
    {
        setTimeout(function(){ step1(true); }, 1000);
    }
}

function submitAnswer()
{
    var slns = testAllSolutions(true);
    studentSln = slns[0];
    testSln = slns[1];

    if(testSln==equations[equationNum][2][studentSln].length)
    {
        swal("Good job!", "You got this problem right!", "success")
            .then(function(value) {
                numCorrectQuestions++;
                nextQuestion();
            });
    } else
    {
        if(practice)
        {
            swal("Wrong answer", "Please try again", "error");
        } else
        {
            swal({title: "Wrong answer",
                 text: "Sorry, that is not the right answer. What would you like to do?",
                 icon: "error",
                 buttons: {
                    next: {
                        text: "Mark this question as wrong and move on to the next question",
                        value: "next"
                    },
                    enableHints: {
                        text: "Enable hints for this problem",
                        value: "enableHints"
                    }
                 }
            })
            .then(function(value) {
                switch (value) {
                    case "next":
                        nextQuestion();
                        break;

                    case "enableHints":
                        enableHints();
                        break;

                    default:
                        submitAnswer();
                }
            });
        }
    }
}

// This is a hack for iPhones, which don't support click events.
// Instead, we'll have two submit buttons and use hover events to tell them apart.
function backOrSubmitOrHelp()
{
    setTimeout(function()
            {
                if(helpMouseover) help();
                else if(backMouseover) eval("step"+(currentStep-1)+"(false);");
                else submitAnswer();
                helpMouseover = false;
                backMouseover = false;
            }, 50);
}

function nextQuestion()
{
    if(ifEnableHints)
    {
        swal({title: "Moving on",
            text: "What would you like to do now?",
            icon: "info",
            buttons: {
                video: {
                    text: "Go back and watch the video",
                    value: "video",
                },
                practice: {
                    text: "I still need some more practice",
                    value: "practice",
                },
                quiz: {
                    text: "I'm ready to take the quiz again",
                    value: "quiz",
                },
            },
        })
        .then(function(value) {
            switch (value) {
                case "video":
                    ifEnableHints = false;
                    startVideo();
                    break;

                case "practice":
                    ifEnableHints = false;
                    quiz(true);
                    break;

                case "quiz":
                    ifEnableHints = false;
                    quiz(false);
                    break;

                default:
                    nextQuestion();
            }
        });
    } else
    {
        questionNum++;
        if(questionNum < numQuestions)
        {
            setQuestion();
            step1(true);
        } else
        {
            if(practice)
            {
                swal({title: "Moving on",
                  text: "You have finished with this practice set! What would you like to do next?",
                  icon: "info",
                  buttons: {
                    video: {
                      text: "Go back and watch the video",
                      value: "video",
                    },
                    practice: {
                      text: "I still need some more practice",
                      value: "practice",
                    },
                    quiz: {
                      text: "I'm ready to take the quiz",
                      value: "quiz",
                    },
                  },
                })
                .then(function(value) {
                  switch (value) {
                    case "video":
                      startVideo();
                      break;
                 
                    case "practice":
                      quiz(true);
                      break;

                    case "quiz":
                      quiz(false);
                      break;
                  }
                });
            } else
            {
                var score = 100*numCorrectQuestions/numQuestions;

                // Report the score
                loadJS("https://script.google.com/macros/s/AKfycbxsI_zUqE78ybmlgVr8trCaq5GM61oIA_cXN4U35mR3M3w2fRY/exec?student="+encodeURIComponent(document.getElementById("name").value)+"&course="+course+"&lessonId="+lessonId+"&score="+score+"&ifVideo="+ifVideo+"&ifPractice="+ifPractice+"&ifCanvas="+ifCanvas);

                if(score==100)
                {
                    swal("Perfect score!", "Your score has been recorded. Great job!", "info");
                } else
                {
                    swal({title: "You have finished the quiz",
                      text: "Your score is "+score+"%. What would you like to do?",
                      icon: "info",
                      buttons: {
                        keep: {
                          text: "Keep this score",
                          value: "keep"
                        },
                        quiz: {
                          text: "Take the quiz again",
                          value: "quiz"
                        },
                        video: {
                          text: "Go back and watch the video",
                          value: "video"
                        },
                        practice: {
                          text: "I need some more practice",
                          value: "hint"
                        }
                      }
                    })
                    .then(function(value) {
                      switch (value) {
                        case "keep":
                          completed();
                          break;
                        case "video":
                          startVideo();
                          break;
                     
                        case "practice":
                          quiz(true);
                          break;

                        case "quiz":
                          quiz(false);
                          break;

                        default:
                          nextQuestion();
                      }
                    });
                }
            }
        }
    }
}

function checkChanged(changed)
{
    var charWidth = (changed.parentElement.tagName.toLowerCase()=="sup" || changed.parentElement.tagName.toLowerCase()=="sub")?1:0.8;
    if(changed.value.length>0) changed.style.width = (charWidth*changed.value.length)+"em";

    if(practice)
    {
        if(changed.value=="") { changed.style.backgroundColor = ""; return false; }

        testAllSolutions(false);
    }
}

function testSolution(i, ifFinal)
{
    var ans, inValue, input;
    var numBlank = 0;
    var numCorrect = 0;
    for(var j=0; j<equations[equationNum][2][i].length; j++)
    {
        input = document.getElementById('i'+j);
        inValue = input.value;
        if(inValue === "")
        {
            numBlank++;
            continue;
        }

        inValue = inValue;

        ans = equations[equationNum][2][i][j]
        if(inValue==ans)
        {
            input.style.backgroundColor = "#00ff00";
            numCorrect++;
        } else if(!ifFinal && (inValue == ans.substring(0,Math.min(inValue.length,ans.length))))
        {
            input.style.backgroundColor = "";
            numCorrect += 0.5;
        } else
        {
            input.style.backgroundColor = "#ff0000";
        }
    }

    return numCorrect;
}

function testAllSolutions(ifFinal)
{
    var studentSolution;
    var numCorrect = new Array();
    for(var i=0; i<equations[equationNum][2].length; i++)
    {
        numCorrect[i] = testSolution(i, ifFinal);
    }
    studentSolution = indexOfMax(numCorrect);

    return [studentSolution, testSolution(studentSolution, ifFinal)];
}

function addInputEventListeners()
{
    var inputs = document.getElementsByClassName("mathinput");
    for(var i=0; i<inputs.length; i++)
    {
        inputs[i].addEventListener(
                "input",
                function() { checkChanged(this); },
                false
                );
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function getRandom(min, max, n)
{
    var rand;
    var vars = new Array();
    for(var i=0; i<n; i++)
    {
        do
        {
            rand = Math.round(Math.random()*(max-min)+min);
        } while(i>0 && vars.indexOf(rand) > -1);
        vars[i] = rand;
    }

    return vars;
}

function findFirstDiffPos(a, b)
{
    var shorterLength = Math.min(a.length, b.length);

    for (var i = 0; i < shorterLength; i++)
    {
        if (a[i] !== b[i]) return i;
    }

    if (a.length !== b.length) return shorterLength;
}

function help()
{
    if(practice)
    {
        swal({title: "Help is on the way",
          text: "What would you like to do?",
          icon: "info",
          buttons: {
            video: {
              text: "Go back and watch the video",
              value: "video",
            },
            hint: {
              text: "Give me a hint",
              value: "hint",
            },
            cancel: true
          }
        })
        .then(function(value) {
          switch (value) {
            case "video":
              startVideo();
              break;
         
            case "hint":
              giveHint();
              break;
          }
        });
    } else
    {
        swal({title: "Help is on the way",
          text: "What would you like to do?",
          icon: "info",
          buttons: {
            video: {
              text: "Go back and watch the video",
              value: "video"
            },
            enableHints: {
              text: "Enable hints for this problem",
              value: "enableHints"
            },
            cancel: true
          }
        })
        .then(function(value) {
          switch (value) {
            case "video":
              startVideo();
              break;
         
            case "enableHints":
              enableHints();
              break;
          }
        });
    }
}

function enableHints()
{
    swal({
        title: "WARNING",
        text: "If you enable hints for this problem, you will not receive a grade for this quiz. You will have to retake the quiz later when you feel ready. Are you sure you want to do this?",
        icon: "warning",
        buttons: true,
        dangerMode: true
        })
    .then((proceed) => {
        if (proceed) {
            ifEnableHints = true;
            practice = true;
            step1(false);
        }
    });
}

function enableDisableButtons()
{
    if(practice)
    {
        document.getElementById("back").style.display = "inline";
        if(currentStep==1)
        {
            document.getElementById("back").disabled = true;
            document.getElementById("back").style.opacity = 0.2;
            document.getElementById("back").style.filter= "alpha(opacity=20)";

            document.getElementById("submit").disabled = true;
            document.getElementById("submit").style.opacity = 0.2;
            document.getElementById("submit").style.filter= "alpha(opacity=20)";
        } else
        {
            document.getElementById("back").disabled = false;
            document.getElementById("back").style.opacity = 1.0;
            document.getElementById("back").style.filter= "alpha(opacity=50)";

            document.getElementById("submit").disabled = false;
            document.getElementById("submit").style.opacity = 1.0;
            document.getElementById("submit").style.filter= "alpha(opacity=100)";
        }
    } else
    {
        document.getElementById("back").style.display = "none";
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").style.opacity = 1.0;
        document.getElementById("submit").style.filter= "alpha(opacity=100)";
    }
}



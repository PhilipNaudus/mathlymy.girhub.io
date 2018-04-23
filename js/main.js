var lessons = {"alg1": {"1.1": ["92aLiyeQj0w", "Distance Formula", 1],
                        "1.2": ["dw41PMWek6U", "Title A2", 1],
                        "1.3": ["dw41PMWek6U", "Title A3", 1],
                        "name": ['a', "Algebra 1"]}, 
              "alg2": {"1.1": ["_7aUxFzTG5w", "TITLE B1", 1],
                       "name": ['b', "Algebra 2"]}, 
              "precalc": {"1.1": ["H-E5rlpCVu4", "TITLE P1", 1],
                       "name": ['p', "Precalculus"]}, 
              "calc": {"1.1": ["Ld7Vxb5XV6A", "TITLE C1", 1],
                       "name": ['c', "Calculus"]}};

var course = "";
var lessonId = "";
var ifStudent = true;
var name, password;
var ifCanvas = isCanvasSupported()?1:0;   // Does the user's browser support canvas?
function initLesson(autoSubmit)
{
    var lessons;

    if(!!document.getElementById("name"))
    {
        // If the user is selecting their name from the dropdown menu
        name = document.getElementById("name").value;
        password = document.getElementById("password").value.hashCode();

        if(name!=="")
        {
            // Verify the name / password combination
            loadJS("google", "?course="+course+"&student="+name+"&password="+password+(ifStudent?"&studentLogin=1":"&parentLogin=1"));
        } else if(!autoSubmit)
        {
            swal("You forgot to select your name", "Please select your name", "warning");
            return false;
        }

        if (typeof(Storage) !== "undefined")
        {
            localStorage.setItem("thisStudent", name)
        }
    } else
    {
        // If the user is logging in as a guest and typing in their name
        document.getElementById("gradesLi").style.visibility = "hidden";
        document.getElementById("passwordLi").style.visibility = "hidden";
        name = document.getElementById("guestName").value;
        password = "guest";

        if(name!=="")
        {
            login(true);
        } else if(!autoSubmit)
        {
            swal("You forgot to enter your name", "Please enter your name", "warning");
            return false;
        }
    }

    if((name=="select" || name=="") && !autoSubmit)
    {
        swal("You forgot to select your name", "Please enter your name", "warning");
    }
}

function login(success)
{
    endLoading();

    if(success)
    {
        initInterface();
        if(!ifStudent)
        {
            document.getElementById("practiceLi").style.visibility = "hidden";
            document.getElementById("quizLi").style.visibility = "hidden";
            initGrades();
        } else if (lessonId == "")
        {
            document.getElementById("promptSelect").style.display = "inline";
            document.getElementById("practiceLi").style.visibility = "hidden";
            document.getElementById("quizLi").style.visibility = "hidden";
        } else
        {
            document.getElementById("practiceLi").style.visibility = "visible";
            document.getElementById("quizLi").style.visibility = "visible";

            // Load the JS corresponding to this lesson
            loadJS("/", "lessons/"+course+"/"+lessonId+"/"+lessonId+".js");

            swal({title: "Welcome",
                text:"Welcome, "+name+"! How would you like to proceed?",
                icon: "info",
                buttons: {
                    practice: {
                        text: "Practice",
                        value: "practice",
                    },
                    quiz: {
                        text: "I'm ready to take the quiz",
                        value: "quiz",
                    }
                }
            })
            .then(function(value) {
                switch (value) {
                    case "practice":
                        quiz(true);
                        break;

                    case "quiz":
                        quiz(false);
                        break;

                    default:
                        login(true);
                }
            });
        }
    } else
    {
        swal("Incorrect Login", "Either you selected the wrong name or you entered the wrong password.", "warning");
    }
}

function completed()
{
    initInterface();
    endLoading();

    document.getElementById("completedFrame").style.display = "inline";
    document.getElementById("promptSelect").style.display = "inline";
    var w = Math.min(window.innerWidth/2, 200);
    document.getElementById("completedImg").width = w;
    document.getElementById("completedImg").height = w;
}

function initInterface()
{
    endLoading();
    document.getElementById("form").style.display = "none";
    document.getElementById("navigation").style.display = "inline";
    if(course != "")
    if(lessons != null)
    {
        document.getElementById("gradesFrame").style.display = "none";
        document.getElementById("promptSelect").style.display = "none";

        document.getElementById("quizFrame").style.display = "none";
        document.getElementById("completedFrame").style.display = "none";

        if(lessonId != "")
        {
            document.title = "Lesson "+lessonId+": "+lessons[course][lessonId][1] + (practice?" (PRACTICE)":"");
            document.getElementById("welcome").style.display = "none";
            document.getElementById("welcome2").innerHTML = "Lesson "+lessonId+": "+lessons[course][lessonId][1] + (practice?" <span style='color:red'>(PRACTICE)</span>":"");
        } else
        {
            document.getElementById("welcome").style.display = "inline";
            document.getElementById("welcome").innerHTML = name;
        }
        if(course != "")
        {
            document.getElementById("home").innerHTML = "<a href='"+lessons[course]["name"][0]+"'>"+lessons[course]["name"][1]+"</a>";
        }
    } else
    {
        setTimeout(function(){ initInterface(); }, 1000);
    }

    window.scrollTo(0, 0);
    $(".navbar-collapse").collapse('hide');
}

window.onload = function()
{
    // Parse the URL so that we can figure out which course and lesson the user wants
    var params = window.location.pathname.split('/');

    // Uncomment for debugging purposes
    params[1] = "a1.1";

    if(params[1].charAt(1).toLowerCase()=='p')
    {
        ifStudent = false;
        document.getElementById("nametag").innerHTML = "You child's name:";
    } else
    {
        ifStudent = true;
    }

    var c = params[1].charAt(0).toLowerCase();
    for(courseAbbr in lessons)
    {
        if(lessons[courseAbbr]["name"][0] == c)
        {
            course = courseAbbr;
            break;
        }
    }
  
    lessonId = (course!="" && (typeof lessons[course][params[1].substring(1)] !== "undefined")) ? params[1].substring(1) : "";

    if(course == "")
    {
        endLoading();

        // We don't know which course the user wants. Ask.
        document.getElementById("form").style.display = "none";
        document.getElementById("promptSelect").style.display = "none";
        document.getElementById("chooseCourse").style.display = "inline";
        for(courseAbbr in lessons)
        {
            document.getElementById("courseList").innerHTML += "<div class='column'><a href='/"+lessons[courseAbbr]["name"][0]+"' class='btn'>"+lessons[courseAbbr]["name"][1]+"</a></div>";
        }
        return false;
    } else
    {
        // Load student names... Checking local storage first, falling back to the server
        if (typeof(Storage) !== "undefined")
        {
            studentList = localStorage.getItem("studentList"+course);
            if(studentList != null)
            {
                propagateStudents(JSON.parse(studentList));
            }
        }
        if(document.getElementById("name").length <= 2)
        {
            loadJS("google", "?course="+course+"&getStudents=1");
        }

        // Propagate options in the select menu
        for(L in lessons[course])
        {
            if(L=="name") break;
          
            var opt = document.createElement("option");
            opt.value = L;
            opt.innerHTML = L + ": "+lessons[course][L][1];

            document.getElementById("selectLesson").appendChild(opt);
        }
        if(lessonId != "")
        {
            document.getElementById("selectLesson").value = lessonId;
        } else
        {
            document.getElementById("selectLesson").value = "select";
        }

        document.getElementById("home").innerHTML = "<a href='"+lessons[course]["name"][0]+"'>"+lessons[course]["name"][1]+"</a>";
    }
}

function loadJS(root, scriptSrc)
{
    startLoading();
    if(root=="google") root = "https://script.google.com/macros/s/AKfycbxsI_zUqE78ybmlgVr8trCaq5GM61oIA_cXN4U35mR3M3w2fRY/exec";

    var script = document.createElement("script");
    script.src = root+scriptSrc;
    script.type = "text/javascript";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

function error(errCode)
{
    endLoading();
    //TODO: Display errors to user
}

function propagateStudents(students)
{
    endLoading();
    var opt;
    var selectName = document.getElementById("name");
    for(var i=0; i<students.length; i++)
    {
      if(students[i]=="") break;
      opt = document.createElement("option");
      opt.value = students[i];
      opt.innerHTML = students[i];
      
      selectName.appendChild(opt);
    }

    if (typeof(Storage) !== "undefined")
    {
        thisStudent = localStorage.getItem("thisStudent");
        if(thisStudent != null)
        {
            selectName.value = thisStudent;
        }
        if(localStorage.getItem("thisStudent") == null)
        {
            localStorage.setItem("studentList"+course, JSON.stringify(students))
        }
    }
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

function startLoading()
{
    document.getElementById("loader").style.display = "inline";
}

function endLoading()
{
    document.getElementById("loader").style.display = "none";
}

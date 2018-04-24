var ifVideo = 0; // Did the student watch the video?

function displayVideo()
{
    var player = document.createElement("div");
    var playerHtml = "<div class='wrapper'><iframe width='640' height='390' id='swalIframe' width='100%' src='/loading.html' allowFullScreen></iframe></div><div class='row'>";
    for(var i=1; i<=numQuestions; i++)
    {
        playerHtml += "<div class='column'><a href='javascript:setSwalVideo("+i+")' id='swalBtn"+i+"' class='btn'>"+i+"</a></div>";
    }
    playerHtml += "</div>";
    player.innerHTML = playerHtml;

    swal({
        content: player,
        buttons: {
            exit: {
                text: "Exit",
                value: "exit",
            }
        }
    })
    .then(function(value)
    {
        document.getElementById("swalIframe").src = "/loading.html";
    });

    setSwalVideo(questionNum+1);
}

function setSwalVideo(vidNum)
{
    document.getElementById("swalIframe").src = "https://www.youtube.com/embed/"+videos[vidNum-1]+"?autoplay=1";

    // Deactive all the buttons
    var activeBtns = document.getElementsByClassName("activeBtn");
    for(var i=0; i<activeBtns.length; i++)
    {
        activeBtns[i].className = "btn";
    }

    // Set this button as active
    document.getElementById("swalBtn"+vidNum).className = "activeBtn";

    ifVideo++;
}

function displayAskQuestion()
{
    var askDiv = document.createElement("div");
    askDiv.innerHTML = "<div class='wrapper'><textarea id='askTextarea'></textarea></div>";

    swal({
        title: "Please enter your question below:",
        content: askDiv,
        type: "info",
        buttons: {
            submit: {
                text: "Submit",
                value: "submit",
                closeModal: false
            },
            cancel: true
        },

    })
    .then(function(value)
     {
         var preAsk = "("+(practice?"P":"Q")+questionNum+(practice?"S"+currentStep+(equationNum!=null?"E"+equationNum:""):"")+" ["+vars.toString()+"]) ";

         loadJS("google", "?student="+encodeURIComponent(name)+"&password="+password+"&course="+course+"&lessonId="+lessonId+"&ask="+encodeURIComponent(preAsk+document.getElementById("askTextarea").value)+"&ifVideo="+ifVideo+"&ifPractice="+ifPractice+"&ifCanvas="+ifCanvas);
         ifPractice = 0;
         ifVideo = 0;
     });
}

function questionSubmitted(success)
{
    endLoading();
    if(success)
    {
        swal("Question Submitted", "Your question has been submitted to Mr. Naudus.", "info");
    } else
    {
        swal("An error has occurred", "Sorry, your question has not been submitted. Please try again.", "warning");
    }
}

var ifVideo = 0; // Did the student watch the video?

function displayVideo()
{
    var player = document.createElement("div");
    var playerHtml = "<div class='videoWrapper'><iframe width='640' height='390' id='swalIframe' width='100%' src='about:blank' allowFullScreen></iframe></div><div class='row'>";
    for(var i=1; i<=numQuestions; i++)
    {
        playerHtml += "<div class='column'><a href='javascript:setSwalVideo("+i+")' id='swalBtn"+i+"' class='btn'>"+i+"</a></div>";
    }
    playerHtml += "</div>";
    player.innerHTML = playerHtml;

    swal({
        content: player,
        buttons: {
            practice: {
                text: "Exit",
                value: "exit",
            }
        },
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
    swal({
        title: "Ajax request example",
    text: "Submit to run ajax request",
    type: "info",
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true
    }, function () {
        setTimeout(function () {
            swal("Ajax request finished!");
        }, 2000);
    });
}

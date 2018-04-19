function changePassword()
{
    initInterface();
    document.getElementById("setPasswordFrame").style.display = "inline";
    document.getElementById("welcome").style.display = "inline";
    if(ifStudent)
    {
        document.getElementById("welcome").innerHTML = name;
        document.getElementById("welcome2").innerHTML = name;
    } else
    {
        document.getElementById("welcome").innerHTML = "Parent of "+name;
        document.getElementById("welcome2").innerHTML = "Parent of "+name;
    }
}

function initPasswordSet()
{
    if(document.getElementById("newPassword").value == document.getElementById("newPassword2").value)
    {
        loadJS("google", "?course="+course+"&student="+encodeURIComponent(name)+"&password="+password+(ifStudent?"&newStudentPassword=":"&newParentPassword=")+document.getElementById("newPassword").value.hashCode());
    } else
    {
        swal("Passwords don't match", "The two passwords you entered don't match. Please try again.", "warning");
    }
}

function passwordSet(success)
{
    endLoading();
    if(success)
    {
        swal("Password updated", "Your password has been successfully updated. Please log back in with your new password.", "success")
            .then(function(value) { window.location.reload(); });
    } else {
        swal("Password not updated", "Your password could not be updated due to a temporary security concern. Please try again later or ask Mr. Naudus for help.", "warning");
    }
}

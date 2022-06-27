export default function CloseModals(){
    //Close modals
    window.onclick = function(event) {
        if (event.target === document.getElementById("Login_Modal_Container")) {
            document.getElementById("Login_Modal_Container").style.display = "none";
            document.getElementById("email_input").value = "";
            document.getElementById("password_input").value = "";
        }   
        else if (event.target === document.getElementsByClassName("specific_announcement_container")[0]) {
            document.getElementsByClassName("specific_announcement_container")[0].style.display = "none";
            document.getElementsByClassName("announcement_container")[0].style.marginRight = "-100%";
        }   
        else if (event.target === document.getElementsByClassName("specific_vaccine_container")[0]) {
            document.getElementsByClassName("specific_vaccine_container")[0].style.display = "none";
            document.getElementsByClassName("vaccine_container")[0].style.marginRight = "-100%";
        }   
        else if (event.target === document.getElementById("add_task_modal_container")) {
            document.getElementById("add_task_modal_container").style.display = "none";
            var input =  document.getElementsByClassName("task_input");
            for(var i=0; i< input.length; i++){
                input[i].value = "";
            }
        }   
    }
}


import $ from 'jquery'; 
export default function CloseModals(){
    //Close modals
    window.onclick = function(event) {
        if (event.target === document.getElementById("Login_Modal_Container")) {
            document.getElementById("login_validation1").style.display = "none";
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
        else if (event.target === document.getElementById("view_task_modal_container")) {
            document.getElementById("view_task_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("view_alltask_modal_container")) {
            document.getElementsByClassName("see_all_task_container")[0].style.bottom = "-100%";
            document.getElementById("searh_task").value = "";
            var value = document.getElementById("searh_task").value;
            value = value.toLowerCase();
            $("#see_all_task_container .task_box_container").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
              
            if($('#see_all_task_container .task_box_container:visible').length === 0) {//if not found
                document.getElementsByClassName("no_task_available2")[0].style.display = "flex";
            }
            else if($('#see_all_task_container .task_box_container:visible').length !== 0){//if found
                document.getElementsByClassName("no_task_available2")[0].style.display = "none";
            }
            if(document.getElementById("searh_task").value.length === 0){
              document.getElementsByClassName("no_task_available2")[0].style.display = "none";
            }
            setTimeout(function () {
                document.getElementById("view_alltask_modal_container").style.display = "none";
            }, 400);
        }  
        else if (event.target === document.getElementById("delete_task_modal_container")) {
            document.getElementById("delete_task_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("edit_task_modal_container")) {
            document.getElementById("edit_task_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("reject_sched_modal_container")) {
            document.getElementById("reject_sched_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("Accept_sched_modal_container")) {
            document.getElementById("Accept_sched_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("view_schedule_container")) {
            setTimeout(function () {
                document.getElementById("view_schedule_container").style.display = "none";
            }, 400);
            document.getElementById("view_schedule").style.marginRight = "-100%";
        }  
        else if (event.target === document.getElementById("view_vaccine_container")) {
            setTimeout(function () {
                document.getElementById("view_vaccine_container").style.display = "none";
            }, 400);
            document.getElementById("view_container").style.marginRight = "-100%";
        }  
        else if (event.target === document.getElementById("edit_vaccine_container")) {
            setTimeout(function () {
                document.getElementById("edit_vaccine_container").style.display = "none";
            }, 400);
            document.getElementById("edit_container").style.marginRight = "-100%";
        }  
        else if (event.target === document.getElementById("next_schedule_container")) {
            setTimeout(function () {
                document.getElementById("next_schedule_container").style.display = "none";
            }, 400);
            document.getElementById("next_schedule").style.marginRight = "-100%";
        }  
        else if (event.target === document.getElementById("delete_announcement_modal_container")) {
            document.getElementById("delete_announcement_modal_container").style.display = "none";
        }  
        else if (event.target === document.getElementById("Register_Modal_Container")) {
            document.getElementById("Register_Modal_Container").style.display = "none";
            document.getElementById("add_register_email").value = "";
            document.getElementById("add_register_fname").value = "";
            document.getElementById("add_register_lname").value = "";
            document.getElementById("add_register_password").value = "";
            document.getElementById("add_register_password1").value = "";  
            document.getElementById("span_email_register").textContent = "*";
            document.getElementsByClassName("register_password_validation")[0].textContent = "*";
            document.getElementsByClassName("register_password_validation")[1].textContent = "*";
            document.getElementById("add_register_email").style.border = "2px solid transparent";

            document.getElementById("step2").style.display = "none";
            document.getElementById("step1").style.display = "block";
            document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
            document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
        }   
        else if (event.target === document.getElementById("registered_successfully")) {
            document.getElementById("registered_successfully").style.display = "none";
            document.getElementById("add_register_email").value = "";
            document.getElementById("add_register_fname").value = "";
            document.getElementById("add_register_lname").value = "";
            document.getElementById("add_register_password").value = "";
            document.getElementById("add_register_password1").value = "";  
            document.getElementById("span_email_register").textContent = "*";
            document.getElementsByClassName("register_password_validation")[0].textContent = "*";
            document.getElementsByClassName("register_password_validation")[1].textContent = "*";
            document.getElementById("add_register_email").style.border = "2px solid transparent";
          
            document.getElementById("email_input").value = "";
            document.getElementById("password_input").value = "";
          
            document.getElementById("step2").style.display = "none";
            document.getElementById("step1").style.display = "block";
            document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
            document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
        }  
    }
}


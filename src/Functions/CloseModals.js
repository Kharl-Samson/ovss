import $ from 'jquery'; 
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
    }
}



export default function CloseModals(){
    //Close modals
    window.onclick = function(event) {
        if (event.target === document.getElementById("Login_Modal_Container")) {
         document.getElementById("Login_Modal_Container").style.display = "none";
         document.getElementById("email_input").value = "";
         document.getElementById("password_input").value = "";
     }   
    }
}
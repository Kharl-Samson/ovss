export default function Url(){
    //Change when using local hosting
    window.localStorage.setItem('url_hosting', "http://localhost/ovss/BackEnd/");
    window.localStorage.setItem('url_announcement', "http://localhost/ovss/BackEnd/Announcements_Img/");
    window.localStorage.setItem('url_admin_img', "http://localhost/ovss/BackEnd/Admin_Img/");
    window.localStorage.setItem('url_admin_signin', "http://localhost:3000/");
    window.localStorage.setItem('url_vaccine', "http://localhost/ovss/BackEnd/Vaccine_Img/");
    window.localStorage.setItem('url_account_img', "http://localhost/ovss/BackEnd/user_img/");
 

    //Change when using live hosting
    //window.localStorage.setItem('url_hosting', "BackEnd/");
    //window.localStorage.setItem('url_announcement', "BackEnd/Announcements_Img/");
    //window.localStorage.setItem('url_admin_img', "BackEnd/Admin_Img/");
    //window.localStorage.setItem('url_admin_signin', "https://ovss.site/");
    //window.localStorage.setItem('url_vaccine', "BackEnd/Vaccine_Img/");
    //window.localStorage.setItem('url_account_img', "BackEnd/user_img/");
}
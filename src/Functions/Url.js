export default function Url(){
    //Change when using local hosting
    window.localStorage.setItem('url_hosting', "http://localhost/ovss/BackEnd/");
    window.localStorage.setItem('url_announcement', "http://localhost/ovss/Announcements_Img/");
    window.localStorage.setItem('url_default_avatar', "http://localhost/ovss/Default_Avatar/");
    window.localStorage.setItem('url_admin_signin', "http://localhost:3000/");
    window.localStorage.setItem('url_vaccine', "http://localhost/ovss/BackEnd/Vaccine_Img/");
 

    //Change when using live hosting
    //window.localStorage.setItem('url_hosting', "BackEnd/");
    //window.localStorage.setItem('url_announcement', "Announcements_Img/");
    //window.localStorage.setItem('url_default_avatar', "Default_Avatar/");  
    //window.localStorage.setItem('url_admin_signin', "https://ovss.site/");
    //window.localStorage.setItem('url_vaccine', "BackEnd/Vaccine_Img/");
}
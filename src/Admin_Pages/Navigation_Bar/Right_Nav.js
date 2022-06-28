import React from "react";
import "./Right_NavigationBar.css";
import Top_Nav_Part from "./Right_Nav/TopPart";
import Url from "../../Functions/Url";
import Middle_Nav_Part from "./Right_Nav/MiddlePart";
import Mini_Map from "../../Assets/Dashboard_Page/Mini_Map.png";
import CloseModals from "../../Functions/CloseModals";

export default function Admin_Right_Navigation_Bar(){
    //Calling the url of announcement
    Url();
    
    //Loading the local storage of task in right navbar
    window.localStorage.setItem('taskDateValue', "")

return(
    <div className="right_navigation">
        <Top_Nav_Part/>
        <Middle_Nav_Part/>

        <div className="bottom">
            <div className="top"
               style={{
                backgroundImage: `url(${Mini_Map})`
               }}
            >
            </div>
            <div className="bottom">
                <p>Contact Person</p>
                <p>Jayson Batoon</p>
                <p>Email Address</p>
                <p>juandelacruz@gmail.com</p>
            </div>
        </div>

        <CloseModals/>
    </div>
)
}
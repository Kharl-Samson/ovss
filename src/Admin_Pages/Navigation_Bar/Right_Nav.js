import React from "react";
import "./Right_NavigationBar.css";
import Top_Nav_Part from "./Right_Nav/TopPart";
import Url from "../../Functions/Url";
import Middle_Nav_Part from "./Right_Nav/MiddlePart";

export default function Admin_Right_Navigation_Bar(){
    //Calling the url of announcement
    Url();

return(
    <div className="right_navigation">
        <Top_Nav_Part/>
        <Middle_Nav_Part/>
    </div>
)
}
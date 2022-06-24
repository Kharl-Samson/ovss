import React from "react";
import Grid from '@mui/material/Grid';
import Injection_Icon from "../../Assets/Icons/Injection_Icon.png";

export default function Vaccine_Component(props){

//Showing all information in vaccinne
function show__specific_vaccine_function(){
  document.getElementsByClassName("specific_vaccine_container")[0].style.display = "block";
  setTimeout(function(){
    document.getElementsByClassName("vaccine_container")[0].style.marginRight = "0";
  },0);

  document.getElementById("specific_vaccine_headline1").textContent = props.name1;
  document.getElementById("specific_vaccine_headline2").textContent = props.name2;
  document.getElementById("vaccine_question1").textContent = props.ques1;
  document.getElementById("vaccine_question2").textContent = props.ques2;
  document.getElementById("vaccine_question3").textContent = props.ques3;
  document.getElementById("vaccine_content1").textContent = props.ans1;
  document.getElementById("vaccine_content2").textContent = props.ans2;
  document.getElementById("vaccine_content3").textContent = props.ans3;
}

    return(
    <div className="box" onClick={show__specific_vaccine_function}>
        <div className="top">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <div className="img_container"><img src={Injection_Icon} alt=""/></div>
            <p>{props.name}</p>
          </Grid>  
        </div>
        <div className="bot">
          <p>{props.short_desc}&nbsp;&nbsp;&nbsp;<span>see more....</span></p>
        </div>
    </div>
    )
}
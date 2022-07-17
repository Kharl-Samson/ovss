import React from "react";
export default function EachVaccine(props){

    function setVaccine(){
        document.getElementById("vax_name").value = props.name;
        document.getElementById("validator_request").style.display = "none";
    }
    return(
        <div className='box_vaccine'>
        <label style={{display:"flex",width:"100%"}}> 
          <div className='cbox_vaccine'><input type="radio" id="vaccine_name_radio" name="vaccine_name_radio" value={props.name} onChange={setVaccine} required/></div>
          <div className='image_vaccine'>
              <img alt="" src={localStorage.getItem("url_vaccine")+props.image}
              onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_vaccine")+"default_img.jpg"}}/>
          </div>
          <div className='name_vaccine'>
              <span>{props.name}</span>
          </div>
        </label>
      </div>
    )
}
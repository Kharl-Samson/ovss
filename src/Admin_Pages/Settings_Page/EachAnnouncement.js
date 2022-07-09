import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";

export default function Each_Announcement(props){
  let navigate = useNavigate();
//Go to edit announcement
function gotoEditAnnouncement(){
  navigate(`/Administration_Edit_Announcement`);

  window.localStorage.setItem('img_edit_announce', props.imgurlNoLocalStorage);
  window.localStorage.setItem('title_edit_announce', props.headline);
  window.localStorage.setItem('date_edit_announce', props.dateNotFormat);
  window.localStorage.setItem('desc_edit_announce', props.content);
  window.localStorage.setItem('desc_edit_id', props.id);
}


//Showing all information in latest announcements
function show_latest_specific_announcements_function(){
  document.getElementsByClassName("specific_announcement_container")[0].style.display = "block";
  setTimeout(function(){
    document.getElementsByClassName("announcement_container")[0].style.marginRight = "0";
  },0);

  document.getElementById("specific_announcement_date").textContent = props.date;
  document.getElementById("specific_announcement_img").src = props.imageUrl;
  document.getElementById("specific_announcement_headline").textContent = props.headline;
  document.getElementById("announcement_content").innerHTML = props.content;
}

//Show delete modal
function deleteAnnouncement(){
  document.getElementById("delete_announcement_modal_container").style.display = "flex";
  document.getElementById("delete_modal_announce_key").value = props.id;
}

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
    return(
    <div className={"box box_Announcement_ctr"+props.propsKey} key={props.propsKey}>
        <div className="img_container">
          <img src={props.imageUrl} alt=""
          onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_announcement")+"template.jpg"}}
          />
          
        </div>
        <div className="content">
          <p className="headline">{props.headline}</p>
          <p className="description">{props.content_to_show}</p>
          <div className="bot">
            <p className="date">{props.date}</p>
            <MoreHorizIcon id="see_more_btn"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined} 
            />
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
              elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem style={{display:"none"}}></MenuItem>
              <MenuItem onClick={show_latest_specific_announcements_function}>
                <ListItemIcon>
                  <VisibilityIcon fontSize="medium"/>
                </ListItemIcon>
                &nbsp;&nbsp;View &nbsp;&nbsp;&nbsp;
              </MenuItem>
              <MenuItem onClick={gotoEditAnnouncement}>
                <ListItemIcon>
                  <ModeEditIcon fontSize="medium"/>
                </ListItemIcon>
                &nbsp;&nbsp;Edit &nbsp;&nbsp;&nbsp;
              </MenuItem>
              <MenuItem onClick={deleteAnnouncement}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="medium"/>
                </ListItemIcon>
                &nbsp;&nbsp;Delete &nbsp;&nbsp;&nbsp;
              </MenuItem>
            </Menu>
          </div>
        </div>
    </div>
    )
}


  
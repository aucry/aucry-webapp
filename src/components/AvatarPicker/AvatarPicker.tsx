import {Avatar, Grid} from "@mui/material";
import {useState} from "react";
import './avatar-picker.css';


export default function AvatarPicker({image1epoch, image1id, image2epoch, image2id, image3epoch, image3id,
                                     selectedAvatarEpoch, setSelectedAvatarEpoch, selectedAvatarId, setSelectedAvatarId}) {

    function handleSelection(element) {
        let selectedItem = Array.from(document.getElementsByClassName('selected-avatar'));
        for (let i = 0; i < selectedItem.length; i++) {
            selectedItem[i].classList.remove('selected-avatar');
        }
        element.classList.add('selected-avatar');
        console.log(element.parentElement.getAttribute('data-image-epoch'));
        setSelectedAvatarEpoch(element.parentElement.getAttribute('data-image-epoch'));
        setSelectedAvatarId(element.parentElement.getAttribute('data-image-id'));
    }

    return (image1id && image2id && image3id && <Grid container>
        <Grid item xs={2} md={4} alignItems={"center"}>
            <Avatar className="avatar" data-image-epoch={image1epoch} data-image-id={image1id}
                sx={{
                    width: "80%",
                    ml: "10%",
                    height: "100%",
                    border: '3px solid #333',
                }}
                src={"https://images.unsplash.com/photo-"
                    + image1epoch + "-" + image1id + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&ixlib=rb-1.2.1&q=80"}
            onClick={(event) => handleSelection(event.target)}/>
        </Grid>
        <Grid item xs={2} md={4}>
            <Avatar className="avatar" data-image-epoch={image2epoch} data-image-id={image2id}
                sx={{
                    width: "80%",
                    ml: "10%",
                    height: "100%",
                    border: '3px solid #333',
                }}
                src={"https://images.unsplash.com/photo-"
                    + image2epoch + "-" + image2id + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&ixlib=rb-1.2.1&q=80"}
                onClick={(event) => handleSelection(event.target)}/>
        </Grid>
        <Grid item xs={2} md={4}>
            <Avatar className="avatar"  data-image-epoch={image3epoch} data-image-id={image3id}
                sx={{
                    width: "80%",
                    ml: "10%",
                    height: "100%",
                    border: '3px solid #333',
                }}
                src={"https://images.unsplash.com/photo-"
                    + image3epoch + "-" + image3id + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&ixlib=rb-1.2.1&q=80"}
                onClick={(event) => handleSelection(event.target)}
            />
        </Grid>
    </Grid>);
}
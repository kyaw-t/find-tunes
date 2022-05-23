import React, {useRef, useEffect} from "react";
import "./../App.css"
import ReactAudioPlayer from 'react-audio-player';
import { Button } from "@mantine/core";


export default function Preview(props){

    return(
        <>{props.preview && 
        <ReactAudioPlayer
            src={props.preview}
            controls
            style={{ 
                padding: '0', 
                height: (props.size === "small" && "0px"),
                width: (props.size === "small" && "50px"),
             }}
            className="small-player"
        />}
        </>
    );
}
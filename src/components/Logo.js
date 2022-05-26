import React, {useRef, useEffect} from "react";
import { Group, Text } from "@mantine/core";
import logo from "./../assets/Spotify_Logo_RGB_Green.png";
import "./../App.css"


export default function Logo(props){

    return(
        // <div className="main-logo" style={{ fontSize:"3vh"}}>
        //     Find Tunes Powered by
        // <img src={logo} style={{paddingLeft:"1rem", height:"3vh"}}/>
        // </div>
        <Group position="left">
            <><Text className="main-logo">find-tunes</Text>
            </>
            <img src={logo} style={{ height:"30px"}}/>

        </Group>

    );
}
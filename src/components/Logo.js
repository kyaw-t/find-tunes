import React, {useRef, useEffect} from "react";
import { Group, Text } from "@mantine/core";
import logo from "./../assets/logo.png";
import "./../App.css"


export default function Logo(props){

    return(
        <div className="main-logo">
        {/* <img src={logo} height={"30vw"} width={"30vw"}/> */}
        <>Tuneify</>
        <div className='sub'>
            Powered by Spotify
        </div>
        </div>

    );
}
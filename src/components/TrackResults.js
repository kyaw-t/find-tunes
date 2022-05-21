import React from "react";
import { ScrollArea, Text } from '@mantine/core';
import Track from './Track'
import Preview from "./Preview";

export default function TrackResults(props){

    const cbSeed = (track) => { 
        props.callback(track)
    };

    return(

        <div className="scrollA" style={{
            paddingTop:"0.2rem",
            paddingBottom:"0.2rem",
            width:"100%",
            height: "100%"
            }}>
            
        
        <ScrollArea 
        transition="slide-down" transitionDuration={300} transitionTimingFunction="ease"
        style={{ height: props.height, width:"100%" }}>

            {props.tracks.map(t => {
                return (
                    <Track 
                        track={t}
                        callback={cbSeed}
                        token={props.token}
                    />
                )
            })}

        </ScrollArea>
            
        </div>
    );

}
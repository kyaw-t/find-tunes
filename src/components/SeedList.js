import React, {useEffect} from "react";
import { Group, Text} from '@mantine/core';
import Seed from "./Seed";
import "./../App.css"

export default function SeedList(props){
    
    const cbRemoveSeed = (track) => {
        props.callback(track)
    }

    return(
        <>
        <Group 
        position="left" 
        direction="row" 
        spacing="md"
        style={{paddingTop:"1rem", width:"100%"}}>
            <Text className="subtitle"> Seeds: </Text>
            {(props.seeds).map(seed => {
                return (
                    <Seed track={seed} callback={cbRemoveSeed} token={props.token}/>
                )
            })}
        </Group>

        </>

    );

}
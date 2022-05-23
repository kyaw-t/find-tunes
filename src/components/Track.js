import React,{useEffect, useState} from "react";
import { Button, Card, Group, Text } from '@mantine/core';
import "./../App.css"
import { Help, PlaylistAdd } from "tabler-icons-react";
import Preview from "./Preview";
import { useViewportSize } from '@mantine/hooks';

export default function Track(props){

    const {height, width} = useViewportSize();
    const [preview, setPreview] = useState([]);
    const [token, setToken] = useState();

    const handleAdd = () => {
        props.callback(props.track)
    }

    const getPreview = () => {
        fetch((`https://api.spotify.com/v1/tracks/'${props.track.id}?market=US`), {
                method: 'GET',
                dataType: 'json',
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
                .then(r => r.json())
                .then(r => {
                    if(r.preview_url != null){
                        console.log("bruhhh")
                    }
                    setPreview(r.preview_url)
                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        
        if (props.track.preview_url === null){
            getPreview()
        }else{
            setPreview(props.track.preview_url)
        }

    },)


    

    return(
        <Card radius="md" shadow="lg" 
        style={{
            paddingBottom:"0.1rem",
            paddingTop:"0.1rem",
            marginTop:"0.5rem",
            backgroundColor:"rgb(30,30,30)"
        }}>
            <Group position="apart" spacing="xs"
             direction="row" style={{
                 paddingBottom:"0.2rem",
                 paddingTop:"0.2rem",
                 }}>
                
                <Group style={{maxWidth:"60%"}}>
                    <a href={props.track.external_urls.spotify} target="_blank">
                    <img src={props.track.album.images[2].url} 
                        href={props.track.external_urls.spotify}
                        className='track-img'
                        />
                    </a>

                        <div className="track-text">
                        <Text weight={600} style={{fontSize:(width < 800 && "2.2vw")}}>{props.track.name}</Text>
                        <Text weight={500} style={{fontSize:(width < 800 && "1.7vw")}}>{props.track.artists[0].name}</Text>
                        </div>
                </Group>

                <div style={{display:"flex", flexDirection:"row"}}>
                <Preview preview={preview} size={width > 800 ? "large": "small"}/>
                
                <Button 
                    onClick={() => {handleAdd()}}
                    variant="subtle"
                    color="dark"
                >
                    <PlaylistAdd size={32} strokeWidth={2} color={'#1DB954'}/>
                </Button>
                </div>
                
            </Group>
        </Card>
    );

}
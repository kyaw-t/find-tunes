import React,{useEffect, useState} from "react";
import { Button, Card, Group, Text } from '@mantine/core';
import "./../App.css"
import { Help, PlaylistAdd } from "tabler-icons-react";
import Preview from "./Preview";
import { useWindowScroll } from "@mantine/hooks";

export default function Track(props){


    const [preview, setPreview] = useState([]);
    const [token, setToken] = useState();

    const handleAdd = () => {
        props.callback(props.track)
    }

    const getPreview = () => {
        fetch(('https://api.spotify.com/v1/tracks/' + props.track.id), {
                method: 'GET',
                dataType: 'json',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(r => {
                    setPreview(r.preview_url)
                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        
        if (props.track.preview_url != null){
            setPreview(props.track.preview_url)
            return
        }

        const hash = window.location.hash
        let token = window.sessionStorage.getItem("token")

        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.sessionStorage.setItem("token", token)
        }

        console.log(token)
        setToken(token)
        getPreview()

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
                        <Text weight={600}>{props.track.name}</Text>
                        <Text weight={500}>{props.track.artists[0].name}</Text>
                        </div>
                </Group>

                <div style={{display:"flex", flexDirection:"row"}}>
                <Preview preview={preview}/>
                <Button 
                    onClick={() => {handleAdd()}}
                    // style={{marginRight:"5%"}}
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
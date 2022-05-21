import React, {useEffect, useState} from "react";
import { Badge, Button, Text, Tooltip, Group, useMantineTheme } from '@mantine/core';
import { X } from "tabler-icons-react";
import "./../App.css"
import Preview from "./Preview";
import TrackTip from "./TrackTip";

export default function Seed(props){

    const theme = useMantineTheme()
    const [token, setToken] = useState();
    const [analysis, setAnalysis] = useState([])
    const [loaded, setLoaded] = useState(false)


    const handleClose = () => {
        setLoaded(false)
        setAnalysis([])
        props.callback(props.track)
    }

    
    const closeButton = (
        <Button 
            onClick={()=>{handleClose()}}
            variant="subtle" 
            color="dark"
            style={{
                paddingRight:"0rem"
            }}
            sx={{
                '&:hover': {
                    backgroundColor: "transparent",
                  },
            }}
        >
            <X size={20} color={"white"}/>
        </Button>
    );
    

    useEffect(() => {
        const hash = window.location.hash
        let token = window.sessionStorage.getItem("token")

        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.sessionStorage.setItem("token", token)
        }

        console.log(token)

        setToken(token)
        setLoaded(false)

    }, [])

    const loadAnalysis = () => {
        console.log(loaded)
        if (!loaded){
            fetch(('https://api.spotify.com/v1/audio-features/' + props.track.id), {
                method: 'GET',
                dataType: 'json',
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
                .then(r => r.json())
                .then(r => {
                    console.log(r)
                    setAnalysis(r)
                    setLoaded(true)
                })
                .catch(err => console.log(err))
        }
    }
    
    return(
        <Tooltip withArrow position="top" 
        transition="slide-up" transitionDuration={300} transitionTimingFunction="ease"
        label={<TrackTip analysis={analysis} track={props.track} loaded={loaded}/>} 
        closeDelay={500}
        styles={{
            body: { backgroundColor: theme.colors.dark[8],
                },
        }}>
            <Badge
                onMouseEnter={()=>{loadAnalysis()}}
                size="lg"
                variant="gradient" 
                gradient={{ from: 'green', to: 'darkgreen', deg: 75 }}
                rightSection={closeButton}
                style={{
                    paddingRight:"0.2rem"
                }}
            >
                <Text className="seed-text">{props.track.name}</Text>
            </Badge>
        </Tooltip>
    );

}
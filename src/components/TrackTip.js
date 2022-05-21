import React, {useEffect, useState} from "react";
import { Text,  Group} from '@mantine/core';
import "./../App.css"


export default function TrackTip(props){

    const [scales, setScales] = useState([])

    function calcScale(data){
        if (data <= 0.35){
            return ["Low", data, "linear-gradient(90deg, green, #1DB954)"]
        }
        if (data <= 0.65){
            return ["Medium", data, "linear-gradient(90deg, #1DB954, yellow)"]
        }        
        if (data <= 0.80){
            return ["High", data, "linear-gradient(90deg, orange, #FFB03A)"]
        }        
        if (data <= 1.00){
            return ["Very High", data, "linear-gradient(90deg, #FFB03A, #E21143)"]
        }
        else{
            return ["Loading...", 1, "white"]
        }

    }

    useEffect(() => {
        if (props.loaded){
            setScales([
                calcScale(props.track.popularity / 100),
                calcScale(props.analysis.danceability),
                calcScale(props.analysis.energy),
                // calcScale(props.analysis.speechiness),
                calcScale(props.analysis.acousticness),
                calcScale(props.analysis.valence),
                // calcScale(props.analysis.tempo),
                [props.analysis.tempo, 0.5, "linear-gradient(60deg,white, white)"]
            ])
        }
    }, [props.loaded])
    

    return(
        <div>
        <Group>
            <img src={props.track.album.images[0].url} 
                className='track-img'/>
                <div className="track-text">
                <Text weight={700}>{props.track.name}</Text>
                <Text weight={600}>{props.track.artists[0].name}</Text>
                </div>

        </Group>

        {props.loaded && 
        <Group>
            <div className="track-text">
                <Text weight={600}>Popularity:</Text>
                <Text weight={600}>Danceability:</Text>
                <Text weight={600}>Energy:</Text>
                {/* <Text weight={600}>Wordiness:</Text> */}
                <Text weight={600}>Acousticness:</Text>
                <Text weight={600}>Cheerfulness:</Text>
                <Text weight={600}>Tempo:</Text>
            </div>

            <div className="track-text">
                {
                    scales.map(data => {
                        return(
                            <Text 
                                weight={700 + data[1]*100}
                                style={{
                                    backgroundImage: data[2],
                                    backgroundClip: "text",
                                    color: "transparent",
                                }}
                            >
                                {data[0]}
                            </Text>
                        )
                    })
                }
                {/* <Text weight={600}>{scales[0]}</Text>
                <Text weight={600}>{props.analysis.danceability}</Text>
                <Text weight={600}>{props.analysis.energy}</Text>
                <Text weight={600}>{props.analysis.speechiness}</Text>
                <Text weight={600}>{props.analysis.acousticness}</Text>
                <Text weight={600}>{props.analysis.valence}</Text>
                <Text weight={600}>{props.analysis.tempo}</Text> */}

            </div>
        </Group>
        }

        </div>
        );
}
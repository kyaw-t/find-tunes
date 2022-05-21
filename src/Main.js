import React, {useState, useEffect} from 'react';
import SearchTrack from './components/SearchTrack';
import './App.css';
import { Button, Divider, Group } from '@mantine/core';
import TrackResults from './components/TrackResults';
import { X } from 'tabler-icons-react';
import SeedList from './components/SeedList';
import FilterTracks from './components/FilterTracks';
import {Buffer} from 'buffer';



const CLIENT_ID = "1cf62b1f664c480eafd55d57ba23412f"
const CLIENT_SECRET = "0e147b868881436e955241139151f3ee"
const REDIRECT_URI = "http://localhost:3000/"
// const REDIRECT_URI = "https://kyaw-t.github.io/spot-tempo"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


export default function Main(){

    const [token, setToken] = useState([])
    const [query, setQ] = useState([]);
    const [showR, setShowR] = useState(false)
    const [showF, setShowF] = useState(false);
    const [seeds, setSeeds] = useState([]);
    const [results, setResults] = useState([]);
    const [fresults, setFResults] = useState([]);
    const [showQ, setShowQ] = useState(false)

    const cbSearchTrack = (data) => { 
        setResults(data);
        setShowR(true)
    };

    const cbFilterTrack = (data) =>{
        setFResults(data);
        setShowR(false);
        setShowF(true);
    }

    const cbSeed = (track) => {
        console.log(">>>", track)
        handleSeed(track)
    }

    const cbRemoveSeed = (track) =>{
        console.log("removing >>>", track)
        setSeeds(seeds.filter(s => s != track))
        
    }

    function handleSeed(track){

        if (seeds.includes(track)){
            return
        }
        setShowQ(true)
        if (seeds.length >= 3){
            setSeeds([seeds[1], seeds[2], track])
        }else{
            setSeeds([...seeds, track])
        }

    }

    // useEffect(() => {
    //     const hash = window.location.hash
    //     let token = window.sessionStorage.getItem("token")

    //     if (hash) {
    //         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

    //         window.location.hash = ""
    //         window.sessionStorage.setItem("token", token)
    //     }

    //     console.log(token)
    //     setToken(token)

    // }, [])
    
    useEffect(() => {

        // const BASE_URL = 'https://accounts.spotify.com/api/token';
        // fetch(BASE_URL, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64') 

        //     },
        //     body: JSON.stringify({grant_type:"client_credentials"})
        // })
        // // fetch(('https://accounts.spotify.com/api/token?grant_type=client_credentials'), {
        // //     method: 'POST',
        // //     dataType: 'json',
        // //     headers: {
        // //         // Authorization: `Basic ${CLIENT_ID}:${CLIENT_SECRET}`,
        // //         Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64') 
        // //     },
        // // })
        //     // .then(r => r.json())
        //     .then(r => {
        //         console.log(r)
        //     })
        //     .catch(err => console.log(err))

            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Basic ${CLIENT_ID}:${CLIENT_SECRET}`);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "client_credentials");

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            }
            
            fetch("https://accounts.spotify.com/api/token", requestOptions)
            .then(r =>{
                console.log(r)
            })


    }, [])


    return(
        <div className='App-col'>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                Login to Spotify112
            </a>

            <SearchTrack callback={cbSearchTrack}/>
            <div className='scroll'> 
                { showR &&
                    <>
                        <Group position="right" style={{width:"100%"}}>
                            <Button 
                                onClick={()=> {setShowR(false)}}
                                variant="subtle" color="dark"
                                style={{
                                    marginTop:"-1rem",
                                    marginBottom:"-1rem",
                                    zIndex:"100"
                                }}
                            >
                                <X/>
                            </Button>
                        </Group>
                        <TrackResults height={315} tracks={results} callback={cbSeed}/> 
                    </>
                }
            </div>
            {seeds.length != 0 && <SeedList seeds={seeds} callback={cbRemoveSeed}/>}
            <br/>
            <Group position='center'>

            </Group>
            {
                    showQ &&
                    <div style={{display:"flex"}}>
                    <FilterTracks seeds={seeds} callback={cbFilterTrack}/>
                    <div className='scroll' style={{width:"75%"}}> 
                        { showF &&
                            <div style={{marginTop:"-20px"}}>
                                <Group position="right">
                                    <Button 
                                        onClick={()=> {setShowF(false)}}
                                        variant="subtle" color="dark"
                                        style={{
                                            marginTop:"-1rem",
                                            marginBottom:"-1rem",
                                            zIndex:"100"
                                        }}
                                    >
                                        <X/>
                                    </Button>
                                </Group>
                                <TrackResults height={600} tracks={fresults} callback={cbSeed}/> 
                            </div>
                        }
                    </div>
                    </div>
                    
                }

        </div>
    );

}
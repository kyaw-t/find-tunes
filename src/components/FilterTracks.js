import React, {useState, useEffect} from 'react';
import { Text, Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ListSearch } from 'tabler-icons-react';
import './../App.css'
import FeatureSliders from './FeatureSliders';


export default function FilterTracks(props){

    const [token, setToken] = useState()
    const [genre, setGenre] = useState()

    const cbFilterTrack = (query) => {
        console.log(query)
        console.log(props.seeds)
        getGenre(query)

    }

    function getGenre(query){
        if (props.seeds.length === 0){
            return
        }
        fetch(('https://api.spotify.com/v1/artists/' + props.seeds[props.seeds.length-1].artists[0].id), {
            method: 'GET',
            dataType: 'json',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => r.json())
            .then(r => {
                setGenre(r.genres)
                searchFilters(query, r.genres[0])
            })
            .catch(err => console.log(err))
    }

    function searchFilters(query, gen){

        var tracks = props.seeds[0].id
        var artists = props.seeds[0].artists[0].id

        for (let i = 1; i < props.seeds.length; i++) {
            tracks = tracks + "," + props.seeds[i].id;
        }

        if (props.seeds.length == 2){
            artists = artists + "," + 
            props.seeds[1].artists[0].id
        }   

        console.log("done parsing in filter")
        fetch(('https://api.spotify.com/v1/recommendations?' + new URLSearchParams({
            seed_artists: artists,
            seed_genres: gen,
            seed_tracks: tracks,
            limit: 25,
            market: "US",
            include_external: "audio",
            min_popularity: query[0][0],
            max_popularity: query[0][1],
            min_danceability: query[1][0],
            max_danceability: query[1][1],
            min_energy: query[2][0],
            max_energy: query[2][1],
            min_acousticness: query[3][0],
            max_acousticness: query[3][1],
            min_valence: query[4][0],
            max_valence: query[4][1],
            

            })), {
            method: 'GET',
            dataType: 'json',
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(r => r.json())
            .then(r => {
                console.log(r)
                props.callback(r.tracks)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.sessionStorage.getItem("token")

        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.sessionStorage.setItem("token", token)
        }

        setToken(token)
        // getGenre()

    }, [props.seeds])

    return(
        <>
            <div style={{width:"20%", height:"500px"}}>
                <FeatureSliders callback={cbFilterTrack}/>
            </div>
        </>

    );
}
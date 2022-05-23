import React, {useState, useEffect} from 'react';
import SearchTrack from './components/SearchTrack';
import './App.css';
import { Button, Text, Group } from '@mantine/core';
import TrackResults from './components/TrackResults';
import { X } from 'tabler-icons-react';
import SeedList from './components/SeedList';
import FilterTracks from './components/FilterTracks';
import { useViewportSize } from '@mantine/hooks';
import Logo from './components/Logo';

export default function Main(){

    const {height, width} = useViewportSize();
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

    useEffect(() => {

        fetch('https://spotify-cc-api.herokuapp.com/auth/client_credentials', {
            method: 'GET',
        })
        .then(r=>r.json())
        .then(r=>{
            setToken(r.token)
            console.log(r.token)
        })

    }, [])


    return(
        <div className='App-col' style={{width:(width < 900 && "100%" )  }}>
            {/* {width} */}
            {/* <Logo/> */}

            <SearchTrack callback={cbSearchTrack} token={token}/>
            <div className={'scroll'}> 
                { showR &&
                    <>
                        <Group position="right" style={{width:"100%"}}>
                            <Button 
                                onClick={()=> {setShowR(false)}}
                                variant="subtle" color="dark"
                                className='close'
                            >
                                <X/>
                            </Button>
                        </Group>
                        <TrackResults height={320} tracks={results} callback={cbSeed} token={token}/> 
                    </>
                }
            </div>
            
            {seeds.length != 0 && <SeedList seeds={seeds} callback={cbRemoveSeed} token={token}/>}
            <br/>

            <Group position='center'>

            </Group>
            {
                    showQ &&
                    <div style={{
                        display:"flex", 
                        flexDirection:(width < 600 && "column" )
                    }}>
                    <FilterTracks seeds={seeds} callback={cbFilterTrack} token={token}/>
                        { showF &&
                            <div  className='scroll' style={{
                                width:(width > 600 && "75%"), 
                                marginTop:(width > 600 && "-25px"),
                                }}>
                                <Group position="right" style={{width:"100%"}}>
                                    <Button 
                                        onClick={()=> {setShowF(false)}}
                                        variant="subtle" color="dark"
                                        className='close'
                                    >
                                        <X/>
                                    </Button>
                                </Group>

                                {fresults.length == 0 ?
                                    <Text className="text">No Results Found..</Text>
                                    :
                                    <TrackResults 
                                        height={showR ? 400 : "75vh"} 
                                        tracks={fresults} callback={cbSeed} 
                                        token={token}
                                    /> 
                                }
                            </div>
                        }
                    </div>
                    
                }

        </div>
    );

}
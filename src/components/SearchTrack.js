import React, {useState, useEffect} from 'react';
import { Text, Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ListSearch } from 'tabler-icons-react';
import './../App.css'


export default function SearchTrack(props){

    const [token, setToken] = useState()

    const form = useForm({
        initialValues: {
            track: '',
            artist: '',
        },
    });

    const handleClick = () => {
        
        if (form.getInputProps('track')['value'] === "" &&
        form.getInputProps('artist')['value'] === ""){
            return
        }

        search(
            form.getInputProps('track')['value'], form.getInputProps('artist')['value']
        )
    
    }

    function search(track, artist){

        var type = "track"
        var query = ""

        if (artist === ""){
            query = track
            
        }else if(track ===""){
            query = artist
            
        }else{
            query = `track:${track}+artist:${artist}`
            type = "track,artist"
        }

        
        // Spotify Query here
        fetch(('https://api.spotify.com/v1/search?' + new URLSearchParams({
            q: query,
            type: type,
            limit: 50,
            market: "US",
            include_external: "audio"

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
                if(r.tracks.items.length === 0 && type === "track,artist"){
                    search(track, "")
                }else{
                    props.callback([])
                    props.callback(r.tracks.items)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    return(
        <>
        {/* <Text className='title'>Seed Songs</Text> */}

        <div className='search'>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>

                <Group position="left" mt="md" b>
                <>
                <Text>Track:</Text>
                <TextInput
                    placeholder='Track Name'
                    size="sm"
                    style={{width:"30%"}}
                    {...form.getInputProps('track')}
                />
                </>

                <>
                <Text>Artist:</Text>
                <TextInput
                    placeholder='Artist Name'
                    size="sm"
                    style={{width:"30%"}}
                    {...form.getInputProps('artist')}
                />
                </>

                <Button type="submit" 
                    size='md'
                    color="dark"
                    variant='subtle'
                    style={{paddingLeft:"0"}}
                    onClick={() => {handleClick()}}>
                    <ListSearch size={32} strokeWidth={2} color={'#1DB954'}/>
                    {/* Search */}
                </Button>

                </Group>

            </form>

        </div>
        </>

    );
}
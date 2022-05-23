import React, {useState, useEffect} from 'react';
import { Text, Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ListSearch } from 'tabler-icons-react';
import './../App.css'
import { useViewportSize } from '@mantine/hooks';



export default function SearchTrack(props){

    const {height, width} = useViewportSize();
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
                Authorization: `Bearer ${props.token}`
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


    return(
        <>
        <div className='search'>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>

                <Group position="left" mt="md" b>
                <>
                {width > 700 && <Text>Track:</Text>}
                <TextInput
                    placeholder='Track Name'
                    size="sm"
                    style={{width:"35%"}}
                    {...form.getInputProps('track')}
                />
                </>

                <>
                {width > 700 && <Text>Artist:</Text>}

                <TextInput
                    placeholder='Artist Name'
                    size="sm"
                    style={{width:"35%"}}
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
                </Button>

                </Group>

            </form>

        </div>
        </>

    );
}
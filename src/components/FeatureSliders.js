import React, {useState, useEffect} from 'react';
import { Text, Button, RangeSlider, Group, useMantineTheme, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ListSearch } from 'tabler-icons-react';
import './../App.css'

export default function FeatureSliders(props){

    const theme = useMantineTheme()
    const [pop, setPop] = useState([0,100]);
    const [dan, setDan] = useState([0,1]);
    const [ene, setEne] = useState([0,1]);
    const [aco, setAco] = useState([0,1]);
    const [che, setChe] = useState([0,1]);

    const slider={
        root:{
            width:"90%",
            marginTop:"-20px",
            marginBottom:"0px"
        },
        bar:{
            backgroundImage:"linear-gradient(90deg, #1DB954, green)",
        },
        thumb:{
            backgroundColor:"white",
            height:"5px",
            borderColor:'transparent'
        }
    }

    const marks = [
            { value: 35, label: 'low' },
            { value: 75, label: 'medium' },
            { value: 100, label: 'high' },

    ]

    const handleFilter = () =>{

        props.callback([
            pop,dan,ene,aco,che
        ])
    }

    return(
        <Group direction='column' 
        style={{
            width:"100%"
        }}>

            <Text weight={600} className="slider-text">Popularity:</Text>
            <RangeSlider
                color={"green"} radius="xl" label={null} styles={slider}
                onChangeEnd={(val) =>{setPop(val)}}
            />

            <Text weight={600} className="slider-text">Danceability:</Text>
            <RangeSlider
                color={"green"} radius="xl" label={null} styles={slider}
                onChangeEnd={(val) =>{setDan([val[0]/100, val[1]/100])}}
            />

            <Text weight={600} className="slider-text">Energy:</Text>
            <RangeSlider
                color={"green"} radius="xl" label={null} styles={slider}
                onChangeEnd={(val) =>{setEne([val[0]/100, val[1]/100])}}
            />

            <Text weight={600} className="slider-text">Acousticness:</Text>
            <RangeSlider
                color={"green"} radius="xl" label={null} styles={slider}
                onChangeEnd={(val) =>{setAco([val[0]/100, val[1]/100])}}
            />

            <Text weight={600} className="slider-text">Cheerfulness:</Text>
            <RangeSlider
                color={"green"} radius="xl" label={null} styles={slider}
                onChangeEnd={(val) =>{setChe([val[0]/100, val[1]/100])}}
            />
            <Button color="green" 
                radius="xl" style={{width:"90%"}}
                onClick={()=>{handleFilter()}}
            >
                <Text weight={700} className='track-text'>
                    Search with filters
                </Text>
            </Button>
        </Group>
    );
}
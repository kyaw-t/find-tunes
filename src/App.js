import React, { useState } from 'react';
import Main from './Main';
import './App.css'
import { MantineProvider } from '@mantine/core';


export default function App() {

    return(
        <MantineProvider theme={{ colorScheme: 'dark' }} 
            withGlobalStyles withNormalizeCSS>
        <div className='App-bg'>
            <Main/>
        </div>
        </MantineProvider>
    );

}
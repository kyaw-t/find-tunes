import React, { useState } from 'react';
import Main from './Main';
import './App.css'
import { MantineProvider } from '@mantine/core';


export default function App() {

    return(
        <div className='App-bg'>
        <MantineProvider theme={{ colorScheme: 'dark' }} 
            withGlobalStyles withNormalizeCSS>
            <Main/>
        </MantineProvider>
        </div>

    );

}
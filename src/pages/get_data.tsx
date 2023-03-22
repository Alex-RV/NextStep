import React from 'react'
import Container from './components/Container'
import { google } from 'googleapis';



const readData = async () => {
    console.log("readData function")
    const response = await fetch('/api/read_sheets', {
        method: 'GET',

    });
    console.log("readData done")
    const content = await response.json();
    console.log(content)
}


export default function get_data() {
  return (
    <Container>
        <div className='items-center mx-10 my-10 text-white'>
            <div>get_data</div>
            <button onClick={() => readData()}>Get data</button>
        </div>
    </Container>
    
  )
}

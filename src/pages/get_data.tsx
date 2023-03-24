import React from 'react'
import Container from './components/Container'
import { google } from 'googleapis';


const readData = async () => {
    console.log("readData function");
    const range = "A1:K5000";
    const column = "D1:D5000";
    const searchValue = 'alexsandrr2005@gmail.com';

    const url = new URL('/api/read_sheets', window.location.href);
    url.searchParams.append('column', column);
    url.searchParams.append('searchValue', searchValue);
    url.searchParams.append('range', range);

    const response = await fetch(url.toString(), {
    method: "GET",
    });
    console.log("readData done");
    const content = await response.json();
    console.log(content);
  };


export default function get_data() {
  return (
    <Container>
        <div className='items-center mx-10 my-10 text-white'>
            <div>get_data</div>
            <button onClick={() => readData()}>Auth get data</button>
        </div>
    </Container>
    
  )
}

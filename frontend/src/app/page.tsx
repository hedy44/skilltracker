"use client";
import { useState } from 'react' ;
import Greeting from '../components/Greeting'
export default function Home() {
  const [name, setName] =useState('');
  return (
    <main>
      <h1>Skilltracker MVP</h1>
      <input 
        type="text" 
        placeholder='Your name' 
        value={name} 
        onChange={e => setName(e.target.value)} />
       <Greeting name={name} 
       />
      <p>Welcome! This is the beginning of a visionary skill tracking platform.</p>
    </main>
  )
}


'use client';
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';

export default function ThemeToggle() {
  const [dark,setDark]=useState(false);
  useEffect(()=>setDark(document.documentElement.dataset.theme==='midnight'),[]);
  function toggle() {
    const next=!dark;document.documentElement.dataset.theme=next?'midnight':'studio';
    try{localStorage.setItem('zaidh-theme',next?'midnight':'studio')}catch{}
    setDark(next);
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark?'Studio light':'Midnight dark'} theme`} title={dark?'Studio theme':'Midnight theme'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button>;
}

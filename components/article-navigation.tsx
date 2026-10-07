'use client';
import {useEffect,useState} from 'react';
import {BookOpen} from 'lucide-react';

export default function ArticleNavigation({gallery}:{gallery:boolean}) {
  const [progress,setProgress]=useState(0),[active,setActive]=useState('overview');
  useEffect(()=>{
    function update(){const el=document.documentElement;const total=el.scrollHeight-innerHeight;setProgress(total>0?Math.min(100,Math.max(0,scrollY/total*100)):0)}
    update();window.addEventListener('scroll',update,{passive:true});
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-20% 0px -65% 0px'});
    document.querySelectorAll('.article-section[id]').forEach(s=>observer.observe(s));
    return()=>{window.removeEventListener('scroll',update);observer.disconnect()};
  },[]);
  return <nav className="case-nav" aria-label="Case study sections"><div className="shell"><span className="reading-label"><BookOpen size={16}/>Project story</span><div className="case-nav-links">{[{id:'overview',name:'Overview'},...(gallery?[{id:'gallery',name:'Gallery'}]:[]),{id:'engineering',name:'Engineering'},{id:'files',name:'Files'}].map(s=><a href={'#'+s.id} className={active===s.id?'active':''} key={s.id}>{s.name}</a>)}</div><span className="reading-progress" aria-label={Math.round(progress)+'% page progress'}><span style={{width:progress+'%'}}/></span></div></nav>;
}

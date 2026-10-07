'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Download,Menu,X,Mail,Linkedin,Github,ArrowUp,ArrowRight} from 'lucide-react';
import {asset} from '@/lib/paths';
import ThemeToggle from './theme-toggle';

export function Header() {
  const [open,setOpen]=useState(false),[active,setActive]=useState('');
  const pathname=usePathname();
  useEffect(()=>{
    setOpen(false);
    if(pathname.includes('/projects'))setActive('work');
    else if(pathname.includes('/about'))setActive('about');
    else if(pathname.includes('/archive'))setActive('files');
    else setActive('');
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&['work','skills','about','contact'].includes(e.target.id))setActive(e.target.id)})},{rootMargin:'-20% 0px -60% 0px'});
    document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));
    return()=>observer.disconnect();
  },[pathname]);
  return <header className="portfolio-header"><div className="portfolio-nav-shell">
    <Link className="portfolio-brand" href="/" aria-label="Zaidh Rizme home"><span className="portfolio-monogram">zr<span/></span><span>Zaidh Rizme<span>Mechatronics & robotics</span></span></Link>
    <nav className={'portfolio-navigation '+(open?'open':'')} aria-label="Main navigation"><Link href="/about/" className={active==='about'?'active':''} onClick={()=>setOpen(false)}>About</Link><Link href="/projects/" className={active==='work'?'active':''} onClick={()=>setOpen(false)}>Projects</Link><Link href="/#skills" className={active==='skills'?'active':''} onClick={()=>setOpen(false)}>Skills</Link><Link href="/archive/" aria-label="File archive" className={active==='files'?'active':''} onClick={()=>setOpen(false)}>Files</Link></nav>
    <div className="portfolio-nav-actions"><ThemeToggle/><a className="portfolio-cv" href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer">CV<Download size={15}/></a><button className="portfolio-menu" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>
  </div></header>;
}

export function Footer() {
  return <><section id="contact" className="portfolio-contact shell"><div><p className="section-context">Have a project in mind?</p><h2>Let’s work together.</h2><a className="portfolio-email" href="mailto:rizme.zaidh@gmail.com">rizme.zaidh@gmail.com<ArrowRight size={21}/></a></div><div className="portfolio-social"><a href="https://www.linkedin.com/in/zaidhriz/" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/>LinkedIn</a><a href="https://github.com/zaidh-mech" target="_blank" rel="noopener noreferrer"><Github size={18}/>GitHub</a><a href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer"><Download size={18}/>Engineering CV</a></div></section><footer className="portfolio-footer shell"><span>© 2026 Zaidh Rizme</span><span>Colombo, Sri Lanka</span><a href="#top">Back to top<ArrowUp size={14}/></a></footer></>;
}

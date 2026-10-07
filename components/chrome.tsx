'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Download,Menu,X,Mail,Linkedin,Github,MoveUpRight,ArrowUp} from 'lucide-react';
import {asset} from '@/lib/paths';
import ThemeToggle from './theme-toggle';

export function Header() {
  const [open,setOpen]=useState(false),[active,setActive]=useState('');
  const pathname=usePathname();
  useEffect(()=>{
    setOpen(false);
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)})},{rootMargin:'-15% 0px -60% 0px'});
    document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));
    return()=>observer.disconnect();
  },[pathname]);
  return <header className="site-header"><div className="nav-shell">
    <Link className="brand" href="/" aria-label="Zaidh Rizme home"><span className="brand-symbol">zr<span/></span><span>Zaidh Rizme<span>Engineering portfolio</span></span></Link>
    <nav className={open?'navigation open':'navigation'} aria-label="Main navigation">{[{name:'Projects',id:'work'},{name:'Skills',id:'skills'},{name:'About',id:'about'},{name:'Contact',id:'contact'}].map(n=><Link key={n.id} href={'/#'+n.id} className={active===n.id?'active':''} onClick={()=>setOpen(false)}>{n.name}</Link>)}<Link href="/archive/" className="mobile-archive" onClick={()=>setOpen(false)}>File archive</Link></nav>
    <div className="nav-actions"><ThemeToggle/><a className="nav-cv" href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer">View CV <Download size={15}/></a><button className="menu-button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  </div></header>;
}

export function Footer() {
  return <><section id="contact" className="contact"><div className="shell"><div className="contact-top"><span><span className="status-dot"/>Connect with Zaidh</span><span>Colombo, Sri Lanka</span></div><div className="contact-main"><h2>Great systems<br/>start with a conversation.</h2><a className="contact-arrow" href="mailto:rizme.zaidh@gmail.com" aria-label="Email Zaidh Rizme"><MoveUpRight size={48}/></a></div><div className="contact-bottom"><a className="email-link" href="mailto:rizme.zaidh@gmail.com"><Mail size={21}/>rizme.zaidh@gmail.com</a><div className="social-links"><a href="https://www.linkedin.com/in/zaidhriz/" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/>LinkedIn</a><a href="https://github.com/zaidh-mech" target="_blank" rel="noopener noreferrer"><Github size={18}/>GitHub</a><a href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer"><Download size={18}/>CV</a></div></div></div></section><footer className="footer"><div className="shell"><Link href="/" className="footer-name">Zaidh Rizme</Link><p>Mechanics. Electronics. Software.</p><span>© 2026</span><a href="#top">Back to top<ArrowUp size={15}/></a></div></footer></>;
}

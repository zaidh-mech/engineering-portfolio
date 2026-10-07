import {asset} from '@/lib/paths';
import Link from 'next/link';
import {ArrowRight,Download,FolderOpen,MoveUpRight,GraduationCap} from 'lucide-react';
import ProjectGrid from '@/components/project-grid';
import SkillsExplorer from '@/components/skills-explorer';
import {experience} from '@/data/projects';
import stats from '@/data/archive-stats.json';
const tools=['SolidWorks','KiCad','ESP32','Python','C/C++','MATLAB','ROS','Sensor fusion','PCB design','3D printing','Git'];

export default function Home() {
  return <main id="main" className="portfolio-home">
    <section className="personal-intro shell">
      <div className="intro-identity"><span className="status-dot"/><span>Zaidh Rizme<span>Based in Colombo, Sri Lanka</span></span></div>
      <h1>Mechatronics &<br/>robotics engineering.</h1>
      <p className="personal-deck">I bring mechanics, electronics and software together to build working systems. My work spans custom robots, industrial automation and embedded sensing—from the first design to the test bench.</p>
      <div className="intro-links"><Link className="about-pill" href="/about/"><span className="author-mark">ZR</span>About me<ArrowRight size={16}/></Link><a href="#work" className="intro-work">Explore my projects<ArrowRight size={16}/></a></div>
      <p className="current-role">Robotics engineering intern at <strong>Hype Invention</strong></p>
      <div className="tools-ribbon" aria-label="Technical skills"><span className="ribbon-label">Working with</span><div>{tools.map(t=><span key={t}>{t}</span>)}</div></div>
    </section>
    <section id="work" className="featured-work shell"><div className="feed-section-heading"><h2>Selected projects</h2><Link href="/projects/">All projects<ArrowRight size={15}/></Link></div><ProjectGrid featured/></section>
    <section id="skills" className="portfolio-skills shell"><div className="feed-section-heading"><div><h2>Skills in practice</h2><p>Choose a discipline to see the tools and the work behind them.</p></div></div><SkillsExplorer/></section>
    <section id="about" className="compact-about shell"><div className="compact-about-copy"><p className="section-context">The engineer behind the work</p><h2>Curious by nature.<br/>Hands-on by choice.</h2><p>I’m Zaidh, a mechatronics engineer who enjoys the point where a mechanism, a circuit and a piece of code have to work together.</p><div className="compact-education"><GraduationCap size={20}/><span>BEng (Hons) Mechatronics Engineering<span>University of Wolverhampton / CINEC, 2026</span></span></div><Link className="feed-story" href="/about/">More about me<ArrowRight size={16}/></Link></div><div className="career-preview"><h3>Current & recent experience</h3>{experience.slice(0,2).map(e=><div className="career-item" key={e.company}><span>{e.period}</span><strong>{e.role}</strong><span>{e.company}</span></div>)}<a className="text-link" href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer">View full CV<Download size={15}/></a></div></section>
    <section className="source-card shell"><FolderOpen size={26}/><div><h2>The source behind the stories.</h2><p>{stats.files} indexed engineering files, from native CAD and PCB layouts to firmware and original drawings.</p></div><Link href="/archive/" aria-label="Explore the engineering file archive"><MoveUpRight size={23}/></Link></section>
  </main>;
}

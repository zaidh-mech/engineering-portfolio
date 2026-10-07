import {asset} from '@/lib/paths';
import Link from 'next/link';
import {Cpu,Layers,FileText,FolderOpen,Download,ArrowDown,MoveUpRight,GraduationCap} from 'lucide-react';
import Assembly from '@/components/assembly';
import ProjectGrid from '@/components/project-grid';
import SkillsExplorer from '@/components/skills-explorer';
import {experience} from '@/data/projects';
import stats from '@/data/archive-stats.json';

export default function Home() {
  return <main id="main">
    <section className="hero">
      <div className="hero-grain" aria-hidden="true"/>
      <div className="shell hero-layout">
        <div className="hero-copy"><p className="hero-role"><span className="role-line"/>Mechatronics & robotics engineer</p><h1>Ideas,<br/>engineered<br/>into reality.</h1><p className="hero-description">I’m Zaidh. I bring mechanics, electronics and software together to build systems that sense, move and work.</p><div className="hero-actions"><a href="#work" className="button primary">Explore my work<ArrowDown size={18}/></a><a href={asset('/Zaidh-Rizme-CV.pdf')} target="_blank" rel="noopener noreferrer" className="hero-cv">View CV<Download size={16}/></a></div><div className="hero-location"><span className="status-dot"/><p>Robotics engineering intern<span>Hype Invention / Colombo, Sri Lanka</span></p></div></div>
        <Assembly/>
      </div>
      <div className="shell hero-foot"><span>Designed in CAD. Built for the real world.</span><a href="#work">Discover the projects<ArrowDown size={16}/></a></div>
    </section>
    <section id="work" className="work-section shell">
      <div className="section-heading"><div><p className="section-context">Selected engineering work</p><h2>The ideas.<br/>The iterations. The builds.</h2></div><p>Explore the projects through their stories,<br className="desktop-break"/> original designs and working prototypes.</p></div><ProjectGrid/>
    </section>
    <section id="skills" className="skills-section"><div className="shell"><div className="section-heading"><div><p className="section-context">Skills, connected</p><h2>Across disciplines.<br/>Around one system.</h2></div><p>My toolkit spans the physical and the digital.<br className="desktop-break"/> Choose a discipline to see it in practice.</p></div><SkillsExplorer/></div></section>
    <section className="archive-feature"><div className="shell archive-feature-layout"><div><span className="archive-badge"><FolderOpen size={18}/>Original project source</span><h2>Go beneath<br/>the surface.</h2><p>The detail behind the finished design. Native assemblies, circuit layouts, firmware, simulations and technical drawings.</p><Link href="/archive/" className="button light">Explore the file archive<MoveUpRight size={18}/></Link></div><div className="archive-specimen"><div className="archive-specimen-heading"><FolderOpen size={20}/><span>Engineering archive</span><strong>{stats.files}<span>files</span></strong></div>{[{icon:Layers,name:'Mechanical assemblies',detail:'SolidWorks / STEP',count:stats.categories.CAD},{icon:Cpu,name:'Circuits & board layouts',detail:'KiCad / Gerbers',count:stats.categories.Electronics},{icon:FileText,name:'Technical documentation',detail:'Drawings / reports',count:stats.categories.Documents}].map(item=><Link href="/archive/" className="archive-specimen-row" key={item.name}><item.icon size={24}/><div><strong>{item.name}</strong><span>{item.detail}</span></div><span>{item.count}<MoveUpRight size={16}/></span></Link>)}<div className="archive-specimen-footer"><span>From GitHub Brain</span><span>{stats.repositories} source repositories</span></div></div></div></section>
    <section id="about" className="about-section shell"><div className="section-heading"><div><p className="section-context">The engineer behind the work</p><h2>Curiosity starts it.<br/>Hands-on work makes it real.</h2></div></div><div className="about-intro"><p className="about-lead">I enjoy the moment when a mechanism, a circuit and a piece of code finally work together.</p><div><p>I’m Zaidh Rizme, a mechatronics engineer based in Colombo. My work spans custom robotics, industrial automation, embedded sensing and practical prototyping.</p><p>I follow the details from the first assembly to the test bench: how a part is made, where a sensor sits, how a control loop behaves, and what changes when the system is tested.</p><div className="education-note"><GraduationCap size={25}/><div><strong>BEng (Hons) Mechatronics Engineering</strong><span>University of Wolverhampton / CINEC Campus, 2026</span></div></div></div></div><div className="experience-block"><div><h3>Built through<br/>experience.</h3><p>From the classroom to the factory floor<br/>and robotics development.</p><a href={asset('/Zaidh-Rizme-CV.pdf')} className="text-link" target="_blank" rel="noopener noreferrer">See the full CV<Download size={16}/></a></div><div className="experience-list">{experience.map((e,i)=><details key={e.company} open={i===0}><summary><span className="experience-marker"/><span className="experience-title"><span>{e.period}</span><strong>{e.role}</strong><span>{e.company}</span></span><span className="details-symbol"/></summary><p>{e.body}</p></details>)}</div></div></section>
  </main>;
}

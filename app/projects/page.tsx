import type {Metadata} from 'next';
import ProjectGrid from '@/components/project-grid';
export const metadata:Metadata={title:'Engineering projects',description:'Explore original robotics, mechanical design, embedded electronics and sensing projects through their stories, CAD, prototypes and working files.'};
export default function ProjectsPage(){return <main id="main" className="projects-index shell"><header className="page-intro"><p className="section-context">Designs, prototypes & engineering stories</p><h1>The project collection.</h1><p>Seven projects across mechanics, electronics and software. Explore the brief, inspect the original imagery, and open each story for the engineering behind it.</p></header><ProjectGrid/></main>}

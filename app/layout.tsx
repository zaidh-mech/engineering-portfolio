import type {Metadata} from 'next';
import '@fontsource-variable/archivo';
import '@fontsource-variable/dm-sans';
import './globals.css';
import {Header,Footer} from '@/components/chrome';
export const metadata:Metadata={title:{default:'Zaidh Rizme | Mechatronics & Robotics Engineer',template:'%s | Zaidh Rizme'},description:'Engineering across mechanics, electronics and software. Explore Zaidh Rizme’s robotics, PCB design and industrial automation projects with original CAD, drawings and code.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zaidh-mech.github.io/engineering-portfolio/'),openGraph:{title:'Zaidh Rizme — Engineering in motion',description:'Robotics, embedded systems and industrial automation. Original projects, design decisions and engineering files.',type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}

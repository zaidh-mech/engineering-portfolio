// Next.js Windows export path issue: https://github.com/vercel/next.js/issues/92339
// Preserve all generated files and add the flat segment payload paths requested
// by Next's client router. No-op when the framework already emitted flat names.
import {readdirSync,copyFileSync,existsSync,readFileSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
let normalized=0;
function walk(directory){
 for(const item of readdirSync(directory,{withFileTypes:true})){
  const full=path.join(directory,item.name);
  if(item.isDirectory()){walk(full);continue;}
  if(!item.name.endsWith('.txt'))continue;
  const parts=path.relative(root,full).split(path.sep);
  const start=parts.findIndex((part,index)=>part.startsWith('__next.')&&index<parts.length-1);
  if(start<0)continue;
  const target=path.join(root,...parts.slice(0,start),parts.slice(start).join('.'));
  if(existsSync(target)){
   if(!readFileSync(target).equals(readFileSync(full)))throw new Error('Conflicting segment payload: '+target);
  }else{copyFileSync(full,target);normalized++;}
 }
}
walk(root);
console.log(JSON.stringify({normalizedSegmentPaths:normalized}));

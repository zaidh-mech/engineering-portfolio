import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.env.PORTFOLIO_TEST_ORIGIN || 'http://127.0.0.1:3100';
const prefix=process.env.NEXT_PUBLIC_BASE_PATH || '';
const base=origin+prefix;
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];const failed=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
await page.goto(base,{waitUntil:'networkidle'});
await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
await page.screenshot({path:'qa/home-desktop.png'});
await page.screenshot({path:'qa/home-full.png',fullPage:true});
await page.getByRole('button',{name:'Enclosure',exact:true}).click();
await expect(page.getByRole('button',{name:'Enclosure',exact:true})).toHaveAttribute('aria-pressed','true');
await page.getByRole('button',{name:'Control PCB',exact:true}).click();
await expect(page.getByRole('button',{name:'Control PCB',exact:true})).toHaveAttribute('aria-pressed','true');
await page.getByRole('button',{name:'Mechanical',exact:true}).click();
await expect(page.locator('.project-tile')).toHaveCount(2);
await page.getByRole('button',{name:'All work',exact:true}).click();
await expect(page.locator('.project-tile')).toHaveCount(7);
await page.locator('a.project-tile[href$="/projects/tof-slam/"]').click();await page.waitForURL('**/projects/tof-slam/');await page.getByRole('heading',{name:'ToF SLAM mobile robot',exact:true}).waitFor();
await page.locator('a.all-files').click();await page.waitForURL('**/archive/?project=tof-slam');await page.waitForFunction(()=>document.querySelector('select')?.value==='tof-slam');
for(const slug of ['tof-slam','modified-iron','flod-hopper','sense-oil','pcb-first','pcb-advanced','posture-research']){
 const response=await page.goto(base+'/projects/'+slug+'/',{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.ok(await page.locator('h1').textContent());
 await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
 const broken=await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));assert.deepEqual(broken,[],'Broken images on '+slug);
 if(slug==='tof-slam'){
  await page.screenshot({path:'qa/project-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'Enlarge Complete robot housing and scanner integration'}).click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
  await page.keyboard.press('ArrowRight');assert.ok((await page.locator('.lightbox-controls p').textContent()).includes('2 /'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
 }
}
await page.goto(base+'/archive/',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'CAD',exact:true}).click();assert.ok(await page.locator('.file-row').count()>0);
await page.getByRole('searchbox').fill('Hopper');assert.ok(await page.locator('.file-row').count()>0);
await page.getByRole('searchbox').fill('does-not-exist-987654321');await page.getByRole('heading',{name:'No matching files.'}).waitFor();
await page.getByRole('button',{name:'Clear filters'}).click();assert.equal(await page.locator('.file-row').count(),30);
await page.getByRole('button',{name:'Next',exact:true}).click();assert.ok((await page.locator('.pagination>span').textContent()).includes('Page 2'));
await page.getByRole('button',{name:'Reset filters'}).click();
await page.screenshot({path:'qa/archive-desktop.png',fullPage:true});
await page.goto(base+'/archive/?project=pcb-advanced',{waitUntil:'networkidle'});assert.equal(await page.getByRole('combobox').inputValue(),'pcb-advanced');
const layouts=[];
for(const width of [320,375,390,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/archive/','/projects/tof-slam/','/projects/modified-iron/']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));layouts.push({width,route,...size});assert.ok(size.scroll<=size.width,'Horizontal overflow '+JSON.stringify(size)+' '+route);
  if(width===390&&route==='/'){
   await page.screenshot({path:'qa/home-mobile.png',fullPage:true});
   await page.getByRole('button',{name:'Open navigation'}).click();await page.locator('nav.navigation').getByRole('link',{name:'File archive'}).click();await page.waitForURL('**/archive/');
  }
 }
}
await page.setViewportSize({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle'});await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');
for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>{document.documentElement.style.fontSize='200%'});await page.screenshot({path:'qa/text-zoom-'+width+'.png',fullPage:true});const zoom=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(zoom.scroll<=zoom.width,'200% text overflow '+JSON.stringify(zoom));}
assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
await browser.close();
fs.writeFileSync('qa/results.json',JSON.stringify({errors,failed,layouts,checks:'Assembly views, project filters, all project routes, image loading, modal keyboard controls, archive search/filter/pagination, project deep link, mobile menu, responsive widths, reduced motion'},null,2));
console.log(JSON.stringify({passed:true,routes:9,responsiveLayouts:layouts.length,browserErrors:errors.length,failedRequests:failed.length}));

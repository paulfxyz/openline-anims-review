// Dependency-free local preview with the same basic clean-URL behaviour as Vercel.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.md':'text/plain','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.zip':'application/zip','.woff2':'font/woff2'};
const port=Number(process.env.PORT||8080);
http.createServer(async(req,res)=>{
  try{
    const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let candidate=path.resolve(root,'.'+name);
    if(candidate!==root&&!candidate.startsWith(root+path.sep))throw Error('Invalid path');
    let stat=await fs.stat(candidate).catch(()=>null);
    if(stat?.isDirectory()){candidate=path.join(candidate,'index.html');stat=await fs.stat(candidate).catch(()=>null);}
    if(!stat&&!path.extname(candidate)){candidate+='.html';stat=await fs.stat(candidate).catch(()=>null);}
    if(!stat?.isFile()){res.writeHead(404);res.end('Not found');return;}
    res.setHeader('Content-Type',types[path.extname(candidate)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store');
    res.end(await fs.readFile(candidate));
  }catch{res.writeHead(400);res.end('Invalid request');}
}).listen(port,'127.0.0.1',()=>console.log(`Open http://localhost:${port}/delivery`));

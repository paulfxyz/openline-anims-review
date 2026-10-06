// Package only public tracked/source deliverables. Private correspondence lives outside this repo.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const candidates=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const files=[...new Set(candidates)].filter(f=>!f.startsWith('delivery/downloads/')&&f!=='delivery/integrity.json'&&!/^(?:\.git|\.vercel|node_modules|\.env)/.test(f)&&!/(?:private|credential|secret)/i.test(f)).sort();
const hashes=[];
for(const f of files){
  const b=await fs.readFile(path.join(root,f));
  hashes.push({path:f,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')});
}
const integrity={release:JSON.parse(await fs.readFile(path.join(root,'delivery/manifest.json'),'utf8')).release,qaSourceCommit:'b32598f579f45ac0514c81ed64c87e07970de587',note:'Checksums cover public source files; ZIP and this integrity inventory exclude themselves. Private commercial correspondence is not included.',files:hashes};
await fs.writeFile(path.join(root,'delivery/integrity.json'),JSON.stringify(integrity,null,2)+'\n');
await fs.mkdir(path.join(root,'delivery/downloads'),{recursive:true});
const output='delivery/downloads/openline-delivery-2026-10-06.zip';
await fs.rm(path.join(root,output),{force:true});
execFileSync('zip',['-q',output,'-@'],{cwd:root,input:[...files,'delivery/integrity.json'].join('\n')+'\n'});
console.log(JSON.stringify({file:output,sourceFiles:files.length,bytes:(await fs.stat(path.join(root,output))).size}));

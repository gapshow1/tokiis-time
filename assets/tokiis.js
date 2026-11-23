// Dibujo de los Tokiis: svgFor(id, "pequeno", estado)  (de documentos/tokiis/tokiis-vivos.html)

const NAVY='#23395B', CREMA='#FFF8EC', CORAL='#FF6B5B', AMARILLO='#FFC93C';
const PETS={
  kit:{name:'Kit',animal:'zorrito',main:'#FFC93C',dark:'#F0A92E',belly:CREMA,muzzle:[32,22],eye:'dot',line:NAVY,band:CORAL,ears:'fox',tail:'fox',nose:'dot',cheeks:true},
  popi:{name:'Popi',animal:'perrito',main:'#FF6B5B',dark:'#E4553F',belly:'#FFB3A8',muzzle:[28,20],eye:'dot',line:NAVY,band:'#19C2B0',ears:'floppy',tail:'dog',wings:true,nose:'dot',cheeks:false},
  mumu:{name:'Mumu',animal:'osito',main:'#F3E2C7',dark:'#EAD5B3',stroke:'#E2CBA6',belly:'#FFC9B9',bellyAnim:true,muzzle:[26,19],eye:'dot',line:NAVY,band:'#19C2B0',ears:'bear',nose:'dot',cheeks:true},
  rexi:{name:'Rexi',animal:'dinosaurio bebé',main:'#19C2B0',dark:'#12A394',belly:'#BFEFE8',eye:'white',line:NAVY,band:CORAL,ears:'spikes',tail:'dino',nose:'nostrils',stars:true,cheeks:true},
  kiro:{name:'Kiro',animal:'gatito',main:'#23395B',dark:'#1A2C47',belly:'#3B5682',eye:'white',line:CREMA,band:CORAL,ears:'cat',tail:'pencil',nose:'cat',glasses:true,whiskers:true,cheeks:false}
};
const STAGES={
  bebe:{label:'Bebé',hy:126,hs:1.1,by:216,bsx:.8,bsy:.7,ant:28,eye:13,text:'Así llega al empezar. Cabeza grande, cuerpito chiquito y antenitas cortas.'},
  pequeno:{label:'Pequeño',hy:106,hs:1,by:200,bsx:1,bsy:1,ant:44,eye:11,text:'Creció porque su niño subió de nivel haciendo misiones.'},
  grande:{label:'Grande',hy:94,hs:.9,by:198,bsx:1.04,bsy:1.25,ant:52,eye:9.5,text:'La etapa más avanzada: más alto, con pañuelo y un estilo menos infantil, que también sirve para los chicos de 11 a 14.'}
};
const MOODS={
  contento:{label:'😊 Contento',text:'Su estado normal: su niño viene haciendo misiones.'},
  hambre:{label:'🍽️ Con hambre',text:'Pasó un rato sin misiones y pide comida. Nunca se enferma: solo espera a su niño.'},
  comiendo:{label:'😋 Comiendo',text:'Su niño cumplió una misión y le dio de comer.'},
  cansado:{label:'😮‍💨 Cansado',text:'Después de mucho movimiento o al final de un día largo.'},
  sueno:{label:'🥱 Con sueño',text:'Se acerca la hora de dormir que configuraron los padres.'},
  dormido:{label:'😴 Durmiendo',text:'Es hora de dormir: el Tokii duerme, y la tablet también descansa.'},
  triste:{label:'🥺 Triste',text:'Un poquito triste porque extraña a su niño. Se alegra apenas vuelve.'},
  festejando:{label:'🥳 Festejando',text:'¡Misión cumplida o medalla ganada!'}
};

const poly=(pts,fill,extra='')=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}"${extra}/>`;
const mir=pts=>pts.map(([x,y])=>[-x,y]);
const STAR='0,-9 2.35,-3.24 8.56,-2.78 3.8,1.24 5.29,7.28 0,4 -5.29,7.28 -3.8,1.24 -8.56,-2.78 -2.35,-3.24';
const star=(x,y,s=1)=>`<polygon transform="translate(${x} ${y}) scale(${s})" points="${STAR}" fill="${AMARILLO}"/>`;
const apple=()=>`<circle cx="-6" cy="2" r="12" fill="#E8483B"/><circle cx="6" cy="2" r="12" fill="#E8483B"/><ellipse cx="-6" cy="-3" rx="4" ry="3" fill="#fff" opacity=".5"/><path d="M0 -9 Q2 -16 5 -18" stroke="${NAVY}" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="9" cy="-14" rx="7" ry="4" transform="rotate(-25 9 -14)" fill="#19C2B0"/>`;

function antennae(len,droop){
  let s='';
  for(const k of [1,-1]){
    let d,bx,by;
    if(droop){d=`M${-20*k} -42 Q${-38*k} -56 ${-52*k} -60`;bx=-54*k;by=-60;}
    else{d=`M${-20*k} -42 Q${-28*k} ${-42-len*.55} ${-32*k} ${-42-len}`;bx=-32*k;by=-44-len;}
    s+=`<path d="${d}" fill="none" stroke="${CORAL}" stroke-width="8" stroke-linecap="round"/>`;
    s+=`<circle class="ant" cx="${bx}" cy="${by}" r="10" fill="${AMARILLO}" stroke="#F0A92E" stroke-width="2"/>`;
  }
  return s;
}

function eyes(c,mood,er){
  const L=c.line, out=[];
  const pos=[-22,22], y=-4;
  const open=['contento','hambre','comiendo','triste'].includes(mood);
  if(open){
    let g='';
    for(const x of pos){
      if(c.eye==='dot'){g+=`<circle cx="${x}" cy="${y}" r="${er}" fill="${NAVY}"/><circle cx="${x+er*.35}" cy="${y-er*.35}" r="${er*.32}" fill="#fff"/>`;}
      else{g+=`<circle cx="${x}" cy="${y}" r="${er+1.5}" fill="${CREMA}"/><circle cx="${x+2}" cy="${y+2}" r="${er*.62}" fill="#0F1E33"/><circle cx="${x+er*.45}" cy="${y-er*.2}" r="${er*.22}" fill="#fff"/>`;}
    }
    out.push(`<g class="eyes">${g}</g>`);
    if(mood==='triste'){
      out.push(`<path d="M${-22-er} ${y-er-4} L${-22+er-2} ${y-er-11}" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`);
      out.push(`<path d="M${22+er} ${y-er-4} L${22-er+2} ${y-er-11}" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`);
      out.push(`<path class="tear" d="M-26 ${y+er+3} q-6 10 0 14 q6 -4 0 -14Z" fill="#7FD3F7"/>`);
    }
  } else if(mood==='festejando'){
    for(const x of pos) out.push(`<path d="M${x-er} ${y+3} Q${x} ${y-er-4} ${x+er} ${y+3}" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`);
  } else if(mood==='dormido'){
    for(const x of pos) out.push(`<path d="M${x-er} ${y} Q${x} ${y+er*.9} ${x+er} ${y}" fill="none" stroke="${L}" stroke-width="4.5" stroke-linecap="round"/>`);
  } else { /* cansado, sueno: medio cerrados */
    for(const x of pos){
      const fill=c.eye==='dot'?NAVY:CREMA;
      out.push(`<path d="M${x-er} ${y} A${er} ${er} 0 0 0 ${x+er} ${y} Z" fill="${fill}"/>`);
      if(c.eye!=='dot') out.push(`<circle cx="${x}" cy="${y+er*.45}" r="${er*.4}" fill="#0F1E33"/>`);
      out.push(`<path d="M${x-er-2} ${y} L${x+er+2} ${y}" stroke="${L}" stroke-width="3.5" stroke-linecap="round"/>`);
    }
  }
  return out.join('');
}

function mouth(c,mood){
  const L=c.line, F=c.line===CREMA?'#0F1E33':NAVY, S=c.line===CREMA?` stroke="${CREMA}" stroke-width="2"`:'';
  switch(mood){
    case 'festejando': return `<path d="M-14 25 Q0 47 14 25 Z" fill="${F}"${S}/><ellipse cx="0" cy="36" rx="6" ry="4" fill="#FF8F84"/>`;
    case 'hambre': return `<ellipse cx="0" cy="33" rx="6" ry="8" fill="${F}"${S}/>`;
    case 'comiendo': return `<ellipse class="chew" cx="0" cy="31" rx="8" ry="5" fill="${F}"${S}/>`;
    case 'triste': return `<path d="M-10 36 Q0 27 10 36" fill="none" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`;
    case 'sueno': return `<ellipse cx="0" cy="33" rx="7" ry="10" fill="${F}"${S}/>`;
    case 'cansado': return `<path d="M-9 32 Q-4 28 0 32 Q4 36 9 32" fill="none" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`;
    case 'dormido': return `<path d="M-6 30 Q0 34 6 30" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
    default: return `<path d="M-10 28 Q0 36 10 28" fill="none" stroke="${L}" stroke-width="4" stroke-linecap="round"/>`;
  }
}

function headSVG(c,S,mood){
  const droop=['triste','cansado','sueno','dormido'].includes(mood);
  const st=c.stroke?` stroke="${c.stroke}" stroke-width="3"`:'';
  let h=antennae(S.ant,droop);
  if(c.ears==='fox'){const o=[[-56,-22],[-50,-72],[-14,-50]],i=[[-46,-34],[-43,-60],[-24,-48]];h+=poly(o,c.dark)+poly(mir(o),c.dark)+poly(i,CREMA)+poly(mir(i),CREMA);}
  if(c.ears==='cat'){const o=[[-58,-16],[-52,-66],[-16,-46]],i=[[-48,-28],[-45,-52],[-28,-42]];h+=poly(o,c.main)+poly(mir(o),c.main)+poly(i,'#FF8F84')+poly(mir(i),'#FF8F84');}
  if(c.ears==='bear'){for(const x of [-50,50]) h+=`<circle cx="${x}" cy="-44" r="22" fill="${c.main}"${st}/><circle cx="${x}" cy="-44" r="11" fill="#FFC9B9"/>`;}
  if(c.ears==='spikes'){h+=poly([[50,-42],[72,-34],[56,-20]],AMARILLO)+poly([[58,-14],[80,-2],[60,8]],AMARILLO)+poly([[58,18],[76,34],[54,36]],AMARILLO);}
  h+=`<circle r="62" fill="${c.main}"${st}/>`;
  if(c.ears==='floppy'){const r=droop?26:14;h+=`<ellipse cx="-56" cy="-2" rx="17" ry="34" transform="rotate(${r} -56 -2)" fill="${c.dark}"/><ellipse cx="56" cy="-2" rx="17" ry="34" transform="rotate(${-r} 56 -2)" fill="${c.dark}"/>`;}
  if(c.muzzle) h+=`<ellipse cx="0" cy="24" rx="${c.muzzle[0]}" ry="${c.muzzle[1]}" fill="${CREMA}"/>`;
  if(c.stars) h+=star(-34,-40)+star(40,26,.8);
  h+=eyes(c,mood,S.eye);
  if(c.nose==='dot') h+=`<ellipse cx="0" cy="16" rx="7" ry="5" fill="${NAVY}"/>`;
  if(c.nose==='nostrils') h+=`<circle cx="-10" cy="18" r="2.5" fill="${c.dark}"/><circle cx="10" cy="18" r="2.5" fill="${c.dark}"/>`;
  if(c.nose==='cat') h+=poly([[-6,21],[6,21],[0,28]],'#FF8F84');
  h+=mouth(c,mood);
  if(c.cheeks) h+=`<ellipse cx="-38" cy="18" rx="10" ry="6" fill="${CORAL}" opacity="${mood==='festejando'?.6:.36}"/><ellipse cx="38" cy="18" rx="10" ry="6" fill="${CORAL}" opacity="${mood==='festejando'?.6:.36}"/>`;
  if(c.glasses){const r=S.eye+9;h+=`<circle cx="-22" cy="-4" r="${r}" fill="none" stroke="${AMARILLO}" stroke-width="4"/><circle cx="22" cy="-4" r="${r}" fill="none" stroke="${AMARILLO}" stroke-width="4"/><path d="M-5 -6 Q0 -10 5 -6" fill="none" stroke="${AMARILLO}" stroke-width="4" stroke-linecap="round"/>`;}
  if(c.whiskers) h+=`<path d="M-50 20 L-72 16 M-50 26 L-72 30 M50 20 L72 16 M50 26 L72 30" stroke="#8FA3C4" stroke-width="2.5" stroke-linecap="round"/>`;
  if(mood==='cansado') h+=`<path d="M50 -40 q-7 11 0 15 q7 -4 0 -15Z" fill="#7FD3F7"/>`;
  if(mood==='comiendo') h+=`<g transform="translate(18 48) scale(.8)"><g class="apple-eat">${apple()}</g></g>`;
  return h;
}

function bodySVG(c,mood,stage){
  const st=c.stroke?` stroke="${c.stroke}" stroke-width="3"`:'';
  const still=mood==='dormido';
  let b='';
  if(c.wings){b+=`<g transform="rotate(-28 -58 -24)"><ellipse ${still?'':'class="wingL"'} cx="-58" cy="-24" rx="26" ry="13" fill="${CREMA}" stroke="#F2D9C9" stroke-width="2"/></g><g transform="rotate(28 58 -24)"><ellipse ${still?'':'class="wingR"'} cx="58" cy="-24" rx="26" ry="13" fill="${CREMA}" stroke="#F2D9C9" stroke-width="2"/></g>`;}
  if(c.tail==='fox') b+=`<g class="tail" style="transform-origin:0% 100%"><ellipse cx="70" cy="-15" rx="22" ry="44" transform="rotate(32 70 -15)" fill="${c.main}"/><ellipse class="tipglow" cx="84" cy="-48" rx="12" ry="17" transform="rotate(32 84 -48)" fill="${CREMA}"/></g>`;
  if(c.tail==='dog') b+=`<path class="tail" style="transform-origin:0% 100%" d="M40 0 Q70 -12 66 -40" fill="none" stroke="${c.main}" stroke-width="12" stroke-linecap="round"/>`;
  if(c.tail==='dino') b+=`<path class="tail" style="transform-origin:100% 50%" d="M-36 0 Q-74 14 -96 -10 Q-70 30 -30 26 Z" fill="${c.main}"/>`;
  if(c.tail==='pencil') b+=`<g class="tail" style="transform-origin:0% 100%"><path d="M38 14 Q84 14 78 -32" fill="none" stroke="${c.main}" stroke-width="12" stroke-linecap="round"/><rect x="71" y="-60" width="14" height="26" rx="2" fill="${AMARILLO}"/><polygon points="71,-60 85,-60 78,-74" fill="${CREMA}"/><polygon points="75,-68 81,-68 78,-74" fill="${NAVY}"/><rect x="71" y="-40" width="14" height="6" fill="${CORAL}"/></g>`;
  b+=`<ellipse cx="-42" cy="-4" rx="11" ry="18" fill="${c.dark}"/><ellipse cx="42" cy="-4" rx="11" ry="18" fill="${c.dark}"/>`;
  b+=`<ellipse rx="46" ry="40" fill="${c.main}"${st}/>`;
  b+=`<ellipse ${c.bellyAnim?'class="belly"':''} cx="0" cy="6" rx="26" ry="24" fill="${c.belly}"/>`;
  if(c.stars) b+=star(30,-14)+star(-30,22,.8);
  b+=`<ellipse cx="-20" cy="38" rx="16" ry="9" fill="${c.dark}"/><ellipse cx="20" cy="38" rx="16" ry="9" fill="${c.dark}"/>`;
  if(stage==='grande') b+=`<path d="M-30 -33 Q0 -18 30 -33 L4 -6 Q0 -2 -4 -6 Z" fill="${c.band}"/><circle cx="0" cy="-15" r="4" fill="${AMARILLO}"/>`;
  return b;
}

function extras(S,mood,hx,hy){
  let e='';
  if(mood==='dormido'){[[0,0,20,0],[16,-14,15,1],[28,-26,11,2]].forEach(([dx,dy,fs,d])=>{e+=`<text class="zz" style="animation-delay:${d}s" x="${hx+46+dx}" y="${hy-58+dy}" font-family="Fredoka, sans-serif" font-weight="700" font-size="${fs}" fill="#FFE7A3">Z</text>`;});}
  if(mood==='sueno') e+=`<text class="zz" x="${hx+48}" y="${hy-52}" font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="#8FA3C4">z</text>`;
  if(mood==='hambre'){e+=`<circle cx="${hx+52}" cy="${hy-50}" r="4" fill="#fff" stroke="#E4E0D6" stroke-width="2"/><circle cx="${hx+62}" cy="${hy-64}" r="6" fill="#fff" stroke="#E4E0D6" stroke-width="2"/><circle cx="200" cy="${hy-84}" r="24" fill="#fff" stroke="#E4E0D6" stroke-width="2"/><g transform="translate(200 ${hy-84}) scale(.85)">${apple()}</g><text class="grr" x="170" y="${S.by+6}" font-family="Fredoka, sans-serif" font-weight="500" font-size="13" fill="#5B6B82">grrr</text>`;}
  return e;
}

function confetti(){
  const cols=[CORAL,AMARILLO,'#19C2B0',NAVY,'#FF8F84'];
  let s='';
  [[30,-10],[60,4],[90,-16],[125,-4],[160,-14],[195,2],[215,-12],[45,20],[110,14],[175,22],[20,30],[140,-20],[205,30],[75,-24]].forEach(([x,y],i)=>{s+=`<rect class="conf" style="animation-delay:${(i%7)*.22}s" x="${x}" y="${y}" width="7" height="11" rx="2" fill="${cols[i%5]}"/>`;});
  return s;
}

function svgFor(id,stage,mood,mini){
  const c=PETS[id], S=STAGES[stage];
  const head=`<g transform="translate(120 ${S.hy}) scale(${S.hs})">${headSVG(c,S,mood)}</g>`;
  const body=`<g transform="translate(120 ${S.by}) scale(${S.bsx} ${S.bsy})">${bodySVG(c,mood,stage)}</g>`;
  const ex=mini?'':extras(S,mood,120,S.hy);
  return `<svg viewBox="0 -24 240 296" role="img" aria-label="${c.name}, ${MOODS[mood].label}"${mini?' class="mini"':''}><g class="life m-${mood}">${body}${head}${ex}</g>${(!mini&&mood==='festejando')?confetti():''}</svg>`;
}


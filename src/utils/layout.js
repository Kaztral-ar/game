import { shuffle } from './shuffle';
export function generateLayout(count, buttonSize, playWidth, playHeight) {
  const margin=8; const cellSize=buttonSize+margin;
  let columns=Math.max(Math.floor(playWidth/cellSize),1); let rows=Math.max(Math.ceil(count/columns),1);
  while(rows*cellSize>playHeight && columns<count){columns+=1; rows=Math.ceil(count/columns);}
  const cells=[]; for(let r=0;r<rows;r++) for(let c=0;c<columns;c++) cells.push({row:r,col:c});
  const maxJitter=Math.max(margin/2-2,0);
  return shuffle(cells).slice(0,count).map(({row,col})=>{const jitterX=maxJitter?(Math.random()*2-1)*maxJitter:0; const jitterY=maxJitter?(Math.random()*2-1)*maxJitter:0; const x=col*cellSize+jitterX; const y=row*cellSize+jitterY; return {x:Math.max(0,Math.min(x,playWidth-buttonSize)),y:Math.max(0,Math.min(y,playHeight-buttonSize))};});
}

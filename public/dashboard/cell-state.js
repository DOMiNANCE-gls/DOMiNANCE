/* Shared private review-state validation. No academic text is loaded by the account shell. */
(function(root){
 function empty(){return{version:1,lessons:{},attempts:[],draft:null}}
 function state(raw,data){if(raw===null||raw===undefined||raw==='')return empty();const s=typeof raw==='string'?JSON.parse(raw):raw;const lessons=new Set(data.lessons.map(l=>l.id)),questions=new Map(data.questions.map(q=>[q.id,q]));const time=v=>typeof v==='string'&&Number.isFinite(Date.parse(v));
  const answers=items=>Array.isArray(items)&&items.length>0&&items.length<=170&&new Set(items.map(x=>x?.question)).size===items.length&&items.every(x=>questions.has(x?.question)&&Number.isInteger(x.option)&&x.option>=0&&x.option<4);
  if(s?.version!==1||!s.lessons||Array.isArray(s.lessons)||Object.entries(s.lessons).some(([id,date])=>!lessons.has(id)||!time(date))||!Array.isArray(s.attempts)||s.attempts.length>100||s.attempts.some(a=>typeof a.id!=='string'||!a.id||a.id.length>100||!time(a.completedAt)||!answers(a.answers))||new Set(s.attempts.map(a=>a.id)).size!==s.attempts.length)throw Error('Invalid Cell Structure history');
  if(s.draft){const d=s.draft;if(typeof d.id!=='string'||!d.id||d.id.length>100||!Array.isArray(d.questions)||!d.questions.length||d.questions.length>170||new Set(d.questions).size!==d.questions.length||d.questions.some(id=>!questions.has(id))||!Number.isInteger(d.index)||d.index<0||d.index>=d.questions.length||!Array.isArray(d.answers)||d.answers.length!==d.index||!d.answers.every((a,i)=>a.question===d.questions[i])||(d.answers.length&&!answers(d.answers))||!(d.selected===null||(Number.isInteger(d.selected)&&d.selected>=0&&d.selected<4))||typeof d.checked!=='boolean'||(d.checked&&d.selected===null))throw Error('Invalid practice draft')}
  return JSON.parse(JSON.stringify(s));
 }
 function merge(existing,incoming,data){const a=state(existing,data),b=state(incoming,data),attempts=new Map([...a.attempts,...b.attempts].map(x=>[x.id,x]));return JSON.stringify(state({...b,lessons:{...a.lessons,...b.lessons},attempts:[...attempts.values()]},data))}
 function score(attempt,data){return attempt.answers.reduce((n,a)=>n+(data.questions.find(q=>q.id===a.question)?.letter.charCodeAt(0)-65===a.option?1:0),0)}
root.DominanceCellState={state,merge,score};
})(globalThis);

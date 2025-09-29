
function loadConversations(){
  fetch('/admin/conversations')
  .then(res=>res.json())
  .then(data=>{
    const container=document.getElementById('conversations');
    container.innerHTML='';
    for(let id in data){
      const conv = data[id];
      const div=document.createElement('div');
      div.style.border='1px solid #ccc'; div.style.margin='10px'; div.style.padding='10px';
      div.innerHTML='<b>'+conv.name+'</b> ('+conv.email+')<br>'+conv.messages.map(m=>m.from+': '+m.text).join('<br>');
      const input=document.createElement('input');
      input.placeholder='Type reply...';
      const btn=document.createElement('button');
      btn.textContent='Send Reply';
      btn.onclick=()=>{
        fetch('/admin/reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitorId:id,message:input.value})})
        .then(r=>r.text()).then(r=>{alert(r); loadConversations();});
      };
      div.appendChild(input); div.appendChild(btn);
      container.appendChild(div);
    }
  });
}
loadConversations();


const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keypress', e => {
  if(e.key==='Enter'){
    const msg = chatInput.value.trim();
    if(msg!==''){
      addMessage('You', msg);
      chatInput.value='';
      fetch('/send-message', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name:'Visitor', email:'visitor@example.com', message:msg})
      })
      .then(res=>res.json())
      .then(data=>console.log('Message ID:', data.visitorId))
      .catch(err=>console.error(err));
    }
  }
});

function addMessage(sender, text){
  const div = document.createElement('div');
  div.textContent = sender+': '+text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

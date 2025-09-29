const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const msg = chatInput.value.trim();
    if (msg !== '') {
      addMessage('You', msg);
      chatInput.value = '';
      // simulate response
      setTimeout(() => addMessage('Support', 'Thanks for your message!'), 1000);
    }
  }
});

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.textContent = sender + ': ' + text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

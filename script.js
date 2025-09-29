const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const msg = chatInput.value.trim();
    if (msg !== '') {
      addMessage('You', msg);
      chatInput.value = '';

      fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'User', email: 'user@example.com', message: msg })
      })
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => console.error(err));

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
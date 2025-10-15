
/* Simple chat widget - uses Firebase; configure firebaseConfig in this file or include it globally */
(function(){
  // Minimal widget: opens a popup window with /chat.html?widget=1 or toggles a chat panel if present
  function createButton(){
    if(document.getElementById('assistant-chat-widget-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'assistant-chat-widget-btn';
    btn.setAttribute('aria-label','Open chat');
    btn.style.position='fixed';
    btn.style.right='16px';
    btn.style.bottom='80px';
    btn.style.zIndex=9999;
    btn.style.border='none';
    btn.style.borderRadius='50%';
    btn.style.width='56px';
    btn.style.height='56px';
    btn.style.boxShadow='0 6px 18px rgba(0,0,0,.2)';
    btn.style.background='#0077ff';
    btn.style.color='white';
    btn.style.fontSize='20px';
    btn.textContent='💬';
    btn.onclick = function(){
      // open chat in new window (or modal if you prefer)
      const url = 'chat.html?from_widget=1';
      const w = window.open(url, 'chatwin', 'width=420,height=720');
      if(!w) window.location.href = url;
    };
    document.body.appendChild(btn);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', createButton);
  else createButton();
})();

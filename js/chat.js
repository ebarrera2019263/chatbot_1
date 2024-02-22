document.addEventListener('DOMContentLoaded', function() {




  const chatContainer = document.getElementById('chat-container');
  const messagesContainer = document.getElementById('messages');
  const inputField = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  const themeToggleButton = document.getElementById('theme-toggle');




  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  themeToggleButton.checked = currentTheme === 'dark';

  themeToggleButton.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', themeToggleButton.checked);
    localStorage.setItem('theme', themeToggleButton.checked ? 'dark' : 'light');
  });

  
  function addMessageToChat(msg, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = msg;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
  }

  
  function sendMessage() {
    const messageText = inputField.value.trim();
    if (messageText) {
      addMessageToChat(messageText, 'user');
      inputField.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight; 

    }
  }

  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      sendMessage();
    }
  });

  sendButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    sendMessage();
  });

  window.addEventListener('resize', function() {
    
  });
});

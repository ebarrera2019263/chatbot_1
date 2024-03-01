document.addEventListener('DOMContentLoaded', async function() {
  const messagesContainer = document.getElementById('messages');
  const sendMessageButton = document.getElementById('send-message');
  const usernameInput = document.getElementById('username');
  const messageInput = document.getElementById('message');
  const themeToggleButton = document.getElementById('theme-toggle');

  // Cargar el tema actual desde el localStorage y aplicarlo
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  themeToggleButton.checked = currentTheme === 'dark';


  // Cambiar el tema al presionar el botón de alternancia del tema y guardarlo en el localStorage
  themeToggleButton.addEventListener('change', function() {
      const isDarkMode = themeToggleButton.checked;
      document.body.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });

  
  setInterval(loadMessages, 5000);

  //funcion para cargar los mensajes de la api de ludwuing 
  async function loadMessages() {
      try {
          const response = await fetch('http://uwu-guate.site:3000/messages');
          const messages = await response.json();
          messagesContainer.innerHTML = ''; 
 //limpiar el contenedor de mensajes antes de agregar los nuevos mensajes
          messages.forEach(message => {
              const messageElement = document.createElement('div');
              messageElement.classList.add('message');

              
              if (/\.(jpeg|jpg|gif|png)$/.test(message.content)) {
                  const image = new Image();
                  image.src = message.content;
                  image.style.maxWidth = '200px'; 
                  image.style.maxHeight = '200px';
                  messageElement.appendChild(image);
              } else {
                  messageElement.textContent = `${message.username}: ${message.content}`;
              }

              messagesContainer.appendChild(messageElement);
          });

          messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
          console.error('Error al cargar los mensajes:', error);
      }
  }


  //funcion para enviar mensajes a la api de ludwuing
  async function sendMessage() {
      const username = usernameInput.value.trim();
      const content = messageInput.value.trim();

      if (username && content) {
          try {
              const response = await fetch('http://uwu-guate.site:3000/messages', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ username: username, message: content })
              });
              const data = await response.json();
              console.log('Mensaje enviado:', data);
              messageInput.value = ''; 
          } catch (error) {
              console.error('Error al enviar mensaje:', error);
          }
      }
  }

  sendMessageButton.addEventListener('click', sendMessage);
  loadMessages();
});

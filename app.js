const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

// Chat Stuff
const chatWindow = document.getElementById('chatWindow');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Login Stuff
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('loginWindow');

const messages = [
    {
    author: 'Dora Belme',
    date: '2/24/2020',
    content: 'Cool message',
    type: messageTypes.RIGHT
    },
    {
        author: 'Dora Belme',
        date: '2/24/2020',
        content: 'Cool message',
        type: messageTypes.LEFT
    },
    {
        author: 'Dora Belme',
        date: '2/24/2020',
        type: messageTypes.LOGIN
    }]; // {author, date, content, type}


// take in message object, and return corresponding message HTML
const createMessageHTML = message => {
    if (message.type === messageTypes.LOGIN) {
        return `<p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>`;
    }

    return `
        <div class="message ${message.type === messageTypes.LEFT ? 'message-left' : 'message-right'}">
            <div id="message-details" class="flex">
                <p class="message-author">${message.author === messageTypes.RIGHT ? '': message.author}</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>`
}

const displayMessages = () => {
    const messagesHTML = messages.map(message => createMessageHTML(message)).join('');
    messagesList.innerHTML = messagesHTML;
}

displayMessages();
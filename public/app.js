const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

// Chat Stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Login Stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}

var socket = io();
socket.on('message', message => {
    console.log(message);
    if (message.type !== messageTypes.LOGIN) {
        if (message.author === username) {
            message.type = messageTypes.RIGHT;
        }
        else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();
    chatWindow.scrollTop = chatWindow.scrollHeight;

})

// take in message object, and return corresponding message HTML
const createMessageHTML = message => {
    if (message.type === messageTypes.LOGIN) {
        return `<p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>`;
    }

    return `
        <div class="message ${
            message.type === messageTypes.LEFT
                ? 'message-left'
                : 'message-right'
        }">
            <div id="message-details" class="flex">
                <p class="message-author">${
                    message.type === messageTypes.RIGHT ? '' : message.author
                }</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>`;
};

const displayMessages = () => {
    const messagesHTML = messages
        .map(message => createMessageHTML(message))
        .join('');
    messagesList.innerHTML = messagesHTML;
};

displayMessages();

// sendBtn callback
sendBtn.addEventListener('click', e => {
    // preventDefault of a fomr
    e.preventDefault();

    // set the username and create logged in message
    if (!messageInput.value) {
        return console.log('must supply a username');
    }

    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const dateString = `${month}/${day}/${year}`;
    
    const message = {
        author: username,
        date: dateString,
        content: messageInput.value,
    };

    
    sendMessage(message);
    // messages.push(message);
    // displayMessages();

    messageInput.value = '';
    // chatWindow.scrollTop = chatWindow.scrollHeight;
});

const sendMessage = message => {
    socket.emit('message', message);
}

// loginBtn callback
loginBtn.addEventListener('click', e => {
    // preventDefault of a fomr
    e.preventDefault();

    // set the username and create logged in message
    if (!usernameInput.value) {
        return console.log('must supply a username');
    }
    username = usernameInput.value;

    sendMessage({
        author: username,
        type: messageTypes.LOGIN,
    });

    // hide login and show chat window
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
});

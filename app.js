import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
import { getDatabase, ref, push, onChildAdded, onValue } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js';

// Initialize Firebase with your config
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAOgC8M2o5Wz8yl3f1wGQ8p_rUWXujckpw",
    authDomain: "livechattest-39175.firebaseapp.com",
    databaseURL: "https://livechattest-39175-default-rtdb.firebaseio.com",
    projectId: "livechattest-39175",
    storageBucket: "livechattest-39175.appspot.com",
    messagingSenderId: "790569864878",
    appId: "1:790569864878:web:8d3fa30563adfdbaaaa73f"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebaseApp);

// Reference to the messages node
const messagesRef = ref(database, 'messages');

// Listen for new messages
onChildAdded(messagesRef, (childSnapshot) => {
    const message = childSnapshot.val();
    displayMessage(message.name, message.text);
});

// Function to send a message

$('body').on('click','.send',function(){
    sendMessage()
})

function sendMessage() {
    const messageInput = $('#messageInput');
    var name = localStorage.getItem('chatUserName');
    if(!name){
        name = prompt('Enter your name:');
        localStorage.setItem('chatUserName', name);
    }
    

    const messageText = messageInput.val().trim();

    if (messageText !== '') {
        push(messagesRef, { name, text: messageText });
        messageInput.val('');
    }
}

// Function to display a message
function displayMessage(name, text) {
    const messagesList = $('#messages');
    const messageElement = $('<li>');
    messageElement.text(`${name}: ${text}`);
    messagesList.append(messageElement);
}

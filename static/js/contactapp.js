import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js'

const firebaseConfig = {
    apiKey: "PERSONALAPIKEY",
    authDomain: "PERSONALAUTHDOMAIN",
    databaseURL: "URLFORPERSONALDATABASE",
    projectId: "jamesthecat-ID",
    storageBucket: "jamesthecat-ID.appspot.com",
    messagingSenderId: "SENDERID",
    appId: "PERSONALAPPID",
    measurementId: "MEASUREMENTID"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Listen for submit
var first = document.querySelector(".contact-form");//.addEventListener("submit", submitForm);

if (first) {
    first.addEventListener("submit", submitForm, false);
}

function submitForm(e) {
    e.preventDefault();

    //Get all inputs
    let name=document.querySelector('#name').value;
    let number=document.querySelector('#number').value;
    let email=document.querySelector('#email').value;
    let message=document.querySelector('#message').value;
    console.log(name, number, email, message);

    saveContactInfo(name, number, email, message);
}

function saveContactInfo(name, number, email, message) {
    const savedInfo=getDatabase();

    set(ref(savedInfo, 'users/' + number), {
        Username: name,
        Phone: number,
        Email: email,
        Message: message,
    });
}

//var second = document.querySelector(".searchMJS");//.addEventListener("submit", submitRequest);

//if (second) {
//    second.addEventListener("submit", submitRequest, false);
//}
//function submitRequest(e) {
//    e.preventDefault();

    //Get all inputs
//    let searchRequest=document.querySelector('#requestBREED').value;
//    console.log(searchRequest);

//    saveRequestInfo(searchRequest);
//}

//function saveRequestInfo(searchRequest) {
//    const savedInfo=getDatabase();

//    set(ref(savedInfo, 'requests/' + searchRequest), {
//        Request: searchRequest,
//    });
//}
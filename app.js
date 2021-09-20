const firebaseConfig = {
    apiKey: "AIzaSyADW35Zy2u2Dgfq6HcdvvLTJPmdfAu8gy4",
    authDomain: "shah-e8364.firebaseapp.com",
    projectId: "shah-e8364",
    storageBucket: "shah-e8364.appspot.com",
    messagingSenderId: "518412424458",
    appId: "1:518412424458:web:d6b927c2998f8b60fe56f3",
    measurementId: "G-2GPS2DK35L"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function logout() {
    auth.signOut();
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}


auth.onAuthStateChanged((user) => {
    if (user) {
        firestore.collection('users').doc(user.uid).set({
            email: user.email,
            lastLoggedInAt: new Date()
        })
            .then(() => {
                console.log("Document written");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setData(user);
        setMessages();
        document.getElementById("user").innerHTML = user.email;
        document.getElementById("login_box").style.display = "none";
        document.getElementById("welcome_box").style.display = "block";
    } else {
        document.getElementById("login_box").style.display = "block";
        document.getElementById("welcome_box").style.display = "none";
    }
});

const setData = (user) => {
    firestore.collection('users').doc(user.uid).get().then((querySnapshot) => {
        const data = querySnapshot.data();
        const lastLoggedInAt = data.lastLoggedInAt;
        const lastLoggedInSpan = document.getElementById("lastLoggedIn");
        lastLoggedInSpan.innerHTML = lastLoggedInAt;
    });
}

const setMessages = () => {
    const messagesRef = firestore.collection('messages');
    messagesRef.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
                createElementsForMessage(change.doc.data());
            }
        });
    });
};
let popped = 0;


document.addEventListener('mouseover', function(game){
    
    if (game.target.className === "lv1"){
        
                game.target.style.backgroundColor = "white";
                game.target.textContent = "POP";
                popped++;
                removeEvent(game);
                checkAllPopped();
    } 
    else if (game.target.className === "wrong")  {
        game.target.style.backgroundColor = "#ededed";
        game.target.textContent = "FAIL";
        removeEvent(game);
        checkAllPopped();
    }
        

    
});

function removeEvent(game){
    game.target.removeEventListener('mouseover', function(){
        
    })
};


function checkAllPopped(){
    if (popped === 4){
        console.log('all popped!');
        let gallery = document.querySelector('#balloon');
        let message = document.querySelector('#congrats');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }
   
};
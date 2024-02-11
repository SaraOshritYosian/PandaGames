//see the password or not
const wrapper = document.querySelector('.wrapper');
const loginForm = document.getElementById('loginForm');
const signUpForm  = document.getElementById('signUpForm');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
function togglePasswordVisibility(formId) {//to see the password
    
    var passwordInput = document.getElementById(formId);
    var eyeIcon1 = document.querySelector(".input-box .eye-open");
    var eyeIcon2 = document.querySelector(".input-box .eye-close");
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        eyeIcon2.style.display="";
        eyeIcon1.style.display="block";
    } else {
        passwordInput.type = "password";
        eyeIcon2.style.display="block";
        eyeIcon1.style.display="none";
    }
}
registerLink.addEventListener('click', () => { wrapper.classList.add('active') ;});//log in or sing up

loginLink.addEventListener('click', () => { wrapper.classList.remove('active');});

//click on log in open thr Games PAGE
/*function openGamesPage(){
    window.location.href = 'games.html';
}
*/
//אם לא מקליד או מכניס קלט שגוי אז המסגרת אדומה
var emailLogin = document.getElementById('EmailLogin');
var passwordInput1 = document.getElementById('passwordInput1');
var username = document.getElementById('Username');
var emailSignUp = document.getElementById('EmailSignUp');
var passwordInput2 = document.getElementById('passwordInput2');
let errorMessage = document.getElementById('errorMessage');
let usernameMessage = document.getElementById('usernameMessage');
let emailMessage = document.getElementById('emailMessage'); 
let emailLoginMessage = document.getElementById('emailLoginMessage');
let PasswordMessage = document.getElementById('PasswordMessage');

let incorrectAttempts = 0;
let blockedUser = false;
// פונקציה שבודקת תקינות ונכונות של שחקן רשום
function loginClick() {

    if (blockedUser) {
        errorMessage.innerHTML = 'Account is blocked. Please try again later.';
        return;
    }
    const enteredEmail = emailLogin.value;
    const enteredPassword = passwordInput1.value;

    const userData = JSON.parse(localStorage.getItem('user_data')) || [];

    // Find the user with the entered email
    const currentUser = userData.find(user => user.email === enteredEmail);

   

    // Check if the user exists
    if (enteredEmail != '' & !currentUser) {
        emailLoginMessage.innerHTML = 'Email does not exist.';
        //PasswordMessage.innerHTML = '';
        return;
    }

    // Check if the entered password matches the user's password
    if (currentUser.password !== enteredPassword) {
        incorrectAttempts++;
        PasswordMessage.innerHTML = 'Incorrect password. Please try again.';
        checkIncorrectAttempts();
        //emailLoginMessage.innerHTML = '';
        return;
    }
    // Login successful
    incorrectAttempts = 0;
    emailLoginMessage.innerHTML = '';
    PasswordMessage.innerHTML = '';
    errorMessage.innerHTML='';
    loginForm.reset();
    setLoginCookie(); // Set cookie on successful login
    window.location.href = 'games.html';
}

function checkIncorrectAttempts() {
    if (incorrectAttempts >= 3) {
        blockedUser = true;
        errorMessage.innerHTML = 'Too many incorrect attempts. Account blocked.';
    }
}

function setLoginCookie() {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30); // Set expiration time (30 minutes in this example)
    document.cookie = `loggedIn=true;expires=${expirationTime.toUTCString()};path=/`;
}

const remember = document.querySelector('.conditions');
//פונקציה שבודקת שחקן חדש
function signUpClick(){
    const username1 =username.value;
    const email=emailSignUp.value;
    const password=passwordInput2.value;
    usernameMessage.innerHTML='';
    emailMessage.innerHTML='';
    //window.alert("dd"+username1+ email +password);
   // localStorage.clear()
    event.preventDefault();
    if (email !=''& !email.endsWith('@gmail.com')) {//האם המבנה לא נכון אז הודעה
        emailMessage.innerHTML= 'Error Email';
        return;
    }
    const existingData = JSON.parse(localStorage.getItem('user_data')) || [];
    const userExists = existingData.some(user => user.username1 === username1);
    if (userExists) {
        usernameMessage.innerHTML='Username. Please choose different ones.';
        return;
    }
    const MailExists = existingData.some(user =>user.email === email);
    if (MailExists) {
        emailMessage.innerHTML='email already exists.';
        return;
    }
    
    if(document.getElementById("registercheckbox").checked == false){
        remember.style.color='red';
        remember.style.webkitTextStrokeColor='black';
        return;
    }
    
      // Create a new user object and add it to local storage
     const newUser = {username1, email, password };
     existingData.push(newUser);
     localStorage.setItem('user_data', JSON.stringify(existingData));
     alert('Sign up successful! ');
     

      // Clear the form fields
      signUpForm.reset();
      window.location.href = 'games.html';
                        
    }



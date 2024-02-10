//see the password or not
const wrapper = document.querySelector('.wrapper');
const signUpForm = document.querySelector('.form-box.register form');
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
let loginMessage = document.getElementById('errorMessage');
let registerMessage = document.getElementById('registerMessage');

// פונקציה שבודקת תקינות ונכונות של שחקן רשום
function loginClick() {
    var email = document.getElementById('EmailLogin').value;
    var password = document.getElementById('passwordInput1').value; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {//האם המבנה לא נכון אז הודעה
        loginMessage.innerHTML= 'Enter Email';
        return;
    }
    else{
    } 

    if (email === "example@example.com" && password === "password") {
        setCookie("user", email, 1); // Expires in 1 day
        window.location.href = "games.html";
    } else {
        // Example: Invalid login, track attempts and block if necessary
        var attempts = localStorage.getItem('loginAttempts') || 0;
        attempts++;
        localStorage.setItem('loginAttempts', attempts);
        if (attempts >= 3) {
            // Example: Block the user after 3 failed attempts
            localStorage.setItem('blockedUser', email);
            alert("You have been blocked due to multiple failed login attempts.");
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }
}

registerMessage.innerHTML=''; 
//פונקציה שבודקת שחקן חדש
function signUpClick(){
    const username = document.getElementById('Username').value;
    const email = document.getElementById('EmailSignUp').value;
    const password = document.getElementById('passwordInput2').value; 
    //localStorage.clear()
    event.preventDefault();
    if(username ==""){    
        registerMessage.innerHTML= 'Enter userName';
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)|| email.endsWith('@gmail.com')) {//האם המבנה לא נכון אז הודעה
        registerMessage.innerHTML= 'Enter Email';
        return;
    }
    if(password ==""){    
        registerMessage.innerHTML= 'Enter password';
        return;
    }
    // Get the values entered by the user
    const existingData = JSON.parse(localStorage.getItem('user_data')) || [];
        const userExists = existingData.some(user => user.username === username || user.email === email);

        if (userExists) {
            registerMessage.innerHTML='Username or email already exists. Please choose different ones.';
            return;
        }

        // Create a new user object and add it to local storage
        const newUser = { username, email, password };
        existingData.push(newUser);
        localStorage.setItem('user_data', JSON.stringify(existingData));

        // Optionally, you can redirect to a different page or perform other actions after successful sign-up
        alert('Sign up successful! '+ username+ email+password);

        // Clear the form fields
        signUpForm.reset();
    }

/*Function to set a cookie with expiration time
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}*/

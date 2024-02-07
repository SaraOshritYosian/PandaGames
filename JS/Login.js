//see the password or not
const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
function togglePasswordVisibility() {//to see the password
    
    var passwordInput = document.getElementById("passwordInput");
    var eyeIcon1 = document.querySelector(".input-box .eye-open");
    var eyeIcon2 = document.querySelector(".input-box .eye-close");
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        eyeIcon2.style.display="none";
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
function openGamesPage(){
    window.location.href = 'games.html';
}

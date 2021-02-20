const roll = document.getElementById("rollNumber");
const name = document.getElementById("Name");
const dep = document.getElementById("Department");
const sec = document.getElementById("section");
const email = document.getElementById("Email");
const phone = document.getElementById("Phone");
const dept = document.getElementById("Department");
const section = document.getElementById("section");

const password = document.getElementById("password");
const re_pass = document.getElementById("re-password");

//checking and validating by adding an even listener
const form = document.getElementById("form");

// document.write(roll.value + "<br>");
// document.write(name.value + "<br>");
// document.write(dep.value+ "<br>");
// document.write(section.value + "<br>");
// document.write(email.value + "<br>");
// document.write(phone.value + "<br>");
// document.write(password.value + "<br>");
// document.write(re_pass.value + "<br>");

//validating a form 
function validate(){
    return (validateRoll(roll) && validateEmail(email) 
           && validatePhone(phone) && validatePassword(password,re_pass));
}


//validating phone with a regular expression 
function validatePhone(phone){
    const regx = /^[6-9][0-9]{9}$/;
    if(!regx.test(phone.value)){
        const errorPhone = document.getElementById("phone-error");
        errorPhone.innerHTML = " write the correct phone number ";
        return false;
    }
    return true;
}

function validateEmail(email){
   // const regx = /^([a-zA-Z0-9/./_]+)(@)(a-zA-Z){2,8}(.)(a-zA-Z)((.)(a-zA-Z){2,8})?$/;
   const regx = /^([a-zA-Z0-9]+)(@)([a-zA-Z]{2,8})(.)([a-zA-Z]{2,8})(.)([a-zA-Z]{2,8})$/
    if(!regx.test(email.value)){
        const errorEmail = document.getElementById("email-error");
        errorEmail.innerHTML = "write a valid email address";
        return false;
    }
    return true;
}

function validateRoll(roll){
    const regx = /^[1-9][0-9][a-zA-Z0-9]{8}$/
    if(!regx.test(roll.value)){
        const errorRoll = document.getElementById("roll-error");
        roll.style.border = "solid red";
        errorRoll.innerHTML = "enter the valid roll number !!";
        return false;
    }
    return true;
}

function validatePassword(password,re_pass){
    const uppercase = /?=.*[A-Z]/;
    const numeric = /?=.*[0-9]/;
    const special  = /?=.*[*&^%$#@!_]/;
    const char8 = /?=.{8,}/;

    const errorPass = document.getElementById("password-error");
    const errorRetype = document.getElementById("retype-error");

    if(password.value != re_pass.value){
        errorRetype.innerHTML = "enter a valid re_type";
        return false;
    }

    if(password.test(uppercase) && password.test(numeric) && password.test(special) && password.test(char8)){
        return true;
    }
    errorPass.innerHTML = "enter the password according to the rules !!!"
    return false;
}

function check(password){
    const uppercase = new RegExp('(?=.*[A-Z])');
    const numeric = new RegExp('(?=.*[0-9])');
    const special  = new RegExp('(?=.*[*&^%$#@!_])');
    const char8 =  new RegExp('(?=.{8,})');

    const pass = document.getElementsByClassName("pass");
    const fav = document.getElementsByClassName("fas");

    if(char8.test(password)){
        pass[0].style.color = "#adff2f";
        fav[0].style.visibility = "visible";
    }else{
        pass[0].style.color = " rgb(238, 241, 233)";
        fav[0].style.visibility = "hidden";
    }

    if(uppercase.test(password)){
        pass[1].style.color = "#adff2f";
        fav[1].style.visibility = "visible";
    }else{
        pass[1].style.color = " rgb(238, 241, 233)";
        fav[1].style.visibility = "hidden";
    }
    
    if(numeric.test(password)){
        pass[2].style.color = "#adff2f";
        fav[2].style.visibility = "visible";
    }else{
        pass[2].style.color = " rgb(238, 241, 233)";
        fav[2].style.visibility = "hidden";
    }
    
    if(special.test(password)){
        pass[3].style.color = "#adff2f";
        fav[3].style.visibility = "visible";
    }else{
        pass[3].style.color = " rgb(238, 241, 233)";
        fav[3].style.visibility = "hidden";
    }
}






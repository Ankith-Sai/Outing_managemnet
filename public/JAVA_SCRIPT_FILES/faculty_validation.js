const name = document.getElementById("Name");
const email = document.getElementById("Email");
const phone = document.getElementById("Phone");
const password = document.getElementById("Password");
const reType = document.getElementById("ReType");


// document.write(name.value + "<br>");
// document.write(email.value + "<br>");
// document.write(phone.value + "<br>");
// document.write(password.value + "<br>");
// document.write(reType.value + "<br>");

function validate(){
    return (validateEmail(email) && validatePhone(phone) 
            && validatePassword(password,reType))
}

//validating phone number using pattern matching regular expressions
function validatePhone(phone){
    const regex = new RegExp('^[6-9][0-9]{9}$');
    if(!regex.test(phone.value)){
        const error = document.getElementById("PhoneError");
        error.innerHTML = "enter a valid phone number";
        return false;
    }
    return true;
}

//valdiation of email with pattern matching regular expression s
function validateEmail(email){
    const regex = new RegExp('^([a-zA-Z0-9/./_]+)(@)([a-zA-Z0-9]{2,8})(.)([a-zA-Z])(.)([a-zA-Z])$');
    if(!regex.test(email.value)){
        const error = document.getElementById("EmailError");
        error.innerHTML = "enter a valid email address";
        return false;
    }
    return true;
}

//validating password with regular expressoins
function check(password){
    const uppercase = new RegExp('(?=.*[A-Z])');
    const numeric = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[@#$^&_!])');
    const char8 =  new RegExp('(?=.{8,})');

    const pass = document.getElementsByClassName("pass");
    // document.write(pass);
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

//validate password and reType
function validatePassword(password,reType){
    if(password.value != reType.value){
        const error = document.getElementById("RetypeError");
        error.innerHTML = "retype the correct password !!";
        return false;
    }
    return true;
}





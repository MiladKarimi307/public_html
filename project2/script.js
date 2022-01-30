function testLength(value, length){
    return ((value+"").length == length);
}

function testNumber(value){
    return (!isNaN(value));
}

function validateControl(control, name, length){
    
    if(!testLength(control,length)) {
        alert("The "+name+" value does not have a correct length")
        return false;
    } 
    if (!testNumber(control)){
        alert("The "+name+" value must be a number")
        return false;
    }
    return true;
}

function validateCreditCard(value) {
    let newVal = value.replaceAll(/\s/g, ''); 
    if (!testNumber(newVal)){
        alert("Credit Card number cannot contain any letters")
        return false;
    }
    let firstDigit = newVal.charAt(0);
    if(firstDigit == 3 || firstDigit == 4 || firstDigit == 5 || firstDigit == 6){} else {
        alert("The number you have entered is not a valid Credit Card number")
        return false;
    }
    if(firstDigit == 3 && testLength(newVal, 15)){}
    else if(firstDigit != 3 && testLength(newVal, 16)){}
    else {
        alert("The Credit Card number you have entered does not have a correct length");
        return false;
    }
    return true;
}

function validateDate(value) {
    let year = '';
    let month = '';
    let date = new Date();
    for(let i = 0; i < 4; i++){
        year += value.charAt(i);
    }
    for(let j = 5; j < 7; j++ ){
        month += value.charAt(j)
    }
    if((year == date.getFullYear())&&(month < date.getMonth()+1)){
        alert("The expiration date you have entered is not valid");
        return false;
    }
    return true;
}

function validateEmail(value){
	let emailRE = /\S+@\S+\.\S+/;
    if(!emailRE.test(value)){
        alert("The Email address you have entered is not valid");
        return false;
    }
    return true;
}

function validateForm() {

    let zip = document.getElementById("zip");
    let email = document.getElementById("email");
    let ccNum = document.getElementById("card");
    let cvc = document.getElementById("cvc");
    let state = document.querySelector("#state");
    let date = document.getElementById("expiry");

    validateControl(zip.value, "Zip", 5)
        
    
    if(!validateEmail(email.value))
        return false;
    
    if(!validateCreditCard(ccNum.value))
        return false;
    
    if(!validateControl(cvc.value, "CVV2/CVC", 3))
        return false;
    
    if(!validateState(state.value))
        return false;
    
    if(!validateDate(date.value))
        return false;
        
    alert("Payment Submitted!");
    return true;
  
}

function validateState(value){
    if(value == "none"){
        alert("Please select a state form the dropdown menu");
        return false;
    }
    return true;
}
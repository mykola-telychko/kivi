function validateUsrAnsTel(argsArr){
    // add to config OBJ with all reg exp 
    const telNumPattern1 = /^\+\d{11}$/;
    const telNumPattern2 = /^\+\d{12}$/;
  
    // console.log(telNumPattern1.test(argsArr[1]) ||
    //             telNumPattern2.test(argsArr[1]) ); 
  
    // if(validUsr && validTel) true ;
    return telNumPattern1.test(argsArr[1]) ||
    telNumPattern2.test(argsArr[1]);
}
function validateTel(str){
    const telPattern1 = /^\+\d{11}$/;
    const telPattern2 = /^\+\d{12}$/;
  
    return telPattern1.test(str) || telPattern2.test(str);
}
function validateUsr(name){
    const englishGermanAlphabetRegex = /^[A-Za-zÄÖÜäöüß]+$/;
  
    return englishGermanAlphabetRegex.test(name);
}

module.exports = {
    validateUsrAnsTel,
    validateTel,
    validateUsr,
};
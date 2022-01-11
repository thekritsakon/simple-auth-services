const { userDTO } = require("../model/DTOs");
const fs = require('fs');
const JSONdata = JSON.parse(fs.readFileSync('./const/data.json', 'utf-8'));
const { validateUser, checkIfUserExist, checkPassword } = require("./utils");

function registerUser(data) {
    
    const { email, password } = data;
    const isUserValidate = validateUser(email, password);
    
    if(isUserValidate !== "OK") return isUserValidate;

    if (checkIfUserExist(email, JSONdata.users) === false) {
    
        userDTO.email = email;
        userDTO.password = password;
        JSONdata.users.push(userDTO);
        return "USER SUCCESSFULLY REGISTERED";
    
    } else if (checkIfUserExist(email, JSONdata.users) !== false) {
        
        return "USER IS ALREADY REGISTERED";
    }

};  

function loginUser(data) {

    const { email, password } = data;
    if(validateUser(email, password) !== "OK") return "INVALID USER";
    
    const checkUserExisting = checkIfUserExist(email, JSONdata.users);
    if(checkUserExisting === false) return "USER NOT EXIST";
    const checkUserPassword = checkPassword(checkUserExisting, JSONdata.users, password);
    if(!checkUserPassword) return "WRONG PASSWORD";
        
    return "USER SUCCESSFULLY LOGGED IN";

}

function getUser() {
    return JSONdata;
}

module.exports = {
    registerUser: registerUser,
    getUser: getUser,
    loginUser: loginUser,
}
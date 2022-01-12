
function verifyEmail(email) {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(email) ? true : false;
}

function verifyPassword(Password) {
    return Password && Password.length > 0 ? true : false;
}

function validateUser(email, password) {
    if(verifyEmail(email) && verifyPassword(password)) {
        
        return "OK";

    }else if(!verifyEmail(email) && verifyPassword(password)) {
    
        return "EMAIL NOT VALID";
    
    } else if(verifyEmail(email) && !verifyPassword(password)) {
    
        return "PASSWORD NOT VALID";
    
    } else if(!verifyEmail(email) && !verifyPassword(password)) {
        
        return "EMAIL AND PASSWORD NOT VALID";

    };
}

function checkIfUserExist(email, users) {
    const userIdx = users.findIndex(singleUser => singleUser.email === email);
    return userIdx !== -1 ? userIdx : false;
}

function checkPassword(idx, user, password) {
    return user[idx].password === password ? true : false;
}

module.exports = {
    verifyEmail: verifyEmail,
    verifyPassword: verifyPassword,
    validateUser: validateUser,
    checkIfUserExist: checkIfUserExist,
    checkPassword: checkPassword,
}
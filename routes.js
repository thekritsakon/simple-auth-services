const { MESSAGE_TO_STATUS, MESSAGE_TO_SUCCESS } = require("./const/status");
const { responseDTO, loginDTO } = require("./model/DTOs");
const { createToken } = require("./services/token");
const { registerUser, getUser, loginUser } = require("./services/user");

module.exports = function (app) {

    app.get("/", (req, res) => {

        res.status(200).send("app is running");
    
    });

    app.get("/users", (req, res) => {

        try {

            const users = getUser();
            res.status(200).send(users);

        } catch (error) {

            res.status(500).send("Server Error");

        }

    });

    app.post("/register", (req, res) => {

        try {
            
            const user = registerUser(req.body);
            responseDTO.message = user;
            responseDTO.success = MESSAGE_TO_SUCCESS[user];
            res.status(MESSAGE_TO_STATUS[user]).send(responseDTO);

        } catch (error) {

            console.log(error);
            res.status(500).send("Server Error");
        
        }

    }); 

    app.post("/login", (req, res) => {

        try {
            const user = loginUser(req.body);
            
            if(user === "USER SUCCESSFULLY LOGGED IN") {
                
                const token = createToken(req.body.email);
                loginDTO.message = user,
                loginDTO.token = token,
                loginDTO.success = MESSAGE_TO_SUCCESS[user];
                res.status(MESSAGE_TO_STATUS[user]).send(loginDTO);

            } else {

                loginDTO.message = user,
                loginDTO.success = MESSAGE_TO_SUCCESS[user];
                loginDTO.token = "";
                res.status(MESSAGE_TO_STATUS[user]).send(loginDTO);
                
            }

        } catch (error) {
            
            console.log(error);
            res.status(500).send("Server Error");

        }

    });

}


const express = require("express");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());


require('./routes')(app);


const PORT = parseInt(process.env.PORT);
app.listen(PORT, () => {
    console.log(`info`, `Server running on port ${PORT}`);
});

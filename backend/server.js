const express = require("express");
const app = express();
const PORT = 8000;
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

//CORS Problem//
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', ['*']);
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

require('./routes')(app);

app.listen( PORT, () =>{
    console.log(`-------------------------`);
    console.log(`Woking on port :  ${PORT}`)
})
/*=================================================
                    REQUIRES
==================================================*/
require("./config/config");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

/*=================================================
                    CORS
==================================================*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require("./routes/index"));


/*=================================================
                    SERVER
==================================================*/
app.listen(process.env.PORT, () => {
  console.log(`ESCUCHANDO EN EL PUERTO ${process.env.PORT}`);
});

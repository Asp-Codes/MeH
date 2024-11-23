const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require('cookie-parser');
const bodyParser=require("body-parser");
const router = require("./routes/userRoutes");
const assessRouter = require("./routes/stressRoutes");

app.set('trust proxy', true);

app.use(cors({
    origin: ['http://localhost:8081'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router);
app.use("/api/v1/assessment", assessRouter);


module.exports=app;
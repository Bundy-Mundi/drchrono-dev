const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
//const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/key');
const passport = require('passport');
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config();
const CLIENT_HOST = "http://localhost:3000/";

//Out of the box, express has no idea how to handle cookies,
//so we need to install a helper library called Cookie Session.
const cookieSession = require('cookie-session');
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * Passport configuration.
 */
//require('./config/passport');

const app = express();

/*mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err)); */

// tell app to use cookie
app.use(
  cookieSession({
    maxAge: 1209600000,  // two weeks in milliseconds
    keys: [config.cookieEncryptionKey]//
  })
);

// tell pasport to make use of cookies to handle authentication
//app.use(passport.initialize());
//app.use(passport.session());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())

// Logger Middleware
app.use(morgan('dev'));

// CORS Middleware
app.use(cors());

/*
app.use('/api/users', require('./routes/users'));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
*/
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(CLIENT_HOST);
});

/* DrChrono API */
app.get("/auth/drchrono/callback", (req, res) => {
    if(req.query){
        const { query:{ code } } = req;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json" ,
            'Accept-Language': 'en_US'
        };
        let data = {
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:5000/auth/drchrono/callback/',
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET
        };
        data = querystring.stringify(data);
        fetch("https://drchrono.com/o/token/", {
            method: 'post',
            params: data,
            body: data,
            headers
        })
        .then(res => res.json())
        .then(json => {
            // Store accessToken and refreshToken in the session storage
            const { access_token, refresh_token } = json;
            console.log(json)
            if(access_token && refresh_token){
                req.session.accessToken = access_token;
                req.session.refreshToken = refresh_token;
                res.redirect(CLIENT_HOST);
            }else{
                throw new Error("Failed to get token");
            }
        })
        .catch(err => console.log(err));

    }else{
        console.log("No Response");
    }
});
app.get("/auth/drchrono/refresh-token", (req, res) => {
    let RF = "";
    const { session: { refreshToken } } = req;

    // Use refreshToken from session strage
    if(refreshToken){
        RF = refreshToken

    // Use env refreshToken in dev mode
    }else if(process.env.RF_TOKEN){
        RF = process.env.RF_TOKEN;

    // Use env refreshToken in dev mode
    }else{
        res.redirect(CLIENT_HOST);
    }
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json" ,
        'Accept-Language': 'en_US'
    };
    let data = {
        'refresh_token': RF,
        'grant_type': 'refresh_token',
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET
    };
    data = querystring.stringify(data);
    fetch("https://drchrono.com/o/token/", {
        method: 'post',
        params: data,
        body: data,
        headers
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.send(json)
    })
    .catch(err => console.log(err));
});

//use this to show static files you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});

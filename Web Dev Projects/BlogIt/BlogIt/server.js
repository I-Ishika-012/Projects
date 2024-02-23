require('dotenv').config();
const express = require('express');
const userRoutes = require('./route/users/users');
const postRoutes = require('./route/posts/posts');
const commentRoutes = require('./route/comments/comments');
const session = require('express-session');
const MongoStore = require('connect-mongo'); //session store or persisting session
const methodOverride = require('method-override');
const globalErrHandler = require('./middlewares/globalHandler');
const Post = require('./models/post/post');
// dotenv.config();

require('./config/dbConnect');
const app = express();

//middlewares
app.use(express.json()); // for parsing application/json ie pass incoming data as json
app.use(express.urlencoded({ extended: true }));
//configure ejs

app.set('view engine', 'ejs');

//serve static files
app.use(express.static(__dirname + '/public'));

//method override middleware
app.use(methodOverride('_method'));

//configure express session
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: process.env.MONGO_URL,
        ttl: 24 * 60 * 60 , // 1 day
    }),
  })
);

//!save the user from session to app.locals
app.use((req, res, next) => {
  if(req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  }else{
    res.locals.userAuth = null;
  }
  next();
})


//routes
//!frontend side routes
//!user home page
app.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.render('index', {posts});
    } catch (error) {
      res.render('index', {error: error.message});
    }
});
// app.use('/api/comments', commentRoutes);
// // //global error handler
// app.use(globalErrHandler);

//!MIDDLEWARES
//------

//!ROUTES
//users route
//------
app.use('/api/v1/users',userRoutes);


  //-------
//posts route
//------
app.use('/api/v1/posts',postRoutes);

//-------
//comments
//------
app.use('/api/v1/comments',commentRoutes);


//! ERROR HANDLER MIDDLEWARE
app.use(globalErrHandler);

//!SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

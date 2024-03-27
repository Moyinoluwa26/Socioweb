require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3100;
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const useRouth = require('./routes/user');




app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/', authRouter);
app.use('/', useRouth);
app.use('/', postRouter);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '/views/404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: 'Page not found' });
    } else {
        res.type('txt').send('Page not found');
    }
});
app.use(errorHandler);

/*app.listen(
    PORT,
    () => console.log(`Server is running on port ${PORT}`)
);*/


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        /*User.insertMany(users);
        Post.insertMany(posts);*/
    })
}).catch((err) => {
    return console.log(`${err} did not connect`)
})

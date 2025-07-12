const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// use userRouter for all routes
app.use(userRouter);

// handle 404
app.use((req, res) => {
  res.status(404).render('404'); // optional 404.ejs
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

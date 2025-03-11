require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const minifyHTML = require('express-minify-html');
const ejsMate = require('ejs-mate');
const logger = require('./console/logger');
const connectDB = require('./config/db');

const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const authRoutes = require('./routes/authRoutes');
const { retrieveBooks } = require('./controller/public');

const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticator');
const { errorHandler, BookifyError, catchAsync } = require('./utils/errorHandler');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  minifyHTML({
    override: true,
    htmlMinifier: {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    },
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.engine('ejs', ejsMate);

app.get('/', retrieveBooks);

app.use('/book', publicRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', authenticate, privateRoutes);

app.use((req, res, next) => next(new BookifyError('Not found', 404)));
app.use(errorHandler);

catchAsync(connectDB());
app.listen(PORT, () => logger.success(`Server is connected to http://localhost:${PORT}`));
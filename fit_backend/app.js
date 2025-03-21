var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());
const helmet = require('helmet');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// **MariaDBに接続（明示的に実行）**
connectDB();
// **テーブルを同期**
sequelize.sync({ alter: true })
	.then(() => console.log('✅ DB同期完了'))
	.catch(err => console.error('❌ DB同期エラー:', err));

app.use('/', indexRouter);
// ユーザールーティングの設定
app.use('/users', userRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

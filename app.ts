import express from "express";
import mongoose from "mongoose";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser"
import listsRouter from "./routes/lists";
import createError from "http-errors";

const app = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = "mongodb://127.0.0.1/shopping-lists";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/lists', listsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: { message: any; status: any; },
  req: { app: { get: (arg0: string) => string; }; },
  res: { locals: { message: any; error: any; };
  status: (arg0: any) => void; render: (arg0: string) => void; },
  next: any
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
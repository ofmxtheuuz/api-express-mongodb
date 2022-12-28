// modules
    // .ent
        require("dotenv").config();
    // express
        const express = require("express");
        const app = express()
    // handlebars
        const handlebars = require("express-handlebars");
    // path
        const path = require("path");
    // chalk
        const chalk = require("chalk");
    // sessions
        const session = require("express-session");
    // messages
        const flash = require("connect-flash");
        const { serverMessage, databaseMessage, errorMessage } = require("./helpers/messages")
    // authentication
        const passport = require("passport")

        const cookieParser = require('cookie-parser');
        const logger = require('morgan');
    // orm, database
        const mongoose = require("mongoose")

// application
    // session
        app.use(session({
            secret: process.env.SECRET_SESSION,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 2 * 60 * 1000 }
        }));

    // uses
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

    // passport
        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash());

    // middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error")
            next();
        })
    // mongoose
        mongoose.connect("mongodb://localhost:27017/api", () => {
            databaseMessage("Banco de dados conectado e operando com sucesso.")
        })

    // handlebars
            app.engine('handlebars', handlebars.engine({ defaultLayout: "main"}))
            app.set('view engine', 'handlebars');

    // public
        app.use(express.static(path.join(__dirname, "public")))

        app.use((req, res, next) => {
            next();
        })

    // routes
        app.use("/", require("./routes/client"))

    // configuration
        app.listen(process.env.PORT, () => {
            serverMessage(`servidor aberto e operando na porta ${process.env.PORT}`)
        });
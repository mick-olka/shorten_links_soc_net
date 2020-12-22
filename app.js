// npm init
// npm install express mongoose
// npm install -D nodemon concurrently
// console.log('app')
// npm run server
// #app
// npm i config
// npm i bcryptjs
// npm i express-validator
// npm i jsonwebtoken
// npx create-react-app client
// npm run dev

const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); // результат роботи ф-ї express, сервер
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t/', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), { // отримуємо promise і чекаємо поки він завершиться
            useNewUrlParser: true,                  //  вписати пароль і назву файлу в default запуску (app)
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Log has been started on port ${PORT}`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1); // завершити процес якщо виникла помилка в сервері
    }
}

start();

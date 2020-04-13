const app = require('./app');
app.listen(process.env.PORT | 3333, () => {
    console.info(`API Server started and listening on port ${process.env.PORT}`)
});
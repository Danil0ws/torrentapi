module.exports = app => {    
    let index = app.controllers.index;
    app.get('/', index.emptyPage);
}
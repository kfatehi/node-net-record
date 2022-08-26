module.exports = {
    start: require('./client').start,
    serve: ()=>{
        require('./server')
    }
}
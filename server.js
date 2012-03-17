var restify = require('restify');
var routes = require('./routes');

var server = restify.createServer({
	name: 'Freebox Revolution Server API'
});
server.use(restify.bodyParser());
server.listen(3000);

server.get('/token', routes.token);
server.get('/internet/:func', routes.verifyToken, routes.internetGetProxy);
server.post('/internet/:func', routes.verifyToken, routes.internetPostProxy);
server.post('/internet/ddns/:service', routes.verifyToken, routes.ddnsPostProxy);
server.del('/internet/logs', routes.verifyToken, routes.flushLogs);
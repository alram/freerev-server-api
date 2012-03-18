var freerevSDK = require('freerev-server-sdk');

/*TODO: Change that*/
var manageErrorAndContent = function (res, error, infos) {
  if(error)
    res.send(error.header.httpCode, error.body);
  else
    res.send(200, infos);
};

exports.verifyToken = function (req, res, next) {
  freerevSDK.verifyToken(req.headers['x-api-token'], function (error, cookie) {
    if(error) {
      res.send(error.header.httpCode, error.body);
    }
    else {
      req.params.cookie = cookie;
      return next();
    }
  });
}

exports.token = function (req, res) {

  freerevSDK.connect(req.headers, function (error, cookie) {
    if(error) {
      res.send(error.header.httpCode, error.body);
    }
    else {
      freerevSDK.generateToken(cookie, function (error, token) {
        res.send(200, { token: token });
      });
    }
  });
};

exports.internetGetProxy = function (req, res) {
  switch(req.params.func) {

    case 'status':
      freerevSDK.getStatus(req.params.cookie, function (error, connectionInfos) {
        manageErrorAndContent(res, error, connectionInfos);
      });
    break;

    case 'remoteping':
      freerevSDK.remotePingStatus(req.params.cookie, function (error, remotePingStatus) {
        manageErrorAndContent(res, error, remotePingStatus);
      });
    break;

    case 'remoteaccess':
      freerevSDK.remoteAccessStatus(req.params.cookie, function (error, remoteAccessStatus) {
        manageErrorAndContent(res, error, remoteAccessStatus);
      });
    break;

    case 'wol':
      freerevSDK.wakeOnLanStatus(req.params.cookie, function (error, WOLStatus) {
        manageErrorAndContent(res, error, WOLStatus);
      });
    break;

    case 'logs':
      freerevSDK.getLogs(req.params.cookie, function (error, logs) {
        manageErrorAndContent(res, error, logs);
      });
    break;

    case 'ddns':
      freerevSDK.getDDNS(req.params.cookie, function (error, ddnsConfig) {
        manageErrorAndContent(res, error, ddnsConfig);
      });
    break;

  }
};

exports.internetPostProxy = function (req, res) {
  switch(req.params.func) {
    case 'remoteping':
      freerevSDK.changeRemotePing(req.params, function (error, status) {
        manageErrorAndContent(res, error, status);
      });
    break;

    case 'remoteaccess':
      freerevSDK.changeRemoteAccess(req.params, function (error, status) {
        manageErrorAndContent(res, error, status);
      });
    break;

    case 'wol':
      freerevSDK.changeWOL(req.params, function (error, status) {
        manageErrorAndContent(res, error, status);
      });
    break;

  }
};

exports.ddnsPostProxy = function (req, res) {
  freerevSDK.configureDDNS(req.params, function (error, status) {
    manageErrorAndContent(res, error, status);
  });

};

exports.flushLogs = function (req, res) {
  freerevSDK.flushLogs(req.params.cookie, function (error, status) {
    manageErrorAndContent(res, error, status);
  });
};

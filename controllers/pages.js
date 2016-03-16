
module.exports = {
  welcome: welcome,
  dash: dash
};


function welcome(req, res, next) {
  res.render('pages/welcome');
};

function dash(req, res, next) {
  res.render('pages/dashboard', {
    user:   req.user,
    token:  req.session.trelloOauthToken,
    secret: req.session.trelloOauthSecret
  });
};

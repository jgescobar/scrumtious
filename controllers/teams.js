var Team = require("../models/teams");

module.exports = {
  index:  index,
  show:   show,
  create: create
}


// Teams INDEX page rendering views
// function index(req, res, next) {
//   console.log(req.body);
//   console.log(req.user);
//   res.render('pages/dashboard', {
//     user:   req.user,
//     token:  req.session.trelloOauthToken,
//     secret: req.session.trelloOauthSecret
//   })
// };


// Teams SHOW page rendering
function show(req, res, next) {
  res.render('pages/teams/:id', {
    user:   req.user,
    token:  req.session.trelloOauthToken,
    secret: req.session.trelloOauthSecret
  })
};

function index(req, res) {
  console.log(req.body);
  console.log(req.user);

  Team.find({}, function(err, teams) {
    if (err) {
      res.send(err);
    }

    // return the fishes
    res.json(teams);
  });
}


// Teams CREATE page rendering


function create(req, res, next) {
  console.log(req.body);
  console.log(req.user);

  Team.findOne({trello_bid: req.body.trello_bid})
  .then(function(team){
    if(team){
      // then go to next step
      return team;
    } else {
      // create new team
      // then go to next step
      return Team.create({
        creator:    req.user.trelloId,
        trello_bid: req.body.trello_bid,
        title:      req.body.title
      });
    }
  })
  .then(function(team) {
      // from boardId grab users from trello API??
      // grab unique user id from users??
      // for each user get fullName, ID, email address and add to team??

      // return TEAM object
    res.json({
      msg:  "Team found or created!",
      team: team
    })
  });
};

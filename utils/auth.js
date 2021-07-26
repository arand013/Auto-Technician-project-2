const withAuth = (req, res, next) => {
  if (username == "admin" && password == "p@ssword") {
    req.session.user = 'admin'
  next();
} else {
  var err = new Error("You are not authenticated");

  res.setHeader("WWW-Authenticate", "Basic");
  err.status = 401;
  next(err);
}
}
{
  if(req.session.user == 'admin'){
      next();
  }else{
    var err = new Error("You are not authenticated");
    err.status = 401;
    next(err);
  }
}


module.exports = withAuth;

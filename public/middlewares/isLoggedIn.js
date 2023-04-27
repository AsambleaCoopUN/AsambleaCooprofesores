module.exports = (req, res, next) => {
  if (req.cookies.calterno) {
    const cookieValue = req.cookies.calterno;
    const cookieData = JSON.parse(cookieValue);
    const alterno = cookieData.alterno;
    const ipAddress = cookieData.ipAddress;
    console.log(alterno, ipAddress);
    next();
  } else {
    res.redirect('/login');
  }
};
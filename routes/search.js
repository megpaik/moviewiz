var express = require('express');
var router = express.Router();
var oracle = require('oracledb');

router.get('/search', function (req, res, next) {
  res.render('search');
});

router.post('/search', (req, res, next) => {
  category = req.body.category;
  query = req.body.field.toLowerCase();

  sqlquery = getSQL(category, query);
  console.log(sqlquery);

  oracle.getConnection({
    connectString  : '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = moviewiz.cmwawzqoe8cz.us-east-1.rds.amazonaws.com)(PORT = 1521))(CONNECT_DATA =(SID= moviewiz)))',
    user     : 'admin',
    password : 'adminadmin'
  }).then(function(connection) {
    return connection.execute(
      sqlquery).then(function(result) { 
        res.render('search', {result: result});
        return connection.close();
      }).catch(function (error) {
        console.log(error.message);
        return connection.close;
      })
    })
  .catch(function (error) {
    console.log(error);
  });
});

function getSQL(category, query) {
  switch (category) {
    case 'title':
      var temp = "SELECT * FROM Movies WHERE primaryTitle = '" + query + "'";
      return temp;
      break;
    case 'director':
      var temp = "SELECT * FROM ((SELECT nconst FROM Names WHERE primaryName='" + query + "') as n JOIN (SELECT * FROM Directors) as w ON n.nconst = w.nconst)";
      return temp;
      break;
    case 'actor':
      var temp = "SELECT * FROM ((SELECT nconst FROM Names WHERE primaryName='" + query + "') as n JOIN (SELECT * FROM Actors) as a ON n.nconst = a.nconst))";
      return temp;
      break;
    case 'genre':
      var temp = "SELECT * FROM Genres WHERE genres.y ='" + query + "'";
      return temp;
      break;
    case 'year':
      var temp = "SELECT * FROM Movies WHERE startYear='" + query + "'";
      return temp;
      break;
    case 'rating':
      var temp = "SELECT * FROM	IMDBRatings WHERE averageRating >='" + query + "'";
      return temp;
      break;
    default:
      break;
  }
}

module.exports = router;
var express = require('express');
var router = express.Router();
var oracle = require('oracledb');


router.get('/advanced', (req, res) => {
  if (!req.session.username || req.session.username === '') {
    res.redirect('/index');
  } else {
    res.render('advanced', { username: req.session.username });
  }
});

router.post('/advanced', (req, res, next) => {
  console.log(req.body);
  category1 = req.body.category1;
  category2 = req.body.category2;
  field1 = req.body.field1.toLowerCase();
  field2 = req.body.field2.toLowerCase();

  sqlquery = getSQL(category1, category2, field1, field2);
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

function getSQL(category1, category2, field1, field2) {
  switch (category1) {
    case 'title':
      if (category2 == 'director') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field2 + "' and movies.PRIMARYTITLE ='" + field1 + "'";
      } else if (category2 == 'actor') {
        var temp = "with a as (select * from names where primaryName = '" + field2 + "'), b as (select * from actors), c as (select * from movies where primaryTitle = '" + field1 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst"; 
      } else if (category2 == 'genre') {
        var temp = "with a as (select * from movies where primaryTitle = '" + field1 + "'), b as (select * from genres where genres = '" + field2 + "') select * from a, b where a.tconst = b.tconst";
      } else if (category2 == 'year') {
        var temp = "SELECT distinct * FROM movies WHERE primaryTitle ='" + field1 + "' AND startYear ='" + field2 + "'";
      }
    return temp;
      break;
    case 'director':
      if (category2 == 'year') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field1 + "' and movies.startYear ='" + field2 + "'";
      } else if (category2 == 'genre') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors join genres on movies.tconst = genres.tconst where primaryName ='"+ field1 + "' and genres.GENRES ='" + field2 + "'";     
      } else if (category2=='title') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field1 + "' and movies.PRIMARYTITLE ='" + field2 + "'";
      } else if (category2=='actor') {
        var temp = "(Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field1 + "') INTERSECT (Select distinct movies.primaryTitle from Actors join movies on Actors.tconst = movies.tconst join names on names.nconst = Actors.nconst where primaryName ='" + field2 + "')";
      }
      return temp;
      break;
    case 'actor':
      if (category2=='director') {
        var temp = "(Select * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field2 + "') INTERSECT (Select distinct movies.primaryTitle from Actors join movies on Actors.tconst = movies.tconst join names on names.nconst = Actors.nconst where primaryName ='" + field1 + "')";
      } else if (category2=='genre') {
        var temp = "with a as (select * from names where primaryName = '" + field1 + "'), b as (select * from actors), c as (select * from genres where genres = '" + field2 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst";
      } else if (category2=='year') {
        var temp = "with a as (select * from names where primaryName = '" + field1 + "'), b as (select * from actors), c as (select * from movies where startYear = '" + field2 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst";
      } else if (category2=='title') {
        var temp = "with a as (select * from names where primaryName = '" + field1 + "'), b as (select * from actors), c as (select * from movies where primaryTitle = '" + field2 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst"; 
      }
      return temp;
      break;
    case 'genre':
      if (category2 == 'director') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors join genres on movies.tconst = genres.tconst where primaryName ='"+ field2 + "'and genres.GENRES ='" + field1 + "'";     
      } else if (category2=='actor') {
        var temp = "with a as (select * from names where primaryName = '" + field2 + "'), b as (select * from actors), c as (select * from genres where genres = '" + field1 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst";
      } else if (category2 == 'title') {
        var temp = "with a as (select * from movies where primaryTitle = '" + field2 + "'), b as (select * from genres where genres = '" + field1 + "') select * from a, b where a.tconst = b.tconst";
      } else if (category2 == 'year') {
        var temp = "Select * from genres join movies on genres.tconst = movies.tconst where genres = '" + field1 + "' and movies.startYear = '" + field2 + "'";
      }
      return temp;
      break;
    case 'year':
      if (category2 == 'director') {
        var temp = "Select distinct * from Directors join movies on Directors.tconst = movies.tconst join names on names.nconst = Directors.directors where primaryName ='" + field2 + "'and movies.startYear ='" + field1 + "'";
      } else if (category2=='actor') {
        var temp = "with a as (select * from names where primaryName = '" + field2 + "'), b as (select * from actors), c as (select * from movies where startYear = '" + field1 + "') select * from a, b, c where a.nconst = b.nconst AND b.tconst = c.tconst";
      } else if (category2 == 'genre') {
        var temp = "Select * from genres join movies on genres.tconst = movies.tconst where genres = '" + field2 + "' and movies.startYear = '" + field1 + "'";
      } else if (category2 == 'title') {
        var temp = "SELECT * FROM movies WHERE primaryTitle ='" + field2 + "' AND startYear ='" + field1 + "'";
      }
      return temp;
      break;
    default:
      break;
  }
}

module.exports = router;
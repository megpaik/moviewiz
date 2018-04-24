var oracle = require('oracledb');

var getSearchResults = function (category, query) {
  var connection = oracle.getConnection({
    connectString  : '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = moviewiz.cmwawzqoe8cz.us-east-1.rds.amazonaws.com)(PORT = 1521))(CONNECT_DATA =(SID= moviewiz)))',
    user     : 'admin',
    password : 'adminadmin'
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connection was successful!');

    query = query.toLowerCase();
    var sqlquery = getSQL(category, query);

    connection.execute(sqlquery,
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log(result.metaData); // headers
      console.log(result.rows);     // return each row
      doRelease(connection);
    });
  });
}


function getSQL(category, query) {
  switch (category) {
    case 'title':
      var temp = 'SELECT * FROM Movies WHERE primaryTitle=' + query;
      return temp;
      break;
    case 'director':
      var temp = 'SELECT * FROM (SELECT nconst FROM names WHERE primaryName=' + query + ') as n JOIN (SELECT * FROM Directors) as w ON n.nconst = w.nconst))';
      return temp;
      break;
    case 'actor':
      var temp = 'SELECT * FROM ((SELECT nconst FROM names WHERE primaryName=' + query + ') as n JOIN (SELECT * FROM Actors) as a ON n.nconst = a.nconst))';
      return temp;
      break;
    case 'genre':
      var temp = 'SELECT * FROM Genres WHERE genres.y =' + query;
      return temp;
      break;
    case 'year':
      var temp = 'SELECT * FROM Movies WHERE startYear=' + query;
      return temp;
      break;
    case 'rating':
      var temp = 'SELECT * FROM	IMDBRatings WHERE averageRating >=' + query;
      return temp;
      break;
    default:
      break;
  }
}

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
}

module.exports = getSearchResults;
// References
// The YouTube playlist "Node JS Tutorial for Beginners" (#1-#37)
// Link to the start of the playlist:
// https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
// A lot of the non-cassandra code is from it
// Also the code in index.html is also from this tutorial
//
// Cassandra code is from:
// The link below was intially used and the keyspace is used in the example is from it:
// https://www.instaclustr.com/support/documentation/cassandra/using-cassandra/connect-to-cassandra-with-node-js/
// The above link was kind of confusing so I also referred to this next link set up the cassandra connection here:
// https://docs.datastax.com/en/developer/nodejs-driver/4.1/getting-started/

var http = require('http')
var fs = require('fs')

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

var server = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/html'})
  var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8')
  client.execute('SELECT * FROM grocery.fruit_stock', function(err,result){
    if (err) return console.error(err);
    // console.log('Results:', result);
    res.end(JSON.stringify(result))
  })
})

server.listen(80, '127.0.0.1')
console.log('Listening port 80')

var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

// var client = cassandra.Client({contactPoints: ['127.0.0.1']});
// client.connect(function(err,result){
  // console.log('index: cassandra connected');
// });
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

// var getAllSubscribers = 'SELECT * FROM grocery.fruit_stock';
const getAllVideos = 'SELECT * FROM library.videos';
const getAllComments = 'SELECT * FROM library.comments';
const getAllUsers = 'SELECT * FROM library.users';
// const getCommentsForVid = 'SELECT * FROM library.comments WHERE video_id = ?';


// const queries = [
//   {
//     query: getAllVideos,
//     param: []
//   }, {
//     query: getAllComments,
//     param: []
//   }
// ]


router.get('/', function(req, res, next) {
  // res.render('index', { title: 'mysubscribers' });
  client.execute(getAllVideos,[], function(err,vid_result){
    if(err){
      res.status(404).send({msg: err});
    } else{
      client.execute(getAllComments,[], function(err,com_result){
        if(err){
          res.status(404).send({msg: err});
        } else{
          client.execute(getAllUsers,[], function(err,use_result){
            if(err){
              res.status(404).send({msg: err});
            } else{
              // console.log(vid_result.rows)
              for (i = 0; i < com_result.rows.length; i++){
                for (j= 0; j < use_result.rows.length; j++){
                  if (JSON.stringify(com_result.rows[i].user_id) == JSON.stringify(use_result.rows[j].user_id)){
                      com_result.rows[i].user_first = use_result.rows[j].first_name
                      com_result.rows[i].user_last = use_result.rows[j].last_name
                  }
                }
              }
              for (i = 0; i < vid_result.rows.length; i++){
                for (j= 0; j < use_result.rows.length; j++){
                  if (JSON.stringify(vid_result.rows[i].user_id) == JSON.stringify(use_result.rows[j].user_id)){
                    vid_result.rows[i].user_first = use_result.rows[j].first_name
                    vid_result.rows[i].user_last = use_result.rows[j].last_name
                    // console.log("Match")
                    // console.log(vid_result.rows);
                  }
                }
                vid_result.rows[i].comments = []
                for (k = 0; k < com_result.rows.length; k++){
                  if (JSON.stringify(vid_result.rows[i].video_id) == JSON.stringify(com_result.rows[k].video_id)){
                    vid_result.rows[i].comments.push(com_result.rows[k])
                  }
                }
              }
              console.log(vid_result);
              res.render('index', {
                  videos: vid_result.rows
              });
            }
          });
        }
      });
    }
  });
});

// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'mysubscribers' });
//   client.execute(getAllVideos,[], function(err,vid_result){
//     if(err){
//       res.status(404).send({msg: err});
//     } else{
//       client.execute(getAllComments,[], function(err,com_result){
//         if(err){
//           res.status(404).send({msg: err});
//         }
//         else{
//           for (i = 0; i < vid_result.rows.length; i++){
//             console.log("\n\n\n")
//             console.log(vid_result.rows[i].video_id)
//             console.log(com_result.rows[0].video_id)
//           }
//           vid_result.rows[0].comments = com_result.rows
//           res.render('index', {
//             videos: vid_result.rows
//             // comments: com_result.rows
//           })
//         }
//       });
//     }
//   });
// });


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'mysubscribers' });
//   client.execute(getAllVideos,[], function(err,result){
//     if(err){
//       res.status(404).send({msg: err});
//     } else {
//       res.render('index', {
//         videos: result.rows
//       })
//     }
//   });
// });
//
// router.get('/', function(req, res, next) {
//   client.execute(getAllComments,[], function(err,result){
//     if(err){
//       res.status(404).send({msg: err});
//     } else {
//       res.render('index', {
//         comments: result.rows
//       })
//     }
//   });
// });

module.exports = router;

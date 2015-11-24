//lets require/import the mongodb native drivers.
//BINGO works!! http://localhost:3001/

var mongodb = require('mongodb');

 var express = require('express');
 var app = express();
var MongoClient = require('mongodb').MongoClient;
 
var myCollection;
var db;
var found;
var special;
var special2;
function removeDocument(onRemove){
    myCollection.findAndModify({name: "doduck"}, [], {remove:true}, function(err, object) {
        if(err)
            throw err;
        console.log("document deleted");
        onRemove();
    });
}
 
function findDocument(onFinded){
    var cursor = myCollection.find({"name" : "promise", "company.officialName" : "promises LTD" });
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;
 
        console.log("document find:");
        console.log(doc.name);
        found=doc.name;
        special=doc.company.industries;
        special2=doc.company.barf;
        console.log(doc.company.employed);
        onFinded();
    });
}
 
function fieldComplexeUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {$set: {company: {employed: 10, officialName: "doduck LTD", 
       industries: ["it consulting", "passionate programming"]}}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function fieldUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {$set: {industry: "France"}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function simpleUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {name: "doduck", description: "prototype your idea"}, {w:1}, function(err) {
    if(err)
        throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function addDocument(onAdded){
    myCollection.insert({name: "doduck", description: "learn more than everyone"}, function(err, result) {
        if(err)
            throw err;
 
        console.log("entry saved");
        onAdded();
    });
}
function addDocumentStuff(onAdded, DocName,DocDescr){
        if (arguments[1] != null) {
           DocName=arguments[1];
           console.log(DocName);
        }else{
           console.log('no argument 1');
        };
        if (arguments[2] != null) {
           DocDescr=arguments[2];
           console.log(DocName);
        }else{
           console.log('no argument 2');
        };
    myCollection.insert({name: DocName, description: DocDescr}, function(err, result) {
        if(err)
            throw err;
 
        console.log("entry saved");
        onAdded();
    });

   myCollection.update({name: DocName}, {$set: {company: {employed: 1, officialName: "promises LTD", barf: "Sometime", 
       industries: ["data handler", "passionate asynchronous delays"]}}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onAdded();
    });
}
 
function createConnection(onCreate){
 
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        console.log("connecting to the mongoDB !");
        if(err)
            throw err;
        console.log("connected to the mongoDB !");
        myCollection = db.collection('test_collection');
 
        onCreate();
    });
}
 
createConnection(function(){
   console.log("Start mongoDB !");
   findDocument(function(){            console.log("Find");   });   console.log("Serving never gets here?");
   app.get('/', function (req, res) {      res.send("The company I found is \""+found+"\"\n<br /> And it specializes in \""+special+"\" <br /> and has barf like "+special2);   });
   // NTOP uses port 3000 to log usage
   var server = app.listen(3001, function () {
   var host = server.address().address;
   var port = server.address().port;
//   addDocumentStuff(function(), "promise", "kept promises" {
   addDocumentStuff(function(){console.log("3 parms");   }, "promise", "kept promises");
   findDocument(function(){            console.log("Find");   });   console.log("Serving never gets here?");
   console.log('Example app listening at http://%s:%s', host, port,found);
   });
//     addDocument(function(){
//         simpleUpdateDocument(function(){
//             fieldUpdateDocument(function(){
//                 fieldComplexeUpdateDocument(function(){
//                     findDocument(function(){
// //                        removeDocument(function(){
//                             console.log("The end");
// //                        });
//                     });
//                 });
//             });
//         });
//     });
});


// app.get('/', function (req, res) {
//   res.send('Hello Paul!');
// });
// // NTOP uses port 3000 to log usage
// var server = app.listen(3001, function () {
//   var host = server.address().address;
//   var port = server.address().port;
// 
//   console.log('Example app listening at http://%s:%s', host, port);
// });

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ApoD_rasStRELny',
 //password : 'password',
  database : 'Lophophore'
 });

con.connect(function(err) {

app.use(express.static(__dirname + "/views"));    
    
  //  app.set("view engine", "hbs");
    
/*app.post("/register", function (req, res) { 
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
     age = req.body.userAge;
     seks = req.body.Seks;
    //res.sendfile('index.html');
});
*/
    
app.get('/', function(req, res) {
//res.redirect('/hand');
     res.sendfile('views/index.html');
});      


app.get('/add', function(req, res) {
  res.sendfile('views/add.html');
});

app.get('/hand', function(req, res) {
  res.sendfile('views/index.html');
});


app.use('/', bodyParser.urlencoded({
    extended: true
}));

      
app.post('/adder', function(req, res, next)
{
      if (err) throw err;
    con.query("SELECT COUNT(*) AS count FROM ClothesNames", function (err, rows, fields) {
    if (err) throw err;
    count = rows[0].count;
     //   count = count + 1;
    var ClothesNamesMass = {
        name: req.body.name,
        src: req.body.src,
        imgsrc: req.body.imgsrc
    }
   
    var size = req.body.Size;
    var Age = JSON.parse(JSON.stringify(req.body.Age));
         var Event = JSON.parse(JSON.stringify(req.body.Event));
         var Gender = JSON.parse(JSON.stringify(req.body.Gender));
         var Style = JSON.parse(JSON.stringify(req.body.Style));
        
        for (var d = 0; d<7; d++){
            count += 1;

            if (size != 1){
                size = 0;
            }
       var TagSizeMass = {
        size: size,
        cid: count
    }
         
           con.query("INSERT INTO ClothesNames SET ?", ClothesNamesMass, function (err, rows, fields) {
              if (err) throw err;
            });
       
         con.query("INSERT INTO TagSize SET ?", TagSizeMass, function (err, rows, fields) {
                  if (err) throw err;
                 });
      
           
    var TagAgeMass = {
        age: Age[d],
        cid: count
    }
                con.query("INSERT INTO TagAge SET ?", TagAgeMass, function (err, rows, fields) {
                  if (err) throw err;
                 });
      
           
    var TagEventMass = {
        event: Event[d],
        cid: count
    }
     con.query("INSERT INTO TagEvent SET ?", TagEventMass, function (err, rows, fields) {
                   if (err) throw err;
                  });
      
                 
        
        
    var TagGenderMass = {
        gender: Gender[d],
        cid: count
    }
    
            con.query("INSERT INTO TagGender SET ?", TagGenderMass, function (err, rows, fields) {
                  if (err) throw err;
                  });
              
    
         
    var TagStyleMass = {
        style: Style[d],
        cid: count
    }
      con.query("INSERT INTO TagStyle SET ?", TagStyleMass, function (err, rows, fields) {
             if (err) throw err;
        });
      
            }
              
        });
    //con.query("INSERT INTO ClothesNames TagAge (age), TagEvent (event), TagGender (gender), TagStyle (style) SET ClothesNames.name = ? AND ClothesNames.src = ? AND ClothesNames.imgsrc = ? AND TagAge.age = ? AND TagGender.gender = ? AND TagStyle.style = ? AND TagEvent.event = ?", [req.body.name, req.body.src, req.body.imgsrc, req.body.Age, req.body.Gender, req.body.style, req.body.event] , function (err, rows, fields) {
   // if (err) throw err;
   
   // });
        res.sendfile('views/add.html');
  });   
      
app.post('/handler', function(req, res, next) {
 var size = req.body.Size;
  if (err) throw err;
    if (size != 1){
        size = 0;
    } 
    console.log(size);
   // con.query("SELECT id FROM ClothesNames, TagSize, TagAge, TagGender WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagSize.cid AND ClothesNames.id = TagGender.cid AND age = ? AND TagSize.size = ? AND gender = ?", [req.body.Age, size, req.body.Gender], function (err, rows, fields) {
    con.query("SELECT COUNT(*) AS count FROM ClothesNames, TagSize, TagAge, TagGender WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagSize.cid AND ClothesNames.id = TagGender.cid AND age = ? AND TagSize.size = ? AND gender = ?", [req.body.Age, size, req.body.Gender], function (err, rows, fields) {
    if (err) throw err;
      //  console.log(rows);
    count = rows[0].count;
       
      //  console.log(count);
            if (count == 0) {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(
            '<!DOCTYPE html>'
+'<html>'
 +'<head>'
  +'<meta charset="utf-8">'
  +'<title>В базе нет подходящих вещей</title>'
   +'<link rel = "stylesheet" href="styles.css"/>'
+'<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">'
 +    '<link href="https://fonts.googleapis.com/css?family=Fira+Sans:300" rel="stylesheet">'
  +   '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">'
   +  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">'
    + '<link href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed" rel="stylesheet">'
+    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">'
 +   ' <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>'
 +    '<script>$(document).ready(function(){   '
  + ' $(window).scroll(function () {'
    +   ' if ($(this).scrollTop() > 130) {'
   +       '  $("#scroller").fadeIn();'
    +    '} else {'
    +       ' $("#scroller").fadeOut();'
    + '   }'
+    '});'
+'});</script>'
 +   ' <script src="http://code.jquery.com/jquery-latest.js"></script>'
+'<body style="overflow-x:hidden;">'
 +'</head>'
 +'<body>'
              
+   '<header>'
+  `<h1 font-size="20px">La'phophora</h1>`
+         '</header>'
+       '<nav>'
+        '<ul>'
+ '<li><a href="http://laphophora.jabkadev.com/category/news/">Новости</a></li><li style="float:center"><a href="index.html">Подобрать</a></li><li><a href="http://laphophora.jabkadev.com/category/trends/">Тренды</a></li>'
+         '</ul>'
+          '    <hr class="head">'
+      '</nav>'
+  ' <table align="center" cellpadding="0">'
  +'<h1>Мы не смогли подобрать ни одной вещи!</h1>'
                 +'<li class = second><a class ="EntBtn" href="/hand">Повторить выбор</a></li>'
              +'</table>'
+        '</body>'
+        '</html>'
          )
   //     res.end(JSON.stringify(fields));
        res.end();  
    }
            else{
  //  con.query("SELECT COUNT(*) AS count FROM ClothesNames, TagSize WHERE id = ? AND age = ? AND TagSize.size = ? AND gender = ? ", [req.body.Age, size, req.body.Gender], function (err, rows, fields) {
    //     if (err) throw err;
        //ccount = rows[0].count;
       // console.log(count);
 //   console.log(rows);       
    console.log(count + " Кол-во");
  con.query("SELECT name, clothPoints, src, imgsrc, age, style, event, gender FROM ClothesNames, TagAge, TagEvent, TagGender, TagSize, TagStyle WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagEvent.cid AND ClothesNames.id = TagGender.cid AND ClothesNames.id = TagSize.cid AND ClothesNames.id = TagStyle.cid AND age = ? AND TagSize.size = ? AND gender = ? ", [req.body.Age, size, req.body.Gender], function (err, result, fields) {
    //  console.log(size);
    if (err) throw err;
      var popa = JSON.parse(JSON.stringify(result));
      var TrueCount = 0;
     // for (var i = 0; i < count; i++){
   //       con.query("SELECT COUNT(*) AS count FROM ClothesNames WHERE name = ?", [popa[i].name], function (err, rows, fields) {
    ////if (err) throw err;
       //       TrueCount +=1;
      //});
    //  }
    
//    console.log(TrueCount + "Jwww");
     
       console.log(popa);
 //if (popa.clothPoints == null){
   //       console.log("Hello^_^");
     // }
     // else{
          var stroka='';
          //var clothPoints = [];
          for (var i = 0; i < count; i++) {              
             
          if (popa[i].event == req.body.Event){
              popa[i].clothPoints += 5;
          }
          
           if (popa[i].style == req.body.Style){
               popa[i].clothPoints += 1;
          }
                  console.log("1 Очки: " +popa[i].clothPoints);
         }
    //}
          
        //  console.log(popa)
         // console.log(popa.clothPoints);
    for (var i = 0; i < count-1; i++)
     { for (var j = 0; j < count-1-i; j++)
        { if (popa[j+1].clothPoints < popa[j].clothPoints)
           { var t = popa[j+1]; popa[j+1] = popa[j]; popa[j] = t; }
        }
     }      var gender;
              if(req.body.Gender == 1){
                  gender = "М";
              }
              else {
                  gender = "Ж";
              }
            for (var c = 0; c < count; c ++){
                if(c < (count - 6)){
                    stroka = stroka;
                }
                else{
                if(c == 4 || c == 7){
                    stroka = '<td><div class = clothpadding><img class = class="imgborder" src='+popa[c].imgsrc+' width="200" height="300"> <p>'+popa[c].name+'</p> <li class = second><a class ="Buy" href='+popa[c].src+'>Купить</a></li></td></div>'+ '</tr><tr>' + stroka ;
                }
                else{
           //console.log(popa[c].name + " Имя и очки " + popa[c].clothPoints);
           stroka = '<td><div class = clothpadding><img src='+popa[c].imgsrc+' width="200" height="300" border="2"> <p>'+popa[c].name+'</p> <li text-align="center" class = second><a class ="Buy" href='+popa[c].src+'>Купить</a></div></li></td>' + stroka;
                    }
          }
                }
  // res.writeHead( {'Content-Type': 'text/html'});
          res.write(
            '<!DOCTYPE html>'
+'<html>'
 +'<head>'
  +'<meta charset="utf-8">'
  +'<title>'+popa[0].name+' и еще '+count+'</title>'
   +'<link rel = "stylesheet" href="styles.css"/>'
+'<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">'
 +    '<link href="https://fonts.googleapis.com/css?family=Fira+Sans:300" rel="stylesheet">'
  +   '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">'
   +  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">'
    + '<link href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed" rel="stylesheet">'
+    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">'
 +   ' <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>'
 +    '<script>$(document).ready(function(){   '
  + ' $(window).scroll(function () {'
    +   ' if ($(this).scrollTop() > 130) {'
   +       '  $("#scroller").fadeIn();'
    +    '} else {'
    +       ' $("#scroller").fadeOut();'
    + '   }'
+    '});'
+'});</script>'
 +   ' <script src="http://code.jquery.com/jquery-latest.js"></script>'
              
 +'</head>'
 +'<body>'
+   '<header>'
+  `<h1 font-size="20px">La'phophora</h1>`
+         '</header>'
+       '<nav>'
+        '<ul>'
+ '<li><a href="http://laphophora.jabkadev.com/category/news/">Новости</a></li><li style="float:center"><a href="index.html">Подобрать</a></li><li><a href="http://laphophora.jabkadev.com/category/trends/">Тренды</a></li>'
+         '</ul>'
+          '    <hr class="head">'
+      '</nav>'
+  '<form method="POST" align="center">  '
+  ' <table align="center" cellpadding="0">'
              
              +'<tr>'
    +stroka
              +'</table>'
              +'</form> '
              +'<form action="http://laphophora.jabkadev.com/quiz/laphophora/">'
    +'<input class="EntBtn" type="submit" value="Пройти анкету" />'
+'</form>'
               +'<div id="scroller">'
      +'<div class="coontainer">'
          +'<button href="http://laphophora.jabkadev.com/quiz/laphophora/" class ="FootButn">Choose </button>'
      +'   </div>'
     +'</div>'
       +'  <hr id="scroller">'
+        '</body>'
+        '</html>'
          )
   //     res.end(JSON.stringify(fields));
        res.end();
});  
                }
});
});
});
//});
console.log('Сервер стартовал!');
app.listen(80);

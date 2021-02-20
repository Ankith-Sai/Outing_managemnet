const http = require("http");
const mysql = require("mysql");

// const server = http.createServer((req,res)=>{
//     console.log("heyy the connection has been made successfully");
//     if(req.url == '/'){
//         res.write("hello charming ");
//         res.end();
//     }
// });

// server.listen(6000);
// console.log("listening to port 3000");


const server = http.createServer();




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Project_1'
  });



  connection.connect(()=>{
    //   if(err) throw err;
      console.log("the mysql connection is established");
  });

  var q = "select *from student;"
  connection.query("q",() => {
      console.log("the query is success full");
  });

  connection.end();


  
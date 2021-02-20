const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

//using the body parser middleware to parse the post request data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//creating a data base conneciton 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Project1'
});

//creating conneciton to the database
connection.connect((err) => {
    try {
        if (err) {
            throw err;
        } else {
            console.log("connection is been made successful");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


//using the public directory for the static files
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//route_1
app.get("/register", (req, res) => {
    res.render("register");
});

//rout_2
app.get("/register/faculty", (req, res) => {
    console.log(__dirname);
    res.render("register_faculty");
});

//route_3
app.post("/student/success", (req, res) => {
    const student = req.body;

    connection.connect((err) => {
        try {
            if (err) {
                throw err;
            } else {
                console.log("connected successfully!!");
            }
        }

        catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    });


    var q = `insert into student values ('${student.rollNumber}','${student.Name}','${student.dept}','${student.Email}','${student.password}')`;
    var qSelect = "select *from student;";
    connection.query(q, (err, result, fields) => {
        try {
            if (err) {
                throw err;
            } else {
                //console.log(result);
                res.send("your page has been submitted successfully ");
                console.log("the current table is : ");
                connection.query(qSelect, (err, result, fields) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(result);
                    }
                })
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
});

//rout_4
app.post("/faculty/success", (req, res) => {
    const faculty = req.body;
    console.log(faculty);
    var username = faculty.Name;
    var dept = faculty.dept;
    var phone = faculty.Phone;
    var email = faculty.Email;
    var password = faculty.password;

    console.log(`
        username: ${username},
        dept: ${dept},
        phone: ${phone},
        email: ${email},
        password: ${password}
    `);

    //note: we need not to connec the data base again and again 
    // as it may lead to twice handshake of mySql and leads to 
    // proning a run time error 
    //once connected need not to connect again 
    // if we end the connection then we need to call the 
    // mysql.createConnectin() method again in order to connect it 


    var q = `insert into faculty values ('${username}' , '${dept}' ,'${phone}' , '${email}' , '${password}')`
    var qSelect = `select *from faculty;`;

    //executing query 
    connection.query(q, (err, result, fields) => {
        try {
            if (err) {
                throw err;
            } else {
                console.log("registration successefull");
                res.send("successfully registered ");
                connection.query(qSelect, (err, result, fields) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                });

            }
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
});

//rout 5 login rout
app.post("/login", (req, res) => {
    console.log(req.body);
    const user = req.body;
    console.log("the user name is : " + user.username);

    if (user.login == 'student') {




        //validating the user name and password by a query  
        var q = `select password from student where ID = '${user.username}'`
        var qSelect = `select *from student where ID = '${user.username}'`
        connection.query(q, (err, result, fields) => {

            console.log(result[0].password);
            try {
                if (err) {
                    throw err;
                }
                else if (result[0].password != user.password) {
                    console.log("invalid password");
                    res.status(400).send("invalid username or password");
                }
                else {
                    console.log("success in login ");

                    var roll = user.username;
                    var Dept = '';
                    var Sec = '';

                    // connection.query(qSelect,(err,result,fields) => {
                    //     console.log(result);
                    //     Dept = result[0].department;console.log("the dep is : " +Dept);
                    //     Sec = result[0].Section;console.log("the SE is : " + Sec);
                    // });



                    getIT();
                    function getIT(callback) {
                        var Dept = '';
                        var Sec = '';
                        var flag = false;
                        setTimeout(() => {
                            connection.query(qSelect, (err, result, fields) => {
                                console.log(result);
                                Dept = result[0].department; console.log("the dep is : " + Dept);
                                Sec = result[0].Section; console.log("the SE is : " + Sec);
                            });
                        }, 400);

                        setTimeout(() => {
                            console.log("the Dept is: " + Dept);
                            console.log("The SEC is : " + Sec);
                        }, 700);

                        setTimeout(() => {
                            var qs = `select facultyApproval from ELeave where roll = '${user.username}';`;
                            connection.query(qs, (err, result, fields) => {
                                console.log(result);
                                try {
                                    if (err) {
                                        throw err;
                                    } else if (result[0].facultyApproval == 'D') {
                                        console.log("Your Leave is Rejected !!");
                                        res.send("Your Leave has been rejected !! ");
                                    } else if (result[0].facultyApproval == 'F') {
                                        console.log(" The student already has requested for the leave");
                                        res.send("Please have some pationce !!");
                                    }else if(result[0].facultyApproval == 'W'){
                                        console.log("The request has been farwarded to your HOD");
                                        res.send("Reqest farwarded to HOD, please wait !!");
                                    }else if (result[0].facultyApproval == 'T') {
                                        console.log("The Leave has been granted thank you !!");
                                        res.send("Congradulations, the leave has been granted!!");
                                    }
                                } catch (err) {
                                    //res.status(400).send("error has occured check the log ");
                                    flag = true;
                                    callback(user.username, Dept, Sec);
                                }
                            })
                        }, 1200);

                        function callback(username, dept, sec) {
                            res.render("student", { roll: username, Dept: dept, Sec: sec });
                        }
                    }



                    if (true || !alreadySubmit) {
                        //we are gonna pass object containing our roll, sec, department
                        //res.render("student",{roll: roll,Dept: Dept,Sec: Sec});
                    }
                }
            } catch (err) {
                console.log(err);
                res.status(402).send("invalid username password");
            }
        });
    }

    else if (user.login == 'Faculty') {
        const faculty = req.body;
        console.log(faculty.password);
        const q = `select password from faculty where username = '${faculty.username}'`;
        // const q = `select  *from faculty where username = '${faculty.username}' and password = '${faculty.password}'`;
        const qSelect = `select *from faculty where username = '${faculty.username}';`;

        connection.query(q, (err, result, fields) => {
            try {
                if (err) {
                    console.log("the error is been THROWN !!!!!");
                    throw err;
                } else if (result[0].password != faculty.password) {
                    res.status(403).send("invalid username or password !!");
                } else {
                    //res.send("login Successful");
                    console.log("success in faculty login ");

                    executeFaculty();
                    function executeFaculty(callback) {
                        var facultyDept = '';
                        var facultySec = '';
                        var messageObj = '';

                        //getting Dept and Sec of the Faculty!!
                        setTimeout(() => {
                            var q = `select  *from faculty where username = '${user.username}';`;
                            connection.query(q, (err, result, fields) => {
                                try {
                                    if (err) {
                                        throw err;
                                    } else {
                                        //console.log(result[0].dept + " " + result[0].Section);
                                        facultyDept = result[0].dept;
                                        facultySec = result[0].Section;
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            })
                        }, 500);

                        //Fetching the messages
                        setTimeout(() => {
                            var q = `select  *from ELeave where dept = '${facultyDept}' and section = '${facultySec}' and facultyApproval = 'F';`;
                            connection.query(q, (err, result) => {
                                try {
                                    if (err) {
                                        throw err;
                                    } else {
                                        console.log(result);
                                        messageObj = result;
                                        send();
                                    }
                                } catch (err) {
                                    console.log("error please check ");
                                }
                            });
                        }, 1000);

                        // //sending the message obj to render 
                        // setTimeout(()=>{
                        //     console.log(messageObj);
                        // },1500);

                        //redering 
                        function send() {
                            // messages = [{roll: 522,name: 'Ankith'}]
                            //console.log(messageObj[0]);
                            res.render("Faculty", { message: messageObj });
                        }
                    }

                    connection.query(qSelect, (err, result, fields) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(result);
                        }
                    })
                }
            } catch (err) {
                console.log(err);
                res.status(401).send("The userID password was invalid ");
            }
        });
    }

    else if (user.login == 'HOD') {
        //res.render("HOD");
        var messages = '';

        

        getDept();
        function getDept() {
            var Dept = '';
            setTimeout(() => {
                var q = `select dept from HOD where Name = '${user.username}' and password = '${user.password}'; `;
                connection.query(q, (err, result) => {
                    try {
                        if (err) {
                            throw err;
                        } else {
                            Dept = result[0].dept;
                            console.log("the Department is : " + result[0].dept);
                            approve();
                        }
                    } catch (err) {
                        console.log("Login ID password wrong, please check !!");
                        res.send("Please check username password Dear HOD sir !!");
                    }
                });
            }, 500);

            function approve() {
                
                var q = `select *from ELeave where dept = '${Dept}' and facultyApproval = 'W';`;
                connection.query(q, (err, result) => {
                    try {
                        if (err) {
                            throw err;
                        } else {
                            console.log(result);
                            messages = result;
                            res.render("HOD", { messages: result });
                        }
                    } catch (err) {
                        console.log("There has been an error in the database !!");
                    }
                });
            }
        }
    }

    else if(user.login == 'Security'){
        // res.send("Security view");
        // var security = req.body;
        var q = `select  password from Security where username = '${user.username}';`;

        verifySecAndCheck();

        function verifySecAndCheck(){
            var resultObj = '';
            setTimeout(()=>{
                connection.query(q,(err, result) => {
                    try{
                        if(err){
                            throw err;
                        }else if(user.password == result[0].password){
                            //console.log(result);
                            //res.send("correct username password");
                            uploadObj();
                        }else{
                            res.send("invalid username password !!");
                        }
                    }catch(err){
                        console.log("invalid username password ");
                        res.send("invalid username password ");
                    }
                });
            },500);

            function uploadObj(){
               var q = `select *from Approved`;
                connection.query(q,(err,result) => {
                    try{
                        if(err){
                            throw err;
                        }else{
                            console.log(result);
                            res.render("Security",{messages : result});
                        }
                    }catch(err){
                        console.log("error in quary ");
                        res.status(400).send("wrong quary");
                    }
                });
            }
            
        }
    }

});


//route 6 the message of student rout
app.post("/login/submitted", (req, res) => {
    const leave = req.body;

    var q = `insert into ELeave values ('${leave.message}','${leave.ID}','${leave.dept}','${leave.sec}','F');`;
    connection.query(q, (err, result, fields) => {
        try {
            if (err) {
                throw err;
            } else {
                connection.query("select *from ELeave", (err, result) => {
                    console.table(result);
                });
                res.send("Your Response Have Been Recorded !!");
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("error in the db, Cannot send multiple messages!!");
        }
    })

    //res.send("the message has been recorded!!")
});

//rout 7 facult rout for approval 
app.post("/approval", (req, res) => {
    // res.send("This is the approval page !!");
    console.log(req.body);
    user = req.body;
    var q = `update ELeave set facultyApproval = 'W' where roll = '${user.roll}';`;
    connection.query(q, (err, result, fields) => {
        try {
            if (err) {
                throw err;
            }//else{
            //     res.redirect('back');
            // }
        } catch (err) {
            console.log("an error has occurred");
            res.status(400).send("error occured!!");
        }
    });

});

//rout 8 reject
app.get("/Reject", (req, res) => {
    res.send("Reject functionality not built!!");
});

//rout 9 HOD_approval 
app.post("/HOD_approval", (req, res) => {
    // res.send("this is the HOD approval page !!");
    var user = req.body;
    var q = `insert into Approved values ('${user.roll}')`;
    var qs = `update ELeave set facultyApproval = 'T' where roll = '${user.roll}'`;
    connection.query(q,(err,result) => {
        try{
            if(err){
                throw err;
            }else{
                console.log(result);
            }
        }catch(err){
            console.log("error has occurred  in the queary !!");
        }
    });

    connection.query(qs,(err,result) => {
        try{
            if(err){
                throw err;
            }else{
                console.log(result);
            }
        }catch(err){
            console.log("error in the qs quairy !!");
        }
    });
});

app.get('/logout',(req,res) => { 
    res.redirect("/");
});


app.get("/", (req, res) => {
    console.log(__dirname);
    res.render('login');
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening to the port " + port);
});


//F --> not approved
//A--> approved
//W --> waiting 
//T --> approved
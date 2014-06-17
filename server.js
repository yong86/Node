var sql = require('mssql');
var port = process.env.port || 1337;
var config = {
	//driver: 'tds', 
   // user: 'yehia',
    //password: 'yehia',
	//"driver": "tds",
  user: "MyService@zuu6dbi4b6",
 password: "ASD1234%",
	//userName: 'test',
    //password: 'test',
    //server: '192.168.1.210',
    
    // If you're on Windows Azure, you will need this:
    //options: {encrypt: true,
	//},
	 //tdsVersion: 0x730A0003,
    database: "Mawsalati",
//port:1433,
   // server: '(local)', // You can use 'localhost\\instance' to connect to named instance
	server:"zuu6dbi4b6.database.windows.net",
	options: {encrypt: true,
	},
};


var connection = new sql.Connection(config, function(err) {
    // ... error checks

    // Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('select Bus_ID ,Bus_Name from Bus', function (err, recordset) {
        // ... error checks

        console.dir(recordset);
    });
});

//sql.connect(config, function(err) {
//
//
//    //request.output('output_parameter', sql.VarChar(50));
//	 request.query('select Bus_ID ,Bus_Name from Bus', function(err, recordset) {
//	  if (err) {
//        console.log("can't handle statement!");
//		}
//	  console.dir(recordset);
//	 });
//
//});
	       // console.dir(recordsets[0][0]);
  //  });
	//});
var restify = require('restify'),
    session = require('restify-session')({
        debug : true,
        ttl   : 2
    });

var server = restify.createServer({

});

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(session.sessionManager)

server.get('/login', Getlogin);
server.get('/logoff',Getlogoff);
server.get('/Children',GetChildren);
server.get('/Routes',GetRoutes);
server.get('/Stations',GetStations);
server.get('/BusesperRoute',GetBusestoroutes);
server.get('/freeperseats',Getfreeperseats);
server.get('/freetempseats',Getfreetempseats);
//server.get('/busregister',Getbusregister);


function GetBuses(req, res, next) {
    console.log("hello from getbuses");
    //res.Header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript');

    console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select * from Bus', function (err, recordset) {
            // ... error checks

            if (err) {
                console.log("can't handle statements!");
            }
            console.dir(recordset[0]);
       /*     var jsonObject = {};
            for (var i = 0; i < recordset.length; i++) {
                for (var j = 0; j < recordset[i].length; j++) {
                    var paramName = recordset[i];
                    var paramValue = recordset[i][j];
                    jsonObject[paramName] = paramValue;

                    console.log(paramValue);

                }
            }*/
           // res.send({Bus:recordset});
            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(recordset)+' });');
        });
        console.log("after query!");


});
};



//////////////////////Routes/////////////////////////////////


function GetRoutes(req, res, next) {
    console.log("hello from getroutes");
   // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    //console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
            request.execute('Proc_Display_Routes', function(err, recordset) {
                if (err) {
                    console.log("can't handle Proc_Getlocation procedure!");
                }
            console.dir(recordset[0]);
			            var jsonObject = [];
             for (var i = 0; i < recordset.length; i++) {
             for (var j = 0; j < recordset[i].length; j++) {
             var paramName = recordset[i];
             var paramValue = recordset[i][j];
            // jsonObject[paramName] = paramValue;

            // console.log(paramValue);
jsonObject.push(paramValue);
             }
             }

            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(jsonObject)+' });');
        });

        console.log("after query!");


});
};

///////////////////////Stations/////////////////////////////////////

function GetStations(req, res, next) {
    console.log("hello from getroutes");
   // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    //console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
		     request.input('RootID', sql.int, req.query.routeid);

            request.execute('Proc_Display_Stations', function(err, recordset) {
                if (err) {
                    console.log("can't handle Proc_Display_Stations procedure!");
                }
            console.dir(recordset[0]);

            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(recordset)+' });');
        });

        console.log("after query!");


});
};

/////////////////////////stations per Routes///////////////////////////////

function GetBusestoroutes(req, res, next) {
    console.log("hello from getroutes");
   // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    //console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
		     request.input('RootID', sql.int, req.query.routeid);

            request.execute('Proc_Display_Buses', function(err, recordset) {
                if (err) {
                    console.log("can't handle Proc_Display_Buses procedure!");
                }
            console.dir(recordset[0]);

            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(recordset)+' });');
        });

        console.log("after query!");


});
};


/////////////////////////free preminat seats///////////////////////////////

function Getfreeperseats(req, res, next) {
    console.log("hello from getroutes");
   // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    //console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
		     request.input('BusID', sql.int, req.query.busid);
			request.input('state', sql.int, req.query.state);
            request.execute('Proc_Display_Free_Seats', function(err, recordset) {
                if (err) {
                    console.log("can't handle Proc_Display_Stations procedure!");
                }
            console.dir(recordset[0]);

            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(recordset)+' });');
        });

        console.log("after query!");


});
};

////////////////////////////free temp seats///////////////////////


function Getfreetempseats(req, res, next) {
    console.log("hello from Getfreeperseats");
   // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    //console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
		     request.input('BusID', sql.int, req.query.busid);
			request.input('state', sql.int, req.query.state);
            request.execute('Proc_Display_Free_temp_seat', function(err, recordset) {
                if (err) {
                    console.log("can't handle Proc_Display_Free_temp_seat procedure!");
                }
            console.dir(recordset[0]);

            res.send(req.query["callback"]+ '({"records":' + JSON.stringify(recordset)+' });');
        });

        console.log("after query!");


});
};
///////////////////////login request

function Getlogin(req, res, next) {
    console.log(req.query.pwd);
  //  res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    res.header('Content-Type', 'text/javascript;charset=UTF-8');
    var request = new sql.Request(connection); // or: var request = connection.request();
   // var transaction = new sql.Transaction(connection);
   // request.query("select Citizen.Cit_ID from Citizen inner join UserAccount on Citizen.Cit_ID = UserAccount.Cit_ID where UserAccount.User_Name = 'yong'  and UserAccount.Password = 'yong' " , function (err, recordset) {
    request.query("select Parent.Parent_ID from Parent inner join UserAccount on Parent.MyUserId = UserAccount.UserID where UserAccount.User_Name = '" + req.query.user + "' and UserAccount.Password = '" + req.query.pwd + "'", function (err, recordset) {
        // ... error checks

        if (err) {
            console.log("can't handle statements!");
        }
        console.log(recordset[0]);
        if(recordset.length ==0)
        /*     var jsonObject = {};
         for (var i = 0; i < recordset.length; i++) {
         for (var j = 0; j < recordset[i].length; j++) {
         var paramName = recordset[i];
         var paramValue = recordset[i][j];
         jsonObject[paramName] = paramValue;

         console.log(paramValue);

         }
         }*/
        // res.send({Bus:recordset});
        res.send(req.query["callback"] + "({ success: false, message:'Invalid' + ' UserName'+ ' or' + ' Password'})");
		else
       // res.send(JSON.stringify(recordset[0]));
        res.send(req.query["callback"] + "({ success: true, sessionToken:"+ JSON.stringify(req.session) + "})");
        //return next();
    });
};

///////////////////////logout and end session
function Getlogoff(req, res, next) {
    
  //  res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    res.header('Content-Type', 'text/javascript;charset=UTF-8');
	console.log("logoff");
	req.sessionToken.destroy();
	//req.sessionToken.reset();
	console.log("logoffaftertoken");
        res.send(req.query["callback"] + "({ success: true})");
        //return next();
    
};

////////////////////////Accounts


function GetAccounts(req, res, next) {
    console.log("hello from getbuses");
    // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select * from UserAccount', function (err, recordset) {
            // ... error checks

            if (err) {
                console.log("can't handle statements!");
            }
            console.dir(recordset[0]);
            /*     var jsonObject = {};
             for (var i = 0; i < recordset.length; i++) {
             for (var j = 0; j < recordset[i].length; j++) {
             var paramName = recordset[i];
             var paramValue = recordset[i][j];
             jsonObject[paramName] = paramValue;

             console.log(paramValue);

             }
             }*/
            // res.send({Bus:recordset});
            res.send(req.query["callback"] + '({"records":' + JSON.stringify(recordset) + ' });');
        });
    });
}

//////////////citizen////////////////


function GetCitizens(req, res, next) {
    console.log("hello from getbuses");
    // res.header("Content-Type: application/json");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('select * from Citizen ', function (err, recordset) {
            // ... error checks

            if (err) {
                console.log("can't handle statements!");
            }
            console.dir(recordset[0]);
            /*     var jsonObject = {};
             for (var i = 0; i < recordset.length; i++) {
             for (var j = 0; j < recordset[i].length; j++) {
             var paramName = recordset[i];
             var paramValue = recordset[i][j];
             jsonObject[paramName] = paramValue;

             console.log(paramValue);

             }
             }*/
            // res.send({Bus:recordset});
            res.send(req.query["callback"] + '({"records":' + JSON.stringify(recordset) + ' });');
        });
    });
}


///////////////////////////Get children for a given parent

function GetChildren(req, res, next) {

    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');

    console.log("hello after json");
    var connection = new sql.Connection(config, function(err) {
        // ... error checks

        // Query

        var request = new sql.Request(connection); // or: var request = connection.request();
         request.input('username', sql.VarChar(50), req.query.name);
            request.execute('Proc_Get_Parent_Children', function(err, results) {
                if (err) {
                    console.log("can't handle Proc_Get_Parent_Children procedure!");
                }
            console.dir(results[0]);
                var jsonObject = [];
             for (var i = 0; i < results.length; i++) {
             for (var j = 0; j < results[i].length; j++) {
             var paramName = results[i];
             var paramValue = results[i][j];
            // jsonObject[paramName] = paramValue;

            // console.log(paramValue);
jsonObject.push(paramValue);
             }
             }
            // res.send({Bus:recordset});
            res.send(req.query["callback"] + '({"records":' + JSON.stringify(jsonObject) + ' });');
        });
    });
}

////////////////////////////////////////////////////
server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
server.get('/Bus', GetBuses);
server.get('/Account', GetAccounts);
server.get('/Citiizens', GetCitizens);






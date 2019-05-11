var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');


function log_to_txt(file_name, variable, value) {
    text = Date.now() + "\t" + variable + "\t" + value + "\t" + Date() + "\n";
    fs.appendFile(file_name, text, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function log_to_csv(file_name, variable, value) {
    l = new Date();
    tanggal = l.toLocaleDateString();
    jam = l.toLocaleTimeString()
    text = `"${variable}","${value}","${tanggal}","${jam}"\n`;
    fs.appendFile(file_name, text, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function log_to_db(res) {
    var config = require("./config/config.js");
    var con = mysql.createConnection(config);

    // koneksi ke database
    con.connect(function (err) {
        console.log("Connected!");
        sql = "insert into data(var,value) values('" + param.var+"'," + param.value + ")";
        con.query(sql, function (err, result) {
            console.log("Result: " + result);
            if (!err) {

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                berhasil = {
                    status: 200,
                    value: param.value,
                    var: param.var
                };
                res.write(JSON.stringify(berhasil));
            } else {
                res.write("Database Error!!");
            }
            res.end()
        });
    });


}


http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    param = url.parse(req.url, true).query;
    if (param.var && param.value) {

        //Menyimpan dalam file log.txt
        log_to_txt("data/log.txt", param.var, param.value);
        //menyimpan ke csv
        log_to_csv("data/log.csv", param.var, param.value);

        // simpan ke database
        log_to_db(res);



    } else {
        res.write("Gagal")
        res.end();
    }
    console.log(param);
}).listen(8080);

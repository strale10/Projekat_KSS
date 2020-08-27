var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',function (req,res,next) {

    res.render('pocetna.ejs', {title:"Pocetna"});

});

// POCETAK PRVOM KONVERTORU

router.get('/valute',function (req,res,next) {
    //OSTVARUJES KONEKCIJU SA BAZOM
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    //PRAVIM UPIT
    let sql = "SELECT * FROM valute";
    //SALJEM UPIT NA IZVRSENJE
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip1.ejs', {title:"Valute", dobijena, uneta, data: result});
    });

});

router.post('/valute',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    //HVATAS PODATAK UNETA VREDNOST IZ FORME SA FRONT DELA
    var uneta=req.body.uneta;
    //INICIJALIZUJES PROMENLJIVU DOBIJENA
    var dobijena;
    //UNETA NIJE UNDEFINED, UNETA POSTOJI
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=uneta*118;
    }
    else
    {
        uneta="";
        dobijena=0;
    }
    //SALJES UPIT DA PRIKAZE SVE IZ BAZE U TABELI VALUTE
    let sql = "SELECT * FROM valute";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        //NAPRAVI MI STRANICU KOJA JE KODIRANA U views pod nazivom KONVERTERTIP1.ejs SA PODACIMA dobijena, uneta, i podacima iz baze DATA:result
        res.render('KonverterTip1.ejs', {title:"Valute", dobijena, uneta, data: result});
    });
});
router.post('/valuteunos',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    // PRAVIS PODATKE KOJE CES DA PROSLEDIS BAZI KROZ UPIT, NJIH UZIMAS IZ POST ZAHTEVA OVOJ RUTI
    var unos = {
        //podatak uneta vrednost i dobijena vrednost su ti imena kolona u bazi
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": ((req.body.uneta)*118),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO valute SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/valute');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/valute'; </script>");
    }
});
router.get('/obrsivalutu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM valute WHERE id_valute = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/valute');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});


// KRAJ PRVOM KONVERTORU


// POCETAK PRVOM OBRNUTOM KONVERTORU

router.get('/valuteobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "SELECT * FROM valuteobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip1Obrnuti.ejs', {title:"Valute", dobijena, uneta, data: result});
    });

});
router.post('/valuteobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    var uneta=req.body.uneta;
    var dobijena;
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=uneta*0.00848;
        dobijena=dobijena.toFixed(2);
    }
    else
    {
        uneta="";
        dobijena=0;
    }
    let sql = "SELECT * FROM valuteobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        res.render('KonverterTip1Obrnuti.ejs', {title:"Valute", dobijena, uneta, data: result});
    });
});


router.post('/valuteunosobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });

    var unos = {
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": (((req.body.uneta)*0.00848)).toFixed(2),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO valuteobrnuta SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/valuteobrnuti');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/valuteobrnuti'; </script>");
    }
});

router.get('/obrsiobrnutuvalutu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM valuteobrnuta WHERE id_valute = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/valuteobrnuti');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});

// KRAJ PRVOM OBRNUTOM KONVERTORU

// POCETAK DRUGOG KONVERTERA

router.get('/duzina',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "SELECT * FROM duzina";
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip2.ejs', {title:"Duzina", dobijena, uneta, data: result});
    });

});
router.post('/duzina',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    var uneta=req.body.uneta;
    var dobijena;
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=uneta*100000;

    }
    else
    {
        uneta="";
        dobijena=0;
    }
    let sql = "SELECT * FROM duzina";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        res.render('KonverterTip2.ejs', {title:"Duzina", dobijena, uneta, data: result});
    });
});

router.post('/duzinaunos',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });

    var unos = {
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": (((req.body.uneta)*100000)),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO duzina SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/duzina');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/duzina'; </script>");
    }
});
router.get('/obrsiduzinu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM duzina WHERE id_duzina = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/duzina');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});

// KRAJ DRUGOG KONVERTERA

//POCETAK DRUGOG OBRNUTOG KONVERTERA

router.get('/duzinaobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "SELECT * FROM duzinaobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip2Obrnuti.ejs', {title:"Duzina", dobijena, uneta, data: result});
    });

});
router.post('/duzinaobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    var uneta=req.body.uneta;
    var dobijena;
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=uneta*0.00001;

    }
    else
    {
        uneta="";
        dobijena=0;
    }
    let sql = "SELECT * FROM duzinaobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        res.render('KonverterTip2Obrnuti.ejs', {title:"Duzina", dobijena, uneta, data: result});
    });
});

router.post('/duzinaunosobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });

    var unos = {
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": (((req.body.uneta)*0.00001)),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO duzinaobrnuta SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/duzinaobrnuti');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/duzinaobrnuti'; </script>");
    }
});

router.get('/obrsiunetuduzinu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM duzinaobrnuta WHERE id_duzina = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/duzinaobrnuti');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});

// KRAJ DRUGOG OBRNUTOG KONVERTERA

// POCETAK TRECEG KONVERTERA

router.get('/snaga',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "SELECT * FROM snaga";
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip3.ejs', {title:"Snaga", dobijena, uneta, data: result});
    });

});
router.post('/snaga',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    var uneta=req.body.uneta;
    var dobijena;
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=(uneta*1.34).toFixed(2);

    }
    else
    {
        uneta="";
        dobijena=0;
    }
    let sql = "SELECT * FROM snaga";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        res.render('KonverterTip3.ejs', {title:"Snaga", dobijena, uneta, data: result});
    });
});
router.post('/snagaunos',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });

    var unos = {
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": (((req.body.uneta)*1.34)).toFixed(2),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO snaga SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/snaga');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/snaga'; </script>");
    }
});
router.get('/obrsisnagu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM snaga WHERE id_snaga = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/snaga');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});

// KRAJ TRECEG KONVERTERA

// POCETAK TRECEG OBRNUTOG KONVERTERA

router.get('/snagaobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "SELECT * FROM snagaobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        var uneta="";
        var dobijena="";
        console.log(uneta, dobijena);
        res.render('KonverterTip3Obrnuti.ejs', {title:"Snaga", dobijena, uneta, data: result});
    });
});
router.post('/snagaobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    var uneta=req.body.uneta;
    var dobijena;
    if(typeof uneta !== 'undefined' && uneta)
    {
        uneta=uneta;
        dobijena=(uneta*0.75).toFixed(2);

    }
    else
    {
        uneta="";
        dobijena=0;
    }
    let sql = "SELECT * FROM snagaobrnuta";
    con.query(sql, function (err, result) {
        console.log(result);
        console.log(uneta, dobijena);
        res.render('KonverterTip3Obrnuti.ejs', {title:"Snaga", dobijena, uneta, data: result});
    });
});
router.post('/snagaunosobrnuti',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });

    var unos = {
        "uneta_vrednost": req.body.uneta,
        "dobijena_vrednost": (((req.body.uneta)*0.75)).toFixed(2),
    }
    if(typeof unos.uneta_vrednost[0] !== 'undefined' && unos.uneta_vrednost[0])
    {
        con.connect(function (err) {
            if (err) {
                res.status(500);
                return res.end(err.message);
            }
            con.query("INSERT INTO snagaobrnuta SET ?", unos, function (err, results, fields) {
                if (err) {
                    console.log("error ocurred", err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    });
                } else {
                    return res.redirect('/snagaobrnuti');
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "USPESNO UNETI PODACI!"
                    });
                }
            });
        });

    }
    else
    {
        res.send("<script>alert('Morate uneti vrednost za konvertovanje'); window.location.href = 'http://localhost:3000/snagaobrnuti'; </script>");
    }
});
router.get('/obrsiunetusnagu/:id',function (req,res,next) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3308,
        database: 'konvertor'
    });
    let sql = "DELETE FROM snagaobrnuta WHERE id_snaga = " + req.params.id + "; ";
    con.query(sql, function (err, results, fields) {

        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            return res.redirect('/snagaobrnuti');
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "USPESNO IZBRISAN DOBAVLJAC IZ BAZE!"
            });
        }
    });

});
// KRAJ TRECEG OBRNUTOG KONVERTERA

module.exports = router;
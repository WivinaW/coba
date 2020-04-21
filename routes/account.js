const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
        const filename = file.originalname.split(".");
        const extension = filename[filename.length - 1];
        callback(null, Date.now() + "." + extension);
        //callback(null, filename[0] + "." + filename[1]);
    }
});
const uploads = multer({
    storage : storage
});

const accountModel = require("./../models/account");


router.get("/", function(req,res) {
    pool.getConnection(function(err, conn){
        if(err) {
            return res.status(500).send(err);
        }
        const query = "select * from account";
        conn.query(query, function(err, result) {
            if (err) { return res.status(500).send(err); }
            else{ return res.status(200).send(result); }
        })
    });
});

router.post("/", uploads.single("propic"), async function(req,res) {
    try {
        const name = req.body.name;
        const filename = req.file.filename;
        const result = await accountModel.insert(name, filename);
        return res.status(201).send(result);
    }
    catch (error){
        return res.status(500).send(error);
    }
    // const hasil = {
    //     file : req.file,
    //     body : req.body
    // }
    // res.status(200).send(hasil);
    
    // pool.getConnection(function(err, conn) {
    //     if(err) { return res.status(500).send(err) }
    //     const query = `insert into account values (null, '${req.body.name}', 'uploads/${req.file.filename}')`;
    //     conn.query(query, function(err, result) {
    //         if(err) { return res.status(500).send(err) }
            // res.status(201).send({
            //     id : result.insertId,
            //     nama : req.body.name,
            //     profile_pic : "uploads/" + req.file.filename
            // })
    //         const query2 = "select * from account where id = " + result.insertId;
    //         conn.query(query2, function(err, result) {
    //             if(err) { return res.status(500).send(err) }
    //             return res.status(201).send(result[0]);
    //         }) //callback hell
    //     })
    // })
});

module.exports = router;
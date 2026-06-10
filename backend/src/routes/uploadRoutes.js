const express = require("express");

const router =
    express.Router();

const upload =
    require("../middlewares/upload");

router.post(
    "/",
    upload.single("imagen"),
    (req, res) => {

        res.json({

            imagen:
                req.file.filename

        });

    }
);

module.exports =
    router;
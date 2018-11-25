var router = require('express').Router({mergeParams: true});
const fs = require("fs");

router.get('/', (req, res) => {
	if(fs.existsSync("../SoFast/Files/" + req.params.session))
		res.render('index.ejs', {started: true});	//mando la pagina
	else	
		res.render("404.ejs");
});

module.exports = router;
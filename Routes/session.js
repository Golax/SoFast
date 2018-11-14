const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index.ejs', {started: true});	//mando la pagina
});

module.exports = router;
const http = require('http');

const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');
const cors = require('cors');
const fs = require('fs');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
app.use(cors())
const server = http.createServer(app);
const port = process.env.PORT || 9000

router.get('/', (req, res) => {
	const data = {
		message: "Hi, welcome"
	}
	return res.json(data);
})

router.post('/', upload.single('file'), function (req, res) {
	const file = req.file.path;
	csv().fromFile(file).then(jsonObj => {
		const data = {
			devices: jsonObj
		}
		fs.unlinkSync(req.file.path);
		return res.json(data)
	})
});

app.use('/uploadCsv', router);

function startServer() {
  server.listen(port, function () {
    console.log('Express server listening on ', port);
  });
}

startServer()
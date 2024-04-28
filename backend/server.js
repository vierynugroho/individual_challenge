const app = require('./app');
const dotenv = require('dotenv/config');

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
	console.log(`Swaalaaaa! http://localhost:${PORT}`);
});

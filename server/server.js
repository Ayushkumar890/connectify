const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');


app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true 
}));

require('./config/database').connect();
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/error.middleware');

const connectDB = require('./config/database.config');

const port = process.env.PORT ?? 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/admin/users', require('./routes/admin.routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

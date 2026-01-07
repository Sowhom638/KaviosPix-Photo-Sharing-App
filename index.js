const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnect');
const authRoutes = require('./routes/auth.route');
const albumRoutes = require('./routes/album.route');
const imageRoutes = require('./routes/image.route');
const userRoutes = require('./routes/user.route');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth/', authRoutes); // <- NEW LINE
app.use('/albums', albumRoutes);
app.use('/images', imageRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({extended : false}));

app.get('/', (req,res) => res.send('API Running'));

//Define routes
app.use('/api/worklist',require('./routes/api/userworklist'));
app.use('/api/workbasket',require('./routes/api/deptworkbasket'));
app.use('/api/requests',require('./routes/api/existingreq'));
app.use('/api/form',require('./routes/api/form'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/departments',require('./routes/api/departmets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log('Server started on port ${PORT}'));


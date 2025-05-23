const express =  require('express')

const cors = require('cors');

require('dotenv').config();

const pool  = require('./db');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('Welcome to Property');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get("/all", async (req, res) => {
  try {
        const result = await pool.query('select * from random_data');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

const PORT = 5000;
app.listen( PORT,  () =>console.log(`Server running on port ${PORT}`));

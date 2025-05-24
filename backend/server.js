const express =  require('express')

const cors = require('cors');

require('dotenv').config();

const pool  = require('./db');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false}));

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

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post("/send", async (req, res) => {
    try {
    const { random_number, random_text, random_date } = req.body;
    const result = await pool.query(
      'INSERT INTO random_data (random_number, random_text, random_date) VALUES ($1, $2, $3) RETURNING *',
      [random_number, random_text, random_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const crypto = require('crypto');


app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash password with scrypt
  crypto.scrypt(password, salt, 64, async (err, derivedKey) => {
    if (err) throw err;

    const hashedPassword = derivedKey.toString('hex');

    try {
      const result = await pool.query(
        `INSERT INTO users (name, email, password, role, salt) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, hashedPassword, role, salt]
      );

      res.json({ user: result.rows[0] });
    } catch (dbErr) {
      console.error(dbErr.message);
      res.status(500).send('DB Error');
    }
  });
});


app.post('/properties', async (req, res) => {
    const { owner_id,
            title,
            description,
            address,
            city_id,
            price_per_month,
            status } = req.body;

    try{
        const result = await pool.query('insert into properties(owner_id, title, description, address, city_id, price_per_month, status) values ($1, $2, $3, $4, $5, $6, $7) returning *'
            [owner_id, title, description, address, city_id, price_per_month, status || 'Available']
        );
        
        res.status(201).json(result.rows[0]);
    }catch(err){
        res.status(500).send('DB error');
    }        
});

const PORT = 5000;
app.listen( PORT,  () =>console.log(`Server running on port ${PORT}`));

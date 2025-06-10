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
  const { name, email, password} = req.body;

  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash password with scrypt
  crypto.scrypt(password, salt, 64, async (err, derivedKey) => {
  if (err) {
    console.error('Scrypt Error:', err.message);
    return res.status(500).send('Password hashing failed');
  }

  const hashedPassword = derivedKey.toString('hex');

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, salt) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashedPassword, salt]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (dbErr) {
    console.error('DB Insert Error:', dbErr.message);
    res.status(500).send('Database insert failed');
  }
});
});


app.post('/properties', async (req, res) => {
    const {
        owner_id,
        title,
        description,
        address,
        city_id,
        price_per_month,
        status
    } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO properties (owner_id, title, description, address, city_id, price_per_month, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [owner_id, title, description, address, city_id, price_per_month, status || 'available']
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: 'Database insert failed' });
    }
});

app.post('/owners', async(req, res) => {
  const {
    owner_id,
    phone_number,
    bio
  } = req.body;

  try{
    const result = await pool.query('insert into owners(owner_id, phone_number, bio) values($1, $2, $3) RETURNING *', 
                                [owner_id, phone_number, bio]
    );

    res.status(201).json(result.rows[0]);

  }catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: 'Database insert failed'});
  }
});

app.post('/cities', async(req, res) => {
  const {
    name,
    state,
    country
  } = req.body;

  try{
    const result = await pool.query('insert into cities(name, state, country) values($1, $2, $3) RETURNING *', 
        [name, state, country]
    );

    res.status(201).json(result.rows[0]);
  }catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: 'Database insert failed' });
  }
});

app.post('/tenants', async(req, res) => {
  const {
    tenant_id, 
    phone_number, 
    occupation } = req.body;
   
    try{
      const result = await pool.query('insert into tenants(tenant_id, phone_number, occupation) values($1, $2, $3) RETURNING *',
                                  [tenant_id, phone_number, occupation]
      );

      res.status(201).json(result.rows[0]);
    }catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: 'Database insert failed' });
  }
});

app.post('/booking', async(req, res) => {
  const {
    tenant_id, 
    property_id, 
    start_date, 
    end_date, 
    status
  } = req.body;

  try{
    const result = await pool.query('insert into bookings(tenant_id, property_id, start_date, end_date, status) values($1, $2, $3, $4, $5) RETURNING *',
                    [tenant_id, property_id, start_date, end_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch(err){
    console.error('DB Error: ', err.message);
    res.status(500).json({err: 'Database insert failed'});
  }

});

app.post('/payment', async (req, res) => {
  const {
    booking_id,
    amount,
    payment_date,
    payment_method
  } = req.body;

  try {
    const result = await pool.query('Insert into payments(booking_id, amount, payment_date, payment_method) values($1, $2, $3, $4) RETURNING *',
      [booking_id, amount, payment_date, payment_method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB Error: ', err.message);
    res.status(500).json({ err: 'Database insert failed' });
  }
});

app.post('/contact_method', async(req, res) => {
  const {method_name} = req.body;

  try{
    const result = await pool.query('insert into contact_method(method_name) values($1) RETURNING *',
      [method_name]
    );
    res.status(201).json(result.rows[0]);
  }
  catch(err){
    console.error('DB Error: ', err.message);
    res.status(500).json({err: 'Database insert failed'});
  }
});

app.post('/contacts', async(req, res) => {
  const {
    user_id,
    method_id,
    contact_value,
    address
  } = req.body;

  try{
    const result = await pool.query('insert into contacts(user_id, method_id, contact_value, address) values($1, $2, $3, $4) RETURNING *',
      [user_id, method_id, contact_value, address]
    );
    res.status(201).json(result.rows[0]);
  } catch(err){
    console.error('DB Error: ', err.message);
    res.status(500).json({err: 'Database insert failed'});
  }
});

app.post('/property_status_log', async (req, res) => {
  const {
    property_id,
    status
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO property_status_logs(property_id, status) VALUES ($1, $2) RETURNING *',
      [property_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB Error: ', err.message);
    res.status(500).json({ err: 'Database insert failed' });
  }
});

// --------------------Get API------------------------------
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch users' });
  }
});

app.get('/owners', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM owners');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch owners' });
  }
});

app.get('/tenants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenants');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch tenants' });
  }
});

app.get('/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch properties' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch bookings' });
  }
});

app.get('/payments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch payments' });
  }
});

app.get('/cities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cities');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch cities' });
  }
});

app.get('/contact', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch contact' });
  }
});

app.get('/contact_method', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_method');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch contact_method' });
  }
});

app.get('/property_status_logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM property_status_logs');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch status logs' });
  }
});

app.get('/report', async(req, res) => {
  try{
    const result = await pool.query('select c.name  ,count(p.property_id) as total_properties from properties p join cities c on c.city_id = p.city_id  group by p.city_id, c.city_id');
    res.json(result.rows)
  } catch(err){
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch Reports logs'});
  }
});

app.get('/report_payment', async(req, res) => {
   try{
    const result = await pool.query('select payment_method, count(*) from payments group by payment_method');
    res.json(result.rows)
  }catch(err){
    console.error('DB Error:', err.message);
    res.status(500).json({ err: 'Failed to fetch Reports logs'});
  } 
});


const PORT = 5000;
app.listen( PORT,  () =>console.log(`Server running on port ${PORT}`));

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const exerciseRouter = require('../routes/exercise');
const Exercise = require('../modals/excercise.modal'); // Fix typo in path ('modals' vs 'models')
require('dotenv').config();
// Create test app (mirror your server setup)
const app = express();
app.use(express.json());
app.use('/exercise', exerciseRouter);

// Database connection setup
const TEST_DB_URI = process.env.ATLAS_URI;

beforeAll(async () => {
  try {
    await mongoose.connect(TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to test database');
  } catch (err) {
    console.error('Test database connection error:', err);
    process.exit(1);
  }
}, 30000); // 30s timeout

afterEach(async () => {
  // Only clean up if connection exists
  if (mongoose.connection.db) {
    await Exercise.deleteMany({});
  }
});

afterAll(async () => {
  if (mongoose.connection) {
    await mongoose.disconnect();
  }
});

describe('Exercise Routes', () => {
  test('POST /exercise/add should create new exercise', async () => {
    const testData = {
      username: 'TestUser123', // Matches your 3-character minimum validation
      description: 'Running',
      duration: 30,
      date: new Date().toISOString().split('T')[0] // Proper ISO format
    };

    const res = await request(app)
      .post('/exercise/add')
      .send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Exercise Logged In'); 
    // expect(res.text).toBe('Exercise Logged In');

    // Verify the exercise was actually created
    const exercise = await Exercise.findOne({ username: 'TestUser123' });
    expect(exercise).toBeTruthy();
    expect(exercise.description).toBe('Running');
  });

  test('GET /exercise should return exercises', async () => {
    // Create test data directly to ensure it exists
    await Exercise.create({
      username: 'TestUser',
      description: 'Pushups',
      duration: 15,
      date: new Date()
    });

    const res = await request(app).get('/exercise');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe('TestUser');
  });
});
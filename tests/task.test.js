const request = require('supertest');
const app = require('../src/app');
const { userTwo, taskOne, userOne, setUpDatabase } = require('./fixtures/db');
const Task = require('../src/models/task');
const User = require('../src/models/user');

beforeEach(setUpDatabase);

test('should create new task', async()=>{
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'testing tasks'
    }).expect(201);
    const task = await Task.findById(response.body._id);
    expect(task.completed).toBe(false);
});

test('show get tasks for the user', async()=>{
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
    expect(response.body.length).toEqual(2);
});

test('should not delete other user task', async()=>{
    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
    const user = await User.findById(userOne._id);
    await user.populate('tasks').execPopulate(); 
    expect(user.tasks.length).toEqual(2);
});
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('sign up user', async()=>{
    await request(app).post('/users').send({
        name: "sarath",
        email: "smsarath1234@gmail.com",
        password: "qwertyuiop"
    }).expect(201);
});

test('login user', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);    
    const user = await User.findById(response.body.user._id);
    expect(user.tokens[1].token).toBe(response.body.token);
});

test('should not login with incorrect credentials', async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'fffffffff'
    }).expect(400)
});

test('get user data with authentication', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get user data without authorization', async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('delete user with authorization', async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('should not delete user without authorization', async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('should upload avatar', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update user details', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Bobby'
    })
    .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toBe('Bobby')
});

test('should not update invalid user fields', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'mysore'
    })
    .expect(400);
});
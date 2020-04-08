const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log('server running on ' + port);  
})

// const Task = require('./models/task');
// const User = require('./models/user');


// (async()=>{
//     // const task = await Task.findById('5e8b6982c359903b2415d696');
//     // await task.populate('owner').execPopulate();
//     // console.log(task);
//     // const user = await User.findById('5e8b6961c359903b2415d694');
//     // await user.populate('tasks').execPopulate();
//     // console.log(user.tasks);
    
// })();
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const MongoClient = mongodb.MongoClient
const{ MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (err, client) =>{
    if(err){
        return console.log('error in connection');
    }
    console.log('connected to db');
    // const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name:'sarath',
    //     age:25
    // })
    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        description: 'node'
    }).then(data =>{
        console.log(data);
        
    }).catch(error =>{
        console.log(error);
        
    })
    // db.collection('tasks').updateMany({

    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then(data =>{
    //     console.log(data);
        
    // }).catch(error =>{
    //     console.log(error);
        
    // })
    // db.collection('tasks').findOne({_id: new ObjectID("5e8069a966fc6c3784436566")}, (error, task) =>{
    //     if(error){
    //         return console.log('unable to fetch');        
    //     }
    //     console.log(task);       
    // })
    // db.collection('tasks').find({completed: true}).toArray((error, tasks) =>{
    //     console.log(tasks);
        
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'node',
    //         completed: true
    //     },
    //     {
    //         description: 'mongo',
    //         completed: false
    //     },
    //     {
    //         description: 'react',
    //         completed: true
    //     }
    // ], (error, result) =>{
    //     if(error){
    //         return console.log('insert failed');
            
    //     }
    //     console.log(result.ops);
        
    // })
})

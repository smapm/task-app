require('../src/db/mongoose')
const Task = require('../src/models/task');

// Task.findByIdAndDelete({_id:'5e883733125b4610f01e2462'}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((count)=>{
//     console.log(count);
    
// }).catch((e)=>{
//     console.log(e);
    
// })

const dowork = async(id,bool)=>{
    const findandD = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed : bool})
    return count;
};
dowork('5e8839afde12b41ea8f48863', false).then((c)=>{
    console.log(c);
    
}).catch((e)=>{
    console.log(e);
    
})
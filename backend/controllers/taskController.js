const tasks = [];
exports.createTask = async(req,res)=>{

    const task = {...req.body};

    tasks.push(task);

    res.send("Task created!");
}
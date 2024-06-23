import Task from "../Models/task.js";
import User from "../Models/User.js";

//create task
export const createTask  = async(req,res)=>{

    try {
      const {title ,description ,dueDate} = req.body;
      const {id} = req.headers ;
      if(!title || !description || !dueDate){
         return res.status(400).json({message:"All fields are required"});
        }
        else{
         const newTask = new Task({
            title:title,
            description:description,
            dueDate:dueDate
         })
         const saveTask = await newTask.save();
         const taskId =saveTask._id;
         const task = await User.findByIdAndUpdate(id ,{$push:{tasks:taskId._id}});
         return res.status(200).json({message:"task created successfully",data:task});
        }
      
      
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
}

//getallTasks
export const getAllTasks  = async(req,res)=>{

   try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({path:"tasks",options: {sort:{ createdAt: -1}}})
    
   return res.status(200).json({data:userData});
       
     
     
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

//delete task
export const deleteTask  = async(req,res)=>{

   try {
    const {id} = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id)
    const userData = await User.findByIdAndUpdate(userId,{$pull:{tasks:id}})
   return res.status(200).json({message:"Task deleted Successfully"});
       
     
     
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

//update task
export const updateTask  = async(req,res)=>{

   try {
    const {id} = req.params;
    const {title ,description ,dueDate} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id,{
      title:title,
      description:description,
      dueDate:dueDate
     })
   return res.status(200).json({message:"Task updated Successfully",data:updatedTask});
    
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

//update important task
export const updateImportantTask  = async(req,res)=>{

   try {
    const {id} = req.params;
   const taskData = await Task.findById(id);
   const importantTask = taskData.important;
   const updatedTask = await Task.findByIdAndUpdate(id,{important:!importantTask}, { new: true })
   return res.status(200).json({message:"Important Task updated Successfully",data:updatedTask});
    
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

//update complete task
export const updateCompleteTask  = async(req,res)=>{

   try {
    const {id} = req.params;
   const taskData = await Task.findById(id);
   const completeTask = taskData.complete;
   const updatedTask = await Task.findByIdAndUpdate(id,{complete:!completeTask}, { new: true })
   return res.status(200).json({message:"Task Completed",data:updatedTask});
    
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

// get important task
export const getImportantTasks  = async(req,res)=>{

   try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({path:"tasks",match:{important:true},options: {sort:{ createdAt: -1}}})
    const impData = userData.tasks;
   return res.status(200).json({data:impData});
       
     
     
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

// get complete task
export const getCompletedTasks  = async(req,res)=>{

   try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({path:"tasks",match:{complete:true},options: {sort:{ createdAt: -1}}})
    const compData = userData.tasks;
   return res.status(200).json({data:compData});
       
     
     
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

// get inComplete task
export const getIncompletedTasks  = async(req,res)=>{

   try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({path:"tasks",match:{complete:false},options: {sort:{ createdAt: -1}}})
    const compData = userData.tasks;
   return res.status(200).json({data:compData});
       
     
     
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    dueDate:{
        type:String,
        required:true,
    },
    description:{
     type:String,
     required:true,
    },
    important:{
        type:Boolean,
        default:false,
    },
   complete:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const Task = mongoose.model('task',taskSchema)
export default Task ;
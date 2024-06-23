import express from 'express';
import {createTask , getAllTasks , deleteTask, updateTask , updateImportantTask, updateCompleteTask, getImportantTasks,getCompletedTasks, getIncompletedTasks} from '../Controller/taskController.js'
import {SignIn,Login} from '../Controller/userController.js';
import {authentication} from './auth.js';
 const router = express.Router();

//user route
router.post('/sign-in',SignIn);
router.post('/login',Login);



//task route
router.get('/get-all-tasks',authentication,getAllTasks);
router.get('/get-important-tasks',authentication,getImportantTasks);
router.get('/get-complete-tasks',authentication,getCompletedTasks);
router.get('/get-incomplete-tasks',authentication,getIncompletedTasks);
router.post('/create-task',authentication ,createTask);
// router.get('/todos/:id',getSingleTodo);
router.put('/update-task/:id',authentication ,updateTask);
router.put('/update-imp-task/:id',authentication ,updateImportantTask);
router.put('/update-complete-task/:id',authentication ,updateCompleteTask);
router.delete('/delete-task/:id',authentication , deleteTask);



 export default router;
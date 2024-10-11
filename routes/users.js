import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database

let users = [];

// Getting the lst of users from the mock database
router.get('/', (req, res) => {
  res.send(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser)
})


// Adding a new user to the mock database
router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.first_name} has been added to the Database`);
})

// deleting a user from the mock database
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = [...users.filter( user => user.id !== id)];

  res.send(`${id} deleted successfully from database`);
})

// updating a user in the mock database
router.patch('/:id', (req,res) => {
  const { id } = req.params;

  const { first_name, last_name, email } = req.body;
  
  const user = users.find( user => user.id === id);

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(email) user.email = email;

  res.send(`User with id ${id} has been updated`);
})

export default router;
const express = require('express')
const router = express.Router()
const pool = require('../config/database')

router.get('/getTasks', (req, res) => {
  pool.query('SELECT * FROM tasks', (err, results) => {
    if (err) console.log(err)
    res.send(results)
  })
})

router.post('/newTask', async (req) => {
  await pool.query('INSERT INTO tasks SET ?', req.body, (err, results) => err ? (
    console.log(`err:${err}`)
  ) : (
    console.log(`Query add complete. ${results.affectedRows}`))
  )
})

router.post('/removeTask', async (req) => {
  const task2Delete = req.body.name
  await pool.query('DELETE FROM tasks WHERE name = ?', task2Delete, (err, results) => err ? (
    console.log(`err:${err}`)
  ) : (
    console.log(`Query delete complete. ${results.affectedRows}`))
  )
})

router.post('/doneTask', async (req) => {
  await pool.query('UPDATE tasks SET done = ? WHERE name = ?',
    [req.body.done, req.body.id], (err, results) => err ? (
      console.log(`err:${err}`)
    ) : (
      console.log(`Query update complete. ${results.affectedRows}`))
  )
})

module.exports = router
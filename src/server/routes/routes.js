const express = require('express')
const router = express.Router()
const pool = require('../config/database')

// *TASKS

router.post('/getTasks', (req, res) => {
  pool.query('SELECT * FROM tasks WHERE user_id = ?', req.body.id, (err, results) => {
    if (err) console.log(err)
    res.status(200).send(results)
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
      console.log(`Query update complete. ${results.affectedRows}`)
    )
  )
})

// *USERS

router.post('/newUser', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }
  await pool.query('INSERT INTO users SET ?', data, (err, results) => {
    if (err) {
      console.log(`err:${err}`)
      res.status(300).send('error')
    }
    else {
      console.log(`Query add complete. ${results.affectedRows}`)
      res.status(200).send('ok')
    }
  })
})

router.post('/login', async (req, res) => {
  await pool.query('SELECT * FROM users WHERE name = ?', req.body.username, (err, results) => {
    if (!err && req.body.password === results[0].password) {
      res.status(200).send({ id: results[0].id })
    } else {
      console.log(err)
      res.status(300).send("bad")
    }
  })
})

router.post('/replace', async (req, res) => {
  await pool.query(`UPDATE users SET ${req.body.item} = '${req.body.newData}' WHERE name = '${req.body.oldName}'`, (err, results) => {
    if (err) throw err
    res.status(200).send("ok")
  })
})

// *Server

router.post('/ready', (req, res) => {
  setTimeout(() => {
    res.status(200).send("ready")
  }, 9000);
})

module.exports = router
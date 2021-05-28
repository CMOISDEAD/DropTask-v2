const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const firebaseConfig = require('../config/firebase')
const key = require('../helpers/droptasks-firebase-adminsdk-akvrw-9a5bf29e9e.json')

// *Initialize
admin.initializeApp({ ...firebaseConfig, credential: admin.credential.cert(key) });
const db = admin.database();

// *Tasks

router.post('/getTasks', async (req, res) => {
  const id = req.body.id
  await db.ref(`users/${id}/tasks`).once('value', (snapshot) => {
    const data = snapshot.val()
    const tasks = []
    for (const key in data) {
      const task = {
        key,
        ...data[key]
      }
      tasks.push(task)
    }
    res.status(200).send(tasks)
  })
})

router.post('/newTask', async (req, res) => {
  const id = req.body.user_id
  const task = {
    name: req.body.name,
    descrip: req.body.descrip,
    time: req.body.time,
    done: req.body.done,
  }
  db.ref(`users/${id}/tasks`).push(task)
})

router.post('/removeTask', async (req) => {
  console.log(req.body.id)
  db.ref(`users/${req.body.id}/tasks/${req.body.key}`).remove()
})

router.post('/doneTask', async (req) => {
  db.ref(`users/${req.body.user_id}/tasks/${req.body.id}`).update({ done: req.body.done })
})

// *Users

router.post('/newUser', async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    tasks: {}
  }
  db.ref('users').push(data)
})

router.post('/login', async (req, res) => {
  const userData = {
    name: req.body.username,
    password: req.body.password,
  }
  db.ref("users").orderByChild("name").equalTo(userData.name).on("value", (snapshot) => {
    const data = snapshot.val()
    for (const key in data) {
      if (data[key].password === userData.password) {
        res.status(200).send({
          id: key,
        })
      } else {
        res.status(300).send("bad credentials")
      }
    }
  })
})

router.post('/replace', async (req, res) => {
  const { item, key, newData } = req.body
  if (item === "name") {
    const data = {
      name: newData
    }
    db.ref(`users/${key}`).update(data)
  } else {
    const data = {
      password: newData
    }
    db.ref(`users/${key}`).update(data)
  }
})

// *Server

router.post('/ready', (req, res) => {
  setTimeout(() => {
    res.status(200).send("ready")
  }, 9000);
})

module.exports = router
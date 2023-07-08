const express = require('express');
const router = express.Router();
const {add, edit, remove, all, employee} = require("../controllers/employees");
const {auth} = require('../middleware/auth');

router.get("/", auth, all);
router.get("/:id", auth, employee);
router.post("/add", auth, add);
router.put("/edit/:id", auth, edit);
router.delete("/remove/:id", auth, remove);

module.exports = router;

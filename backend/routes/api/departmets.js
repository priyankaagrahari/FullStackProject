const express = require('express')
const router = express.Router();
const auth  = require('../../middleware/auth');

const Departments = require('../../models/Departments');

const { check, validationResult } = require('express-validator');

// @route GET 
// @access private
router.get('/',auth,
async (req,res) => {
    console.log('Fetching departments');
    try{
        let departments = await Departments.find();
        res.json(departments);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
const express = require('express')
const router = express.Router();
const auth  = require('../../middleware/auth');

const Users = require('../../models/Users');

const { check, validationResult } = require('express-validator');

// @route GET 
// @access private
router.get('/',auth,
async (req,res) => {
    console.log('Fetching worklists');
    try{
        let departmentID = req.query.departmentID;
        console.log(departmentID);
        var query = { departmentID:departmentID};
        let users = await Users.find(query);
        res.json(users);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
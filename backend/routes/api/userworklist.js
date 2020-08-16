const express = require('express')
const router = express.Router();
const auth  = require('../../middleware/auth');

const Worklist = require('../../models/Worklist');

const { check, validationResult } = require('express-validator');

// @route GET 
// @access private
router.get('/',auth,
async (req,res) => {
    console.log('Fetching worklists');
    try{
        let userID = req.user.userID;
        console.log(userID);
        var query = { initiatedBy:userID};
        let worklists = await Worklist.find(query);
        res.json(worklists);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
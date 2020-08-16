const express = require('express')
const router = express.Router();
const auth  = require('../../middleware/auth');

const Workbasket = require('../../models/Workbasket');

const { check, validationResult } = require('express-validator');

// @route GET 
// @access private
router.get('/', auth,
async (req,res) => {
    console.log('Fetching warkbasket');
    try{
        let departmentID = req.user.departmentID;
        console.log(departmentID);
        var query = { departmentID:departmentID};
        let forms = await Workbasket.find(query);
        res.json(forms);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
    res.send('workbasket list')
});

module.exports = router;
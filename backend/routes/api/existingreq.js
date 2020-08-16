const express = require('express');
const Worklist = require('../../models/Worklist');
const Workbasket = require('../../models/Workbasket');
const router = express.Router();
const auth  = require('../../middleware/auth');

// @route GET 
// @access private
router.get('/', auth,
async (req,res) => {
    console.log('Fetching existing requests');
    try{
        let userID = req.user.userID;
        var query = {initiatedBy:userID};
        let worklists = await Worklist.aggregate([
            {$limit : 1},
            { $project: {_id: '$$REMOVE'}},

            { $lookup: { from: 'worklists', pipeline: [{ $match: query}], as: 'worklists' } },
            { $lookup: { from: 'workbaskets', pipeline: [{ $match: query}], as: 'workbaskets' } },

            { $project: { union: { $concatArrays: ["$worklists", "$workbaskets"] } } },

            { $unwind: '$union' },
            { $replaceRoot: { newRoot: '$union' } }
        ]);
        
        res.json(worklists);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
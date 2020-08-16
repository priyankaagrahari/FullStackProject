const express = require('express')
const router = express.Router();
const Forms = require('../../models/Forms');
const Users = require('../../models/Users');
const { check, validationResult } = require('express-validator');
const Worklist = require('../../models/Worklist');
const Workbasket = require('../../models/Workbasket');


// @route GET 
// @access private
router.get('/', 
async (req,res) => {
    try{
        let formID = req.query.formID;
        let form = await Forms.findById(formID);
        res.json(form);
    } catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});

router.post('/submit', (req,res,next) => {
    req.body.actionType = "Pending Request";
    req.body.routePath = 'Workbasket';
    next()
});
router.post('/approve', (req,res,next) => {
    req.body.actionType = "Approved Request";
    req.body.routePath = 'Worklist';
    next()
});
router.post('/reject', (req,res,next) => {
    req.body.actionType = "Rejected Request";
    req.body.routePath = 'Worklist';
    next()
});

router.post('/',[
    check('formID','formID is required').not().isEmpty(),
    check('routedTo','RoutedTo is required').not().isEmpty(),
    check('departmentID','CreatedBy is required').not().isEmpty(),
    check('actionType','actionType is required').not().isEmpty(),
    check('routePath','routePath is required').not().isEmpty()
],
async (req,res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {formID,routedTo,departmentID,routePath,actionType,message,comment} = req.body;

    let formFields = {}
    let formaction = {}
    if(message) formFields.routedTo = message;
    if(actionType){
        formaction.comment = comment;
        formaction.requestType = actionType;
        formaction.requestActor = req.user.userID;
    }

    try{
        let form = await Forms.findById({formID});
        const query = {userID:routedTo};
        let user = await Users.findOne(query);
        if(form && user){
            form = await Forms.findByIdAndUpdate({formID},
                {$set:formFields},
                { $push: { requests: formaction }},
                {new :true});
        }
        res.json(form);

        if(routePath=='Worklist'){
            const query = {formID: {formID}};
            const wbEntry = Workbasket.findOne(query);
            if(wbEntry){
                Workbasket.findOneAndDelete(query);
            }
            const wlEntry = new Worklist({
                formID:{formID},
                initiatedBy:req.user.userID
            });
            await wlEntry.save();
        }
        if(routePath=='Workbasket'){
            
        }

    }catch(err){
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});

router.put('/', [
    check('message','message is required').not().isEmpty()
],
async (req,res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    const newForm = new Forms({
        createdBy:req.user.userID,
        message:req.body.message
    });
    const form = await newForm.save();

    const wlEntry = new Worklist({
        formID:form.id,
        initiatedBy:req.user.userID
    });
    await wlEntry.save();
    res.json(form);

    }catch(err){
        console.error(err.message);
        res.status(500).end('Server Error');
    }

});

router.delete('/', 
async (req,res) => {
    let formID = req.query.formID;
    await Forms.findByIdAndDelete(formID);
    res.send('form successfully deleted')
});

module.exports = router;
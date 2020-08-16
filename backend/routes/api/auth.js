const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');

// @route POST 
// @access private
router.post('/', [
    check('userID','User ID is required').not().isEmpty(),
    check('password','Password is required').exists()
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      const {userID,password} = req.body;

      try{
          let user = await User.findOne({userID});

          if(!user){
              return res.status(400)
              .json({
                  errors:[{msg:'User does not exist'}]
              });
          }

          if(user.password != password){
              return res.status(400)
              .json({
                  errors:[{msg: 'Password mis-match'}]
              });
          }

          const payload = {
              user:{
                  id: user.id,
                  userID: user.userID,
                  departmentID: user.departmentID,
                  name: user.name,
                  emailID: user.emailID
              }
          }

          jwt.sign(
              payload, config.get('jwtSecret'),
              { expiresIn: 36000 },
              (err, token) => {
                if(err) throw err;
                res.json({token});
              });

      }catch(err){
          console.error(err.message);
          res.status(500).end('Server Error');
      }
});

module.exports = router;
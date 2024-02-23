const { authService } = require("../service");
const utils = require("../misc/utils");


const authController = {
  
  async postSignUp(req, res, next) {
    try {
      
      const { email, password, firstName, lastName, address, isAdmin } = req.body;
      
      const newUser = await authService.signUp({ email, 
        plainPassword : password, 
        firstName, 
        lastName, 
        address, 
        isAdmin 
        });
      
      
      res.status(201).json(utils.buildResponse(newUser));
    } catch (error) {
      
      next(error);
    }
  },
  

  async postSignIn(req, res, next) {
    try{
        const { email, password, firstName, lastName, address } = req.body;
        const token = await authService.signIn({ 
            email,
            plainPassword: password,
        });
        res.status(201).json(utils.buildResponse(token));
    } catch (error) {
        next (error);
    }
  },
};

module.exports = authController;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDAO } = require("../data-access");
const config = require("../config");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { sanitizeFilter } = require("mongoose");


class AuthService {
  
  async signUp({ email, plainPassword, isAdmin }) {
    const existingUser = await userDAO.findByEmail(email);
    if (existingUser !== null ) {
        throw new AppError(commonErrors.inputError, 
            "이미 존재하는 이메일 입니다",
            400
            );
        }
    //새로운 유저
    const hashedPassword = await bcrypt.hash(plainPassword, 15);

    const newUser = await userDAO.create({
        email,
        password: hashedPassword,
        isAdmin,
    });

    return {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin
    };

  }
  

  async signIn({email, plainPassword}){
    const user = await userDAO.findByEmail(email);
    if (user === null) {
        throw new AppError(
            commonErrors.resourceNotFoundError,
            "이메일 또는 패스워드가 잘못 되었습니다.",
            400
        );
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
        throw new AppError(
            commonErrors.resourceNotFoundError,
            "이메일 또는 패스워드가 잘못 되었습니다",
            400
        );

    }
    const tokenPayload = {
        email,
        isAdmin: user.isAdmin
    }
    
    const encodedToken = await new Promise((resolve, reject) => {
        jwt.sign(tokenPayload, 
            config.jwtSecret, 
            {expiresIn: '6h'}, 
            (error, encoded) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(encoded);

            }
            );
    });
    return encodedToken;
    
  }

  
}

module.exports = new AuthService();

const bcrypt = require("bcrypt");
const { hashedPassword } = require("../helpers/hashPassword");
const jwt = require("jsonwebtoken");
const { queryRunner } = require("../helpers/queryRunner");
const { selectQuery, insertSignUpQuery } = require("../constant/queries");

exports.signIn = async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      
        const selectResult = await queryRunner(
            selectQuery("register", "email"),
            [email]
        );

        if (selectResult[0].length === 0) {
            return res.status(404).json({
              statusCode: 404,

              message: `User not found`,
            });
          } 
          else if (
            await bcrypt.compare(password, selectResult[0][0].password)) {
                const id = selectResult[0][0].id;
            const token = jwt.sign({ email, id }, "11madklfnqo3393", {
              expiresIn: "7d",
            });
            return res.status(200).json({
              message: "SignIn successfully",
              token,
              id: selectResult[0][0].id,
            });
          } else {
            return res.status(404).json({
              statusCode: 404,
              message: "Incorrect Password",
            });
          }
    } catch (error) {
        return res.status(500).json({
            message: "Failed to login",
            error: error.message,
        });
    }
};


  exports.singUp = async function (req, res) {
    const { name, address, email, password } = req.body;
    console.log(req.body);
   const currentDate = new Date();
    try {
      
      const selectResult = await queryRunner(
        selectQuery("register", "email"),
        [email]
      );
  
      if (selectResult[0].length > 0) {
        return res.status(404).json({
          statusCode: 200,
          message: `User already exists on this email ${email}`,
        });
      }
  
      const hashPassword = await hashedPassword(password);
    
      
      const salt = bcrypt.genSaltSync(10);
      const id = bcrypt
        .hashSync(name + new Date().getTime().toString(), salt)
        .substring(0, 10);
      const insertResult = await queryRunner(insertSignUpQuery, [
        name,
        email,
        hashPassword,
        address,
        currentDate
      ]);
      console.log(insertResult[0]);
      if (insertResult[0].affectedRows > 0) {
        return res.status(200).json({
          message: "User added successfully",
          id: insertResult[0].insertId,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          message: "Failed to add user",
        });
        
      }
    } catch (error) {
      return res.status(500).json({
        message: "Failed to add user",
        message: error.message,
      });
    }
  };

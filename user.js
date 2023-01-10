const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("./models/UserSchema");

const routes = express.Router();

routes.post("/add", (req, res) => {
  const { login, mail, firstname, lastname, password } = req.body;

  if (!login || !mail || !firstname || !lastname || !password)
    return res.status(401).json({ message: "donnees user non specifiees" });

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({ message: "error generation hash" });
        else {
          const user = userModel({
            login,
            mail,
            firstname,
            lastname,
            password: hash,
          });

          user.save();
          res.end();
        }
      });
    } else {
      return res.status(500).json({ message: "error generation salt" });
    }
  });
});

routes.get("/checklogin", (req, res) => {
  const { login, password } = req.body;

  if (!login || !password)
    return res.status(401).json({ message: "donnees user non specifiees" });

  userModel.findOne({login}, (err, user) => {
    if(err)
      return res.status(500).json({ message: "erreur de recuperation de donnees" });
    
    if(!user)
      return res.status(404).json({ message: "Login not exists" });

    bcrypt.compare(password, user.password,(error, resultat) => {
        if(resultat)
          return res.status(200).json({ message: "SUCCESS" });
        else 
          return res.status(400).json({ message: "ERROR" });
    })
  })
   
});

routes.get("/checkemail", (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password)
    return res.status(401).json({ message: "donnees user non specifiees" });

  userModel.findOne({mail}, (err, user) => {
    if(err)
      return res.status(500).json({ message: "erreur de recuperation de donnees" });
    
    if(!user)
      return res.status(404).json({ message: "Mail not exists" });

    bcrypt.compare(password, user.password,(error, resultat) => {
        if(resultat)
          return res.status(200).json({ message: "SUCCESS" });
        
        return res.status(400).json({ message: "ERROR" });
    })
  })
});

module.exports = routes;

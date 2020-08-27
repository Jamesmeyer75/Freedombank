const passport = require('passport')
const db = require("../models");

module.exports = app => {
    //POST: login 
    app.post('/api/login', passport.authenticate('local-login',{
      successReturnToOrRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash:true
    }))
    //POST: account creation
    app.post('/api/signup',passport.authenticate('local-signup',{
      successReturnToOrRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
    }))
    //creates a account
    app.post('/api/createAccount',function(req,res){
      let create =  createUniqueAccountNumber(req.body,req.user)
      setTimeout(function(){
         if(create === true){
           res.redirect('/dashboard')
         }
      }, 200);
    })
    //sends money to another account
    app.post('/api/sendmoney',function(req,res){
      //person receiving the payment(sent money)
      db.Account.findOne({
        where: {
          email: req.body.receiving_email
        },
      }).then(function(data){
        let transactionData = {
          account_id: data.id,
          transaction_type: 'Wire-Transfer',
          comment: req.body.comment,
          amount: req.body.amount
        }
        let updatedValues = {current_balance: (parseInt(data.current_balance) + parseInt(req.body.amount))}
        let location = {where:{id:data.id}}
        db.Account.update(updatedValues,location).then()
        db.transactions.create(transactionData).then()
      })
      //person sending the money
      db.Account.findOne({
        where:{
          UserId:req.user
        }
      }).then(function(data){
        let transactionData = {
          account_id: data.id,
          transaction_type: 'Wire-Transfer',
          comment: req.body.comment,
          amount: (parseInt(req.body.amount) * -1) 
        }
        let updatedValues = {current_balance: (parseInt(data.current_balance) - parseInt(req.body.amount))}
        let location = {where: {UserId: req.user}}
        db.Account.update(updatedValues,location).then()
        db.transactions.create(transactionData).then(
          res.redirect('/dashboard')
        )
      })
    })
    //make a deposit
    app.post('/api/deposit',function(req,res){
      db.Account.findOne({
        where: {
          UserId: req.user
        }
      }).then(function(data){
        let transactionData = {
          account_id: data.id,
          transaction_type: 'Deposit',
          comment: 'Deposit',
          amount: parseInt(req.body.deposit)
        }
        let updatedValues = {current_balance:(parseInt(data.current_balance) + parseInt(req.body.deposit))}
        let location = {where: {UserId:req.user}}
        db.Account.update(updatedValues, location).then()
        db.transactions.create(transactionData).then(
          res.redirect('/dashboard')
        );
      })
    })
    //update account
    app.put("/api/updateaccount", function(req, res) {
      console.log(`Editing name: ${req.body.first_name}`);
      db.account
        .update(
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address
          },
          {
            where: {
              email: req.body.email
            }
          }
        )
        .then((result) => {
          res.json(result);
          console.log(result);
        });
    });
    //logs you out
    app.get(`/logout`, (req, res) => {
      req.logout();
      res.redirect(`/`);
    });

    //creates a unique number and checks to see if that account number is unique
    function createUniqueAccountNumber(body,id){
      let testNum = ''

      for(let i = 0; i < 8; i++){
        let randomNum = Math.floor(Math.random() * 9)
        testNum = testNum + randomNum.toString()
      }
      testNum = parseInt(testNum)
      body.account_number = testNum
      body.userId = id
      db.Account.findOne({
        where: {
          account_number: testNum
        }
      }).then(data =>{
        if(!data){
          try{
            db.Account.create(body).then(function(db){
              console.log('account created')
            })
          } catch {
            console.log('account creatation failed')
          }
        } else if(data){
          createUniqueAccountNumber(body,id)
        }
      })
      return true
    }
};

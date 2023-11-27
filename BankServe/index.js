
// import logic file
const logic =require('./service/logic')
// import express
const express =require("express")

const  jwt=require('jsonwebtoken')
// app creatn

const app= express()
const cors =require('cors')
app.use(cors({origin:'http://localhost:4200'}))

// // to convert all incoming json to js
app.use(express.json())
// imprt jwr


const jwtMiddleWare=(req,res,next)=>{
    console.log("...middleware..")
    // access token from request header
    try{
    const token=req.headers['access_token']
    // verify
  const data= jwt.verify(token,"secretkey123")
  console.log(data)
   next()}
   catch{
    res.status(422).json(
        {
           statusCode:404,
           satus:false,
           message:"please lognr"

        }
    )
   }
}

// integrate frontend with server

// request
app.post('/register',(req,res)=>{
    logic.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    } )  
    })
    app.post('/login',(req,res)=>{
        logic.login(req.body.acno,req.body.psw).then(result=>{
            res.status(result.statusCode).json(result)
        })
    })
    app.get('/balance/:acno',jwtMiddleWare,(req,res)=>{
        logic.getBalance(req.params.acno).then(result=>{
            res.status(result.statusCode).json(result)
        })
    })
    app.get('/getUser/:acno',jwtMiddleWare,(req,res)=>{
        logic.getUser(req.params.acno).then(result=>{
            res.status(result.statusCode).json(result)
        })
    })
    app.post('/transfer',(req,res)=>{
         logic.fundTransfer(
            req.body.toAcno,
            req.body.fromAcno,
            req.body.amount,
            req.body.psw,
            req.body.date
            ).then(result=>{
            res.status(result.statusCode).json(result)
        // })
    })
})
app.get('/transaction/:acno',(req,res)=>{
    logic.getTransaction(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deleteAc/:acno',jwtMiddleWare,(req,res)=>{
    logic.deleteAc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.get('/getdata',(req,res)=>{
    console.log(req.body.acno)
   res.json(req.body.acno)

})

// port set
app.listen(3000,()=>{
    console.log("servstared at 3000")
})
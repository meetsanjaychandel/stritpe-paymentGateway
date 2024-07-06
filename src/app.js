const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(config.stripe.secretKey);

const app = express();
app.use(cors({
  origin:"*"
}))

app.use(bodyParser.json());

app.get('/config', (req, res) => {
  res.json({ publishableKey: config.stripe.publishableKey });
});


app.post("/create-payment-intent",async(req,res)=>{
  const {amount} = req.body;

  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount,
      currency:"usd",
      receipt_email:"meetsanjaychandel@gmail.com",
      description:"hey Sanjay.. thank you for you payment"
      
    });
    res.send({
      clientSecret:paymentIntent.client_secret
    })
  }
  catch(err){
    res.status(500).send({error:err.message})
  }
})

app.post("/refund",async(req,res)=>{

  try{
    const {paymentIntentId,refundAmount} = req.body;
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refundAmount,
    });
    console.log('Refund successful:', refund);
    res.json({message:"refunded successfully",refund});
  }catch(err){
    console.log(err);
    res.status(500).json({message:err.message})
  }
}
)

app.listen(3000,()=>{
  console.log("server is listening on port 3000")
})

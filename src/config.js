require('dotenv').config()

module.exports={
    stripe:{
        secretKey:process.env.STRIPE_SECRET_KEY,
        publishableKey:process.env.STRIPE_PUBLISHABLE_KEY
    }
}
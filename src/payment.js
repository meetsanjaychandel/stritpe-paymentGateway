fetch('http://localhost:3000/config')
.then((res)=>res.json())
.then(config=>{
const stripe= Stripe(config.publishableKey);
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount("#card-element");

const form = document.getElementById('payment-form');

form.addEventListener('submit',async(event)=>{
    event.preventDefault()

    const {clientSecret} = await fetch('http://localhost:3000/create-payment-intent',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100000 })
    }).then(res=>res.json());

    const {error,paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:cardElement
        }
    });

    if(error){
        console.log("Error",error)
    }else if(paymentIntent.status==="succeeded"){
        console.log("Payment successful !")
    }
})

})


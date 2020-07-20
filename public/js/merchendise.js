$(document).ready(function () {

    const config = {
        apiKey: "AIzaSyBky32IdiXLfDEZpNAhvy88REx97Jb25PQ",
        authDomain: "nasatv.firebaseapp.com",
        databaseURL: "https://nasatv.firebaseio.com",
        storageBucket: "nasatv.appspot.com"
    };
    firebase.initializeApp(config);
    const db = firebase.database();

    let cartPrice = 0;

    getPriceFromDBAtStart();
    async function getPriceFromDBAtStart() {
        cartData = await $.get('/getCartData');        
        cartData.forEach(function(val){
            const parsedVal = JSON.parse(val);               
            cartPrice = parseFloat(cartPrice) + parseFloat(parsedVal.price);
        });        
        $("#cartVal2").text(cartPrice);
    }


    // FOR FIREBASE
    //const rand = Math.floor(Math.random() * 10000) * Math.floor(Math.random() * 55);
    //db.ref(`/${rand}-${frmData.name}`).set(frmData); 

});
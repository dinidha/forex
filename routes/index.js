var express = require('express');
var router = express.Router();
var axios = require('axios')

const connectToFX = async (endPoint, covertion) =>{
  const URL = 'https://api.currencyscoop.com/v1/';
  const KEY = 'f71a7e1ab4b8b380e0896cd69b3609b3';
  const conf = URL + endPoint + "?api_key=" + KEY + covertion;
  try {
    const data = axios.get(conf)
    return data
  }catch (e){
    console.log(e)
  }
}
const connectToSMS = async (text) =>{
  const URL = `https://http-api.d7networks.com/send?username=ovau1952&password=RxqTiF89&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=FOREX&content=LKR${text}&to=+61416350308`;
  try {
    const data = axios.post(URL)
    return data
  }catch (e){
    console.log(e)
  }


}

/* GET home page. */
router.get('/app', function(req, res, next) {
  const endPoint = "latest";
  const convertion = "&base=AUD&symbols=LKR";
  let conversionValue = ''

  setInterval(() =>{
    console.log("hi")
  },36000)


  connectToFX(endPoint, convertion).then(responseFromApi1 => {
    conversionValue = responseFromApi1.data.response.rates.LKR
    /*connectToSMS(conversionValue.toFixed(2)).then(responseFromApi2 =>{
      console.log(responseFromApi2)
    })*/
    const fullRes = responseFromApi1.data.response.rates
    res.send(fullRes)
  })



});

module.exports = router;

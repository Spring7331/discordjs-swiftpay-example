require('dotenv').config()
const axios = require("axios")

let apiurl = "https://www.swiftpay.cc";

createInvoice = async (paymentMethod, amount, isAMNTBTC = true) => {

    //This only applies to BTC (amount should be in satoshis)
    if(isAMNTBTC)
        amount = amount * 100000000;

    //axios.post(apiurl + "/api/invoices/createinvoice", { data }) wouldnt post data for some reason idk
    let datastr = `?amount=${amount}&paymentMethod=${paymentMethod}&apikey=${process.env.API_KEY_SWIFT}`
    let data = await axios.post(apiurl + "/api/invoices/createinvoice" + datastr)
    return data.data;
}

module.exports = {
    createInvoice
}
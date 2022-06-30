const axios = require("axios");
const {createWarnEmbed, createSuccessEmbed, createErrorEmbed} = require("./API/discord");
const {client} = require("./index");

let apiurl = "https://www.swiftpay.cc";

let invoiceArr = [];

checkInvoices = async () => {
    try {
        for (let i = 0; i < invoiceArr.length; i++)
        {
            let datastr = `?invoiceID=${invoiceArr[i].invoiceID}`
            let data = await axios.get(apiurl + "/api/invoices/checkinvoice" + datastr)

            switch (data.data.status)
            {
                case "over_paid_unconfirmed":
                case "paid_unconfirmed":
                case "paid_unpaid_total_unconfirmed":
                    if (!invoiceArr[i].recievedMSG)
                    {
                        let embed = createWarnEmbed(invoiceArr[i].invoiceID, data.data.fullmsg)
                        invoiceArr[i].message.channel.send({ embeds: [embed] });
                        invoiceArr[i].recievedMSG = true;
                    }
                    break;
                case "underpaid_amount":
                    if (!invoiceArr[i].unpaidMSG)
                    {
                        let embed = createErrorEmbed(invoiceArr[i].invoiceID, data.data.fullmsg)
                        invoiceArr[i].message.channel.send({ embeds: [embed] });
                        invoiceArr[i].unpaidMSG = true;
                    }
                    break;
                case "last_chance_to_pay":
                    if (!invoiceArr[i].lastchanceMSG)
                    {
                        let embed = createErrorEmbed(invoiceArr[i].invoiceID, data.data.fullmsg)
                        invoiceArr[i].message.channel.send({ embeds: [embed] });
                        invoiceArr[i].lastchanceMSG = true;
                    }
                    break;
                case "failed_to_pay":
                    if (!invoiceArr[i].failedPayMSG)
                    {
                        let embed = createErrorEmbed(invoiceArr[i].invoiceID, data.data.fullmsg + "\nDO NOT SEND ANYMORE!")
                        invoiceArr[i].message.channel.send({ embeds: [embed] });
                        invoiceArr[i].failedPayMSG = true;
                    }
                    break;
                case "paid_confirmed":
                    if (!invoiceArr[i].successMSG)
                    {
                        let embed = createSuccessEmbed(invoiceArr[i].invoiceID, data.data.fullmsg)
                        invoiceArr[i].message.channel.send({ embeds: [embed] });
                        invoiceArr[i].successMSG = true;
                    }
                    break;

            }

        }
    }
    catch (err)
    {

    }

    setTimeout(checkInvoices, 1000);
}

module.exports = {
    checkInvoices,
    invoiceArr
}
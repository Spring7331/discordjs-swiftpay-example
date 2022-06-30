require('dotenv').config()
const { Client, Intents } = require('discord.js');
const {createInvoice} = require("./API/api");
const {createSuccessEmbed, createInfoEmbed} = require("./API/discord");
const {checkInvoices, invoiceArr} = require("./thread");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log("Bot is ready")
})

client.on("message", async message => {
    let prefix = "!"
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (message.member.roles.cache.some(role => role.name === 'Admin')) { //Change Admin What you want the role to be
        if (command == "createinvoice") {
            if (args < 2)
                message.channel.send("Invalid Args Required [paymentMethod, amount]")
            else {
                if (isNaN(args[1]))
                    message.channel.send("Amount Must be a number!")
                else {
                    let invoiceData = await createInvoice(args[0], args[1])
                    console.log(invoiceData)
                    switch (invoiceData.message)
                    {
                        case "invalid_payment":
                            break;
                        case "invalid_apikey":
                            break;
                        case "success":
                            let embed = createInfoEmbed(invoiceData.invoice, invoiceData.payment, invoiceData.sendTo, invoiceData.amount)
                            message.channel.send({ embeds: [embed] });
                            invoiceArr.push({
                                invoiceID: invoiceData.invoice,
                                channel: message.channel.id,
                                message: message,
                                recievedMSG: false,
                                unpaidMSG: false,
                                lastchanceMSG: false,
                                failedPayMSG: false,
                                successMSG: false
                            })
                            break;
                    }
                }
            }
        }
    }
})

client.login(process.env.BOT_TOKEN)
checkInvoices()

module.exports = {
    client
}
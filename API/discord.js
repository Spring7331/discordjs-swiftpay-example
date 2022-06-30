const {MessageEmbed} = require("discord.js");

createInfoEmbed = (invoiceID, paymentMethod, sendTo, amount) => {
    return new MessageEmbed()
        .setColor('#000eff')
        .setTitle('Invoice ' + invoiceID)
        .setDescription('Pay The Invoice')
        .addFields(
            { name: 'Pay In ' + paymentMethod, value: 'Send To ' + sendTo },
            { name: 'Amount', value: amount + " " + paymentMethod, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Powered By SwiftPay' });
}

createWarnEmbed = (invoiceID, message) => {
    return new MessageEmbed()
        .setColor('#ff9000')
        .setTitle('Invoice ' + invoiceID)
        .setDescription(message)
        .setTimestamp()
        .setFooter({ text: 'Powered By SwiftPay' });
}

createErrorEmbed = (invoiceID, message) => {
    return new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Invoice ' + invoiceID)
        .setDescription(message)
        .setTimestamp()
        .setFooter({ text: 'Powered By SwiftPay' });
}

createSuccessEmbed = (invoiceID, message) => {
    return new MessageEmbed()
        .setColor('#08ff00')
        .setTitle('Invoice ' + invoiceID)
        .setDescription(message)
        .setTimestamp()
        .setFooter({ text: 'Powered By SwiftPay' });
}

module.exports = {
    createInfoEmbed,
    createWarnEmbed,
    createErrorEmbed,
    createSuccessEmbed
}
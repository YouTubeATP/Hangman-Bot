module.exports = {
    name: 'foo',
    description: 'A command that responds `bar`.',
    execute(message, args) {
        message.channel.send('Bar');
    },
};
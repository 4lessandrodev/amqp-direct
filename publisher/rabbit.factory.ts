import amqp, { Channel } from 'amqp-connection-manager';
const EXCHANGE_NAME = 'exchange-01';

// Create a connetion manager
const connection = amqp.connect(['amqp://username:password@localhost:5672']);
connection.on('connect', () => console.log('Connected!'));
connection.on('connectFailed', (e) => console.log(e));
connection.on('disconnect', err => console.log('Disconnected.', (err as unknown as Error).stack));

// Create a channel wrapper
const channelWrapper = connection.createChannel({
    json: true,
    setup: (channel: Channel) => {
        return channel.assertExchange(EXCHANGE_NAME, 'direct',)
    }
});

// Send messages until someone hits CTRL-C or something goes wrong...
export function sendMessage<T>(data: T, channel: string) {
    channelWrapper.publish(EXCHANGE_NAME, channel,
        { 
            time: Date.now(),
            data
        })
        .then(function () {
            console.log("Message sent");
        })
        .catch(err => {
            console.log("Message was rejected:", err.stack);
            channelWrapper.close();
            connection.close();
        });
};

import amqp, { Channel } from 'amqp-connection-manager';
import { ConsumeMessage } from 'amqplib';

const QUEUE_NAME = 'queue-01'
const EXCHANGE_NAME = 'exchange-01';

// Handle an incomming message.
const onMessage = (data: ConsumeMessage | null) => {
    console.log('Data: ', data);
    const key = data?.fields.routingKey;
    const message = JSON.parse(data ? data.content.toString() : 'Message received');
    console.log("subscriber: got message", message);
    data && key?.includes('routing-key-01') && channel1Wrapper.ack(data);
    data && key?.includes('routing-key-02') && channel2Wrapper.ack(data);
}

// Create a connetion manager
const connection = amqp.connect(['amqp://username:password@localhost:5672']);
connection.on('connect', () => console.log('Connected!'));
connection.on('connectFailed', (e) => console.log(e));
connection.on('disconnect', err => console.log('Disconnected.', (err as unknown as Error).stack));

// Set up a channel listening for messages in the queue.
const channel1Wrapper = connection.createChannel({
    setup: (channel: Channel) => {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        return Promise.all([
            channel.assertQueue(QUEUE_NAME, { exclusive: false, autoDelete: false }),
            channel.assertExchange(EXCHANGE_NAME, 'direct'),
            channel.prefetch(1),
            channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, 'routing-key-01'),
            channel.consume(QUEUE_NAME, onMessage)
        ]);
    }
});

// Set up a channel listening for messages in the queue.
const channel2Wrapper = connection.createChannel({
    setup: (channel: Channel) => {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        return Promise.all([
            channel.assertQueue(QUEUE_NAME, { exclusive: false, autoDelete: false }),
            channel.assertExchange(EXCHANGE_NAME, 'direct'),
            channel.prefetch(1),
            channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, 'routing-key-02'),
            channel.consume(QUEUE_NAME, onMessage)
        ]);
    }
});

channel1Wrapper.waitForConnect()
    .then(function () {
        console.log("Chanel 1 Listening for messages");
    });

channel2Wrapper.waitForConnect()
.then(function () {
    console.log("Chanel 2 Listening for messages");
});

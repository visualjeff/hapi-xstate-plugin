'use strict';

const Hapi = require('@hapi/hapi');
const sleep = require('util').promisify(setTimeout);

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {

    await server.register([{
        plugin: require('../'),
        options: {
            initial: 'inactive',
            states: {
                inactive: { on: { TOGGLE: 'active' } },
                active: { on: { TOGGLE: 'inactive' } }
            }
        }
    }]);
    await server.start();
};

startup().catch((err) => {

    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);

server.app.xStateInterpreter.onTransition((state) => console.log(`Toggled to: ${state.value}`));
console.log();
console.log('Starting to toggle state...');
console.log();
const test = async () => {

    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
    console.log();
    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
    console.log();
    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
    await sleep(500);
    server.app.xStateInterpreter.send('TOGGLE');
};

test().then(async () => {

    console.log();
    console.log('All done!  Now shutting down.');
    await sleep(500);
    await server.stop({ timeout: 60 * 1000 });
}).catch((err) => {

    throw err;
});

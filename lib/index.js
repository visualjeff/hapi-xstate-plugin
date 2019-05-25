'use strict';

const { Machine, interpret } = require('xstate');

exports.plugin = {
    pkg: require('../package.json'),
    register: (server, options) => {
        // Inject a reference of XState toggle into server.app.
        const xStateMachine = Machine(options);
        server.app.xStateInterpreter = interpret(xStateMachine).start();
    }
};

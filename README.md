
## About hapi-xstate-plugin

A Hapi [xState](https://www.npmjs.com/package/xstate) plugin.  Compatible with Hapi 18 and xState 4.6.0.

[![Build Status](https://travis-ci.org/visualjeff/hapi-xstate-plugin.png)](https://travis-ci.org/visualjeff/hapi-xstate-plugin)

## Install
```
npm install hapi-xstate-plugin --save
```


## Usage

```js
'use strict';

const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
    host: localhost,
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: require('hapi-xstate-plugin'),
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
```

## To change state, the xState interpreter is available from within Hapi's server.app object:
```js
const xStateInterpreter = server.app.xStateInterpreter;
xStateInterpreter.onTransition((state) => console.log(state.value));
xStateInterpreter.send('TOGGLE');
```



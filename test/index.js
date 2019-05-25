'use strict';

const XStatePlugin = require('../');

const Hapi = require('@hapi/hapi');
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const lab = exports.lab = Lab.script();

const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('xState-plugin', () => {

    it('fails to loads as a plugin', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: XStatePlugin,
                options: {
                    verbose: 'invalid value'
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.exist();
        });
    });

    it('errors with invalid options', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: XStatePlugin,
                options: {
                    verbose: 'invalid value'
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.exist();
        });
    });

    it('xState interpreter is injected into server.app', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: XStatePlugin,
                options: {
                    initial: 'inactive',
                    states: {
                        inactive: { on: { TOGGLE: 'active' } },
                        active: { on: { TOGGLE: 'inactive' } }
                    }
                }
            }]);

        };

        register().catch((err) => {

            expect(err).to.not.exist();
        });

        expect(server.app.xStateInterpreter).to.exist();
    });
});

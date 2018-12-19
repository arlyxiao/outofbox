const express = require('express');
const next = require('next');

const site = require('./site');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare()
    .then(() => {
        const server = express();
        const menus = site()['menus'];

        console.log('---');
        console.log(menus);
        console.log('---');

        server.get('/manage/node/edit/:id', (req, res) => {
            const actualPage = '/manage/node/edit';
            const queryParams = {id: req.params.id};
            app.render(req, res, actualPage, queryParams)
        });

        Object.keys(menus).forEach(function (menu, index) {
            server.get('/' + menu + '/tag/:tag', (req, res) => {
                const actualPage = '/taxon';
                const queryParams = {id: menus[menu]['id'], tag: req.params.tag};
                app.render(req, res, actualPage, queryParams)
            });

            server.get('/' + menu + '-:id', (req, res) => {
                const actualPage = '/show';
                const queryParams = {id: req.params.id};
                app.render(req, res, actualPage, queryParams)
            });

            server.get('/' + menu + '-:id' + '/edit', (req, res) => {
                const actualPage = '/manage/node/edit';
                const queryParams = {id: req.params.id};
                app.render(req, res, actualPage, queryParams)
            });

            server.get('/' + menu, (req, res) => {
                console.log("====");
                console.log(menus[menu]['id']);
                console.log("====");

                const actualPage = '/taxon';
                const queryParams = {id: menus[menu]['id']};
                app.render(req, res, actualPage, queryParams)
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(5000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:5000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

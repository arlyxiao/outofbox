const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express()

        server.get('/manage/node/edit/:id', (req, res) => {
            const actualPage = '/manage/node/edit';
            const queryParams = {id: req.params.id};
            app.render(req, res, actualPage, queryParams)
        });

        const menus = {
            '/science': 1,
            '/software': 2,
            '/finance': 3,
            '/wisdom': 4,
            '/education': 5
        };

        Object.keys(menus).forEach(function (menu, index) {
            server.get(menu + '/:tag', (req, res) => {
                const actualPage = '/index';
                const queryParams = {id: menus[menu], tag: req.params.tag};
                app.render(req, res, actualPage, queryParams)
            });

            server.get(menu, (req, res) => {
                const actualPage = '/index';
                const queryParams = {id: menus[menu]};
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

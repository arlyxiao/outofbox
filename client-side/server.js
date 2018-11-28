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

        const menus = [
            '/science',
            '/software',
            '/finance',
            '/wisdom',
            '/culture',
            '/education'
        ];

        menus.forEach(function(menu) {
          server.get(menu, (req, res) => {
                const actualPage = '/index';
                const queryParams = {id: req.params.id};
                app.render(req, res, actualPage, queryParams)
            })
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

const express = require('express');
const fs = require('fs');
const router = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('client'));
app.use('/api/cart', router);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});


// app.get()
// app.post()
// app.put()
// app.delete()





// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
//
// app.get('/api/users', (req, res) => {
//     res.send(JSON.stringify([
//         {name: 'Some1'},
//         {name: 'Some2'},
//         {name: 'Some3'},
//     ]))
// });
// app.get('/api/users/:id', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
// });

app.listen(3000, () => console.log('Listen on port 3000...'))
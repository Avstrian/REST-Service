const express = require('express');

const data = [
    {
        id: 'lsidzdf',
        name: 'Test',
        color: 'blue'
    },
    {
        id: 'iuadsiuhsadui',
        name: 'Second',
        color: 'red'
    },
    {
        id: '123123',
        name: 'Third',
        color: 'green'
    },
];

const app = express();

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    next();
});
app.use(express.json({}));

app.get('/', (req, res) => res.json({ message: 'hello' }));

app.get('/api/catalog', (req, res) => {
    res.json(data);
});

app.post('/api/catalog', (req, res) => {
    const id = 'asdf' + (Math.random() * 9999 | 0);
    req.body.id = id;
    data.push(req.body);

    res.json(req.body);
});

app.get('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    const record = data.find(r => r.id = id);

    res.json(record);
});

app.put('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let index;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }

    req.body.id = id;

    data[index] = req.body;
    res.end();
});

app.put('/api/catalog/:id', (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    const record = data.find(r => r.id == id);
    res.json(record);

    res.end();
});

app.delete('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let index;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }

    data.splice(index, 1);

    res.status(204).end();
});

app.listen(3000, () => console.log('Server started on port 3000'))
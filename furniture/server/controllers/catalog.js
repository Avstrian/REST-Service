const router = require('express').Router();
const api = require('../services/furniture');
const mapErrors = require('../utils/mapper');
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => { 
    const item = {
        make: req.body.make,
        model: req.body.material,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        owner: req.user._id
    };

    try {
        const result = await api.create(item);
        res.status(201).json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const item = {
        make: req.body.make,
        model: req.body.material,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
    };

    try {
        const result = await api.update(id, item);
        res.json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err).map(e => e.msg);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const id = req.params.id;
        await api.deleteById(id);
        res.status(204).end();

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err).map(e => e.msg);
        res.status(400).json({ message: error });
    }
});

module.exports = router;
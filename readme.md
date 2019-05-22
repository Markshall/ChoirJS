# ChoirJS
An event-driven web framework created for laughs.

```
const { Choir } = require('choirjs');
const app = new Choir(8080);

app.registry.add('/', 'index');

app.route.get.on('index', (req, res) => {
	res.send('o7');
});
```

# Installation
Do remember that this  Node.js module was created on a whim and is not in any way recommended for use in production. It is just a toy to play around with.

```
$ npm install choirjs
```

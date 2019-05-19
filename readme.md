# ChoirJS
An event-driven web framework created for laughs.

```
const choir = require('choirjs');
const app = new choir(8080);

app.route.get.on('/', (req, res) => {
	res.send('o7');
});
```

# Installation
Do remember that this  Node.js module was created on a whim and is not in any way recommended for use in production. It is just a toy to play around with.

```
$ npm install choirjs
```

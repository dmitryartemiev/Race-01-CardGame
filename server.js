import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const express = require('express')
const path = require('path')

const PORT = process.env.PORT ?? 3000
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render('main')
})
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
})

var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
}); 

app.use('/', require('./routes'));

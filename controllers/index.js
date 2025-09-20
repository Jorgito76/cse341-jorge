const awesomeFunction = (req, res, next) => {
    res.json('Maclan Gullie');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('Super Awesome person');
};

module.exports = { awesomeFunction,returnAnotherPerson};
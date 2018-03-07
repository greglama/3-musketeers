# cash librairy
> A library to get money exchange rates

## What is it ?
Cash is librairy which provide you an easy way to get rate changes between the different currencies.

## Quick setup
`$ npm install`

If you wish to install it globally to use it in your terminal easily:

`$ npm install -g cash`

## Getting started

### - Command Line
If you have installed it globally you can type cash directly in your terminal, if not you can give arguments to the index.js file in the bin directory.

These command lines are equivalent if you have done the global instalation.
```
/cash/bin$ node index.js 1 usd
$ cash 1 usd
```
This last command give you the change rate of 1 us dollar with the default currencies.

You can specify the the currencies you want the change for.


`$ cash 1 usd eur cad aud`<br>
Output:<br>
√ 0.81 (EUR) Euro<br>
√ 1.29 (CAD) Canadian Dollar<br>
√ 1.28 (AUD) Australian Dollar<br>

If you wish to change the default currencies:

`$ cash --save usd eur cad aud`<br>

Thus us, eur, cad and aud will become the default currencies to get the rates from.

### - In the code

Import cash and use :
```
const cash = require('./cash.js');
const config = new Conf();

const command = {
  'amount': 1,
  'from': 'USD',
  'to':['USD', 'EUR', 'GBP', 'PLN']
};
cash(command);
```
It will output the result in the console.
# ECDSA Node

## Initial Code

This project is an extension of the `Alchemy University Week 1 project`. The initial code manages a simple server/client structure to check balance on different accounts to archive a minimum simulation of a blockchain node.

For more info check: [Alchemy University ECDSA Node github repo](https://github.com/alchemyplatform/ecdsa-node)

## New Features

This repo extends and upgrades the base code to make it more interesting and useful.The main added features are:

#### 1) Change of library

All code related to the signature creation,recovery,etc is changed from the [ethereum-cryptography](https://github.com/ethereum/js-ethereum-cryptography) library to the [noble@1.7.1](https://github.com/paulmillr/noble-secp256k1/tree/1.7.1) due to:

<div style="background-color: #ffffcc; padding: 10px; border: 1px solid #cccccc; margin-bottom: 10px;">
    <strong>April 2023 update</strong>: ethereum-cryptography v2.0 is out, switching <a href="https://github.com/paulmillr/noble-secp256k1">noble-secp256k1</a> to <a href="https://github.com/paulmillr/noble-curves">noble-curves</a>, which changes re-exported api of secp256k1 submodule.
</div>

#### 2) Web client side:

-   Updated the inface to check balance on different accounts by using a standard ethereum address format.

-   New interface to send transactions.

    -   Transactions can be sent by using the public address if the used address is one of the provided to increase a faster user experience.
    -   The transaction can be sent to any address by providing the public address and the amount to send.

-   Info label with standard addresses to use for testing.

#### 3) Server side:

-   A new script to generate private keys, public keys and addresses.
-   Update of `app.post('send')` call
    -   Checks the signature of the transaction to see if the sender is the owner of the account.
    -   Adds a message format for the hasshed message (`sentAmount + ":" + receiverAddress`) to prepare for future implementations of calldata.
    -   For further info of changes inf the api calls structure check [Server](#Server) section

## Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

## Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Api calls to the server

<div style="background-color: #ffffcc; padding: 10px; border: 1px solid #cccccc; margin-bottom: 10px;">
    Api calls to the server can be done using other client interfaces of just plain command line calls. It only need to follow the structure of the data object.
</div>

#### `app.post('send',[object])`

This call is used to send a transaction to the node. This call sends an amount from one account to another. The data object should have the following structure **order**:

```json
{
    "sender": "0x5asca...5123", // String
    "sign": [], // <Uint8Array> signature of hash(amount + ":" + receiver)
    "recoveryBit": 0, // Number: recovery bit from signature
    "recipient": "0xn3w...6AF", // String
    "amount": "..." // Number: amount to send
}
```

#### `app.get("/balance/:[address])"`

Returns the balance of the address provied in the call

### Runnng the scripts

To generate a **new private key**, public key and address run the following command in the server folder:

    node scripts/generate.js

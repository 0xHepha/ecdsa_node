const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

//const secp = require("ethereum-cryptography/secp256k1");

const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { recoverPublicKey } = require("@noble/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
    "0x4c8aac52309ae70801180c4dab4b4aa8ee2589c5": 100,
    "0xfb22f4a79c8ff5eb94ba0c6f8f3d6a91eec59afe": 50,
    "0x3174fea5716f6947f03f9bf057d3b5a94d80f5f9": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", async (req, res) => {
    const { sender, sign, recoveryBit, recipient, amount } = req.body;

    // Create the hashed value
    const message = amount + ":" + recipient;

    // Recover public key and obtain address from signature
    const publicKey = await recoverKey(message, sign, recoveryBit);
    const checkAddress = "0x" + publicKey.slice(-40);

    // Check if signature is valid
    if (sender !== checkAddress) {
        res.status(400).send({ message: "Invalid signature!" });
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < Number(amount)) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[sender] -= Number(amount);
        balances[recipient] += Number(amount);
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

async function recoverKey(message, sign, recoveryBit) {
    try {
        // Convert string to number
        const recoveryBitNumber = Number(recoveryBit);
        const hashed_msg = hashMessage(message);

        // Step 1: Create an array of the values from the object
        const byteArray = Object.values(sign);

        // Step 2: Convert that array to a Uint8Array
        const normalSign = new Uint8Array(byteArray);
        const res = toHex(
            recoverPublicKey(hashed_msg, normalSign, recoveryBitNumber)
        );

        return res;
    } catch (error) {
        console.log(error);
    }
}

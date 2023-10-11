import { useState, useEffect } from "react";
import server from "./server";
import { sign } from "@noble/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

import { utf8ToBytes } from "ethereum-cryptography/utils";

const keys = {
    "0x4c8aac52309ae70801180c4dab4b4aa8ee2589c5":
        "de4cccece1f083558cfe108bdb9aed5a5e85fb3604b79bbc822fadf1a2e0ba14",
    "0xfb22f4a79c8ff5eb94ba0c6f8f3d6a91eec59afe":
        "e948ce6f38fc82dc8b2b3c70918109603ed2b3365f595746d55ba0b7311728d9",
    "0x3174fea5716f6947f03f9bf057d3b5a94d80f5f9":
        "7438809ae07538ee773101b672a3b20162922cc36dc4edf046bd4f9353ac7ba1",
};

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

function Transfer({ setAddress, setBalance }) {
    async function signMessage(msg) {
        const hasshed_msg = hashMessage(msg);
        const signed = sign(hasshed_msg, privateKey, { recovered: true });
        return signed;
    }

    const [sender, setSender] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [showPrivateKeyInput, setShowPrivateKeyInput] = useState(false);

    useEffect(() => {
        if (keys[sender] === undefined) {
            setShowPrivateKeyInput(true);
            setPrivateKey("");
        } else {
            setPrivateKey(keys[sender]);
            setShowPrivateKeyInput(false);
        }
    }, [sender]);

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        const [sign, recoveryBit] = await signMessage(
            sendAmount + ":" + recipient
        );

        const sendData = {
            sender: sender.toString(),
            sign: sign,
            recoveryBit: recoveryBit,
            recipient: recipient.toString(),
            amount: sendAmount,
        };

        try {
            const {
                data: { balance },
            } = await server.post(`send`, sendData);
            setAddress(recipient);
            setBalance(balance);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>
            <label>
                From
                <input
                    placeholder="Type an address"
                    value={sender}
                    onChange={setValue(setSender)}
                ></input>
            </label>

            {showPrivateKeyInput && (
                <label>
                    Private KEY
                    <input
                        placeholder="¡¡¡ Only if not the default account !!!"
                        value={privateKey}
                        onChange={setValue(setPrivateKey)}
                    ></input>
                </label>
            )}

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;

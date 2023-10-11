import server from "./server";

import { secp256k1 } from "ethereum-cryptography/secp256k1";
const secp = secp256k1;
import { toHex } from "ethereum-cryptography/utils";
import { useEffect } from "react";

function Wallet({ address, setAddress, balance, setBalance }) {
    async function onChange(evt) {
        const address = evt.target.value;
        setAddress(address);
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Check Balance</h1>

            <label>
                Address
                <input
                    placeholder="Type an address : "
                    value={address}
                    onChange={onChange}
                ></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;

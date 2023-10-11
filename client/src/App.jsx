import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");

    return (
        <>
            <div className="app">
                <Wallet
                    balance={balance}
                    setBalance={setBalance}
                    address={address}
                    setAddress={setAddress}
                />
                <Transfer setAddress={setAddress} setBalance={setBalance} />
            </div>
            <div className="accountInfo">
                <h1>Accounts info ( for testing)</h1>
                <div>
                    <div className="addressDiv">
                        Account :
                        <strong>
                            0x4c8aac52309ae70801180c4dab4b4aa8ee2589c5
                        </strong>
                    </div>

                    <div className="info">
                        Public key:
                        044f672d984b08d66befdcfd9c8ee46aea4ac7925ec60247e222884ec6bc4c172fef398b6ed270e9c5d50bc31c4c8aac52309ae70801180c4dab4b4aa8ee2589c5
                    </div>
                </div>
                <div>
                    <div className="addressDiv">
                        Account :{" "}
                        <strong>
                            0xfb22f4a79c8ff5eb94ba0c6f8f3d6a91eec59afe
                        </strong>
                    </div>
                    <div className="info">
                        Public key:
                        04d2c689720b07731518410db0a40217a76d60d72ffeaad0e633542777bffe0ec9684939dd07d02f58500e2b8dfb22f4a79c8ff5eb94ba0c6f8f3d6a91eec59afe
                    </div>
                </div>
                <div>
                    <div className="addressDiv">
                        Account :
                        <strong>
                            {" "}
                            0x3174fea5716f6947f03f9bf057d3b5a94d80f5f9
                        </strong>
                    </div>
                    <div className="info">
                        Public key:
                        04c1ff735cd02338505a216e1860d90d366182a176e86560636fcc726de556f86960665accf9f85736cdcb47dc3174fea5716f6947f03f9bf057d3b5a94d80f5f9
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

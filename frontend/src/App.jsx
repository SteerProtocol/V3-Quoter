import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useContractLoader, useUserProviderAndSigner } from "eth-hooks";
import useWeb3Modal from "./hooks/useWeb3Modal";
import useContractConfig from "./hooks/useContractConfig";
import useTokenList from "./hooks/useTokenList";
import './App.css';

const {
  abi,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const tokens = [
  {
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  },
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  },
  {
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  },
  {
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    symbol: "CURVE",
    address: "0xD533a949740bb3306d119CC777fa900bA034cd52"
  },
  {
    symbol: "SHIBA INU",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
  },
  {
    symbol: "BNB",
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
  }
];

function App() {
  const [ err, setErr ] = useState("");
  const [ buyFlag, setBuyFlag ] = useState(false);
  const [ amount, setAmount ] = useState(0.0);
  const [ quote, setQuote ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ sourceToken, setSourceToken ] = useState();
  const [ destToken, setDestToken ] = useState();
  //const tokens = useTokenList();

  const [ provider, account, loadWeb3Modal, logoutOfWeb3Modal ] = useWeb3Modal();
  const chainId = 31337;
  const config = useContractConfig();
  const providerAndSigner = useUserProviderAndSigner(provider)
  const contracts = useContractLoader(providerAndSigner.signer, config, chainId);

  useEffect(() => {
    loadWeb3Modal()
  }, []);

  const setErrorAlert = (text) => {
    setErr(text);
    setTimeout(() => {
      setErr("");
   }, 5000);
  }

  const setQuoteAlert = (text) => {
    setQuote(text);
    setTimeout(() => {
      setQuote("");
   }, 10000);
  }

  const getQuote = async () => {
    if(amount <= 0) {
      setErrorAlert("Amount cannot be 0 or negative");

      return;
    }

    setLoading(true);

    try {

      const exists = await contracts.Quoter.doesPoolExist(sourceToken, destToken);
      if(!exists) {
        setErrorAlert("Pool does not exist");
      } else {
        const formattedAmount = ethers.utils.parseEther(amount);
        const uniswap = new ethers.Contract("0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", abi, provider);

        let expectedAmount = 0;
        let expectedAmountUniswap = 0;
        if(!buyFlag) {
          expectedAmount = await contracts.Quoter.estimateMaxSwapUniswapV3(sourceToken, destToken, formattedAmount);
          expectedAmountUniswap = await uniswap.callStatic.quoteExactInputSingle(
            sourceToken,
            destToken,
            3000,
            formattedAmount,
            0
          );
        } else {
          expectedAmount = await contracts.Quoter.estimateMinSwapUniswapV3(destToken, sourceToken, formattedAmount);
          expectedAmountUniswap = await uniswap.callStatic.quoteExactOutputSingle(
            sourceToken,
            destToken,
            3000,
            formattedAmount,
            0
          );
        }

        const text = `You would ${buyFlag ? "give" : "receive"} ${ethers.utils.formatUnits(expectedAmount, 18)} tokens. Uniswap lens quoter returned ${ethers.utils.formatUnits(expectedAmountUniswap, 18)} tokens.`;
        setQuoteAlert(text);
      }

    } catch(e) {
      console.log(e);
      setErrorAlert("MetaMask Provider Error");
    }

    setLoading(false);
  };

  return (
    <main className="form-signin text-center">
      <form>
        <img className="mb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png" alt="Uniswap logo" width="72" height="72" />
        <h1 className="h3 mb-3 fw-normal">Uniswap V3 Quoter</h1>

        <div className="btn-group mb-3" role="group">
          <input type="radio" className="btn-check" name="btnradio" id="buy" onChange={()=>setBuyFlag(true)} autoComplete="off" checked={buyFlag} />
          <label className="btn btn-outline-primary" htmlFor="buy">BUY</label>
        
          <input type="radio" className="btn-check" name="btnradio" id="sell" onChange={()=>setBuyFlag(false)} autoComplete="off" checked={!buyFlag} />
          <label className="btn btn-outline-primary" htmlFor="sell">SELL</label>
        </div>
        <div className="form-floating">
          <select className="form-select" id="floatingSourceToken" onChange={(e) => setSourceToken(e.target.value)}>
            <option>Choose...</option>
            { tokens.filter((token) => token.address !== destToken).map((token, idx) => 
              <option value={token.address} key={idx}>{token.symbol}</option>
            )}
          </select>
          <label htmlFor="floatingSourceToken">Source Token</label>
        </div>
        <div className="form-floating">
          <select className="form-select" id="floatingDestToken" onChange={(e) => setDestToken(e.target.value)}>
          <option>Choose...</option>
          { tokens.filter((token) => token.address !== sourceToken).map((token, idx) => 
              <option value={token.address} key={idx}>{token.symbol}</option>
            )}
          </select>
          <label htmlFor="floatingDestToken">Destination Token</label>
        </div>
        <div className="form-floating">
          <input type="number" className="form-control" id="floatingAmount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label htmlFor="floatingAmount">
            {!buyFlag &&
              <>
                Amount in source tokens
              </>
            }
            {buyFlag &&
              <>
                Amount in destination tokens
              </>
            }
          </label>
        </div>

        <br />

        {!loading &&
          <button className="w-100 btn btn-lg btn-primary" type="button" onClick={()=>getQuote()}>Quote</button>
        }
        {loading &&
          <button className="w-100 btn btn-lg btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...
          </button>
        }
        { quote !== "" &&
          <div className="alert alert-primary text-wrap" role="alert">{quote}</div>
        }
        { err !== "" &&
          <div className="alert alert-danger text-wrap" role="alert">{err}</div>
        }
        <p className="mt-5 mb-3 text-muted">Made for Unicode Hack</p>
      </form>
    </main>
  );
}

export default App;

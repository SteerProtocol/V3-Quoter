import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useContractLoader, useUserProviderAndSigner } from "eth-hooks";
import useWeb3Modal from "./hooks/useWeb3Modal";
import useContractConfig from "./hooks/useContractConfig";
import useTokenList from "./hooks/useTokenList";
import './App.css';

/*
const tokens = [
  {
    symbol: "WETH",
    address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C"
  },
  {
    symbol: "DAI",
    address: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
  },
  {
    symbol: "USDT",
    address: "0xf3e0d7bF58c5d455D31ef1c2d5375904dF525105"
  },
  {
    symbol: "UNI",
    address: "0x9b6Ff80Ff8348852d5281de45E66B7ED36E7B8a9"
  },
  {
    symbol: "LINK",
    address: "0xa36085F69e2889c224210F603D836748e7dC0088"
  },
  {
    symbol: "SHIBA",
    address: "0xE9A1Ed75621D9357C753e1436Fe9EB63628bde67"
  },
  {
    symbol: "WBTC",
    address: "0xA0A5aD2296b38Bd3e3Eb59AAEAF1589E8d9a29A9"
  }
];
*/

function App() {
  const [ buyFlag, setBuyFlag ] = useState(false);
  const [ amount, setAmount ] = useState(0.0);
  const [ quote, setQuote ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ sourceToken, setSourceToken ] = useState();
  const [ destToken, setDestToken ] = useState();
  const tokens = useTokenList();

  const [ provider, account, loadWeb3Modal, logoutOfWeb3Modal ] = useWeb3Modal();
  const chainId = 31337;
  const config = useContractConfig();
  const providerAndSigner = useUserProviderAndSigner(provider)
  const contracts = useContractLoader(providerAndSigner.signer, config, chainId);

  useEffect(() => {
    loadWeb3Modal()
  }, []);

  const getQuote = async () => {
    if(amount <= 0) {
      alert("Amount cannot be 0 or negative");

      return;
    }
    
    setLoading(true);
    
    const formattedAmount = ethers.utils.parseEther(amount);

    let res = 0;
    if(buyFlag) {
      res = await contracts.Quoter.estimateMaxSwapUniswapV3(sourceToken, destToken, formattedAmount);
    } else {
      res = await contracts.Quoter.estimateMinSwapUniswapV3(sourceToken, destToken, formattedAmount);
    }

    setQuote(res);

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
            { tokens.filter((token) => { return token.address !== destToken && token.chainId === 1}).map((token, idx) => 
              <option value={token.address} key={idx}>{token.symbol} - {token.name}</option>
            )}
          </select>
          <label htmlFor="floatingSourceToken">Source Token</label>
        </div>
        <div className="form-floating">
          <select className="form-select" id="floatingDestToken" onChange={(e) => setDestToken(e.target.value)}>
          <option>Choose...</option>
            { tokens.filter((token) => { return token.address !== destToken && token.chainId === 1}).map((token, idx) => 
              <option value={token.address} key={idx}>{token.symbol} - {token.name}</option>
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
        { quote > 0 &&
          <div className="alert alert-primary" role="alert">
            You would receive {quote.toString()} tokens
          </div>
        }
        <p className="mt-5 mb-3 text-muted">Made for Unicode Hack</p>
      </form>
    </main>
  );
}

export default App;

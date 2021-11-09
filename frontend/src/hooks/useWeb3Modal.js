import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3Modal from "web3modal";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const NETWORK = "kovan";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad = true, infuraId = INFURA_ID, network = NETWORK } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(() => {
    return new Web3Modal({
      network,
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId,
          },
        },
      },
    });
  }, [infuraId, network]);

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
    const userAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(userAccount[0]);
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal],
  );

  useEffect(() => {
    const loadAccount = async () => {
      console.log("provider", provider)
      //const accounts = await provider.listAccounts();
      setAccount("0xabcE56CF919319a323843E682C6e62F25E728612");
    };

    if(provider !== null)
      loadAccount();
  }, [provider]);

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, account, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;

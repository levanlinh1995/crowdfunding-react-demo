import RoutesApp from '@/routes'
import React from 'react'
import '@/styles/index.scss'

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const App: React.FC = () => {
  return isMetaMaskInstalled() ? <RoutesApp /> : (
    <div>
      <div className='require-metamask'>Please install Metamask extension <a href="https://metamask.io/download/">Here</a></div>
    </div>
  );
}

export default App

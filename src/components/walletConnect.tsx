import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import FreighterApi from '@stellar/freighter-api';

interface WalletConnectProps {
  onAddressChange?: (address: string) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onAddressChange }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [freighterApi, setFreighterApi] = useState<typeof FreighterApi | null>(null);

  useEffect(() => {
    // Initialize Freighter API
    const initFreighter = async () => {
      try {
        const api = FreighterApi;
        const { isConnected } = await api.isConnected();
        setIsFreighterInstalled(isConnected);
        setFreighterApi(api);
        
        if (isConnected) {
          const { address } = await api.getAddress();
          if (address) {
            setWalletAddress(address);
            onAddressChange?.(address);
          }
        } else {
          setError('Freighter wallet is not installed. Please install it from https://www.freighter.app/');
        }
      } catch (err) {
        console.error('Error initializing Freighter:', err);
        setError('Failed to initialize Freighter wallet. Please try again.');
      }
    };

    initFreighter();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onAddressChange]);

  const connectWallet = async () => {
    if (!isFreighterInstalled) {
      window.open('https://www.freighter.app/', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      setError('');

      if (!freighterApi) {
        throw new Error('Freighter API not initialized');
      }

      // Check if already connected
      const { isConnected } = await freighterApi.isConnected();
      if (isConnected) {
        const { address } = await freighterApi.getAddress();
        if (address) {
          setWalletAddress(address);
          onAddressChange?.(address);
          return;
        }
      }

      // Request address from Freighter
      const { address } = await freighterApi.getAddress();
      if (!address) {
        throw new Error('Failed to get address from Freighter');
      }

      setWalletAddress(address);
      onAddressChange?.(address);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    onAddressChange?.('');
    setShowDropdown(false);
  };

  const formatAddress = (address: string) => {
    return address.slice(0, 4) + '...' + address.slice(-4);
  };

  return (
    <div className="relative wallet-dropdown">
      {error && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-red-50 text-red-700 rounded-lg text-sm shadow-lg">
          {error}
        </div>
      )}

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              {isFreighterInstalled ? 'Connect Wallet' : 'Install Freighter'}
            </>
          )}
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm font-medium"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {formatAddress(walletAddress)}
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500">Connected Address</p>
                <p className="text-xs font-mono truncate">{walletAddress}</p>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={disconnectWallet}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  FREIGHTER_ID,
  ALBEDO_ID
} from '@creit.tech/stellar-wallets-kit';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  onAddressChange?: (address: string) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onAddressChange }) => {
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Initialize the wallet kit
    const initializeWallet = () => {
      const newKit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID,
        modules: allowAllModules(),
      });
      setKit(newKit);
    };

    initializeWallet();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const connectWallet = async () => {
    if (!kit) return;

    try {
      setIsConnecting(true);
      setError('');
      const { address } = await kit.getAddress();
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

  const switchWallet = async (walletId: string) => {
    if (!kit) return;

    try {
      await kit.setWallet(walletId);
      await connectWallet();
      setShowDropdown(false);
    } catch (err) {
      setError('Failed to switch wallet. Please try again.');
      console.error('Wallet switch error:', err);
    }
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
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm font-medium"
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
              Connect Wallet
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
              
              <div className="py-1">
                <button
                  onClick={() => switchWallet(FREIGHTER_ID)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Switch to Freighter
                </button>
                <button
                  onClick={() => switchWallet(XBULL_ID)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Switch to xBull
                </button>
                <button
                  onClick={() => switchWallet(ALBEDO_ID)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Switch to Albedo
                </button>
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

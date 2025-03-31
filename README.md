# StellarFinance

![StellarFinance Logo](./public/logo.png)



StellarFinance is a decentralized financial advisory platform built on the Stellar blockchain. It connects users with verified financial advisors, enabling secure portfolio management, real-time Chat communication, and transparent financial services.

## 🌟 Features

### For Users
- **Portfolio Management**: Track and manage your Stellar-based investments
- **Advisor Connections**: Connect with verified financial professionals
- **Real-time Chat**: Communicate directly with your financial advisors
- **Wallet Integration**: Seamless integration with Stellar blockchain via Freighter wallet
- **Dashboard Analytics**: Visual representation of portfolio performance and asset allocation

### For Advisors
- **Client Management**: Comprehensive overview of all clients and their portfolios
- **Performance Metrics**: Track AUM (Assets Under Management) and client satisfaction
- **Communication Tools**: Real-time chat with clients
- **Task Management**: Schedule and track meetings and portfolio reviews
- **Professional Profile**: Showcase certifications, specializations, and experience

### For Administrators
- **User Management**: Comprehensive tools to manage users and advisors
- **Platform Metrics**: Track total users, active advisors, total AUM, and platform revenue
- **Security Controls**: KYC verification and status management
- **System Monitoring**: Platform health and performance monitoring

## 🚀 Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Blockchain**: Stellar Network
- **Smart Contracts**: Soroban (Stellar's smart contract platform)
- **Wallet Integration**: Freighter API (`@stellar/freighter-api`)
- **Build Tools**: Vite
- **Deployment**: Vercel

## 💡 Stellar Soroban Smart Contract Integration

StellarFinance is built on Soroban, Stellar's smart contract platform. Our smart contracts handle several critical functions:

1. **Advisor Verification**: Validates advisor credentials and stores reputation data on-chain
2. **Secure Payments**: Manages payment escrow between clients and advisors
3. **Service Agreements**: Creates and enforces agreement terms between users and advisors
4. **Reputation System**: Maintains a transparent, immutable record of advisor ratings and reviews
5. **Portfolio Management**: Provides secure, permissioned access to user portfolio data

The smart contracts ensure transparency, security, and trust within the platform while leveraging Soroban's performance advantages, including high throughput, low transaction costs, and energy efficiency.

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Freighter Wallet browser extension installed ([Get Freighter](https://www.freighter.app/))

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/StellarFinance.git
cd StellarFinance
```

### 2. Install dependencies

```bash
npm install
```



### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### 5. Build for production

```bash
npm run build
```

## 🚢 Deployment

StellarFinance can be deployed to Vercel with minimal configuration:

1. Push your code to a GitHub repository
2. Import the project in Vercel Dashboard
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite
4. Deploy

## 🔧 Configuration

### Stellar Network Configuration

You can configure the Stellar network connection in `src/config/stellar.ts`:

```typescript
export const STELLAR_NETWORK = import.meta.env.VITE_STELLAR_NETWORK || 'testnet';
export const HORIZON_ENDPOINTS = {
  testnet: 'https://horizon-testnet.stellar.org',
  public: 'https://horizon.stellar.org',
};
export const SOROBAN_RPC_URL = import.meta.env.VITE_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org';
```

### Wallet Connection

StellarFinance uses the Freighter wallet API for Stellar blockchain integration. The wallet connection component is located at `src/components/walletConnect.tsx`.

## 📁 Project Structure

```
StellarFinance/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Chat.tsx       # Chat interface component
│   │   └── walletConnect.tsx  # Stellar wallet integration
│   ├── pages/             # Application pages
│   │   ├── Dashboard.tsx  # User dashboard
│   │   ├── AdvisorDashboard.tsx  # Advisor interface
│   │   └── AdminDashboard.tsx  # Admin controls
│   ├── config/            # Configuration files
│   ├── contracts/         # Soroban smart contract integration
│   │   ├── client.ts      # JavaScript client for contract interaction
│   │   └── types.ts       # TypeScript interfaces for contract data
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── vercel.json            # Vercel deployment configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 💼 Use Cases

1. **Individual Investors**:
   - Connect their Stellar wallet
   - Browse and connect with financial advisors
   - Receive personalized financial advice
   - Monitor portfolio performance

2. **Financial Advisors**:
   - Showcase expertise and certifications
   - Manage client relationships
   - Provide financial guidance
   - Track performance metrics

3. **Administrators**:
   - Oversee platform operations
   - Manage user accounts and advisor verification
   - Monitor platform metrics and revenue

## 🛣️ Roadmap

- [ ] Multi-wallet support (Albedo, Lobstr, etc.)
- [ ] Advanced analytics dashboards
- [ ] Extended Soroban smart contract functionality
- [ ] Mobile application development
- [ ] Integration with traditional financial services
- [ ] Enhanced security features and audit trails

## 🤝 Contributing

We welcome contributions to StellarFinance! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'advisor';
  kycStatus: 'pending' | 'verified' | 'rejected';
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  ipfsHash: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface FinancialPassport {
  userId: string;
  creditScore: number;
  riskProfile: string;
  assets: Asset[];
  liabilities: Liability[];
}

export interface Asset {
  id: string;
  type: string;
  value: number;
  description: string;
}

export interface Liability {
  id: string;
  type: string;
  amount: number;
  description: string;
}
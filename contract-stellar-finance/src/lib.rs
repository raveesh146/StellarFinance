#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Map, Symbol, Vec, String};

// Define data structures
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    UserAssets(Address),
    UserTransactions(Address),
    UserGoals(Address),
}

#[contracttype]
#[derive(Clone)]
pub struct Asset {
    asset_type: String,
    amount: i128,
    description: String,
}

#[contracttype]
#[derive(Clone)]
pub struct Transaction {
    timestamp: u64,
    transaction_type: String,
    amount: i128,
    description: String,
}

#[contracttype]
#[derive(Clone)]
pub struct Goal {
    name: String,
    target_amount: i128,
    current_amount: i128,
    deadline: u64,
}

// Main contract
#[contract]
pub struct FinanceManager;

#[contractimpl]
impl FinanceManager {
    // Initialize the contract with an admin
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract already initialized");
        }
        
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }
    

    pub fn add_asset(env: Env, user: Address, asset_type: String, amount: i128, description: String) {
        user.require_auth();
        
        let asset = Asset {
            asset_type,
            amount,
            description,
        };
        
        let key = DataKey::UserAssets(user.clone());
        let mut assets: Vec<Asset> = env.storage().instance().get(&key).unwrap_or(Vec::new(&env));
        assets.push_back(asset);
        env.storage().instance().set(&key, &assets);
    }
    
    pub fn get_assets(env: Env, user: Address) -> Vec<Asset> {
        let key = DataKey::UserAssets(user);
        env.storage().instance().get(&key).unwrap_or(Vec::new(&env))
    }
    

    pub fn record_transaction(
        env: Env,
        user: Address,
        transaction_type: String,
        amount: i128,
        description: String,
    ) {
        user.require_auth();
        
        let transaction = Transaction {
            timestamp: env.ledger().timestamp(),
            transaction_type,
            amount,
            description,
        };
        
        let key = DataKey::UserTransactions(user.clone());
        let mut transactions: Vec<Transaction> = env.storage().instance().get(&key).unwrap_or(Vec::new(&env));
        transactions.push_back(transaction);
        env.storage().instance().set(&key, &transactions);
    }
    
    pub fn get_transactions(env: Env, user: Address) -> Vec<Transaction> {
        let key = DataKey::UserTransactions(user);
        env.storage().instance().get(&key).unwrap_or(Vec::new(&env))
    }
    

    pub fn create_goal(
        env: Env,
        user: Address,
        name: String,
        target_amount: i128,
        deadline: u64,
    ) {
        user.require_auth();
        
        let goal = Goal {
            name,
            target_amount,
            current_amount: 0,
            deadline,
        };
        
        let key = DataKey::UserGoals(user.clone());
        let mut goals: Vec<Goal> = env.storage().instance().get(&key).unwrap_or(Vec::new(&env));
        goals.push_back(goal);
        env.storage().instance().set(&key, &goals);
    }
    
    pub fn update_goal_progress(
        env: Env,
        user: Address,
        goal_index: u32,
        amount_added: i128,
    ) {
        user.require_auth();
        
        let key = DataKey::UserGoals(user.clone());
        let mut goals: Vec<Goal> = env.storage().instance().get(&key).unwrap_or_else(|| panic!("No goals found"));
        
        if goal_index as u32 >= goals.len() {
            panic!("Goal index out of bounds");
        }
        
        let mut goal = goals.get(goal_index).unwrap();
        goal.current_amount += amount_added;
        goals.set(goal_index, goal);
        
        env.storage().instance().set(&key, &goals);
    }
    
    pub fn get_goals(env: Env, user: Address) -> Vec<Goal> {
        let key = DataKey::UserGoals(user);
        env.storage().instance().get(&key).unwrap_or(Vec::new(&env))
    }
    
    // Calculate net worth (sum of all assets)
    pub fn calculate_net_worth(env: Env, user: Address) -> i128 {
        let assets = Self::get_assets(env.clone(), user);
        let mut total: i128 = 0;
        
        for i in 0..assets.len() {
            let asset = assets.get(i).unwrap();
            total += asset.amount;
        }
        
        total
    }
    
    // Admin functions
    pub fn is_admin(env: Env, user: Address) -> bool {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin == user
    }
}
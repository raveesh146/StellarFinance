#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation}, vec, Bytes, BytesN, IntoVal};

#[test]
fn test_initialize() {
    let env = Env::default();
    let admin = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    // Verify admin was set
    assert!(client.is_admin(&admin));
}

#[test]
#[should_panic(expected = "Contract already initialized")]
fn test_initialize_twice_fails() {
    let env = Env::default();
    let admin = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    // Should panic when trying to initialize again
    client.initialize(&admin);
}

#[test]
fn test_add_and_get_assets() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    // Add assets for the user
    env.mock_all_auths();
    
    client.add_asset(
        &user,
        &String::from_str(&env, "cash"),
        &5000,
        &String::from_str(&env, "Savings account")
    );
    
    client.add_asset(
        &user,
        &String::from_str(&env, "stock"),
        &10000,
        &String::from_str(&env, "AAPL shares")
    );
    
    // Verify auth was required
    assert_eq!(
        env.auths(),
        vec![
            &env,
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    contract_id.clone(),
                    Symbol::from_str(&env, "add_asset"),
                    (
                        user.clone(),
                        String::from_str(&env, "cash"),
                        5000_i128,
                        String::from_str(&env, "Savings account"),
                    ).into_val(&env),
                )),
                sub_invocations: vec![&env],
            },
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    contract_id.clone(),
                    Symbol::from_str(&env, "add_asset"),
                    (
                        user.clone(),
                        String::from_str(&env, "stock"),
                        10000_i128,
                        String::from_str(&env, "AAPL shares"),
                    ).into_val(&env),
                )),
                sub_invocations: vec![&env],
            },
        ]
    );
    
    // Get and verify assets
    let assets = client.get_assets(&user);
    assert_eq!(assets.len(), 2);
    
    let asset1 = assets.get(0).unwrap();
    let asset2 = assets.get(1).unwrap();
    
    assert_eq!(asset1.asset_type, String::from_str(&env, "cash"));
    assert_eq!(asset1.amount, 5000);
    assert_eq!(asset1.description, String::from_str(&env, "Savings account"));
    
    assert_eq!(asset2.asset_type, String::from_str(&env, "stock"));
    assert_eq!(asset2.amount, 10000);
    assert_eq!(asset2.description, String::from_str(&env, "AAPL shares"));
}

#[test]
fn test_record_and_get_transactions() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    // Set a specific timestamp for testing
    env.ledger().set(soroban_sdk::ledger::LedgerInfo {
        timestamp: 1234567890,
        protocol_version: 20,
        sequence_number: 0,
        network_id: BytesN::from_array(&env, &[0; 32]),
        base_reserve: 0,
        min_temp_entry_ttl: 0,
        min_persistent_entry_ttl: 0,
        max_entry_ttl: u32::MAX,
    });
    
    env.mock_all_auths();
    
    // Record transactions
    client.record_transaction(
        &user,
        &String::from_str(&env, "deposit"),
        &1000,
        &String::from_str(&env, "Salary")
    );
    
    client.record_transaction(
        &user,
        &String::from_str(&env, "withdrawal"),
        &-500,
        &String::from_str(&env, "Rent payment")
    );
    
    // Get and verify transactions
    let transactions = client.get_transactions(&user);
    assert_eq!(transactions.len(), 2);
    
    let tx1 = transactions.get(0).unwrap();
    let tx2 = transactions.get(1).unwrap();
    
    assert_eq!(tx1.timestamp, 1234567890);
    assert_eq!(tx1.transaction_type, String::from_str(&env, "deposit"));
    assert_eq!(tx1.amount, 1000);
    assert_eq!(tx1.description, String::from_str(&env, "Salary"));
    
    assert_eq!(tx2.timestamp, 1234567890);
    assert_eq!(tx2.transaction_type, String::from_str(&env, "withdrawal"));
    assert_eq!(tx2.amount, -500);
    assert_eq!(tx2.description, String::from_str(&env, "Rent payment"));
}

#[test]
fn test_goals_management() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    env.mock_all_auths();
    
    // Create a goal
    client.create_goal(
        &user,
        &String::from_str(&env, "Vacation"),
        &5000,
        &1672531200 // Jan 1, 2023
    );
    
    // Get and verify goal
    let goals = client.get_goals(&user);
    assert_eq!(goals.len(), 1);
    
    let goal = goals.get(0).unwrap();
    assert_eq!(goal.name, String::from_str(&env, "Vacation"));
    assert_eq!(goal.target_amount, 5000);
    assert_eq!(goal.current_amount, 0);
    assert_eq!(goal.deadline, 1672531200);
    
    // Update goal progress
    client.update_goal_progress(&user, &0, &1000);
    
    // Verify updated goal
    let updated_goals = client.get_goals(&user);
    let updated_goal = updated_goals.get(0).unwrap();
    assert_eq!(updated_goal.current_amount, 1000);
}

#[test]
#[should_panic(expected = "Goal index out of bounds")]
fn test_update_nonexistent_goal() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    env.mock_all_auths();
    
    // Create a goal
    client.create_goal(
        &user,
        &String::from_str(&env, "Vacation"),
        &5000,
        &1672531200
    );
    
    // Try to update a goal with an invalid index (should panic)
    client.update_goal_progress(&user, &999, &1000);
}

#[test]
fn test_calculate_net_worth() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    env.mock_all_auths();
    
    // Add multiple assets
    client.add_asset(
        &user,
        &String::from_str(&env, "cash"),
        &5000,
        &String::from_str(&env, "Savings account")
    );
    
    client.add_asset(
        &user,
        &String::from_str(&env, "stock"),
        &10000,
        &String::from_str(&env, "AAPL shares")
    );
    
    client.add_asset(
        &user,
        &String::from_str(&env, "crypto"),
        &3000,
        &String::from_str(&env, "Bitcoin")
    );
    
    client.add_asset(
        &user,
        &String::from_str(&env, "debt"),
        &-2000,
        &String::from_str(&env, "Credit card")
    );
    
    // Calculate and verify net worth (5000 + 10000 + 3000 - 2000 = 16000)
    let net_worth = client.calculate_net_worth(&user);
    assert_eq!(net_worth, 16000);
}

#[test]
fn test_empty_state() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    // Test empty lists are returned for new user
    let assets = client.get_assets(&user);
    let transactions = client.get_transactions(&user);
    let goals = client.get_goals(&user);
    
    assert_eq!(assets.len(), 0);
    assert_eq!(transactions.len(), 0);
    assert_eq!(goals.len(), 0);
    
    // Net worth should be 0 for new user
    let net_worth = client.calculate_net_worth(&user);
    assert_eq!(net_worth, 0);
}

#[test]
fn test_multiple_users() {
    let env = Env::default();
    let admin = Address::random(&env);
    let user1 = Address::random(&env);
    let user2 = Address::random(&env);
    
    let contract_id = env.register_contract(None, FinanceManager);
    let client = FinanceManagerClient::new(&env, &contract_id);
    
    client.initialize(&admin);
    
    env.mock_all_auths();
    
    // Add assets for user1
    client.add_asset(
        &user1,
        &String::from_str(&env, "cash"),
        &1000,
        &String::from_str(&env, "User1 Savings")
    );
    
    // Add assets for user2
    client.add_asset(
        &user2,
        &String::from_str(&env, "cash"),
        &2000,
        &String::from_str(&env, "User2 Savings")
    );
    
    // Verify each user gets their own assets
    let user1_assets = client.get_assets(&user1);
    let user2_assets = client.get_assets(&user2);
    
    assert_eq!(user1_assets.len(), 1);
    assert_eq!(user2_assets.len(), 1);
    
    let user1_asset = user1_assets.get(0).unwrap();
    let user2_asset = user2_assets.get(0).unwrap();
    
    assert_eq!(user1_asset.amount, 1000);
    assert_eq!(user2_asset.amount, 2000);
    
    // Verify net worth calculations are separate
    let user1_net_worth = client.calculate_net_worth(&user1);
    let user2_net_worth = client.calculate_net_worth(&user2);
    
    assert_eq!(user1_net_worth, 1000);
    assert_eq!(user2_net_worth, 2000);
}
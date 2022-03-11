use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::{any::type_name, env, fmt::Debug, str::FromStr};

// Get environment variable from .env file and parse it to the specified type
pub fn get_env_var<T>(name: &str) -> T
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    let str = env::var(name).expect(&format!("{} must be set", name));
    str.parse::<T>().expect(&format!(
        "Failed to parse environment variable {} into type {}",
        name,
        type_name::<T>(),
    ))
}

pub fn get_current_time() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis()
}

#[derive(Serialize, Deserialize)]
pub struct Response<T> {
    pub r#type: String,
    pub data: T,
}

use anyhow::Error;
use chrono::Utc;
use jsonwebtoken::{decode, encode};
use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::utils;

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: u128,
    pub exp: i64,
    pub iat: i64,
}

pub enum TokenType {
    Access,
    Refresh,
}

pub fn generate_token(token_type: &TokenType, user_uuid: Uuid) -> Result<String, Error> {
    let header = Header::new(Algorithm::HS512);

    let sub = user_uuid.as_u128();
    let iat = Utc::now().timestamp() * 1000;
    let exp = get_valid_for(token_type) + iat;

    let secret = get_secret_key(token_type);
    let claims = Claims { sub, iat, exp };

    let encoding_key = EncodingKey::from_secret(secret.as_ref());
    let token = encode(&header, &claims, &encoding_key)?;

    Ok(token)
}

pub fn validate_token(token_type: &TokenType, token: &str) -> Result<TokenData<Claims>, Error> {
    let secret = get_secret_key(token_type);
    let decoding_key = DecodingKey::from_secret(secret.as_ref());

    let validation = &Validation::new(Algorithm::HS512);
    let token_data = decode::<Claims>(token, &decoding_key, validation)?;

    Ok(token_data)
}

fn get_valid_for(token_type: &TokenType) -> i64 {
    utils::get_env_var::<i64>(match token_type {
        TokenType::Access => "JWT_ACCESS_VALID_FOR",
        TokenType::Refresh => "JWT_REFRESH_VALID_FOR",
    })
}

fn get_secret_key(token_type: &TokenType) -> String {
    utils::get_env_var::<String>(match token_type {
        TokenType::Access => "JWT_ACCESS_SECRET",
        TokenType::Refresh => "JWT_REFRESH_SECRET",
    })
}

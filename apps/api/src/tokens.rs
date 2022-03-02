use anyhow::Error;
use jsonwebtoken::{
    decode, encode, Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use serde::{Deserialize, Serialize};
use sqlx::types::Uuid;

pub enum TokenType {
    AccessToken,
    RefreshToken,
}

#[derive(Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

pub fn generate_token(secret: String, exp: usize, user_id: Uuid) -> Result<String, Error> {
    let claims = Claims {
        sub: user_id.as_u128().to_string(),
        exp,
    };

    let encoding_key = EncodingKey::from_secret(secret.as_ref());
    let header = &Header::new(Algorithm::HS512);
    let token = encode(&header, &claims, &encoding_key)?;

    Ok(token)
}

pub fn validate_token(secret: String, token: &str) -> Result<TokenData<Claims>, Error> {
    let decoding_key = DecodingKey::from_secret(secret.as_ref());
    let token_data = decode::<Claims>(token, &decoding_key, &Validation::default())?;

    Ok(token_data)
}

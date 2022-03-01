use jwt_simple::prelude::*;

pub enum TokenType {
    AccessToken,
    RefreshToken,
}

pub fn generate_token(token_type: TokenType) -> Result<String, jwt_simple::Error> {
    // Get private pem and create claims
    let (private_pem, claims) = match token_type {
        TokenType::AccessToken => (
            dotenv!("JWT_ACCESS_TOKEN_PRIVATE_KEY"),
            Claims::create(Duration::from_mins(2)),
        ),
        TokenType::RefreshToken => (
            dotenv!("JWT_REFRESH_TOKEN_PRIVATE_KEY"),
            Claims::create(Duration::from_days(7)),
        ),
    };

    // Get key pair and generate token
    let key_pair = RS384KeyPair::from_pem(private_pem)?;
    let token = key_pair.sign(claims)?;

    Ok(token)
}

pub fn verify_token(
    token_type: TokenType,
    token: &str,
) -> Result<JWTClaims<NoCustomClaims>, jwt_simple::Error> {
    // Get public key from the env file
    let public_key = RS384PublicKey::from_pem(match token_type {
        TokenType::AccessToken => dotenv!("JWT_ACCESS_TOKEN_PUBLIC_KEY"),
        TokenType::RefreshToken => dotenv!("JWT_REFRESH_TOKEN_PUBLIC_KEY"),
    })?;

    // Verify access token
    let claims = public_key.verify_token::<NoCustomClaims>(token, None)?;

    Ok(claims)
}

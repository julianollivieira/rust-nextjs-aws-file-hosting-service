use axum::extract::TypedHeader;
use axum::headers::Cookie;
use axum::http::StatusCode;

use crate::tokens::validate_token;
use crate::utils::get_env_var;

pub async fn token(
    TypedHeader(cookie): TypedHeader<Cookie>,
) -> Result<String, (StatusCode, String)> {
    let refresh_token_cookie = cookie.get("refresh_token").unwrap();

    let refresh_secret = get_env_var::<String>("JWT_REFRESH_SECRET");
    let decoded = validate_token(refresh_secret, refresh_token_cookie).unwrap();

    let a = decoded.claims;
    let b = a.sub;

    Ok(b.to_string())
}

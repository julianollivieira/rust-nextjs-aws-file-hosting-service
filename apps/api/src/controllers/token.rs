use axum::extract::TypedHeader;
use axum::headers::Cookie;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use uuid::Uuid;

use crate::tokens::{generate_token, validate_token, TokenType};
use crate::utils::Response;

pub async fn token(TypedHeader(cookie): TypedHeader<Cookie>) -> impl IntoResponse {
    let refresh_token_cookie = cookie.get("refresh_token").unwrap();
    let decoded = validate_token(&TokenType::Refresh, refresh_token_cookie).unwrap();

    let user_id = decoded.claims.sub;
    let uuid = Uuid::from_u128(user_id);
    let access_token = generate_token(&TokenType::Access, uuid).unwrap();

    (
        StatusCode::OK,
        serde_json::to_string(&Response {
            r#type: "success".to_string(),
            data: access_token,
        })
        .unwrap(),
    )
}

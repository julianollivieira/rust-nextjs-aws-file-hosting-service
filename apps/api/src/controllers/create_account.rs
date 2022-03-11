use crate::models::User;
use crate::utils::Response;
use anyhow::Error;
use axum::extract::{Extension, Json};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use rand::Rng;
use serde::Deserialize;
use sqlx::postgres::PgPool;

#[derive(Deserialize, Debug)]
pub struct Input {
    email: String,
    password: String,
}

pub async fn create_account(
    Json(input): Json<Input>,
    Extension(pool): Extension<PgPool>,
) -> impl IntoResponse {
    let (salt, hash) = generate_password_hash_and_salt(input.password).unwrap();
    let new_user_uuid_result = User::new(&pool, input.email, hash, salt.to_vec()).await;

    match new_user_uuid_result {
        Ok(uuid) => (
            StatusCode::OK,
            serde_json::to_string(&Response {
                r#type: "success".to_string(),
                data: &format!("Account created with id {}", uuid.as_u128().to_string()),
            })
            .unwrap(),
        ),
        Err(_) => (
            StatusCode::BAD_REQUEST,
            serde_json::to_string(&Response {
                r#type: "success".to_string(),
                data: "Account already exists".to_string(),
            })
            .unwrap(),
        ),
    }
}

fn generate_password_hash_and_salt(password: String) -> Result<([u8; 16], String), Error> {
    let argon_config = &argon2::Config::default();
    let salt = rand::thread_rng().gen::<[u8; 16]>();
    let hash = argon2::hash_encoded(password.as_bytes(), &salt, argon_config)?;

    Ok((salt, hash))
}

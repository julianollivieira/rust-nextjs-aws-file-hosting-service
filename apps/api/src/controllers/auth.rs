use axum::{
    extract::{Extension, Json},
    http::StatusCode,
};
use rand::Rng;
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgPool;

#[derive(Deserialize, Debug)]
pub struct Input {
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
pub struct Response<T> {
    r#type: String,
    message: T,
}

pub async fn create_account(
    Json(input): Json<Input>,
    Extension(pool): Extension<PgPool>,
) -> Result<String, (StatusCode, String)> {
    // Generate password salt and hash
    let argon_config = &argon2::Config::default();
    let password_salt: &[u8] = &rand::thread_rng().gen::<[u8; 16]>();
    let password_hash =
        argon2::hash_encoded(input.password.as_bytes(), password_salt, argon_config).unwrap();

    // Insert new user
    let data = sqlx::query!(
        "INSERT INTO users (email, password_hash, password_salt) VALUES ($1, $2, $3)",
        input.email,
        password_hash,
        password_salt
    )
    .execute(&pool)
    .await;

    // Return response
    match data {
        Ok(_) => Ok(serde_json::to_string(&Response {
            r#type: "success".to_string(),
            message: "Account created".to_string(),
        })
        .unwrap()),
        Err(_) => Err((
            StatusCode::BAD_REQUEST,
            serde_json::to_string(&Response {
                r#type: "error".to_string(),
                message: "Account already exists".to_string(),
            })
            .unwrap(),
        )),
    }
}

pub async fn sign_in(Extension(pool): Extension<PgPool>) -> Result<String, (StatusCode, String)> {
    Ok("".to_string())
}

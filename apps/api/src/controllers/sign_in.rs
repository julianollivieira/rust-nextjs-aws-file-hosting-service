use crate::models::User;
use crate::utils::response;
use axum::extract::{Extension, Json};
use axum::http::StatusCode;
use serde::Deserialize;
use sqlx::postgres::PgPool;

#[derive(Deserialize, Debug)]
pub struct Input {
    email: String,
    password: String,
}

pub async fn sign_in(
    Json(input): Json<Input>,
    Extension(pool): Extension<PgPool>,
) -> Result<String, (StatusCode, String)> {
    let user_result = User::get_by_email(&pool, input.email).await;

    match user_result {
        Ok(user) => {
            let matches = argon2::verify_encoded(&user.password_hash, input.password.as_bytes());
            match matches {
                Ok(_) => Ok(response("success", &serde_json::to_string(&user).unwrap())),
                Err(_) => Err((
                    StatusCode::BAD_REQUEST,
                    response("error", "Invalid credentials"),
                )),
            }
        }
        Err(_) => Err((
            StatusCode::BAD_REQUEST,
            response("error", "Invalid credentials"),
        )),
    }
}

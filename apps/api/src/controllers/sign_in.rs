use crate::models::User;
use crate::tokens::generate_token;
use crate::utils::{get_current_time, get_env_var, response};
use anyhow::{anyhow, Error};
use axum::extract::{Extension, Json};
use axum::http::StatusCode;
use serde::Deserialize;
use sqlx::postgres::PgPool;
use sqlx::{Pool, Postgres};

#[derive(Deserialize, Debug)]
pub struct Input {
    email: String,
    password: String,
}

pub async fn sign_in(
    Json(input): Json<Input>,
    Extension(pool): Extension<PgPool>,
) -> Result<String, (StatusCode, String)> {
    match verify_credentials(&pool, input.email, input.password.as_bytes()).await {
        Ok(user) => {
            let refresh_secret = get_env_var::<String>("JWT_REFRESH_SECRET");
            let refresh_token = generate_token(refresh_secret, 1, user.id).unwrap();

            let access_secret = get_env_var::<String>("JWT_ACCESS_SECRET");
            let access_token = generate_token(access_secret, 1, user.id).unwrap();

            return Ok(response("", &refresh_token));

            // TODO: return refresh token as httpOnly cookie and access token in body?
            // TODO: create elegant function for generating access and refresh tokens?
        }
        Err(_) => {}
    }
    Ok("".to_string())
}

pub async fn verify_credentials(
    pool: &Pool<Postgres>,
    email: String,
    password: &[u8],
) -> Result<User, Error> {
    let user = User::get_by_email(&pool, email).await?;
    let matches = argon2::verify_encoded(&user.password_hash, password)?;
    if !matches {
        return Err(anyhow!("Email or password incorrect"));
    }
    Ok(user)
}

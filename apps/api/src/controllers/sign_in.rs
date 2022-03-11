use crate::models::User;
use crate::tokens::generate_token;
use crate::utils::get_env_var;
use crate::utils::Response;
use anyhow::{anyhow, Error};
use axum::extract::{Extension, Json};
use axum::http::{self, HeaderMap};
use axum::response::IntoResponse;
use chrono::{Duration, Utc};
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgPool;
use sqlx::{Pool, Postgres};

#[derive(Deserialize, Debug)]
pub struct Input {
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
pub struct DataUser {
    user: UserOnlyMailAndId,
    access_token: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserOnlyMailAndId {
    email: String,
    id: String,
}

pub async fn sign_in(
    Json(input): Json<Input>,
    Extension(pool): Extension<PgPool>,
) -> impl IntoResponse {
    match verify_credentials(&pool, input.email, input.password.as_bytes()).await {
        Ok(user) => {
            let refresh_secret = get_env_var::<String>("JWT_REFRESH_SECRET");
            let refresh_token = generate_token(refresh_secret, 1, user.id).unwrap();

            let access_secret = get_env_var::<String>("JWT_ACCESS_SECRET");
            let access_token = generate_token(access_secret, 1, user.id).unwrap();

            let cookie_expires_on = (Utc::now() + Duration::days(30)).format("%a, %d %b %Y %T %Z");

            let mut headers = HeaderMap::new();
            let cookie_value = format!(
                "refresh_token={}; Expires={}; SameSite=Strict; Secure; HttpOnly",
                refresh_token, cookie_expires_on
            );
            headers.insert("Set-Cookie", cookie_value.parse().unwrap());

            let body = serde_json::to_string(&Response {
                r#type: "success".to_string(),
                data: DataUser {
                    user: UserOnlyMailAndId {
                        email: user.email,
                        id: user.id.to_string(),
                    },
                    access_token,
                },
            })
            .unwrap();

            (http::StatusCode::OK, headers, body)
        }
        Err(_) => (
            http::StatusCode::OK,
            HeaderMap::new(),
            serde_json::to_string(&Response {
                r#type: "error".to_string(),
                data: "Nah this ain't it".to_string(),
            })
            .unwrap(),
        ),
    }
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

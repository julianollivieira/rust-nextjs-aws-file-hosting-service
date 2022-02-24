use axum::{
    extract::{Extension, Json},
    http::StatusCode,
};
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
) -> Result<String, (StatusCode, String)> {
    //
}

pub async fn sign_in(Extension(pool): Extension<PgPool>) -> Result<String, (StatusCode, String)> {
    //
}

use anyhow::Error;
use serde::Serialize;
use sqlx::types::chrono::NaiveDateTime;
use sqlx::types::Uuid;
use sqlx::{Pool, Postgres};

#[derive(Serialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password_hash: String,
    pub password_salt: Vec<u8>,
    pub created_at: NaiveDateTime,
}

impl User {
    pub async fn new(
        pool: &Pool<Postgres>,
        email: String,
        password_hash: String,
        password_salt: Vec<u8>,
    ) -> Result<Uuid, Error> {
        Ok(sqlx::query!(
            "INSERT INTO users (email, password_hash, password_salt) VALUES ($1, $2, $3) RETURNING id",
            email,
            password_hash,
            password_salt
        )
        .fetch_one(pool)
        .await?
        .id)
    }
    pub async fn get_by_email(pool: &Pool<Postgres>, email: String) -> Result<User, Error> {
        Ok(
            sqlx::query_as!(User, "SELECT * FROM users WHERE email = $1", email)
                .fetch_one(pool)
                .await?,
        )
    }
}

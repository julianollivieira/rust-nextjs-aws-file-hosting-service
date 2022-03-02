mod controllers;
mod models;
mod tokens;
mod utils;

use anyhow::Error;
use axum::extract::Extension;
use axum::http::{header, HeaderValue, Method};
use axum::routing::post;
use axum::Router;
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use sqlx::{Pool, Postgres};
use tower_http::cors::{CorsLayer, Origin};

#[tokio::main]
async fn main() {
    dotenv().ok();

    let db_pool = init_db_conn_pool().await.unwrap();
    let cors_layer = create_cors_layer();
    let router = init_router(db_pool, cors_layer);

    let api_port = utils::get_env_var::<String>("API_PORT");
    let socket_addr = format!("0.0.0.0:{}", api_port).parse().unwrap();

    axum::Server::bind(&socket_addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

async fn init_db_conn_pool() -> Result<Pool<Postgres>, Error> {
    let connection_string = utils::get_env_var::<String>("DATABASE_URL");
    let database_max_connections = utils::get_env_var::<u32>("DATABASE_MAX_CONNECTIONS");

    Ok(PgPoolOptions::new()
        .max_connections(database_max_connections)
        .connect(&connection_string)
        .await?)
}

fn create_cors_layer() -> CorsLayer {
    let app_url = utils::get_env_var::<HeaderValue>("APP_URL");

    CorsLayer::new()
        .allow_origin(Origin::exact(app_url))
        .allow_methods(vec![Method::POST, Method::OPTIONS])
        .allow_headers(vec![header::CONTENT_TYPE])
}

fn init_router(db_pool: Pool<Postgres>, cors_layer: CorsLayer) -> Router {
    Router::new()
        .route("/create-account", post(controllers::create_account))
        .route("/sign-in", post(controllers::sign_in))
        .layer(Extension(db_pool))
        .layer(cors_layer)
}

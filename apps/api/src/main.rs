#![forbid(unsafe_code)]

#[macro_use]
extern crate dotenv_codegen;

use axum::{
    http::{header, Method},
    AddExtensionLayer, Router,
};
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::{CorsLayer, Origin};

#[tokio::main]
async fn main() {
    // Initialize connection pool
    let pool = PgPoolOptions::new()
        .max_connections(dotenv!("DATABASE_MAX_CONNECTIONS").parse().unwrap())
        .connect(dotenv!("DATABASE_URL"))
        .await
        .unwrap();

    // Create CORS layer
    let cors = CorsLayer::new()
        .allow_origin(Origin::exact(dotenv!("APP_URL").parse().unwrap()))
        .allow_methods(vec![Method::POST, Method::OPTIONS])
        .allow_headers(vec![header::CONTENT_TYPE]);

    // Initialize app with routes and CORS configuration
    let app = Router::new()
        .layer(AddExtensionLayer::new(pool))
        .layer(cors);

    // Start the web server
    let addr = &"0.0.0.0:2000".parse().unwrap();
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

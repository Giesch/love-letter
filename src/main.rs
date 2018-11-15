extern crate actix_web;
#[macro_use] extern crate serde_derive;

use actix_web::server;
use std::env;

mod app;
use app::build_app;

fn main() {
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    println!("starting up on port {}", port);

    server::new(build_app)
        .bind(format!("0.0.0.0:{}", port))
        .unwrap_or_else(|_| panic!("failed to bind to port: {}", port))
        .run();
}

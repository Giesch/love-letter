extern crate actix_web;

use actix_web::http::{Method, StatusCode};
use actix_web::{server, App, HttpRequest, HttpResponse};
use std::env;

fn index(_req: HttpRequest) -> HttpResponse {
    let index_html = include_str!("../love-letter-ui/dist/index.html");
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(index_html)
}

fn bundle(_req: HttpRequest) -> &'static str {
    include_str!("../love-letter-ui/dist/bundle.js")
}

fn sourcemap(_req: HttpRequest) -> &'static str {
    include_str!("../love-letter-ui/dist/bundle.js.map")
}

fn build_app() -> App {
    App::new()
        .resource("/bundle.js", |r| r.method(Method::GET).with(bundle))
        // TODO: disable in prod
        .resource("/bundle.js.map", |r| r.method(Method::GET).with(sourcemap))
        .default_resource(|r| r.method(Method::GET).with(index))
}

fn main() {
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    println!("starting up on port {}", port);

    server::new(build_app)
        .bind(format!("0.0.0.0:{}", port))
        .unwrap_or_else(|_| panic!("failed to bind to port: {}", port))
        .run();
}

extern crate actix_web;

use actix_web::http::{Method, StatusCode};
use actix_web::{server, App, HttpRequest, HttpResponse, Responder};

fn index(_req: HttpRequest) -> HttpResponse {
    let index_html = include_str!("../love-letter-ui/dist/index.html");
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(index_html)
}

fn bundle(_req: HttpRequest) -> impl Responder {
    let bundle_js = include_str!("../love-letter-ui/dist/bundle.js");
    bundle_js
}

fn main() {
    println!("starting up on port 3000");

    server::new(|| {
        App::new()
            .resource("/", |r| r.method(Method::GET).with(index))
            .resource("/bundle.js", |r| r.method(Method::GET).with(bundle))
    }).bind("0.0.0.0:3000")
    .unwrap()
    .run();
}

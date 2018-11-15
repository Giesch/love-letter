extern crate actix_web;

use actix_web::http::{Method, StatusCode};
use actix_web::{App, HttpRequest, HttpResponse, Json};

pub fn index(_req: HttpRequest) -> HttpResponse {
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

type Username = String;

#[derive(Debug, Serialize, Deserialize)]
struct Room {
    name: String,
    players: Vec<Username>,
}

fn get_rooms(_req: HttpRequest) -> Json<Vec<Room>> {
    let r1 = Room {
        name: "First Room".to_string(),
        players: vec!["user A".to_string(), "user B".to_string()],
    };
    let r2 = Room {
        name: "Second Room".to_string(),
        players: vec!["user C".to_string(), "user D".to_string()],
    };

    Json(vec![r1, r2])
}

pub fn build_app() -> App {
    App::new()
        .resource("/rooms", |r| r.method(Method::GET).with(get_rooms))
        .resource("/bundle.js", |r| r.method(Method::GET).with(bundle))
        // TODO: disable in prod
        .resource("/bundle.js.map", |r| r.method(Method::GET).with(sourcemap))
        .default_resource(|r| r.method(Method::GET).with(index))
}

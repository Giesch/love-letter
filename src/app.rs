use actix_web;

use actix_web::http::Method;
use actix_web::middleware::Logger;
use actix_web::{App, HttpRequest, HttpResponse, Json, State};

mod rooms;
use self::rooms::{CreateRoomRequest, Room};

mod app_state;
use self::app_state::AppState;

pub fn index(_req: HttpRequest<AppState>) -> HttpResponse {
    let index_html = include_str!("../love-letter-ui/dist/index.html");
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(index_html)
}

fn styles(_req: HttpRequest<AppState>) -> HttpResponse {
    let styles_css = include_str!("../love-letter-ui/dist/llstyles.css");
    HttpResponse::Ok()
        .content_type("text/css; charset=utf-8")
        .body(styles_css)
}

fn bundle(_req: HttpRequest<AppState>) -> HttpResponse {
    let js = include_str!("../love-letter-ui/dist/bundle.js");
    HttpResponse::Ok()
        .content_type("text/javascript; charset=utf-8")
        .body(js)
}

fn js_sourcemap(_req: HttpRequest<AppState>) -> &'static str {
    include_str!("../love-letter-ui/dist/bundle.js.map")
}

fn css_sourcemap(_req: HttpRequest<AppState>) -> &'static str {
    include_str!("../love-letter-ui/dist/llstyles.css.map")
}

fn list_rooms(req: HttpRequest<AppState>) -> Json<Vec<Room>> {
    let rooms = req.state().open_rooms();
    Json(rooms)
}

fn create_room((request, state): (Json<CreateRoomRequest>, State<AppState>)) -> Json<Room> {
    let room = state.create_room(request.into_inner());
    Json(room)
}

pub fn build_app() -> App<AppState> {
    App::with_state(AppState::new())
        .middleware(Logger::default())
        .resource("/bundle.js", |r| r.method(Method::GET).with(bundle))
        .resource("/llstyles.css", |r| r.method(Method::GET).with(styles))
        .resource("/bundle.js.map", |r| {
            r.method(Method::GET).with(js_sourcemap)
        })
        .resource("/llstyles.css.map", |r| {
            r.method(Method::GET).with(css_sourcemap)
        })
        .default_resource(|r| r.method(Method::GET).with(index))
        .resource("/rooms", |r| {
            r.method(Method::GET).with(list_rooms);
            r.method(Method::POST).with(create_room);
        })
}

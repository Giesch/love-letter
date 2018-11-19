extern crate actix_web;
extern crate futures;

use actix_web::http::{Method, StatusCode};
use actix_web::middleware::Logger;
use actix_web::{App, HttpRequest, HttpResponse, Json, State};

mod rooms;
use self::rooms::RoomsApi;
use self::rooms::{InitialRoom, Room};

mod app_state;
use self::app_state::AppState;

pub fn index(_req: HttpRequest<AppState>) -> HttpResponse {
    let index_html = include_str!("../../love-letter-ui/dist/index.html");
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(index_html)
}

fn bundle(_req: HttpRequest<AppState>) -> &'static str {
    include_str!("../../love-letter-ui/dist/bundle.js")
}

fn sourcemap(_req: HttpRequest<AppState>) -> &'static str {
    include_str!("../../love-letter-ui/dist/bundle.js.map")
}

fn get_rooms(req: HttpRequest<AppState>) -> Json<Vec<Room>> {
    let rooms = req.state().open_rooms();
    Json(rooms)
}

fn create_room((request, state): (Json<InitialRoom>, State<AppState>)) -> Json<Room> {
    let room = state.create_room(request.into_inner());
    Json(room)
}

pub fn build_app() -> App<AppState> {
    App::with_state(AppState::new_fake())
        .middleware(Logger::default())
        .resource("/bundle.js", |r| r.method(Method::GET).with(bundle))
        .resource("/bundle.js.map", |r| r.method(Method::GET).with(sourcemap))
        .default_resource(|r| r.method(Method::GET).with(index))
        .resource("/rooms", |r| {
            r.method(Method::GET).with(get_rooms);
            r.method(Method::POST).with(create_room);
        })
}

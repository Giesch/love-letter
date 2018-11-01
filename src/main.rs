extern crate actix_web;

use actix_web::{fs, server, App};

fn main() {
    server::new(|| {
        App::new().handler(
            "/",
            fs::StaticFiles::new("./love-letter-ui/dist")
                .unwrap()
                .show_files_listing()
                .index_file("index.html"),
        )
    }).bind("127.0.0.1:8888")
    .unwrap()
    .run();
}

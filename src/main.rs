extern crate actix_web;

use actix_web::{fs, server, App};

fn main() {
    println!("starting up on port 3000");

    server::new(|| {
        App::new().handler(
            "/",
            fs::StaticFiles::new("./love-letter-ui/dist")
                .unwrap()
                .show_files_listing()
                .index_file("index.html"),
        )
    }).bind("0.0.0.0:3000")
    .unwrap()
    .run();
}

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use crate::app::rooms::Room;

pub struct AppState {
    pub open_rooms: Arc<Mutex<HashMap<String, Room>>>,
}

impl AppState {
    pub fn new() -> AppState {
        let open_rooms = Arc::new(Mutex::new(HashMap::new()));
        AppState { open_rooms }
    }
}

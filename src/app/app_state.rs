use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;
use std::sync::{Arc, Mutex};

use app::rooms::Room;

pub struct AppState {
    pub open_rooms: Arc<Mutex<HashMap<String, Room>>>,
}

impl AppState {
    pub fn new() -> AppState {
        let open_rooms = Arc::new(Mutex::new(HashMap::new()));
        AppState { open_rooms }
    }

    pub fn new_fake() -> AppState {
        let r1 = Room {
            id: "one".to_string(),
            name: "First Room".to_string(),
            players: HashSet::from_iter(vec!["user A".to_string(), "user B".to_string()]),
        };

        let r2 = Room {
            id: "two".to_string(),
            name: "Second Room".to_string(),
            players: HashSet::from_iter(vec!["user C".to_string(), "user D".to_string()]),
        };

        let mut open_rooms = HashMap::new();
        open_rooms.insert("one".to_string(), r1);
        open_rooms.insert("two".to_string(), r2);
        let open_rooms = Arc::new(Mutex::new(open_rooms));

        AppState { open_rooms }
    }
}

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use crate::app::rooms::{CreateRoomRequest, Room};

pub struct AppState {
    pub open_rooms: Arc<Mutex<HashMap<String, Room>>>,
}

impl AppState {
    pub fn new() -> AppState {
        let open_rooms = Arc::new(Mutex::new(HashMap::new()));
        AppState { open_rooms }
    }

    pub fn open_rooms(&self) -> Vec<Room> {
        let rooms = self.open_rooms.lock().unwrap();
        (*rooms).values().map(Room::clone).collect()
    }

    pub fn create_room(&self, req: CreateRoomRequest) -> Room {
        let room = Room::new(req);
        let mut rooms = self.open_rooms.lock().unwrap();
        (*rooms).insert(room.id.clone(), room.clone());

        room
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_and_read_room() {
        let state = AppState::new();
        assert_eq!(Vec::<Room>::new(), state.open_rooms());

        let request = CreateRoomRequest {
            name: "example".to_string(),
            player: "somebody".to_string(),
            passphrase: None,
        };

        state.create_room(request);

        let result = state.open_rooms();
        assert_eq!(1, result.len());
        let room = result.get(0).unwrap();
        assert_eq!("example", room.name);
        assert_eq!(Some(&"somebody".to_string()), room.players.iter().next());
    }
}

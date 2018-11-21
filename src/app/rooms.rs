use app::app_state::AppState;
use std::collections::HashSet;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Room {
    pub id: String,
    pub name: String,
    pub players: HashSet<String>, // TODO: ids? usernames? both?
}

impl Room {
    pub fn new(room: InitialRoom) -> Room {
        let mut players = HashSet::new();
        players.insert(room.player);
        Room {
            id: Uuid::new_v4().to_string(),
            name: room.name,
            players,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct InitialRoom {
    pub name: String,
    pub player: String,
}

pub trait RoomsApi {
    fn open_rooms(&self) -> Vec<Room>;
    fn create_room(&self, room: InitialRoom) -> Room;
    fn delete_room(&self, room_id: &str) -> bool;
}

impl RoomsApi for AppState {
    fn open_rooms(&self) -> Vec<Room> {
        let rooms = self.open_rooms.lock().unwrap();
        (*rooms).values().map(Room::clone).collect()
    }

    fn create_room(&self, room: InitialRoom) -> Room {
        let room = Room::new(room);
        let mut rooms = self.open_rooms.lock().unwrap();
        (*rooms).insert(room.id.clone(), room.clone());

        room
    }

    fn delete_room(&self, room_id: &str) -> bool {
        let mut rooms = self.open_rooms.lock().unwrap();
        (*rooms).remove(room_id).is_some()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_and_read_room() {
        let state = AppState::new();
        assert_eq!(Vec::<Room>::new(), state.open_rooms());

        let request = InitialRoom {
            name: "example".to_string(),
            player: "somebody".to_string(),
        };

        state.create_room(request);

        let result = state.open_rooms();
        assert_eq!(1, result.len());
        let room = result.get(0).unwrap();
        assert_eq!("example", room.name);
        assert_eq!(Some(&"somebody".to_string()), room.players.iter().next());
    }

    #[test]
    fn create_and_delete_room() {
        let state = AppState::new();
        let request = InitialRoom {
            name: "example".to_string(),
            player: "somebody".to_string(),
        };

        state.create_room(request);

        let result = state.open_rooms();
        assert_eq!(1, result.len());

        let room = result.get(0).unwrap();
        assert_eq!("example", room.name);

        let target_id = &room.id;

        let deleted = state.delete_room(target_id);
        assert!(deleted);

        let result = state.open_rooms();
        assert!(result.is_empty())
    }
}

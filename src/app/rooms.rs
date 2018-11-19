use app::app_state::AppState;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Room {
    pub id: String,
    pub name: String,
    pub players: Vec<String>, // TODO: ids? usernames? both?
}

impl Room {
    pub fn new(room: InitialRoom) -> Room {
        Room {
            id: Uuid::new_v4().to_string(),
            name: room.name,
            players: vec![room.player],
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
}

impl RoomsApi for AppState {
    fn open_rooms(&self) -> Vec<Room> {
        let rooms = self.open_rooms.lock().unwrap();
        (*rooms).values().map(Room::clone).collect()
    }

    fn create_room(&self, room: InitialRoom) -> Room {
        let room = Room::new(room);
        let mut rooms = self.open_rooms.lock().unwrap();
        // much clone wow
        (*rooms).insert(room.id.clone(), room.clone());

        room
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_and_read_room() {
        let mut state = AppState::new();
        assert_eq!(Vec::<Room>::new(), state.open_rooms());

        let request = InitialRoom {
            name: "example".to_string(),
            player: "somebody".to_string(),
        };

        state.create_room(request);

        let result: Vec<Room> = state.open_rooms();
        assert_eq!(1, result.len());
        let room = result.get(0).unwrap();
        assert_eq!("example", room.name);
        assert_eq!("somebody", room.players.get(0).unwrap());
    }
}

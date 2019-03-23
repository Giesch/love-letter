use std::collections::HashSet;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Room {
    pub id: String,
    pub name: String,
    pub players: HashSet<String>, // TODO: ids? usernames? both?
}

impl Room {
    pub fn new(room: CreateRoomRequest) -> Room {
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
pub struct CreateRoomRequest {
    pub name: String,
    pub player: String,
    pub passphrase: Option<String>,
}

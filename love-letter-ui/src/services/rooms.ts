import { map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { Room } from "../store/lobby/types";
import { Observable } from "rxjs";

export interface RoomService {
  getRooms(): Observable<Room[]>;
}

export const roomService: RoomService = {
  getRooms: () => ajax.getJSON('/rooms').pipe(
    map(response => response as Room[])
  )
};

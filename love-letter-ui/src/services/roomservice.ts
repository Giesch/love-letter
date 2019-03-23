import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { CreateRoomRequest, Room } from "../store/lobby/types";

const HEADERS = { "Content-Type": "application/json" };

export interface RoomService {
  getRooms(): Observable<Room[]>;
  createRoom(req: CreateRoomRequest): Observable<Room>;
}

const getRooms = () =>
  ajax.getJSON("/rooms").pipe(map(response => response as Room[]));

const createRoom = (req: CreateRoomRequest) => {
  return ajax.post("/rooms", req, HEADERS).pipe(
    map(resp => {
      if (isSuccessful(resp)) {
        return resp.response as Room;
      } else {
        throw new Error(resp.response);
      }
    })
  );
};

const isSuccessful = (resp: AjaxResponse) =>
  resp.status >= 200 && resp.status < 300;

export const roomService: RoomService = {
  getRooms,
  createRoom
};

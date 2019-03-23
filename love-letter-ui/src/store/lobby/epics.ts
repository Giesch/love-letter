import { Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { ApplicationState } from "..";
import { Services } from "../../services";
import { createRoom, fetchRooms, LobbyAction } from "./actions";

export type LobbyEpic = Epic<
  LobbyAction,
  LobbyAction,
  ApplicationState,
  Services
>;

export const fetchRoomsFlow: LobbyEpic = (action$, _store, { roomService }) =>
  action$.pipe(
    filter(isActionOf(fetchRooms.request)),
    mergeMap(_action =>
      roomService.getRooms().pipe(
        map(rooms => fetchRooms.success(rooms)),
        catchError(error => of(fetchRooms.failure(error.xhr.response)))
      )
    )
  );

export const createRoomFlow: LobbyEpic = (action$, _store, { roomService }) =>
  action$.pipe(
    filter(isActionOf(createRoom.request)),
    mergeMap(action =>
      roomService.createRoom(action.payload).pipe(
        map(room => createRoom.success(room)),
        catchError(error => of(createRoom.failure(error)))
      )
    )
  );

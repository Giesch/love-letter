import { fetchRooms } from './actions';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { AppEpic } from '..';
import { LobbyActionTypes, Room } from './types';

export const fetchRoomsFlow: AppEpic = (action$, store, { roomService }) =>
  action$.pipe(
    ofType(LobbyActionTypes.FETCH_ROOMS_REQUEST),
    mergeMap(action => roomService.getRooms().pipe(
      map(rooms => fetchRooms.success(rooms)),
      catchError(error => of(
        fetchRooms.failure(error.xhr.response)
      ))
    ))
  );

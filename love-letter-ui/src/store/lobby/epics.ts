import { fetchRooms } from './actions';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { AppEpic } from '..';
import { LobbyActionTypes, Room } from './types';

export const fetchRoomsFlow: AppEpic = (action$, store, { roomsApi }) =>
  action$.pipe(
    ofType(LobbyActionTypes.FETCH_ROOMS_REQUEST),
    mergeMap(action => ajax.getJSON('/rooms').pipe( // TODO: extract to roomsApi
      map(response => fetchRooms.success(response as Room[])), // TODO: fix this?
      catchError(error => of(
        fetchRooms.failure(error.xhr.response) // xhr wat
      ))
    ))
  );

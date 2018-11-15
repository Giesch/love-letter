import { RoomService, roomService } from "./rooms";

export interface Services {
  roomService: RoomService;
}

export const services: Services = {
  roomService
};

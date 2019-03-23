import { RoomService, roomService } from "./roomservice";

export interface Services {
  roomService: RoomService;
}

export const services: Services = {
  roomService
};

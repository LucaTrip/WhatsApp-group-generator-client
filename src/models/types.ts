import { Socket } from "socket.io-client";
import { IFavouriteMember, IKrossReservationUser } from "./models";

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

/* Types for GlobalContext */
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  AddFavouriteUsers = "ADD_FAVOURITE_USERS",
  AddSelectedGuest = "ADD_SELECTED_GUEST",
  OnSetSocketConnected = "ON_SET_SOCKET_CONNECTED",
  OnSetWaQrCode = "ON_SET_WA_QR_CODE",
  OnWaUserLogged = "ON_WA_USER_LOGGED",
  OnSetIsLoadingGroupCreation = "ON_SET_IS_LOADING_GROUP_CREATION",
}

export type StateType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  favouriteUsers: IFavouriteMember[];
  socketConnected: boolean;
  waQrCode: string;
  isLoadingGroupCreation: boolean;
  waUserLogged?: boolean;
  selectedGuest?: IKrossReservationUser;
};
/**************************/

export enum ELocalStoragekeys {
  FAVOURITE_MEMBERS = "FAVOURITE_MEMBERS",
}

export enum SocketEmitEvents {
  "wa_create_group" = "wa_create_group",
}

export enum SocketListenEvents {
  "connect" = "connect",
  "disconnect" = "disconnect",
  "wa_ready" = "wa_ready",
  "wa_qrcode" = "wa_qrcode",
  "wa_authenticated" = "wa_authenticated",
  "wa_group_created" = "wa_group_created",
}

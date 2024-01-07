import { ReactElement, createContext, useCallback, useReducer } from "react";
import { ActionMap, StateType, Types } from "../models/types";
import { IFavouriteMember, IKrossReservationUser } from "../models/models";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/utils";

const initState: StateType = {
  socket: io(BASE_URL),
  favouriteUsers: [],
  socketConnected: false,
  waQrCode: "",
  isLoadingGroupCreation: false,
  waUserLogged: undefined,
  selectedGuest: undefined,
};

type GlobalPayload = {
  [Types.AddFavouriteUsers]: IFavouriteMember[];
  [Types.AddSelectedGuest]: IKrossReservationUser;
  [Types.OnSetSocketConnected]: boolean;
  [Types.OnSetWaQrCode]: string;
  [Types.OnWaUserLogged]: boolean;
  [Types.OnSetIsLoadingGroupCreation]: boolean;
};

type ReducerAction = ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>];

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case Types.AddFavouriteUsers:
      return {
        ...state,
        favouriteUsers: action.payload,
      };

    case Types.AddSelectedGuest:
      return { ...state, selectedGuest: action.payload };

    case Types.OnSetSocketConnected:
      return { ...state, socketConnected: action.payload };

    case Types.OnSetWaQrCode:
      return { ...state, waQrCode: action.payload };

    case Types.OnWaUserLogged:
      return { ...state, waUserLogged: action.payload };

    case Types.OnSetIsLoadingGroupCreation:
      return { ...state, isLoadingGroupCreation: action.payload };

    default:
      throw new Error();
  }
};

const useGlobalContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const onAddFavouriteUsers = useCallback(
    (usersList: IFavouriteMember[]) =>
      dispatch({
        type: Types.AddFavouriteUsers,
        payload: usersList,
      }),
    []
  );

  const onSelectedGuest = useCallback(
    (guest: IKrossReservationUser) =>
      dispatch({ type: Types.AddSelectedGuest, payload: guest }),
    []
  );

  const onSetSocketConnected = useCallback(
    (status: boolean) =>
      dispatch({ type: Types.OnSetSocketConnected, payload: status }),
    []
  );

  const onSetWaQrCode = useCallback(
    (qrcode: string) =>
      dispatch({ type: Types.OnSetWaQrCode, payload: qrcode }),
    []
  );

  const onWaUserLogged = useCallback(
    (status: boolean) =>
      dispatch({ type: Types.OnWaUserLogged, payload: status }),
    []
  );

  const onSetIsLoadingGroupCreation = useCallback(
    (status: boolean) =>
      dispatch({ type: Types.OnSetIsLoadingGroupCreation, payload: status }),
    []
  );

  return {
    state,
    onAddFavouriteUsers,
    onSelectedGuest,
    onSetSocketConnected,
    onSetWaQrCode,
    onWaUserLogged,
    onSetIsLoadingGroupCreation,
  };
};

type UseGlobalContextType = ReturnType<typeof useGlobalContext>;

const initContextState: UseGlobalContextType = {
  state: initState,
  onAddFavouriteUsers: () => {},
  onSelectedGuest: () => {},
  onSetSocketConnected: () => {},
  onSetWaQrCode: () => {},
  onWaUserLogged: () => {},
  onSetIsLoadingGroupCreation: () => {},
};

export const GlobalContext =
  createContext<UseGlobalContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const GlobalProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GlobalContext.Provider value={useGlobalContext(initState)}>
      {children}
    </GlobalContext.Provider>
  );
};

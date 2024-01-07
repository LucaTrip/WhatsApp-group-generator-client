import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { SocketListenEvents } from "../models/types";

export default function SocketHandler() {
  const {
    state: { socket },
    onSetSocketConnected,
    onSetWaQrCode,
    onWaUserLogged,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket.on(SocketListenEvents.connect, () => onSetSocketConnected(true));
    socket.on(SocketListenEvents.disconnect, () => onSetSocketConnected(false));
    socket.on(SocketListenEvents.wa_ready, () => {
      console.log("whatsapp client is ready");
    });
    socket.on(SocketListenEvents.wa_qrcode, (qrcode: string) => {
      onSetWaQrCode(qrcode);
    });
    socket.on(SocketListenEvents.wa_authenticated, (status: boolean) => {
      onWaUserLogged(status);
      onSetWaQrCode("");
    });

    return () => {
      socket.off(SocketListenEvents.connect);
      socket.off(SocketListenEvents.disconnect);
      socket.off(SocketListenEvents.wa_ready);
      socket.off(SocketListenEvents.wa_qrcode);
      socket.off(SocketListenEvents.wa_authenticated);
      socket.off(SocketListenEvents.wa_group_created);
    };
  }, []);

  return <></>;
}

import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;

            /*
            try {
                const sound = new Audio(notificationSound);
                sound.play();
            } catch (error) {
                console.log("Sound play error", error);
            }
            */

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket.off("newMessage");
    }, [socket, setMessages]);
};
export default useListenMessages;
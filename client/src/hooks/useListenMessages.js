import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation(); // 'messages' state'ini buradan çekmene gerek kalmadı

    useEffect(() => {
        // Socket yoksa hiçbir şey yapma
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;

            // Ses dosyasının çalıp çalmadığını basit bir try-catch ile sarmak iyidir
            // (Tarayıcı politikaları bazen otomatik sesi engelleyebilir)
            try {
                const sound = new Audio(notificationSound);
                sound.play();
            } catch (error) {
                console.log("Ses çalma hatası:", error);
            }

            // ÖNEMLİ DEĞİŞİKLİK:
            // State'in önceki halini (prevMessages) alarak güncelleme yapıyoruz.
            // Böylece useEffect'in 'messages'a bağımlı kalmasına gerek yok.
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket.off("newMessage");

        // Bağımlılık dizisinden 'messages' kaldırıldı.
        // Artık listener sadece bileşen mount olduğunda veya socket değiştiğinde kurulacak.
    }, [socket, setMessages]);
};

export default useListenMessages;
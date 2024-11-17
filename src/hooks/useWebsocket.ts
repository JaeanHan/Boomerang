import { useEffect, useRef, useState } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

type UseWebSocketReturn = {
  sendMessage: (destination: string, message: object) => void;
  connected: boolean;
};

export const useWebSocket = (
  url: string,
  topics: string[],
  onMessage: (message: string) => void
): UseWebSocketReturn => {
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      () => {
        console.log('WebSocket connected');
        setConnected(true);

        topics.forEach((topic) => {
          stompClient.subscribe(topic, (message) => {
            onMessage(message.body);
          });
        });
      },
      (error) => {
        console.error('WebSocket error:', error);
        setConnected(false);
      }
    );

    return () => {
      if (stompClientRef.current && stompClientRef.current?.connected) {
        stompClientRef.current?.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
    };
  }, [url, topics, onMessage]);

  const sendMessage = (destination: string, message: object) => {
    if (stompClientRef.current && stompClientRef.current?.connected) {
      stompClientRef.current?.send(destination, {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return { sendMessage, connected };
};

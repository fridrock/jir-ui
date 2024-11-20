// useFetchWithToken.js
import { useCallback } from 'react';
import { useGlobalState } from '../state/globalState';
import {getState, setState} from "../state/state"
import { defaultEndpoint } from './callEndpont';

export function useFetchWithToken() {
  const { setAuthorized } = useGlobalState(); // Подключаем глобальное состояние

  // Функция для выполнения запросов
  const fetchWithToken = useCallback(async (url, options = {}) => {
    const tokens = getState() 

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json'  
        }
      });

      if (response.status === 401) {
        // Если ответ '401', пробуем обновить токен
        const refreshSuccess = await refreshToken();
        if (refreshSuccess) {
          return fetchWithToken(url, options); // Повторяем запрос с новым токеном
        } else {
          setAuthorized(false); // Обновление токена не удалось
          throw new Error('Unauthorized and failed to refresh token');
        }
      }

      return response;

    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }, [setAuthorized]);

  // Функция для обновления токена
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(defaultEndpoint+"/token/refresh", {
        method: 'POST',
        body: JSON.stringify(getState())
      });

      if (response.status != 201) {
        console.error('Failed to refresh token:', response.statusText);
        return false;
      }

      const data = await response.json();
      setState(data)
      return true;

    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, []);

  return fetchWithToken;
}

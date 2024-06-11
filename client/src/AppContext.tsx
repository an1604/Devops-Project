import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';


interface AppContextProps {
    accessToken: string;
    updateAccessToken: (accessToken: string) => void;
    refreshToken: string;
    updateRefreshToken: (refreshToken: string) => void;
    accessTokenExpiry?: number;
    updateAccessTokenExpiry?: (accessTokenExpiry: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
    const [accessTokenExpiry, setAccessTokenExpiry] = useState(localStorage.getItem('accessTokenExpiry') ? parseInt(localStorage.getItem('accessTokenExpiry') || '') : undefined);

    const updateAccessToken = (accessToken: string) => {
        if (accessToken === '') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExpiry');
            setAccessToken('');
        }
        else {
            setAccessToken(accessToken);
            localStorage.setItem('accessToken', accessToken);
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            setAccessTokenExpiry(decodedToken.exp);
            localStorage.setItem('accessTokenExpiry', decodedToken.exp);
        }
    }

    const updateRefreshToken = (refreshToken: string) => {
        if (refreshToken === '') {
            localStorage.removeItem('refreshToken');
            setRefreshToken('');
        }
        else {
            setRefreshToken(refreshToken);
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    useEffect(() => {
        if (accessTokenExpiry) {
            // calculate expiry
            const expiry = accessTokenExpiry - Date.now() / 1000;
            console.log(expiry + ' seconds');
            const timeout = setTimeout(() => {
                console.log('refreshing token');
                axios.get('http://localhost:5000/auth/refresh', {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                }).then(response => {
                    updateAccessToken(response.data.accessToken);
                    updateRefreshToken(response.data.refreshToken);
                }).catch(err => {
                    console.log(err);
                });

            }, expiry * 1000);
            return () => clearTimeout(timeout);
        }
    }, [accessTokenExpiry]);

    return (
        <AppContext.Provider value={{ accessToken, updateAccessToken, refreshToken, updateRefreshToken }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

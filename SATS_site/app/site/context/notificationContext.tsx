import React, { createContext, useContext, useState } from 'react';

interface Result {
    success: boolean;
    status: string;
}

type NotificationContextType = {
    results: Result[];
    showResultClick: (success: boolean, status: string) => void;
    closeResultClick: (status: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [results, setResults] = useState<Result[]>([]);

    const showResultClick = (success: boolean, status: string) => {
        const newResult = { success, status };
        setResults((prev) => [...prev, newResult]);

        setTimeout(() => {
            setResults((prev) => prev.filter((r) => r.status !== status));
        }, 5000);
    };

    const closeResultClick = (status: string) => {
        setResults((prev) => prev.filter((r) => r.status !== status));
    };

    return (
        <NotificationContext.Provider value={{ results, showResultClick, closeResultClick }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
};

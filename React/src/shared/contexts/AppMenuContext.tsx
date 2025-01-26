import React, { createContext, useCallback, useContext, useState } from 'react';

interface IAppMenuOptions {
    icon: string;
    path: string;
    label: string;
    color?: string;
};


interface IAppMenuContextData {
    isOpen: boolean;
    options: IAppMenuOptions[];
    toogleAppMenuOpen: () => void;
    setAppMenuOptions: (newAppMenuOptions: IAppMenuOptions[]) => void;
};

const AppMenuContext = createContext({} as IAppMenuContextData);

export const useAppMenuContext = () => {
    return useContext(AppMenuContext);
};

interface IAppMenuContextDataProps {
    children: React.ReactNode;
};

export const AppMenuProvider: React.FC<IAppMenuContextDataProps> = ({ children }) => {
    const [isOpen, setAppMenuOpen] = useState(false);
    const [options, setAppMenuOptions] = useState<IAppMenuOptions[]>([]);

    const toogleAppMenuOpen = useCallback(() => {
        setAppMenuOpen(oldvalue => !oldvalue);
    }, []);

    const handleSetAppMenuOptions = useCallback((newAppMenuOptions: IAppMenuOptions[]) => {
        setAppMenuOptions(newAppMenuOptions);
    }, []);

    return (
        <AppMenuContext.Provider value={{ isOpen, options, toogleAppMenuOpen, setAppMenuOptions: handleSetAppMenuOptions }}>
            {children}
        </AppMenuContext.Provider>
    );
};
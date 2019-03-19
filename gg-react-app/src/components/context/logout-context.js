import { createContext } from 'react';

const defaultState = { 
    logout(){},
};

const { Consumer: LogoutConsumer, Provider: LogoutProvider } = createContext(defaultState);

export {
    LogoutConsumer,
    LogoutProvider,
    defaultState
}
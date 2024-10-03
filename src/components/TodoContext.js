import React from 'react';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    const [openHome, setOpenHome] = React.useState(false);
    const [openServices, setOpenServices] = React.useState(false);
    const [openContact, setOpenContact] = React.useState(false);


    return (
        <TodoContext.Provider value={{ openHome, setOpenHome, openServices, setOpenServices, openContact, setOpenContact/*  */ }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };

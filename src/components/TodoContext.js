import React from 'react';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    const [openLoggin, setOpenLoggin] = React.useState(false);
    const [openSignUp, setSignUp] = React.useState(false);

    return (
        <TodoContext.Provider value={{ openLoggin, setOpenLoggin, openSignUp, setSignUp }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };

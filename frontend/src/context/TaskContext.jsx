import { createContext, useReducer } from "react";

// Reducer
const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { 
        tasks: action.payload 
      };
    case "CREATE_TASK":
      return { 
        tasks: [action.payload, ...(state.tasks || [])] 
      };
    case "DELETE_TASK":
      return { 
        tasks: state.tasks ? state.tasks.filter((b) => b._id !== action.payload._id) : []
      };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks
          ? state.tasks.map((task) =>
              task._id === action.payload._id ? action.payload : task
            )
          : []
      };
    default:
      return state;
  }
}

// Context
export const TasksContext = createContext(undefined);

// Provider
export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: null });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
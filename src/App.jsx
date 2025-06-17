import React from 'react'
import TasksPage from './pages/TasksPage'
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TasksPage/>
    </QueryClientProvider>
  )
}

export default App
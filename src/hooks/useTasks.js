import {getTasks,addTask,deleteTask,editTask,editStatus} from "../api/tasks.js"
import {useQuery,useMutation,useQueryClient, QueryClient} from "@tanstack/react-query"

export const useGetAllTasks = () =>{
    return useQuery({
        queryKey:["tasks"],
        queryFn:async()=>{
            const result = await getTasks();
            return result.data.data;
        },
        staleTime:1000 * 60 * 5, 
    })
};

export const useAddTask= () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async(newTask)=>{
            return await addTask(newTask);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["tasks"]);
        }
    })
};

export const useEditTask= ()=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async(editedTask)=>{
            return await editTask(editedTask);
        },
        onSuccess:()=>{ 
            queryClient.invalidateQueries(["tasks"]);
        }
    })
}

export const useDeleteTask = () =>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async(id)=>{
            return await deleteTask(id);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["tasks"]);
        }
    })
}

export const useUpdateStatus= ()=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async (editedTask)=>{
            await editStatus(editedTask);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["tasks"]);
        }
    })
}
import Card from "./Card"
import {useGetAllTasks} from "../hooks/useTasks"
import { useEffect, useState } from "react"

const Cardscontainer = () => {

  const [datas,setDatas] = useState([]);
  const bgColors = ["bg-sky-300", "bg-red-300", "bg-green-300", "bg-yellow-300", "bg-purple-300"];
  const {data,isLoading,isError,error} =useGetAllTasks();

  //editing values
  const [editingIndex , setEditingIndex] = useState(null);

  useEffect(()=>{
    if(Array.isArray(data) && data.length > 0){
      const chunks = [];
      for(let i=0;i<data.length;i+=3){
        chunks.push(data.slice(i,i+3));
      }

      setDatas(chunks);
    }
  },[data]);

  console.log(datas);

  if(isLoading){
    return(
      <div className="h-[90vh] w-full flex justify-center items-center">
        <h1 className="text-[35px] font-bold text-yellow-500">Loading...</h1>
      </div>
    )
  }

  if(isError){
    return(
      <div className="h-[90vh] w-full flex justify-center items-center">
        <h1 className="text-[30px] font-bold text-red-500 text-center px-3">Something went wrong...</h1>
      </div>
    )
  }

  let cardIndex = 0;
  let assignColor=()=>{
    const color = cardIndex%bgColors.length;
    cardIndex++;
    return color;
  }

  return (
    <div className="flex h-auto w-full justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 sm:gap-20 py-10">
        {data.map((value,index)=>(
          <Card bgColor={bgColors[assignColor()]} data={value} editingIndex={editingIndex} setEditingIndex={setEditingIndex}/>
        ))}
      </div>
    </div>
  )
}

export default Cardscontainer
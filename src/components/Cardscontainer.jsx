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
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    )
  }

  if(isError){
    return(
      <div className="flex justify-center items-center">
        <h1>Error...</h1>
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
    <div className='flex flex-col items-center w-full pt-5'>
       {datas.map((row,index)=>(
          <div className="flex h-[45vh] w-[90%] my-5 justify-around items-center">
            {row.map((col)=>(
               <div><Card bgColor={bgColors[assignColor()]} data={col} editingIndex={editingIndex} setEditingIndex={setEditingIndex}/></div>
            ))}
         </div>
       ))}
    </div>
  )
}

export default Cardscontainer
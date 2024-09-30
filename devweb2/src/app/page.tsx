"use client"
import Image from "next/image";
import { FiTrash, FiEdit, FiCheck } from "react-icons/fi";
import { api } from "./api";
import { useEffect, useState, useRef, FormEvent } from "react";

interface TaskProps {
  id: string;
  description: string;
  date: string;
  status: boolean;
}

export default function Home() {

  const [tasks, setTasks] = useState<TaskProps[]>([])

  const descriptionRef = useRef<HTMLInputElement | null>(null)
  
  const dateRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadTasks();
  }, [])

  async function loadTasks() {
    const response = await api.get("/tasks")
    setTasks(response.data)
  }

function handleSubmit(event: FormEvent) {
  event.preventDefault()
  
  const response = await api.post("/tasks", {
    descriptions: descriptionRef.current?.value,
    date: dateRef.current?.value
  })
  setTasks(allTasks => [...allTasks, response.data])
}
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-500 to-purple-800">
      <div className="bg-white rounded-lg shadow-lg p-8 backdrop-blur-sm bg-opacity-50 max-w-md w-full">

        <h1 className="text-4xl text-slate-800 font-bold text-center mb-6">Lista de Tarefas</h1>

        <form className="flex flex-col text-gray-600" onSubmit={handleSubmit}>

          <label className="text-slate-800 mb-2">Descrição da tarefa</label>
          <input type="text"
            className="w-full mb-5 p-3 text-gray-800 rounded-lg bg-white placeholder-gray-400"
            placeholder="Digite sua tarefa..." 
            ref={descriptionRef}/>

          <label className="text-slate-800 mb-2">Data da tarefa</label>
          <input type="date"
            className="w-full mb-5 p-3 text-gray-800 rounded-lg bg-white"
            ref={dateRef}/>

          <input type="submit"
            value={"Adicionar Tarefa"}
            className="cursor-pointer w-full bg-blue-600 rounded-lg font-bold text-white p-4 hover:bg-blue-500 transition-colors" />

        </form>
        <section className="mt-5 flex flex-col">

          {tasks.map((task) => (
            <article className="w-full bg-slate-200 text-slate-800 p-4 rounded-lg shadow-lg relative hover:bg-sky-300 transition-colors" key={task.id}>
              <p>{task.description}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>
              <button className="flex absolute right-14 -top-2 bg-green-600 w-8 h-8 items-center justify-center text-slate-200 rounded-full hover:bg-green-500 transition-colors"><FiCheck /></button>
              <button className="flex absolute right-7 -top-2 bg-yellow-500 w-8 h-8 items-center justify-center text-slate-200 rounded-full hover:bg-yellow-400 transition-colors"><FiEdit /></button>
              <button className="flex absolute right-0 -top-2 bg-red-600 w-8 h-8 items-center justify-center text-slate-200 rounded-full hover:bg-red-500 transition-colors"><FiTrash /></button>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

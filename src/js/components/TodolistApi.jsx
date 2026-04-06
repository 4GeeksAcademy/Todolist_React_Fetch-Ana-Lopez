import React, { useState, useEffect } from "react";

export const TodolistApi = () => {


    //estado para guardar el array de tareas (inicialmente esta vacio):
    const [lista, setLista] = useState([])
    const [tarea, setTarea] = useState("")

    //guardo la url en un espacio de memoria:
    const API_URL = "https://playground.4geeks.com/todo"

    const crearUsuario = () => {

        fetch(API_URL + "/users/nahyah", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => {
                console.error("Hubo un problema al crear el usuario", error);
            })
    }

    const obtenerLista = () => {

        fetch(API_URL + "/users/nahyah")
            .then((response) => {
                if (response.status === 404) {
                    crearUsuario()
                }
                return response.json()
            })
            .then(data => { setLista(data.todos) })
            .catch(error => {
                console.error("Hubo un problema al obtener la lista de tareas", error);
            })
    }



    const crearTarea = async (text) => {
        if (tarea.trim() === "") return;
        try {

            const response =
                await fetch(API_URL + "/todos/nahyah", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        label: text,
                        is_done: false
                    })
                })

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo crear la tarea`)
            }

            const data = await response.json()

            await obtenerLista()


        } catch (error) {
            console.error("Hubo un problema al crear la tarea", error);
        }


    }



    const inputtext = (e) => {
        //si la tecla presionada es Enter
        if (e.key === "Enter") {
            crearTarea(tarea)
            setTarea("")

        }
    }

    const eliminarTarea = async (id) => {

        try {
            const response = await fetch(API_URL + "/todos/" + id, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo eliminar la tarea`);
            }

            // actualizar la lsita
            await obtenerLista();

        } catch (error) {
            console.error("Hubo un problema al eliminar la tarea", error);
        }
    }


    useEffect(() => {
        obtenerLista()
    }, [])


    return (
        <div>
            <h1>Tareas de NahYah</h1>
            <div className="container paper">
                <div className="input-group flex-nowrap">
                    <input type="text"
                        placeholder="Agregar tarea "

                        onChange={(e) => setTarea(e.target.value)}
                        value={tarea}
                        onKeyDown={inputtext}
                    />
                </div>

                {/* hacer condicional */}
                <ol>
                    {lista.length === 0 ? (
                        <li>No hay tareas aún</li>
                    ) : (
                        lista.map((item) => (
                                <li key={item.id}> {item.label}
                                    <button type="button" className="btn btn-outline-success" onClick={() => eliminarTarea(item.id)} >¡Hecho!</button>
                                </li>
                            ))
                    )}
                    </ol>
                <p className="itemsleft">{lista.length} tarea(s) pendiente(s)</p>
            </div>
        </div>
    )

}
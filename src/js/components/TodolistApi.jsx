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
            .then(response => response.json()) //conviuerte la respuesta a un formato JSON
            .then(data => console.log(data))  //No necesito almacenar el dato (en este caso el usuario) en ningun estado,se va a crear directamente. Tomara el dato para mostrar en la consola. 
            .catch(error => {
                console.error("Hubo un problema al crear el usuario", error); //imprimir el error enn la consola para depurar
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
            .then(data => { setLista(data.todos) })  //toma los datos para mostrar en el array
            .catch(error => {
                console.error("Hubo un problema al obtener la lista de tareas", error); //imprimir el error enn la consola para depurar
            })
    }

    //      useEffect(()=>{
    //    aqui va el codigo que hace algo (ejemplo el fetch)
    //       },[ cuando se repite, si esta vacio se ejecuta solo una vez al cargar la pagina, si tiene un dato se ejecuta cada vez que ese dato cambie ])

    const crearTarea = async (text) => {
         if (tarea.trim() === "") return;
        try {

            const response = 
            await fetch(API_URL + "/todos/nahyah", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //se envia la tarea en el body como una cadena JSON
                body: JSON.stringify({
                    label: text,
                    is_done: false
                })
            })

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo crear la tarea`)
            }

            const data = await response.json() //conviuerte la respuesta a un formato JSON
            // console.log("tarea creada con exito:", data);
            await obtenerLista()


        } catch (error) {
            console.error("Hubo un problema al crear la tarea", error);
        }


    }


    //funcion para crear la tarea
    const inputtext = (e) => {
        //si la tecla presionada es Enter
        if (e.key === "Enter") {
            crearTarea(tarea) //llamar a la funcion de la API con el texto de la tarea
            setTarea("") //limpiar el campo despues de enviar la tarea 
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

            <input type="text"
                placeholder="Agregar tarea "
                //  actualiza el estado tarea cada vez que el usuario escribe
                onChange={(e) => setTarea(e.target.value)}
                value={tarea}
                //llama ala funcion que maneja la creacion del estado al presionar una tecla ENTER
                onKeyDown={inputtext}
            />



            {/* hacer condicional */}
            <ol>
                {lista.map((item) => (
                    <li key={item.id}> {item.label}
                    <button onClick={() => eliminarTarea(item.id)}>X</button>
                    </li>
                ))}
            </ol>
        </div>
    )

}
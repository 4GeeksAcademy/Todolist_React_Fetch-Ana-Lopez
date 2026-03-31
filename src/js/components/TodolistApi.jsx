import React, { useState, useEffect } from "react";

export const TodolistApi = () => {


    //estado para guardar el array pe dersonajes (inicialmente esta vacio)
    const [lista, setLista] = useState([])
    const [tarea, setTarea] = useState("")

    const API_URL = "https://playground.4geeks.com/todo"

    const crearUsuario = () => {

        fetch(API_URL + "/users/nahyah", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json()) //conviuerte la respuesta a un formato JSON
            .then(data => { console.log(data) })  //toma los datos para mostrar en el array
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


    useEffect(() => {
        obtenerLista()
    }, [])


    return (
        <div>
            <h1>Tareas de NahYah</h1>

            <ol>
                {lista.map((item) => (
                    <li key={item.id}> {item.label}</li>
                ))}
            </ol>
        </div>
    )

}
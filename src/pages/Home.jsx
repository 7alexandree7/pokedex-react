import { Box, Grid, Container, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar/Index'
import PokemonCard from '../Components/PokemonCard/Index'
import axios from 'axios'
import { Skeletons } from '../Components/Skeletons/Index'



export const Home = () => {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, [])


    const getPokemons = () => {

        let endpoints = [];

        for (let i = 1; i <= 1000; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        let response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
    }



    const pokemonFilter = (name) => {

        if (name === '') {
            getPokemons();
        }

        let filteredPokemons = [];

        for (let i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i])

            }
        }

        console.log(filteredPokemons)
        setPokemons(filteredPokemons)
    }


    return (
        <div>
            <NavBar pokemonFilter={pokemonFilter} />
            <Container maxWidth='false'>
                <Grid container spacing={4}>

                    {pokemons.length === 0 ? (
                        <Skeletons/>
                    ) : (
                        pokemons.map((pokemon, key) => (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={key}>
                                <PokemonCard
                                    name={pokemon.data.name}
                                    image={pokemon.data.sprites.front_default}
                                    types={pokemon.data.types}
                                />
                            </Grid>
                        ))
                    )}



                </Grid>
            </Container>
        </div>
    )
}

import React, {useState, useEffect} from 'react'
import Column from './Column'
import { Grid } from '@mui/material'

const columns = {
    to_do: [],
    in_progress: [],
    qa: [],
    done: []
}

export default function Dashboard({}) {
    const data = {} // Placeholder for future data fetching logic 
    return (
        <>
            <Grid container spacing={2} 
                sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                {Object.keys(columns).map((columnKey) => (
                    <Column key={columnKey} columnKey={columnKey} tasks={columns[columnKey]} />
                ))}
            </Grid>
        </>
    )
}
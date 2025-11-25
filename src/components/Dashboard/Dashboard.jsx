import React, {useState, useEffect} from 'react'
import Column from './Column'
import { Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, tasks_list } from "../../store/slices/taskSlice"


export default function Dashboard({}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const data = useSelector(tasks_list) 

    useEffect(() => {
        dispatch(getTasks()).unwrap()
        .then(() => {
            setError(null);
        })
        .catch((error) => {
            setError(<div>{error}</div>);
        })
    },[])

    return (
        <>
            <Grid container spacing={2} 
                sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                {Object.keys(data).map((columnKey) => (
                    <Column key={columnKey} columnKey={columnKey} tasks={data[columnKey]} />
                ))}
            </Grid>
        </>
    )
}
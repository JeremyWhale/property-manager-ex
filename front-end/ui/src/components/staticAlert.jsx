import React from "react";
import { Typography, Grid } from "@mui/material";
import { CheckCircleOutline, ErrorOutline, InfoOutlined, WarningAmber } from "@mui/icons-material";

export default function StaticAlert(props){
    function alertType(){
        if (props.type === 'error'){
            return (<ErrorOutline type={props.type} color={props.type} />)
        }
        if (props.type === 'warning'){
            return (<WarningAmber type={props.type} color={props.type} />)
        }
        if (props.type === 'success'){
            return (<CheckCircleOutline type={props.type} color={props.type} />)
        }
        else {
            return(<InfoOutlined type={props.type} color={props.type} />)
        }
    }

    return(
        <Grid container spacing={0} alignItems={'center'} direction={'column'} paddingTop={1} paddingBottom={1}>
            <Grid item>
                {alertType()}
            </Grid>
            <Grid>
                <Typography>{props.message}</Typography>
            </Grid>
        </Grid>
    )
}
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {baseUrl} from "../config/server";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    captcha: {
        paddingTop: theme.spacing(2)
    }
}));

export default function DynamicRecaptcha(props) {
    const classes = useStyles();
    const [recaptchaKey, setRecaptchaKey] = React.useState("")

    React.useEffect(() => {
        if (recaptchaKey === "")
        {
            axios.get(`${baseUrl}recaptcha`)
                .then(res => {
                    const response = res.data;
                    if (response.pubKey !== "not-set") setRecaptchaKey(response.pubKey)
                    props.onRequired(response.required)
                })
                .catch(res => {
                    props.onError("There was a problem connecting to the server")
                })
        }
    }, [recaptchaKey]);

    if (recaptchaKey) return (
        <div  align="center" className={classes.captcha}>
            <ReCAPTCHA
                sitekey={recaptchaKey}
                onChange = {props.onChange}
                onExpire = {props.onExpire}
            />
        </div>
    )
    return null
}

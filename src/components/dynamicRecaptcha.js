import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {baseUrl} from "../config/server";
import axios from 'axios';

export default function DynamicRecaptcha(props) {
    const [recaptchaKey, setRecaptchaKey] = React.useState("")

    React.useEffect(() => {
        if (recaptchaKey === "")
        {
            axios.get(`${baseUrl}recaptcha`)
                .then(res => {
                    const response = res.data;
                    if (response.pubKey !== "") setRecaptchaKey(response.pubKey)
                    props.notRequired(!response.required)
                })
                .catch(res => {
                    props.onError("There was a problem connecting to the server")
                })
        }
    }, [recaptchaKey]);

    if (recaptchaKey) return (
        <ReCAPTCHA
            sitekey={recaptchaKey}
            onChange = {props.onChange}
            onExpire = {props.onExpire}
        />
    )
    return null
}

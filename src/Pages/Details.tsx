import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "../Styles/Details.css"

const Details = () => {
    const { state }: any = useLocation();
    const [jsonData, setJsonData] = useState<any>();
    useEffect(() => {
        setJsonData(state);
    }, [])

    return (
        <div className='cont'>
            <h3 className='raw-title'>Raw JSON</h3>
            {!jsonData && <p>Loading ...</p>}
            <p className='rawData'>{jsonData}</p>
        </div>
    )
}

export default Details;

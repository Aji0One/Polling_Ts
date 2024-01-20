import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "../Styles/Pagination.css";


export default function BasicPagination({ maxpage }: any) {
    return (
        <div className='pagination-cont'>
            <Stack spacing={2}>

                <Pagination count={maxpage} />

            </Stack>
        </div>
    );
}
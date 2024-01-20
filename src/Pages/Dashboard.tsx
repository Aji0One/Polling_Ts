import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { TableContainer, Table, TableHead, TableRow, TableBody, Button, TableCell, tableCellClasses, styled, Paper } from "@mui/material";
import BasicPagination from "../Components/Pages/Pagination";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import { InView } from "react-intersection-observer"
import InfiniteScroll from 'react-infinite-scroll-component';

type postDetailsProps = {
    title: string,
    url: string,
    created_at: string,
    author: string,

}

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow: any = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Dashboard = () => {
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState<number>(0);
    // const [loop, setLoop] = useState<boolean>(false);
    const [state, setState] = useState(true);
    const [pagination, setPagination] = useState<boolean>(true);
    const [allPostDetails, setAllPostDetails] = useState<postDetailsProps[]>([]);



    const getPostDetails = async () => {
        try {
            const axiosGetCall = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`);
            const responseData = axiosGetCall.data.hits;
            if (responseData.length > 0) {
                setAllPostDetails([...allPostDetails, ...responseData]);
                // sessionStorage.setItem("pageNumber", JSON.stringify(pageNum));
                // sessionStorage.setItem("details", JSON.stringify(allPostDetails));
            } else {
                setState(false);
            }
            setPageNum((prePage) => prePage + 1);

        } catch (err: any) {
            console.log(err.message);
        }
    }

    console.log(allPostDetails);

    useEffect(() => {
        const valid = setInterval(() => {
            state && getPostDetails();

        }, 10000);

        return () => {
            clearInterval(valid);
        }

    })


    const handleRawJson = (data: any) => {
        const myjson = JSON.stringify(data);
        navigate("/raw", { state: myjson });
    }


    return (
        <div className="polling-cont">

            <h2 className="polling-title">Polling App</h2>

            <TableContainer component={Paper} className='mytable' sx={{ maxWidth: "fit-content", alignItems: "center", marginBottom: "1rem" }}>

                <Table sx={{ maxWidth: 900, fontSize: "25px" }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Sl.No</StyledTableCell>
                            <StyledTableCell align='center'>Title</StyledTableCell>
                            <StyledTableCell align='center'>URL</StyledTableCell>
                            <StyledTableCell align='center'>Created At</StyledTableCell>
                            <StyledTableCell align='center'>Author</StyledTableCell>
                            <StyledTableCell align='center'>Option</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody data-testid="tbody" >
                        {allPostDetails.map((row, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row" align='center' width="500">
                                    {i + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align='center' width="500">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align='center' width="300" ><a href={row.url} className="anchor">{row.url ? "Click_Me" : "nil"}</a></StyledTableCell>
                                <StyledTableCell align='center' width="400">{row.created_at}</StyledTableCell>
                                <StyledTableCell align='center' >{row.author}</StyledTableCell>
                                <StyledTableCell align="center"><Button variant="text" onClick={() => handleRawJson(row)} data-testid={`view-${i}`}>View</Button></StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <InView
                onChange={() => getPostDetails()}
                triggerOnce
                threshold={0.5}
                rootMargin="500px"
            >
                <div style={{ height: '20px' }} />
            </InView>
            <InfiniteScroll
                dataLength={allPostDetails.length}
                next={getPostDetails}
                hasMore={pageNum < 50 ? true : false}
                loader={<p className="notify">Loading...</p>}
                endMessage={<p className="notify">No more data to load.</p>}
            >
            </InfiniteScroll>

            {pagination && <BasicPagination maxpage={pageNum} />}

        </div>
    )


};

export default Dashboard
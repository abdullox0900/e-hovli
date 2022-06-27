// Import => React and Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// Import => Components
import Loader from "../../Components/Loader/Loader";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import { Pagination, Grid } from "@mui/material";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import Cards from "../../Components/Card/Card";
import AfemePhone from "../../Components/AfemePhone/AfemePhone";
import Footer from "../../Components/Footer/Footer";
import ApiError from "../../Components/ApiError/ApiError";

// Import => Style
import "./Adverts.scss";

function Adverts() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let htype = searchParams.get("htype");

    const [data, setData] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [dataError, setDataError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const URL = `https://ali98.uz/api/post`;

    useEffect(() => {
        const result = axios
            .get(URL + `?page=${currentPage}`, { htype_id: htype })
            .then((response) => {
                let dataStatus = response.status;
                if (dataStatus == true || dataStatus == 200) {
                    setData(response.data);
                    setAdverts(response.data.data);
                    setTotalPages(response.data.meta.last_page + 1);
                    console.log(data);
                } else {
                    setDataError(true);
                }
            })
            .catch((error) => {
                setDataError(true);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentPage]);

    function showCards(amount) {
        console.log(isLoading);
        if (isLoading) {
            return <CardSkeleton amount={amount} fullCard={true} />;

        } else if (adverts.length > 0 && !dataError) {

            return adverts.slice(0, amount).map((row) => {
                return <Cards data={row} fullCard={true} />;
            });
        } else {
            return <ApiError />;
        }
    }

    function pagination() {
        const changePage = (e, value) => {
            setCurrentPage(value - 1);
            setIsLoading(true);
        };

        if (adverts.length > 0) {
            return (
                <Grid sx={{ my: 3 }} >
                    <Pagination
                        count={totalPages}
                        color="primary"
                        size="large"
                        sx={{ display: 'flex', justifyContent: "center" }}
                        onChange={(e, value) => changePage(e, value)}
                    />
                </Grid>
            );
        }
    }

    return (
        <>
            <Loader />
            <Header />
            <Hero />
            <div className="adverts">
                <Container>
                    {showCards(10)}
                    {pagination()}
                    <AfemePhone />
                </Container>
            </div>
            <Footer />
        </>
    );
}
export default Adverts;

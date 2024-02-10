import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    // Capactalize Function
    const capitalizeFirstCharacter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // updating(loading) the site funtion
    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(10);
        let data = await fetch(url);
        props.setProgress(30);
        let parse_Data = await data.json();
        props.setProgress(68);
        setArticles(parse_Data.articles);
        setTotalResults(parse_Data.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstCharacter(props.category)} - NewsNut`;
        updateNews();
    }, [])

    // const HandlePrevClick = async () => {
    //     // console.log("Previous");
    //     setPages(page-1);
    //     updateNews();
    // }

    // const HandleNextClick = async () => {
    //     // console.log("Next");
    //     setPages(page+1);
    //     updateNews();
    // }


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPages(page + 1);
        let data = await fetch(url);
        let parse_Data = await data.json();
        setArticles(articles.concat(parse_Data.articles));
        setTotalResults(parse_Data.totalResults);
    };


    return (
        <>

            <h1 className='text-center' style={{ marginBottom: "10px", marginTop: "95px" }}>
                NewsNut - Top
                <span style={{ color: 'red' }}> {capitalizeFirstCharacter(props.category)} </span>
                Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className="container my-4">
                    <div className='row my-2'>
                        {
                            articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItems title={element.title ? element.title.slice(0, 25) : ""} description={element.description ? element.description.slice(0, 45) : ""} ImageUrl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })
                        }
                    </div>
                </div>

            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={HandlePrevClick}>&larr; Previous</button>
                        <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={HandleNextClick}>Next &rarr;</button>
                    </div> */}

        </>
    )
}


News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
import React from 'react'

const NewsItems = (props) =>{
    let { title, description, ImageUrl, newsURL, author, date, source } = props;
    return (
        <div>

            <div className="card my-3">
                <div style={{ display: "flex", justifyContent: "center", position: "absolute", left: "0" }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>

                <div>
                    <img src={ImageUrl ? ImageUrl : "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/StrangerThings_StrangerThings4_8_00_38_25_06_R.jpg"} className="card-img-top" alt="..." style={{ display: "grid", height: "40vh" }} />

                    <div className="card-body">
                        <h5 className="card-title">{title}..</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text text-info"><small className="text-body-secondary">By {author !== null ? author : "Unknown"} at {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsURL} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewsItems
import React, { useEffect,useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News=(props)=>{
 const [articles,setArticles]=useState([])
 const [loading,setLoading]=useState(true)
 const [page,setPage]=useState(1)
 const [totalResults,setTotalResults]=useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const getDateRange = () => {
    let fromDate = new Date();
    let toDate = new Date();
  
    switch (props.dateRange) {
      case "today":
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        fromDate = new Date(Date.now() - 86400000);
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(Date.now() - 86400000);
        toDate.setHours(23, 59, 59, 999);
        break;
      case "7days":
        fromDate = new Date(Date.now() - 7 * 86400000);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        break;
      case "30days":
        fromDate = new Date(Date.now() - 30 * 86400000);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        break;
      case "custom":
        fromDate = new Date(props.customFrom);
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(props.customTo);
        toDate.setHours(23, 59, 59, 999);
        break;
    }
  
    return {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    };
  };
  
  

  const update=async()=> {
    props.setProgress(10);
    const { from, to } = getDateRange();
    // console.log("Fetching from:", from, "to:", to);

    const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&country=${props.country}&lang=${props.lang}&apikey=165e6580bc151548c5284b72d18d29e8&page=${page}&pagesize=${props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&lang=${props.lang}&apiKey=e4ac901088be431da066739fd5dd2fbc&page=${page}&pagesize=${props.pageSize}`;
    props.setProgress(30);
    setLoading(false)
    let data = await fetch(url);
    props.setProgress(60);
    let parsedata = await data.json();
    props.setProgress(80);
    // console.log(parsedata);
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(true);
    props.setProgress(100);
  }
  useEffect(()=>{
     document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  update();
  },[props.lang,props.category,props.country,props.dateRange, props.customFrom, props.customTo])

 
    return (<>
      <h2 className='text-center' style={{ margin: '70px 0px' }}>Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {!loading && <Spinner />}
      <div className='container my-3'>
  {articles.length === 0 ? (
    <div className="text-center my-5">
      <h4>😕 No news articles available</h4>
      <p>
        Sorry, we couldn't find any news for this language or country right now.
        Please try a different selection or check back later.
      </p>
    </div>
  ) : (
    <div className='row'>
      {articles.map((element) => (
        <div className='col-md-4 mb-4' key={element.url}>
          <NewsItem
            title={element.title}
            lang={props.lang}
            description={element.description}
            // imageUrl={element.urlToImage}
            imageUrl={element.image}
            url={element.url}
            author={element.author}
            publishedAt={element.publishedAt}
            name={element.source.name}
          />
        </div>
      ))}
    </div>
  )}
</div>

    </>)
  
      }
News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News

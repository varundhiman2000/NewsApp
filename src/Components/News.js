import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    console.log("Weclome to news app");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      length:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- BBC`
  }

  //get a data nd showing on first page
  upadteData = async () => {
    this.props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}` 
    // let url ="https://sarops.pageSize}`purav.tech/NewsAPI/top-headlines/category/sports/in.json";
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    
    if (data.ok) {
      let parsedData = await data.json();
      // console.log(parsedData);
      
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        // lenght:this.state.articles.concat(parsedData.articles).length,
      });
      this.props.setProgress(100);
    } else {
      document.getElementById("dhiman").innerHTML = "Error";
      throw new Error("Errors in a Url");
      //  error.style="text-center"
    }
  };
   // call a function throw didmount so first all the components are rendered after that api will render 
  async componentDidMount() {
    this.upadteData()
  }
//We can also use these button instead of infinite scroll bar
  // previousClick = async () => {
  //   this.setState = { page: this.state.page - 1 };
  //   this.upadteData();
  // };

  // nextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.upadteData();
  // };

  //When page is scroll down that it runs.
  fetchMoreData=async()=>{
    // let url ="https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json";
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}` 
    this.setState({page:this.state.page+1})
    // this.setState({ loading: true });
    let data = await fetch(url);
    if (data.ok) {
      let parsedData = await data.json()
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        lenght:this.state.articles.concat(parsedData.articles).length,
        // loading: false,
      });
      // console.log(this.lenght);
      // console.log(this.totalResults);
    }
    else {
      document.getElementById("dhiman").innerHTML = "Error";
      throw new Error("Errors in a Url");
    }
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          BBC NEWS -Top {this.capitalizeFirstLetter(this.props.category)} Headdlines 
        </h1>
        {/* {if loading is true then spinner is worked} */}
       {this.state.loading && <Spinner></Spinner>}
       {/* infinte scroll bar  */}
         <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length!==this.state.totalResults}
    loader={<Spinner/>}
   
   endMessage={<p style={{ textAlign: 'center' }}>
   <b>Yay! You have seen it all</b>
 </p>}
>
        <div
          className="text-center"
          id="dhiman"
          style={{ fontSize: "1.7rem" }}
        ></div>
        <div className="container">
        <div className="row">
          {
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 35) : ""}
                    discription={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgUrl={
                      element.urlToImage
                    }
                    newsUrl={
                      element.url 
                    }
                    author={
                      element.author ? element.author.slice(0, 20) : " Unknown"
                    }
                    publishedAt={
                      element.publishedAt
                        ? new Date(element.publishedAt).toUTCString()
                        : "Not Defined"
                    }
                    source={
                      element.source.name
                        ? element.source.name.slice(0, 30)
                        : "Unknown"
                    }
                  
                  ></Newsitem>
                </div>
);
})};
                </div>
        </div>
</InfiniteScroll>
        
      </>
    );
  }}
export default News;

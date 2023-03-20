 import React, { Component } from 'react'

export class Newsitem extends Component {
  
  render() {
    let {title,discription,imgUrl,newsUrl,author,publishedAt,source}=this.props;
    return (
      <div className='my-3' style={{position:"static",zIndex:0}}>
        {/* <div className="card" style={{height:"400px"}}> */}
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:1}}>
    {source }</span>
  <img src={imgUrl} className="card-img-top" alt="..." style={{height:"200px"}}/>
  <div className="card-body">
    <h5 className="card-title">{title}..... </h5>
    <p className="card-text">{discription}.....</p>
    <p className="card-text">By {author} on {publishedAt}</p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{marginBottom:"10px"}}>Go somewhere</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem

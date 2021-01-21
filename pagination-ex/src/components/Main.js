import React, { Component } from 'react';

class Main extends Component{
    state = {
        results:[],
        currentPage: 0,
        lastPageIndex: 0,
        isFetching:true
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
       // console.log('current page-',this.state.currentPage,this.state.lastPageIndex)
        fetch('https://api.instantwebtools.net/v1/passenger?page='+this.state.currentPage+'&size=10')
            .then(resp => resp.json())
            .then(data => this.populateData(data));
    }
    populateData = (data) => {
        var origResults = [...this.state.results];
        origResults=data.data;
        this.setState({ results: origResults ,lastPageIndex:data.totalPages-1,isFetching:false});
    }
    showFirst = () => {
        if(this.state.currentPage!==0)
        this.setState({currentPage:0},()=>this.fetchData())
    }
   
    move = (val) => {
        var curPage = this.state.currentPage;
        if(curPage>=this.state.lastPageIndex && val===1) return
        else if (val === 1) {
            curPage = curPage + val;
        }
        else {
            if (curPage === 0) return;
            else {
                curPage=curPage+val
            }
        }
        this.setState({currentPage:curPage},()=>this.fetchData())
    }
    showLast = () => {
        if (this.state.currentPage !== this.state.lastPageIndex) {
           this.setState({currentPage:this.state.lastPageIndex},()=>this.fetchData())
       }
    }
    render() {
        const res = this.state.results;
        if(this.state.isFetching)return <p>Fetching</p>
        return (
            <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Trips</th>
                  
                        </tr>
                        {!this.state.isFetching ? res.map((x) => {
                                return (
                                    <tr key={x._id} >
                                        <td >{x.name}</td>
                                        <td>{x.trips}</td>
                                 </tr>
                            ) 
                        })
                           : null}
              </thead>
              <tbody>
             
              </tbody>
            </table>
            <section className="pagination">
              <button onClick={this.showFirst} className="first-page-btn">first</button>
                <button onClick={()=>this.move(-1)}className="previous-page-btn">previous</button>
                    <button onClick={()=>this.move(1)}className="next-page-btn">next</button>
              <button onClick={this.showLast} className="last-page-btn">last</button>
                </section>
                <section className="number">
                    <span>{this.state.currentPage+1}</span>
            </section>
          </div>
        )
    }
}
export default Main
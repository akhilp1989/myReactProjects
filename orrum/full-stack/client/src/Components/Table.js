import React,{Component} from 'react'
import axios from 'axios'
//import {getInitialData} from '../datprovider'

class Table extends Component {
    constructor() {
        super()
        this.state={
            showButton: 'true',
            phoneMap: []
        } 
        this.API_URL='http://localhost:5000'
        this.populateResponse = this.populateResponse.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.updatePhoneMap = this.updatePhoneMap.bind(this)
        this.call=this.call.bind(this)

    }
    call = () => {
        this.setState({showButton:'false'})
       // console.log('Inside call')
        axios.post(this.API_URL+'/start')
            .then(resp => console.log('RESP->', resp))
        var eventSource = new EventSource(this.API_URL+'/getData');
        eventSource.addEventListener('update',  (e)=> {
            //console.log(JSON.parse(e.data))
            this.updatePhoneMap(JSON.parse(e.data))
        },false)
       
    }
    updatePhoneMap = (obj) => {
        var origPhoneMap = [...this.state.phoneMap]
        origPhoneMap.map(k => {
      
            if (k.id == obj.id) {
                //console.log('found')
                k.status=obj.status
            }
        })

        this.setState({phoneMap:origPhoneMap})
    }
    populateResponse = (data) => {
        var origPhoneMap = [...this.state.phoneMap]
            data.map(k => {
                origPhoneMap.push(k)
            })
            this.setState({phoneMap:origPhoneMap})
    }
    
    fetchData = () => {
        axios.get(this.API_URL + '/')
            .then(resp=> this.populateResponse(resp.data))
      
    }

    componentDidMount() {
       this.fetchData()
       
    }
    render() {
        //console.log(this.state.showButton)
        return (
            <div>
            <table >
                <tbody>
                <tr>
        <th>Phone Number</th>
        <th>Status</th>
                    </tr>
                    {this.state.phoneMap.map(k => (
                         <tr key={k.id}>
                         <td>{k.phoneNumber}</td>
                        <td>{k.status}</td>
                       
              </tr>
                    ))}
       
 
                </tbody>
  
                </table>
                {this.state.showButton==='true'? <button onClick={this.call}>Call </button> :null}
                
                </div>
        )
    }
}
export default Table
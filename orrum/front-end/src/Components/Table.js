import React,{Component} from 'react'
import axios from 'axios'

class Table extends Component {
    constructor() {
        super()
        this.state={
            showButton:'true'
        }
        this.phoneMap = [{
            id:'1',
            phoneNumber: '13018040009',
            status: 'idle'
        },
        {   id:'2',
            phoneNumber: '19842068287',
            status: 'idle'
        },
        {   id:'3',
            phoneNumber: '15512459377',
            status: 'idle'
        },
        {   id:'4',
            phoneNumber: '19362072765',
            status: 'idle'
        },
        {   id:'5',
            phoneNumber: '18582210308',
            status: 'idle'
        },
        {   id:'6',
            phoneNumber: '13018040009',
            status: 'idle'
        },
        {   id:'7',
            phoneNumber: '19842068287',
            status: 'idle'
        },
        {   id:'8',
            phoneNumber: '15512459377',
            status: 'idle'
        },
        {   id:'9',
            phoneNumber: '19362072765',
            status: 'idle'
        }
            
        ]
       
        this.call=this.call.bind(this)
    }
    call = () => {
        this.setState({ showButton: false })
    }

    render() {
        return (
            <div>
            <table >
                <tbody>
                <tr>
        <th>Phone Number</th>
        <th>Status</th>
                    </tr>
                    {this.phoneMap.map(k => (
                         <tr key={k.id}>
                         <td>{k.phoneNumber}</td>
                        <td>{k.status}</td>
                       
              </tr>
                    ))}
       
 
                </tbody>
  
                </table>
                {this.state.showButton? <button onClick={this.call}>Call </button> :null}
                
                </div>
        )
    }
}
export default Table
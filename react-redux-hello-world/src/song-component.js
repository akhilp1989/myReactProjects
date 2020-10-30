import React,{Component} from 'react'
import { connect } from 'react-redux'
import { getDetails } from './action/actionTypes'
import SongDetails from './songDetails'


class songComponent extends Component {
    constructor(props) {
        super()
       
    }
    
    render() {
        console.log(this.props)
        var data=this.props.songs
    
        return (
            <div>
                {data.map(k => (
                    <div key={k.title}>
                        <span>{k.title}</span>
                        <button onClick={()=>this.props.songSelected(k)} >Submit</button>
                    </div>
                  
                ))}
                <SongDetails />

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        songs: state.songs
    }
}
const mapDispatchToProps = dispatch => {
    return {
        songSelected: function (song){
            dispatch(getDetails(song))
        }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(songComponent)
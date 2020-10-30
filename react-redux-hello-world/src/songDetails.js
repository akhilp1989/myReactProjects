import React from 'react'
import {connect} from 'react-redux'

const songDetails = (props) => {
  
    return (
        <div>
           <h1>Select a Song</h1>
            {props.song ?
                 <div>
                <h1>{props.song.title}</h1>
                <h2>{props.song.length}</h2>
                </div>:null
                }
               
      </div>
        
    )
}
const mapStateToProps = (state) => {
        return {song:state.selectedSong}
    }
export default  connect(mapStateToProps)(songDetails)
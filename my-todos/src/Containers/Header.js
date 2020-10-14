
import {connect} from 'react-redux'
import Header from '../Components/Header'
import {addToDo} from '../Actions/index'


export default connect(null,{addToDo})(Header)
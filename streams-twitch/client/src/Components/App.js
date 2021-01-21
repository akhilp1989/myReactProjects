import { Switch,Route } from 'react-router-dom'
import Header from './header'
import StreamList from './Streams/streamList'
import StreamEdit from './Streams/streamEdit'
import StreamDelete from './Streams/streamDelete'
import StreamShow from './Streams/streamShow'
import StreamCreate from './Streams/streamCreate'

function App() {
  return (
    <div>
    <Header />
    <Switch>
        <Route path='/' exact component={StreamList} />
        <Route path='/streams/delete/:id' component={StreamDelete}/>
          <Route path='/streams/edit/:id' component={StreamEdit} />
        <Route path='/streams/create' component={StreamCreate} />
        <Route path='/streams/stream/:id' component={StreamShow} />
        
    </Switch>
    </div>
  );
}

export default App;

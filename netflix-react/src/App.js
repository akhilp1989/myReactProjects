import React from 'react';
import Jumbotron from './Components/Jumbotron'
import jumboData from './fixtures/jumbo.json'

function App() {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <p>{item.title}</p>
          <p>{item.subTitle}</p>
          <p>{item.image}</p>
          <p>{item.alt}</p>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  )
}

export default App;

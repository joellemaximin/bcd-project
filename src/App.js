import React, { Component } from 'react';
import AddBook from './Components/AddBook';
import Books from './Components/Books';
//import Book from './Components/AddBook';
//import EditBook from './Components/EditBook';
import Navigation from './Components/Navigation';
//import Students from './Components/Students';
//import Student from './Components/Student';
//import AddStudent from './Components/AddStudent';
//import Category from './Components/Category';
//import EditCategory from './Components/EditCat';
//<Route exact path='/book/:id' render={(props) => <Book {...props}  />} />

//<Route exact path='/book/:id/edit' render={(props) => <EditBook {...props} />} />
          
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap'


class App extends Component {
  constructor(props) {
    super(props)

  }
  render(){
    return(
      <div className="App">
        <Router>
          <Container>

          <Navigation />

          <Route exact path='/' component={Books} />

          <Route exact path="/addBook" component={AddBook} />

          </Container>
        </Router>
      </div>
    )
  }
}
export default App;


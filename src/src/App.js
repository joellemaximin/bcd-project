import React from 'react';
import AddBook from './Components/AddBook';
import Books from './Components/Books';
import EditBook from './Components/EditBook';
import Navigation from './Components/Navigation';
import Students from './Components/Students';
import Student from './Components/Student';
import AddStudent from './Components/AddStudent';
import EditStudent from './Components/EditStudent';
import AddCate from './Components/AddCate';
import Categories from './Components/Categories';
import EditCategory from './Components/EditCat';
import BookUnique from './Components/BookUnique'
          
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap'


const App = () => {

    return(
      <div className="App">
        <Router>
          <Container>

          <Navigation />

          <Route exact path='/' component={Books} />

          <Route exact path="/add-book" component={AddBook} />

          <Route exact path="/add-categories" component={AddCate} />

          <Route exact path="/add-student" component={AddStudent} />

          <Route path='/edit-book/:id' component={EditBook} />

          <Route path='/edit-student/:id' component={EditStudent} />

          <Route path='/edit-cat/:id' component={EditCategory} />

          <Route path='/book/:id' component={BookUnique} />

          <Route exact path="/categories-list" component={Categories} />

          <Route exact path="/students-list" component={Students} />

          <Route exact path="/profile-student/:id" component={Student} />




          </Container>
        </Router>
      </div>
    )
}

export default App;


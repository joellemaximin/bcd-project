import React, {Component} from 'react';


class PostBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }

    render(){
        return (
            <div>
                <h3>Ajouter un livre </h3>
                <form>
                    <div className='book'>
                        <label>Titre:</label>
                        <input
                          type='text'
                          name='Titre'
                          onChange={this.onChange}
                          value={this.state.title}
                        />
                    </div>
                    <div className='book'>
                        <label>Categorie:</label>
                        <input
                          type='text'
                          name='category'
                          onChange={this.onChange}
                          value={this.state.category}
                        />
                    </div>
                    <div className='book'>
                        <label>Edition:</label>
                        <input
                          type='text'
                          name='edition'
                          onChange={this.onChange}
                          value={this.state.edition}
                        />
                    </div>
                    <div className='book'>
                        <label>Année:</label>
                        <input
                          type='text'
                          name='year'
                          onChange={this.onChange}
                          value={this.state.year}
                        />
                    </div>
                    <div className='book'>
                        <label>Auteur:</label>
                        <input
                          type='text'
                          name='author'
                          onChange={this.onChange}
                          value={this.state.author}
                        />
                    </div>
                    <div className='book'>
                        <label>Details:</label>
                        <button> Modifier</button>
                        <button> Supprimer</button>
                    </div>   
                </form>
            </div>
        )
    }

}

export default PostBook;
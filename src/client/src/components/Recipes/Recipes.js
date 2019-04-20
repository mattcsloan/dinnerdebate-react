import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: null,
    };
  }

  async componentDidMount() {
    const recipes = (await axios.get('/api/recipes')).data;
    this.setState({
      recipes,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Recipes</h1>
        <hr />
        {this.state.recipes === null && <p>Loading recipes...</p>}
        {
          this.state.recipes && this.state.recipes.map(recipe => (
            <div key={recipe.key} >
              <Link
                to={{
                  pathname: `/recipes/view/${recipe.categoryKey}/${recipe.key}`,
                  state: { recipeId: recipe._id }
                }}
              >
                {recipe.name}
              </Link>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Recipes;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipes extends Component {

  async componentDidMount() {
    const { recipes, setRecipes } = this.props;
    if(recipes.length <= 1) {
      // Load initial recipes from db
      const recipes = (await axios.get('/api/recipes')).data;
      setRecipes(recipes);
    }
  }

  render() {
    const { recipes } = this.props;

    return (
      <div className="container">
        <h1>Recipes</h1>
        <hr />
        
        {recipes === null && <p>Loading recipes...</p>}
        {
          recipes && recipes.map(recipe => (
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
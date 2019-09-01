import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipe extends Component {
  async componentDidMount() {
    const { match: { params }, recipe } = this.props;
    // Recipe does not exist in store, so get it and add to store 
    if(!recipe) {
      await axios.get(`/api/recipes/${params.categoryKey}/${params.key}`)
        .then(response => {
          this.props.setRecipe(response.data);
        })
    }
  }

  render() {
    const { match: { params }, recipe } = this.props;
    
    if (recipe === null || recipe === undefined) return <p>Loading ...</p>;
    return (
      <div>
        <h1><Link to="/">Recipes</Link> &raquo; {recipe.name}</h1>

        <hr />
        <p>{recipe.description}</p>
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
        <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
        {recipe.ingredients && recipe.ingredients.map((ingredientList, index) => (
          <div key={index}>
            <h3>{ingredientList.title}</h3>
            <ul>
              {ingredientList.list.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          to={{
            pathname: `/recipes/edit/${params.categoryKey}/${params.key}`,
            state: { recipeId: recipe._id }
          }}
          className="btn"
        >
          Edit Recipe
        </Link>
      </div>
    )
  }
}

export default Recipe;
import React, { Component } from 'react';
import axios from 'axios';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const recipe = (await axios.get(`http://localhost:3001/api/recipes/${params.recipeId}`)).data;
    this.setState({
      recipe,
    });
  }

  render() {
    const { recipe } = this.state;
    if (recipe === null) return <p>Loading ...</p>;
    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <hr />
        <p>Category: {recipe.category}</p>
        <p>Prep Time: {recipe.prepTime}</p>
        <p>Cook Time: {recipe.cookTime}</p>
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
      </div>
    )
  }
}

export default Recipe;
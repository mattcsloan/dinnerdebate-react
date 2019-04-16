import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }

  async componentDidMount() {
    const { match: { params }, location: { state } } = this.props;
    console.log("props", this.props);
    let recipe;
    if(state && state.recipeId) {
      recipe = (await axios.get(`/api/recipes/${state.recipeId}`)).data;
    } else {
      recipe = (await axios.get(`/api/recipes/${params.categoryKey}/${params.key}`)).data;
    }
    this.setState({
      recipe,
    });
  }

  render() {
    const { recipe } = this.state;
    const { match: { params } } = this.props;

    if (recipe === null) return <p>Loading ...</p>;
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
          to={`/recipes/edit/${params.categoryKey}/${params.key}`}
          className="btn"
        >
          Edit Recipe
        </Link>
      </div>
    )
  }
}

export default Recipe;
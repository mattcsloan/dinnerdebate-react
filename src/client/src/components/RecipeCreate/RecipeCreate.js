import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import auth0Client from '../Authentication';
import IngredientSet from '../IngredientSet';

import categories from '../../data/recipeCategories';

class RecipeCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      name: '',
      key: '',
      description: '',
      category: '',
      categoryKey: '',
      date: '',
      source: '',
      sourceURL: '',
      addedBy: {},
      prepTime: 0,
      cookTime: 0,
      ingredients: [],
      directions: '',
      hints: [],
      pairings: [],
      image: {},
      servings: '',
      tags: [],
      featured: false,
      relatedItems: []
    };
  }

  componentDidMount() {
    this.setState({
      ingredients: [{
        title: 'This is a test',
        list: [
          "½ small poblano chile pepper, seeded",
          "3 tsp. extra-virgin olive oil",
          "kosher salt",
        ] 
      }, {
        title: 'A second list',
        list: [
          "stuff",
          "more stuff here",
        ] 
      }]
    })
  }

  updateValue(type, value) {
    type === "name" && this.createKey(value);
    this.setState({ [type]: value });
  }

  updateCategoryValues(label, value) {
    this.setState({
      "category": label,
      "categoryKey": value
    });
  }

  createKey = title => {
    if(title) {
      const titleKey = title.replace(/\W+/g, '-').toLowerCase();
      this.setState({"key": titleKey});
      return titleKey;
      // keyAvailability();
    } else {
      // vm.recipeKey = '';
      // vm.keyIsAvailable = true;
    }
  }

  createCategoryKey = category => {
    return category.replace(/\W+/g, '-').toLowerCase();
    // keyAvailability();
  }

  addIngredient = (value, index) => {
    const currentIngredients = this.state.ingredients;
    currentIngredients[index].list.push(value);
    this.setState({
      ingredients: currentIngredients
    })
  }

  async submit() {

    const {
      name,
      key, 
      description, 
      category, 
      categoryKey, 
      source, 
      sourceURL,
      addedBy,
      prepTime,
      cookTime,
      ingredients,
      directions,
      hints,
      pairings,
      image,
      servings,
      tags,
      featured,
      relatedItems
    } = this.state;

    this.setState({
      disabled: true,
    });

    await axios.post('/api/recipes', {
      name,
      key, 
      description, 
      category, 
      categoryKey,
      date: new Date(),
      source, 
      sourceURL,
      addedBy,
      prepTime,
      cookTime,
      ingredients,
      directions,
      hints,
      pairings,
      image,
      servings,
      tags,
      featured,
      relatedItems
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/');
  }

  render() {

    const { disabled, ingredients } = this.state;
    return (
      <div className="create-recipe">
        <h1>New Recipe</h1>
        <hr />
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("name", e.target.value)}
              placeholder="Recipe title"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("description", e.target.value)}
              placeholder="Describe your recipe"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              onChange={(e) => {
                this.updateCategoryValues(e.target[e.target.selectedIndex].innerHTML, e.target.value)
              }}
            >
              <option value="">Select a category...</option>
              {categories.map(category => <option key={category} value={this.createCategoryKey(category)}>{category}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Source:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("source", e.target.value)}
              placeholder="Name of recipe creator"
            />
          </div>
          <div className="form-group">
            <label>Source URL:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("sourceURL", e.target.value)}
              placeholder="URL to recipe (if applicable)"
            />
          </div>
          <div className="form-group">
            <label>Prep Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("prepTime", e.target.value)}
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label>Cook Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("cookTime", e.target.value)}
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label>Servings:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("servings", e.target.value)}
              placeholder=""
            />
          </div>

          {ingredients && ingredients.map((ingredientList, index) => (
            <div className="ingredient-group" key={`ingredient-group-${index}`}>
              <div className="form-group">
                <label>Ingredient Set Title:</label>
                <input
                  disabled={disabled}
                  type="text"
                  onChange={e => this.updateValue("servings", e.target.value)}
                  placeholder=""
                />
              </div>
              <IngredientSet title={ingredientList.title} ingredients={ingredientList.list} />
              <div className="form-group">
                <input
                  disabled={disabled}
                  type="text"
                  onBlur={e => this.addIngredient(e.target.value, index)}
                  placeholder="Add ingredient"
                />
              </div>
              <button
                disabled={disabled}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          ))}
          
          <div className="form-group">
            <label>Directions:</label>
            <textarea
              disabled={disabled}
              type="text"
              onChange={e => this.updateValue("directions", e.target.value)}
              placeholder="Enter recipe directions"
            >
            </textarea>
          </div>
          <button
            disabled={disabled}
            className="btn btn-primary"
            onClick={() => {this.submit()}}
          >
            Create Recipe
          </button>
        </form>


      {/*TODO:
      addedBy,
      ingredients,
      hints,
      pairings,
      image,
      tags,
      relatedItems */}




      </div>
    )
  }
}

export default withRouter(RecipeCreate);
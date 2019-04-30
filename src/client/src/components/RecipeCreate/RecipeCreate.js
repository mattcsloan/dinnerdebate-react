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
      image: {},
      servings: '',
      tags: [],
      featured: false,
      relatedItems: []
    };
  }

  componentDidMount() {
    // Move to defaultProps
    this.setState({
      ingredients: [{
        title: '',
        list: [
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
    if(value !== '') {
      const currentIngredients = this.state.ingredients;
      currentIngredients[index].list.push(value);
      this.setState({
        ingredients: currentIngredients
      });
    }
  }

  addIngredientSet = () => {
    const currentIngredients = this.state.ingredients;
    currentIngredients.push({
      title: '',
      list: []
    });

    this.setState({
      ingredients: currentIngredients
    })

  }

  addHint = value => {
    if(value !== '') {
      const currentHints = this.state.hints;
      currentHints.push(value);
      this.setState({
        hints: currentHints
      });
    }
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

    const { disabled, ingredients, hints } = this.state;
    return (
      <div className="create-recipe">
        <h1>New Recipe</h1>
        <hr />
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
          <form key={`ingredient-group-${index}`}>
            <div className="ingredient-group">
              {ingredients.length > 1 && (
                <div className="form-group">
                  <label>Ingredient Set Title:</label>
                  <input
                    disabled={disabled}
                    type="text"
                    onChange={e => {}}
                    placeholder=""
                  />
                </div>
              )}
              <h3>{ingredients.length > 1 ? ingredientList.title : 'Ingredients'}</h3>
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
                type="button"
                disabled={disabled}
                className="btn btn-primary"
              >
                Add Ingredient
              </button>
            </div>

          </form>
        ))}

        <button
          type="button"
          disabled={disabled}
          className="btn btn-link"
          onClick={this.addIngredientSet}
        >
          Add New Set of Ingredients
        </button>
        
        <div className="form-group">
          <label>Directions:</label>
          <textarea
            disabled={disabled}
            onChange={e => this.updateValue("directions", e.target.value)}
            placeholder="Enter recipe directions"
          >
          </textarea>
        </div>

        <div className="form-group">
          <label>Hint:</label>
          <div className="hints">
            {hints && hints.map(hint => (
              <div className="hint">
                {hint}
              </div>
            ))}
            <input
              disabled={disabled}
              type="text"
              onBlur={e => this.addHint(e.target.value)}
              placeholder="Add special note/hint"
            />
          </div>
        </div>
        <button
          disabled={disabled}
          className="btn btn-primary"
          onClick={() => {this.submit()}}
        >
          Create Recipe
        </button>


      {/*TODO:
      addedBy,
      ingredients,
      hints,
      image,
      tags,
      relatedItems */}




      </div>
    )
  }
}

export default withRouter(RecipeCreate);
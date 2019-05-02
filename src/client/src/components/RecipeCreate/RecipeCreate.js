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
      relatedItems: [],
      editHintNum: null,
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
    const currentHints = this.state.hints;
    if(value !== '' && currentHints.indexOf(value) === -1) {
      currentHints.push(value);
      this.setState({
        hints: currentHints
      });
    }
  }

  enterEditHintMode = itemIndex => {
    this.setState({
      editHintNum: itemIndex
    })
  }

  editHint = (itemIndex, value) => {
    const currentHints = this.state.hints;
    // check first to see if value already exists in array
    if(currentHints.indexOf(value) === -1) {
      currentHints.splice(itemIndex, 1, value);
      this.setState({
        hints: currentHints,
        editHintNum: null
      });
    }
  }

  removeHint = item => {
    const currentHints = this.state.hints;
    currentHints.splice(item, 1);
    this.setState({
      hints: currentHints
    });
  }

  addTag = value => {
    const currentTags = this.state.tags;
    if(value !== '' && currentTags.indexOf(value) === -1) {
      currentTags.push(value);
      this.setState({
        tags: currentTags
      });
    }
  }

  removeTag = item => {
    const currentTags = this.state.tags;
    currentTags.splice(item, 1);
    this.setState({
      tags: currentTags
    });
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

    const { 
      disabled, 
      ingredients, 
      hints, 
      editHintNum, 
      tags, 
    } = this.state;

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
            {hints && hints.map((hint, index) => (
              <div className="hint" key={`hint-${index}`}>
                {editHintNum === index ? (
                  <input
                    disabled={disabled}
                    type="text"
                    defaultValue={hint}
                    onBlur={e => this.editHint(index, e.target.value)}
                  />
                ) : (
                  <span>{hint}</span>
                )}
                <a onClick={() => this.enterEditHintMode(index)}>Edit</a>
                <a onClick={() => this.removeHint(index)}>X</a>
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

        <div className="form-group">
          <label>Tags:</label>
          <div className="tags">
            {tags && tags.map((tag, index) => (
              <div className="tag" key={`tag-${index}`}>
                <span>{tag}</span>
                <a onClick={() => this.removeTag(index)}>X</a>
              </div>
            ))}
          </div>
          <input
            disabled={disabled}
            type="text"
            onBlur={e => this.addTag(e.target.value)}
            placeholder="Add tag(s)"
          />
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
      image,
      relatedItems */}




      </div>
    )
  }
}

export default withRouter(RecipeCreate);
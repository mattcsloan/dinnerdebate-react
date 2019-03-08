import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import auth0Client from '../Authentication';

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

  updateValue(type, value) {
    this.setState({
      [type]: value,
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

    await axios.post('http://localhost:3001/api/recipes', {
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
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/');
  }

  render() {

    const { disabled } = this.state;
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
              onChange={(e) => {this.updateValue("name", e.target.value)}}
              placeholder="Recipe title"
            />
          </div>
          <div className="form-group">
            <label>Key:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("key", e.target.value)}}
              placeholder="Unique number"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("description", e.target.value)}}
              placeholder="Describe your recipe"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("category", e.target.value)}}
              placeholder="Select a category"
            />
          </div>
          <div className="form-group">
            <label>Category Key:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("categoryKey", e.target.value)}}
              placeholder="Unique category number"
            />
          </div>
          <div className="form-group">
            <label>Source:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("source", e.target.value)}}
              placeholder="Name of recipe creator"
            />
          </div>
          <div className="form-group">
            <label>Source URL:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("sourceURL", e.target.value)}}
              placeholder="URL to recipe (if applicable)"
            />
          </div>
          <div className="form-group">
            <label>Prep Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("prepTime", e.target.value)}}
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label>Cook Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("cookTime", e.target.value)}}
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label>Servings:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("servings", e.target.value)}}
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label>Directions:</label>
            <textarea
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("directions", e.target.value)}}
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






      </div>
    )
  }
}

export default withRouter(RecipeCreate);
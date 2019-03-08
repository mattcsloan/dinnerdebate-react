import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import auth0Client from '../Authentication';

class RecipeEdit extends Component {
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

  async componentDidMount() {
    const { match: { params } } = this.props;
    const recipe = (await axios.get(`http://localhost:3001/api/recipes/${params.recipeId}`)).data;
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
    } = recipe;

    this.setState({
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
    });
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
    await axios.put(`http://localhost:3001/api/recipes/${categoryKey}/${key}/${this.props.match.params.recipeId}`, {
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

  async deleteRecipe() {
    this.setState({
      disabled: true,
    });

    await axios.delete(`http://localhost:3001/api/recipes/${this.props.match.params.recipeId}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    this.props.history.push('/');
  }

  render() {

    const {
      disabled,
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
    return (
      <div className="create-recipe">
        <h1><Link to="/">Recipes</Link> &raquo; <Link to={`/recipes/view/${this.props.match.params.recipeId}`}>{name}</Link> &raquo; Edit</h1>
        <hr />
        <form>
        <div className="form-group">
            <label>Name:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("name", e.target.value)}}
              placeholder="Recipe title"
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Key:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("key", e.target.value)}}
              placeholder="Unique number"
              value={key}

            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("description", e.target.value)}}
              placeholder="Describe your recipe"
              value={description}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("category", e.target.value)}}
              placeholder="Select a category"
              value={category}
            />
          </div>
          <div className="form-group">
            <label>Category Key:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("categoryKey", e.target.value)}}
              placeholder="Unique category number"
              value={categoryKey}
            />
          </div>
          <div className="form-group">
            <label>Source:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("source", e.target.value)}}
              placeholder="Name of recipe creator"
              value={source}
            />
          </div>
          <div className="form-group">
            <label>Source URL:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("sourceURL", e.target.value)}}
              placeholder="URL to recipe (if applicable)"
              value={sourceURL}
            />
          </div>
          <div className="form-group">
            <label>Prep Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("prepTime", e.target.value)}}
              placeholder=""
              value={prepTime}
            />
          </div>
          <div className="form-group">
            <label>Cook Time:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("cookTime", e.target.value)}}
              placeholder=""
              value={cookTime}
            />
          </div>
          <div className="form-group">
            <label>Servings:</label>
            <input
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("servings", e.target.value)}}
              placeholder=""
              value={servings}
            />
          </div>
          <div className="form-group">
            <label>Directions:</label>
            <textarea
              disabled={disabled}
              type="text"
              onChange={(e) => {this.updateValue("directions", e.target.value)}}
              placeholder="Enter recipe directions"
              value={directions}
            >
            </textarea>
          </div>
          <button
            disabled={disabled}
            className="btn btn-primary"
            onClick={() => {this.submit()}}
          >
            Update Recipe
          </button>
        </form>
        <button
          disabled={disabled}
          className="btn btn-warning"
          onClick={() => {this.deleteRecipe()}}
        >
          Delete Recipe
        </button>
      </div>
    )
  }
}

export default withRouter(RecipeEdit);
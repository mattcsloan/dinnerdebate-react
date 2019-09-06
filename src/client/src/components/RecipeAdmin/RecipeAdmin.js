import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import auth0Client from '../Authentication';
import IngredientSet from '../IngredientSet';

import categories from '../../data/recipeCategories';

class RecipeAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
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
      ingredients: [{
        title: '',
        list: [] 
      }],
      directions: '',
      hints: [],
      image: {
        url: '',
        width: null,
        height: null
      },

      servings: '',
      tags: [],
      relatedItems: [],
      editHintNum: null,
    };
  }

  isExistingRecipe = () => this.props.location && this.props.location.state && this.props.location.state.recipeId;

  componentDidMount() {
    const { recipe } = this.props;
    if(recipe) {
      const {
        _id,
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
        relatedItems
      } = recipe;  

      this.setState({
        _id,
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
        relatedItems
      });  
    }

    !recipe && this.isExistingRecipe() && this.getExistingRecipe();
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipe } = this.props;
    // Ensure there wasn't a recipe object before (meaning we didn't just delete it), 
    // there is not currently a recipe object that was passed from props (already in redux store),
    // and there should be a matching recipe in the DB (we know because we have an ID for it)
    !prevProps.recipe && !recipe && this.isExistingRecipe() && this.getExistingRecipe();
  }

  async getExistingRecipe() {
    const { match: { params } } = this.props;
    // Recipe does not exist in store, so get it and add to store 
    await axios.get(`/api/recipes/${params.categoryKey}/${params.key}`)
      .then(response => {
        if(response.data) {
          this.props.setRecipe(response.data);

          const {
            _id,
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
            relatedItems
          } = response.data;
      
          this.setState({
            _id,
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
            relatedItems
          });        
        } else {
          console.log("Recipe does not exist.");
          this.props.history.push('/');
        }
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
      relatedItems
    } = this.state;

    this.setState({
      disabled: true,
    });

    const fullRecipe = {
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
      relatedItems
    };

    // determine whether to update or create recipe
    if(this.isExistingRecipe()) {
      await axios.put(
        `/api/recipes/${this.state.categoryKey}/${this.state.key}/${this.state._id}`,
        fullRecipe, 
        {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }
      )
        .then(response => {
          if(response.statusText === 'Created') {
            this.dispatchAndRoute('update', response.data);
          }
        });
    } else {
      await axios.post(
        '/api/recipes',
        fullRecipe, 
        {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }
      )
        .then(response => {
          if(response.statusText === 'Created') {
            this.dispatchAndRoute('create', response.data);
          }
        });
    }
  }

  dispatchAndRoute = (type, data) => {
    type === 'create'
      ? this.props.createRecipe(data)
      : this.props.updateRecipe(data, data._id);
  
    const { categoryKey, key, _id } = data;
    this.props.history.push({
      pathname: `/recipes/view/${categoryKey}/${key}`,
      state: { recipeId: _id }
    });
  }

  cancel = () => {
    if(this.isExistingRecipe()) {
      const { categoryKey, key, _id } = this.props.recipe;
      this.props.history.push({
        pathname: `/recipes/view/${categoryKey}/${key}`,
        state: { recipeId: _id }
      });
    } else {
      this.props.history.push('/');
    }
  }

  async deleteRecipe() {
    const { recipe, deleteRecipe, history } = this.props;
    this.setState({
      disabled: true,
    });

    await axios.delete(`/api/recipes/${recipe._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
      .then(response => {
        if(response.status === 200) {
          deleteRecipe(recipe._id);
          history.push('/');
        }
      });
  }

  uploadFile = (e) => {
    if(e.target.files[0]) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      axios.post('/api/upload',
        data
      )
        .then(response => {
          if(response.status === 200) {
            const { fileUrl, fileWidth, fileHeight } = response.data;
            this.setState({
              image: {
                url: fileUrl,
                width: fileWidth,
                height: fileHeight
              }
            });

          }
        });  
    }
  }

  removeImage = () => {
    this.setState({
      image: {
        url: '',
        width: null,
        height: null
      },
    });

    let publicId = this.state.image.url.split('/');
    publicId = publicId[publicId.length - 2] + '/' + publicId[publicId.length - 1];
    publicId = publicId.replace(/\//g, "%2F");

    axios.delete(`/api/upload?id=${publicId}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })
      .then(response => {
        console.log("response", response);
      });  
  }

  render() {
    const {
      disabled,
      name,
      description, 
      categoryKey, 
      source, 
      sourceURL,
      // addedBy,
      prepTime,
      cookTime,
      ingredients,
      directions,
      hints,
      editHintNum,
      image,
      servings,
      tags,
      // relatedItems
    } = this.state;

    return (
      <div className="recipe-admin">
        <h1>{this.isExistingRecipe() ? `Update Recipe: ${this.props.recipe && this.props.recipe.name}` : 'Add New Recipe'}</h1>
        <hr />
        <div className="form-group">
          <label>Name:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("name", e.target.value)}
            placeholder="Recipe title"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("description", e.target.value)}
            placeholder="Describe your recipe"
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            onChange={(e) => {
              this.updateCategoryValues(e.target[e.target.selectedIndex].innerHTML, e.target.value)
            }}
            value={categoryKey}
          >
            <option value="">Select a category...</option>
            {categories.map(category => 
              <option key={category} value={this.createCategoryKey(category)}>{category}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Source:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("source", e.target.value)}
            placeholder="Name of recipe creator"
            value={source}
          />
        </div>
        <div className="form-group">
          <label>Source URL:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("sourceURL", e.target.value)}
            placeholder="URL to recipe (if applicable)"
            value={sourceURL}
          />
        </div>
        <div className="form-group">
          <label>Prep Time:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("prepTime", e.target.value)}
            placeholder=""
            value={prepTime}
          />
        </div>
        <div className="form-group">
          <label>Cook Time:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("cookTime", e.target.value)}
            placeholder=""
            value={cookTime}
          />
        </div>
        <div className="form-group">
          <label>Servings:</label>
          <input
            disabled={disabled}
            type="text"
            onChange={e => this.updateValue("servings", e.target.value)}
            placeholder=""
            value={servings}
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
                <button
                  type="button"
                  disabled={disabled}
                  className="btn btn-primary btn-small"
                >
                  Add Ingredient
                </button>
              </div>
            </div>

          </form>
        ))}

        <button
          type="button"
          disabled={disabled}
          className="btn btn-link btn-small"
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
            value={directions}
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
                <button className="anchor" onClick={() => this.enterEditHintMode(index)}>Edit</button>
                <button className="anchor" onClick={() => this.removeHint(index)}>X</button>
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
          <input
            disabled={disabled}
            type="text"
            onBlur={e => this.addTag(e.target.value)}
            placeholder="Add tag(s)"
          />
        </div>
        {tags && 
          <div className="tags">
            {tags.map((tag, index) => (
              <div className="tag" key={`tag-${index}`}>
                <span>{tag}</span>
                <button className="anchor" onClick={() => this.removeTag(index)}>X</button>
              </div>
            ))}
          </div>
        }

        {image.url !== '' ? ( 
          <>
            <img className="upload-preview" src={image.url} alt={name} />
            <div className="btn-group">
              <button 
                className="btn-subtle"
                onClick={() => this.removeImage()}
              >
                Remove Image
              </button>
            </div>
          </>
        ) : (
          <label className="btn upload-btn">
            Select File To Upload
            <input onChange={e => this.uploadFile(e)} type="file" accept="image/*" />
          </label>

        )
        }

      {/*TODO:
      addedBy,
      relatedItems */}

        <div className="btn-group">
          <button
            disabled={disabled}
            className="btn btn-primary"
            onClick={() => {this.submit()}}
          >
            {this.isExistingRecipe() ? 'Update Recipe' : 'Create Recipe'}
          </button>
          <button
            disabled={disabled}
            className="btn btn-link"
            onClick={() => {this.cancel()}}
          >
            Cancel
          </button>
          {this.isExistingRecipe() &&
            <button
              disabled={disabled}
              className="btn btn-warning btn-small"
              onClick={() => {this.deleteRecipe()}}
            >
              Delete Recipe
            </button>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(RecipeAdmin);
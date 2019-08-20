import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { updateTitle } from '../../actions';

const mapStateToProps = state => ({
  title: state.title
 });

const mapDispatchToProps = dispatch => ({
  updateTitle: title => dispatch(updateTitle(title))
 });

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: null,
      inputtedTitle: ''
    };
  }

  async componentDidMount() {
    const recipes = (await axios.get('/api/recipes')).data;
    this.setState({
      recipes,
    });
  }

  updateTitle = e => {
    e.preventDefault();
    this.props.updateTitle(this.state.inputtedTitle);
    this.setState({ inputtedTitle: '' });
   }

   updateValue = e => {
     this.setState({ inputtedTitle: e.target.value });
   }

  render() {
    const { title } = this.props;

    return (
      <div className="container">
        <h1>Recipes</h1>
        <hr />
        <form onSubmit={this.updateTitle}>
          <input type="text" onChange={this.updateValue} value={this.state.inputtedTitle} placeholder="Enter Title" />
          <button onClick={this.updateTitle}>Change Title!</button>
        </form>
        {title && <h1>{title}</h1>}
        

        {this.state.recipes === null && <p>Loading recipes...</p>}
        {
          this.state.recipes && this.state.recipes.map(recipe => (
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
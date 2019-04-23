import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        title: '',
        list: []
      },
    };
  }

  render() {
    const { ingredients, title } = this.props;

    return (
      <div>
        <h3>{title}</h3>
          {ingredients && 
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          }
      </div>
    )
  }
}

export default Recipe;
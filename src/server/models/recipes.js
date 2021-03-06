var mongoose = require('mongoose');

module.exports = mongoose.model('Recipes', {
    name : {type : String, default: ''},
    key : {type : String, default: ''},
    description : {type : String, default: ''},
    category : {type : String, default: ''},
    categoryKey : {type : String, default: ''},
    date : {type : Date},
    source : {type : String, default: ''},
    sourceURL : {type : String, default: ''},
    addedBy : {
        username : {type : String, default: '' },
        fullName : {type : String, default: '' }
    },
    prepTime : {type : Number, default: ''},
    cookTime : {type : Number, default: ''},
    ingredients : [{
        title: {type : String, default: ''},
        list: {type : Array, default: []}
    }],
    directions : {type : String, default: ''},
    hints : {type : Array, default: []},
    image : {
        url: {type : String, default: ''},
        width: {type : Number, default: ''},
        height: {type : Number, default: ''}
    },
    servings : {type : String, default: ''},
    tags : {type : Array, default: []},
    featured : {type : Boolean, default: false},
    relatedItems : {type : Array, default: []}
});
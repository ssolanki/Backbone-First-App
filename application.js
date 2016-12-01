// Backbone Animal Model
var Animal = Backbone.Model.extend({
  defaults:{
    name: "Lion",
    color: "Yellow"
  },
  validate: function(attrs,options){
    if(!attrs.name){
      console.log("Animal don\"t have any name!");
    }
    if(attrs.name.length < 3){
      console.log("Animal name must have more than 2 characters");
    }
  },
  sleep: function(){
    console.log(this.name + " is sleeping!");
  }
});

// Backbone Animal View
var AnimalView = Backbone.View.extend({
  tagName: "li",
  className: "animal",
  id: "dogs",
  events: {
    "click": "logAnimal",
    "click .edit": "editAnimal",
    "click .delete": "deleteAnimal"
  },
  createTemplate: _.template($('#dogTemplate').html()),
  initialize: function(){
    this.render();    // render define logic for the app
    this.on("change",function(){
      console.log("Your model is changed!");
    });
    this.model.on('change', this.render, this); // calls render function once name changed
    this.model.on('destroy', this.remove, this); // calls remove function once model deleted
  },
  logAnimal: function(){
    console.log("animal is clicked!");
  },
  editAnimal: function(){
    var newAnimal = prompt("New animal name:", this.model.get('name')); // prompts for new name
    if (!newAnimal)return;  // no change if user hits cancel
    this.model.set('name', newAnimal); // sets new name to model

  },
  deleteAnimal: function(){
    this.model.destroy(); // deletes the model when delete button clicked
  },
  render: function(){
    // this.model is to get animal model
    // $el is reference to don element, must use el in views.
    this.$el.html(this.createTemplate(this.model.toJSON()));
  },
  remove: function(){
    this.$el.remove(); // removes the HTML element from view when delete button clicked/model deleted
  }
});

// Backbone Animals View , uses animalView created above
var AnimalsView = Backbone.View.extend({
  tagName: "ul",
  initialize: function(){
    console.log(this.collection.models);
    this.render();
  },
  render: function(){
    this.collection.each(function(Animal){
      var animalView = new AnimalView({model:Animal});
      $(document.body).append(animalView.el);
    });
  }
})

// Backbone Animal Collection
var AnimalCollection = Backbone.Collection.extend({
  model: Animal
});

var dog = new Animal({name: "Tom", color: "Red"});
var dogView = new AnimalView({model: dog});
var animalCollection = new AnimalCollection();
animalCollection.add(dog);
var cat = new Animal({name: "Lisa", color: "Yellow"});
var catView = new AnimalView({model: cat});
animalCollection.add(cat); // collections add method will add model into array
animalCollection.add([
  {
    name: "Sugar",
    color: "black",
  },
  {
    name: "Gizmo",
    color: "tan",
  },
  {
    name: "Biscuit",
    color: "brown",
  }
]);

// create collection view from animal collection
var animalsView = new AnimalsView({collection: animalCollection});

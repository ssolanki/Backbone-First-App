// Backbone Model
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

// Backbone Views

var AnimalView = Backbone.View.extend({
  tagName: "li",
  className: "animal",
  id: "dogs",
  events: {
    "click": "logAnimal",
    "click .edit": "editAnimal",
    "click .delete": "deleteAnimal"
  },
  createTemplate: _.template("<%= name %> is <%= color %>."),
  initialize: function(){
    this.render();    // render define logic for the app
    this.on("change",function(){
      console.log("Your model is changed!");
    });
  },
  render: function(){
    // this.model is to get animal model
    // $el is reference to don element, must use el in views.
    this.$el.html(this.createTemplate(this.model.toJSON()));
  }
});

var AnimalCollection = Backbone.Collection.extend({
  model: Animal
});

var dog = new Animal({name: "Tom", color: "Red"});
var dogView = new AnimalView({model: dog});
var animalCollection = new AnimalCollection();
animalCollection.add(dog);
var cat = new Animal({name: "Lisa", color: "Yellow"});
var catView = new AnimalView({model: cat});
animalCollection.add(cat);
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

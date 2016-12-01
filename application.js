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

var animalView = Backbone.View.extend({
  tagName: "li",
  className: "animal",
  id: "dogs",
  events: {
    "click": "logAnimal",
    "click .edit": "editAnimal",
    "click .delete": "deleteAnimal"
  },
  initialize: function(){
    this.render();    // render define logic for the app
    this.on("change",function(){
      console.log("Your model is changed!");
    })
  },
  render: function(){
    // this.model is to get animal model
    // $el is saying
    this.$el.html(this.model.get("name") + " is " + this.model.get("color"));
  }
});

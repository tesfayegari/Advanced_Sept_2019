(function () {
  "use strict";

  function square(x) { return x * x; }

  var square1 = function (x) { return x * x; }

  function powerOf4(x) {
    return Math.pow(x, 4);
  }

  //Object
  var mekdi = {
    full_name: 'Mekdes Abebe',
    homeEmail: 'test@email.com',
    dob: 2010,
    tellName: function () { console.log('I am ' + this.full_name); }
  }

  var animal = {
    type: 'Dog',
    age: 4,
    name: 'Rocky',
    picture: 'https://imgc.artprintimages.com/img/print/shar-pei-puppy-side-view_u-l-q106cml0.jpg',
    color: 'Brown',
    mamal: true,
    children: [],
    owner: {
      full_name: 'Mekdes Abebe',
      homeEmail: 'test@email.com',
      dob: 2010
    },
    sayName: function () { console.log('Hi I am ' + this.name); }
  }
  //test
  console.log(animal.name)
  console.log(animal.owner.phone)
  animal.sayName()
  //JSON
  var mekdiJson = {
    'full_name': 'Mekdes Abebe',
    'homeEmail': 'test@email.com',
    'dob': 2010
  }

  //Object to JSON => Example mekdi to JSON data
  console.log(JSON.stringify(mekdi));
  console.log(JSON.stringify(animal));
  var jsonAnimal = `{
    "type": "Dog",
    "age": 4,
    "name": "Rocky",
    "picture": "https://imgc.artprintimages.com/img/print/shar-pei-puppy-side-view_u-l-q106cml0.jpg",
    "color": "Brown",
    "mamal": true,
    "children": [],
    "owner": {
      "full_name": "Mekdes Abebe",
      "homeEmail": "test@email.com",
      "dob": 2010
    }
  }`;

  console.log(JSON.parse(jsonAnimal))

  document.getElementById('customDiv').innerHTML = '<h2>Whats up</h2>'
  
  

})();

$(document).ready(function(){

  $("h1").click(function(){
    $(this).hide();
  });

});

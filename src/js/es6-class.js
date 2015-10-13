class SomeClass {

  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  sayName () {
    console.log(this.name);
  }

  sayAge () {
    console.log(this.age);
  }
}

var mySomeClass = new SomeClass('taro', 30);

mySomeClass.sayName();
mySomeClass.sayAge();

const hello = function hello() {
  console.log('Hello world');
};

function hello2() {
  console.log('Hello world');
}

function hello3() {
  return console.log('Hello world!!');
}

hello();
hello2();
hello3();

class Car {
  constructor(year, color) {
    this.year = year;
    this.color = color;
  }

  printProperties() {
    console.log(`${this.year} ${this.color}`);
  }
}

const myCar = new Car(5900, 'red');
myCar.printProperties();

import color from 'color'

class Dog{
    constructor(name){
        this.name = name;        
    }

    bark(){
        color().hex(1);
        return `Wah wah, I am ${this.name}`;
    }
}

export default Dog;
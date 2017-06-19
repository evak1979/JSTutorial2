import Dog from './dog';
import color from 'color';

const mockColorFunc = jest.fn(() => console.log(1));
const mockColor = 
jest.mock('color', () => {
    return function(){
        return{
            hex: mockColorFunc
        };
    }
});

test('Dog.Bark', () =>{    
    const testDog = new Dog('Test');
    expect(testDog.bark()).toBe('Wah wah, I am Test');
    expect(mockColorFunc.hex).toHaveBeenCalledWith(1);
})
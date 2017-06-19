import Dog from './dog';
import color from 'color';

const mockColorFunc = jest.fn(() => console.log(1));
const mockColorFunc2 = jest.fn(() => console.log(2));
jest.mock('color', () => {
    return function(){
        return{
            hex: mockColorFunc
        };
    }
});

color.something = mockColorFunc2;

test('Dog.Bark', () =>{    
    const testDog = new Dog('Test');
    expect(testDog.bark()).toBe('Wah wah, I am Test');
    expect(mockColorFunc).toHaveBeenCalled();
    expect(mockColorFunc2).toHaveBeenCalledWith(3);
})
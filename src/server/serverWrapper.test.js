import compression from 'compression';
import express from 'express';
import ExpressWrapper, {anonymousFunction} from './serverWrapper'
import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'

const mockUse = jest.fn();
const mockGet = jest.fn();
const mockListen = jest.fn();
const mockStatic = jest.fn(() => console.log('called'));
var expressWrapper;

jest.mock('compression');
jest.mock('express', () =>{
    return function(){
        return {
        use: mockUse,
        get: mockGet,
        listen: mockListen
        };
    };
});

express.static = mockStatic;

beforeEach(() => {
    expressWrapper = new ExpressWrapper();
    expressWrapper.spawnServer();
})

test('Should call use with compression', ()=>{    
    expect(mockUse).toHaveBeenCalledWith(compression());    
})

test('Should call use with compression', ()=>{    
    expect(mockUse).toHaveBeenCalledWith(compression());    
})

test('Should call use with static path', ()=>{        
    expect(mockUse).toHaveBeenCalledWith(STATIC_PATH, express.static());    
})

test('Should static with dist', ()=>{        
    expect(express.static).toHaveBeenCalledWith('dist');
})

test('Should static with public', ()=>{          
    expect(express.static).toHaveBeenCalledWith('public');    
})

test('Should call listen with web_port', ()=>{        
    expect(mockListen).toHaveBeenCalledWith(WEB_PORT);
})
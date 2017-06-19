import compression from 'compression';
import express from 'express';
import ExpressWrapper, {anonymousFunction} from './index'
import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'

const mockUse = jest.fn();
const mockGet = jest.fn();
const mockListen = jest.fn();
const mockStatic = jest.fn(() => console.log('called'));

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

test('Should call use with compression', ()=>{
    var expressWrapper = new ExpressWrapper();
    expressWrapper.spawnServer();

    expect(mockUse).toHaveBeenCalledWith(compression());
    expect(mockUse).toHaveBeenCalledWith(STATIC_PATH, express.static());
    expect(express.static).toHaveBeenCalledWith('dist');
    expect(express.static).toHaveBeenCalledWith('public');
    expect(mockListen).toHaveBeenCalledWith(WEB_PORT);
})
import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer'
import { shallow } from 'enzyme';
import { cleanup, fireEvent, render } from '@testing-library/react'
import Button from '../Button'

it("Initial Test", () => {
    let value = 0;
    function testClick() {
        value++;
    }


    const button = shallow(
        <Button label="Test" type="primary" onClick={testClick}></Button>
    )
    
    button.find("button").simulate("click");
    expect(value).toEqual(1);
})
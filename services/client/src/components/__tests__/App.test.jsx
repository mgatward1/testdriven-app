import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from '../../App';

test('App renders without crashing', () => {
  const wrapper = shallow(<App/>);
});

//test('About renders a snapshot properly', () => {
 //   const tree = renderer.create(<About/>).toJSON();
 //   expect(tree).toMatchSnapshot();
 // });
import React from 'react';
import {shallow} from 'enzyme';

import CopiableText from '../';

describe('CopiableText', () => {
    it('snapshot', () => {
        const wrapper = shallow(<CopiableText />);

        expect(wrapper).toMatchSnapshot();
    });
});

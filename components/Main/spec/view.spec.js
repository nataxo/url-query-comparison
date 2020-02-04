import View from '../view';
import {shallow} from 'enzyme';

describe('main view', () => {
    it('renders', () => {
        const props = {
            equal: 'equal',
            difference: ['diff1', 'diff2'],
        };

        expect(shallow(<View {...props} />)).toMatchSnapshot();
    });
});

import Main from '../';
import {shallow, mount} from 'enzyme';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

describe('Main content', () => {
    it('should match snapshot by default', () => {
        const component = shallow(<Main />);
        expect(component).toMatchSnapshot();
    });
    it('should match snapshot with query params', async done => {
        const query = {
            first: 'https://github.com?a=1',
            second: 'https://github.com?b=1',
        };

        const component = mount(
            <RouterContext.Provider value={{query}}>
                <Main />
            </RouterContext.Provider>,
        );
        setImmediate(() => {
            component.update();
            done(expect(component).toMatchSnapshot());
        });
    });
});

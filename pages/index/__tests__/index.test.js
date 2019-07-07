import IndexPage from '../index';
import {shallow, mount} from 'enzyme';
import {RouterContext} from 'next-server/dist/lib/router-context';

describe('IndexPage', () => {
    it('should match snapshot by default', () => {
        const component = shallow(<IndexPage />);

        expect(component).toMatchSnapshot();
    });

    it('should match snapshot with query params', async done => {
        const query = {
            first: 'https://github.com?a=1',
            second: 'https://github.com?b=1',
            ignore: 'test',
        };
        const props = await IndexPage.getInitialProps({query});
        const component = mount(
            <RouterContext.Provider value={{query}}>
                <IndexPage />
            </RouterContext.Provider>,
        );

        setImmediate(() => {
            component.update();
            done(expect(component).toMatchSnapshot());
        });
    });
});

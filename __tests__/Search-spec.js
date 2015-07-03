/**
 * Created by urielbertoche on 02/07/15.
 */

jest.dontMock('../src/components/Search');

describe('Search', () => {
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let Search = require('../src/components/Search');

  it('should exists', () => {
    // Render into document
    let search = TestUtils.renderIntoDocument(<Search />);
    expect(TestUtils.isCompositeComponent(search)).toBeTruthy();
  });
});
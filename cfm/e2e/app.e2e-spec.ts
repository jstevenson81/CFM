import { CfmPage } from './app.po';

describe('cfm App', () => {
  let page: CfmPage;

  beforeEach(() => {
    page = new CfmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

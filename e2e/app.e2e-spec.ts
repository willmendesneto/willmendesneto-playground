import { AppPage } from './app.po';

describe('willmendesneto-playground App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display `willmendesneto-playground`', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('willmendesneto-playground');
  });
});

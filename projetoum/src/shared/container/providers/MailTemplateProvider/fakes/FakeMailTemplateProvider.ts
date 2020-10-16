import IMailTemplatePovider from '../models/IMailTemplatePovider';

class FakeMailTemplateProvider implements IMailTemplatePovider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;

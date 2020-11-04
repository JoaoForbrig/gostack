import IMailTemplatePovider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplatePovider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;

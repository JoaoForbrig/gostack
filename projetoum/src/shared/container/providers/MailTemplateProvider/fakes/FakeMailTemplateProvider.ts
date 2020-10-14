import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplatePovider from '../models/IMailTemplatePovider';

class FakeMailTemplateProvider implements IMailTemplatePovider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;

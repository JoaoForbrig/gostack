import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplatePovider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

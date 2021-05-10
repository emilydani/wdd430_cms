export class Document {

  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<any>;

  constructor(id:string, name:string, decription:string, url: string, children:Array<any>){
    this.id = id;
    this.name = name;
    this.description = decription;
    this.url = url;
    this.children = children;
  }
}

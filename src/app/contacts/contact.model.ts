export class Contact {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public imagePath: string,
    public group: Contact[]
  ) {}
}

export default class BulletinPost {
  //field
  public id: string;
  public subject: string;
  public message: string;
  public postDate: Date;
  public likes: number;
  public imageUrl: string;

  //constructor 
  constructor(subject: string, message: string, imageUrl: string) {
    this.id = this.guid();
    this.subject = subject;
    this.message = message;
    this.postDate = new Date();
    this.likes = 0;
    this.imageUrl = imageUrl || 'https://images.spot.im/v1/production/ozcl1imileazzca9toah'
  }

  addLike() {
    this.likes++;
  }

  removeLike(): void {
    this.likes > 0 && this.likes--;
  }

  private guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}

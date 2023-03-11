class Place {
  constructor(title, image, address, location) {
    this.title = title;
    this.image = image;
    this.address = address;
    this.location = location;
    this.id = Math.random().toString() + Math.random.toString();
  }
}

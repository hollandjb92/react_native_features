export class Place {
  constructor(title, image, location, id) {
    this.title = title;
    this.image = image;
    this.address = location.address;
    this.location = { lat: location.lat, lon: location.lon };
    this.id = id;
  }
}

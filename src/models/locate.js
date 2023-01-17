class LocateData {
    constructor (status, title, content, image ) {
        this.status = status;
        this.title = title;
        this.content = content;
        this.image = image;
    }

    setCoordinatesId(coordinates_id) {
        this.coordinates_id = coordinates_id;
    }

    setImage (image) {
        this.image = image;
    }
}
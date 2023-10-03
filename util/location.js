const GOOGLE_API_KEY = 'AIzaSyA6FXvc45zF-cKd47UW1aiygpK1otKatW4'

export function getMapPreview(lat, long) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

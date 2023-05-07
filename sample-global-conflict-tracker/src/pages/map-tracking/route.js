import MapTrackingPage from ".";
const route = {
  id: "app.mapTracking", // page id - static data get from system
  name: "MapTrackingPage", // name of page
  component: MapTrackingPage, // main page
  path: "/map-tracking/:id", // path to access to page from browser
};

export default route;

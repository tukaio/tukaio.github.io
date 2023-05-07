import MapTrackingPage from ".";
const route = {
  id: "app.mapTrackingDetail", // page id - static data get from system
  name: "MapTrackingDetailPage", // name of page
  component: MapTrackingPage, // main page
  path: "/map-tracking/:id/detail/:detailId", // path to access to page from browser
};

export default route;

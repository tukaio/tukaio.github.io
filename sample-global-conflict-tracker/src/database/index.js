import fakeData from "../fakeData";
import { randomGuid } from "../helpers";

export const table = {
  MAP_TRACKINGS: "MAP_TRACKINGS",
  MAP_TRACKING_DETAILS: "MAP_TRACKING_DETAILS",
  COUNTRIES: "COUNTRIES",
  TRACKING_TYPES: "TRACKING_TYPES",
};

const getData = (key) => {
  const jsonData = localStorage.getItem(key);
  return JSON.parse(jsonData) ?? null;
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Unit of work
 */
const TrackingTypes = {
  getAll: () => {
    const records = getData(table.TRACKING_TYPES) ?? fakeData.TrackingTypes;
    return records;
  },
};

const Countries = {
  getAll: () => {
    const records = getData(table.COUNTRIES) ?? fakeData.Countries;
    return records;
  },
};

const MapTrackings = {
  getAll: () => {
    const records = getData(table.MAP_TRACKINGS) ?? [];
    return records;
  },
  getById: (id) => {
    const records = getData(table.MAP_TRACKINGS) ?? [];
    var record = records.find((record) => record.id === id);
    if (record) {
      return record;
    }

    return null;
  },
  add: (record) => {
    let records = getData(table.MAP_TRACKINGS) ?? [];
    if (!record["id"]) {
      record["id"] = randomGuid();
    }
    records.push(record);
    saveData(table.MAP_TRACKINGS, records);

    return record;
  },
  remove: (id) => {
    let records = getData(table.MAP_TRACKINGS) ?? [];
    var record = records.find((record) => record.id === id);
    if (record) {
      records = records.filter((record) => record.id !== id);
      saveData(table.MAP_TRACKINGS, records);

      return true;
    }

    return false;
  },
};

const MapTrackingDetails = {
  getAll: () => {
    const records = getData(table.MAP_TRACKING_DETAILS) ?? [];
    return records;
  },
  getById: (id) => {
    const records = getData(table.MAP_TRACKING_DETAILS) ?? [];
    var record = records.find((record) => record.id === id);
    if (record) {
      return record;
    }

    return null;
  },
  add: (record) => {
    let records = getData(table.MAP_TRACKING_DETAILS) ?? [];
    if (!record["id"]) {
      record["id"] = randomGuid();
    }
    records.push(record);
    saveData(table.MAP_TRACKING_DETAILS, records);

    return record;
  },
  addRange: (allData) => {
    let records = getData(table.MAP_TRACKING_DETAILS) ?? [];
    if (allData && allData?.length > 0) {
      for (let i = 0; i < allData.length; i++) {
        let record = allData[i];
        if (!record["id"]) {
          record["id"] = randomGuid();
        }
        records.push(record);
      }
      saveData(table.MAP_TRACKING_DETAILS, records);

      return true;
    }

    return false;
  },
  remove: (id) => {
    let records = getData(table.MAP_TRACKING_DETAILS) ?? [];
    var record = records.find((record) => record.id === id);
    if (record) {
      records = records.filter((record) => record.id !== id);
      saveData(table.MAP_TRACKING_DETAILS, records);

      return true;
    }

    return false;
  },
};

const database = {
  TrackingTypes,
  Countries,
  MapTrackings,
  MapTrackingDetails,
};

export default database;

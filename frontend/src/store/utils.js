export const normalize = (data) => {
  // Check to see if data is an object
  switch (typeof data) {
    case "object": {
      // If object is null return
      if (data === null) return null;

      // Check to see if data is an array
      switch (Array.isArray(data)) {
        // If it's an array then normalize each item
        case true:
          return data.reduce((acc, item) => {
            item = normalize(item);
            acc[item.id] = item;
            return acc;
          }, {});

        // Otherwise its a POJO
        default:
          // So we normalize the entries of the POJO
          return Object.entries(data).reduce((acc, [k, v]) => {
            v = normalize(v);
            acc[k] = v;
            return acc;
          }, {});
      }
    }
    // If data is undefined
    case "undefined":
      return null;

    // If it's not an object then just return it to the caller
    default:
      return data;
  }
};

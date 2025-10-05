import path from "path";

export default {
  process(_, filename) {
    return {
      code: `export default ${JSON.stringify(path.basename(filename))};`,
    };
  },
};

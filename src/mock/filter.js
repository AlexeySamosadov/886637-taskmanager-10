const filterNames = [
  `all`, `overdue`, `today`, `favourites`, `repeating`, `tags`, `archive`
];


const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};


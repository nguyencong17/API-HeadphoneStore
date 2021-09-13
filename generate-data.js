const faker = require('faker');
const fs = require('fs');
//set local to use Vietnamese
faker.locale = 'vi';

//Random data
const randomCategory = (n) => {
  if (n <= 0) return [];
  const categoriesList = [];
  //loop aand push  category;
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updateAt: Date.now(),
    };
    categoriesList.push(category);
  });

  return categoriesList;
};

const randomProductList = (categoriesList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  //random data
  for (const category of categoriesList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(400, 400),
      };

      productList.push(product);
    });
  }

  return productList;
};
// IFFE
(() => {
  //random data
  const categoriesList = randomCategory(4);
  const productList = randomProductList(categoriesList, 5);

  //prepare db object
  const db = {
    categories: categoriesList,
    products: productList,
    posts: [],
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Wite db seccessfully =))');
  });
})();
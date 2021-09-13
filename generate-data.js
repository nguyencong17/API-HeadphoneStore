const faker = require('faker');
const fs = require('fs');
//set local to use Vietnamese
faker.locale = 'vi';

const imageList = [
"./assets/image/Heaphone/product/1.jpg",
"./assets/image/Heaphone/product/2.jpg",
"./assets/image/Heaphone/product/3.jpg",
"./assets/image/Heaphone/product/4.jpg",
"./assets/image/Heaphone/product/5.jpg",
"./assets/image/Heaphone/product/6.jpg",
"./assets/image/Heaphone/product/7.jpg",
"./assets/image/Heaphone/product/8.jpg",
"./assets/image/Heaphone/product/9.jpg",
"./assets/image/Heaphone/product/10.jpg",
"./assets/image/Heaphone/product/11.jpg",
"./assets/image/Heaphone/product/12.jpg",
"./assets/image/Heaphone/product/13.jpg",
];

const imageList2 = [
  "./assets/image/Heaphone/blog/1.jpg",
  "./assets/image/Heaphone/blog/2.jpg",
  "./assets/image/Heaphone/blog/3.jpg",
  "./assets/image/Heaphone/blog/4.jpg",
  "./assets/image/Heaphone/blog/5.jpg",
  "./assets/image/Heaphone/blog/6.jpg",
  "./assets/image/Heaphone/blog/7.jpg",
  "./assets/image/Heaphone/blog/8.jpg",
  "./assets/image/Heaphone/blog/9.jpg",
  "./assets/image/Heaphone/blog/10.jpg",
  "./assets/image/Heaphone/blog/11.jpg",
  "./assets/image/Heaphone/blog/12.jpg",
  "./assets/image/Heaphone/blog/13.jpg",
  ];


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
        image: imageList[Math.floor(Math.random()*imageList.length)]
      };

      productList.push(product);
    });
  }

  return productList;
};

const randomPostList = (n) => {
  if (n <= 0) return [];
  const postList = [];
  //loop aand push post;
  Array.from(new Array(n)).forEach(() => {
    const post = {
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      date: faker.date.future(),
      image: imageList2[Math.floor(Math.random()*imageList.length)],
      description: faker.commerce.productDescription(),
      createdAt: Date.now(),
      updateAt: Date.now(),
    };
    postList.push(post);
  });

  return postList;
};
// IFFE
(() => {
  //random data
  const categoriesList = randomCategory(4);
  const productList = randomProductList(categoriesList, 5);
  const postList = randomPostList(12);
  //prepare db object
  const db = {
    categories: categoriesList,
    products: productList,
    posts: postList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Wite db seccessfully =))');
  });
})();

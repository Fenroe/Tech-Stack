#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2)
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Product = require('./models/product')
const Category = require('./models/category')
const Brand = require('./models/brand')

const mongoose = require('mongoose')
const mongoDB = userArgs[0]
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const products = []
const categories = []
const brands = []

const productCreate = (name, category, brand, price, in_stock, description, cb) => {
  const product_detail = {
    name,
    category,
    brand,
    price,
    in_stock,
    description
  }
  
  const product = new Product(product_detail)
       
  product.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product)
    products.push(product)
    cb(null, product)
  })
}

const categoryCreate = (name, cb) => {
  const category_detail = { 
    name
  }
    
  const category = new Category(category_detail)   
  category.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category)
    categories.push(category)
    cb(null, category)
  })
}


const brandCreate = (name, date_founded, description, cb) => {
  const brand_detail = {
    name
  }
  if (date_founded != false) brand_detail.date_founded = date_founded
  if (description != false) brand_detail.description = description

  const brand = new Brand(brand_detail)
  brand.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand)
    brands.push(brand)
    cb(null, brand)
  })
}


function createBrands(cb) {
    async.series([
        (callback) => {
          brandCreate('Asus', '1989-04-02', 'Asus is a Taiwanese multinational electronics company headquarted in Taipei. Its products include computers, mobile phones and tablets.', callback);
        },
        (callback) => {
          brandCreate('Dell', '1984-02-01', 'Dell is an American technology company that develops, sells, repairs and supports computers and related products and services. Its headquarters is located in Round Rock, Texas.', callback);
        },
        (callback) => {
          brandCreate('LG', '1947-01-05', 'LG is a South Korean multinational conglomerate. It makes electronics, chemicals and telecommunications products and operates subsidiaries in over 90 countries.', callback);
        },
        (callback) => {
          brandCreate('Microsoft', '1975-04-04', 'Microsoft is an American multinational technology corporation which produces computer software, consumer electronics and personal computers.', callback);
        },
        (callback) => {
          brandCreate('Nintendo', '1899-09-23', 'Nintendo is a Japanese multinational video game company headquartered in Kyoto that develops video games and game consoles.', callback);
        },
        (callback) => {
          brandCreate('Samsung', '1938-03-01', 'Samsung is a South Korean multinational manufacturing conglomerate headquarted in Seoul. It has one of the highest brand values globally.', callback);
        },
        (callback) => {
          brandCreate('Sony', '1946-05-07', 'Sony is a Japanese multinational conglomerate corporation headquartered in Tokyo. It is one of the world\'s largest manufacturers of consumer and professional electronic products.', callback);
        },
        (callback) => {
          brandCreate('TCL', '1985', 'TCL is a Chinese electronics company that designs, develops, manufactures and sells television sets, mobile phones and small electrical appliances', callback);
        },
        (callback) => {
          brandCreate('Toshiba', '1875-07-11', 'Toshiba is a Japanese multinational conglomerate headquartered in Tokyo. It sells a diverse range of products.', callback);
        },
        ],
        // optional callback
        cb);
}


function createCategories(cb) {
    async.series([
       (callback) => {
        categoryCreate('Laptops', callback)
       },
       (callback) => {
        categoryCreate('Televisions', callback)
       },
       (callback) => {
        categoryCreate('Game Consoles', callback)
       },
       (callback) => {
        categoryCreate('Mobile Phones', callback)
       }
      ],
      // optional callback
      cb)
}


function createProducts(cb) {
    async.parallel([
      (callback) => {
        productCreate('Asus ProArt StudioBook 15', categories[0], brands[0], 470000, 5, 'Fast storage and memory featuring 512GB + 512GB (RAID 0) PCIe NVMe M.2 SSD Hyper Drive and 32GB DDR4 Memory', callback)
      },
      (callback) => {
        productCreate('Dell Inspiron 15 3502', categories[0], brands[1], 47900, 4, 'Intel(R) Celeron(R) Processor N4020 (4MB Cache, up to 2.8 GHz)', callback)
      },
      (callback) => {
        productCreate('LG 43UP75006LF 43 inch', categories[1], brands[2], 49999, 12, 'Absorbing and atmospheric sound quality with AI Sound', callback)
      },
      (callback) => {
        productCreate('Nintendo Switch', categories[2], brands[4], 29999, 26, 'Nintendo Switch is a breakthrough home video game console. For the first time, players can enjoy a full home-console experience anytime, anywhere.', callback)
      },
      (callback) => {
        productCreate('Sony PlayStation 5', categories[2], brands[6], 49999, 0, 'Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.', callback)
      },
      (callback) => {
        productCreate('Samsung AU7100 65 Inch Smart TV', categories[1], brands[5], 59999, 40, 'Home Entertainment Excellence With The AU7100 - A Smart, Ultra HD TV that delivers it all, the Samsung 65 Inch AU7100 TV smart tv blends stunning visuals, vibrant colour, crisp audio and striking slim fit design to enhance your living space.', callback)
      },
      (callback) => {
        productCreate('Samsung Galaxy S21 FE 5G Mobile Phone 128GB', categories[3], brands[5], 59999, 13, 'We took what you love most and built the ultimate fan-inspired smartphone so, you can experience your everyday passions to the absolute fullest.', callback)
      },
      (callback) => {
        productCreate('Sony BRAVIA KD-32W800-32-inch', categories[1], brands[6], 28999, 2, 'Find all the entertainment you can dream of, as fast as you can talk - With advanced voice control, this Android smart TV lets you enjoy movies and shows from apps such as Netflix and Amazon Prime Video or broadcast in an instant.', callback)
      },
      (callback) => {
        productCreate('Sony VAIO Tap 11.6 inch', categories[0], brands[6], 58900, 14, 'An imaginative tablet PC with a detachable magnetic keyboard', callback)
      },
      (callback) => {
        productCreate('Sony Xperia L4', categories[3], brands[6], 20299, 15, 'Long lasting battery for reliable performance', callback)
      },
      (callback) => {
        productCreate('TCL 32S5209K 32-inch Smart TV', categories[0], brands[7], 24216, 88, 'Smart TV equipped with Android television, capable of running Google Home, the Google Play Store, Netflix, and YouTube', callback)
      },
      (callback) => {
        productCreate('Toshiba 50UK3163DB 50 Inch TV', categories[0], brands[8], 29999, 27, 'From the latest movies and trending music to your favourite boxsets, we\'ve got it all. The top streaming apps including Netflix, YouTube, Prime Video and Freeview Play built in as standard up to date and ready to go.', callback)
      },
      (callback) => {
        productCreate('Microsoft XBOX Series-X', categories[2], brands[3], 49999, 0, 'X-box Series X is the fastest, most powerful X-box ever. Play thousands of titles from four generations of consoles-all games look and play best on X-box Series X.', callback)
      }
    ],
    // Optional callback
    cb)
}



async.series([
    createBrands,
    createCategories,
    createProducts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('PRODUCTS: '+products);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




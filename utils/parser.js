const axios = require('axios');

const bookKey = process.env.BOOK_KEY;
// Parses google books data
const parser = async (subject) => {

  // endpoint 1 https://www.googleapis.com/books/v1/volumes?q=physics
  // endpoint 2 response.data.selfLink
  const volumes = `https://www.googleapis.com/books/v1/volumes?q=${subject}&key=AIzaSyAcMyBkoOkv-tbE6xyxalkmtpPT-r3K4Vk`;
  const { data: { items } } = await axios.get(volumes);

  let books = [];
  items.forEach(async ({ selfLink }) => {

    axios.get(`${selfLink}?key=${bookKey}`).then(({ data }) => {
      console.log(data.volumeInfo);
      books.push(data.volumeInfo);
    }).catch(error => {
      console.log(`\n\n\n===ERROR===\n${error}\n\n\n`);
    });
  });

  console.log(books);

  return books;

  const book2s = items.map(async ({ selfLink }) => {
    // const {
    //   volumeInfo: {
    //     title,
    //     authors,
    //     publisher,
    //     publishedDate,
    //     description,
    //     industryIdentifiers,
    //     pageCount,
    //     categories,
    //     imageLinks: {
    //       small: thumbnail,
    //       medium: cover,
    //     },
    //     language,
    //   },
    // } = await axios.get(selfLink);

    try {
      console.log(selfLink);
      const { data: { volumeInfo }} = await axios.get('https://www.googleapis.com/books/v1/volumes/JrslMKTgSZwC?key=AIzaSyAcMyBkoOkv-tbE6xyxalkmtpPT-r3K4Vk');
      console.log(volumeInfo);
      return volumeInfo;
    } catch (error) {
      return error
    }

    let identifiers = {};
    industryIdentifiers.forEach(isbn => {
      if (isbn.type === 'ISBN_10') {
        identifiers.isbn10 = isbn.identifier;
      } else {
        identifiers.isbn13 = isbn.identifier;
      }
    });

    return {
      title,
      authors,
      identifiers,
      publisher,
      cover,
      thumbnail,
      description,
      categories,
      pageCount,
      publishedDate,
      language,
    };
  });

  // const bookDetailed = {
  //   "volumeInfo": {
  //     "title": "Physics",
  //     "authors": [
  //       "Jim Breithaupt"
  //     ],
  //     "publisher": "Nelson Thornes",
  //     "publishedDate": "2001",
  //     "description": "This third editions of Key Science: Physics has been revised to meet the requirements of all 2001 GCSE specifications. It is suitable for middle-ability students, but has material for higher achievers, including in-depth content for all Separate Science specifications. Topics are differentiated between core material for Double/Single science and extension material for the Separate sciences.",
  //     "industryIdentifiers": [
  //       {
  //         "type": "ISBN_10",
  //         "identifier": "0748762434"
  //       },
  //       {
  //         "type": "ISBN_13",
  //         "identifier": "9780748762439"
  //       }
  //     ],
  //     "pageCount": 396,
  //     "categories": [
  //       "Science / Physics / General"
  //     ],
  //     "imageLinks": {
  //       "small": "http://books.google.com/books/content?id=uSPzV9R08nsC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71B-cTd9lnXjgsAEhJJuiUfD78W-uFp1cG3R6lAM2Ljpd6qEJIWbTAaLIL6i8WSVnjNJuGV26QX4af4-AcJuwClGBxvb0CAWjQKeYzh2h35IMFoc-sGT52ojIyTwV6v0GvMknRY&source=gbs_api",
  //       "medium": "http://books.google.com/books/content?id=uSPzV9R08nsC&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72VAElEiBwASs19rqcTaRxzXTMi9vF7aYIUGoh0zmMTJ3nVZxZEejg3xUZbj1iMXPlVGriMmFPdHNtNJfNpdwLMzgV1XHJNhV0bhXSNNiNtWS-r2TY_z74va5OBsI96wTuPaw4I&source=gbs_api",
  //     },
  //     "language": "en",
  //     "previewLink": "http://books.google.com/books?id=uSPzV9R08nsC&hl=&source=gbs_api",
  //     "infoLink": "https://play.google.com/store/books/details?id=uSPzV9R08nsC&source=gbs_api",
  //     "canonicalVolumeLink": "https://market.android.com/details?id=book-uSPzV9R08nsC"
  //   },
  // }

  return books;
}

module.exports = parser;

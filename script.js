function loadFieldNoteEmbeds() {
  if (window.twttr?.widgets) { window.twttr.widgets.load(document.getElementById("app")); return; }
  if (document.getElementById("x-field-note-widgets")) return;
  const script = document.createElement("script");
  script.id = "x-field-note-widgets";
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  script.onload = () => window.twttr?.widgets?.load(document.getElementById("app"));
  script.onerror = () => script.remove();
  document.head.appendChild(script);
}

const RESPONSE_ENDPOINT = "https://script.google.com/macros/s/AKfycbwvqf3Ecg1sp-Lx76-FsNQrnXF0TtLdlGTmADKUNXiyow_LCsFPQUpqXe3Y_K3obPkxoA/exec"; // Filled after Google completes web-app deployment.
async function saveResponse(form, payload) {
  if (!RESPONSE_ENDPOINT) throw new Error("Responses aren’t connected yet. Please try again later.");
  const id = form.dataset.submissionId || crypto.randomUUID();
  form.dataset.submissionId = id;
  const res = await fetch(RESPONSE_ENDPOINT, {
    method: "POST", headers: {"Content-Type": "text/plain;charset=utf-8"},
    body: JSON.stringify({...payload, id}), signal: AbortSignal.timeout(30000)
  });
  const result = await res.json();
  if (!result.ok || result.id !== id) throw new Error("Your response could not be confirmed. Please try again.");
  delete form.dataset.submissionId;
}
const readingList = [
  {
    "section": "First section",
    "title": "The Human Condition",
    "author": "Hannah Arendt",
    "url": "https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "First section",
    "title": "Eichmann in Jerusalem: A Report on the Banality of Evil",
    "author": "Hannah Arendt",
    "url": "https://www.penguinrandomhouse.com/books/320983/eichmann-in-jerusalem-by-hannah-arendt/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "First section",
    "title": "Introduction into Politics",
    "author": "Hannah Arendt",
    "url": "https://penguinrandomhouselibrary.com/book/?isbn=9780805212136",
    "linkLabel": "Book details",
    "note": "Included in The Promise of Politics."
  },
  {
    "section": "First section",
    "title": "The Age of the World Picture",
    "author": "Martin Heidegger",
    "url": "https://cyberlaw.stanford.edu/content/files/images/4/44/heidegger_martin_the_question_concerning_technology_and_other_essays.pdf",
    "linkLabel": "Read collection · PDF",
    "note": "In The Question Concerning Technology and Other Essays."
  },
  {
    "section": "First section",
    "title": "The Question Concerning Technology",
    "author": "Martin Heidegger",
    "url": "https://cyberlaw.stanford.edu/content/files/images/4/44/heidegger_martin_the_question_concerning_technology_and_other_essays.pdf",
    "linkLabel": "Read collection · PDF",
    "note": "In The Question Concerning Technology and Other Essays."
  },
  {
    "section": "First section",
    "title": "Being and Time",
    "author": "Martin Heidegger",
    "url": "https://sunypress.edu/Books/B/Being-and-Time2",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "First section",
    "title": "Discipline and Punish",
    "author": "Michel Foucault",
    "url": "https://www.penguinrandomhouse.com/books/55026/discipline-and-punish-by-michel-foucault-and-alan-sheridan/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "First section",
    "title": "The Spell of the Sensuous",
    "author": "David Abram",
    "url": "https://www.penguinrandomhouse.com/books/319/the-spell-of-the-sensuous-by-david-abram/",
    "linkLabel": "Book details",
    "note": "Includes “The Ecology of Magic.”"
  },
  {
    "section": "First section",
    "title": "The Turning Point",
    "author": "Fritjof Capra",
    "url": "https://www.penguinrandomhouse.com/books/23767/the-turning-point-by-fritjof-capra/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "First section",
    "title": "Immortality",
    "author": "Milan Kundera",
    "url": "https://books.google.com/books/about/Immortality.html?id=FmyzQgAACAAJ",
    "linkLabel": "Book record",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "Foucault’s Pendulum",
    "author": "Umberto Eco",
    "url": "https://books.google.com/books/about/Foucault_s_Pendulum.html?id=QJlXzwEACAAJ",
    "linkLabel": "Book record",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "Written on the Body",
    "author": "Jeanette Winterson",
    "url": "https://www.penguinrandomhouse.com/books/192461/written-on-the-body-by-jeanette-winterson/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "Be Wise as Serpents",
    "author": "Fritz Springmeier",
    "url": "https://search.worldcat.org/title/Be-wise-as-serpents/oclc/41527275",
    "linkLabel": "Find in libraries",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "Moonchild",
    "author": "Aleister Crowley",
    "url": "https://openlibrary.org/books/OL21030622M/Moonchild",
    "linkLabel": "Book record",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "Dangerous Instincts",
    "author": "Mary Ellen O’Toole with Alisa Bowman",
    "url": "https://www.penguinrandomhouse.com/books/309120/dangerous-instincts-by-mary-ellen-otoole/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "The Art of Seduction",
    "author": "Robert Greene",
    "url": "https://www.penguinrandomhouse.com/books/286423/the-art-of-seduction-by-robert-greene/9781101175293/",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "Second section",
    "title": "The Art of Power",
    "author": "Thich Nhat Hanh",
    "url": "https://books.google.com/books/about/The_Art_of_Power.html?id=Ry4cbMNwCdMC",
    "linkLabel": "Preview / book details",
    "note": ""
  },
  {
    "section": "Grimoire research",
    "title": "The Fairy-Faith in Celtic Countries",
    "author": "W. Y. Evans-Wentz",
    "url": "https://www.gutenberg.org/ebooks/34853",
    "linkLabel": "Read online",
    "note": ""
  },
  {
    "section": "Grimoire research",
    "title": "Gods of the Ancient Northmen",
    "author": "Georges Dumézil",
    "url": "https://books.google.com/books/about/Gods_of_the_Ancient_Northmen.html?id=rurD1yd0Ok0C",
    "linkLabel": "Preview / book details",
    "note": ""
  },
  {
    "section": "Grimoire research",
    "title": "Mitra-Varuna",
    "author": "Georges Dumézil",
    "url": "https://haubooks.org/wp-content/uploads/2024/11/Dume%CC%81zil_2023_Mitra-Varuna_HAU-Books_9781912808977.pdf",
    "linkLabel": "Read online · PDF",
    "note": ""
  },
  {
    "section": "Grimoire research",
    "title": "Comparative Mythology",
    "author": "Jaan Puhvel",
    "url": "https://www.press.jhu.edu/books/title/1343/comparative-mythology",
    "linkLabel": "Book details",
    "note": ""
  },
  {
    "section": "Grimoire research",
    "title": "Indo-European Poetry and Myth",
    "author": "M. L. West",
    "url": "https://academic.oup.com/book/10022",
    "linkLabel": "Book details / access options",
    "note": ""
  }
];

const app = document.querySelector("#app");
readingList.push(...[{"section": "Short Story Symposium · 2026", "title": "To Outlive Eternity", "author": "Poul Anderson", "url": "https://www.baen.com/Chapters/1416521135/1416521135___1.htm", "linkLabel": "Read", "note": "January 14 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "The Lifecycle of Software Objects", "author": "Ted Chiang", "url": "https://cpb-us-w2.wpmucdn.com/voices.uchicago.edu/dist/8/644/files/2017/08/Chiang-Lifecycle-of-Software-Objects-q3tsuw.pdf", "linkLabel": "Read", "note": "February 25 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "From the New World · Parts I–II", "author": "Yusuke Kishi", "url": "https://drive.google.com/file/d/19-KuwJwEeX2AmxgVkUFbTtq60yPGaUuH/view", "linkLabel": "Read", "note": "April 1 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "From the New World · Parts III–IV", "author": "Yusuke Kishi", "url": "https://drive.google.com/file/d/19-KuwJwEeX2AmxgVkUFbTtq60yPGaUuH/view", "linkLabel": "Read", "note": "April 15 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "From the New World · Parts V–VI", "author": "Yusuke Kishi", "url": "https://drive.google.com/file/d/19-KuwJwEeX2AmxgVkUFbTtq60yPGaUuH/view", "linkLabel": "Read", "note": "May 6 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "The Metamorphosis", "author": "Franz Kafka", "url": "https://www.sas.upenn.edu/~cavitch/pdf-library/Kafka_Metamorphosis.pdf", "linkLabel": "Read", "note": "June 3 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Nine Lives", "author": "Ursula K. Le Guin", "url": "https://www.baen.com/Chapters/9781625791405/9781625791405___2.htm", "linkLabel": "Read", "note": "June 17 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Yeyuka", "author": "Greg Egan", "url": "https://www.infinityplus.co.uk/stories/yeyuka.htm", "linkLabel": "Read", "note": "July 8 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Death Note · Episode 1", "author": "Tsugumi Ohba", "url": "https://luma.com/shortstories", "linkLabel": "Watch link on event page", "note": "July 22 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Liking What You See: A Documentary", "author": "Ted Chiang", "url": "https://www.are.na/block/8515263", "linkLabel": "Read", "note": "August 5 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Staying Behind", "author": "Ken Liu", "url": "https://clarkesworldmagazine.com/liu_10_11/", "linkLabel": "Read", "note": "September 9 · 2026"}, {"section": "Short Story Symposium · 2026", "title": "Kirinyaga", "author": "Mike Resnick", "url": "https://www.baen.com/Chapters/034541702X/034541702X___1.htm", "linkLabel": "Read", "note": "September 30 · 2026"}]);
readingList.push({section: "Ancient texts", title: "Bhagavad Gita", author: "", url: "https://sacred-texts.com/hin/gita/", linkLabel: "Read online", note: "English translation by K. T. Telang; Sanskrit text also available."});
readingList.push(...[{"section": "Metaphysical shelf", "title": "I Ching · Book of Changes", "author": "Chinese divination and philosophy", "url": "https://sacred-texts.com/ich/index.htm", "linkLabel": "Read online · James Legge translation", "note": "My most devoted study right now.", "date": "First millennium BCE · core text; later commentaries", "age": "Roughly 3,000 years of textual history", "source": "https://plato.stanford.edu/entries/chinese-change/"}, {"section": "Metaphysical shelf", "title": "The Tibetan Book of the Dead", "author": "Bardo Thödol · Tibetan Buddhist tradition", "url": "https://penguinrandomhousehighereducation.com/book/?isbn=9780143104940", "linkLabel": "Find the book · Gyurme Dorje translation", "note": "", "date": "14th century CE · associated with Karma Lingpa", "age": "About 650–700 years", "source": "https://searcharchives.bl.uk/catalog/040-004522521"}, {"section": "Metaphysical shelf", "title": "Moonchild", "author": "Aleister Crowley", "url": "https://openlibrary.org/books/OL21030622M/Moonchild", "linkLabel": "Find the book", "note": "An occult novel from my ENOUGH. reading list.", "date": "1929 · first publication", "age": "97 years", "source": "https://openlibrary.org/books/OL21030622M/Moonchild"}, {"section": "Metaphysical shelf", "title": "The Doors of Perception", "author": "Aldous Huxley", "url": "https://www.penguin.co.uk/books/357842/the-doors-of-perception-by-aldous-huxley/9780099458203", "linkLabel": "Find the book", "note": "", "date": "1954 · first publication", "age": "72 years", "source": "https://www.penguin.co.uk/books/357842/the-doors-of-perception-by-aldous-huxley/9780099458203"}]);
const gita = readingList.find(book => book.section === "Ancient texts");
gita.date = "c. 2nd century BCE–2nd century CE · composition";
gita.age = "Roughly 1,800–2,200 years";
gita.source = "https://searcharchives.bl.uk/?f%5Blanguage_ssim%5D%5B%5D=Sanskrit&page=1&per_page=50&sort=date";
const researchDates = [
  ["1911 · first publication", "115 years", "https://search.worldcat.org/title/30416129"],
  ["1977 · linked English edition", "49 years", "https://books.google.com/books/about/Gods_of_the_Ancient_Northmen.html?id=rurD1yd0Ok0C"],
  ["1940 · first French edition; 2023 critical edition linked", "86 years since first publication", "https://haubooks.org/mitra-varuna/"],
  ["1987 · first publication", "39 years", "https://www.press.jhu.edu/books/title/1343/comparative-mythology"],
  ["2007 · first publication", "19 years", "https://academic.oup.com/book/10022"]
];
readingList.filter(book => book.section === "Grimoire research").forEach((book, i) => {
  [book.date, book.age, book.source] = researchDates[i];
});
// Reading links are shown only for verified complete, freely accessible texts.
const freeFullTextTitles = new Set([
  "The Fairy-Faith in Celtic Countries", "Mitra-Varuna",
  "I Ching · Book of Changes", "Bhagavad Gita",
  "The Lifecycle of Software Objects", "Nine Lives", "Kirinyaga"
]);
readingList.forEach(book => { book.freeFullText = freeFullTextTitles.has(book.title); });
const ancientReading = [readingList.find(book => book.title.startsWith("I Ching")), gita, ...[{"section": "Ancient reading", "title": "Egyptian Book of the Dead", "author": "Ancient Egypt", "url": "https://www.gutenberg.org/ebooks/69566", "note": "P. Le Page Renouf and Édouard Naville translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Enuma Elish", "author": "Ancient Mesopotamia", "url": "https://sacred-texts.com/ane/stc/index.htm", "note": "L. W. King’s Seven Tablets of Creation edition.", "freeFullText": true}, {"section": "Ancient reading", "title": "The Story of Sinuhe", "author": "Ancient Egypt", "url": "https://mjn.host.cs.st-andrews.ac.uk/egyptian/texts/corpus/pdf/Sinuhe.pdf", "note": "Mark-Jan Nederhof translation, with transliteration · PDF.", "freeFullText": true}, {"section": "Ancient reading", "title": "The Tale of the Shipwrecked Sailor", "author": "Ancient Egypt", "url": "https://mjn.host.cs.st-andrews.ac.uk/egyptian/texts/corpus/pdf/Shipwrecked.pdf", "note": "Mark-Jan Nederhof translation, with transliteration · PDF.", "freeFullText": true}, {"section": "Ancient reading", "title": "Epic of Gilgamesh", "author": "Ancient Mesopotamia", "url": "https://sacred-texts.com/ane/eog/index.htm", "note": "R. Campbell Thompson’s 1928 translation; gaps in the surviving tablets are marked.", "freeFullText": true}, {"section": "Ancient reading", "title": "The Exaltation of Inanna", "author": "Enheduanna", "url": "https://etcsl.orinst.ox.ac.uk/section4/tr4072.htm", "note": "Oxford’s Electronic Text Corpus of Sumerian Literature translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Enheduanna’s Temple Hymns", "author": "Sumerian hymns traditionally attributed to Enheduanna", "url": "https://etcsl.orinst.ox.ac.uk/section4/tr4801.htm", "note": "Oxford’s Electronic Text Corpus of Sumerian Literature translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Pyramid Texts", "author": "Ancient Egypt", "url": "https://sacred-texts.com/egy/pyt/index.htm", "note": "Samuel A. B. Mercer translation; surviving utterances with textual gaps marked.", "freeFullText": true}, {"section": "Ancient reading", "title": "Kesh Temple Hymn", "author": "Ancient Sumer", "url": "https://etcsl.orinst.ox.ac.uk/section4/tr4802.htm", "note": "Oxford translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Instructions of Shuruppak", "author": "Ancient Sumer", "url": "https://etcsl.orinst.ox.ac.uk/section5/tr561.htm", "note": "Oxford translation; also spelled Shuruppag.", "freeFullText": true}, {"section": "Ancient reading", "title": "Maxims of Ptahhotep", "author": "Ancient Egypt", "url": "https://www.gutenberg.org/ebooks/30508", "note": "Battiscombe G. Gunn translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Descent of Inanna", "author": "Ancient Sumer", "url": "https://etcsl.orinst.ox.ac.uk/section1/tr141.htm", "note": "Oxford translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Atrahasis", "author": "Ancient Mesopotamia", "url": "", "note": "", "freeFullText": false}, {"section": "Ancient reading", "title": "The Eloquent Peasant", "author": "Ancient Egypt", "url": "https://mjn.host.cs.st-andrews.ac.uk/egyptian/texts/corpus/pdf/Peasant.pdf", "note": "Mark-Jan Nederhof translation, with transliteration · PDF.", "freeFullText": true}, {"section": "Ancient reading", "title": "Dialogue of a Man with His Ba", "author": "Ancient Egypt", "url": "https://mjn.host.cs.st-andrews.ac.uk/egyptian/texts/corpus/pdf/Dispute.pdf", "note": "Mark-Jan Nederhof translation; also titled Dispute of a Man with His Ba · PDF.", "freeFullText": true}, {"section": "Ancient reading", "title": "Code of Hammurabi", "author": "Ancient Babylon", "url": "https://avalon.law.yale.edu/ancient/hamcode.asp", "note": "L. W. King translation · Yale’s Avalon Project.", "freeFullText": true}, {"section": "Ancient reading", "title": "Rigveda", "author": "Vedic hymns", "url": "https://sacred-texts.com/hin/rigveda/index.htm", "note": "Ralph T. H. Griffith translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Book of Job", "author": "Hebrew Bible", "url": "https://www.biblegateway.com/passage/?search=Job%201-42&version=KJV", "note": "King James Version, chapters 1–42.", "freeFullText": true}, {"section": "Ancient reading", "title": "Tao Te Ching", "author": "Traditionally attributed to Laozi", "url": "https://www.gutenberg.org/ebooks/216", "note": "James Legge translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Iliad", "author": "Homer", "url": "https://www.gutenberg.org/ebooks/6130", "note": "Alexander Pope translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Odyssey", "author": "Homer", "url": "https://www.gutenberg.org/ebooks/1727", "note": "Samuel Butler translation.", "freeFullText": true}, {"section": "Ancient reading", "title": "Works and Days & Theogony", "author": "Hesiod", "url": "https://www.gutenberg.org/ebooks/348", "note": "Hugh G. Evelyn-White translation, in Hesiod, the Homeric Hymns, and Homerica.", "freeFullText": true}]];
readingList.push(...ancientReading.slice(2));
const readingResponses = new Map();

function bookList(books, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="book-list">${books.map(book => `<li><h3>${escapeHtml(book.title)}</h3>${book.date ? `<p class="text-date">${escapeHtml(book.date)}<br>${escapeHtml(book.age)}</p>` : ""}${book.author ? `<p>${escapeHtml(book.author)}</p>` : ""}${book.note ? `<p class="note">${escapeHtml(book.note)}</p>` : ""}${book.freeFullText ? `<a href="${book.url}" target="_blank" rel="noopener noreferrer">Read free full text →<span class="sr-only"> ${escapeHtml(book.title)} (opens in a new tab)</span></a>` : ""}${responseForm(book)}</li>`).join("")}</${tag}>`;
}

function responseForm(book) {
  const id = readingList.indexOf(book);
  const responses = readingResponses.get(id) || [];
  return `<details class="book-response"><summary>Leave a thought</summary><p class="note">Your thought will be sent to Chloe and saved privately in Google Sheets. It won’t be published here.</p><ul>${responses.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ul><form data-book="${id}"><label for="thought-${id}">What stayed with you?</label><textarea id="thought-${id}" name="thought" required></textarea><div class="actions"><button class="action" type="submit">[ leave a thought ]</button></div><p role="status" class="note"></p></form></details>`;
}


const writingEntries = [{"route": "foxglove-portrait", "title": "xXFoxgloveXx, a Portrait", "part": "FROM THE ARCHIVE", "finished": true, "paragraphs": ["\"Her Vertues are her own, her Vices occasion'd by her Misfortunes; and yet as I have often heard her say, If she had been a Man, she had been without Fault: But the Charter of that Sex being much more confin'd than ours, what is not a Crime in Men is scandalous and unpardonable in Woman, as she her self has very well observ'd in divers Places, throughout her own Writings.\" ", "-The History of Rivella by Delarivier Manley", "xXFoxgloveXx: Hopefully evolution will take its course and choose the more well rounded of the two sexes to model everyone after and we'll all be super womens in another thousand years. I'll never stop fantasizing of the any stop pee hose I could have if only I was a man, squats are too obvious to suggest anything else and sadly not classy, though it's a small price to pay for these other foxy features. If evolution is kind it will hopefully rule bathroom trips completely out of our daily routines as a total bother, maybe eh? Anyways, enough of my potty mouth.", "xXFoxgloveXx a Message to me: Hey friendgirl. my past feels so far away that it can hardly relate to the present me, As growing older mostly is. Your fb is unclear and I can't tell if you still stay in Austin or not? , but if you do and happen to like the idea of a fresh start, let us transcend our mortal realms some time and be book people, together. If not, all the best in your speciality of provocative inspiration. There needs to be more out there instead of more business majors.", "My reply: Hey! I've been thinking about you a lot, girl. I would love to see you. I’m in Austin right now, graduating from UT in May with my English and sociology degrees. I want to get my master’s in fine arts; I just don’t know where yet. I’d really love to meet up and catch up. I feel bad about how we last parted.", "xXFoxgloveXx is a redhead by choice, born with strawberry-blond hair and crystal-blue eyes. I meet her when I’m nineteen, at the co-op in West Campus. I’m between colleges and partying to find the next one. She crosses a crowded room to clip plastic flowers into my hair, then invites me upstairs to add some pink. She wants to paint me naked. She is from El Paso and likes the desert. Her spirit animal is a fox; she has one tattooed on her side, a pact with her best friend. She is new to Austin, taking art classes at ACC. She offers me her bed because she won’t be using it tonight. I lay my head where she lays hers and smell her hair on the pillowcase.", "My twentieth birthday. xXFoxgloveXx, HeartOnAway, SpringStatic, and I drink champagne in HeartOnAway’s Tahoe on the way to a party at the children’s museum. We take acid and I photograph the church on Trinity so we can find the car. SXSW is raging. We know enough people to get past the line, then split up inside. I’m so hot I take off my shirt. Someone asks whether my mother knows I dress like that. I laugh. Upstairs, xXFoxgloveXx waves me into a yellow playhouse. She is on the floor, rolling. We decide to smoke a joint in there. Someone invites us to another party; a bouncer threatens to kick us out. Later, nobody remembers where we parked. I show them my photograph. The car is right behind us.", "We are painting in her room. I have moved into the co-op a few days earlier. This is before my laptop disappears, before I am voted out. I love painting even though I don’t do it well. She gives me kombucha and insists I’ll learn to love it. Later, I do. We make tea, eat mushrooms, and go to the mall. Her car is a work of art: trash, art supplies, clothes, everything piled in the back. In the car, I decide I am Gollum searching for my precious. At the mall, numbers seem meaningless. We take what we want: dresses, lace shirts, makeup boxes with butterflies and rainbows. We drive back as the sun sets. Later we go to the Enchanted Forest, where we separate. She finds a pirate to drink rum with; I wander between installations and settle by a fire. In the embers, I see fractals. The smallest is the head of my Buddha, making up the fire, the forest, my skin, my mind. When the forest closes, neither of us can drive. There are no cabs. DiamondDialup drives us to his apartment nearby. He gives us brownies, but we don’t sleep. We talk about everything. I feel her measuring the advantages she thinks I’ve had. I try to show her my world. Later, when she meets my high-school friends, she understands something of it.", "TC’s Lounge is an underage secret for a while: bring your own drinks, dance to funk. They sell chicken soup and beer. While we are inside, someone steals the radio from her car. I take K-pins. I don’t remember getting home, or whether this is the night I fall getting out of the car and hit my head.", "At a party in an old movie-star house, there are ice sculptures, body painting, and platters of cocaine. We mistake “Midsummer’s Night” for Shakespeare. The theme turns out to be matching underwear. I am showing xXFoxgloveXx the world I’m running from.", "Eeyore’s Birthday. Everyone dresses as fairies, wizards, whatever they fancy, for a birthday party in the woods for an imaginary character. The hours feel like minutes. Afterward there are three or four more parties. You call your friends at seven and they are still up, about to swim, asking you to bring more green. Here we are, tuning in and dropping out.", "At a Sound Tribe Sector 9 show on Halloween, we are dating different people and have moved out of the co-op. I don’t remember seeing much of xXFoxgloveXx. My boyfriend leaves me alone to compete in a costume contest. I get moved to VIP, which matters because I’m twenty and can’t buy a drink.", "Outside someone’s house in Austin, in the dark, we try to share our hearts. Am I a have or a have-not? What looks like a mountain to one of us is a molehill to the other.", "“You’re pretty. You know. Smart too.”", "“So...”", "“So, that is it for a girl.”", "One day I run a test to see what our baby would look like. She borrows my high-school senior picture to draw me for class. She says I have doe eyes, like a deer in the headlights.", "I am living alone in a townhouse I’m supposed to love, just as I’m supposed to graduate. The new buildings stand where the old complex burned down. Everything feels temporary. I’m between boyfriends, which makes me feel lost then; now it makes me feel whole. One night, xXFoxgloveXx, her boyfriend PaintedEcho, and VelvetVampire404 from my English class come over. We drink. Two hundred and fifty dollars’ worth of my product disappears. There are only three other people there. I divide them into sides in my head. Everyone claims innocence. xXFoxgloveXx is furious that I could think she would steal from me after all our time together. VelvetVampire404 reminds me of the missing laptop. I let her become my confidante. Later, more things go missing. Suspicion has become another way of choosing whom to trust.", "Ms. StoryStaticXO,", "I will be calling you later this week with this cool new number you gave me. I will soon be reading the document you sent me. It is exciting to rekindle old flames because the faster turning years take them further away from memory. Both with our undying spiritual devotion to finding our independent routes and creative careers with our freedom of choice. Absolutely righteous babes from this last century, I gotta say, it is hard work going against the grain but it is the best when it fuels you because you know you have an ability developed from a deeper understanding than most of these jokers. Send me your stories and your website. I wanna see. My goal of reaching my ideal of perfection with my talent is currently quite far away from it. There has been a big gap in studying and application but I’m finally backkk and ready. Story is I feel head over heels for a life drawing class I elected myself into, changed my life and my career direction. I was studying computer graphics if you remember. Chasing a salary. I will soon be reading the document you sent me. What big cities have you thought of so far? Checked out any out? Anyways, no obligations to answer. It will all come out at the meeting. I’m sure. It is just so good, good, so good to hear from you and to see you soon.", "Sincerely crazy bout it,", "xXFoxgloveXx"], "photo": {"src": "assets/atmosphere/15.jpg", "alt": "Pink flowers scattered across interwoven dark branches."}}, {"route": "dead-weight-batteries", "title": "Dead Weight Batteries", "part": "FINISHED WORK", "finished": true, "paragraphs": ["AnalogKing72 is watching TV. The glare neither hides nor accentuates his blankness. He has never had much trouble making friends and never finds room in his social calendar for the “philosophical mumbo jumbo” he associates with reading. In his youth, he was a quarterback. In Texas, that is pretty much the same as being a god. He signed up for the war before graduation in 1972. He married xXPonyPixelsXx without much deliberation: his parents owned land, hers did too, and she was pregnant. Just after the wedding, he was shipped to Vietnam, then almost as quickly shipped home.", "His concentration breaks from the basketball game as he looks at the wedding picture on the end table.", "In the picture, they are both smiling. Before the divorce, they spent most of their time drinking and hurling insults. He does not miss her. The thought that she or their child might be happy still bothers him.", "SportsBarDreamer, from Upchuck’s, passed him MoonlitDialup’s number a few weeks ago. She speaks little English and is sixteen. He pays her for sex. He thinks of the arrangement as convenient.", "His wife was different when he came back from Vietnam. Maybe she had heard about the other women. Eventually she found another veteran down the street, someone who was “going places,” like college. Their son, QuietSignal, was eight. AnalogKing72 considered that old enough to take care of himself.", "The oil job pays steadily, and he likes the men he works with. He doesn’t envy his ex-wife and her husband. He has money, company when he wants it, the game on TV. He is fifty-eight. MoonlitDialup is sixteen.", "He dips his fingers into a bag of potato chips, licks them, and scratches himself. Before calling her, he will have to go to the bank. At least he has extra cash. The government sends letters about the accident with QuietSignal, and money comes with them.", "On the floor of the stadium, movie stars sit in VIP seats. He is kind of like a movie star, he thinks.", "AnalogKing72 decides to call MoonlitDialup."], "photo": {"src": "assets/atmosphere/11.jpg", "alt": "Heavy storm clouds above a distant landscape."}}, {"route": "a-sickely-friend", "title": "A Sickely Friend", "part": "FINISHED WORK", "finished": true, "paragraphs": ["I hear a conversation through the wall. We are in a tiny, three-room trailer. The thin pine plywood makes it feel like one room.", "\"You know, I'm gonna get pretty serious with AprilAfterglow soon, so can't I just once--?\"", "\"No!\"", "\"--run my fingers down your snatch? Just a little bit. Only for a little while.\"", "\"No!\"", "\"How about you just let me give you a boob massage? It'll feel good.\"", "\"No. Look, I'm not interested in doing any of that with you.\"", "\"Well, I moved here to help you out...\"", "\"Move out. I don't care. I can take care of the rent on my own.\"", "\"Move away with me. No one here will have to know!\"", "\"Know what? I'm not interested! We're friends. You're like my cousin...\"", "\"I know. Let's move away where no one will know us like that. I can pay for your school...make you an R.N. You can have all the money in my bank account.\"", "My stomach turns. The conversation goes on for hours and I can’t stop hearing it. I grab a knife and my pepper spray, holding one in each hand as I try to fall asleep. The morning is cold. I wonder what happened between them.", "I have a text message: 'What r u doing today?'", "I write back: 'Meditating right now. Idk. No plans. How about u?'", "'Same, no plans,' she writes. 'I wanna make some cash lol. Been thinking a lot about it bcuz last night the shit he said and pulled was too much. I need out.'", "'Yeah!' I send her. 'That conversation seemed intense. Sry. But yah, an out is a must. We should get some paints or something today.'", "'There really isn't a place around here that sells that kind of stuff,' comes her reply. 'I'm ok I think. Imma hide in my room and maybe keep the door shut all day.'"], "photo": {"src": "assets/atmosphere/18.jpg", "alt": "Golden evening sunlight framed by a tall window."}}, {"route": "the-beefs", "title": "The BEEFs", "part": "FINISHED WORK", "finished": true, "paragraphs": ["Fino, or Goodbye. I’m sorry. I don’t love you anymore.", "The rumors arrive before I do", "xXPonyPixelsXx has been telling people I have herpes. SiliconRomeo tells me she has recommended he get tested. He and I aren’t back together, but I have been answering his broken calls for company. I want to get away from my family for the holidays. Now I want to answer the rumor with something equally cruel.", "She has also been retelling the story of how I lost my virginity, making my sixteen-year-old self into someone who deceived an older man. Apparently, StatusUpdateVIP and xXPonyPixelsXx met SiliconRomeo this weekend but abandoned him in Vegas. They are dating again. SiliconRomeo might finally get the picture: his best friend’s insistence that he has no feelings for her does not match what he does.", "It is winter break now. I like being in San Francisco for Christmas. I go to SiliconRomeo’s townhouse in Alameda. He has moved there from San Jose but I know he won't stay. He's renting the place month-to-month.", "He has begged me to come and entertain him before the next lead, the next gig, the next big thing he and StatusUpdateVIP are chasing. At the airport, I think back to the summer we spent together on a business endeavor. Everything about this visit already feels forced.", "SiliconRomeo insisted I fly JetBlue. They call my section and I take my assigned seat. Suddenly, the guy beside me says my name and finds my old number in his phone. The world is so small. We slept together a couple of times when I was nineteen. It takes me a moment to place him.", "Ah, yes. SportsBarDreamer. I remember his name now and address him. He is all smiles. We reminisce through the whole flight about our mutual friends. He recounts how he will never forget when I told that one cop my friend, VelvetAwayMsg, was passed out in my arm because of her period--certainly not drugs or alcohol. The cop immediately dropped his line of questioning and allowed me to carry on dragging her to my car.", "SportsBarDreamer reveals his plan is to move to Australia and open a sports bar. I wish him a good holiday in Marin with his family as the plane lands. I see him again in baggage claim after SiliconRomeo greets me with a kiss hello. SportsBarDreamer gives me another good-bye hug, prompting SiliconRomeo to ask, “Did you fuck him? You did, didn't you? Eww, so burly. At least he’s white, though.”", "Summer. SiliconRomeo and StatusUpdateVIP come to Austin.", "I have to write down the past to find some meaning in it before I can write the future. So I recount these events in reverse. I need to finish what I started and move on. Finishing college is the first step.", "SiliconRomeo insists I go to summer school. He wants to see me “edumacated,” even though he never finished college himself. He cannot understand how I have survived this long without being able to put my accomplishments on paper. They are still real accomplishments to me. I keep smoking weed in San Jose, about as much as I smoked in Austin, though here it seems to bother him more.", "I’m tired of flights between Austin and San Jose. I have court, friends, a life, and they are all in Austin. SiliconRomeo says, “I love you. I want what is best for you.” His complaints stay in my head longer than the declarations. It occurs to me that he prefers to see me on vacation.", "StatusUpdateVIP, SiliconRomeo, and I are cruising in SiliconRomeo’s red Mercedes GLK SUV to Santa Cruz. We are going to spend the day on the beach. While in the car, I'm searching my purse for blunt wraps and my supply of \"medical marijuana\". I love California.", "As I roll the blunt, StatusUpdateVIP starts lecturing me about how I smoke. His complaints turn into racist remarks about people I have dated. He addresses SiliconRomeo as though I’m not sitting in the car with them.", "SiliconRomeo joins in, bringing up a Black man xXPonyPixelsXx dated at Harvard. He speculates about the man’s family money and offers to find pictures. “I’m sure AnalogKing72 still knows him,” he says.", "StatusUpdateVIP snorts out a huge laugh, “HA. Fucking Harvard and only making 75k a year. 75k a year. SiliconRomeo and I are examples of what not going to Harvard can do.”", "AnalogKing72 is all right, I think. SiliconRomeo and StatusUpdateVIP keep talking about Harvard. StatusUpdateVIP’s ex-girlfriend started sleeping with a Harvard guy after their four years together. He had given her a job at his company; afterward, he brought SiliconRomeo up from Los Angeles. Both men’s private educations ended at high school. Harvard keeps turning up in their business deals and their relationships.", "***", "The south buzzes. Every year it endures some terrible plague of bugs. They overpopulate themselves and their shrieking can be heard all day long in Texas. They're what Texas has instead of sirens or the street noise that accompanies other cities. The best description I’ve ever heard of Austin was a complaint from a San Antonian. He said, “Austin is just a bunch of pretend-liberal-elitists posing as Democrats to hide their darkly Republican souls.”", "SiliconRomeo, StatusUpdateVIP, and I are in the living room. The pair begin to strategize their day. StatusUpdateVIP says, “I’ve got to find some other bitches to hang out with. Look at this one,\" he brandishes his iPhone and shows us a picture of xXPonyPixelsXx, \"She’s so, so, so fat. Look! Her arms are as big as my arms.”", "I reply, “But...you like talking to her and hanging out with her?”", "“It’s nice to have a big blonde one in the stable,” StatusUpdateVIP smirks.", "SiliconRomeo butts in, “How are we going to get rid of the xXPonyPixelsXx? You shouldn’t have told her to come.”", "StatusUpdateVIP dismisses him, stating, “She’s perfectly rational.”", "We meet xXPonyPixelsXx for brunch at Trudy’s. It’s July, sticky and hot, and we sit under the misters with margaritas and Tex-Mex. She went to Harvard. SatinScreenName went to Dartmouth. SiliconRomeo was a CEO; StatusUpdateVIP is a CEO. Around this table, there is always another rung on the ladder.", "StatusUpdateVIP has a chip on his shoulder and finds himself “misunderstood.” I have seen him break dishes in restaurants to summon the waitstaff, then give his order before they can clean up the mess.", "His Instagram is a series of travel destinations: France, Rome, Russia, Japan, Spain. There aren’t many pictures of him with people. There are a few of xXPonyPixelsXx, despite the way he talks about her when she isn’t there.", "SiliconRomeo and StatusUpdateVIP talk about xXPonyPixelsXx as though she cannot understand them, even to her face. She is a personal assistant to an investor in the company. Her employer is a person of distinction. The distinction matters here.", "SiliconRomeo and StatusUpdateVIP never stop texting each other. Their closeness leaves little room for anyone else.", "xXPonyPixelsXx parks her white Ford Mustang across the street. She smiles broadly as we exchange pleasantries. We have known each other since grade school, but she hasn’t been texting me to hang out since returning from Europe. The conversation keeps turning to work and “important things.”", "Rumor has it StatusUpdateVIP will get his million-dollar deal this year. Spending money is how they relax from the stress of becoming people of importance.", "One time, xXPonyPixelsXx and I had a falling out. She had a coworker of hers post something on my Facebook. He told me my life wasn't worth reading about and that made me laugh, since it was obviously worth reading about to the point that she encouraged him to make that comment.", "There are rounds of margaritas and plates of fried food being lapped up, but not quick enough to counteract the liquor. xXPonyPixelsXx and StatusUpdateVIP were dating in February but now they are not. SiliconRomeo and I are supposedly dating now. He is the one who asked me out, and lately I'm not sure why. SiliconRomeo and xXPonyPixelsXx battle for StatusUpdateVIP’s attention. “RunwayAwayMsg” says SiliconRomeo, “Remember you went out with her on Valentine’s Day?” StatusUpdateVIP grunts and laughs. He can hardly contain the joy of having slept with his investors last girlfriend.", "xXPonyPixelsXx's lips begin to curl and she starts to cry. “We were dating on Valentine’s day!\" she wails, \"I’m out of here!” She gets up in a drunken stupor, all about making a dramatic scene. StatusUpdateVIP chides SiliconRomeo, “ You didn’t have to bring that up, that was mean.”", "StatusUpdateVIP goes after her like a nice guy might. They end up settling across the street from the table in a small median with grass and trees between the streets. SiliconRomeo is the first ambassador to go and find out how to wrap up this drama, and I watch as he pulls StatusUpdateVIP to the side. Their hands emphatically weave. He returns and tells me, “StatusUpdateVIP’s going to go back to Dallas. We have got to get rid of her. She’s going crazy and she can’t drive because she's too wasted.”", "In the name of sobering her up, StatusUpdateVIP drives us all back to my apartment. It's actually my brother’s apartment in River Oaks. He vacated it to move in with his girlfriend in the much more cute SoCo district. I am only camping here for summer school. Once inside, xXPonyPixelsXx opens the fridge and begins popping beers. She almost as quickly finds tequila, marg-mix, and ice since the fridge was being prepped for a party on the fourth of July.", "Whatever StatusUpdateVIP tells xXPonyPixelsXx when they're alone does not match the statements he makes to the rest of the world. It's similar to the quiet whispers of devotion and the promise of something real that SiliconRomeo would murmur into my ears when the two of us were alone. That is not a surprise to me.", "StatusUpdateVIP and SiliconRomeo are proud of their title: “evil social engineers.” They recount their latest maneuver at the company, where one is CEO and the other CFO. The company is being bought by Google. Their stories of success and their stories of betrayal use the same vocabulary.", "xXPonyPixelsXx, SiliconRomeo, StatusUpdateVIP, and I all end up drunk out at the pool. SiliconRomeo likes jealousy and so he starts taking off my clothes, giving me orders to go swimming.", "“Make xXPonyPixelsXx jealous.” His words remind me of the darker games we play together. I recently found a list in the notebook he bought me in Vegas: fetishes, bondage, games we had tried or talked about trying. Here, he wants an audience.", "xXPonyPixelsXx undresses and swims too. StatusUpdateVIP joins us. SiliconRomeo whispers, “Go and rub yourself all on StatusUpdateVIP, it will drive xXPonyPixelsXx crazy.” I do it. She splashes and shouts, demanding that StatusUpdateVIP go inside with her.", "Now the police are here, looking for the nude swimmers. By then, xXPonyPixelsXx and I have our swimsuits on. When the police leave, we go inside. StatusUpdateVIP takes her into a room. SiliconRomeo has swiped her phone and is trying to use voice control to call SatinScreenName, to get her friends to collect her. Instead, he calls PapaPixel, who calls him a dirty old bastard. A few minutes later, SatinScreenName calls. I describe the night. She is on her way with GalleryGirlXO and LateNightLogin.", "Half an hour later, they collect the Mustang and find xXPonyPixelsXx down the street. StatusUpdateVIP has run after her. He is still reacting to the names of the men she says she slept with after they broke up. SatinScreenName gets her into the car and takes her to her mother’s. She texts me: “Thanks for making me aware of the situation and welcome back to Austin.” I think I reply. I don’t text xXPonyPixelsXx. I’m tired of the games, and of everyone involved. I remember Christmas, sitting in the back of a car with xXVelvetRebelXx, whispering: “Never show that you feel anything. Keep a straight face. Never show your cards.” Over the music, OnePercentOnline announces, “I openly brag about being the 1%.”", "Turning twenty-four", "It is my birthday. I’m back in Austin after two years of running. My parents want me away from my old drug crowd, so I’m out with the straight shooters: SatinScreenName and her friend GalleryGirlXO. They went to Dartmouth. This is important. GalleryGirlXO’s father has a private jet. We talk about travel and cocaine. The conversation returns to who went where, whose parents paid, and which degree can get you a job.", "xXPonyPixelsXx met StatusUpdateVIP through an investor she works for. Tonight she is living in Prague. SatinScreenName, GalleryGirlXO, and I buy horrible coke from my little brother’s dealer. GalleryGirlXO is monologuing: “Well, CanvasCollector’s parents are amazing. I mean, they own three Picassos. They’ve established this amazing foundation in Peru where they teach English. It is going to look amazing on my resume and just be a fabulous break before I take over my aunt’s gallery in NYC. SatinScreenName, OMG! You should come. I can totes convince your parents to pay for it.” SatinScreenName hardly pauses. “Do you think I might lose weight in Peru?” Then she talks about a job interview in New York and wonders why she hasn’t heard back.", "GalleryGirlXO thinks weight loss would be possible in Peru. “I think they eat only rice or something provincial like that.” The chatter never dies. I make lines on my mirror and keep thinking the word “garbage.” I want silence. I resent their comfort, the money, the advice. I don’t take much from my parents because I hate the strings. Still, I’m here, making the lines.", "SatinScreenName insists we say hello to SiliconRomeo, StatusUpdateVIP’s business partner. We meet him on Red River by Stubb’s. He is small, blond, carefully dressed. I like his honey-dripped voice. He asks for my number. Later that week, xXPonyPixelsXx is back for SXSW, and StatusUpdateVIP flies in too. She asks me to go on a double date, to bring SiliconRomeo. I’m indifferent. My parents like me hanging out with her. The men produce their American Express cards. Two thousand dollars later, I’m wasted.", "I’m at xXPonyPixelsXx’s parents' house. I feel like I’ve been drinking here forever because I have been. Their house is actually a combination of two houses connected by a small glass room that houses many dying houseplants. Her mother lives on the right side, basically in her own house with her full kitchen, living room, the girls' rooms, the guest rooms, and the dining room. Her dad lives on the left side and has a urinal installed in his bedroom so he can drink Pabst Blue Ribbon all day long without having to get up and go to the bathroom.", "PapaPixel is a genius. The best line from him I ever heard was, “People will lie to your face.”", "Together, her parents own a collection of Austin properties, rentals, and a billboard off I-35. They have never divorced. Instead, they live on opposite sides of the house.", "CountryClubModem gives biting dating advice: “You da prize.” A big fish, she tells us, has family money.", "That night, I tell SiliconRomeo to sleep in xXPonyPixelsXx’s little sister’s room. He joins me instead. “You are so beautiful,” he says. “You must have everyone tell you that.” I tell him I’ve taken too many K-pins and only want to cuddle. He tells me about his parents, their marriage, his therapist. He speaks fluent French and Spanish, languages he learned from the people hired to care for him before he was six.", "In the morning, I try to sneak out. My mom is picking me up for a workout at the country club. I tell SiliconRomeo to have a good SXSW. I’m not sure I’ll see him again.", "Vegas. Our first date.", "SiliconRomeo texts and calls until I agree to a quick Vegas break. He emails the plane ticket and assures me I will love the Mandarin Oriental. I have spent other weeks in Vegas, playing poker and staying at the Venetian. I’m ready to give this version a shot.", "SiliconRomeo sends the car to pick me up from the airport. He asks me after I make it to the room if it was Mercedes. I can’t remember. Cars all look the same to me. He tells me to shower and that we are going to have dinner at eight. We go to the Blue Ribbon. Blue Ribbon is an amazing sushi place. All the CEO playboys from xXPonyPixelsXx’s co-worker pool want to eat there. If I ate fish, I’m sure I would have been blown away but mostly I just want to fuck.", "He complains about our table, and we are moved. A bottle of sake later, we walk through the new city center and into a club. We are on the list, so we don’t wait. He buys more drinks. After some drunk girls try to fight me, we go back to the Mandarin and stay in the room for a couple of days. I want to smoke the weed he brought from San Jose and have sex. He keeps asking how I like everything. It’s fine. I wish it felt special or different.", "StatusUpdateVIP, of course, had to join us. SiliconRomeo and StatusUpdateVIP seem to loathe their time apart and are always connected at least via text. The three of us are brunching by the Mandarin’s pool. If anyone ever asks you where you want to stay in Vegas and they are paying, tell them the Mandarin.", "At brunch, the men talk business, American Express, and how to get their colleague out of the company. StatusUpdateVIP keeps staring at my chest. Between the deals and the gossip, he talks about a model his investor is dating.", "The next morning, I wake with a hangover and angry texts from xXPonyPixelsXx. One says she appreciates that I haven’t repeated things her mother said about StatusUpdateVIP. I read it again, trying to understand what I am supposed to have done. I don’t want to get further involved.", "I am learning the art of silence, keeping everyone’s secrets around me, layer by layer."], "photo": {"src": "assets/atmosphere/R3141.jpg", "alt": "A golden illuminated rotunda and colonnade reflected in dark water."}}];
writingEntries.push(...[{"route": "breath-of-fire", "title": "Breath of Fire", "part": "FROM THE ARCHIVE", "finished": false, "paragraphs": ["Today I was very angry at my mother and didn't look both ways before crossing the street. It was the wind from the swerve of the white pickup truck that shook me back into consciousness. I wonder if I've died. I finish riding my bike across the street and into the Triangle, watching my hands shake and considering if I am real anymore. Perhaps death doesn't hurt and I had not felt my life slip away. I feel for my missing brain and wonder if it is still there--if I am still real, or solid, or a ghost.", "An old guy on a two-person bicycle asks me for directions to the saucer. Hence, I was still real.", "Almost “home,” I find a woman sitting on the cement-block fence, transfixed by her phone.", "“Are you waiting for BasementTrack6?” I ask.", "“I don’t know anyone who lives here.”", "“I live here.”", "“Uh, I'm sorry. I'm just waiting for my yoga class to begin. We practice down the street at the community center. I just liked this, spot. Nice Tree.”", "“Well, would you like to come in anyways and have some water?”", "I unlock the door and usher her inside with my bike. She introduces herself as MoonPetal404 and asks whether I’m looking for a roommate. Loaded question. I am finishing my undergraduate degree and am tired of the places I’ve found to live: xXCherryBomb77Xx, StereoGhostUK, and now GreatnessGuru24. Before I reply, my mind drifts to the sketches in the journal beside the couch.", "xXCherryBomb77Xx:", "xXCherryBomb77Xx inspires me to stay in and “work out my mind.” She moved to Austin in ’77 with one goal: to smoke weed with OutlawRadio. She accomplished it and repeats it frequently, but some of the luster has worn off. She misses the eighties. Everyone was here then. She and her friends were young, and the men were amusing. I am getting sober from pills and partying. I notice her constant sniffles but say nothing.", "One day after class, she tells me she envies how close I am to finishing school. I’m frightened by the prospect of staying here. One morning I wake to her seventy-two-hour romance with WhiskeyStatic. They offer me whiskey; I decline, then volunteer to buy pears for their breakfast. Later she decides he is a loser: over forty, no savings, no house. She insists they didn’t sleep together.", "She says she hates children, yet mentors a “little sister” and wants to study social work. I can’t reconcile the things she tells me.", "There are bugs in the furniture. At night they creep out and feed. I dream of being devoured by insects and wake feeling them on my skin. I stop sleeping at normal hours. Online, I read that bedbugs are most active between three and five in the morning. My new schedule aggravates her.", "She begins to suspect I am plotting against her, declaring a dirty tampon discovered by her cat as absolute proof of my disgusting nature and ill-intent. Her live firearm stockpile makes me more than uncomfortable and she tries to pick fights with me, so I start looking for other places to live. I move out on a Sunday and she is screaming at me to pay bills I don’t owe. I point out that she owes me money and tell her I will call the police if she does not back away.", "The StereoGhostUK connection:", "StereoGhostUK is a musician from the U.K. who moved to Austin because it was cheaper. I arrive looking for anything that will get me out of the last house.", "He sees my cash and lets me move in with few questions. BasementTrack6 lives upstairs. If they belonged to better-known bands, one would be in the Brian Jonestown Massacre, the other in the Dandy Warhols. BasementTrack6 is only home between six p.m. and eight a.m. StereoGhostUK spends part of that time downstairs with his family and the rest in the loft above our rooms.", "Every morning I wake to the muffled voices of StereoGhostUK and VinylViolet fighting. He needs a job. A job doesn’t fit his creative schedule. He is working on an album, long after the money from the last one has run out.", "I want to leave when I discover what looks like a meth lab in the recording studio. I’m afraid of being blown up, and worried about the children downstairs. VelvetDialup and NeonAfterhours come around in the afternoons, barely able to form sentences, always using our shower.", "BasementTrack6 and I resolve to find somewhere better. I fly to the Bay Area for the holidays. Later, GlitterCircuit reminds me how small Austin is: she made out with StereoGhostUK when he first moved here. BasementTrack6 tells her he had children then too.", "GreatnessGuru24:", "If we had read GreatnessGuru24’s website more closely, we might have skipped this battle of dominance. He has made “amazing breakthroughs” and now charges hundreds of dollars an hour to help other people make them too.", "He tells us about his private college and the job he found through its alumni network. His parents bought the house. I am renting a front room in someone else’s certainty.", "He can barely look up from a self-help podcast to notice us. The trash, recycling, and dishwasher remain somebody else’s problem. He tells us we can’t smoke weed in the house. We do anyway.", "I finally answer MoonPetal404: “No, not really, until I move back to Los Angeles.” She moves on to her yoga class, led by Sikhs. I want to go. I change, grab my mat, and take pineapple, grapes, and melon for the dinner afterward.", "MoonPetal404 and I walk down the block to the nondescript apartment complex I have seen a hundred times before. This is the community center where LotusGlow leads the yoga practice. MoonPetal404 points out a woman with a pink turban and an African American girl on roller-skates and a younger boy of six as her teachers.", "LotusGlow is dressed in white, with plastic gloves over white gloves. I wonder why, but MoonPetal404 doesn’t know. She nurses her baby, then excuses herself when the baby cries. MoonPetal404 leads us. The only pose I can think of is pigeon.", "LotusGlow reenters just as we complete the pigeon on the left side. She reassumes the lead and asks us to sit cross-legged and to visualize an inner fire or candle burning within. We are to lift our left hands to the sky--straight through our hearts--and we are to keep our right hands out and pointed to the floor. Hold. And hold. And hold. And hold. MoonPetal404 is starting to wilt. LotusGlow instructs, “Visualize the pain and discomfort. Feel it and embrace it. As you pull through the destruction, feel yourself growing stronger. Anchor yourself with your breath. Focus.” My arm is burning and the place where my shoulder meets my neck throbs. This does not hurt as bad as I have felt before, though, and as instructed I am embracing the pain.", "And, “Time,” LotusGlow calls and instructs us to hold the exact opposite position now.", "The opposite. I visualize xXBlueVelvetXx. My mother’s brother married my father’s sister: we are double cousins. She is two and a half years older. Those years used to be light-years. We shared beds and secrets. I took her words as rules, even the rule that the only place to fart was the bathroom. Her parents sent her to Waldorf school and banned plastics and Barbies.", "During our summer visits to Vermont, all she wants are my Barbies. My father, often away on business, brings them home: clothes, shoes, a car, a house. My aunt and uncle ban these “evil idols.” She hides mine away. When I visit again, she unearths them and we play as though they are hers.", "I think I would have given her one had she asked, but it wouldn't have been the one she wanted.", "I had not seen her in forever, since Oregon, when she asked to come stay with me. My house off South Congress was huge. I assumed it was the reputation of a live party city which incited her visit.", "“Next,” LotusGlow chimes, \"We are going to visualize a forest. See the tree growing tall and strong, and the harmony of nature. Even nature must sometimes burn.\"", "The forest I see is in eastern Oregon, on the trail to the Bluehole. At first there is shade. Then ash, sun on bare skin, charred sticks where the pines stood.", "People start fires with cigarettes and poorly extinguished campfires. Nature starts them too. The fire can last for weeks. On the trail, small dots of green are beginning to take back the ash.", "That is the trail that leads you right to the top of the Bluehole.", "My mother and her brothers never agree on the length of a hike. With them, two miles becomes seven and seven becomes twenty. There may or may not be food. My uncle uses the walks to teach us to forage, find north, recognize edible plants, and look for drinking water.", "Water is what I get wrong. One year, I’m rushed to the hospital after drinking from a stream I thought was safe.", "There is no quiet outside of the woods. Cities are always humming with electricity and cameras, messages, and advertisements. Two months was the longest I lasted in the woods. I mostly missed the internet and, I am ashamed to say, Ivy tower conversation.", "Merton describes five modes of adapting to society. I think of the people in the woods as retreatists. Yet even here, it is hard to find solitude, a place outside the network.", "At camp I meet ForestStatic, whose “women in the kitchen” jokes irritate me. He has read some of the books I have. I watch him struggle to name flowers and soil types. SageSignal offers Reiki and a sage cleansing; he looks as though he might die of discomfort. I decide he and I are innovators: we reject society’s means, but not its goals.", "ForestStatic admits that I’m less of an idiot than everyone else here. He tells me his dad committed suicide when he was fourteen and says that is why he is so messed up.", "These people think the world is ending, as does my father. They have done more to prepare. Their community is off the grid, with generators, water, gardens, guns, and animals.", "I have heard about the end of the world for a decade and remain doubtful. My father never joins our trips to Oregon. We are sent there when we become too much of a headache. I can’t imagine him spending time with my mother’s brothers.", "I remember the three of us in-between cousins, RiverRunner88, xXBlueVelvetXx, and I, all peering at the edge of the Bluehole. My brothers are babies. Too young to jump, they are standing to the side with my mother. I'd say it is only forty-five feet down. A little jump. The Bluehole is the calm in the storm of the river and that is because of the hole itself. The water stops its rushing and goes from being a level five rapid to what most would consider a refreshing pool (if it was not filled with freezing glacier water and there was not a bad undertow).", "I jump first. The water smacks my side slightly but I mostly hit the jump pointed. Two seconds of shock, then my body goes numb and I can’t feel that the water is cold. The undertow is sucking me down. I burst upward with my legs, contorting my muscles. I reach the surface gasping for breath. xXBlueVelvetXx is right behind me and to my left. Her cool, blue, cat eyes are smirking.", "RiverRunner88 is sinking. He reaches the surface, gasps, and dips under again. xXBlueVelvetXx and I rush to him, one on each side. We are strong swimmers, both born on Lake Champlain, and pull him to the shore. She performs CPR. He coughs up water. Above us, on the cliff, our family watches. We have turned an afternoon’s dare into a rescue.", "“Now, we are going to pucker our lips and breathe and become the fire. Deeply breathe from your stomach, imagine, you are the flame, and you are growing bigger and bigger. Your past is burning. You are visualizing burning yourself down with the forest. Concentrate on your breath, we are going to be doing this for a long time. Do not stop,” LotusGlow commands. I breathe and see the fire. My whole body is starting to feel very hot.", "I’m holding the position and I can’t feel my arms. I descend into the fire.", "I wake alone on the couch after drinks at dinner. In our red bedroom, you and xXBlueVelvetXx are naked in the black silk sheets. I scream and slap your face. Then I’m on the floor and you’re punching me. Three hits to the temple before I black out. When I come to, the world is a broken filmstrip. My balance is gone. Someone has taken my phone. I can’t stop vomiting. I want a doctor. I think I reach the neighbor’s yard before passing out again. I wake in a locked closet, on a pillow, with water beside me. Outside, a voice says I am too bruised to go out and asks whether I want food.", "How does a mouse escape a beast? Cunning. I learn when to lie and when to tell the truth. xXBlueVelvetXx says nothing happened and goes away. My face says otherwise.", "“Switch arms and continue to hold. Focus on the breathing, ladies. Keep going.” LotusGlow's voice is a beacon. I am far from the end and I think about the beginning. I think about the first lie.", "“EVERYONE GET ON THE FUCKING GROUND!”", "“GET ON THE FUCKING GROUND”", "“WHAT THE FUCK?”", "“YOU WANNA DIE? YOU DON’T? GET ON THE FUCKING GROUND”", "“DON’T MOVE. NOBODY MOVES.”", "“EVERYBODY, GET NAKED”", "“NO. STOP. MOVING.”", "“DON’T MOVE.”", "“WHERE’S HouseAlwaysWins?”", "“WHERE’S FUCKING HouseAlwaysWins?”", "“I’M GOING TO SHOOT SOMEONE.”", "There are shots fired.", "“Hey, hey, I’m going to stand up. I want to help you guys get out of here. HouseAlwaysWins isn't here. He goes downtown on Fridays. The only cash here is from the game tonight. It's in the back and I would gladly get it to you gentlemen, but nobody here knows the code to the safe and I would assume you guys want to get out of here as soon as possible.”", "“GET UP, GET TO THE BACK, GET THE MONEY. PUT IT IN A BAG.”", "He nods at the one with the M-16.", "“WATCH THE REST OF ‘EM. DON’T LET ANY OF THEM MOVE.”", "“Give me your watch. Now your wallet. Now your iPhone.”", "Shots and the showering bullets can be heard from behind the wall.", "“What's the safe combo? We see the safe. It's bolted and we can’t shoot it free.”", "“I don’t know. Only HouseAlwaysWins knows.”", "“YOU'RE LYING!”", "“TELL US THE COMBO!”", "Shots.", "“No one here knows. Take the money from tonight’s game.”", "“THAT'S NOT ENOUGH! THERE ARE FOUR OF US!!!”", "“WHAT IS THE SAFE CODE?”", "“I don’t know it.”", "Now there are sirens and a chopper in the distance.", "“Let’s just take the cash and get going.”", "“FUCKERS, GET OUT YOUR IPHONES AND WALLETS. PLACE THEM TO YOUR LEFT.”", "“Good, good.”", "“If any of you follow us out, we will kill you.”", "The four men exit.", "“Should we run?”", "“Are we going to get in trouble?”", "“MidnightModem and PinkPixel already called the cops.”", "Everyone tries to leave. A line of SWAT awaits outside. There are eight officers in full body armor and shields.", "“Alright, folks. We know you were gambling here tonight. That is illegal in the state of Texas. We don’t care. We want the guy with the assault rifle. We are going to have to interview each one of you before you're able to leave here tonight.”", "Then there are interviews.", "I saw the rifle break the sliding glass door where I usually sit. I ducked and pulled two chairs over myself. They didn’t see me. MidnightModem and PinkPixel slipped into the garage. PixelDragon stood frozen until CardShark pulled him down. Bullets sprayed the room. I stayed still, trying not to draw attention.", "The guy I'm with tells me this, \"just between him and I\": “Don’t tell your parents about this. They won’t think I’m a good guy. Just keep this a secret, just between us. You're fine right? Just shook up. I won’t make you go gamble any more in Texas. We can go to Vegas instead, okay?”", "“Okay.”", "“Now, visualize the forest burning down. The fire is red and hot, eating the green alive and steam and smoke hisses as the green dies. Now visualize the years that pass, and the forest growing back.” My hands are sweating and I visualize burning my old self down and rising from the ashes. The fire is a fever, descending through my forehead and consuming my whole body. I'm shaking. Channels revolve in my mind, all promising possible futures.", "LotusRoadtrip visits from Houston and takes me for Thai food. He asks whether I’ve heard from HeartOnAway or CrashLandingXO. “No,” I tell him. Neither relationship was healthy for me. He recounts their falling-out. I recognize the old pattern and don’t want to step into it.", "Now my body is cold. I’m on my back and I’m shaking. All the heat has evaporated from my body. I can’t feel my arms or legs. LotusGlow places a blanket over me as we begin the relaxation phase.", "After class, we have dinner. LotusGlow’s husband tries to place me. He thinks I’m a yogi. I have practiced since thirteen, but I don’t call myself one. He tells me about meeting LotusGlow through meditation and urges me to find my soul, my “third eye.” I congratulate him on passing the bar. I have not yet found myself in another person. He asks me to forgive my family, to consider that they cannot see the colors I see.", "I walk home.", "\"God is nothing but your own inner consciousness”", "Now I will agree with you that you cannot always feel this God,", "but that is because you think that you are separate from God.", "We call it Maya. Maya is the illusion of separateness:", "it is the quicksand of this life.", "Sometimes we sink into this quicksand", "and then we need a hook; we need some guidance", "to help us pull ourselves out", "so that we can continue our journey.", "The hook that we use to do this is called the Guru.\"", "\"If you cannot see God in all,", "you cannot see God at all.\"", "~ Siri Singh Sahib Bhai Sahib Harbhajan Singh Khalsa Yogiji"], "photo": {"src": "assets/atmosphere/16.jpg", "alt": "Still water glimpsed through shaded tree trunks and branches."}}]);

writingEntries.unshift(...[{"route": "white-christmas", "title": "White Christmas", "part": "FINISHED WORK", "finished": true, "paragraphs": ["The Play of Life: The Beginning", "Setting: A barren living room. A couch infested with spiders and bedbugs. Anyone sitting on it starts itching. Two dining chairs surround a small table. An ancient TV. An ancient recliner.", "Characters: Ego,", "SuperEgo", "and Id", "Me: What is my purpose? What am I for?", "me: Is the only philosophical question whether or not to kill yourself?", "Me: I love no one. I love nothing. I feel nothing. No one reads Henry James. In heaven everybody reads Henry James.", "me: No one likes me. I conclude I must be evil because I don’t fit in. I’m not a sheep, not even a black one.", "Me: How much longer can I live in this void? What is right? What should I do? Happy was so long ago, before I was told it was a sin to dream. I dared to dream and lost.", "me: Here my past haunts me like a cow.", "Me: I am. Still here. There must be a reason.", "I’m lying in xXVelvetRebelXx’s bed, one fluffy cloud in a room packed tight. Her cauldron sits on a table too grand for the space, furniture left over from her mother’s days in the city before the divorce. There are two feet between the bed and the wall, a narrow strip at its foot, and a wardrobe full of shoes. She loves clothes as much as I do. Wildfox T-shirts fill the room.", "She paints the way I wish I could. Her bold, controlled color makes me want to cry. She has developed a lacquer process to seal her work. Once, when she needed money, she sold a painting for a few thousand dollars, but she prefers to keep them. She pulls out a Betsey Johnson purse she has repainted in cracked black; I can’t imagine it ever being white. She gives me pants she has deconstructed. They no longer fit her since rehab. She looks at my gaunt body.", "My travel plans, arranged around the end of a relationship I entered while running away, have left me in Los Angeles for Christmas. xXVelvetRebelXx understands trauma. We need few words between us. She is the second person this week to call me “love avoidant.” The first night we met, she tried to sleep with me. I felt tenderness, but what I wanted was friendship. I love her honesty. Now she sits beside me with a lighter, a straw, and foil. She heats a ball of tar and draws in the smoke. Her secret from her friends. As her dealer puts it, “You don’t stop using opiates, you take breaks.” I pass.", "On Christmas morning, her father’s presence lingers in his presents: an electric toothbrush and a scarf. Last night he took us to dinner in his Porsche and lectured on success. Practice. Preparation. Dedication. I ordered a cocktail; she refrained, trying to convince him she was sober. He had paid for rehab. She should be fine now. He dropped us near her mother’s apartment. She says she lives with StarletOffline. Actually, she is living with her mother and using again.", "It’s Christmas. We both want to have fun. She texts her old friend SilverPenthouse until he agrees to pick us up. She is against walking, ever.", "He arrives in a silver car with black leather seats and Grey Goose and cranberry waiting inside. We go for Chinese. He orders too much. I drink hot green tea; most of the food goes to waste. After talking about software, he suggests ecstasy and gives us green pills. On the way to his penthouse, he stays on the phone, ordering more drugs and people.", "She sprawls backward over a leopard ottoman, legs where she should be sitting. Big glasses, a winter hat, a fuzzy white sweater with pearls. She is bored of SilverPenthouse. When he returns with his friends, she wants to leave with NeonMixtape and SkinnyJeansStereo. She has heard about a better party in the Hills. I nod.", "SilverPenthouse made money in software and met her through escorts four years ago. Watching him arrange the night, I feel my patience go. He assumes everything is for sale. I’m tired of being included in that assumption.", "When he returns, she corners SkinnyJeansStereo and NeonMixtape. A man with mascara on his eyelashes tries to persuade me to take GHB. She joins us and accepts a long stream from his dropper. I turn away. I want out of the conversation. The others are ready. We promise SilverPenthouse we’ll text if the next party is good. We won’t.", "We squeeze into the back of a tiny yellow sports car. It is late; the highway is empty. Rap surrounds us. She wants to smoke and SkinnyJeansStereo tells her to wait. A Christmas without snow, cool and crisp. We pass whiskey and a baggie. She calls for the keys and takes three snorts. I take two. Seeing her world has made me ready to face mine. My flight is booked. I have stopped lying to myself about the romance I came here to escape.", "At the house, the men whisper to each other. Here they might be discovered. She turns to me: “I can’t believe we’re going to DiamondFrequency’s house.” Then, seeing my face: “You don’t know who that is, do you?” I can’t keep track of everyone in Hollywood. At the door, the men give names and security waves us through. The party always needs more girls.", "Two girls greet us eagerly, relieved to see people closer to their age. One has braces and dark chestnut hair. I call her Baby; together, I think of them as the Kids. They shouldn’t be here. I shouldn’t be here. It is Christmas Day, somewhere in the limbo between childhood and adulthood. The only snow is the kind that blows up your nose.", "DiamondFrequency hosts in the library and the adjoining living rooms. Outside, a lit courtyard is stocked with statues of the wine god. Inside: marble, paintings of Dionysus, rare books. A book on the coffee table is said to be worth twenty thousand dollars. I want to check the edition, but I can feel the cameras. Instead I stand by the fireplace. The back wall is glass, one seamless window over Los Angeles.", "There are models and industry people. A guest introduces herself and leaves soon afterward. The evening feels closer to Eyes Wide Shut than a Christmas gathering. Three women change into the host’s robes: red, teal, royal blue. I wonder why he keeps so many short robes in his closet. Bluebeard comes to mind. Around Baby, the adults’ attention feels wrong.", "The woman in teal wants the Kids gone. She keeps close to DiamondFrequency. Later, he, xXVelvetRebelXx, and I crowd into a downstairs bathroom. She talks about singing while he empties half a bag onto the counter and offers me a hundred-dollar bill.", "I take it. The cocaine burns with a bitter, metallic aftertaste. I sing badly, perhaps on purpose. He loses interest. I’m relieved to be invisible again.", "After playing his beats in the library, he moves the party upstairs. His bathroom has long parallel vanities, fainting chairs, a bathtub facing the glass wall. He offers me molly because I’m not showing enough interest in the cocaine platters. A man signs a proposition to me. I check my translation, then look around at the people bent over the drugs. I leave.", "Baby follows me into a small bedroom without a view. I pour the molly into my cranberry vodka and offer her a sip. She drinks half before I take it back. I feel guilty. She cannot be more than sixteen. For a second I see myself at that age. I ask why she followed me. “Because I don’t want to fuck anyone else.”", "She tries to kiss me and pull me toward the bed, then starts crying. I hold her. She rocks so hard she shakes us both. Her mother has left; her father is sick. Other girls have nicer clothes. She tells me about her brother’s friends and men at parties, about sex she doesn’t want and waiting for it to be over. She feels empty. She shows me a scar on her forearm. How does she know to show me hers? Mine are hidden under my clothes. She asks if it ever gets easier. She didn’t want to come tonight, but her friend insisted. I look at her and remember high school.", "I want to cry too. Outside, xXVelvetRebelXx calls my name. The girls’ ages have come out and security wants them gone. Baby’s friend is crying, asking whether she has cab money. Neither does. DiamondFrequency supplies drugs, but not a ride home. “It’s five a.m.,” I tell xXVelvetRebelXx. “Let’s go.” We leave with the Kids. Outside, a man asks whether I know their parents. I don’t. He tells them they are too young to be at a party like this. I give them each half a Xanax as they get into the cab.", "We curl up in her white cloud of a bed as the sun comes into full force. She is already snoring. One more pill and I slip into a blank sleep. Her phone buzzes: more parties, more parades, more charades. My flight is in two days."], "photo": {"src": "assets/atmosphere/01.jpg", "alt": "A city skyline beneath layered pink and purple sunset clouds."}}]);

writingEntries.push(...[{"route": "sleeping-loner", "title": "Sleeping Loner", "part": "VOICE", "finished": true, "paragraphs": ["I find myself stranded at a café, briefly thinking I’ve lost all my clothes. My thoughts turn to failing to heal xXVelvetRebelXx.", "I tell the loner he is lonely. He insists he isn’t, then talks about moving to Austin. For eight hundred dollars, I tell him, he could have a place with a yard, fewer ghosts than this old motel. He could become a vegan chef.", "I knew he was lonely from the papers stacked everywhere, the small memory of his mother on a T-shirt, the pyramid totem on his dresser.", "He is full of stories. As we talk on the street, people gawk. Only a little boy with his babysitter says hello. He tells me about people who seem real while you’re talking, then never answer when you call. He wants a job waiting in Austin. I promise to try to help. I hope he finds someone there. No one should be left to die with ghosts. He should start eating again. Listening to him, I don’t feel so alone, so much like the only one who cares about this hidden history. He insists I learn about:", "Philip Emeagwali", "Sirius", "Thoth, from Khem"], "photo": {"src": "assets/atmosphere/02.jpg", "alt": "Moonlight reflected in still water beneath silhouetted trees."}}, {"route": "poetry", "title": "Selected Poems", "part": "VOICE", "finished": true, "paragraphs": ["1.", "Life is a simple equation of (x)a=C. If either a or x are 0, life cannot be created.", "2.", "Being present. A hard construct, filters include most activities besides being still. Still is the nature of nature.", "3.", "Where do memories live? A smell of fabric that touched both me and you triggers a marathon of memories. Seductive suction — the present moment disappears and I'm in a reconstructed past packaging the most suitable version for you.", "4.", "The world is chipped. The scar line between the fake and the real is exposed. My nail is chipped. Spit n sand. My life a sliced divot. A lost and lonely man.", "5.", "Mirror parallel universes. When I stare into the silver haze, not only my current face comes to meet my gaze. Occasionally I see crying. I see the tears caused by love affairs washed down the sink. I see smiles and healing. I see speeches I've yet to give. I see myself getting older. I see it all being ok.", "6.", "i miss you ghost. together we walked on this earth like ancients owing nothing. together we were gypsies.", "7.", "It is your Astral Body I've been talking to. No wonder you don't remember it. Your astral body looks just like you but your skin is whiter and glowing and you're teleporting from column to column speaking directly to my mind — no words. If yours is out doing this, what is the Astral me out doing?", "8. to my mother", "you tell people\ni have four kids\nwith a badge of pride\nas though giving birth\nwere the whole accomplishment", "9.", "In love three steps behind. You love me before I love you. I love you much longer after you stop loving me.", "10.", "feeling strained and drained. stained bullet hole in my heart. my heart is broken no matter how hard I've tried to put it back together. feels like I've been trying so long to fix this hole. I hardly remember who when or where shot me.", "11.", "time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am", "12.", "text message\nyou’re impersonal & discreet\nand now we no longer\nneed to talk to each other\nanymore", "13.", "Value\nis such a funny and impersonal thing. Is it worth more because it is new, or because it has experience? So much hate involved in being hip.", "14.", "Is the freedom to buy things really the independence we should all strive for? Or is it the perspective of an immortal who knows the earth is our Mother? We own nothing on her. She is good and graceful, and where we roam on her we are fed.", "15.", "i open the love spell bottle\nthe perfume is so enticing\ni am in love with its intoxication\ni shouldn’t but i do drop it on my eyelids\nchaos without intention\nmy headache is gone\na heartache awaits\ncurses for getting this high on magic\ni can feel it working already\nmy heart is beating faster\nand the scent will not leave my nose\naction rising."]}]);

const originalPoetry = writingEntries.find(entry => entry.route === "poetry");
originalPoetry.title = "Poetry";
originalPoetry.paragraphs = ["1. Life is a simple equation of (x)a=C if either a or x are 0 life can\nnot be created.", "2. Being present\nA hard construct, filters include most activities besides being still.\nStill is the nature of nature\nKale is creeping out of my skin force fed myself pounds of the green\nstuff\nEnjoy the present moment it is a gift clouds of doubt and fear isolate\nyour bright sun with fog", "3. Grammar a rudimentary formula punctuated by a battalion of\nstructure created by the patriarchy to continue to frame the\nhierarchical structure of the hoops I'm reminded by the media\neveryday to jump though.", "4. Where do memories live? A smell of fabric that touched both me\nand you triggers a marathon of memories. Seductive suction the\npresent moment disappears and I'm in a reconstructed past\npackaging the most suitable version for you.", "5. Is the freedom to buy things, really the independence we should\nall strive for? Or is it the perspective of an immortal that knows,\nthe earth is our Mother we own nothing on her, she is good and\ngraceful and where we roam on her we are fed", "6. I am filled with light. Praise to the universe. Bring me to my\nhome, fill my pockets enough to pay for it and my dreams of\nmaking films. Continue to give me strength in darkness that it\nwill all pour to light for me. Love and light and the best are\ninvited to enter me. Swell my heart.", "7. a thin choke circle of mucus was rotting in my throat\nproducing non-productive single tiny clauds of flem.\nthe life being choked out of me. smoking was a comfort a habit, a\nlove. green was always there. i can't think of any of one else there as\nmuch or in such a great capacity. now i feel guilt. sometimes I don't\nneed it. i'm contented to read. then sometime i blaze and I feel guilty.", "8. i thought i had died today. i was very angry at my mother and i\ndidn't look all the way before crossing the street. it was the wind\nof the swerve of the white pick-up truck that shook me back into\nconsciousness. i finished riding across the street and into the\ntriangle. watching my hands shake wondering if i was real\nanymore. perhaps death doesn't hurt and i had not felt. I felt for\nmy missing brain and wondering if it was still there. If I was still\nreal or solid or a ghost. An old guy on a two-person bicycle\nasked me for directions to the saucer. Hence, I was still real", "10. my stomach is growling\nonly I can take care of me\nI am tired\nI can’t pack up everything on my own\nlike I need your help\nI can pack up my stuff\nbut not yours too\nI’ve been hungry\nyou ate all the food without me\nyou care though that I can see", "11. Being alone is such a rough\nSup....\nI miss my exes\njust as cheesy as the rest\neveryone is sleazy and cheesy\ni’m not sure I will ever get someone real again", "12. time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am", "13. i’ve got so many numbers\ni’m not even sure who\ni’m talking too", "14. the smell of coffee roast lines my nose while I wait on this post", "15. the world is chipped. the scar line between the fake and the real\nare exposed. my nail is chipped. spit n sand. my life a sliced divit. a\nlost and lonely man.", "14. i miss you ghost\ntogether we walked on this earth like ancients owing nothing\ntogether we were gypsies", "15. Mirror parallel universes\nwhen i stare into the silver haze not only my current face comes to\nmeet my gape. occasionally, i see crying. i see the tears caused by\nlove affair washed down the sink. i see smiles and healing. i see\nspeeches i've yet to give. i see myself getting older. i see it, all being\nok.", "16. feeling strained and drained\nstained bullet hole in my heart\nmy heart is broken no matter how hard\ni’ve tried to put it back together\nfeels like i’ve been trying so long to fix this hole\ni hardly remember who when or where shot me", "17. i’m on nothing and i feel numb", "18. at night. i can hear the demons all about climbing up and down\nwalls murmured voices though the hell", "19. appreciating objects. the total destruction of man. objections\nmean nothing. Permanence is in abstraction.", "20. to my mother\nthe worst part about you,\nis that you take pride in reproducing like a cockroach, i remember you\ntelling people with a badge of pride. I have Four kids. like getting\nknocked- up was accomplishment", "21. he is just so dumb i can’t stand to continue this contrived\nconversation any further", "22. Oh m triple G. I hate how fucking small this town is. I hope I have\nhid myself well enough with all this red lips and sunglasses. I’m so\ntired of running into people that know me but I don’t can to see it is\nlike it is all planned for Heightened Dramatic Irony.", "23. Asking for help\nThis isn’t going to be fun. I need help. I am going to have to ask a\nfriend to help me out. Why it is so hard...humbling, yourself.", "24. The Erotic Nature of Feet\nas my feet now ooze and puss, I feel an orgasmic tingle, running up\nmy toes to my center and I wish someone would wash my feet.", "25. Voids\nstate of most beings. only looking to consume their next trend.\nwestern vampires.", "26. hipster\ni wear pants in the summer\nshorts in the winter\nthis makes me against “the man”\nBa, ah, haha, nature", "27. text message\nyour impersonal & discrete\nand now we no longer\nneed to talk to each other\nanymore", "28. Value\nIs such a funny and impersonal thing. Is it worth more because it is\nnew or because it has experience. So much hate involved in being\nhip.", "29. You don’t deserve your Face? I’ve paid, pretty is as pretty does.\nThe Iron Price for this face, more than twice. You reap what you sow.\nPhases that haunt me still.", "30. Labels\nscene hip people are impressed by boxes, houses, shells, exteriors,\nw/out a shill they will dine on you", "31. In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me", "32. i open the love spell bottle\nthe perfume is so enticing\ni am in love with its intoxication\ni shouldn’t but i do drop it on my eyelids\nchaos without intention\nmy headache is gone\na heartache awaits\ncurses for getting this high on magic\ni can feel it working already\nmy heart is beating faster\nand the scent will not leave my nose\naction rising.", "33. hanging out with outlaws\nrough, wild and running\nslightly, scary always,\nbut they will never kick you out\ngive you a bunk mate perhaps.\nforever a gypsy.", "34. violence\na evil hand that creeps everywhere\noh to be rid of the curse of hurt.", "35. It is your Astral Body, I’ve been talking to. No, wonder, you don’t\nremember it. Your astral body looks just like you but your skin is\nwhiter and glowing and your places where you could possibly be\nwatching me. Your glowing self teleports from column to column and\nspeaks directly to my mind, no words. If yours is out doing this, what\nis the Astral me out doing?"];

originalPoetry.poems = [{"number": "1", "text": "Life is a simple equation of (x)a=C if either a or x are 0 life can\nnot be created."}, {"number": "2", "text": "Being present\nA hard construct, filters include most activities besides being still.\nStill is the nature of nature\nKale is creeping out of my skin force fed myself pounds of the green\nstuff\nEnjoy the present moment it is a gift clouds of doubt and fear isolate\nyour bright sun with fog"}, {"number": "3", "text": "Grammar a rudimentary formula punctuated by a battalion of\nstructure created by the patriarchy to continue to frame the\nhierarchical structure of the hoops I'm reminded by the media\neveryday to jump though."}, {"number": "4", "text": "Where do memories live? A smell of fabric that touched both me\nand you triggers a marathon of memories. Seductive suction the\npresent moment disappears and I'm in a reconstructed past\npackaging the most suitable version for you."}, {"number": "5", "text": "Is the freedom to buy things, really the independence we should\nall strive for? Or is it the perspective of an immortal that knows,\nthe earth is our Mother we own nothing on her, she is good and\ngraceful and where we roam on her we are fed"}, {"number": "6", "text": "I am filled with light. Praise to the universe. Bring me to my\nhome, fill my pockets enough to pay for it and my dreams of\nmaking films. Continue to give me strength in darkness that it\nwill all pour to light for me. Love and light and the best are\ninvited to enter me. Swell my heart."}, {"number": "7", "text": "a thin choke circle of mucus was rotting in my throat\nproducing non-productive single tiny clauds of flem.\nthe life being choked out of me. smoking was a comfort a habit, a\nlove. green was always there. i can't think of any of one else there as\nmuch or in such a great capacity. now i feel guilt. sometimes I don't\nneed it. i'm contented to read. then sometime i blaze and I feel guilty."}, {"number": "8", "text": "i thought i had died today. i was very angry at my mother and i\ndidn't look all the way before crossing the street. it was the wind\nof the swerve of the white pick-up truck that shook me back into\nconsciousness. i finished riding across the street and into the\ntriangle. watching my hands shake wondering if i was real\nanymore. perhaps death doesn't hurt and i had not felt. I felt for\nmy missing brain and wondering if it was still there. If I was still\nreal or solid or a ghost. An old guy on a two-person bicycle\nasked me for directions to the saucer. Hence, I was still real"}, {"number": "10", "text": "my stomach is growling\nonly I can take care of me\nI am tired\nI can’t pack up everything on my own\nlike I need your help\nI can pack up my stuff\nbut not yours too\nI’ve been hungry\nyou ate all the food without me\nyou care though that I can see"}, {"number": "11", "text": "Being alone is such a rough\nSup....\nI miss my exes\njust as cheesy as the rest\neveryone is sleazy and cheesy\ni’m not sure I will ever get someone real again"}, {"number": "12", "text": "time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am"}, {"number": "13", "text": "i’ve got so many numbers\ni’m not even sure who\ni’m talking too"}, {"number": "14", "text": "the smell of coffee roast lines my nose while I wait on this post"}, {"number": "15", "text": "the world is chipped. the scar line between the fake and the real\nare exposed. my nail is chipped. spit n sand. my life a sliced divit. a\nlost and lonely man."}, {"number": "14", "text": "i miss you ghost\ntogether we walked on this earth like ancients owing nothing\ntogether we were gypsies"}, {"number": "15", "text": "Mirror parallel universes\nwhen i stare into the silver haze not only my current face comes to\nmeet my gape. occasionally, i see crying. i see the tears caused by\nlove affair washed down the sink. i see smiles and healing. i see\nspeeches i've yet to give. i see myself getting older. i see it, all being\nok."}, {"number": "16", "text": "feeling strained and drained\nstained bullet hole in my heart\nmy heart is broken no matter how hard\ni’ve tried to put it back together\nfeels like i’ve been trying so long to fix this hole\ni hardly remember who when or where shot me"}, {"number": "17", "text": "i’m on nothing and i feel numb"}, {"number": "18", "text": "at night. i can hear the demons all about climbing up and down\nwalls murmured voices though the hell"}, {"number": "19", "text": "appreciating objects. the total destruction of man. objections\nmean nothing. Permanence is in abstraction."}, {"number": "20", "text": "to my mother\nthe worst part about you,\nis that you take pride in reproducing like a cockroach, i remember you\ntelling people with a badge of pride. I have Four kids. like getting\nknocked- up was accomplishment"}, {"number": "21", "text": "he is just so dumb i can’t stand to continue this contrived\nconversation any further"}, {"number": "22", "text": "Oh m triple G. I hate how fucking small this town is. I hope I have\nhid myself well enough with all this red lips and sunglasses. I’m so\ntired of running into people that know me but I don’t can to see it is\nlike it is all planned for Heightened Dramatic Irony."}, {"number": "23", "text": "Asking for help\nThis isn’t going to be fun. I need help. I am going to have to ask a\nfriend to help me out. Why it is so hard...humbling, yourself."}, {"number": "24", "text": "The Erotic Nature of Feet\nas my feet now ooze and puss, I feel an orgasmic tingle, running up\nmy toes to my center and I wish someone would wash my feet."}, {"number": "25", "text": "Voids\nstate of most beings. only looking to consume their next trend.\nwestern vampires."}, {"number": "26", "text": "hipster\ni wear pants in the summer\nshorts in the winter\nthis makes me against “the man”\nBa, ah, haha, nature"}, {"number": "27", "text": "text message\nyour impersonal & discrete\nand now we no longer\nneed to talk to each other\nanymore"}, {"number": "28", "text": "Value\nIs such a funny and impersonal thing. Is it worth more because it is\nnew or because it has experience. So much hate involved in being\nhip."}, {"number": "29", "text": "You don’t deserve your Face? I’ve paid, pretty is as pretty does.\nThe Iron Price for this face, more than twice. You reap what you sow.\nPhases that haunt me still."}, {"number": "30", "text": "Labels\nscene hip people are impressed by boxes, houses, shells, exteriors,\nw/out a shill they will dine on you"}, {"number": "31", "text": "In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me"}, {"number": "32", "text": "i open the love spell bottle\nthe perfume is so enticing\ni am in love with its intoxication\ni shouldn’t but i do drop it on my eyelids\nchaos without intention\nmy headache is gone\na heartache awaits\ncurses for getting this high on magic\ni can feel it working already\nmy heart is beating faster\nand the scent will not leave my nose\naction rising."}, {"number": "33", "text": "hanging out with outlaws\nrough, wild and running\nslightly, scary always,\nbut they will never kick you out\ngive you a bunk mate perhaps.\nforever a gypsy."}, {"number": "34", "text": "violence\na evil hand that creeps everywhere\noh to be rid of the curse of hurt."}, {"number": "35", "text": "It is your Astral Body, I’ve been talking to. No, wonder, you don’t\nremember it. Your astral body looks just like you but your skin is\nwhiter and glowing and your places where you could possibly be\nwatching me. Your glowing self teleports from column to column and\nspeaks directly to my mind, no words. If yours is out doing this, what\nis the Astral me out doing?"}];

const originalLines = [{"text": "Life is a simple equation of (x)a=C\nif either a or x are 0 life can not be created.", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "If you cannot see God in all,\nyou cannot see God at all.", "route": "breath-of-fire", "title": "Breath of Fire · quoted passage, Yogi Bhajan", "kind": "quotation"}, {"text": "My hands are sweating and I visualize burning my old self down and rising from the ashes.", "route": "breath-of-fire", "title": "Breath of Fire", "kind": "story"}, {"text": "Permanence is in abstraction.", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "Her phone buzzes: more parties, more parades, more charades. My flight is in two days.", "route": "white-christmas", "title": "White Christmas", "kind": "story"}, {"text": "He is full of stories.", "route": "sleeping-loner", "title": "Sleeping Loner", "kind": "sketch"}, {"text": "Still is the nature of nature", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "They shouldn’t be here. I shouldn’t be here.", "route": "white-christmas", "title": "White Christmas", "kind": "story"}, {"text": "In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "Is it worth more because it is new, or because it has experience?", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "my headache is gone\na heartache awaits", "route": "poetry", "title": "Poetry", "kind": "poetry"}];
let originalLineCursor = 0;
const atmosphericPhotos = [{"src": "assets/atmosphere/01.jpg", "alt": "A city skyline beneath layered pink and purple sunset clouds."}, {"src": "assets/atmosphere/R3141.jpg", "alt": "A golden illuminated rotunda and colonnade reflected in dark water."}, {"src": "assets/atmosphere/02.jpg", "alt": "Moonlight reflected in still water beneath silhouetted trees."}, {"src": "assets/atmosphere/R0554.jpg", "alt": "A thin golden sunset horizon beneath deep blue sky, seen through an airplane window."}, {"src": "assets/atmosphere/03.jpg", "alt": "A quiet autumn woodland path beneath a dark branching tree."}, {"src": "assets/atmosphere/R0189.jpg", "alt": "White seabirds resting on a dark rock surrounded by rippling blue-green water."}, {"src": "assets/atmosphere/04.jpg", "alt": "A narrow waterfall falling between mossy rocks and sunlit woodland."}, {"src": "assets/atmosphere/R3145.jpg", "alt": "Pink and yellow flowers growing among coastal rocks."}, {"src": "assets/atmosphere/05.jpg", "alt": "A rainbow arching across a city beneath gray storm clouds."}, {"src": "assets/atmosphere/R3462.jpg", "alt": "Pink-lit clouds above a dark blue ocean horizon."}, {"src": "assets/atmosphere/06.jpg", "alt": "Dark tree branches against a soft pink evening sky."}, {"src": "assets/atmosphere/R4023.jpg", "alt": "A grand architectural dome illuminated red against the night sky."}, {"src": "assets/atmosphere/07.jpg", "alt": "Calm blue coastal water and an offshore rock, framed by dry grasses."}, {"src": "assets/atmosphere/08.jpg", "alt": "Pink bougainvillea climbing into a clear blue sky."}, {"src": "assets/atmosphere/10.jpg", "alt": "A quiet palm garden with white gravel and warm light."}, {"src": "assets/atmosphere/11.jpg", "alt": "Heavy storm clouds above a distant landscape."}, {"src": "assets/atmosphere/12.jpg", "alt": "A bright rainbow crossing a soft gray sky."}, {"src": "assets/atmosphere/15.jpg", "alt": "Pink flowers scattered across interwoven dark branches."}, {"src": "assets/atmosphere/16.jpg", "alt": "Still water glimpsed through shaded tree trunks and branches."}, {"src": "assets/atmosphere/17.jpg", "alt": "Clear turquoise water beneath a distant horizon and pale clouds."}, {"src": "assets/atmosphere/18.jpg", "alt": "Golden evening sunlight framed by a tall window."}, {"src": "assets/atmosphere/19.jpg", "alt": "Green moss and small ferns growing among shaded woodland rocks."}, {"src": "assets/atmosphere/21.jpg", "alt": "Coastal rooftops and palms beside the blue ocean."}];
let atmosphericPhotoCursor = 0;

const routes = new Set([
  "music",
  ...writingEntries.map(entry => entry.route),
  
  
  "enough-reading",
  "symposium-reading",
  "grimoire-reading",
  "worlds",
  "experience",
  "clothes",
  "gaming",
  "style",
  "anime",
  "events",
  "visual-media",
  "practice",
  "cover",
  "question",
  "reveal",
  "writing",
  "reading",
  "question-object",
  "world",
  "index",
  "leave",
]);

const archive = [
  { title: "ENOUGH.", route: "writing", category: "My book" },
  { title: "Reading", route: "reading", category: "Metaphysics, grimoires and ancient texts" },
  { title: "Questions", route: "question-object", category: "Questions I’m exploring" },
  { title: "Clothes & my closet", route: "clothes", category: "Poshmark, clothing and my first business" },
  { title: "Style", route: "style", category: "My style brief · AI styling template" },
  { title: "Gaming", route: "gaming", category: "Fortnite · cloeystarr" },
  { title: "Human experience", route: "experience", category: "Professional life, companies and creative work" },
  { title: "Worlds", route: "worlds", category: "Building, anime, visual media and practice" },
  { title: "Music", route: "music", category: "Spotify and favorite playlists" },
];

// Workspace drafts exist only for this page session.
let workspaceDraft = { title: "", raw: "", guest: "" };
const questions = [
  "Can devotion and self-sovereignty coexist?",
  "What do you believe that you cannot prove?",
  "Research all the temples in California: each temple's name, the nearby natural feature or city, and its spiritual lineage.",
  "Research fae worship around the world.",
  "Why did the Church condemn fairies and associate them with devils?",
  "Why was medieval demonology a war on fairy belief?",
  "How did someone signify they were a fairy believer?",
  "Are witches and fairies related?",
  "Was the Inverness case about a witch or a fairy?",
  "Are there Druid fairies?",
  "How did fairyland offer its own version of everything Christianity claimed a monopoly on: an afterlife, a moral order, supernatural authority, salvation?",
  "What fairy experiences come through in the witch trial confessions?",
  "Who is the Queen of Elphame?",
  "When did fairy belief collapse into witchcraft?",
  "How does this fit with the lore about an advanced Celtic race whose knowledge wasn't written down?",
  "What is the elder species (elder race)?",
  "The elder race is indifferent toward humanity and has its own rules and customs. Do Krishna devotees know this, and how do they understand it, since in their minds Krishna is supreme, yet Krishna doesn't rule these beings and they have equal if not more power?",
  "Why did Hinduism rank gandharvas and apsaras as lesser than gods?",
  "Why don't religions like Baha'i endorse entheogenic states for talking to them?",
  "There are 14 lokas in Hinduism. Where is the elf world among them?",
  "Tell me more about gandharvas and apsaras.",
  "Tell me more about Samkhya and Shaiva Siddhanta and their relation to the fae.",
  "Is bhakti Krishna worship more like Christianity within Hinduism?",
  "Is there a way to explore Samkhya near me?",
  "Where is the fault line between Samkhya and Advaita?",
  "I don't eat meat, and I believe eating meat hinders seeing sprites or fae. I've had the fae with me my whole life, made deals with lower fae, built relationships with higher fae, retrieved an elder wand for them, make enchanted objects, and see and move threads of fate. How does Hinduism explain this?",
  "What do other texts say about these abilities, since I already have them and don't see the point in ceasing to develop them?",
  "Can I explore tantra teachers near my house?",
  "Why can't I find this lineage in SF?",
  "What are the ancient texts on cannabis as a sacred plant (texts only)?",
  "What do the Vedas and fairy lore traditions say about the chakra systems?",
  "What do tantric texts say about entheogens and altered states, and what was the debate over it?",
  "What are the primary historical accounts of seeing the weave in contemplative literature?",
  "How do the four core patterns of the weave compare to the four core chakras in Buddhism?",
  "Which tantric text says wine or hemp should be used in worship, and why does wine and reading feel like a spiritual practice?",
  "What are the formal ceremonies, and how is Buddhism connected to using intoxicants?",
  "How does this tie into sacraments and blessing rituals?",
  "What do Teresa of Ávila's Interior Castle and Julian of Norwich say in their own words?",
  "How do the Vedic, Celtic, and South American traditions compare, in order of which is oldest?"
];
let questionCursor = 0;
const questionAnswers = new Map();
const questionDrafts = new Map();
let entranceAnswer = "";
let alternatePath = "reading";

function navigate(route) {
  window.location.hash = route;
}

function shell(content, { className = "", showIndex = true, label = "" } = {}) {
  return `
    <main class="entry ${className}">
      <header class="entry__header">
        ${label ? `<p class="eyebrow">${label}</p>` : "<span></span>"}
        <nav class="entry-navigation" aria-label="Site navigation">${className === "cover" ? "" : '<a class="index-control" href="#cover">HOME</a>'}${showIndex ? '<a class="index-control" href="#index">INDEX</a>' : ""}</nav>
      </header>
      <section class="entry__body">
        ${content}
      </section>
      <footer class="entry__footer"></footer>
    </main>
  `;
}

const styleBrief = "MY STYLE BRIEF\n\n1. IDENTITY\nStyle name or archetype (Kibbe type, a style word, or your own label):\nThree references (people, eras, films, characters):\nThe feeling I want my clothes to give me:\n\n2. BODY AND FIT\nFit notes (bust, waist, hips, torso, height, anything clothes get wrong):\nNecklines that work / necklines that don't:\nSilhouettes that work / silhouettes that don't:\nMy non-negotiable (the one thing every piece must do):\n\n3. COLOR\nTop color:\nSupporting colors:\nNeutrals, and when they work:\nColors and prints to skip:\n\n4. FABRIC\nFabrics I love / fabrics I avoid:\nCare preferences (machine washable, etc.):\n\n5. HARD NO LIST\nItems, details, and brands I never want recommended:\n\n6. SIZING\nTops / Dresses / Bottoms / Shoes, with notes on when to size up or down:\n\n7. SHOPPING FILTERS\nWhere I shop, budget or sale rules, new vs. secondhand:\n\n8. OUTFIT FORMULAS\nTwo or three combinations I actually wear:\n\n9. TIEBREAKER RULE\nWhen two pieces are close, I pick the one that:\n\nHOW TO USE THIS: For each item I share, give me\nVERDICT (Strong Yes / Maybe / Skip), WHY (1 to 2 sentences against my brief),\nand WEAR IT WITH (one outfit formula). Be decisive. I want the right call,\nnot encouragement.";

const views = {
  cover() {
    return shell(`
      <h1>CHLOE STARR</h1>
      <p class="cover-introduction">Storyteller. AI-native builder</p>
      <aside class="original-line cover-writing" aria-label="Lines from my writing">
        <blockquote id="original-line-text" aria-live="polite">${escapeHtml(originalLines[originalLineCursor].text)}</blockquote>
        <div class="atmosphere-window"><img id="atmosphere-photo" src="${atmosphericPhotos[atmosphericPhotoCursor].src}" alt="${escapeHtml(atmosphericPhotos[atmosphericPhotoCursor].alt)}" width="1200" height="800"></div>
        <div class="actions"><button type="button" class="text-action" data-next-line>another line ↻</button><a id="original-line-source" href="#${originalLines[originalLineCursor].route}">read ${escapeHtml(originalLines[originalLineCursor].title)} →</a></div>
      </aside>
      <p class="cover-venture"><a href="https://ompom.ai" target="_blank" rel="noopener noreferrer">Founder of ompom.ai ↗</a></p>
      <nav class="cover-socials" aria-label="Find Chloe on social media">
        <a href="https://x.com/cloeystarr" target="_blank" rel="noopener noreferrer">X ↗</a>
        <a href="https://www.instagram.com/cloeystarr/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="https://www.linkedin.com/in/chloestarrai" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/cloeystarr" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://www.youtube.com/@TheCloeystarr" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
        <a href="#events">Events ↗</a>
      </nav>
      <div class="actions">
        <button class="action" type="button" data-route="question">[ enter ]</button>
      </div>
    `, { className: "cover", showIndex: true });
  },

  question() {
    return shell(`
      <h2>What do you believe that you cannot prove?</h2>
      <form id="entrance-form">
        <label for="entrance-answer">Your answer</label>
        <p class="note">Your answer will be sent to Chloe and saved privately. You can also pass.</p>
        <textarea id="entrance-answer" name="answer" required>${escapeHtml(entranceAnswer)}</textarea>
        <div class="actions">
          <button class="action" type="submit">[ leave an answer ]</button>
          <button class="text-action" type="button" data-pass>pass →</button>
        </div>
      </form>
    `);
  },

  reveal() {
    const acknowledgement = entranceAnswer
      ? '<p class="acknowledgement">You left something here.</p>'
      : "";

    return shell(`
      ${acknowledgement}
      <p class="prompt">Going back in this notebook is like drifting down a river of time. Who was that person scratching away in here? Another me.</p>
      <div class="actions">
        <button class="text-action" type="button" data-route="writing">continue →</button>
      </div>
    `);
  },

  writing() {
    return shell(`
      <h2>ENOUGH.</h2>
      <p class="byline">My book · a short story collection</p>
      <p class="note">Selected creative writing. The stories are fiction.</p>
      <aside class="original-line" aria-label="Lines from my writing">
        <p class="quiet-label">FROM MY WRITING</p>
        <blockquote id="original-line-text" aria-live="polite">${escapeHtml(originalLines[originalLineCursor].text)}</blockquote>
        <div class="actions"><a id="original-line-source" href="#${originalLines[originalLineCursor].route}">read ${escapeHtml(originalLines[originalLineCursor].title)} →</a><button type="button" class="text-action" data-next-line>another line →</button></div>
      </aside>
      <nav class="collection-contents" aria-label="Featured finished work">
        <p class="quiet-label">FINISHED WORK · SELECTED READINGS</p>
        ${writingEntries.filter(entry => entry.finished).map(entry => `<a href="#${entry.route}"><span>${escapeHtml(entry.title)}</span><span aria-hidden="true">→</span></a>`).join("")}
      </nav>
      <div class="actions"><a href="#enough-reading">The book’s reading list →</a></div>
    `, { label: "ENOUGH." });
  },

  reading() {
    return shell(`
      <h2>Metaphysics, grimoires &amp; ancient texts</h2>
      <p class="object-copy">Change. Consciousness. Death. Perception.</p>
      <p>My reading reaches back through centuries. The I Ching is where I’m studying most devotedly right now.</p>
      <p>Read along. Leave a thought.</p>
      <section class="reading-section" aria-labelledby="ancient-reading-title">
        <h3 id="ancient-reading-title">Ancient texts</h3>
        ${bookList(ancientReading, true)}
      </section>
      <section class="reading-section" aria-labelledby="metaphysical-shelf-title">
        <h3 id="metaphysical-shelf-title">Metaphysical shelf</h3>
        ${bookList(readingList.filter(book => book.section === "Metaphysical shelf" && !book.title.startsWith("I Ching")))}
      </section>
      <section class="reading-section" aria-labelledby="fey-research-title">
        <h3 id="fey-research-title">Fey research for my book</h3>
        <p class="note">My research list, in priority order. These publication dates describe the research books, rather than the age of the traditions they study.</p>
        ${bookList(readingList.filter(book => book.section === "Grimoire research"), true)}
      </section>

      <p class="note">Ages are approximate as of 2026. Ancient works developed in layers; composition, traditional attribution, surviving manuscripts, and modern translations have different dates. This chronology does not imply a single line of descent between traditions.</p>
      <nav class="collection-contents" aria-label="Other reading collections">
        <p class="quiet-label">ALSO ON MY SHELF</p>
        <a href="#enough-reading"><span>ENOUGH. — the book’s reading list</span><span aria-hidden="true">→</span></a>
        <a href="#symposium-reading"><span>Short Story Symposium — reading together at The Commons</span><span aria-hidden="true">→</span></a>
      </nav>
    `, { className: "reading-entry", label: "READING" });
  },
  "enough-reading"() {
    return shell(`<h2>ENOUGH.</h2><p class="object-copy">The book’s reading list.</p>
      ${["First section", "Second section"].map(section => `<section class="reading-section"><h3>${section}</h3>${bookList(readingList.filter(book => book.section === section))}</section>`).join("")}
      <div class="actions"><a href="#writing">return to ENOUGH. →</a><a href="#reading">return to reading →</a></div>`, { className: "reading-entry", label: "READING / ENOUGH." });
  },
  "grimoire-reading"() {
    return shell(`<h2>Grimoire research</h2><p class="note">In priority order.</p>${bookList(readingList.filter(book => book.section === "Grimoire research"), true)}<div class="actions"><a href="#reading">return to reading →</a></div>`, { className: "reading-entry", label: "READING" });
  },
  "symposium-reading"() {
    return shell(`<h2>Reading together</h2><p class="object-copy">Short Story Symposium at The Commons.</p><p><a href="https://luma.com/shortstories" target="_blank" rel="noopener noreferrer">Latest schedule and reading links →</a></p><p class="note">2026 selections, checked September 29. The event page has updates and earlier years.</p>${bookList(readingList.filter(book => book.section === "Short Story Symposium · 2026"))}<div class="actions"><a href="#reading">return to reading →</a></div>`, { className: "reading-entry", label: "READING / THE COMMONS" });
  },

  "question-object"() {
    const question = questions[questionCursor];
    const answers = questionAnswers.get(question) || [];
    return shell(`
      <p class="quiet-label">Questions I’m exploring</p>
      <h2>${escapeHtml(question)}</h2>
      <form id="question-answer-form">
        <label for="question-answer">Leave your answer or thoughts</label>
        <textarea id="question-answer" name="answer" required>${escapeHtml(questionDrafts.get(question) || "")}</textarea>
        <p class="note">Your answer will be sent to Chloe and saved privately in Google Sheets. It won’t be published here.</p>
        <div class="actions"><button class="action" type="submit">[ leave an answer ]</button><button class="text-action" type="button" data-next-question>another question →</button></div>
        <p id="question-status" class="note" role="status"></p>
      </form>
      <details class="book-response"><summary>Your answers in this session</summary><ul id="question-answers">${answers.map(answer => `<li>${escapeHtml(answer)}</li>`).join("")}</ul></details>
    `, { label: "QUESTIONS" });
  },

  style() {
    return shell(`<h2>Style</h2>
      <p class="object-copy">I care a lot about style. I’m working on an AI styling agent, and this is the brief I use to give it direction.</p>
      <p>Use this template to describe your own style, then share it with your AI assistant alongside an item you’re considering.</p>
      <div class="actions"><button class="action" type="button" data-copy-style>[ copy the brief ]</button><span id="style-copy-status" role="status"></span></div>
      <pre class="style-brief">${escapeHtml(styleBrief)}</pre>
      <div class="actions"><a href="#clothes">my Poshmark closet →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS / STYLE" });
  },
  clothes() {
    return shell(`<h2>Clothes &amp; my closet</h2>
      <p class="object-copy">My first business was an online clothing store. I still sell clothes on Poshmark.</p>
      <div class="actions"><a href="https://poshmark.com/closet/cloeystarr" target="_blank" rel="noopener noreferrer">explore my Poshmark closet ↗</a><a href="#experience">my first business →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS / CLOTHES" });
  },
  gaming() {
    return shell(`<h2>Gaming</h2>
      <p class="object-copy">I play Fortnite.</p>
      <h3>Find me in game</h3><p>Fortnite player name: <strong>cloeystarr</strong></p>
      <div class="actions"><a href="#anime">anime &amp; animation →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS / GAMING" });
  },
  experience() {
    return shell(`<h2>Human experience</h2>
      <p class="object-copy">My professional life, and the different worlds that have shaped what I’m building.</p>
      <section class="anime-section"><p class="eyebrow">2009–2013</p><h3>Writing, sociology &amp; a first business</h3><p class="byline">University of Texas at Austin · Gadfly Dream Factory</p><p>Creative writing and sociology were my starting point. My first business was an online clothing store. While in college, I also co-founded a clothing boutique on Austin’s 6th Street: sourcing clothes, shaping a physical space, and producing a runway show. I still sell clothes today. <a href="#clothes">Visit my closet →</a></p></section><section class="anime-section"><p class="eyebrow">2014</p><h3>Food, products &amp; people</h3><p class="byline">Thistle · Liv Blends</p><p>In San Francisco, I ran a juice pop-up on Google’s campus and worked in outside sales for a smoothie delivery company. The work included corporate relationships and developing product ideas.</p></section><section class="anime-section"><p class="eyebrow">2015–2017</p><h3>Tools for everyday work</h3><p class="byline">Lighthouse360 · Legwork PRM</p><p>I worked with dental practices on patient communication software. Alongside selling, I developed outbound scripts and a webinar program: finding ways to explain a tool and help people use it.</p></section><section class="anime-section"><p class="eyebrow">2017–2018</p><h3>Products, audiences &amp; creators</h3><p class="byline">RangeMe · Endorsify</p><p>RangeMe connected consumer product companies with retail buyers. At Endorsify, I was VP of Sales for an influencer marketing platform. These were different ways of connecting something someone makes with the people it can reach.</p></section><section class="anime-section"><p class="eyebrow">2018–2019</p><h3>Building a gathering</h3><p class="byline">Indie Hackers</p><p>I worked on the meetup community for independent founders: supporting organizers, building onboarding, and helping in-person gatherings grow around the world. Community and events are still part of my world.</p></section><section class="anime-section"><p class="eyebrow">2020–2022</p><h3>Where technology meets animation</h3><p class="byline">SyncSketch · Unity</p><p>As SyncSketch’s founding account executive, I helped build its sales function for creative review software used in animation, entertainment, and games. I continued at Unity after the acquisition. This chapter sits close to my love of animation and visual media.</p></section><section class="anime-section"><p class="eyebrow">2022</p><h3>Creative assets &amp; startup life</h3><p class="byline">Mudstack</p><p>I was Head of Sales at Mudstack, working on team development, content, and podcast production. Together with my creative review work, this is part of my interest in digital assets and how people work with them.</p></section><section class="anime-section"><p class="eyebrow">2023–2024</p><h3>Growth, proposals &amp; AI</h3><p class="byline">Happied · Responsive</p><p>At Happied, I worked as VP of Growth. At Responsive, I sold proposal and RFP software and used AI in outreach and marketing materials. My work moved across growth, communication, and the tools behind them.</p></section><section class="anime-section"><p class="eyebrow">2024–2025</p><h3>Exploration &amp; another beginning</h3><p class="byline">Independent work · C-981</p><p>A period of independent exploration included founder communities and early work on PipelineOM. In 2025, I joined C-981 as an early sales hire, before turning my attention back to building my own venture.</p></section><section class="anime-section"><p class="eyebrow">Now</p><h3>Building a home on the internet</h3><p class="byline">ompom.ai</p><p>I’m a founder interested in helping people own their context and build themselves on the internet. Writing, sociology, community, creative tools, and years of working with people all come into that work.</p></section>
      <div class="actions"><a href="#world">what I’m building →</a><a href="#anime">anime &amp; animation →</a><a href="#events">events &amp; gatherings →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS / HUMAN EXPERIENCE" });
  },
  worlds() {
    return shell(`<h2>Worlds</h2><nav class="collection-contents" aria-label="My worlds">
      <a href="#writing"><span>ENOUGH. — my book</span><span>→</span></a>
      <a href="#reading"><span>Reading — metaphysics, grimoires &amp; ancient texts</span><span>→</span></a>
      <a href="#anime"><span>Anime &amp; animation</span><span>→</span></a>
      <a href="#music"><span>Music</span><span>→</span></a>
      <a href="#events"><span>Events &amp; gatherings</span><span>→</span></a>
      <a href="#style"><span>Style — my styling brief</span><span>→</span></a>
      <a href="#clothes"><span>Clothes &amp; my closet</span><span>→</span></a>
      <a href="#gaming"><span>Gaming — Fortnite</span><span>→</span></a>
      <a href="#experience"><span>Human experience — my professional life</span><span>→</span></a>
      <a href="#visual-media"><span>Visual media</span><span>→</span></a>
      <a href="#practice"><span>Mantra, yoga &amp; vegetarianism</span><span>→</span></a>
      <a href="#world"><span>Building ompom.ai</span><span>→</span></a>
    </nav>`, { label: "WORLDS" });
  },
  music() {
    return shell(`<h2>Music</h2>
      <div class="actions"><a href="https://open.spotify.com/user/cloeystarr" target="_blank" rel="noopener noreferrer">my Spotify ↗</a></div>
      <section class="anime-section" aria-labelledby="favorite-playlist-title">
        <h3 id="favorite-playlist-title">Flesh without Blood</h3>
        <iframe title="Flesh without Blood — Chloe’s Spotify playlist" src="https://open.spotify.com/embed/playlist/73eE7IVSZQWiI2aDJVBSWD" width="100%" height="352" style="border:0;border-radius:12px" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <div class="actions"><a href="https://open.spotify.com/playlist/73eE7IVSZQWiI2aDJVBSWD" target="_blank" rel="noopener noreferrer">open playlist in Spotify ↗</a></div>
      </section>
      <div class="actions"><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  events() {
    return shell(`<h2>Events &amp; gatherings</h2>
      <p class="object-copy">Events are an important part of my world in San Francisco.</p>
      <section class="anime-section field-notes" aria-labelledby="field-notes-heading">
        <h3 id="field-notes-heading">Field Notes</h3>
        <p>Films and notes from tech events and gatherings.</p>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-07">October 7, 2026</time> · Posted on X</p>
          <h4>FriendliAI</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Fast enough for whose workflow?</p><a href="https://twitter.com/cloeystarr/status/2107889939740508413">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>Film: Chloe Starr, with Chris Starr. Research insert: FriendliAI Tech &amp; Research, Figure 3. Outside source, not a live event benchmark. Music: Loyalty Freak Music, Standing + Old Saga (CC0).</p><a href="https://x.com/cloeystarr/status/2107889941296627719" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-07">October 7, 2026</time> · Posted on X</p>
          <h4>Google for Startups × Google DeepMind</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Two takes, one frame.</p><a href="https://twitter.com/cloeystarr/status/2107885943562830076">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>The Aviary, Metreon, October 6. Outside research: Arena’s explanation of blind model comparisons. Music: Love They + Beach, Loyalty Freak Music, CC0.</p><a href="https://x.com/cloeystarr/status/2107885945001492794" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-07">October 7, 2026</time> · Posted on X</p>
          <h4>Post-Training &amp; Agent Infra</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>If a harness learns from my work, can I take that learning with me?</p><a href="https://twitter.com/cloeystarr/status/2107881996580208721">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>Brix, CreaoAI, NeuroSpark AI and Beta University. Outside research: Peter Pang’s self-healing agent harness article. Music: Softly + Shoepop, Loyalty Freak Music, CC0.</p><a href="https://x.com/cloeystarr/status/2107881998027194864" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-07">October 7, 2026</time> · Posted on X</p>
          <h4>AI Realized</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Who can act on my context, and can I revoke that authority?</p><a href="https://twitter.com/cloeystarr/status/2107877647221240221">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>Voices in the film: Adil Ajmal; Jayant Kolhe, Stripe; Madhav Chinta, Yellow.ai; Chris Caen, JLINC Labs; Vasanth Chandra, Meta. Outside work: Algedonic’s telemetry demo and Vidhi Agrawal’s expense-agent experiment, Databricks.</p><a href="https://x.com/cloeystarr/status/2107877648970260528" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-06">October 6, 2026</time> · Posted on X</p>
          <h4>Claude Founder House</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Communicating, building, belonging.</p><a href="https://twitter.com/cloeystarr/status/2107727425656549809">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>Then she started talking about real estate and building community with friends. Yes. I want to make crazy real estate bets. Somewhere we can live, make things and stay up talking about what we’re actually trying to build.</p><a href="https://x.com/cloeystarr/status/2107727427443228853" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-06">October 6, 2026</time> · Posted on X</p>
          <h4>Coffee &amp; Claude Founder House</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Good morning, SF.</p><a href="https://twitter.com/cloeystarr/status/2107698790803366192">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>First stop: coffee and meeting builders at Joe &amp; the Juice with Chris Starr. Then into the line for Claude Founder House.</p></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-06">October 6, 2026</time> · Posted on X</p>
          <h4>SHACK15 kickoff</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Agent harnesses by day. Humans under a disco ball by night.</p><a href="https://twitter.com/cloeystarr/status/2107485569102369023">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>Extra DJ and Bay Bridge footage: Rick Uzcategui. Music: District Four by Kevin MacLeod, CC BY 4.0. Excerpted and mixed.</p><a href="https://x.com/cloeystarr/status/2107485570691952649" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
        <article class="field-note">
          <p class="byline"><time datetime="2026-10-05">October 5, 2026</time> · Posted on X</p>
          <h4>EPAM × AI Circle</h4>
          <blockquote class="twitter-tweet" data-dnt="true" data-conversation="none"><p>Does every enterprise need its own agent harness?</p><a href="https://twitter.com/cloeystarr/status/2107354584259952798">Watch the film on X</a></blockquote>
          <div class="field-note-text"><p class="eyebrow">Notes</p><p>With Chris Starr, thinking about what I’m building with ompom.ai: personal agents working across my scattered data.</p><a href="https://x.com/cloeystarr/status/2107354585648234513" target="_blank" rel="noopener noreferrer">full notes &amp; sources on X ↗</a></div>
        </article>
      </section>
      <section class="anime-section" aria-labelledby="regular-gatherings-heading">
        <h3 id="regular-gatherings-heading">Regular gatherings</h3>
        <article class="anime-review">
          <h4>Short Story Symposium</h4>
          <p class="byline">The Commons · San Francisco</p>
          <p>I go to the Short Story Symposium at The Commons.</p>
          <p>Short fiction, speculative worlds, and conversation. The organizers post the schedule and reading links on Luma.</p>
          <div class="actions"><a href="https://luma.com/shortstories" target="_blank" rel="noopener noreferrer">schedule on Luma ↗</a><a href="#symposium-reading">the reading list →</a></div>
        </article>
        <article class="anime-review">
          <h4>Bhakti SF</h4>
          <p class="byline">Kirtan &amp; yoga · San Francisco</p>
          <p>I go to kirtan and yoga at Bhakti SF.</p>
          <a href="https://www.bhaktisf.com/" target="_blank" rel="noopener noreferrer">visit Bhakti SF ↗</a>
        </article>
      </section>
      <div class="actions"><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS / EVENTS" });
  },
  anime() {
    const reviews = [{"title": "My Status as an Assassin Obviously Exceeds the Hero’s — the new Re:Zero?", "date": "November 6, 2025", "url": "https://cloeystarr.medium.com/is-my-status-as-an-assassin-obviously-exceeds-the-heros-the-new-re-zero-and-is-it-better-be1895ee1d1d", "quote": null, "rating": null}, {"title": "Welcome to the Outcast’s Restaurant! — Anime Review", "date": "September 19, 2025", "url": "https://cloeystarr.medium.com/welcome-to-the-outcasts-restaurant-anime-review-d39735f50e53", "quote": null, "rating": null}, {"title": "Apocalypse Bringer Mynoghra: When Isekai Meets Civilization-Building", "date": "September 9, 2025", "url": "https://cloeystarr.medium.com/apocalypse-bringer-mynoghra-when-isekai-meets-civilization-building-735ab2b737ee", "quote": "Here, the goal isn’t heroism. It’s conquest.", "rating": "4/5"}, {"title": "Teogonia — War, Gods, and the Monkey Apocalypse", "date": "June 20, 2025", "url": "https://cloeystarr.medium.com/anime-review-teogonia-war-gods-and-the-monkey-apocalypse-3130802e75b1", "quote": "Come for the monkey warlords, stay for the soul-crushing betrayals and god-tier existentialism.", "rating": "3/5"}, {"title": "I Got a Cheat Skill in Another World and Became Unrivaled in the Real World — Peak Trashsekai", "date": "June 20, 2025", "url": "https://cloeystarr.medium.com/i-got-a-cheat-skill-in-another-world-and-became-unrivaled-in-the-real-world-is-peak-trashsekai-d9e9c1c29e93", "quote": null, "rating": null}, {"title": "The Unaware Atelier Master Finale: Bread, Buns, and Bombshells", "date": "June 16, 2025", "url": "https://cloeystarr.medium.com/the-unaware-atelier-master-finale-bread-buns-and-bombshells-44dd0b7e98d5", "quote": "by a very amused, very confused, and very satisfied viewer", "rating": "7.5/10"}, {"title": "Re:Zero Season 3 — A Slow, Overindulgent Decline", "date": "March 10, 2025", "url": "https://cloeystarr.medium.com/re-zero-season-3-a-slow-overindulgent-decline-af43c5f11288", "quote": "I’ll cherish the memory of Season 1 and move on.", "rating": "3/10"}, {"title": "Why Raeliana Ended Up at the Duke’s Mansion: A Surprising Gem with an Intriguing Plot Twist", "date": "July 29, 2024", "url": "https://cloeystarr.medium.com/why-raeliana-ended-up-at-the-dukes-mansion-a-surprising-gem-with-an-intriguing-plot-twist-02d5227face5", "quote": "It’s one of the best romances I’ve seen", "rating": "9/10"}];
    const watchlist = ["The Apothecary Diaries", "As a Reincarnated Aristocrat, I’ll Use My Appraisal Skill to Rise in the World", "Overgeared", "The Exiled Heavy Knight Knows How to Game the System", "Witch Hat Atelier", "The Case Study of Vanitas", "BLACK TORCH", "That Time I Got Reincarnated as a Slime"];
    return shell(`<h2>Anime &amp; animation</h2>
      <p class="object-copy">I watch anime with the seasons.</p>
      <div class="actions"><button type="button" class="text-action" onclick="document.getElementById('anime-reviews').scrollIntoView()">my reviews ↓</button><button type="button" class="text-action" onclick="document.getElementById('anime-watchlist').scrollIntoView()">on my watchlist ↓</button><a href="https://cloeystarr.medium.com/" target="_blank" rel="noopener noreferrer">latest writing on Medium ↗</a></div>
      <section id="anime-reviews" class="anime-section" aria-labelledby="reviews-heading">
        <h3 id="reviews-heading">My anime reviews</h3>
        <p class="note">Published thoughts, enthusiasms, and disappointments. Ratings belong to the dated review; linked reviews may contain spoilers.</p>
        <div class="anime-reviews">${reviews.map(review => `<article class="anime-review">
          <p class="note">${escapeHtml(review.date)}${review.rating ? ` · ${escapeHtml(review.rating)}` : ""}</p>
          <h4><a href="${review.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(review.title)} ↗</a></h4>
          ${review.quote ? `<blockquote>“${escapeHtml(review.quote)}”</blockquote>` : ""}
          <a href="${review.url}" target="_blank" rel="noopener noreferrer">read my review →</a>
        </article>`).join("")}</div>
      </section>
      <section id="anime-watchlist" class="anime-section" aria-labelledby="watchlist-heading">
        <h3 id="watchlist-heading">On my watchlist</h3>
        <p class="note">From my Crunchyroll watchlist, September 29, 2026. Saved titles aren’t all recommendations.</p>
        <ul class="anime-watchlist">${watchlist.map(title => `<li>${escapeHtml(title)}</li>`).join("")}</ul>
      </section>
      <div class="actions"><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  "visual-media"() {
    return shell(`<h2>Visual media</h2>
      <article class="film-entry" aria-labelledby="author-film-title">
        <p class="eyebrow">01 · ANIME PROMO · OMPOM.AI</p>
        <h3 id="author-film-title">Part I: The Author</h3>
        <p class="film-series">The Oldest Books on Earth Already Designed Your Software</p>
        <p>An anime promo made with Chris for <a href="https://ompom.ai" target="_blank" rel="noopener noreferrer">ompom.ai</a>, beginning with a question: what software would the oldest books on Earth build?</p>
        <figure class="film-player">
          <video controls controlslist="nodownload" playsinline preload="metadata" poster="assets/visual-media/poster.jpg" aria-label="Part I: The Author — anime promo film">
            <source src="assets/visual-media/ompom-ai-part-i-the-author.mp4" type="video/mp4">
            Your browser does not support embedded video. <a href="assets/visual-media/ompom-ai-part-i-the-author.mp4">Watch the film</a>.
          </video>
          <figcaption>Chloe Starr &amp; Chris Starr · 2:35 · Captions included</figcaption>
        </figure>
        <div class="actions"><button type="button" data-share-film>share film →</button></div>
        <p id="film-share-status" class="note" role="status"></p>
        <section class="film-making" aria-labelledby="film-making-title">
          <h3 id="film-making-title">How we made it</h3>
          <p>The film brings our writing and recorded performances together with generated imagery, animation, and a carefully edited soundtrack. We developed it through repeated scene, voice, and sound revisions.</p>
          <p><strong>OpenAI image generation</strong> helped create reference stills, including the house and temple scenes and an ink version of our OM logo. <strong>Google Flow</strong> animated reference images into moving scenes, including the logo drawing.</p>
          <p>Chris and I recorded our own dialogue. The fictional Starlet character’s voice was generated locally with <strong>Kokoro</strong>, using its af_bella voice. Our recordings were retained and refined with noise reduction, EQ, de-essing, compression, and light character pitch processing.</p>
          <p><strong>Codex, Python, and FFmpeg</strong> supported the edit and finishing work: assembling the film, timing captions, synchronizing dialogue and music, shaping sound effects, and mastering the final audio. The score combines licensed tracks with overlapping fades and music ducking so the voices remain clear. The ending is intentionally silent.</p>
        </section>
        <details class="film-credits">
          <summary>Film &amp; music credits</summary>
          <p>Created by Chloe Starr and Chris Starr, cofounders of ompom.ai. Founder voices: Chloe Starr and Chris Starr. Starlet: locally generated Kokoro af_bella voice.</p>
          <ul>
            <li><a href="https://www.scottbuckley.com.au/library/emergent/" target="_blank" rel="noopener noreferrer">Emergent</a> and <a href="https://www.scottbuckley.com.au/library/machina/" target="_blank" rel="noopener noreferrer">Machina</a> by Scott Buckley, released under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Edited for length, fades, and synchronization with dialogue and picture.</li>
            <li>Minimal Emotion and La La Land by Alejandro Magaña (A. M.); These Nights by Ahjay Stelino; Can’t Get You Off My Mind by Michael Ramir C. Provided by <a href="https://mixkit.co/free-stock-music/" target="_blank" rel="noopener noreferrer">Mixkit</a> under the <a href="https://mixkit.co/license/modal/musicFree/" target="_blank" rel="noopener noreferrer">Mixkit Stock Music Free License</a>. Edited as synchronized film cues.</li>
            <li><a href="https://commons.wikimedia.org/wiki/File:Pen_dropped.ogg" target="_blank" rel="noopener noreferrer">Pen dropped</a> by Kapoios2026, CC0 public domain. Trimmed and synchronized with a short room reflection. Additional pen textures and pitched resonances synthesized locally.</li>
          </ul>
        </details>
      </article>
      <div class="actions"><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  practice() {
    return shell(`<h2>Practice</h2><p class="object-copy">Mantra is an important part of my life. I love yoga, volunteer at the ashram, and want to spread vegetarianism.</p><div class="actions"><a href="#reading">what I’m reading →</a><a href="#question-object">questions I’m exploring →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  world() {
    return shell(`
      <h2>ompom.ai</h2>
      <p class="object-copy">AI needs context. People should own that context and control where it goes.</p>
      <section class="film-entry" aria-labelledby="building-film-title">
        <p class="eyebrow">BUILDING OMPOM.AI</p>
        <h3 id="building-film-title">Part I: The Author</h3>
        <p>The Oldest Books on Earth Already Designed Your Software</p>
        <figure class="film-player">
          <video controls controlslist="nodownload" playsinline preload="metadata" poster="assets/visual-media/poster.jpg" aria-label="Part I: The Author — anime promo film">
            <source src="assets/visual-media/ompom-ai-part-i-the-author.mp4" type="video/mp4">
            Your browser does not support embedded video.
          </video>
          <figcaption>Chloe Starr &amp; Chris Starr · 2:35 · Captions included</figcaption>
        </figure>
        <div class="actions"><button type="button" data-share-film data-share-url="https://chloestarr.me/#world">share film &amp; building notes →</button><a href="#visual-media">how we made the film →</a></div>
        <p id="film-share-status" class="note" role="status"></p>
      </section>
      <section aria-labelledby="building-notes-title">
        <h3 id="building-notes-title">Building notes</h3>
        <article>
          <p class="eyebrow">OCTOBER 3, 2026 · MAKING THE FILM</p>
          <p>Chris and I recorded our own dialogue for our anime promo. We brought those performances together with OpenAI reference images, Google Flow animation, and a locally generated Kokoro voice for Starlet.</p>
          <p>The work was in the revisions: scene continuity, voice clarity, caption timing, and music that leaves room for the dialogue. Codex, Python, and FFmpeg helped bring the pieces together. The ending is intentionally silent.</p>
        </article>
      </section>
      <div class="actions">
        <a class="text-action" href="https://ompom.ai" target="_blank" rel="noopener noreferrer">enter ompom.ai →</a>
        <button class="action" type="button" data-route="index">[ continue ]</button>
      </div>
    `, { label: "WORLD 001" });
  },

  index() {
    return shell(`
      <div class="index-heading"><h2>Chloe Starr</h2><p class="eyebrow">INDEX</p></div>
      <div class="index-layout">
        <div>
          <nav aria-label="Collection"><ul class="index-grid index-doorways">
            <li><a href="#worlds"><strong>Worlds</strong><span>Writing, reading, work, art &amp; play</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
            <li><a href="#question-object"><strong>Questions</strong><span>What I’m asking. What do you think?</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
          </ul></nav>
          <div class="field index-search">
            <label for="collection-search">Search the collection</label>
            <input id="collection-search" type="search" autocomplete="off" placeholder="A title, a question, an interest…">
            <ul id="search-results" class="search-results" aria-live="polite"></ul>
          </div>
        </div>
        <aside class="index-elsewhere" aria-label="Find me elsewhere">
          <p class="eyebrow">ELSEWHERE</p>
          <nav class="index-socials" aria-label="My links">
            <a href="https://www.instagram.com/cloeystarr/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://www.linkedin.com/in/chloestarrai" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://medium.com/@cloeystarr" target="_blank" rel="noopener noreferrer">Medium ↗</a>
            <a href="https://x.com/cloeystarr" target="_blank" rel="noopener noreferrer">X ↗</a>
            <a href="https://github.com/cloeystarr" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://ompom.ai" target="_blank" rel="noopener noreferrer">ompom.ai ↗</a>
            <a href="https://poshmark.com/closet/cloeystarr" target="_blank" rel="noopener noreferrer">Poshmark ↗</a>
          </nav>
          <a class="index-invitation" href="#leave">leave something →</a>
        </aside>
      </div>
    `, { showIndex: false, className: "index-page" });
  },

  leave() {
    return shell(`
      <h2>Leave something behind.</h2>
      <form id="leave-form">
        <div class="field">
          <label for="making">What are you making?</label>
          <textarea id="making" name="making" required></textarea>
        </div>
        <div class="field">
          <label for="name">Name <span>(optional)</span></label>
          <input id="name" name="name" type="text" autocomplete="name">
        </div>
        <div class="field">
          <label for="email">Email <span>(optional)</span></label>
          <input id="email" name="email" type="email" autocomplete="email">
        </div>
        <div class="field">
          <label class="checkbox" for="consent">
            <input id="consent" name="consent" type="checkbox">
            <span>Chloe may contact me using the email I’ve provided.</span>
          </label>
        </div>
        <p class="note">Your writing will be saved privately in Google Sheets. Email is saved only if you give permission to be contacted.</p>
        <div class="actions">
          <button class="action" type="submit">[ leave something ]</button>
        </div>
      </form>
    `);
  },
};

// The source collection's editorial notes and unwritten title story are omitted.
writingEntries.forEach(entry => {
  views[entry.route] = () => shell(`
    <p class="quiet-label"><a href="#writing">ENOUGH.</a> / ${entry.part}</p>
    <h2>${escapeHtml(entry.title)}</h2>
    ${entry.photo ? `<figure class="story-atmosphere"><img src="${escapeHtml(entry.photo.src)}" alt="${escapeHtml(entry.photo.alt)}" decoding="async"></figure>` : ""}
    ${entry.route === "poetry" ? "" : '<p class="note">Creative fiction.</p>'}
    <article class="reading-text" aria-label="${escapeHtml(entry.title)}">
      ${entry.poems ? entry.poems.map((poem, index) => `<section class="poem" aria-labelledby="poem-${index}"><h3 class="poem-number" id="poem-${index}">${escapeHtml(poem.number)}.</h3><p>${escapeHtml(poem.text)}</p></section>`).join("") : entry.paragraphs.map(text => text === "—" ? '<div class="section-pause" aria-hidden="true"></div>' : `<p>${escapeHtml(text)}</p>`).join("")}
    </article>
    <nav class="collection-contents" aria-label="Read another story">
      <p class="quiet-label">ANOTHER STORY</p>
      ${writingEntries.filter(other => other.route !== entry.route && other.route !== "poetry").map(other => `<a href="#${other.route}"><span>${escapeHtml(other.title)}</span><span aria-hidden="true">→</span></a>`).join("")}
    </nav>
    <div class="actions"><a class="text-action" href="#writing">return to collection →</a></div>
  `, { className: "reading-entry", label: "WRITING" });
});

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function renderSearch(query = "") {
  const results = document.querySelector("#search-results");
  if (!results) return;

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) { results.innerHTML = ""; return; }
  const matches = normalizedQuery
    ? archive.filter(({ title, category, route }) =>
        `${title} ${category} ${route === "reading" ? readingList.map(book => book.title + " " + book.author).join(" ") : ""} ${writingEntries.find(entry => entry.route === route)?.paragraphs.join(" ") || ""}`.toLowerCase().includes(normalizedQuery))
    : archive;

  results.innerHTML = matches.length
    ? matches.map(({ title, route, category }) => `
        <li><button type="button" data-route="${route}">${title} <span class="quiet-label">${category}</span></button></li>
      `).join("")
    : "<li>No entries found.</li>";
}

function render() {
  const requestedRoute = window.location.hash.slice(1) || "cover";
  const route = routes.has(requestedRoute) ? requestedRoute : "cover";

  if (requestedRoute !== route) {
    window.history.replaceState(null, "", `#${route}`);
  }

  app.innerHTML = views[route]();
  if (route === "events") loadFieldNoteEmbeds();
  document.title = `${route === "cover" ? "Chloe Starr" : route.replace("-", " ")} — Chloe Starr`;

  if (route === "index") renderSearch();

  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

app.addEventListener("click", async (event) => {
  if (event.target.closest("[data-share-film]")) {
    const status = document.getElementById("film-share-status");
    const url = event.target.closest("[data-share-film]").dataset.shareUrl || "https://chloestarr.me/#visual-media";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Part I: The Author — Chloe Starr & Chris Starr", url });
      } else {
        await navigator.clipboard.writeText(url);
        status.textContent = "Film page link copied.";
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        status.textContent = `Share this link: ${url}`;
      }
    }
    return;
  }
  if (event.target.closest("[data-copy-style]")) {
    const status = document.getElementById("style-copy-status");
    try {
      await navigator.clipboard.writeText(styleBrief);
      status.textContent = "Brief copied.";
    } catch {
      status.textContent = "Select the brief below to copy it.";
    }
    return;
  }
  if (event.target.closest("[data-next-line]")) {
    originalLineCursor = (originalLineCursor + 1) % originalLines.length;
    const line = originalLines[originalLineCursor];
    document.querySelector("#original-line-text").textContent = line.text;
    const source = document.querySelector("#original-line-source");
    source.href = `#${line.route}`;
    source.textContent = `read ${line.title} →`;
    const image = document.getElementById("atmosphere-photo");
    if (image) {
      atmosphericPhotoCursor = (atmosphericPhotoCursor + 1) % atmosphericPhotos.length;
      const photo = atmosphericPhotos[atmosphericPhotoCursor];
      image.src = photo.src;
      image.alt = photo.alt;
    }
  }
  if (event.target.closest("[data-next-question]")) {
    questionCursor = (questionCursor + 1) % questions.length;
    render();
  }
  const routeControl = event.target.closest("[data-route]");
  if (routeControl) navigate(routeControl.dataset.route);

  if (event.target.closest("[data-pass]")) {
    entranceAnswer = "";
    navigate("reveal");
  }

  if (event.target.closest("[data-alternate]")) {
    const destination = alternatePath;
    alternatePath = alternatePath === "reading" ? "question-object" : "reading";
    navigate(destination);
  }
});

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  if (["question-answer-form", "entrance-form", "leave-form"].includes(form.id) || form.matches("[data-book]")) {
    let status = form.querySelector('[role="status"]');
    if (!status) { status = document.createElement("p"); status.setAttribute("role", "status"); status.className = "note"; form.append(status); }
    if (form.dataset.sending) return;
    const data = new FormData(form);
    const book = form.matches("[data-book]") ? readingList[Number(form.dataset.book)] : null;
    const payload = {
      type: book ? "book" : form.id === "leave-form" ? "leave" : "question",
      context: book ? book.title : form.id === "entrance-form" ? "What do you believe that you cannot prove?" : form.id === "leave-form" ? "What are you making?" : questions[questionCursor],
      response: String(data.get(book ? "thought" : form.id === "leave-form" ? "making" : "answer") || "").trim(),
      name: String(data.get("name") || ""), email: String(data.get("email") || ""), consent: data.get("consent") === "on"
    };
    form.dataset.sending = "true";
    status.textContent = "Saving…";
    const submit = form.querySelector('[type="submit"]'); submit.disabled = true;
    try { await saveResponse(form, payload); }
    catch (error) { status.textContent = error.message || "Could not save. Please try again."; return; }
    finally { delete form.dataset.sending; submit.disabled = false; }
    status.textContent = "You left something here. Your response was saved.";
  }

  if (event.target.id === "question-answer-form") {
    const question = questions[questionCursor];
    const answer = new FormData(event.target).get("answer").trim();
    if (!answer) return;
    const answers = questionAnswers.get(question) || [];
    answers.push(answer);
    questionAnswers.set(question, answers);
    questionDrafts.delete(question);
    event.target.reset();
    document.querySelector("#question-answer").value = "";
    document.querySelector("#question-answers").innerHTML = answers.map(text => `<li>${escapeHtml(text)}</li>`).join("");
    document.querySelector("#question-status").textContent = "You left something here. Your response was saved.";
  }
  if (event.target.id === "add-question-form") {
    const question = new FormData(event.target).get("question").trim();
    if (!question) return;
    if (!questions.includes(question)) questions.push(question);
    questionCursor = questions.indexOf(question);
    event.target.reset();
    event.target.querySelector('[role="status"]').textContent = "Added. Open the questions preview to see it.";
  }
  if (event.target.matches("[data-book]")) {
    const id = Number(event.target.dataset.book);
    const thought = new FormData(event.target).get("thought").trim();
    if (!thought) return;
    const responses = readingResponses.get(id) || [];
    responses.push(thought);
    readingResponses.set(id, responses);
    const list = event.target.closest("details").querySelector("ul");
    list.innerHTML = responses.map(text => `<li>${escapeHtml(text)}</li>`).join("");
    event.target.reset();
    event.target.querySelector('[role="status"]').textContent = "Your thought was saved privately.";
  }

  if (event.target.id === "workspace-form") {
    const data = new FormData(event.target);
    workspaceDraft = { title: data.get("title"), raw: data.get("raw"), guest: data.get("guest") };
    navigate("guest-preview");
  }

  if (event.target.id === "entrance-form") {
    entranceAnswer = new FormData(event.target).get("answer").trim();
    navigate("reveal");
  }

  if (event.target.id === "leave-form") {
    event.target.closest(".entry__body").innerHTML = `
      <p class="prompt" role="status">You left something here.</p>
      <div class="actions">
        <button class="action" type="button" data-route="index">[ return to index ]</button>
      </div>
    `;
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "question-answer") questionDrafts.set(questions[questionCursor], event.target.value);
  if (event.target.id === "collection-search") renderSearch(event.target.value);
  if (event.target.closest("#workspace-form")) {
    const keys = { "draft-title": "title", "draft-raw": "raw", "draft-guest": "guest" };
    if (keys[event.target.id]) workspaceDraft[keys[event.target.id]] = event.target.value;
  }
});

window.addEventListener("hashchange", render);
render();

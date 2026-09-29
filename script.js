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
const readingResponses = new Map();

function bookList(books, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="book-list">${books.map(book => `<li><h3>${escapeHtml(book.title)}</h3>${book.date ? `<p class="text-date">${escapeHtml(book.date)}<br>${escapeHtml(book.age)} · <a href="${book.source}" target="_blank" rel="noopener noreferrer">date source</a></p>` : ""}${book.author ? `<p>${escapeHtml(book.author)}</p>` : ""}${book.note ? `<p class="note">${escapeHtml(book.note)}</p>` : ""}<a href="${book.url}" target="_blank" rel="noopener noreferrer">${book.linkLabel} →<span class="sr-only"> ${escapeHtml(book.title)} (opens in a new tab)</span></a>${responseForm(book)}</li>`).join("")}</${tag}>`;
}

function responseForm(book) {
  const id = readingList.indexOf(book);
  const responses = readingResponses.get(id) || [];
  return `<details class="book-response"><summary>Leave a thought</summary><p class="note">Your thought will be sent to Chloe and saved privately in Google Sheets. It won’t be published here.</p><ul>${responses.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ul><form data-book="${id}"><label for="thought-${id}">What stayed with you?</label><textarea id="thought-${id}" name="thought" required></textarea><div class="actions"><button class="action" type="submit">[ leave a thought ]</button></div><p role="status" class="note"></p></form></details>`;
}


const writingEntries = [];

writingEntries.unshift(...[{"route": "white-christmas", "title": "White Christmas", "part": "FINISHED WORK", "finished": true, "paragraphs": ["The Play- of Life: The Beginning", "Setting: A barren living room. A couch infested with spiders and bed bugs. Anyone sitting upon it, starts inching. Two, dining room, chairs surround a small table. There is an ancient T.V. and an ancient recliner.", "Characters: Ego,", "SuperEgo", "and Id", "Me: What is my purpose? What am I for?", "me: The only philosophical question that there is: is whether or not to kill yourself?", "Me: I love no one. I love nothing. I feel nothing. No one reads Henry James. In heaven everybody reads Henry James.", "me: No one likes me. I can only conclude. I must be evil for I do not fit in. I’m not a sheep, not even a black one.", "Me: How much longer can I live in void? What is right? What should I do? Happy, was so long ago, long before all my dreams were crushed and I was told it was a sin to dream. I dared to dream and lost.", "me: Here my past haunts me like a cow.", "Me: I am. Still here. There must be a reason.", "I’m laying in Mara’s bed. The bed is one fluffy cloud. Mara’s room is smashed. To the left of her bed is her caldron, a three hundred year old artifact she picked up during her employment and student-hood in alchemy at a shop. The caldron is pushed up against the wall on a high table that is far too big and far too grand for the room. It is furniture her mom has left over from the days when she was living high in the city before her divorce. The right side of the bed is inaccessible to walk up and get in. The left side of the bed has only a small night stand and perhaps two feet from the wall. A narrow space at the foot of the bed exists and that is where the wardrobe contains a voluminous amount of shoes. Mara loves clothes as much as I do. Her walls are stacked and stuffed with Wildfox Ts.", "Mara paints like I wish I could. The mastery makes me want to burst into tears. Mara won an art competition. The effortless genius. She has a bold, controlled, use of color. She has created a fascinating lacquer process to seal down her work. She has sold a painting in the past for a few thousand dollars, when she needed money. She prefers keeping her work. She is the mother of her creations.  Mara begins pulling out her other creations. A Betsey Johnson purse, she has repainted seamlessly to the point where you can not tell that it has been altered because picturing it before as a white purse makes no sense at all. It looks glorious in a rock and roll cracked black. She gives me a pair of pants she deconstructed, she laments about not fitting into them but she has gained weight since rehab. She wears that weight awkwardly and embarrassedly and envies my gaunt body.", "My incongruent travel plans are based on ending a love delusion, a relationship I ended up in because I was running away, leaves me in L.A. on Christmas. Mara and I, share. She is beside me and we are in her bed. Mara understands trauma, which is why we need no words of understanding between us. Mara is the second person in a week to term me “love avoidant.” Mara found me in my sadness She tried to fuck me the first night we met in the shower, we were taking to together. I loved staring at her huge tits. As she touched mine, I felt a tender kind of love that had been void in my earlier relationships but I did want to fuck her. I felt a friendship. In the name of loving people, people give themselves strange latitudes to lie to the love. What I love about Mara is her honesty. She is next to me, lighter, straw, foil in hand. She is preparing her nasty ball of tar on a spot of foil and she is using her straw to suck up all the smoke. Her secret for “friends”. As Mara’s opiate dealer puts it, “You don’t stop using opiates, you take breaks.”  I pass.", "We wake up now, on Christmas in Mara’s bed. She is feeling her dad's insulting presence lingering in presents. He took us to dinner last night. It has been three days since we first met and we have yet to be apart.  We rode his Porsche, to a Mexican joint another city. He extolled the principles of success, a lengthy lecture and gave heavy critic of the life of Mara.  At that point, I took a cocktail. Mara wanted one but had to refrain, she was trying to convince him of her sobriety.  He was done with Mara. He had paid for rehab; she should be normal and fine now: on the path to success. Practice! Preparation! Dedication! He had given her the presents of an electric toothbrush and a scarf.  Before dropping us off near Mara’s mom’s apartment. Mara was/is lying to her dad. She is saying she is living with her friend Elise.  She's actually living with her mom and using with her again. Her step-brother is who got her hooked on heroin. Her mother is who she started shooting it with.", "It’s Christmas! Today, Mara wants to have fun. I want to have fun too.  Family dynamics like Mara’s aren’t a stretch for me to understand. Mara gets on her phone, she’s a frenetic texter. She spent most of her high school “career” the city. Her post-high school living was mostly the city. She persuades her old friend Adrian to pick us up. Mara is against walking ever!", "Adrian pulls up in some supposed-to-be impressive car. It’s silver with a dark black leather interior. He’s got cliqued Grey Goose and Cranberry waiting in the car. We all go for Chinese. Adrian is over ordering for us. My hot green tea is the only thing on the table that I’m interested in. All of the food goes to waste. Adrian ends his boring blathering about his software conquests and suggests we all go pop some ecstasy. He breaks out green pills for all of us back in the car. We are on they way to his penthouse apartment. He is eager to entertain and is on his cellphone the whole ride, ordering more drugs and people.", "Mara is sprawled out on a leopard ottoman and footstool. Her legs are where she should be sitting and she is dangling off the footstool like a cliff with no regard for rope. She wears her big fake glasses; pointless glasses with clear, non-prescription lenses. Mara wears them when she doesn’t feel like putting on a lot of make up. Then she’s got her Russian-esque winter hat on, completing the Christmas picture with a white fuzzy sweater with pearls affixed to it, the sweater pulled into a deep-v which more than revealed Mara’s more than voluptuous breasts. A truly nice, real pair of DDs. Mara is bored of Adrian. She doesn’t want to have anymore sex with him tonight, they had already hit it in the bathroom; she is suggesting that when he comes back with his friends, we leave with Nico and Theo. She’s heard about a much better party in The Hills with more coke. Adrian is boring now that he doesn’t have kilos of cocaine, she notices. He never really had much personality. I nod.", "Adrian is kind of kid everyone picked on in high school. After high school, Adrian made a lot of money being smart with software. That lead him to trade the money for comfort in escorts, which was how he made Mara's acquaintance four years ago.  The two have a perverted camaraderie. Staring at Adrian, I start to hate him. Everything about him. His coy assumption that everything is for sale. That anything he wants he can buy. Deep down, I’m starting to suspect, I hate all people. Jaded by all the lies told to confer advantages.", "Adrian is back, with a full group. Mara corners Theo and Nico in the corner farthest from Adrian. They are checking out her tits. She’s getting out of here.  I’m explaining the meaning of the word echelon to a guy with mascara on his eyelashes. He was trying to convince me to join in the magical experience of GHB. Mara is down. She buzzes over from the corner. She is getting numb. He pours the dropper in her mouth, a long stream runs in.  My turn away from his dropper further offends him. He also is offended that I thought he was gay.  He wears mascara and both his shirt and pants are tighter than mine. If I hadn’t let Mara paint my face earlier he would be wearing more makeup than me. I need a out of this conversation and demanded drug use. Theo, Nico and Mara are ready to go. There is a hurried cool good-bye cry to Adrian. We’ll text him if it is a good party. Obviously, we are lying.", "Theo and Nico are dressed in as tight of clothes as the GHB guy. No makeup though, in this town makes them assertively hertosexual desipte that Theo was wearing high-waisted skinny jeans and his compadre overalls. Minutes on the highway. It is late. No traffic.  Theo is displaying amazing taste in music. His iPod firmly connected. Rap lyrics surround us. Mara and I are crammed in the back of a tiny yellow sports car.  Mara is trying to smoke. Theo is telling her to fucking wait. A Christmas without snow. The air is perfect, cool and crisp. We are driving into the hills and passing a flask of whiskey and a baggie belonging to Nico. Mara yells, “Keys!” Nico tosses them to her and she takes three snorts. I take two. It is bland. I’m  glad to be rid of Adrian. Theo and Nico are roughly our age. I’m ready to go back home. Seeing Mara’s world has made turned my stomach further into my spine than creepy Adrian.  It made me feel more than able to face mine. Mara opens my eyes. My flight is booked. I had stopped lying to myself about a romance that never was supposed to work. I feel tired as we are arriving at the main event in the Hills. The weather was perfect for winter, only a slight chill and it had been sunny all day.", "We park and get out. Theo and Nico are whispering to each other. They could be “discovered” beneath their hipster exterior there is talent locked inside besides dressing with swag. A good producer could exculpate their inner songbirds. Mara turns to me and breaths, “I can’t believe! We are going to Julian’s house.” One look at my face and she follows with, “You don’t know who that is, do you. You really don’t know anybody. Don’t you watch TV and listen to music and stuff. Big-time Producer. Big-time. ” My head is spinning, I’m tired of L.A. I can’t know everyone in Hollywood by name with clients. The house we are walking up to according to Julian later we learn a sprawling house. He goes into this during the grand tour, which he decides to kick off after he bores people for what feels like hours in his library, with loops of his various beats that made it on the radio. He is responsible for several hits that I hate to love. At the door, we are greeted by security. Theo and Nico whisper who they know and the security guards nod at Mara and I. The party always needs more girls.", "They greet us almost like puppies. Mara and I being much closer to their ages. The younger one is more noticeable and memorable. She has braces. Her lips are beautiful, the perfect pout. She has the kind of skinny body you’ve only got when you’re sixteen. Her thighs are skinny, sickeningly, youthfully skinny. Her hair is brilliant, shiny and a wonderful dark chestnut color. Her friend is a slightly less attractive clone. She has more baby fat on her and instead of clear green, eyes, her’s are brown. Her skin is an olive tone instead of milky white. Baby, I coin the more brilliant one. The Kids, I coin them together. As they are still dwelling in the safety of a shared identity not much unlike I and Mara. They shouldn’t be at this party. I shouldn’t even be at this party. It is Christmas day. Christmas days become spent in bars as you drift in the limbo of not being a child and not yet being an adult. The only snow is the kind that blows up your nose.", "Within the sprawling immensity of the place, Julian is hosting in his library and three of his living rooms that are connected to his library. The library overlooks an electric and strategically lit courtyard stocked with fascinating statues of the wine god.  The rest of the house contains paintings solely of Dionysos. All-white floors and walls made out of marble. If there is a more expensive stone of which to make floors and walls, I’m sure that is what was used. The furniture is minimal and opulent. Rare books spilled out of the library. Where am I? The book on the coffee table was worth about twenty grand. I wanted open to the front and check the edition but it was in latin and I could feel the cameras on me. Instead, I went to the fireplace. It was a blazing and had a cool infinity edge. The entire back of the house was glass. Every room in the house which touched the back wall, contained a part of this seamless window. A seamless window to overlook all of the L.A.", "Besides The Kids, there are many older models, industry hipsters and with “a guest’s” impending arrival as promising highlight. “a guest” introduces herself to me. She leaves not long after. She sees that this party was going to be themed like eyes wide shut rather than cheerful industry networking. It is Christmas. The other most striking three never introduced themselves. Nameless but they are flawless. All with rock-hard tits. They look as if they had been ripped from the pages of Victoria’s Secret. Complete with robes; they had all cleverly changed into Julian’s robes. A red one, a teal one, and a deep, royal blue one create a vision of cuteness. I do strangely ponder? What Julian is doing with so many short female robes stashed in his closet? A image of Blue-beard strikes my mind. This thought never seems to cross the minds of the robed ladies. They are instead grouped up and eying their female competition for the attention of Julian as well as each other. The teal one has a real problem with the Baby Kid. She is jealous of all the rock-hard dicks were pointed at Baby, eying and sizing her up like a rare delicacy. Picturing her tightness, her newness.", "Teal’s lips are injected to make their perfect pout. She was clearly over thirty--How far over I couldn’t tell. She is a timeless plastic. She wants her competition gone. Julian is going to hers. Evidenced in the perfumed air that wafts as she passes me, she is superior. She has put in time and dedication to social network. This is her prize. I think she couldn’t comprehend how welcome to him she was. To the rest of us under twenty five year old girls, this pudgy, short, balding, T-shirt with a diamond chain wearing hustler isn’t a dream-boat american express card but rather a youth vampire. We are too young and dumb to envision what we could whittle out of his bank account. Maybe Mara was. Mara is not into free cake. The party goes on. I do crappy coke with Julian and Mara in one of his many bathrooms downstairs. Three of us are piling in a few lines in a tiny bathroom. Mara is chattering loud to Julian because she is a jazz singer. He takes his baggie from his pocket and pours half of it on the counter. He offers me a hundred dollar bill.", "I take it. I want to try this amazing L.A. coke. The white lady burns as she goes in with a bitter, metallic after-taste. L.A. coke is methy. This is suppose to be the best coke. Clearly, Julian has a head-stash and another stash that he give out at parties. I sing badly probably on purpose, he loses interest in talking to me, I’m excited to be invisible blending with the crowd but mostly not trying to talk to anyone.", "After he grows tired of spinning his beats in the library, he moves the party to his upstairs bedroom-bathroom. His master bathroom was two thousand square feet, with parallel, long running vanities and beautiful fainting chairs lining the middle of the room. The bathtub, reflecting more of a hot tub with a infinity edge, faces the glass window that is the back of the house. I’m refraining from diving in on the pentagram party platters of cocaine he’s passing around. He breaks me off a gram of molly from his drug drawer since I have not shown enough interest in the platters. I take it and grab my drink. I look up and I’m trying to make out what the deaf guy is signing to me. I’m pretty sure it is; “Do you want to fuck?” Seriously? I mentally check my translation. Yes, that is it. I look around and everyone is on the floor for the most part minus myself and the deaf guy. “Do you want to fuck?”, he signs again. I’ve got to get out of this bathroom full of coke fiends on platters. They look like demons. Their bodies contorted in the most disgraceful positions and loud sucking, snort sounds as they drawn pentagrams with their noses. Shall I join them? I’ve got to get out of this bathroom full of coke fiends on platters. I venture off.", "I venture off. The Baby must have been following me. I turn around as I enter a minor bedroom that nobody is interested in due to the extreme smallness of it and lack of view. She catches me as I’m pouring all the gram into my cranberry vodka drink. I offer her a swing. She downs half of it before I snatch it back and down the rest. I feel guilty.   She is smiling at me with her braces. She could not be a day over sixteen. I see myself for a second at sixteen. Was like this? I suppose I was and still am. I’m like her here at this party, with my friend that bought me. I asked her why she followed me in here with a curt nod of my head. She replies, “Because I don’t want to fuck anyone else.”", "She starts trying to kiss me and pull me with her toward the bed. She’s crying and telling me I’m beautiful. I’m slightly freaked out, this is the first time I’ve ever had someone seven years younger than me attempt to sleep with me. Not to mention she is a beautiful, beautiful girl. Part of me wants to kiss her back and whisper in her ear, “You're beautiful, don’t be so sad, it will all be ok”. I let her stay in an embrace with me. She’s crying, so hard. She shaking my whole body as she rocks in my arms and begins to wail. Tears pour out with her tales. Her innocence is still there, though the world is trying hard to take and make her jaded. She’s telling me about all the sad things that happened to her: her mom leaving, her dad is sick, she is poor. All the other girls have nicer clothes. Lately her brother’s friends and guys at these parties have been getting inside her.  Many times she says, she hasn’t wanted to but a guy is on top of her, going in and out. It just hurts and she doesn’t want it. How? She closes her eyes and waits for it to be over. She feels so empty and wants to kill herself most days. She tried cutting her wrist. She says, she wasn’t brave enough to cut deep enough, maybe she should try pills? She shows me the scar on her left forearm. It is shallow and will fade as she gets older. How does she know to show me hers? Mine are hidden deep under my clothes. A small one is on my right ankle, covered by my jeans. The big one, I was embarrassed about in high school, rests also to the right. She declares it’s so hard to be cool in high school and asks cooly if it ever gets easier. She didn’t want to come to this party. Her friend made her but if she isn’t considered cool here she will have no life coming up. I think about how I feel the scar now as opposed in high school. Now, I like wearing bikinis.", "Her speech is like alarm bells of distress. The ringing of the bells is shaking me to my very core. I want to start crying too. Outside of this ringing I hear Mara calling for me. I open up the door to bedroom. Mara says, “Oh my god! There you are! Where did you go??? She’s in trouble.” Mara's eyes glance over to the Baby. “Her friend gave up their ages to that Teal bitch, now she’s going to get them bounced. There are some high profile people here and they can’t take the risk of being caught with underaged girls.” I’m looking at the sixteen year old version of me. She is scared and way over her head. Doe-eyed in headlights. I’m over my head, I find everyone here disgusting. The deaf kid even asked me to fuck. Mara’s loud voice brings everyone else over. Baby’s friend has tears streaming down her cheeks. She yells at Baby, “They are kicking us out. We have to leave now. It all your fault. Do you have any money?” Neither of them have money for a cab. Julian only dispenses drugs to underage girls not cab money. I turn to Mara, “Are you tired? It’s five AM!  Let’s just go.” Mara considers this for a second. She’s done her weight in cocaine. The rolls are long gone. She is coming down. She is ready for sleep. She won’t get any here. We leave with the kids escorted out by security. The teal chick shoots a poisonous  triumphant look on the way out as she dangles off Julian. An Israeli guy comes out with us and waits for the cabs. He asks me if I know their parents. I shrug, no. He turns to the kids, and tells them, “You should wait until you're older to come to a party like this.” I break them each off a half a Xanax as they pack the crying, coming down messes that they are into the cab.", "Mara and I are curling up in her white, fluffy cloud bed just as the sun is coming into full force. She is already snoring. Speedballing pro. One more pill for me and I reach, A zoned out junkie sleep. A cloud of government sanctioned emptiness, yes sweet nothing. Her phone is buzzing, more parties, more parades, more charades. Who cares. What matters? This is the bottom. My flight is in two days."]}]);

writingEntries.push(...[{"route": "sleeping-loner", "title": "Sleeping Loner", "part": "VOICE", "finished": true, "paragraphs": ["That found me stranded at a café. The Last Time, I give the broken back their keys, Briefly thought I was jacked for all my clothes as my thoughts turn to failing to heal Mara.", "I tell the loner, he is lonely, tho he insists he is not and confirms his inclination to move to Austin, for HellLA is more for the soulless and for $800 in Austin, he could have a nice place with a yard and less old ghosts haunting this old motel and become a Vegan Chef, very easily I insist.", "I knew he was lonely by the stacked up papers, everywhere. The small memory of his mother on a T-shirt and pyramid totem on his dresser.", "He is so full of stories.  As he talks to me on the street, white men, white women, Asian women gawk, only a white boy child with his babysitter says hello. She is visible, scared of the Dark other. He speaks to me of people that are fake when you are talking to them, you ring their number and they never answer and you never see them again. He wants a job assured for him if he goes to Austin, I assure him, I will try to help. I hope he finds a woman there, no-one should be left to die with ghosts. He should start eating again it didn't feel so alone. Like the only one that cares about this hidden history. He insists I learn about:", "Bill gates of African, Philip emeagwal", "Sirius star", "Thoth- from khem"]}, {"route": "poetry", "title": "Selected Poems", "part": "VOICE", "finished": true, "paragraphs": ["1.", "Life is a simple equation of (x)a=C. If either a or x are 0, life cannot be created.", "2.", "Being present. A hard construct, filters include most activities besides being still. Still is the nature of nature.", "3.", "Where do memories live? A smell of fabric that touched both me and you triggers a marathon of memories. Seductive suction — the present moment disappears and I'm in a reconstructed past packaging the most suitable version for you.", "4.", "The world is chipped. The scar line between the fake and the real are exposed. My nail is chipped. Spit n sand. My life a sliced divit. A lost and lonely man.", "5.", "Mirror parallel universes. When I stare into the silver haze, not only my current face comes to meet my gaze. Occasionally I see crying. I see the tears caused by love affairs washed down the sink. I see smiles and healing. I see speeches I've yet to give. I see myself getting older. I see it all being ok.", "6.", "i miss you ghost. together we walked on this earth like ancients owing nothing. together we were gypsies.", "7.", "It is your Astral Body I've been talking to. No wonder you don't remember it. Your astral body looks just like you but your skin is whiter and glowing and you're teleporting from column to column speaking directly to my mind — no words. If yours is out doing this, what is the Astral me out doing?", "8. to my mother", "the worst part about you, is that you take pride in reproducing like a cockroach. I remember you telling people with a badge of pride: I have four kids. Like getting knocked up was an accomplishment.", "9.", "In love three steps behind. You love me before I love you. I love you much longer after you stop loving me.", "10.", "feeling strained and drained. stained bullet hole in my heart. my heart is broken no matter how hard I've tried to put it back together. feels like I've been trying so long to fix this hole. I hardly remember who when or where shot me."]}]);

const originalPoetry = writingEntries.find(entry => entry.route === "poetry");
originalPoetry.title = "Poetry";
originalPoetry.paragraphs = ["1. Life is a simple equation of (x)a=C if either a or x are 0 life can\nnot be created.", "2. Being present\nA hard construct, filters include most activities besides being still.\nStill is the nature of nature\nKale is creeping out of my skin force fed myself pounds of the green\nstuff\nEnjoy the present moment it is a gift clouds of doubt and fear isolate\nyour bright sun with fog", "3. Grammar a rudimentary formula punctuated by a battalion of\nstructure created by the patriarchy to continue to frame the\nhierarchical structure of the hoops I'm reminded by the media\neveryday to jump though.", "4. Where do memories live? A smell of fabric that touched both me\nand you triggers a marathon of memories. Seductive suction the\npresent moment disappears and I'm in a reconstructed past\npackaging the most suitable version for you.", "5. Is the freedom to buy things, really the independence we should\nall strive for? Or is it the perspective of an immortal that knows,\nthe earth is our Mother we own nothing on her, she is good and\ngraceful and where we roam on her we are fed", "6. I am filled with light. Praise to the universe. Bring me to my\nhome, fill my pockets enough to pay for it and my dreams of\nmaking films. Continue to give me strength in darkness that it\nwill all pour to light for me. Love and light and the best are\ninvited to enter me. Swell my heart.", "7. a thin choke circle of mucus was rotting in my throat\nproducing non-productive single tiny clauds of flem.\nthe life being choked out of me. smoking was a comfort a habit, a\nlove. green was always there. i can't think of any of one else there as\nmuch or in such a great capacity. now i feel guilt. sometimes I don't\nneed it. i'm contented to read. then sometime i blaze and I feel guilty.", "8. i thought i had died today. i was very angry at my mother and i\ndidn't look all the way before crossing the street. it was the wind\nof the swerve of the white pick-up truck that shook me back into\nconsciousness. i finished riding across the street and into the\ntriangle. watching my hands shake wondering if i was real\nanymore. perhaps death doesn't hurt and i had not felt. I felt for\nmy missing brain and wondering if it was still there. If I was still\nreal or solid or a ghost. An old guy on a two-person bicycle\nasked me for directions to the saucer. Hence, I was still real", "10. my stomach is growling\nonly I can take care of me\nI am tired\nI can’t pack up everything on my own\nlike I need your help\nI can pack up my stuff\nbut not yours too\nI’ve been hungry\nyou ate all the food without me\nyou care though that I can see", "11. Being alone is such a rough\nSup....\nI miss my exes\njust as cheesy as the rest\neveryone is sleazy and cheesy\ni’m not sure I will ever get someone real again", "12. time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am", "13. i’ve got so many numbers\ni’m not even sure who\ni’m talking too", "14. the smell of coffee roast lines my nose while I wait on this post", "15. the world is chipped. the scar line between the fake and the real\nare exposed. my nail is chipped. spit n sand. my life a sliced divit. a\nlost and lonely man.", "14. i miss you ghost\ntogether we walked on this earth like ancients owing nothing\ntogether we were gypsies", "15. Mirror parallel universes\nwhen i stare into the silver haze not only my current face comes to\nmeet my gape. occasionally, i see crying. i see the tears caused by\nlove affair washed down the sink. i see smiles and healing. i see\nspeeches i've yet to give. i see myself getting older. i see it, all being\nok.", "16. feeling strained and drained\nstained bullet hole in my heart\nmy heart is broken no matter how hard\ni’ve tried to put it back together\nfeels like i’ve been trying so long to fix this hole\ni hardly remember who when or where shot me", "17. i’m on nothing and i feel numb", "18. at night. i can hear the demons all about climbing up and down\nwalls murmured voices though the hell", "19. appreciating objects. the total destruction of man. objections\nmean nothing. Permanence is in abstraction.", "20. to my mother\nthe worst part about you,\nis that you take pride in reproducing like a cockroach, i remember you\ntelling people with a badge of pride. I have Four kids. like getting\nknocked- up was accomplishment", "21. he is just so dumb i can’t stand to continue this contrived\nconversation any further", "22. Oh m triple G. I hate how fucking small this town is. I hope I have\nhid myself well enough with all this red lips and sunglasses. I’m so\ntired of running into people that know me but I don’t can to see it is\nlike it is all planned for Heightened Dramatic Irony.", "23. Asking for help\nThis isn’t going to be fun. I need help. I am going to have to ask a\nfriend to help me out. Why it is so hard...humbling, yourself.", "24. The Erotic Nature of Feet\nas my feet now ooze and puss, I feel an orgasmic tingle, running up\nmy toes to my center and I wish someone would wash my feet.", "25. Voids\nstate of most beings. only looking to consume their next trend.\nwestern vampires.", "26. hipster\ni wear pants in the summer\nshorts in the winter\nthis makes me against “the man”\nBa, ah, haha, nature", "27. text message\nyour impersonal & discrete\nand now we no longer\nneed to talk to each other\nanymore", "28. Value\nIs such a funny and impersonal thing. Is it worth more because it is\nnew or because it has experience. So much hate involved in being\nhip.", "29. You don’t deserve your Face? I’ve paid, pretty is as pretty does.\nThe Iron Price for this face, more than twice. You reap what you sow.\nPhases that haunt me still.", "30. Labels\nscene hip people are impressed by boxes, houses, shells, exteriors,\nw/out a shill they will dine on you", "31. In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me", "32. i open the love spell bottle\nthe perfume is so enticing\ni am in love with its intoxication\ni shouldn’t but i do drop it on my eyelids\nchaos without intention\nmy headache is gone\na heartache awaits\ncurses for getting this high on magic\ni can feel it working already\nmy heart is beating faster\nand the scent will not leave my nose\naction rising.", "33. hanging out with outlaws\nrough, wild and running\nslightly, scary always,\nbut they will never kick you out\ngive you a bunk mate perhaps.\nforever a gypsy.", "34. violence\na evil hand that creeps everywhere\noh to be rid of the curse of hurt.", "35. It is your Astral Body, I’ve been talking to. No, wonder, you don’t\nremember it. Your astral body looks just like you but your skin is\nwhiter and glowing and your places where you could possibly be\nwatching me. Your glowing self teleports from column to column and\nspeaks directly to my mind, no words. If yours is out doing this, what\nis the Astral me out doing?"];

originalPoetry.poems = [{"number": "1", "text": "Life is a simple equation of (x)a=C if either a or x are 0 life can\nnot be created."}, {"number": "2", "text": "Being present\nA hard construct, filters include most activities besides being still.\nStill is the nature of nature\nKale is creeping out of my skin force fed myself pounds of the green\nstuff\nEnjoy the present moment it is a gift clouds of doubt and fear isolate\nyour bright sun with fog"}, {"number": "3", "text": "Grammar a rudimentary formula punctuated by a battalion of\nstructure created by the patriarchy to continue to frame the\nhierarchical structure of the hoops I'm reminded by the media\neveryday to jump though."}, {"number": "4", "text": "Where do memories live? A smell of fabric that touched both me\nand you triggers a marathon of memories. Seductive suction the\npresent moment disappears and I'm in a reconstructed past\npackaging the most suitable version for you."}, {"number": "5", "text": "Is the freedom to buy things, really the independence we should\nall strive for? Or is it the perspective of an immortal that knows,\nthe earth is our Mother we own nothing on her, she is good and\ngraceful and where we roam on her we are fed"}, {"number": "6", "text": "I am filled with light. Praise to the universe. Bring me to my\nhome, fill my pockets enough to pay for it and my dreams of\nmaking films. Continue to give me strength in darkness that it\nwill all pour to light for me. Love and light and the best are\ninvited to enter me. Swell my heart."}, {"number": "7", "text": "a thin choke circle of mucus was rotting in my throat\nproducing non-productive single tiny clauds of flem.\nthe life being choked out of me. smoking was a comfort a habit, a\nlove. green was always there. i can't think of any of one else there as\nmuch or in such a great capacity. now i feel guilt. sometimes I don't\nneed it. i'm contented to read. then sometime i blaze and I feel guilty."}, {"number": "8", "text": "i thought i had died today. i was very angry at my mother and i\ndidn't look all the way before crossing the street. it was the wind\nof the swerve of the white pick-up truck that shook me back into\nconsciousness. i finished riding across the street and into the\ntriangle. watching my hands shake wondering if i was real\nanymore. perhaps death doesn't hurt and i had not felt. I felt for\nmy missing brain and wondering if it was still there. If I was still\nreal or solid or a ghost. An old guy on a two-person bicycle\nasked me for directions to the saucer. Hence, I was still real"}, {"number": "10", "text": "my stomach is growling\nonly I can take care of me\nI am tired\nI can’t pack up everything on my own\nlike I need your help\nI can pack up my stuff\nbut not yours too\nI’ve been hungry\nyou ate all the food without me\nyou care though that I can see"}, {"number": "11", "text": "Being alone is such a rough\nSup....\nI miss my exes\njust as cheesy as the rest\neveryone is sleazy and cheesy\ni’m not sure I will ever get someone real again"}, {"number": "12", "text": "time to pretend\npretending gets tired\nif i am always pretending I’m\nnever sure who\nI am"}, {"number": "13", "text": "i’ve got so many numbers\ni’m not even sure who\ni’m talking too"}, {"number": "14", "text": "the smell of coffee roast lines my nose while I wait on this post"}, {"number": "15", "text": "the world is chipped. the scar line between the fake and the real\nare exposed. my nail is chipped. spit n sand. my life a sliced divit. a\nlost and lonely man."}, {"number": "14", "text": "i miss you ghost\ntogether we walked on this earth like ancients owing nothing\ntogether we were gypsies"}, {"number": "15", "text": "Mirror parallel universes\nwhen i stare into the silver haze not only my current face comes to\nmeet my gape. occasionally, i see crying. i see the tears caused by\nlove affair washed down the sink. i see smiles and healing. i see\nspeeches i've yet to give. i see myself getting older. i see it, all being\nok."}, {"number": "16", "text": "feeling strained and drained\nstained bullet hole in my heart\nmy heart is broken no matter how hard\ni’ve tried to put it back together\nfeels like i’ve been trying so long to fix this hole\ni hardly remember who when or where shot me"}, {"number": "17", "text": "i’m on nothing and i feel numb"}, {"number": "18", "text": "at night. i can hear the demons all about climbing up and down\nwalls murmured voices though the hell"}, {"number": "19", "text": "appreciating objects. the total destruction of man. objections\nmean nothing. Permanence is in abstraction."}, {"number": "20", "text": "to my mother\nthe worst part about you,\nis that you take pride in reproducing like a cockroach, i remember you\ntelling people with a badge of pride. I have Four kids. like getting\nknocked- up was accomplishment"}, {"number": "21", "text": "he is just so dumb i can’t stand to continue this contrived\nconversation any further"}, {"number": "22", "text": "Oh m triple G. I hate how fucking small this town is. I hope I have\nhid myself well enough with all this red lips and sunglasses. I’m so\ntired of running into people that know me but I don’t can to see it is\nlike it is all planned for Heightened Dramatic Irony."}, {"number": "23", "text": "Asking for help\nThis isn’t going to be fun. I need help. I am going to have to ask a\nfriend to help me out. Why it is so hard...humbling, yourself."}, {"number": "24", "text": "The Erotic Nature of Feet\nas my feet now ooze and puss, I feel an orgasmic tingle, running up\nmy toes to my center and I wish someone would wash my feet."}, {"number": "25", "text": "Voids\nstate of most beings. only looking to consume their next trend.\nwestern vampires."}, {"number": "26", "text": "hipster\ni wear pants in the summer\nshorts in the winter\nthis makes me against “the man”\nBa, ah, haha, nature"}, {"number": "27", "text": "text message\nyour impersonal & discrete\nand now we no longer\nneed to talk to each other\nanymore"}, {"number": "28", "text": "Value\nIs such a funny and impersonal thing. Is it worth more because it is\nnew or because it has experience. So much hate involved in being\nhip."}, {"number": "29", "text": "You don’t deserve your Face? I’ve paid, pretty is as pretty does.\nThe Iron Price for this face, more than twice. You reap what you sow.\nPhases that haunt me still."}, {"number": "30", "text": "Labels\nscene hip people are impressed by boxes, houses, shells, exteriors,\nw/out a shill they will dine on you"}, {"number": "31", "text": "In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me"}, {"number": "32", "text": "i open the love spell bottle\nthe perfume is so enticing\ni am in love with its intoxication\ni shouldn’t but i do drop it on my eyelids\nchaos without intention\nmy headache is gone\na heartache awaits\ncurses for getting this high on magic\ni can feel it working already\nmy heart is beating faster\nand the scent will not leave my nose\naction rising."}, {"number": "33", "text": "hanging out with outlaws\nrough, wild and running\nslightly, scary always,\nbut they will never kick you out\ngive you a bunk mate perhaps.\nforever a gypsy."}, {"number": "34", "text": "violence\na evil hand that creeps everywhere\noh to be rid of the curse of hurt."}, {"number": "35", "text": "It is your Astral Body, I’ve been talking to. No, wonder, you don’t\nremember it. Your astral body looks just like you but your skin is\nwhiter and glowing and your places where you could possibly be\nwatching me. Your glowing self teleports from column to column and\nspeaks directly to my mind, no words. If yours is out doing this, what\nis the Astral me out doing?"}];

const originalLines = [{"text": "Permanence is in abstraction.", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "Who cares. What matters? This is the bottom. My flight is in two days.", "route": "white-christmas", "title": "White Christmas", "kind": "story"}, {"text": "He is so full of stories.", "route": "sleeping-loner", "title": "Sleeping Loner", "kind": "sketch"}, {"text": "Still is the nature of nature", "route": "poetry", "title": "Poetry", "kind": "poetry"}, {"text": "They shouldn’t be at this party. I shouldn’t even be at this party.", "route": "white-christmas", "title": "White Christmas", "kind": "story"}, {"text": "In love three steps behind\nyou love me before i love you\ni love you much longer after you\nstop loving me", "route": "poetry", "title": "Poetry", "kind": "poetry"}];
let originalLineCursor = 0;

const routes = new Set([
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
      <p class="fragment">Permanence is in abstraction.</p>
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
      ${bookList([readingList.find(book => book.title.startsWith("I Ching")), gita, ...readingList.filter(book => book.section === "Metaphysical shelf" && !book.title.startsWith("I Ching"))])}
      <section class="reading-section" aria-labelledby="fey-research-title">
        <h3 id="fey-research-title">Fey research for my book</h3>
        <p class="note">My research list, in priority order. These publication dates describe the research books, rather than the age of the traditions they study.</p>
        ${bookList(readingList.filter(book => book.section === "Grimoire research"), true)}
      </section>
      <details class="reading-section"><summary>Further back in time</summary>
        <p>Egyptian funerary texts precede these works. The Pyramid Texts are an older doorway into ritual, death, and the afterlife.</p>
        <p><a href="https://www.ucl.ac.uk/museums-static/digitalegypt/literature/religious/pyramid.html" target="_blank" rel="noopener noreferrer">Explore the Pyramid Texts · UCL →</a></p>
        <p class="note">Historical context and a direction for exploration; not a claim that I’m currently reading every text here.</p>
      </details>
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
  events() {
    return shell(`<h2>Events &amp; gatherings</h2>
      <p class="object-copy">Events are an important part of my world in San Francisco.</p>
      <section class="anime-section" aria-labelledby="upcoming-events-heading">
        <h3 id="upcoming-events-heading">Coming up</h3>
        <p>Events I’m thinking about going to. Plans can change.</p>
        <iframe class="events-calendar" title="Chloe’s upcoming events — Google Calendar" src="https://calendar.google.com/calendar/embed?src=f4b854ac3a6f322649cc888c4bf28c6133212986cf76037077485bb31dc75c55%40group.calendar.google.com&amp;ctz=America%2FLos_Angeles&amp;mode=AGENDA&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0" loading="eager" referrerpolicy="no-referrer"></iframe>
        <div class="actions"><a href="https://calendar.google.com/calendar/embed?src=f4b854ac3a6f322649cc888c4bf28c6133212986cf76037077485bb31dc75c55%40group.calendar.google.com&amp;ctz=America%2FLos_Angeles&amp;mode=AGENDA" target="_blank" rel="noopener noreferrer">open events calendar ↗</a></div>
      </section>
      <section class="anime-section" aria-labelledby="event-notes-heading">
        <h3 id="event-notes-heading">My event notes</h3>
        <p>I share thoughts about events on LinkedIn and X.</p>
        <div class="actions">
          <a href="https://www.linkedin.com/in/chloestarrai/recent-activity/all/" target="_blank" rel="noopener noreferrer">my LinkedIn posts ↗</a>
          <a href="https://x.com/cloeystarr" target="_blank" rel="noopener noreferrer">my posts on X ↗</a>
        </div>
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
      <p class="note">Social posts are not automatically imported here.</p>
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
    return shell(`<h2>Visual media</h2><p class="object-copy">A space for my visual work — from past art to future experiments with AI, film, and video.</p><p class="note">I want to explore making films and other visual work with AI. That practice hasn’t started yet.</p><div class="actions"><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  practice() {
    return shell(`<h2>Practice</h2><p class="object-copy">Mantra is an important part of my life. I love yoga, volunteer at the ashram, and want to spread vegetarianism.</p><div class="actions"><a href="#reading">what I’m reading →</a><a href="#question-object">questions I’m exploring →</a><a href="#worlds">return to worlds →</a></div>`, { label: "WORLDS" });
  },
  world() {
    return shell(`
      <h2>ompom.ai</h2>
      <p class="object-copy">AI needs context. People should own that context and control where it goes.</p>
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
            <li><a href="#writing"><strong>ENOUGH.</strong><span>My living grimoire</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
            <li><a href="#reading"><strong>Reading</strong><span>Ancient texts, metaphysics &amp; research</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
            <li><a href="#question-object"><strong>Questions</strong><span>What I’m asking. What do you think?</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
            <li><a href="#worlds"><strong>Worlds</strong><span>Work, art, style, play &amp; practice</span><span class="doorway-arrow" aria-hidden="true">↗</span></a></li>
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
    ${entry.route === "poetry" ? "" : '<p class="note">Creative fiction.</p>'}
    <article class="reading-text" aria-label="${escapeHtml(entry.title)}">
      ${entry.poems ? entry.poems.map((poem, index) => `<section class="poem" aria-labelledby="poem-${index}"><h3 class="poem-number" id="poem-${index}">${escapeHtml(poem.number)}.</h3><p>${escapeHtml(poem.text)}</p></section>`).join("") : entry.paragraphs.map(text => text === "—" ? '<div class="section-pause" aria-hidden="true"></div>' : `<p>${escapeHtml(text)}</p>`).join("")}
    </article>
    <nav class="collection-contents" aria-label="Follow another entry">
      <p class="quiet-label">ANOTHER ENTRY</p>
      ${writingEntries.filter(other => other.route !== entry.route).map(other => `<a href="#${other.route}"><span>${escapeHtml(other.title)}</span><span aria-hidden="true">→</span></a>`).join("")}
      <a href="#question-object"><span>Can devotion and self-sovereignty coexist?</span><span aria-hidden="true">→</span></a>
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
  document.title = `${route === "cover" ? "Chloe Starr" : route.replace("-", " ")} — Chloe Starr`;

  if (route === "index") renderSearch();

  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

app.addEventListener("click", async (event) => {
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

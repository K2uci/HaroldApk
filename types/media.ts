export interface MediaPreload {
  idimdb: string;
  title: string;
  anno: number;
  rank: number;
  coverImage: string;
  actors: string[];
}

export interface DetailsItem {
  title: string;
  type: string;
  photo: string;
  description: string;
  created: string;
  genre: string[];
  rating: string;
  actors: string[];
  episodes: number | null;
  duration: string | null;
  language: string;
  url: string | null;
}

interface MediaItemTest {
  "#TITLE": string,
  "#YEAR": number,
  "#IMDB_ID": string,
  "#RANK": number,
  "#ACTORS": string,
  "#IMG_POSTER": string,
}

export let dataSet: MediaPreload[] = [];

export const pushDataSet = (): void => {
  dataSet = []
  for (let index = 0; index < 3; index++) {
    const params = {
      q: String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    };
    const queryString = new URLSearchParams(params).toString();
    fetch(`https://imdb.iamidiotareyoutoo.com/search?${queryString}`)
      .then((data) => data.json())
      .then(ans => {
        const mappedData = ans["description"].map((item: MediaItemTest) => {
          return {
            title: item['#TITLE'],
            anno: item['#YEAR'],
            idimdb: item['#IMDB_ID'],
            rank: item['#RANK'],
            coverImage: item['#IMG_POSTER'],
            actors: item['#ACTORS'].split(',')
          };
        });
        dataSet.push(...mappedData)
      })
  }
}

export const pushDataSetByText = (title: string): void => {
  if (title === "") {
    pushDataSet()
    return
  }
  dataSet = []
  const params = {
    q: title
  };
  const queryString = new URLSearchParams(params).toString();
  fetch(`https://imdb.iamidiotareyoutoo.com/search?${queryString}`)
    .then((data) => data.json())
    .then(ans => {
      const mappedData = ans["description"].map((item: MediaItemTest) => {
        return {
          title: item['#TITLE'],
          anno: item['#YEAR'],
          idimdb: item['#IMDB_ID'],
          rank: item['#RANK'],
          coverImage: item['#IMG_POSTER'],
          actors: item['#ACTORS'].split(',')
        };
      });
      dataSet.push(...mappedData)
    })
}

export const findDataByOne = async (id: string): Promise<DetailsItem> => {
  const answer: DetailsItem = {
    title: '',
    type: '',
    photo: '',
    description: '',
    created: '',
    genre: [],
    rating: '',
    actors: [],
    episodes: null,
    duration: null,
    language: '',
    url: null
  }
  const ans = await (await fetch(`https://imdb.iamidiotareyoutoo.com/search?tt=${id}`)).json()
  answer.title = ans["short"]["name"];
  answer.type = ans["short"]["@type"];
  answer.photo = ans["short"]["image"];
  answer.description = ans["short"]["description"];
  answer.created = ans["short"]["datePublished"];
  answer.genre = ans["short"]["genre"];
  answer.rating = ans["short"]["aggregateRating"]["ratingValue"];
  answer.actors = ans["short"]["actor"].map((item:any) => item["name"]);
  answer.language = ans["main"]["spokenLanguages"]["spokenLanguages"][0]["text"];
  if ("trailer" in ans["short"]) {
    answer.url = ans["short"]["trailer"]["embedUrl"];
  }
  if (ans["top"][ "runtime"]) {
    answer.duration = ans["top"][ "runtime"]["displayableProperty"]["value"]["plainText"];
  }
  if (ans["main"]["episodes"]) {
    answer.episodes = ans["main"]["episodes"]["episodes"]["total"];
  }
  // answer.language = ans["short"]["review"]["inLanguage"];
  // answer.director = ans["short"]["director"]["name"];
  return answer
}

pushDataSet()
export interface AddQuote {
  author: string;
  description: string;
  category: string;
}

export interface Quote extends AddQuote {
  id: string;
}

export interface Categories {
  id: string;
  title: string;
}

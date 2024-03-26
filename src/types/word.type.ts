type Word = {
  id: number;
  titles: string[];
  meanings?: string[];
  sentences?: string[];
  collocations?: string[];
  tags?: string[];
  level?: number;
  pronunciations?: string[];
};

export default Word;

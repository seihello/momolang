type Word = {
  id: number;
  ipa?: string;
  title: string;
  meaning?: string;
  sentences?: string[];
  categoryIds?: number[];
  proficiency: Proficiency;
};

export default Word;

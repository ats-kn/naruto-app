export type Character = {
    id: number;
    images: string[];
    name: string;
    debut: {
      appearsIn: string;
    };
    personal: {
      affiliation: string;
    };
    uniqueTraits:  string[];
    natureType: string[];
    jutsu: string[];
  };
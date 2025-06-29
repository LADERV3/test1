import { atom } from 'jotai';

// Define the type for the AI response
export interface AiResEcommerece {
    title: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        text: string;
    };
    products: {
        id: number;
        name: string;
        description: string;
        price: string;
        rating: number;
    }[];
    contacts: {
        address: string;
        phonenumber: string;
        email: string;
    }
}

export interface AiResPortfolio {
    name: string;
    job: string;
    aboutme: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        text: string;
    };
    skills: string[];
    projects: {
        id: number;
        name: string;
        description: string;
        skills: string[];
    }[];
    contacts: {
        address: string;
        phonenumber: string;
        email: string;
    }
}

  
export interface AiResRestaurant  {
    title: string;
    image: string;
    about: string;
    openinigtime: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        text: string;
    };
    menu: {
        id: number;
        name: string;
        description: string;
        price: string;
    }[];
    contacts: {
        address: string;
        phonenumber: string;
        email: string;
    }
  }
  

// Use the defined type for the atom
export const aiResponseAtom = atom<AiResEcommerece | AiResRestaurant | AiResPortfolio | null>(null);

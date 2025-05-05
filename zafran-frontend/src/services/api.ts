import { useQuery } from '@tanstack/react-query';

export interface ServiceDescription {
  type: string;
  children: Array<{ type: string; text: string }>;
}

export interface ServiceImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: ServiceDescription[];
  price: number;
  categor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: ServiceImage;
}

export interface ServiceResponse {
  data: Service[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fonction pour récupérer tous les services
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<ServiceResponse> => {
      // Mise à jour pour inclure les images
      const response = await fetch('http://localhost:1337/api/services?populate=image');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des services');
      }
      return response.json();
    },
  });
};

// Vous pouvez ajouter d'autres fonctions pour récupérer d'autres données ici
export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1337/api/about?populate[team][populate]=image');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données about');
      }
      return response.json();
    },
  });
};

export const useContact = () => {
  return useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1337/api/contact');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données de contact');
      }
      return response.json();
    },
  });
};

export const useHome = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const response = await fetch('http://localhost:1337/api/home?populate=image');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données home');
      }
      return response.json();
    },
  });
};

export interface User {
  id: number;
  documentId: string;
  email: string;
  role: "admin" | "client";
  statu: "active" | "inactive";
  dateCreated: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  nom: string | null;
  prenom: string | null;
  telephone: string | null;
  address: string | null;
  ville: string | null;
  password?: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fonction pour récupérer tous les utilisateurs
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<UsersResponse> => {
      const response = await fetch('http://localhost:1337/api/clients');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      return response.json();
    },
  });
};

// Fonction pour créer un nouvel utilisateur
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await fetch('http://localhost:1337/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: userData }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création de l\'utilisateur');
  }
  return response.json();
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (documentId: string, userData: Partial<User>): Promise<User> => {
  const response = await fetch(`http://localhost:1337/api/clients/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        telephone: userData.telephone,
        address: userData.address,
        ville: userData.ville,
        role: userData.role,
        statu: userData.statu,
        dateCreated: userData.dateCreated
      }
    }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
  }
  return response.json();
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (documentId: string): Promise<void> => {
  const response = await fetch(`http://localhost:1337/api/clients/${documentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de l\'utilisateur');
  }
};

// Fonction pour vérifier si un email existe déjà
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(`http://localhost:1337/api/clients?filters[email][$eq]=${email}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la vérification de l\'email');
  }
  const data = await response.json();
  return data.data.length > 0;
};

// Fonction pour vérifier les identifiants de connexion
export const checkLoginCredentials = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:1337/api/clients?filters[email][$eq]=${email}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification des identifiants');
    }
    const data = await response.json();
    
    if (data.data.length === 0) {
      return false; // L'utilisateur n'existe pas
    }

    // Note: Dans un environnement de production, la vérification du mot de passe
    // devrait être faite côté serveur de manière sécurisée
    const user = data.data[0];
    return user.statu === "active"; // Vérifie si le compte est actif
  } catch (error) {
    throw new Error('Erreur lors de la vérification des identifiants');
  }
};






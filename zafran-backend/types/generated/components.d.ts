import type { Schema, Struct } from '@strapi/strapi';

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    description: '';
    displayName: 'Menu_Item';
  };
  attributes: {
    cible: Schema.Attribute.Enumeration<['_self', '_blank']>;
    label: Schema.Attribute.String;
    lien: Schema.Attribute.String;
  };
}

export interface SectionsCategorie extends Struct.ComponentSchema {
  collectionName: 'components_sections_categories';
  info: {
    displayName: 'Cat\u00E9gorie';
  };
  attributes: {};
}

export interface TeamCategorie extends Struct.ComponentSchema {
  collectionName: 'components_team_categories';
  info: {
    displayName: 'Cat\u00E9gorie';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.menu-item': MenuMenuItem;
      'sections.categorie': SectionsCategorie;
      'team.categorie': TeamCategorie;
    }
  }
}

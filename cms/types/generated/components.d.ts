import type { Schema, Struct } from '@strapi/strapi';

export interface SharedLocalizedBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_localized_blocks';
  info: {
    displayName: 'Localized Block';
  };
  attributes: {
    bodyCn: Schema.Attribute.Text;
    bodyEn: Schema.Attribute.Text;
    titleCn: Schema.Attribute.String;
    titleEn: Schema.Attribute.String;
  };
}

export interface SharedLocalizedPoint extends Struct.ComponentSchema {
  collectionName: 'components_shared_localized_points';
  info: {
    displayName: 'Localized Point';
  };
  attributes: {
    labelCn: Schema.Attribute.String;
    labelEn: Schema.Attribute.String;
    valueCn: Schema.Attribute.Text;
    valueEn: Schema.Attribute.Text;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Nav Item';
  };
  attributes: {
    key: Schema.Attribute.String;
    labelCn: Schema.Attribute.String;
    labelEn: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'Stat Item';
  };
  attributes: {
    labelCn: Schema.Attribute.String;
    labelEn: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    displayName: 'Timeline Item';
  };
  attributes: {
    bodyCn: Schema.Attribute.Text;
    bodyEn: Schema.Attribute.Text;
    titleCn: Schema.Attribute.String;
    titleEn: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.localized-block': SharedLocalizedBlock;
      'shared.localized-point': SharedLocalizedPoint;
      'shared.nav-item': SharedNavItem;
      'shared.stat-item': SharedStatItem;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}

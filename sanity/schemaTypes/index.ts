import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { bannerType } from './bannerType'
import { TestimonialType } from './testimonialType'
import {orderType} from './orderType'
import { siteSettings } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, bannerType, TestimonialType, orderType, siteSettings],
}

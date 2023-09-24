import { dataset, projectId } from '@/lib/sanity.api';
import { schemaTypes } from '@/schemas';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Revalidate Test';

const plugins = [deskTool()];

const config = defineConfig({
  name: 'default',
  title,
  projectId: projectId || '',
  dataset: dataset || '',
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  plugins,
});

export default config;

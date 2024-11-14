import { defineConfig } from "drizzle-kit";
export default defineConfig({
    out:"./drizzle",
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './config/schema.js',
  dbCredentials:{
    url:'postgresql://formcraft_owner:1SueNoyRM0kH@ep-holy-salad-a1itljck.ap-southeast-1.aws.neon.tech/formcraft?sslmode=require'
  }
})
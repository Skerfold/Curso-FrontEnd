# TODO: Sistema de Controle de Estoque MVP

## 1. Setup Dependencies and Config
- [x] Update package.json: Add mongoose, bcryptjs, jsonwebtoken, sass to dependencies; @types/bcryptjs, @types/jsonwebtoken to devDependencies
- [x] Create .env.local: Add MONGODB_URI and JWT_SECRET
- [ ] Update next.config.ts: Ensure env vars are handled (if needed)
- [x] Update tsconfig.json: Ensure module resolution for new deps (if needed)
- [x] Run npm install

## 2. Backend (lib/ and app/api/)
- [x] Create lib/mongodb.ts: DB connection utility with Mongoose
- [x] Create lib/auth.ts: JWT utilities (sign, verify, middleware for roles)
- [x] Create models/User.ts: Schema (email, password, role: 'gestor'|'operador')
- [x] Create models/Product.ts: Schema (name, sku, minQty, currentQty)
- [x] Create models/Movement.ts: Schema (type: 'entry'|'exit', qty, date, productId, userId)
- [x] Create app/api/auth/register/route.ts: POST - Hash password, create user, return JWT
- [x] Create app/api/auth/login/route.ts: POST - Verify password, return JWT with role
- [x] Create app/api/products/route.ts: GET (list all, highlight low-stock), POST (create, Gestor only)
- [x] Create app/api/products/[id]/route.ts: GET/PUT/DELETE (edit/delete, Gestor only)
- [x] Create app/api/movements/route.ts: GET (list for product/dashboard), POST (add movement, update product qty)
- [x] Create middleware.ts: Protect API routes with JWT/role checks

## 3. Frontend (app/ pages and components)
- [x] Update layout.tsx: Add auth provider/context, SCSS import
- [x] Create app/login/page.tsx: Form for email/password, call login API, redirect based on role
- [x] Create app/register/page.tsx: Form for user creation (Gestor only)
- [x] Update app/page.tsx: Redirect to /dashboard or /products based on role
- [x] Create app/products/page.tsx: List products, highlight low-stock, add/edit forms (Gestor)
- [x] Create app/movements/page.tsx: Form to add movement, list recent
- [x] Create app/dashboard/page.tsx: Show top moved products, total value
- [x] Create components/NavBar.tsx: Navigation bar with logout
- [x] Update globals.css to globals.scss: Convert to SCSS, add variables

## 4. Styling and Architecture
- [ ] Install sass: Enable SCSS modules (e.g., page.module.scss)
- [ ] Ensure responsive layout with SCSS

## 5. Seeding/Initial Data
- [x] Create lib/seed.ts: Script to seed initial admin user (Gestor)

## 6. Testing and Refinement
- [ ] Run npm run dev, test login/products/movements
- [ ] Check low-stock highlights, role restrictions
- [ ] Fix bugs, add error handling/toasts
- [ ] Demo flows

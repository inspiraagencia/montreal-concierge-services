-- Script para crear el Super Admin inicial
-- IMPORTANTE: Ejecutar esto DESPUÉS de crear el usuario en Supabase Auth

-- 1. Primero, crear el usuario en Supabase Auth Dashboard:
--    - Email: inspiraagencia@hotmail.com
--    - Password: Abcde123450
--    - Copiar el UUID del usuario creado

-- 2. Luego, ejecutar este SQL reemplazando 'USER_UUID_HERE' con el UUID real:

INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
) VALUES (
  'USER_UUID_HERE',
  'inspiraagencia@hotmail.com',
  'Super Admin',
  'admin',
  true,
  NOW()
);

-- 3. Verificar que el usuario fue creado correctamente:
SELECT * FROM public.admin_users WHERE email = 'inspiraagencia@hotmail.com';

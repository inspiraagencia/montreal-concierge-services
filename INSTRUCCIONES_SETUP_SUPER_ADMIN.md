# 🔐 Instrucciones: Crear Super Admin y Gestionar Usuarios

## 📋 Paso 1: Ejecutar Migraciones SQL

### Opción A: Dashboard Supabase (Recomendado)

1. Abre [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto **Montreal Concierge Services**
3. En el menú izquierdo, haz clic en **SQL Editor**
4. Haz clic en **New Query** (botón azul)
5. **Opción 1: Tabla admin_users**
   - Copia TODO el contenido de: `supabase/migrations/001_create_admin_tables.sql`
   - Pégalo en el editor SQL
   - Haz clic en **RUN** (o Ctrl+Enter)
   - Espera a que diga ✅ "Success"
   
6. **Opción 2: Tablas de contenido**
   - Copia TODO el contenido de: `supabase/migrations/002_create_content_tables.sql`
   - Pégalo en el editor SQL
   - Haz clic en **RUN**
   - Espera a que diga ✅ "Success"

---

## 👤 Paso 2: Crear Super Admin en Supabase Auth

### 1. Crear usuario en Authentication

1. En Supabase Dashboard, ve a **Authentication > Users** (menú izquierdo)
2. Haz clic en botón **Add User** (esquina superior derecha, color azul)
3. Se abrirá un formulario. Completa:
   - **Email**: `inspiraagencia@hotmail.com`
   - **Password**: `Abcde123450`
   - ✅ Marca el checkbox: **"Auto Confirm Email"**
4. Haz clic en **Save user**
5. **IMPORTANTE**: Copia el **UUID** (ID del usuario)
   - Aparecerá en la lista de usuarios
   - Es un código como: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - Cópialo (puedes hacer clic para copiar)

### 2. Registrar el usuario en tabla admin_users

1. Ve a **SQL Editor** (menú izquierdo)
2. Haz clic en **New Query**
3. Copia este SQL y **REEMPLAZA el UUID**:

```sql
INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
) VALUES (
  'AQUI_VA_EL_UUID',
  'inspiraagencia@hotmail.com',
  'Super Admin',
  'admin',
  true,
  NOW()
);
```

**Ejemplo con UUID real:**
```sql
INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'inspiraagencia@hotmail.com',
  'Super Admin',
  'admin',
  true,
  NOW()
);
```

4. Haz clic en **RUN**
5. Espera a que diga ✅ "Success"

---

## 🚀 Paso 3: Acceder al Dashboard Admin

1. Abre tu aplicación: `http://localhost:3000/admin/login` (desarrollo) o `https://tudominio.com/admin/login` (producción)
2. Inicia sesión con:
   - **Email**: `inspiraagencia@hotmail.com`
   - **Password**: `Abcde123450`
3. ¡Listo! Estás dentro del dashboard 🎉

---

## 👥 Paso 4: Crear Usuarios Editores

### Desde el Dashboard:

1. Haz clic en **Usuarios** (barra lateral izquierda)
2. Haz clic en botón **+ Nuevo Usuario**
3. Completa el formulario:

| Campo | Ejemplo |
|-------|---------|
| **Email** | editor@miempresa.com |
| **Nombre Completo** | Juan Editor |
| **Contraseña Temporal** | TempPass123456 |
| **Rol** | Editor |

4. Haz clic en **Crear Usuario**
5. Se mostrará un mensaje con los datos del nuevo usuario
6. **IMPORTANTE**: El usuario recibirá un email de confirmación

### El nuevo usuario puede:
- Crear y editar servicios
- Crear y editar posts de blog
- Gestionar testimonios
- Organizar galería de imágenes
- Ver solicitudes de cotización

---

## 🔧 Gestión de Usuarios Creados

### Ver lista de usuarios
- Clic en **Usuarios**
- Ves todos los usuarios con su:
  - Email
  - Rol (Admin/Editor/Viewer)
  - Último acceso
  - Estado (Activo/Inactivo)

### Editar usuario
- Clic en botón **Editar**
- Puedes cambiar:
  - Nombre completo
  - Rol
- ❌ **No puedes cambiar**: Email ni contraseña (debe hacerlo el usuario)

### Desactivar usuario
- Clic en botón **Desactivar**
- El usuario **NO PUEDE acceder**
- Sus cambios anteriores se conservan

### Reactivar usuario
- Clic en botón **Activar**
- El usuario puede volver a acceder

### Eliminar usuario
- Clic en botón **Eliminar**
- ⚠️ **IRREVERSIBLE**: Se borra todo registro
- El audit log conserva histórico

---

## 💡 Notas Importantes

### Cambio de contraseña
- Los usuarios pueden cambiar su contraseña después del login
- **No hay auto-reset**: Si olvidan contraseña, el admin debe crear un nuevo usuario

### Roles explicados
| Rol | Permisos |
|-----|----------|
| **Visualizador** | Solo ver solicitudes de cotización |
| **Editor** | Crear/editar servicios, posts, testimonios, imágenes |
| **Admin** | TODO + gestionar usuarios y auditoría |

### Seguridad
- Cada cambio queda registrado en **Auditoría** (solo admin)
- Las contraseñas son enviadas cifradas
- Las sesiones expiran después de 30 días de inactividad

---

## ❓ Solución de Problemas

### "Email already exists"
- El email ya está registrado
- Usa un email diferente
- O borra el usuario anterior

### "Password too weak"
- Contraseña < 8 caracteres
- Debe incluir mayúsculas, minúsculas y números
- Ejemplo: `Editor2024Admin`

### Usuario no recibe email de confirmación
- Revisa spam/basura
- Verifica email esté correcto
- Supabase a veces demora 5 minutos

### No puedo acceder al admin
- Verifica email y contraseña
- ¿Cuenta está activa? (no desactivada)
- Limpia cache del navegador (Ctrl+Shift+Delete)

---

## 📚 Más Información

- Dashboard completo: `ADMIN_SETUP.md`
- Documentación Supabase: https://supabase.com/docs
- Soporte: contacta al desarrollador

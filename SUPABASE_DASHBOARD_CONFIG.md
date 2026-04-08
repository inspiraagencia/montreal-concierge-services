# 🔧 Configuración Supabase para Dashboard Profesional

**Proyecto:** Montreal Concierge Services  
**Database:** Supabase PostgreSQL  
**URL Base:** https://pymttfagfwetbsqqeeej.supabase.co

---

## 📊 Tablas Actuales y Análisis

### 1. **contact_submissions** (Solicitudes)
**Propósito:** Rastrear solicitudes de cotización  
**Campos actuales:**
- `id` (UUID, PK)
- `name` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `message` (TEXT)
- `responded` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Para mejoras de dashboard, agregar:**
```sql
-- Campos recomendados
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS
  service_requested VARCHAR(100),  -- Filtrar por servicio
  response_time_hours INT,         -- Calcular metrics
  source VARCHAR(50),              -- De dónde vino (web, email, etc)
  priority VARCHAR(20),            -- Urgencia
  tags TEXT[],                     -- Etiquetas para organizar
  notes TEXT;                      -- Notas internas
```

---

## 🔐 RLS Policies Necesarias

### Policy 1: Admin acceso total
```sql
CREATE POLICY "admin_full_access"
ON contact_submissions
FOR ALL
USING (auth.role() = 'admin')
WITH CHECK (auth.role() = 'admin');
```

### Policy 2: Editor lectura y escritura
```sql
CREATE POLICY "editor_read_write"
ON contact_submissions
FOR SELECT, INSERT, UPDATE
USING (auth.role() IN ('admin', 'editor'))
WITH CHECK (auth.role() IN ('admin', 'editor'));
```

### Policy 3: Viewer solo lectura
```sql
CREATE POLICY "viewer_read_only"
ON contact_submissions
FOR SELECT
USING (auth.role() IN ('admin', 'editor', 'viewer'));
```

---

## 📈 Vistas (Views) para Dashboard

### Vista 1: Dashboard Stats Básicos
```sql
CREATE OR REPLACE VIEW v_dashboard_stats AS
SELECT
  COUNT(*) as total_solicitudes,
  COUNT(CASE WHEN responded = false THEN 1 END) as solicitudes_pendientes,
  COUNT(CASE WHEN responded = true THEN 1 END) as solicitudes_respondidas,
  ROUND(
    (COUNT(CASE WHEN responded = true THEN 1 END)::NUMERIC / 
     NULLIF(COUNT(*), 0) * 100), 2
  ) as tasa_respuesta,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600)::INT as tiempo_respuesta_promedio_horas,
  MAX(created_at) as ultima_solicitud
FROM contact_submissions;

-- Usar en dashboard:
SELECT * FROM v_dashboard_stats;
```

### Vista 2: Solicitudes por Mes
```sql
CREATE OR REPLACE VIEW v_solicitudes_por_mes AS
SELECT
  DATE_TRUNC('month', created_at)::DATE as mes,
  COUNT(*) as total,
  COUNT(CASE WHEN responded = true THEN 1 END) as respondidas,
  COUNT(CASE WHEN responded = false THEN 1 END) as pendientes
FROM contact_submissions
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY mes DESC;

-- Para gráfico de línea en reportes
```

### Vista 3: Distribución por Servicio
```sql
CREATE OR REPLACE VIEW v_solicitudes_por_servicio AS
SELECT
  service_requested,
  COUNT(*) as cantidad,
  ROUND(COUNT(*)::NUMERIC / 
    (SELECT COUNT(*) FROM contact_submissions) * 100, 2) as porcentaje
FROM contact_submissions
WHERE service_requested IS NOT NULL
GROUP BY service_requested
ORDER BY cantidad DESC;

-- Para gráfico pie chart
```

### Vista 4: Actividad Diaria
```sql
CREATE OR REPLACE VIEW v_actividad_diaria AS
SELECT
  DATE(created_at) as fecha,
  COUNT(*) as nuevas_solicitudes,
  COUNT(CASE WHEN responded = true THEN 1 END) as respondidas_hoy,
  COUNT(CASE WHEN responded = false AND 
    CURRENT_TIMESTAMP - created_at > INTERVAL '1 day' THEN 1 END) as atrasadas
FROM contact_submissions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Para gráfico área (últimos 30 días)
```

### Vista 5: Top Clientes
```sql
CREATE OR REPLACE VIEW v_top_clientes AS
SELECT
  email,
  COUNT(*) as num_solicitudes,
  MAX(created_at) as ultima_solicitud,
  COUNT(CASE WHEN responded = false THEN 1 END) as pendientes,
  ARRAY_AGG(DISTINCT service_requested) as servicios
FROM contact_submissions
WHERE email IS NOT NULL
GROUP BY email
ORDER BY num_solicitudes DESC
LIMIT 20;

-- Para tabla de clientes frecuentes
```

---

## ⚡ Funciones para Performance

### Función 1: Calcular Métricas Rápido
```sql
CREATE OR REPLACE FUNCTION get_dashboard_metrics()
RETURNS TABLE (
  total_solicitudes INT,
  pendientes INT,
  respondidas INT,
  tasa_respuesta NUMERIC,
  tiempo_promedio_horas INT,
  ultima_actualización TIMESTAMP
) AS $$
  SELECT
    COUNT(*)::INT,
    COUNT(CASE WHEN responded = false THEN 1 END)::INT,
    COUNT(CASE WHEN responded = true THEN 1 END)::INT,
    ROUND((COUNT(CASE WHEN responded = true THEN 1 END)::NUMERIC / 
           NULLIF(COUNT(*), 0) * 100), 2),
    AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600)::INT,
    NOW()
  FROM contact_submissions;
$$ LANGUAGE SQL IMMUTABLE;

-- Usar en API:
-- SELECT * FROM get_dashboard_metrics();
```

### Función 2: Llenar campos de service_requested si no existen
```sql
UPDATE contact_submissions
SET service_requested = 
  CASE 
    WHEN message ILIKE '%limpieza%' THEN 'Limpieza'
    WHEN message ILIKE '%concierge%' THEN 'Concierge'
    WHEN message ILIKE '%piscina%' THEN 'Mantenimiento Piscina'
    ELSE 'General'
  END
WHERE service_requested IS NULL;
```

---

## 🔔 Triggers para Auditoría

### Trigger 1: Log de cambios automático
```sql
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  changed_by UUID,
  changed_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, changed_at)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    to_jsonb(OLD),
    to_jsonb(NEW),
    NOW()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_audit_trigger
AFTER INSERT, UPDATE, DELETE ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION log_audit();
```

---

## 📱 Índices para Performance

```sql
-- Índices recomendados para queries del dashboard

-- Por estado (respondidas/pendientes)
CREATE INDEX IF NOT EXISTS idx_contact_submissions_responded 
ON contact_submissions(responded);

-- Por fecha (para gráficos de tiempo)
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Por servicio
CREATE INDEX IF NOT EXISTS idx_contact_submissions_service 
ON contact_submissions(service_requested);

-- Composite para queries complejas
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_date 
ON contact_submissions(responded, created_at DESC);

-- Para búsqueda de email
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON contact_submissions(email);

-- Análizar uso
ANALYZE contact_submissions;
```

---

## 🚀 Queries Útiles para Dashboard

### Query 1: Resumen Ejecutivo
```sql
SELECT
  (SELECT COUNT(*) FROM contact_submissions) as total_solicitudes,
  (SELECT COUNT(*) FROM contact_submissions WHERE responded = false) as pendientes,
  (SELECT COUNT(*) FROM contact_submissions WHERE responded = true) as respondidas,
  (SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600)::INT 
   FROM contact_submissions WHERE responded = true) as tiempo_respuesta_promedio,
  (SELECT COUNT(DISTINCT email) FROM contact_submissions) as clientes_unicos,
  (SELECT COUNT(DISTINCT service_requested) FROM contact_submissions) as servicios_diferentes;
```

### Query 2: Tendencia últimos 30 días
```sql
SELECT
  DATE(created_at) as fecha,
  COUNT(*) as solicitudes_nuevas,
  (SELECT COUNT(*) FROM contact_submissions 
   WHERE DATE(created_at) <= DATE(cs.created_at) AND responded = true) as respondidas_acumuladas
FROM contact_submissions cs
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;
```

### Query 3: Clientes que necesitan follow-up
```sql
SELECT
  name,
  email,
  service_requested,
  created_at,
  EXTRACT(DAY FROM CURRENT_TIMESTAMP - created_at)::INT as dias_sin_respuesta
FROM contact_submissions
WHERE responded = false
  AND created_at < CURRENT_TIMESTAMP - INTERVAL '3 days'
ORDER BY created_at ASC;
```

---

## 🔄 Real-time Subscriptions

### Para tabla contact_submissions
```typescript
// Hook en React
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export const useContactSubmissionsRealtime = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const subscription = supabase
      .from('contact_submissions')
      .on('*', payload => {
        console.log('Change received!', payload);
        // Actualizar estado o refrescar datos
        setSubmissions(prev => {
          if (payload.eventType === 'INSERT') {
            return [payload.new, ...prev];
          }
          return prev;
        });
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return submissions;
};
```

---

## 📋 Checklist de Configuración

### Fase 1: Estructura Base (YA COMPLETADA ✅)
- [x] Tabla contact_submissions creada
- [x] RLS policies configuradas
- [x] Auth configurado

### Fase 2: Vistas para Dashboard
- [ ] Vista v_dashboard_stats
- [ ] Vista v_solicitudes_por_mes
- [ ] Vista v_solicitudes_por_servicio
- [ ] Vista v_actividad_diaria
- [ ] Vista v_top_clientes

### Fase 3: Performance
- [ ] Índices creados
- [ ] Función get_dashboard_metrics()
- [ ] Trigger audit_logs
- [ ] Analyzed tables

### Fase 4: Real-time
- [ ] Subscriptions configuradas
- [ ] Hooks React creados
- [ ] Updates en tiempo real en UI

### Fase 5: Exportación
- [ ] Función para exportar a Excel
- [ ] Función para exportar a PDF
- [ ] Reportes programados

---

## 🛠️ Scripts SQL para Ejecutar

### Script 1: Crear todas las vistas
```bash
# Ejecutar en Supabase SQL Editor
-- Copiar y pegar el contenido de la sección "Vistas"
```

### Script 2: Crear índices
```bash
# Ejecutar en Supabase SQL Editor
-- Copiar y pegar el contenido de la sección "Índices"
```

### Script 3: Configurar auditoría
```bash
# Ejecutar en Supabase SQL Editor
-- Copiar y pegar trigger y función audit
```

---

## 📊 Monitoreo de Base de Datos

### Visualizar performance
```sql
-- Ver tamaño de tablas
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Ver índices no usados
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
  AND indexname NOT IN (SELECT constraint_name FROM information_schema.table_constraints)
ORDER BY tablename, indexname;
```

---

## ⚙️ Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://pymttfagfwetbsqqeeej.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Realtime (para subscriptions)
NEXT_PUBLIC_SUPABASE_REALTIME_URL=wss://pymttfagfwetbsqqeeej.supabase.co/realtime/v1
```

---

## 🎯 Próximos Pasos

1. **Crear vistas SQL** (15 min)
   ```bash
   # Ir a Supabase -> SQL Editor
   # Ejecutar scripts de vistas
   ```

2. **Crear índices** (5 min)
   ```bash
   # Ejecutar script de índices
   # Analizar tablas
   ```

3. **Implementar hooks React** (30 min)
   ```bash
   # Usar useContactSubmissionsRealtime()
   # En componentes del dashboard
   ```

4. **Actualizar queries API** (20 min)
   ```bash
   # Usar vistas en lugar de tablas directas
   # Implementar caché
   ```

---

## 📞 Referencia Rápida

| Necesito... | Usa... | Ubicación |
|---|---|---|
| Stats para dashboard | `v_dashboard_stats` | SQL Editor |
| Gráfico línea tiempo | `v_solicitudes_por_mes` | SQL Editor |
| Gráfico pie | `v_solicitudes_por_servicio` | SQL Editor |
| Updates en tiempo real | `useContactSubmissionsRealtime()` | Hook personalizado |
| Auditoría de cambios | `audit_logs` table | Supabase |
| Follow-ups pendientes | Query #3 | SQL Editor |

---

## ✅ Conclusión

Con estas configuraciones, Supabase estará optimizado para:
- ✅ Dashboards de alto rendimiento
- ✅ Análisis en tiempo real
- ✅ Auditoría completa
- ✅ Gráficos profesionales
- ✅ Exportación de datos

**Próximo paso recomendado:** Ejecutar los scripts SQL en Supabase.

---

**Creado con Claude Code | Configuración Supabase Dashboard**

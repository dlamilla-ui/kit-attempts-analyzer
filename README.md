# Voximplant Kit Analyzer

Herramienta web para analizar el **historial de llamadas** de Voximplant Kit y obtener, por campaña, los **contactos que tuvieron exactamente X intentos**, con la opción de descargar esa lista de números.

Todo el análisis se hace **en el navegador**. Los reportes no se suben a ningún servidor.

---

## Funcionalidades

- **Dos formas de cargar datos**
  - **Subir archivo**: reporte de historial de llamadas exportado desde Voximplant Kit (`.xlsx`, `.xls`, `.csv`) o historial de llamadas de Voximplant Platform (`.csv`).
  - **Solicitud por API**: descarga el reporte directamente desde la API de Voximplant Kit.
- **Detección automática del formato** del archivo. Si faltan columnas, se indica cuáles.
- **Filtros**: dirección (entrante/saliente), campaña, rango de fechas y **cantidad exacta de intentos**.
  - El selector de intentos muestra solo las opciones presentes en el reporte, con el número de contactos de cada una (por ejemplo, `3 intentos — 215 contactos`).
- **Tabla de distribución** de contactos por cantidad de intentos, con tasa de éxito y descarga directa por grupo.
- **Descargas**
  - Lista de números (`.xlsx`). El teléfono se guarda como texto para conservar el `+` y los ceros iniciales.
  - Detalle por contacto (`.xlsx` o `.csv`).
- Archivos CSV grandes (cientos de MB) se procesan por partes, sin cargar todo en memoria.

---

## Uso

### Opción A: subir un archivo

1. En Voximplant Kit, exporta el historial de llamadas del periodo que quieras analizar.
2. Abre la herramienta y arrastra el archivo a **Subir archivo**.
3. Elige la dirección, la campaña y la cantidad de intentos.
4. Descarga la lista de números o el detalle.

### Opción B: solicitud por API

1. En Voximplant Kit, ve a **Administración → Seguridad → API tokens** y copia:
   - **API host** (por ejemplo `kitapi-us.voximplant.com`)
   - **Account name**
   - **API token**
2. En la pestaña **Solicitud por API**, completa los campos y el rango de fechas, y presiona **Submit**.
3. La herramienta genera el reporte, espera a que esté listo, lo descarga y lo analiza. Bajo el botón se muestra el registro de cada paso.

> **Seguridad del token:** el token se usa solo en tu navegador para llamar a la API de Kit. No se guarda ni se envía a ningún otro servidor. Recomendamos revocar el token cuando ya no se use.

#### Métodos de la API utilizados

Según la [documentación oficial de la API de Voximplant Kit](https://kit-apidoc.voximplant.com/):

| Paso | Método | Parámetros principales |
|---|---|---|
| 1 | `POST /api/v3/history/exportCallsHistoryReport?domain={account}` | `access_token`, `from`, `to` (UTC, `YYYY-MM-DD HH:mm:ss`), `format=xlsx`, `locale=en`, `call_direction=all`, `call_status=true` |
| 2 | `POST /api/v3/report/getReportStatus?domain={account}` | `access_token`, `report_id` (se repite hasta `processed = true`) |
| 3 | `POST /api/v3/report/downloadReport?domain={account}` | `access_token`, `report_id` |

Las fechas elegidas en la herramienta (hora local) se convierten automáticamente a UTC.

---

## Cómo se calculan los resultados

- **Contacto** = combinación de campaña y número de teléfono.
- **Intentos**
  - Reporte de Kit: por defecto se usa el `Attempt number` más alto del contacto (el contador de Kit). También puedes elegir contar las llamadas registradas en el reporte o en el rango filtrado.
  - Reporte de Voximplant Platform: no incluye número de intento, así que cada sesión cuenta como un intento. La "campaña" corresponde a la aplicación (`application_id`). Si el número remoto es un valor de relleno (por ejemplo, `111111`), el teléfono se toma del inicio de `session_custom_data`. Las sesiones sin un teléfono identificable se excluyen y se informa cuántas fueron.
- **Éxito**: se considera exitoso el último intento cuyo código es `200` o `Call_Answered`. El detalle también indica si hubo éxito en algún intento.

---

## Publicar en GitHub Pages

1. Sube este repositorio a GitHub (rama `main`).
2. En el repositorio, ve a **Settings → Pages** y en **Source** selecciona **GitHub Actions**.
3. Cada push a `main` compila y publica la herramienta automáticamente (`.github/workflows/deploy.yml`).
4. La herramienta queda disponible en `https://<usuario>.github.io/<repositorio>/`.

> La API de Kit solo acepta llamadas desde páginas con origen `https`. Publicada en GitHub Pages (u otro hosting https), la solicitud por API funciona directamente.

---

## Desarrollo local

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # compila en dist/
npm run preview   # sirve la versión compilada
```

### Proxy local (opcional)

Solo es necesario si la herramienta se ejecuta en un entorno aislado (por ejemplo, una vista previa embebida con origen `null`), donde el navegador bloquea la respuesta de la API.

```bash
npm run proxy     # escucha en http://localhost:8787
```

Luego escribe `http://localhost:8787` en el campo **Proxy (opcional)**. El proxy solo reenvía peticiones a hosts `*.voximplant.com`, solo escucha en `127.0.0.1` y no guarda tokens.

---

## Privacidad

- Los archivos se procesan localmente en el navegador. No se envían a ningún servidor.
- Las únicas conexiones externas son las que hace la pestaña **Solicitud por API** hacia el host de Voximplant Kit que indiques.
- **No subas reportes de llamadas a este repositorio.** Contienen datos personales. El `.gitignore` ya excluye archivos `.csv`, `.xlsx` y `.xls`.

---

## Limitaciones conocidas

- La detección del reporte de Kit reconoce las columnas `Phone B`, `Campaign name`, `Attempt number`, `Call result code` y `Date of call start`, además de variantes comunes. Si un reporte usa otros nombres, la herramienta indica qué columnas faltan.
- La generación del reporte por API espera hasta unos 5 minutos. Para rangos muy amplios, usa periodos más cortos.
- En la tabla se muestran hasta 100 contactos. Las descargas incluyen la lista completa.

---

## Tecnologías

React 18 · Vite · Tailwind CSS · SheetJS (xlsx) · Papa Parse · lucide-react

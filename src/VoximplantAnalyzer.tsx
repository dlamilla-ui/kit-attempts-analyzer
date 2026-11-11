import React, { useState, useEffect, useMemo } from 'react';
import {
  Upload, Download, CheckCircle2, XCircle, AlertCircle, Info, FileSpreadsheet
} from 'lucide-react';

// Logo oficial de Voximplant Kit (PNG 128px embebido para mantener el archivo único)
const KIT_LOGO = 'data:image/png;base64,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';

/* =====================================================================
 *  UTILIDADES GENERALES
 * ===================================================================== */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad2 = (n) => String(n).padStart(2, '0');

// Convierte una fecha-hora local ('YYYY-MM-DDTHH:mm[:ss]') a 'YYYY-MM-DD HH:mm:ss' en UTC,
// que es el formato exigido por la API de Kit.
// Fecha local en formato YYYY-MM-DD
const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmtDay = (s) => (s ? s.split('-').reverse().join('/') : '');

// Rangos rápidos para la solicitud por API (días completos, hora local)
export const DATE_PRESETS = [
  { key: 'today', label: 'Hoy', range: (t) => [t, t] },
  { key: 'yesterday', label: 'Ayer', range: (t) => [addDays(t, -1), addDays(t, -1)] },
  { key: 'last7', label: 'Últimos 7 días', range: (t) => [addDays(t, -6), t] },
  { key: 'last30', label: 'Últimos 30 días', range: (t) => [addDays(t, -29), t] },
  { key: 'thisMonth', label: 'Este mes', range: (t) => [new Date(t.getFullYear(), t.getMonth(), 1), t] },
  { key: 'lastMonth', label: 'Mes anterior', range: (t) => [new Date(t.getFullYear(), t.getMonth() - 1, 1), new Date(t.getFullYear(), t.getMonth(), 0)] },
];

export const toKitUtc = (localValue) => {
  const d = new Date(localValue);
  if (isNaN(d.getTime())) return null;
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())} ${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}`;
};

// Extrae un mensaje legible de una respuesta de error de la API de Kit
// (formato documentado: { success: false, result: { error, code } })
const kitErrorMessage = (json) => {
  if (!json) return 'Respuesta vacía';
  const e = json.error ?? json.result?.error ?? json.result;
  if (typeof e === 'string') return e;
  if (e && (e.msg || e.message)) return e.msg || e.message;
  return JSON.stringify(json);
};

// Carga un script externo una sola vez
const loadScript = (id, src, isReady) =>
  new Promise((resolve, reject) => {
    if (isReady()) return resolve();
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error(`No se pudo cargar la librería ${id}.`)));
  });

const ensureXlsx = () =>
  loadScript('xlsx-lib', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', () => !!window.XLSX);
const ensurePapa = () =>
  loadScript('papaparse-lib', 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js', () => !!window.Papa);

/* =====================================================================
 *  DETECCIÓN DE FORMATO
 *  Se aceptan dos tipos de reporte:
 *   - KIT:      historial de llamadas exportado desde Voximplant Kit (UI o API exportCallsHistoryReport).
 *   - PLATFORM: historial de llamadas exportado desde Voximplant Platform (manage.voximplant.com / GetCallHistory),
 *               CSV separado por ';' con columnas session_id, application_id, call_remote_number, call_end_code...
 * ===================================================================== */

export const normHeader = (h) =>
  String(h ?? '').replace(/^﻿/, '').trim().toLowerCase().replace(/\s+/g, ' ');

const KIT_COLUMNS = {
  phone:      { label: 'Phone B', aliases: ['phone b', 'phone_b', 'phone', 'phone number', 'teléfono b', 'telefono b', 'teléfono', 'telefono'] },
  campaign:   { label: 'Campaign name', aliases: ['campaign name', 'campaign_name', 'campaign', 'nombre de campaña', 'nombre de la campaña', 'campaña'] },
  attempt:    { label: 'Attempt number', aliases: ['attempt number', 'attempt_num', 'attempt_number', 'attempt', 'número de intento', 'numero de intento', 'intento'] },
  resultCode: { label: 'Call result code', aliases: ['call result code', 'call_result_code', 'result code', 'código de resultado de llamada', 'codigo de resultado de llamada', 'código de resultado', 'codigo de resultado', 'completion code', 'completion_code', 'call result', 'result'] },
  date:       { label: 'Date of call start', aliases: ['date of call start', 'datetime_start', 'call start date', 'fecha de inicio de llamada', 'fecha de inicio de la llamada'] },
  direction:  { label: 'Call direction', aliases: ['call direction', 'call_direction', 'direction', 'dirección', 'direccion', 'dirección de la llamada', 'direccion de la llamada', 'call type', 'tipo de llamada', 'is_incoming', 'incoming'], optional: true },
  sessionId:  { label: 'Session ID', aliases: ['session id', 'session_id', 'id de sesión', 'id de sesion'], optional: true },
  campaignId: { label: 'Campaign ID', aliases: ['campaign id', 'campaign_id'], optional: true },
};

const PLATFORM_REQUIRED = ['session_id', 'account_id', 'application_id', 'call_id', 'call_remote_number', 'call_end_code'];

export const detectFormat = (row) => {
  const headers = (row || []).map(normHeader);
  const find = (aliases) => {
    for (const a of aliases) {
      const i = headers.indexOf(a);
      if (i !== -1) return i;
    }
    return -1;
  };

  // --- Voximplant Platform ---
  if (PLATFORM_REQUIRED.every((c) => headers.includes(c))) {
    const at = (c) => headers.indexOf(c);
    return {
      format: 'platform',
      idx: {
        sessionId: at('session_id'),
        applicationId: at('application_id'),
        ruleName: at('session_rule_name'),
        sessionStart: headers.findIndex((h) => h.startsWith('session_start_date')),
        sessionCustom: at('session_custom_data'),
        callId: at('call_id'),
        remote: at('call_remote_number'),
        callStart: at('call_start_time'),
        successful: at('call_successful'),
        endCode: at('call_end_code'),
        callCustom: at('call_custom_data'),
        incoming: at('call_incoming'),
      },
      matched: PLATFORM_REQUIRED.length,
      missing: [],
    };
  }

  // --- Voximplant Kit ---
  const idx = {};
  const missing = [];
  let matched = 0;
  for (const [key, def] of Object.entries(KIT_COLUMNS)) {
    idx[key] = find(def.aliases);
    if (idx[key] !== -1) matched++;
  }
  if (idx.campaign === -1 && idx.campaignId !== -1) idx.campaign = idx.campaignId;
  for (const [key, def] of Object.entries(KIT_COLUMNS)) {
    if (!def.optional && idx[key] === -1) missing.push(def.label);
  }
  if (missing.length === 0) return { format: 'kit', idx, matched, missing };
  return { format: null, idx, matched, missing };
};

/* =====================================================================
 *  NORMALIZACIÓN DE VALORES
 * ===================================================================== */

// Limpia un número: quita 'sip:', dominio '@...', espacios y símbolos
export const cleanPhone = (raw) => {
  let s = String(raw ?? '').trim();
  if (!s) return '';
  s = s.replace(/^sips?:/i, '').split('@')[0];
  s = s.replace(/[^\d+]/g, '');
  return s.replace(/(?!^)\+/g, '');
};

// Un número "real" tiene al menos 7 dígitos (descarta marcadores como 111111 o 222222 usados en troncales SIP)
export const isRealPhone = (p) => String(p || '').replace(/\D/g, '').length >= 7;

// Busca un teléfono en custom data: JSON con clave de teléfono o texto que empieza por el número ("0990000000-...")
const PHONE_KEYS = ['phone', 'phone_number', 'phonenumber', 'number', 'telefono', 'teléfono', 'celular', 'msisdn'];
export const phoneFromCustomData = (cd) => {
  const s = String(cd ?? '').trim();
  if (!s) return '';
  if (s.startsWith('{')) {
    try {
      const obj = JSON.parse(s);
      for (const k of Object.keys(obj)) {
        if (PHONE_KEYS.includes(k.toLowerCase())) {
          const p = cleanPhone(obj[k]);
          if (isRealPhone(p)) return p;
        }
      }
    } catch (_) { /* no es JSON */ }
    return '';
  }
  const m = s.match(/^\+?\d{7,15}(?=$|[-_|;,\s])/);
  return m ? m[0] : '';
};

// Devuelve { date: 'YYYY-MM-DD', dt: 'YYYY-MM-DD HH:mm:ss' } a partir de Date, número serial de Excel o texto
export const parseDateCell = (v) => {
  if (v === null || v === undefined || v === '') return { date: '', dt: '' };
  if (v instanceof Date && !isNaN(v.getTime())) {
    v = new Date(Math.round(v.getTime() / 1000) * 1000); // SheetJS puede dejar un desfase de milisegundos
    const date = `${v.getFullYear()}-${pad2(v.getMonth() + 1)}-${pad2(v.getDate())}`;
    return { date, dt: `${date} ${pad2(v.getHours())}:${pad2(v.getMinutes())}:${pad2(v.getSeconds())}` };
  }
  if (typeof v === 'number' && window.XLSX?.SSF) {
    const p = window.XLSX.SSF.parse_date_code(v);
    if (p) {
      const date = `${p.y}-${pad2(p.m)}-${pad2(p.d)}`;
      return { date, dt: `${date} ${pad2(p.H)}:${pad2(p.M)}:${pad2(Math.floor(p.S))}` };
    }
  }
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (m) {
    const date = `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;
    return { date, dt: `${date} ${pad2(m[4] || 0)}:${m[5] || '00'}:${m[6] || '00'}` };
  }
  // DD.MM.YYYY o DD/MM/YYYY (formato habitual de Kit en español)
  m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?:,?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (m) {
    const date = `${m[3]}-${pad2(m[2])}-${pad2(m[1])}`;
    return { date, dt: `${date} ${pad2(m[4] || 0)}:${m[5] || '00'}:${m[6] || '00'}` };
  }
  return { date: '', dt: s };
};

// Normaliza la dirección a 'Entrante' / 'Saliente' (o deja el valor original si no se reconoce)
export const normDirection = (v, isIncomingFlag = false) => {
  const s = String(v ?? '').trim().toLowerCase();
  if (!s) return '';
  if (isIncomingFlag) return ['yes', 'true', '1', 'sí', 'si'].includes(s) ? 'Entrante' : 'Saliente';
  if (/^(in|incoming|inbound|entrante|entrantes|yes|true|1)\b/.test(s) || s.includes('entrante') || s.includes('incoming') || s.includes('inbound')) return 'Entrante';
  if (/^(out|outgoing|outbound|saliente|salientes|no|false|0)\b/.test(s) || s.includes('saliente') || s.includes('outgoing') || s.includes('outbound') || s.includes('campa')) return 'Saliente';
  return String(v).trim();
};

export const isSuccessCode = (code) => {
  const c = String(code ?? '').trim();
  // 200 = código SIP de llamada contestada; Call_Answered = completion code exitoso según la documentación de Kit
  return c === '200' || /^(call[_ ]answered|answered|success|successful)$/i.test(c);
};

/* =====================================================================
 *  PROCESADOR DE FILAS (común para XLSX y CSV en streaming)
 *  Recibe filas como arrays; detecta la fila de encabezados en las primeras 20 filas.
 * ===================================================================== */

export const createProcessor = () => {
  let format = null;
  let idx = null;
  let headerRow = [];
  let scanned = 0;
  let best = null;
  let dataRows = 0;
  let excluded = 0;
  let duplicates = 0;
  const records = [];
  const seenSessions = new Set();

  const pushKit = (r) => {
    dataRows++;
    const phone = cleanPhone(r[idx.phone]);
    if (!phone) { excluded++; return; }
    // Una misma llamada (Session ID) puede aparecer en varias filas del reporte: se cuenta una sola vez
    const sid = idx.sessionId >= 0 ? String(r[idx.sessionId] ?? '').trim() : '';
    if (sid) {
      const key = `${sid}\u0001${phone}`;
      if (seenSessions.has(key)) { duplicates++; return; }
      seenSessions.add(key);
    }
    const { date, dt } = parseDateCell(r[idx.date]);
    const code = String(r[idx.resultCode] ?? '').trim();
    const att = parseInt(r[idx.attempt], 10);
    const dirHeader = idx.direction >= 0 ? normHeader(headerRow[idx.direction]) : '';
    records.push({
      direction: idx.direction >= 0 ? normDirection(r[idx.direction], dirHeader === 'is_incoming' || dirHeader === 'incoming') : '',
      phone,
      campaign: String(r[idx.campaign] ?? '').trim() || 'Sin campaña',
      attempt: Number.isFinite(att) ? att : null,
      code,
      success: isSuccessCode(code),
      date,
      dt,
    });
  };

  const pushPlatform = (r) => {
    // Las filas sin call_id son recursos de la sesión (TTS, ASR, Dialogflow, grabaciones...)
    if (!r[idx.callId]) return;
    const sid = String(r[idx.sessionId] ?? '');
    // Una sesión = un intento; si la sesión tiene varias llamadas (legs) se toma la primera
    if (seenSessions.has(sid)) return;
    seenSessions.add(sid);
    dataRows++;

    let phone = cleanPhone(r[idx.remote]);
    if (!isRealPhone(phone)) {
      phone = phoneFromCustomData(r[idx.sessionCustom]) || phoneFromCustomData(idx.callCustom >= 0 ? r[idx.callCustom] : '');
    }
    if (!isRealPhone(phone)) { excluded++; return; }

    const startRaw = idx.sessionStart >= 0 && r[idx.sessionStart] ? r[idx.sessionStart] : r[idx.callStart];
    const { date, dt } = parseDateCell(startRaw);
    const code = String(r[idx.endCode] ?? '').trim();
    records.push({
      phone,
      campaign: `Aplicación ${r[idx.applicationId]}`,
      direction: idx.incoming >= 0 ? normDirection(r[idx.incoming], true) : '',
      attempt: null,
      code,
      success: String(r[idx.successful] ?? '').toLowerCase() === 'yes' || code === '200',
      date,
      dt,
    });
  };

  return {
    row(r) {
      if (!r || r.length === 0) return;
      if (!format) {
        scanned++;
        const det = detectFormat(r);
        if (det.format) {
          format = det.format;
          idx = det.idx;
          headerRow = r;
        } else if (!best || det.matched > best.matched) {
          best = det;
        }
        if (!format && scanned >= 20) throw new Error(this.formatErrorMessage());
        return;
      }
      if (format === 'kit') pushKit(r);
      else pushPlatform(r);
    },
    get format() { return format; },
    formatErrorMessage() {
      const miss = best && best.matched > 0 ? ` Columnas faltantes para un reporte de Kit: ${best.missing.join(', ')}.` : '';
      return `El archivo no parece ser un reporte de llamadas de Voximplant (Kit o Platform).${miss}`;
    },
    finish() {
      if (!format) throw new Error(this.formatErrorMessage());
      return {
        format,
        records,
        dataRows,
        excluded,
        duplicates,
        hasAttemptNumbers: records.some((x) => x.attempt !== null),
        hasDirection: records.some((x) => x.direction),
      };
    },
  };
};

/* =====================================================================
 *  LECTURA DE ARCHIVOS
 * ===================================================================== */

// XLSX / XLS (y CSV pequeños que lleguen como ArrayBuffer desde la API)
export const parseWorkbookBuffer = (buffer) => {
  if (!window.XLSX) throw new Error('La librería XLSX aún no se ha cargado. Intenta de nuevo en unos segundos.');
  const wb = window.XLSX.read(buffer, { type: 'array', cellDates: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = window.XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: '' });
  const proc = createProcessor();
  for (const r of rows) proc.row(r);
  return proc.finish();
};

// CSV en streaming (soporta archivos de cientos de MB sin cargarlos completos en memoria)
export const parseCsvFile = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const proc = createProcessor();
    let failed = false;
    window.Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      chunk: (results, parser) => {
        try {
          for (const r of results.data) proc.row(r);
          if (onProgress && file.size) onProgress(Math.min(99, Math.round((results.meta.cursor / file.size) * 100)));
        } catch (err) {
          failed = true;
          parser.abort();
          reject(err);
        }
      },
      complete: () => {
        if (failed) return;
        try { resolve(proc.finish()); } catch (err) { reject(err); }
      },
      error: (err) => reject(err),
    });
  });

/* =====================================================================
 *  ANÁLISIS
 * ===================================================================== */

// 'YYYY-MM-DD HH:mm' para mostrar
const shortDt = (r) => (r.dt ? r.dt.slice(0, 16) : r.date) || 'N/A';

// Agrupa por campaña + teléfono y calcula intentos y resultado del último intento
export const analyzeRecords = (records, { campaign = '', direction = '', start = '', end = '' } = {}) => {
  const groups = new Map();
  for (const r of records) {
    if (campaign && r.campaign !== campaign) continue;
    if (direction && r.direction !== direction) continue;
    if (start && r.date < start) continue;
    if (end && r.date > end) continue;
    const key = `${r.campaign}\u0001${r.phone}`;
    let g = groups.get(key);
    if (!g) { g = []; groups.set(key, g); }
    g.push(r);
  }
  const out = [];
  for (const calls of groups.values()) {
    // Orden cronológico (fecha y hora); a igual hora, por número de intento
    calls.sort((a, b) => (a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0) || (a.attempt ?? 0) - (b.attempt ?? 0));
    const last = calls[calls.length - 1];
    const maxAttempt = calls.reduce((m, c) => Math.max(m, c.attempt ?? 0), 0);
    out.push({
      phone: last.phone,
      campaign: last.campaign,
      attempts: calls.length, // total de intentos (llamadas únicas) del contacto en el reporte/filtros
      maxAttemptNumber: maxAttempt || null,
      isSuccess: last.success,
      everSuccess: calls.some((c) => c.success),
      finalResponseCode: last.code,
      firstCallAt: shortDt(calls[0]),
      lastCallAt: shortDt(last),
      history: calls.map((c, i) => ({ n: i + 1, attempt: c.attempt, code: c.code, success: c.success, date: c.date, time: (c.dt || '').slice(11, 16), at: shortDt(c) })),
    });
  }
  return out;
};

export const attemptsDistribution = (contacts) => {
  const m = new Map();
  for (const c of contacts) {
    const d = m.get(c.attempts) || { attempts: c.attempts, contacts: 0, success: 0 };
    d.contacts++;
    if (c.isSuccess) d.success++;
    m.set(c.attempts, d);
  }
  return [...m.values()].sort((a, b) => a.attempts - b.attempts);
};

/* =====================================================================
 *  EXPORTACIÓN
 * ===================================================================== */

const csvCell = (v) => {
  const t = String(v ?? '');
  return /[",\n;]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const safeName = (s) => String(s || '').replace(/[^\w\-]+/g, '_').replace(/_+/g, '_').slice(0, 40);

const FORMAT_INFO = {
  kit: {
    title: 'Voximplant Kit — historial de llamadas',
    note: 'Se usan las columnas Campaign name, Call result code, Date of call start y Phone B. Los intentos son el total de llamadas de cada contacto en el reporte (cada Session ID se cuenta una vez).',
  },
  platform: {
    title: 'Voximplant Platform — historial de llamadas (call_history)',
    note: 'Este formato no trae columnas de campaña ni de número de intento: la "campaña" es la aplicación (application_id) y los intentos se cuentan como sesiones por teléfono. Si call_remote_number es un marcador (p. ej. 111111), el teléfono se toma del inicio de session_custom_data.',
  },
};

// Colores de marca como CSS propio: algunos entornos de vista previa usan un Tailwind
// precompilado que NO soporta clases arbitrarias como bg-[#7B51FF], y los botones quedaban invisibles.
const BRAND_CSS = `
.vx-text{color:#7B51FF}
.vx-bg{background-color:#7B51FF;color:#fff}
.vx-bg-hover:hover:not(:disabled){background-color:#6841e5}
.vx-bg-soft{background-color:#F8F5FF}
.vx-hover-soft:hover{background-color:#F8F5FF}
.vx-border{border-color:#7B51FF}
.vx-border-soft{border-color:#E2D9FF}
.vx-hover-border:hover{border-color:#7B51FF}
.vx-hover-text:hover{color:#7B51FF}
.vx-focus:focus{border-color:#7B51FF;box-shadow:0 0 0 1px #7B51FF;outline:none}
.vx-maxh-360{max-height:360px}
.vx-maxh-500{max-height:500px}
`;

/* =====================================================================
 *  COMPONENTE
 * ===================================================================== */

export default function VoximplantAnalyzer() {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'api'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  // API
  const [apiHost, setApiHost] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  // Rango de fechas: por defecto día completo (00:00 a 23:59:59, hora local)
  const [apiFromDay, setApiFromDay] = useState(() => ymd(new Date()));
  const [apiToDay, setApiToDay] = useState(() => ymd(new Date()));
  const [apiPreset, setApiPreset] = useState('today');
  const [useCustomTimes, setUseCustomTimes] = useState(false);
  const [apiFromTime, setApiFromTime] = useState('00:00');
  const [apiToTime, setApiToTime] = useState('23:59');
  const [apiLog, setApiLog] = useState([]);
  const [apiProxy, setApiProxy] = useState('');

  // Datos
  const [dataset, setDataset] = useState(null); // { format, records, dataRows, excluded, hasAttemptNumbers, source }
  const [rawReport, setRawReport] = useState(null); // archivo original descargado por API

  // Filtros
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exactAttempts, setExactAttempts] = useState('');
  const [expandedRow, setExpandedRow] = useState('');

  useEffect(() => {
    ensureXlsx().catch(() => {});
    ensurePapa().catch(() => {});
  }, []);

  const records = dataset?.records || [];

  const directions = useMemo(
    () => [...new Set(records.map((r) => r.direction).filter(Boolean))].sort(),
    [records]
  );

  const campaigns = useMemo(
    () => [...new Set(records.filter((r) => !selectedDirection || r.direction === selectedDirection).map((r) => r.campaign))].sort(),
    [records, selectedDirection]
  );

  // Si la campaña elegida no existe para la dirección seleccionada, se vuelve a "Todas"
  useEffect(() => {
    if (selectedCampaign && !campaigns.includes(selectedCampaign)) setSelectedCampaign('');
  }, [campaigns, selectedCampaign]);

  const dateBounds = useMemo(() => {
    let min = '', max = '';
    for (const r of records) {
      if (!r.date) continue;
      if (!min || r.date < min) min = r.date;
      if (!max || r.date > max) max = r.date;
    }
    return { min, max };
  }, [records]);

  const loadDataset = (result, source) => {
    setSelectedCampaign('');
    setSelectedDirection('');
    setStartDate('');
    setEndDate('');
    setExactAttempts('');
    setExpandedRow('');
    if (result.records.length === 0) {
      throw new Error('El reporte se reconoció, pero no contiene llamadas con un número de teléfono válido.');
    }
    setDataset({ ...result, source });
  };

  const resetAll = () => {
    setDataset(null);
    setRawReport(null);
    setError('');
  };

  // ---------- Carga manual de archivo ----------
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setError('');
    setProgress('Leyendo archivo...');
    try {
      const isCsv = /\.(csv|txt)$/i.test(file.name) || file.type === 'text/csv';
      let result;
      if (isCsv) {
        await ensurePapa();
        result = await parseCsvFile(file, (p) => setProgress(`Procesando archivo... ${p}%`));
      } else {
        await ensureXlsx();
        result = parseWorkbookBuffer(await file.arrayBuffer());
      }
      loadDataset(result, file.name);
      setRawReport(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al procesar el archivo. Asegúrate de que el formato sea correcto.');
      setDataset(null);
    } finally {
      setIsLoading(false);
      setProgress('');
      e.target.value = null;
    }
  };

  // ---------- API de Voximplant Kit ----------
  const kitHost = () => apiHost.trim().replace(/^https?:\/\//, '').split('/')[0];
  const proxyBase = () => apiProxy.trim().replace(/\/+$/, '');
  // Directo: https://{host}/api/v3 · Con proxy: {proxy}/api/v3 + cabecera X-Kit-Host con el host real
  const kitBaseUrl = () => (proxyBase() ? `${proxyBase()}/api/v3` : `https://${kitHost()}/api/v3`);

  const readKitJson = async (res) => {
    let json = null;
    try { json = await res.json(); } catch (_) { /* respuesta no JSON */ }
    if (!res.ok || !json || json.success === false) {
      throw new Error(json ? kitErrorMessage(json) : `HTTP ${res.status} ${res.statusText}`);
    }
    return json;
  };

  // Según la documentación oficial (kit-apidoc.voximplant.com):
  //   POST https://{host}/api/v3/{método}?domain={account name}
  //   Cuerpo application/x-www-form-urlencoded con access_token y el resto de parámetros.
  const kitPost = (path, params = {}) =>
    fetch(`${kitBaseUrl()}/${path}?${new URLSearchParams({ domain: cleanAccount() })}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(proxyBase() ? { 'X-Kit-Host': kitHost() } : {}),
      },
      body: new URLSearchParams({ access_token: cleanToken(), ...params }),
    });

  const addLog = (msg) => setApiLog((prev) => [...prev, `${new Date().toLocaleTimeString()}  ${msg}`]);

  // El token no contiene espacios: se eliminan saltos de línea o espacios que se cuelan al copiar/pegar
  const cleanToken = () => accessToken.replace(/\s+/g, '');
  const cleanAccount = () => accountName.trim();
  // Si solo se elige "Desde", se toma ese mismo día completo
  const apiRangeLocal = () => {
    const toDay = apiToDay || apiFromDay;
    const fromTime = useCustomTimes ? (apiFromTime || '00:00') : '00:00';
    const toTime = useCustomTimes ? (apiToTime || '23:59') : '23:59';
    return {
      startLocal: `${apiFromDay}T${fromTime}:00`,
      endLocal: `${toDay}T${toTime}:59`,
      label: `${fmtDay(apiFromDay)} ${fromTime} → ${fmtDay(toDay)} ${toTime}`,
    };
  };

  const applyPreset = (preset) => {
    const [a, b] = preset.range(new Date());
    setApiFromDay(ymd(a));
    setApiToDay(ymd(b));
    setApiPreset(preset.key);
    setUseCustomTimes(false);
  };

  const apiCredsMissing = () => !apiHost.trim() || !cleanAccount() || !cleanToken();

  // Flujo oficial (asíncrono):
  //   1. POST /api/v3/history/exportCallsHistoryReport (from, to en UTC 'YYYY-MM-DD HH:mm:ss') -> { success, result: { report_id } }
  //   2. POST /api/v3/report/getReportStatus (report_id) -> { result: { processed, report_id } }  (se repite hasta processed = true)
  //   3. POST /api/v3/report/downloadReport (report_id) -> archivo (application/octet-stream)
  // Nota: se usa un botón con onClick (no un <form> con submit) porque en iframes con sandbox,
  // como algunas vistas previas, el envío de formularios puede estar bloqueado y el botón "no hace nada".
  const handleApiFetch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setApiLog([]);
    if (apiCredsMissing() || !apiFromDay) {
      setError('Por favor completa todos los campos para realizar la petición.');
      return;
    }
    const { startLocal, endLocal } = apiRangeLocal();
    const datetimeStart = toKitUtc(startLocal);
    const datetimeEnd = toKitUtc(endLocal);
    if (!datetimeStart || !datetimeEnd) {
      setError('Las fechas ingresadas no son válidas.');
      return;
    }
    if (datetimeStart > datetimeEnd) {
      setError('La fecha inicial no puede ser posterior a la fecha final.');
      return;
    }

    setIsLoading(true);
    setError('');
    setProgress('Solicitando reporte...');

    try {
      // Se piden todas las llamadas (todas las direcciones y campañas); el filtrado se hace después en la app.
      // Parámetros documentados: from, to, format (xlsx|csv), locale (en|ru), call_direction (incoming|outgoing|all), call_status.
      const params = { from: datetimeStart, to: datetimeEnd, format: 'xlsx', locale: 'en', call_direction: 'all', call_status: 'true' };

      // 0. Verificar credenciales con un método liviano (POST /api/v3/account/getAccountInfo)
      addLog(`POST ${kitBaseUrl()}/account/getAccountInfo?domain=${cleanAccount()} · token de ${cleanToken().length} caracteres`);
      try {
        await readKitJson(await kitPost('account/getAccountInfo'));
        addLog('Credenciales válidas');
      } catch (credErr) {
        if (/invalid credentials|401/i.test(credErr.message)) {
          throw new Error(`Kit rechazó las credenciales ("${credErr.message}"). Revisa que el token sea el valor completo copiado con el ícono de copiar en Administración → Seguridad → API tokens (no el ID ni el nombre), que pertenezca a la cuenta "${cleanAccount()}", que esté activo y, si el token tiene restricción por IP, que tu IP actual esté autorizada`);
        }
        throw credErr;
      }

      // 1. Iniciar la generación del reporte
      addLog(`exportCallsHistoryReport · from ${datetimeStart} · to ${datetimeEnd} (UTC)`);
      const started = await readKitJson(await kitPost('history/exportCallsHistoryReport', params));
      const reportId = started?.result?.report_id;
      if (!reportId) throw new Error('La API no devolvió un report_id.');
      addLog(`Reporte creado: report_id ${reportId}`);

      // 2. Esperar a que el reporte esté procesado (máx. ~5 min)
      let processed = false;
      for (let i = 0; i < 150 && !processed; i++) {
        setProgress(`Generando reporte #${reportId}... (${i * 2}s)`);
        const status = await readKitJson(await kitPost('report/getReportStatus', { report_id: reportId }));
        processed = !!status?.result?.processed;
        if (!processed) await sleep(2000);
      }
      if (processed) addLog('getReportStatus · processed = true');
      if (!processed) throw new Error('El reporte tardó demasiado en generarse. Intenta con un rango de fechas menor.');

      // 3. Descargar el archivo
      setProgress('Descargando reporte...');
      addLog('downloadReport · descargando archivo');
      const dl = await kitPost('report/downloadReport', { report_id: reportId });
      if (!dl.ok) throw new Error(`Error al descargar: HTTP ${dl.status} ${dl.statusText}`);
      let buffer = await dl.arrayBuffer();

      // Si en lugar del archivo llega JSON (error o enlace de descarga), se maneja aquí.
      // Un .xlsx empieza con "PK"; un JSON empieza con "{".
      if (new Uint8Array(buffer)[0] === 0x7b) {
        const json = JSON.parse(new TextDecoder().decode(buffer));
        if (json.success === false) throw new Error(kitErrorMessage(json));
        const link = typeof json.result === 'string' ? json.result : (json.result?.url || json.result?.link || json.result?.download_url);
        if (!link) throw new Error('La API no devolvió el archivo del reporte.');
        const fileRes = await fetch(link);
        if (!fileRes.ok) throw new Error(`Error al descargar: HTTP ${fileRes.status}`);
        buffer = await fileRes.arrayBuffer();
      }

      addLog(`Archivo recibido (${(buffer.byteLength / 1024).toFixed(0)} KB). Analizando...`);
      setProgress('Analizando reporte...');
      await ensureXlsx();
      const result = parseWorkbookBuffer(buffer);
      const fname = `kit_call_history_${datetimeStart.slice(0, 10)}_${datetimeEnd.slice(0, 10)}.xlsx`;
      loadDataset(result, `API · reporte #${reportId}`);
      setRawReport({ blob: new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name: fname });
    } catch (err) {
      console.error(err);
      addLog(`Error: ${err.message}`);
      const isCred = /rechazó las credenciales/.test(err.message);
      const isNetwork = /failed to fetch|networkerror|load failed/i.test(err.message);
      const nullOrigin = typeof window !== 'undefined' && window.location.origin === 'null';
      let corsHint = isCred ? '' : ' Verifica el API Host, el Account Name y el Access Token.';
      if (isNetwork && proxyBase()) {
        corsHint = ` No se pudo conectar con el proxy (${proxyBase()}). Verifica que esté en ejecución.`;
      } else if (isNetwork) {
        corsHint = (nullOrigin
          ? ' Esta app se está ejecutando en un iframe aislado (origen "null", p. ej. una vista previa embebida). La API de Kit solo acepta llamadas desde páginas con origen https, así que el navegador bloquea la respuesta (CORS).'
          : ' El navegador bloqueó la conexión con la API (CORS o red).')
          + ' Solución: usa el proxy (campo "Proxy" y comando npm run proxy), publica la app en un dominio https, o descarga el reporte desde Kit y súbelo en "Subir archivo".';
      }
      setError(`Error en la petición: ${err.message}.${corsHint}`);
    } finally {
      setIsLoading(false);
      setProgress('');
    }
  };

  // ---------- Análisis ----------
  const baseAnalyzedData = useMemo(
    () => analyzeRecords(records, { campaign: selectedCampaign, direction: selectedDirection, start: startDate, end: endDate }),
    [records, selectedCampaign, selectedDirection, startDate, endDate]
  );

  const distribution = useMemo(() => attemptsDistribution(baseAnalyzedData), [baseAnalyzedData]);

  // Si cambian los filtros y la opción elegida deja de existir, se vuelve a "Todas"
  useEffect(() => {
    if (exactAttempts !== '' && !distribution.some((d) => String(d.attempts) === exactAttempts)) {
      setExactAttempts('');
    }
  }, [distribution, exactAttempts]);

  const processedData = useMemo(() => {
    let finalData = baseAnalyzedData;
    if (exactAttempts !== '') {
      const n = parseInt(exactAttempts, 10);
      finalData = finalData.filter((item) => item.attempts === n);
    }
    return [...finalData].sort((a, b) => b.attempts - a.attempts || a.phone.localeCompare(b.phone));
  }, [baseAnalyzedData, exactAttempts]);

  const metrics = useMemo(() => {
    const totalContacts = processedData.length;
    const successful = processedData.filter((item) => item.isSuccess).length;
    const failed = totalContacts - successful;
    const successRate = totalContacts > 0 ? ((successful / totalContacts) * 100).toFixed(1) : '0.0';
    return { totalContacts, successful, failed, successRate };
  }, [processedData]);

  const maxDistContacts = Math.max(1, ...distribution.map((d) => d.contacts));

  // ---------- Descargas ----------
  const exportBaseName = (attempts = exactAttempts) => {
    const parts = ['contactos'];
    if (selectedDirection) parts.push(safeName(selectedDirection.toLowerCase()));
    parts.push(selectedCampaign ? safeName(selectedCampaign) : 'todas_campanas');
    parts.push(attempts !== '' ? `${attempts}_intentos` : 'todos_intentos');
    if (startDate || endDate) parts.push(`${startDate || 'inicio'}_a_${endDate || 'fin'}`);
    return parts.join('_');
  };

  // Hoja 1 "Contactos": una fila por contacto (campaña + teléfono), lista para filtrar
  const CONTACT_HEADERS = ['Teléfono', 'Campaña', 'Total intentos', 'Cód. respuesta (última llamada)', 'Estado (última llamada)', 'Fecha y hora última llamada', 'Fecha y hora primer intento', 'Éxito en algún intento'];
  const contactRow = (row) => [
    row.phone, row.campaign, row.attempts, row.finalResponseCode, row.isSuccess ? 'Éxito' : 'Fallo',
    row.lastCallAt, row.firstCallAt, row.everSuccess ? 'Sí' : 'No',
  ];
  // Hoja 2 "Intentos": una fila por intento, en orden cronológico dentro de cada contacto
  const ATTEMPT_HEADERS = ['Teléfono', 'Campaña', 'Total intentos', 'Intento', 'Fecha', 'Hora', 'Cód. respuesta', 'Resultado', 'Última llamada'];
  const attemptRows = (row) => row.history.map((h) => [
    row.phone, row.campaign, row.attempts, h.n, h.date, h.time, h.code, h.success ? 'Éxito' : 'Fallo', h.n === row.attempts ? 'Sí' : '',
  ]);

  const makeSheet = (aoa, widths) => {
    const XLSX = window.XLSX;
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols'] = widths.map((wch) => ({ wch }));
    ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: Math.max(aoa.length - 1, 0), c: aoa[0].length - 1 } }) };
    return ws;
  };

  // Excel con dos hojas. El teléfono se guarda como texto para no perder el '+' ni ceros a la izquierda.
  const downloadXlsx = (rows, attempts = exactAttempts) => {
    if (!window.XLSX || rows.length === 0) return;
    const sorted = [...rows].sort((a, b) => a.campaign.localeCompare(b.campaign) || a.phone.localeCompare(b.phone));
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, makeSheet([CONTACT_HEADERS, ...sorted.map(contactRow)], [18, 30, 14, 28, 20, 24, 24, 20]), 'Contactos');
    window.XLSX.utils.book_append_sheet(wb, makeSheet([ATTEMPT_HEADERS, ...sorted.flatMap(attemptRows)], [18, 30, 14, 9, 12, 8, 16, 11, 14]), 'Intentos');
    window.XLSX.writeFile(wb, `${exportBaseName(attempts)}.xlsx`);
  };

  const downloadCsv = (rows) => {
    if (rows.length === 0) return;
    const sorted = [...rows].sort((a, b) => a.campaign.localeCompare(b.campaign) || a.phone.localeCompare(b.phone));
    const lines = [CONTACT_HEADERS.map(csvCell).join(','), ...sorted.map((r) => contactRow(r).map(csvCell).join(','))];
    const blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    triggerDownload(blob, `${exportBaseName()}.csv`);
  };

  const fmt = (n) => Number(n).toLocaleString('es');
  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm vx-focus outline-none';
  const labelCls = 'block text-xs font-bold text-gray-500 uppercase mb-1';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <style>{BRAND_CSS}</style>
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
        <div className="flex items-center vx-text font-semibold text-lg">
          <img src={KIT_LOGO} alt="Voximplant Kit" className="w-7 h-7 mr-2" />
          Voximplant Kit Analyzer
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-4">

        {/* ================= INGRESO DE DATOS ================= */}
        {!dataset && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="flex border-b border-gray-200">
              {[['upload', 'Subir archivo'], ['api', 'Solicitud por API']].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setError(''); }}
                  className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === key ? 'vx-text border-b-2 vx-border' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center relative hover:bg-gray-50 transition-colors">
                  <Upload className="w-10 h-10 vx-text mx-auto mb-4" />
                  <h3 className="text-gray-800 font-medium mb-1">Sube o arrastra el reporte de llamadas</h3>
                  <p className="text-gray-500 text-sm">Historial de llamadas de Voximplant Kit (XLSX, XLS, CSV) o de Voximplant Platform (CSV).</p>
                  <input
                    type="file"
                    accept=".csv,.txt,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center font-medium vx-text">
                      {progress || 'Procesando archivo...'}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-5 max-w-lg mx-auto relative">
                  <div>
                    <label className={labelCls}>API Host</label>
                    <input type="text" placeholder="kitapi-us.voximplant.com" value={apiHost} onChange={(e) => setApiHost(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Account name (domain)</label>
                    <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Access token</label>
                    <input type="password" autoComplete="off" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Periodo</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {DATE_PRESETS.map((p) => (
                        <button key={p.key} type="button" onClick={() => applyPreset(p)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${apiPreset === p.key ? 'vx-bg vx-border text-white' : 'border-gray-300 text-gray-600 vx-hover-border vx-hover-text bg-white'}`}>
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-xs text-gray-500 mb-1">Desde</span>
                        <input type="date" value={apiFromDay} max={apiToDay || undefined}
                          onChange={(e) => { setApiFromDay(e.target.value); setApiPreset(''); if (!apiToDay || e.target.value > apiToDay) setApiToDay(e.target.value); }}
                          className={inputCls} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500 mb-1">Hasta</span>
                        <input type="date" value={apiToDay} min={apiFromDay || undefined}
                          onChange={(e) => { setApiToDay(e.target.value); setApiPreset(''); }}
                          className={inputCls} />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-600 mt-3 cursor-pointer select-none">
                      <input type="checkbox" checked={useCustomTimes} onChange={(e) => setUseCustomTimes(e.target.checked)} />
                      Especificar horas (por defecto, días completos de 00:00 a 23:59)
                    </label>
                    {useCustomTimes && (
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <input type="time" value={apiFromTime} onChange={(e) => setApiFromTime(e.target.value)} className={inputCls} />
                        <input type="time" value={apiToTime} onChange={(e) => setApiToTime(e.target.value)} className={inputCls} />
                      </div>
                    )}
                    {apiFromDay && (
                      <p className="text-xs text-gray-500 mt-2">
                        Se pedirán las llamadas de <b className="text-gray-700">{apiRangeLocal().label}</b> (hora local).
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>Proxy (opcional)</label>
                    <input type="text" placeholder="http://localhost:8787" value={apiProxy} onChange={(e) => setApiProxy(e.target.value)} className={inputCls} />
                    <p className="text-xs text-gray-500 mt-1">Necesario solo si la app corre en un entorno aislado (p. ej. una vista previa embebida). Ejecuta <code>npm run proxy</code> y escribe aquí su dirección.</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-xs text-gray-600 space-y-1">
                    <p>El API Host, el Account name y el token se obtienen en Kit: <b>Administración → Seguridad → API tokens</b>.</p>
                    <p>Se descargan todas las llamadas del rango; la dirección y la campaña se eligen después, al analizar el reporte.</p>
                    <p>Las fechas se envían en UTC. El token solo se usa en esta sesión del navegador y no se guarda.</p>
                  </div>

                  <button type="button" onClick={handleApiFetch} disabled={isLoading}
                    className="w-full vx-bg vx-bg-hover text-white py-3 rounded font-medium transition-colors disabled:opacity-70 flex justify-center items-center">
                    {isLoading ? (progress || 'Procesando...') : 'Submit'}
                  </button>
                  {apiLog.length > 0 && (
                    <pre className="bg-gray-900 text-gray-100 text-xs rounded p-3 whitespace-pre-wrap overflow-x-auto">{apiLog.join('\n')}</pre>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ANÁLISIS ================= */}
        {dataset && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Resultados del reporte</h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <FileSpreadsheet className="w-4 h-4 mr-1" /> {dataset.source}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                {rawReport && (
                  <button onClick={() => triggerDownload(rawReport.blob, rawReport.name)} className="text-sm vx-text hover:underline flex items-center">
                    <Download className="w-4 h-4 mr-1" /> Reporte original
                  </button>
                )}
                <button onClick={resetAll} className="text-sm text-gray-500 vx-hover-text underline">
                  Cargar otro reporte
                </button>
              </div>
            </div>

            {/* Formato detectado */}
            <div className="vx-bg-soft border vx-border-soft rounded-lg p-4 text-sm text-gray-700 flex items-start">
              <Info className="w-5 h-5 mr-2 vx-text shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Formato detectado: {FORMAT_INFO[dataset.format].title}</p>
                <p className="mt-1">{FORMAT_INFO[dataset.format].note}</p>
                <p className="mt-1 text-gray-500">
                  {fmt(dataset.dataRows)} {dataset.format === 'platform' ? 'sesiones' : 'llamadas'} leídas · {fmt(dataset.records.length)} analizadas
                  {dataset.excluded > 0 && ` · ${fmt(dataset.excluded)} sin teléfono identificable (excluidas)`}
                  {dataset.duplicates > 0 && ` · ${fmt(dataset.duplicates)} ${dataset.duplicates === 1 ? 'fila repetida' : 'filas repetidas'} de la misma llamada (contadas una vez)`}
                  {dateBounds.min && ` · ${dateBounds.min} a ${dateBounds.max}`}
                </p>
              </div>
            </div>

            {/* Filtros */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dirección</label>
                <select value={selectedDirection} onChange={(e) => setSelectedDirection(e.target.value)} disabled={directions.length === 0}
                  title={directions.length === 0 ? 'Este reporte no incluye la dirección de la llamada' : ''}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none vx-focus disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">{directions.length === 0 ? 'No disponible' : 'Todas'}</option>
                  {directions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Campaña</label>
                <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none vx-focus">
                  <option value="">Todas las campañas ({campaigns.length})</option>
                  {campaigns.map((camp) => <option key={camp} value={camp}>{camp}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Fecha inicio</label>
                <input type="date" value={startDate} min={dateBounds.min} max={dateBounds.max} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none vx-focus" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Fecha fin</label>
                <input type="date" value={endDate} min={dateBounds.min} max={dateBounds.max} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none vx-focus" />
              </div>
              <div>
                <label className="block text-xs font-bold vx-text uppercase mb-2">Cantidad exacta de intentos</label>
                <select value={exactAttempts} onChange={(e) => setExactAttempts(e.target.value)} className="w-full border vx-border vx-text vx-bg-soft rounded px-3 py-2 text-sm outline-none">
                  <option value="">Todos ({fmt(baseAnalyzedData.length)} contactos)</option>
                  {distribution.map((d) => (
                    <option key={d.attempts} value={d.attempts}>
                      {d.attempts} {d.attempts === 1 ? 'intento' : 'intentos'} — {fmt(d.contacts)} {d.contacts === 1 ? 'contacto' : 'contactos'}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Contactos únicos</span>
                <span className="text-2xl font-bold text-gray-800">{fmt(metrics.totalContacts)}</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Éxito (último intento)</span>
                <span className="text-2xl font-bold text-emerald-600">{fmt(metrics.successful)}</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Fallaron</span>
                <span className="text-2xl font-bold text-red-600">{fmt(metrics.failed)}</span>
              </div>
              <div className="vx-bg text-white rounded-lg shadow-sm p-4">
                <span className="text-xs font-bold text-white/80 uppercase block mb-1">Tasa de éxito</span>
                <span className="text-2xl font-bold">{metrics.successRate}%</span>
              </div>
            </div>

            {/* Distribución por intentos */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Contactos por cantidad de intentos</h3>
                <p className="text-xs text-gray-500 mt-1">Total de intentos por contacto (campaña + teléfono). Haz clic en una fila para filtrar, o descarga la lista de ese grupo.</p>
              </div>
              <div className="overflow-x-auto vx-maxh-360">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold sticky top-0">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-200">Intentos</th>
                      <th className="px-4 py-2 border-b border-gray-200">Contactos</th>
                      <th className="px-4 py-2 border-b border-gray-200 hidden md:table-cell w-1/3"></th>
                      <th className="px-4 py-2 border-b border-gray-200 text-right">Éxito</th>
                      <th className="px-4 py-2 border-b border-gray-200 text-right">Tasa</th>
                      <th className="px-4 py-2 border-b border-gray-200 text-right">Números</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {distribution.map((d) => {
                      const active = exactAttempts === String(d.attempts);
                      const groupRows = () => baseAnalyzedData.filter((c) => c.attempts === d.attempts).sort((a, b) => a.phone.localeCompare(b.phone));
                      return (
                        <tr key={d.attempts} onClick={() => setExactAttempts(active ? '' : String(d.attempts))}
                          className={`cursor-pointer transition-colors ${active ? 'vx-bg-soft' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-2 font-bold ${active ? 'vx-text' : ''}`}>{d.attempts}</td>
                          <td className="px-4 py-2">{fmt(d.contacts)}</td>
                          <td className="px-4 py-2 hidden md:table-cell">
                            <div className="h-2 bg-gray-100 rounded">
                              <div className="h-2 rounded vx-bg" style={{ width: `${(d.contacts / maxDistContacts) * 100}%` }} />
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right text-emerald-600">{fmt(d.success)}</td>
                          <td className="px-4 py-2 text-right">{((d.success / d.contacts) * 100).toFixed(1)}%</td>
                          <td className="px-4 py-2 text-right">
                            <button onClick={(e) => { e.stopPropagation(); downloadXlsx(groupRows(), String(d.attempts)); }}
                              title={`Descargar los ${d.contacts} contactos con ${d.attempts} intentos`}
                              className="vx-text vx-hover-soft rounded p-1">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Resultados por contacto */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {exactAttempts !== '' ? `Contactos con exactamente ${exactAttempts} ${exactAttempts === '1' ? 'intento' : 'intentos'}` : 'Resultados por contacto'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{fmt(processedData.length)} {processedData.length === 1 ? 'contacto' : 'contactos'}{selectedDirection ? ` · ${selectedDirection}` : ''}{selectedCampaign ? ` · ${selectedCampaign}` : ''}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => downloadXlsx(processedData)} disabled={processedData.length === 0}
                    title="Hoja Contactos (una fila por contacto) + hoja Intentos (cada intento con fecha, hora y código)"
                    className="vx-bg vx-bg-hover text-white px-4 py-2 text-sm font-medium rounded transition-colors flex items-center disabled:opacity-50">
                    <Download className="w-4 h-4 mr-2" /> Lista de números (.xlsx)
                  </button>
                  <button onClick={() => downloadCsv(processedData)} disabled={processedData.length === 0}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-sm font-medium rounded transition-colors flex items-center disabled:opacity-50">
                    <Download className="w-4 h-4 mr-2" /> CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto vx-maxh-500">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold sticky top-0">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200">Teléfono</th>
                      <th className="px-6 py-3 border-b border-gray-200">Campaña</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-center">Total intentos</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-center">Cód. respuesta<span className="block normal-case font-normal">(última llamada)</span></th>
                      <th className="px-6 py-3 border-b border-gray-200 text-center">Última llamada</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-center">Estado<span className="block normal-case font-normal">(última llamada)</span></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                    {processedData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No hay resultados con estos filtros.</td>
                      </tr>
                    ) : (
                      processedData.slice(0, 100).map((row) => {
                        const rowKey = `${row.campaign}|${row.phone}`;
                        const open = expandedRow === rowKey;
                        return (
                        <React.Fragment key={rowKey}>
                        <tr onClick={() => setExpandedRow(open ? '' : rowKey)} title="Ver cada intento"
                          className={`cursor-pointer transition-colors ${open ? 'vx-bg-soft' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-3 font-medium font-mono"><span className="text-gray-400 mr-1">{open ? '▾' : '▸'}</span>{row.phone}</td>
                          <td className="px-6 py-3 text-gray-500 truncate max-w-xs" title={row.campaign}>{row.campaign}</td>
                          <td className="px-6 py-3 text-center">
                            <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-bold">{row.attempts}</span>
                          </td>
                          <td className="px-6 py-3 text-center font-mono">{row.finalResponseCode}</td>
                          <td className="px-6 py-3 text-center text-gray-500 whitespace-nowrap">{row.lastCallAt}</td>
                          <td className="px-6 py-3 text-center">
                            {row.isSuccess ? (
                              <span className="text-emerald-600 font-bold flex items-center justify-center"><CheckCircle2 className="w-4 h-4 mr-1" /> Éxito</span>
                            ) : (
                              <span className="text-red-500 font-bold flex items-center justify-center"><XCircle className="w-4 h-4 mr-1" /> Fallo</span>
                            )}
                          </td>
                        </tr>
                        {open && (
                          <tr className="vx-bg-soft">
                            <td colSpan={6} className="px-6 pb-4 pt-1">
                              <table className="text-xs bg-white border border-gray-200 rounded w-full max-w-lg">
                                <thead className="text-gray-500 uppercase">
                                  <tr>
                                    <th className="px-3 py-1.5 text-left">Intento</th>
                                    <th className="px-3 py-1.5 text-left">Fecha</th>
                                    <th className="px-3 py-1.5 text-left">Hora</th>
                                    <th className="px-3 py-1.5 text-left">Cód. respuesta</th>
                                    <th className="px-3 py-1.5 text-left">Resultado</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {row.history.map((h) => (
                                    <tr key={h.n}>
                                      <td className="px-3 py-1.5 font-bold">{h.n}</td>
                                      <td className="px-3 py-1.5">{h.date}</td>
                                      <td className="px-3 py-1.5">{h.time}</td>
                                      <td className="px-3 py-1.5 font-mono">{h.code}</td>
                                      <td className={`px-3 py-1.5 font-medium ${h.success ? 'text-emerald-600' : 'text-red-500'}`}>{h.success ? 'Éxito' : 'Fallo'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {processedData.length > 100 && (
                <div className="px-6 py-3 text-xs text-gray-500 border-t border-gray-100">
                  Mostrando 100 de {fmt(processedData.length)} contactos. Usa los botones de descarga para obtener la lista completa.
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

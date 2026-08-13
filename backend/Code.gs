/**
 * ============================================================
 * MeetSync — Google Apps Script backend
 * Google Sheets  = database
 * Google Drive   = image / file storage (attachments, exports)
 *
 * DEPLOY:
 *  1) Open https://script.google.com -> New project -> paste this file
 *  2) Run `setup()` once (grants permissions, creates sheets + Drive folder)
 *  3) Deploy -> New deployment -> Web app
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  4) Copy the /exec URL into the app (Settings -> API Endpoint)
 * ============================================================
 */

/* ---------- Constants ---------- */
var CONFIG_SHEET = 'Config';

var SHEET_DEFS = [
  ['Config',  ['key', 'value']],
  ['Projects',['id','name','description','category','icon','color','progress','status','createdAt','updatedAt']],
  ['Meetings',['id','projectId','title','summary','priority','date','time','endTime','participants','attachments','status','createdAt','updatedAt','deleted']],
  ['Contacts',['id','name','email','avatar','group','createdAt']],
  ['Groups',  ['id','name','memberIds','createdAt']],
  ['Settings',['key','value']],
  ['Exports', ['id','format','filters','fileId','fileName','createdAt']]
];

var FOLDER_ID_KEY  = 'DRIVE_FOLDER_ID';
var PIN_KEY        = 'DELETE_PIN';
var DEFAULT_PIN    = '0000';

/* ---------- Entry points ---------- */
function doGet(e) {
  return handleRequest(e, 'get');
}
function doPost(e) {
  return handleRequest(e, 'post');
}

function handleRequest(e, method) {
  ensureAll();
  try {
    var params = e.parameter || {};
    var action = params.action || '';
    var body = {};
    if (method === 'post' && e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents); }
      catch (err) { body = e.parameter || {}; }
    }
    return route(action, params, body);
  } catch (err) {
    return json({ ok: false, error: String(err.message || err) });
  }
}

function route(action, params, body) {
  switch (action) {
    case 'ping':            return json({ ok: true, name: 'MeetSync', version: '1.0.0', time: new Date().toISOString() });

    case 'getDashboard':    return getDashboard();
    case 'getProjects':     return json({ ok: true, projects: readAll(PROJECTS()) });
    case 'getMeetings':     return getMeetings(params);
    case 'getContacts':     return json({ ok: true, contacts: readAll(CONTACTS()) });
    case 'getGroups':       return json({ ok: true, groups: readAll(GROUPS()) });
    case 'getSettings':     return json({ ok: true, settings: readSettings() });
    case 'getExports':      return json({ ok: true, exports: readAll(EXPORTS()) });

    case 'saveProject':     return json(saveProject(body));
    case 'saveMeeting':     return json(saveMeeting(body));
    case 'deleteMeeting':   return json(deleteMeeting(body));
    case 'deleteProject':   return json(deleteProject(body));
    case 'uploadImage':     return json(uploadImage(body));
    case 'saveContacts':    return json(saveContacts(body));
    case 'saveGroups':      return json(saveGroups(body));
    case 'saveSettings':    return json(saveSettings(body));
    case 'saveExport':      return json(saveExport(body));

    default:                return json({ ok: false, error: 'Unknown action: ' + action });
  }
}

/* ---------- Setup ---------- */
function setup() {
  ensureAll();
  return 'MeetSync backend ready. Sheets + Drive folder created.';
}

function ensureAll() {
  SHEET_DEFS.forEach(function (def) { ensureSheet(def[0], def[1]); });
  var folder = getOrCreateFolder();
  try { folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
  ensureConfig(FOLDER_ID_KEY, folder.getId());
  ensureConfig(PIN_KEY, DEFAULT_PIN);
}

function ensureSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#e0e0ff').setFontColor('#000666');
    sh.setFrozenRows(1);
    sh.setHiddenGridlines(true);
  }
  return sh;
}

function getOrCreateFolder() {
  var id = getConfig(FOLDER_ID_KEY);
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var folder = DriveApp.createFolder('MeetSync_Attachments');
  return folder;
}

function ensureConfig(key, value) {
  if (getConfig(key) === null) { writeConfig(key, value); }
}

/* ---------- Sheet helpers ---------- */
function SS() { return SpreadsheetApp.getActiveSpreadsheet(); }
function PROJECTS() { return SS().getSheetByName('Projects'); }
function MEETINGS() { return SS().getSheetByName('Meetings'); }
function CONTACTS() { return SS().getSheetByName('Contacts'); }
function GROUPS()   { return SS().getSheetByName('Groups'); }
function SETTINGS() { return SS().getSheetByName('Settings'); }
function EXPORTS()  { return SS().getSheetByName('Exports'); }

function readAll(sheet) {
  var last = sheet.getLastRow();
  if (last < 1) return [];
  var values = sheet.getRange(1, 1, last, sheet.getLastColumn()).getValues();
  var headers = values[0];
  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var key = String(headers[c]).trim();
      if (!key) continue;
      var val = values[r][c];
      if (typeof val === 'string' && (val.indexOf('[') === 0 || val.indexOf('{') === 0)) {
        try { val = JSON.parse(val); } catch (e) {}
      }
      obj[key] = val;
    }
    rows.push(obj);
  }
  return rows;
}

function findRowBy(sheet, key, value) {
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var col = headersOf(sheet).indexOf(key) + 1;
  if (col < 1) return -1;
  var values = sheet.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(value)) return i + 2;
  }
  return -1;
}

function headersOf(sheet) {
  if (sheet.getLastRow() < 1) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
}

function upsertRow(sheet, key, value, data) {
  var headers = headersOf(sheet);
  var row = findRowBy(sheet, key, value);
  if (row < 0) {
    var newRow = headers.map(function (h) { return data[h] !== undefined ? data[h] : ''; });
    sheet.appendRow(newRow);
    return sheet.getLastRow();
  }
  for (var c = 0; c < headers.length; c++) {
    if (data[headers[c]] !== undefined) {
      sheet.getRange(row, c + 1).setValue(data[headers[c]]);
    }
  }
  return row;
}

/* ---------- Config / Settings ---------- */
function getConfig(key) {
  var sh = SS().getSheetByName(CONFIG_SHEET);
  if (!sh) return null;
  var last = sh.getLastRow();
  if (last < 2) return null;
  var vals = sh.getRange(2, 1, last - 1, 2).getValues();
  for (var i = 0; i < vals.length; i++) {
    if (String(vals[i][0]) === String(key)) return vals[i][1];
  }
  return null;
}

function writeConfig(key, value) {
  var sh = SS().getSheetByName(CONFIG_SHEET);
  var row = findRowBy(sh, 'key', key);
  if (row < 0) { sh.appendRow([key, value]); }
  else { sh.getRange(row, 2).setValue(value); }
}

function readSettings() {
  var out = {};
  readAll(SETTINGS()).forEach(function (r) { if (r.key) out[r.key] = r.value; });
  out.pin = getConfig(PIN_KEY);
  out.attachmentsFolderId = getConfig(FOLDER_ID_KEY);
  return out;
}

function saveSettings(body) {
  var data = body.settings || body;
  var map = {};
  readAll(SETTINGS()).forEach(function (r) { if (r.key) map[r.key] = r.value; });
  Object.keys(data).forEach(function (k) {
    if (k === 'pin') return;
    map[k] = data[k];
  });
  if (data.pin !== undefined && String(data.pin).length >= 4) {
    writeConfig(PIN_KEY, String(data.pin));
  }
  var sh = SETTINGS();
  var keys = Object.keys(map);
  for (var i = 0; i < keys.length; i++) {
    upsertRow(sh, 'key', keys[i], { key: keys[i], value: map[keys[i]] });
  }
  return { ok: true, settings: readSettings() };
}

/* ---------- Dashboard ---------- */
function getDashboard() {
  var projects = readAll(PROJECTS());
  var meetings = readAll(MEETINGS()).filter(function (m) { return m.deleted !== true && m.deleted !== 'TRUE' && m.deleted !== 'true'; });
  var contacts = readAll(CONTACTS());
  var groups   = readAll(GROUPS());
  var settings = readSettings();

  var meetingCounts = {};
  meetings.forEach(function (m) { if (m.projectId) meetingCounts[m.projectId] = (meetingCounts[m.projectId] || 0) + 1; });
  projects.forEach(function (p) { p.meetingsCount = meetingCounts[p.id] || 0; });

  meetings.sort(function (a, b) {
    var da = (a.date || '') + ' ' + (a.time || '');
    var db = (b.date || '') + ' ' + (b.time || '');
    return db.localeCompare(da);
  });

  return json({
    ok: true,
    data: {
      projects: projects,
      meetings: meetings,
      contacts: contacts,
      groups: groups,
      settings: settings,
      serverTime: new Date().toISOString()
    }
  });
}

function getMeetings(params) {
  var all = readAll(MEETINGS());
  var out = all.filter(function (m) {
    if (m.deleted === true || m.deleted === 'TRUE' || m.deleted === 'true') return false;
    if (params.projectId && m.projectId !== params.projectId) return false;
    return true;
  });
  out.sort(function (a, b) { return ((b.date || '') + ' ' + (b.time || '')).localeCompare((a.date || '') + ' ' + (a.time || '')); });
  return json({ ok: true, meetings: out });
}

/* ---------- Projects ---------- */
function saveProject(body) {
  var p = body.project || body;
  var headers = headersOf(PROJECTS());
  var now = new Date().toISOString();
  var data = {
    id:          p.id || genId('prj'),
    name:        p.name || 'Untitled project',
    description: p.description || '',
    category:    p.category || 'General',
    icon:        p.icon || 'folder',
    color:       p.color || 'primary',
    progress:    p.progress || 0,
    status:      p.status || 'active',
    createdAt:   p.createdAt || now,
    updatedAt:   now
  };
  Object.keys(data).forEach(function (k) { if (headers.indexOf(k) < 0) delete data[k]; });
  upsertRow(PROJECTS(), 'id', data.id, data);
  return { ok: true, project: data };
}

function deleteProject(body) {
  var pin = getConfig(PIN_KEY);
  if (String(body.pin) !== String(pin)) return { ok: false, error: 'Invalid PIN' };
  var id = body.id;
  var row = findRowBy(PROJECTS(), 'id', id);
  if (row > 0) SS().deleteRow(row);
  var meetings = readAll(MEETINGS()).filter(function (m) { return m.projectId === id; });
  meetings.forEach(function (m) {
    var r = findRowBy(MEETINGS(), 'id', m.id);
    if (r > 0) SS().deleteRow(r);
  });
  return { ok: true, deletedProject: id, deletedMeetings: meetings.length };
}

/* ---------- Meetings ---------- */
function saveMeeting(body) {
  var m = body.meeting || body;
  var headers = headersOf(MEETINGS());
  var now = new Date().toISOString();
  var data = {
    id:           m.id || genId('mtg'),
    projectId:    m.projectId || '',
    title:        m.title || '',
    summary:      m.summary || '',
    priority:     m.priority || 'medium',
    date:         m.date || '',
    time:         m.time || '',
    endTime:      m.endTime || '',
    participants: JSON.stringify(m.participants || []),
    attachments:  JSON.stringify(m.attachments || []),
    status:       m.status || 'done',
    createdAt:    m.createdAt || now,
    updatedAt:    now,
    deleted:      m.deleted === true ? true : false
  };
  Object.keys(data).forEach(function (k) { if (headers.indexOf(k) < 0) delete data[k]; });
  var row = upsertRow(MEETINGS(), 'id', data.id, data);
  // preserve createdAt on update if not provided
  if (row > 0 && !m.createdAt) {
    var prev = readAll(MEETINGS()).filter(function (x) { return x.id === data.id; })[0];
    if (prev && prev.createdAt) { data.createdAt = prev.createdAt; SS().getSheetByName('Meetings').getRange(row, headers.indexOf('createdAt') + 1).setValue(prev.createdAt); }
  }
  var saved = readAll(MEETINGS()).filter(function (x) { return x.id === data.id; })[0];
  return { ok: true, meeting: saved, row: row };
}

function deleteMeeting(body) {
  var pin = getConfig(PIN_KEY);
  if (String(body.pin) !== String(pin)) return { ok: false, error: 'Invalid PIN' };
  var id = body.id;
  var row = findRowBy(MEETINGS(), 'id', id);
  if (row < 0) return { ok: false, error: 'Meeting not found' };
  var headers = headersOf(MEETINGS());
  SS().getSheetByName('Meetings').getRange(row, headers.indexOf('deleted') + 1).setValue(true);
  return { ok: true, deletedMeeting: id };
}

/* ---------- Images (Drive) ---------- */
function uploadImage(body) {
  var name = body.name || 'attachment-' + Date.now();
  var mime = body.mime || 'image/png';
  var data = body.data; // base64
  if (!data) return { ok: false, error: 'No image data' };

  var bytes = Utilities.base64Decode(String(data).replace(/^data:[^,]+,/, ''));
  var blob = Utilities.newBlob(bytes, mime, name);
  var folder = getOrCreateFolder();
  var file = folder.createFile(blob);
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}

  return {
    ok: true,
    file: {
      id:   file.getId(),
      name: file.getName(),
      mime: file.getMimeType(),
      size: file.getSize(),
      url:  'https://drive.google.com/uc?export=view&id=' + file.getId()
    }
  };
}

/* ---------- Contacts / Groups ---------- */
function saveContacts(body) {
  var list = body.contacts || body;
  var headers = headersOf(CONTACTS());
  var now = new Date().toISOString();
  list.forEach(function (c) {
    var data = {
      id:        c.id || genId('ctc'),
      name:      c.name || '',
      email:     c.email || '',
      avatar:    c.avatar || '',
      group:     c.group || '',
      createdAt: c.createdAt || now
    };
    Object.keys(data).forEach(function (k) { if (headers.indexOf(k) < 0) delete data[k]; });
    upsertRow(CONTACTS(), 'id', data.id, data);
  });
  return { ok: true, contacts: readAll(CONTACTS()) };
}

function saveGroups(body) {
  var list = body.groups || body;
  var headers = headersOf(GROUPS());
  var now = new Date().toISOString();
  list.forEach(function (g) {
    var data = {
      id:        g.id || genId('grp'),
      name:      g.name || '',
      memberIds: JSON.stringify(g.memberIds || []),
      createdAt: g.createdAt || now
    };
    Object.keys(data).forEach(function (k) { if (headers.indexOf(k) < 0) delete data[k]; });
    upsertRow(GROUPS(), 'id', data.id, data);
  });
  return { ok: true, groups: readAll(GROUPS()) };
}

/* ---------- Exports ---------- */
function saveExport(body) {
  var e = body.export || body;
  var headers = headersOf(EXPORTS());
  var now = new Date().toISOString();
  var data = {
    id:        e.id || genId('exp'),
    format:    e.format || 'pdf',
    filters:   JSON.stringify(e.filters || {}),
    fileId:    e.fileId || '',
    fileName:  e.fileName || '',
    createdAt: e.createdAt || now
  };
  Object.keys(data).forEach(function (k) { if (headers.indexOf(k) < 0) delete data[k]; });
  upsertRow(EXPORTS(), 'id', data.id, data);
  return { ok: true, exports: readAll(EXPORTS()) };
}

/* ---------- Utils ---------- */
function genId(prefix) {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var s = '';
  for (var i = 0; i < 8; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return prefix + '_' + s + '_' + Date.now().toString(36);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

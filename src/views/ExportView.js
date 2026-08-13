// Export Center — generate PDF/PNG reports from meetings.

import { icon, toast, emptyState } from '../lib/ui.js';
import { store } from '../lib/store.js';
import { queue } from '../lib/syncQueue.js';
import { api } from '../lib/api.js';
import { topBarHTML, bottomNavHTML } from '../components/shared.js';
import { escapeHtml, sanitizeHTML, uid, nowIso, fmtDateTime, initials, PRIORITY, timeAgo } from '../lib/utils.js';
import { driveThumb } from '../lib/config.js';

export default {
  id: 'export',
  title: 'Export',

  render() {
    const projects = store.get().projects;
    return `
      ${topBarHTML({ title: 'Export Data', left: '', right: '' })}
      <main class="max-w-[1200px] mx-auto px-4 md:px-6 pb-28 md:pb-12 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 flex flex-col gap-5">
          <!-- Format -->
          <section class="card p-5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-1">${icon('description', 'text-primary')} Select Format</h2>
            <p class="text-[13px] text-on-surface-variant mb-4">Generate a clean shareable report of your meeting summaries.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${[['pdf', 'picture_as_pdf', 'PDF Document', 'Best for sharing multi-page reports and printing.'], ['png', 'image', 'High-Res Image (PNG)', 'Ideal for a single long summary to share in chat.']].map(([v, ic, t, d]) => `
                <label class="relative flex cursor-pointer rounded-xl border p-4 hover:bg-surface-container-low transition-colors ${'outline-variant'}">
                  <input type="radio" name="fmt" value="${v}" class="sr-only peer" ${v === 'pdf' ? 'checked' : ''} />
                  <div class="flex items-start gap-3 w-full">
                    <div class="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 border-outline-variant peer-checked:border-primary peer-checked:border-[6px] transition-all"></div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between gap-2">
                        <span class="text-sm font-semibold text-on-surface">${t}</span>
                        ${icon(ic, 'text-secondary text-[20px]')}
                      </div>
                      <p class="text-[12px] text-on-surface-variant mt-1">${d}</p>
                    </div>
                  </div>
                </label>`).join('')}
            </div>
          </section>

          <!-- Filters -->
          <section class="card p-5 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('filter_list', 'text-secondary')} Filter Content</h2>
            <div class="space-y-4">
              <div>
                <label class="text-[12px] font-medium text-on-surface block mb-1.5">Project</label>
                <select data-project class="input appearance-none cursor-pointer">
                  <option value="">All Projects</option>
                  ${projects.map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)}</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[12px] font-medium text-on-surface block mb-1.5">From</label>
                  <input data-from type="date" class="input" />
                </div>
                <div>
                  <label class="text-[12px] font-medium text-on-surface block mb-1.5">To</label>
                  <input data-to type="date" class="input" />
                </div>
              </div>
              <div>
                <label class="text-[12px] font-medium text-on-surface block mb-2">Include sections</label>
                <div class="flex flex-wrap gap-2">
                  ${[['header', 'Summary header'], ['notes', 'Meeting notes'], ['people', 'Participants'], ['files', 'Attachments']].map(([k, label]) => `
                    <label class="cursor-pointer">
                      <input type="checkbox" data-sec="${k}" class="peer sr-only" checked />
                      <span class="chip peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary-fixed-dim border border-outline-variant">${label}</span>
                    </label>`).join('')}
                </div>
              </div>
            </div>
            <div class="mt-5 pt-4 border-t border-surface-container-high flex flex-col sm:flex-row sm:justify-end gap-2">
              <button data-generate class="btn btn-primary px-6">
                ${icon('download', 'text-[18px]')} <span data-gen-label>Generate Export</span>
              </button>
            </div>
          </section>
        </div>

        <!-- Recent exports -->
        <div class="flex flex-col gap-5">
          <section class="card p-5 h-full flex flex-col">
            <h2 class="flex items-center gap-2 text-[15px] font-semibold text-on-surface mb-4">${icon('history', 'text-outline')} Recent Exports</h2>
            <div data-recent class="flex-1 space-y-2"></div>
          </section>
        </div>
      </main>
      ${bottomNavHTML('export')}`;
  },

  async mount(ctx) {
    const root = ctx.root;
    const genBtn = root.querySelector('[data-generate]');
    const genLabel = root.querySelector('[data-gen-label]');

    /* recent exports */
    const recentEl = root.querySelector('[data-recent]');
    let exportsList = [];
    async function loadExports() {
      try {
        const res = await api.getExports();
        exportsList = (res && res.exports) || [];
      } catch {}
      renderRecent();
    }
    function renderRecent() {
      if (!exportsList.length) {
        recentEl.innerHTML = emptyState({ icon: 'history', title: 'No exports yet', message: 'Generated reports will appear here.' });
        return;
      }
      recentEl.innerHTML = exportsList.slice(0, 8).map((e) => `
        <div class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
          <div class="w-9 h-9 rounded-lg ${e.format === 'pdf' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'} flex items-center justify-center shrink-0">
            ${icon(e.format === 'pdf' ? 'picture_as_pdf' : 'image', 'text-[18px]')}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-on-surface truncate">${escapeHtml(e.fileName || 'Report')}</p>
            <p class="text-[11px] text-on-surface-variant">${escapeHtml(timeAgo(e.createdAt))}</p>
          </div>
          <span class="badge ${e.format === 'pdf' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}">${e.format.toUpperCase()}</span>
        </div>`).join('');
    }

    genBtn.addEventListener('click', async () => {
      const fmt = root.querySelector('input[name="fmt"]:checked').value;
      const projectId = root.querySelector('[data-project]').value;
      const from = root.querySelector('[data-from]').value;
      const to = root.querySelector('[data-to]').value;
      const sections = root.querySelectorAll('[data-sec]:checked');
      const secMap = {};
      sections.forEach((s) => { secMap[s.dataset.sec] = true; });

      let meetings = [...store.get().meetings];
      if (projectId) meetings = meetings.filter((m) => m.projectId === projectId);
      if (from) meetings = meetings.filter((m) => !m.date || m.date >= from);
      if (to) meetings = meetings.filter((m) => !m.date || m.date <= to);
      meetings.sort((a, b) => String(b.date + ' ' + b.time).localeCompare(String(a.date + ' ' + a.time)));

      if (!meetings.length) { toast.show('No meetings match the filters.', 'warn'); return; }

      genBtn.disabled = true;
      genLabel.textContent = 'Generating…';

      try {
        const { default: html2canvas } = await import('html2canvas');
        const report = buildReport(meetings, secMap);
        document.body.appendChild(report);
        report.style.display = 'block';
        // let images decode
        await new Promise((r) => setTimeout(r, 350));
        const canvas = await html2canvas(report, { scale: 2, backgroundColor: '#ffffff', logging: false, useCORS: true });

        const projName = projectId ? (store.project(projectId)?.name || 'project') : 'all';
        const stamp = new Date().toISOString().slice(0, 10);
        const base = `MeetSync_${projName.replace(/[^a-z0-9]+/gi, '_')}_${stamp}`;

        if (fmt === 'png') {
          const url = canvas.toDataURL('image/png');
          triggerDownload(url, `${base}.png`);
        } else {
          const { jsPDF } = await import('jspdf');
          const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
          const pw = 297; const ph = 210; const margin = 8;
          const imgW = pw - margin * 2;
          const ratio = canvas.width / canvas.height;
          const fullH = imgW / ratio;
          const pageH = ph - margin * 2;
          const pages = Math.ceil(fullH / pageH);
          for (let i = 0; i < pages; i++) {
            if (i > 0) pdf.addPage('a4', 'landscape');
            const sy = (i * pageH * ratio);
            const sh = Math.min(pageH * ratio, canvas.height - sy);
            const slice = document.createElement('canvas');
            slice.width = canvas.width;
            slice.height = sh;
            slice.getContext('2d').drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);
            pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, imgW, (sh / ratio) * (pageH / pageH) || imgW * (sh / canvas.height));
          }
          pdf.save(`${base}.pdf`);
        }

        report.remove();
        queue.enqueue({ type: 'saveExport', payload: { exp: { id: uid('exp'), format: fmt, filters: { projectId, from, to }, fileName: `${base}.${fmt}` } } });
        toast.show('Export generated.', 'success');
        loadExports();
      } catch (err) {
        toast.show('Export failed: ' + err.message, 'error');
      } finally {
        genBtn.disabled = false;
        genLabel.textContent = 'Generate Export';
      }
    });

    loadExports();
    const unsub = store.subscribe(() => {});
    return () => { unsub(); };
  },
};

function buildReport(meetings, sec) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-10000px;top:0;background:#fff;width:1000px;z-index:-1';
  const projName = (m) => store.project(m.projectId)?.name || '';
  const row = (m) => `
    <div style="border:1px solid #e4e1ea;border-left:6px solid ${prioColor(m.priority)};border-radius:12px;padding:20px;margin-bottom:16px;break-inside:avoid;">
      ${sec.header ? `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;">
        <div>
          <div style="font-size:11px;font-weight:600;color:${prioText(m.priority)};background:${prioBg(m.priority)};display:inline-block;padding:3px 10px;border-radius:99px;margin-bottom:8px;">${(PRIORITY[m.priority]?.label || 'Medium') + ' Priority'}</div>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#1b1b21;">${esc(m.title || 'Untitled meeting')}</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#767683;">${esc(fmtDateTime(m.date, m.time))}${projName(m) ? ' · ' + esc(projName(m)) : ''}</p>
        </div>
      </div>` : ''}
      ${sec.people && (m.participants || []).length ? `
      <div style="margin-bottom:${sec.notes && m.summary ? '14px' : '0'};">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin-bottom:6px;">Participants</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">${m.participants.map((p) => `<span style="display:inline-flex;align-items:center;gap:6px;background:#efecf5;border-radius:99px;padding:4px 12px;font-size:12px;color:#1b1b21;">${initials(p.name)} ${esc(p.name)}</span>`).join('')}</div>
      </div>` : ''}
      ${sec.notes && m.summary ? `
      <div style="font-size:13px;line-height:1.65;color:#1b1b21;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin:0 0 8px;">Meeting Notes</div>
        <div class="ms-report-body">${sanitizeHTML(m.summary)}</div>
      </div>` : ''}
      ${sec.files && (m.attachments || []).length ? `
      <div style="margin-top:14px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;color:#767683;margin-bottom:8px;">Attachments (${m.attachments.length})</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">${m.attachments.slice(0, 9).map((a) => `<img src="${esc(a.fileId ? driveThumb(a.fileId, 160) : '')}" style="width:84px;height:84px;object-fit:cover;border-radius:8px;border:1px solid #e4e1ea;" />`).join('')}</div>
      </div>` : ''}
    </div>`;
  wrap.innerHTML = `
    <div style="padding:32px;font-family:Inter,-apple-system,Segoe UI,sans-serif;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:26px;font-weight:800;color:#000666;letter-spacing:-.02em;">MeetSync</div>
        <div style="font-size:12px;color:#767683;margin-top:4px;">Meeting Summaries Report · Generated ${new Date().toLocaleString('th-TH')}</div>
      </div>
      ${meetings.map(row).join('')}
    </div>
    <style>.ms-report-body img{max-width:100%;border-radius:8px}.ms-report-body a{color:#000666}</style>`;
  return wrap;
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function prioColor(p) {
  return { high: '#ba1a1a', medium: '#5c1800', low: '#505f76' }[p] || '#505f76';
}
function prioBg(p) {
  return { high: '#ffdad6', medium: '#ffdbd0', low: '#d3e4fe' }[p] || '#d3e4fe';
}
function prioText(p) {
  return { high: '#93000a', medium: '#390c00', low: '#0b1c30' }[p] || '#0b1c30';
}

function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

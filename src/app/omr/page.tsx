"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import './omr.css';

const CF = {
  GVR: { title: 'GVR AT 6회차 — OMR 마킹 시트', mod: '', secs: [
    { id: 'lc', bg: 'glc', lb: 'LC', nm: 'Listening Comprehension', f: 1, t: 60, ch: ['a','b','c','d'] },
    { id: 'gr', bg: 'ggr', lb: 'GR', nm: 'Grammar', f: 1, t: 50, ch: ['a','b','c','d'] },
    { id: 'vo', bg: 'gvo', lb: 'VO', nm: 'Vocabulary', f: 1, t: 50, ch: ['a','b','c','d'] },
    { id: 'rc', bg: 'grc', lb: 'RC', nm: 'Reading Comprehension', f: 1, t: 40, ch: ['a','b','c','d'] }
  ]},
  MT: { title: '미니테스트 — OMR 마킹 시트', mod: 'omt', secs: [
    { id: 'mt', bg: 'gmt', lb: 'MT', nm: 'Mini Test', f: 1, t: 20, ch: ['1','2','3','4','5'] }
  ]},
  SC: { title: 'SC — OMR 마킹 시트', mod: 'osc', secs: [
    { id: 'sc', bg: 'gsc', lb: 'SC', nm: 'Sentence Completion', f: 1, t: 10, ch: ['A','B','C','D','E','F'] }
  ]}
};

type TabType = 'GVR' | 'MT' | 'SC';

type QState = {
  a: number | null;
  fl: boolean;
  qs: boolean;
};

export default function OmrPage() {
  const [activeTab, setActiveTab] = useState<TabType>('GVR');
  const [states, setStates] = useState<Record<string, QState>>({});
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [foldedSecs, setFoldedSecs] = useState<Record<string, boolean>>({});

  const cfg = CF[activeTab];

  const getState = (sid: string, q: number) => {
    const key = `${sid}_${q}`;
    return states[key] || { a: null, fl: false, qs: false };
  };

  const updateState = (sid: string, q: number, updater: (prev: QState) => QState) => {
    const key = `${sid}_${q}`;
    setStates(prev => ({
      ...prev,
      [key]: updater(prev[key] || { a: null, fl: false, qs: false })
    }));
  };

  const toggleFold = (sid: string) => {
    setFoldedSecs(prev => ({ ...prev, [sid]: !prev[sid] }));
  };

  const setAns = (sid: string, q: number, i: number) => {
    updateState(sid, q, p => ({ ...p, a: p.a === i ? null : i }));
  };

  const toggleFlag = (sid: string, q: number) => {
    updateState(sid, q, p => ({ ...p, fl: !p.fl }));
  };

  const toggleQs = (sid: string, q: number) => {
    updateState(sid, q, p => ({ ...p, qs: !p.qs }));
  };

  const scrollToQ = (sid: string, q: number) => {
    const el = document.getElementById(`QR_${sid}_${q}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const stats = useMemo(() => {
    let a = 0, f = 0, qsCnt = 0, tot = 0;
    cfg.secs.forEach(s => {
      for (let q = s.f; q <= s.t; q++) {
        tot++;
        const st = getState(s.id, q);
        if (st.a !== null) a++;
        if (st.fl) f++;
        if (st.qs) qsCnt++;
      }
    });
    return { a, f, qsCnt, tot, r: tot - a };
  }, [cfg, states]);

  const progressWidth = stats.tot > 0 ? (stats.a / stats.tot) * 100 : 0;

  const handleSaveDraft = () => {
    alert("현재까지의 마킹 내역이 임시저장 되었습니다.");
    window.location.href = "/my_learning";
  };

  return (
    <div className="omr-container">
      <div className="top-sticky">
        <div className="ib">
          <div className="ii">
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div className="itl" id="TTLB">{cfg.title}</div>
              <div className="imt" style={{ marginTop: '6px', lineHeight: 1.4 }}>
                <div>응시일: 2026.03.12 | 제출기한: <strong style={{ color: '#FFD54F', fontSize: '14px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '4px' }}>2026.03.13 23:59</strong></div>
                <div style={{ marginTop: '4px', color: '#aeb8e5', fontSize: '11px' }}><i className="fas fa-flag"></i> 나중에 다시 보려면 보류(플래그) 버튼을 클릭하세요.</div>
              </div>
            </div>
            <div className="tabs-in-header">
              {(['GVR', 'MT', 'SC'] as TabType[]).map(t => (
                <button
                  key={t}
                  className={`tth ${activeTab === t ? 'on' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t === 'MT' ? 'Mini Test' : t}
                </button>
              ))}
            </div>
            <div className="isr" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <div className="ibs"><div className="n">{stats.a}</div><div className="l">응답</div></div>
              <div className="ibs"><div className="n" style={{ color: 'var(--gd)' }}>{stats.r}</div><div className="l">미응답</div></div>
              <div className="ibs"><div className="n" style={{ color: 'var(--gd)' }}>{stats.tot}</div><div className="l">총 문항</div></div>
            </div>
          </div>
        </div>
        <div className="pb"><div className="pf" style={{ width: `${progressWidth}%` }}></div></div>
      </div>

      <div className="mw">
        <div id="SECCOL">
          {cfg.secs.map(s => {
            const isFolded = foldedSecs[s.id];
            const qList = Array.from({ length: s.t - s.f + 1 }, (_, i) => s.f + i);
            
            return (
              <div key={s.id} className="scard">
                <div className="shed" style={{ background: '#ffffff', borderBottom: '2px solid #e0e4e8' }}>
                  <span className={`sbd ${s.bg}`}>{s.lb}</span>
                  <span className="stl" style={{ fontSize: '16px' }}>{s.nm}</span>
                  <span className="ssu">총 {s.t - s.f + 1}문항 &middot; {s.ch.length}지선다</span>
                  <button className="bfd" onClick={() => toggleFold(s.id)}>
                    {isFolded ? '펼치기' : '접기'}
                  </button>
                </div>
                <div className={`sbdy ${isFolded ? 'fd' : ''}`} id={`bd-${s.id}`}>
                  {qList.map(q => {
                    const st = getState(s.id, q);
                    const isA = st.a !== null;
                    return (
                      <div key={q} id={`QR_${s.id}_${q}`} className={`qrow ${st.fl || st.qs ? 'fbg' : ''} ${isA ? 'ok' : ''}`}>
                        <div className={`qnum ${st.fl ? 'qf' : isA ? 'qa' : ''}`} style={st.qs ? { background: '#E91E63' } : {}}>
                          {q}
                        </div>
                        <div className="chs">
                          {s.ch.map((c, i) => (
                            <button
                              key={i}
                              className={`oval ${cfg.mod} ${st.a === i ? ' mk' : ''}`}
                              onClick={() => setAns(s.id, q, i)}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                        <div className="sp"></div>
                        <button className={`flgb ${st.fl ? 'on' : ''}`} onClick={() => toggleFlag(s.id, q)} title="나중에 다시 보기 (플래그)">
                          <i className="fas fa-flag"></i> 보류
                        </button>
                        <button className={`qbtn ${st.qs ? 'on' : ''}`} onClick={() => toggleQs(s.id, q)} title="수업시간 질문 예약">
                          <i className="fas fa-question-circle"></i> 질문
                        </button>
                        <span className="adot"></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        <aside className="si">
          <button className="bsave" onClick={handleSaveDraft}><i className="fas fa-save"></i>&nbsp;임시저장 후 나가기</button>
          <button className="bsub" onClick={() => setConfirmModal(true)} style={{ marginBottom: '15px' }}><i className="fas fa-paper-plane"></i>&nbsp;최종 제출</button>
          <div className="sic">
            <div className="sit"><i className="fas fa-chart-pie" style={{ color: 'var(--nv)' }}></i>&nbsp;진행 현황</div>
            <div className="cps">
              <div className="cp cpa"><div className="cn">{stats.a}</div><div className="cl">응답</div></div>
              <div className="cp cpr"><div className="cn">{stats.r}</div><div className="cl">미응답</div></div>
              <div className="cp cpf"><div className="cn">{stats.f}</div><div className="cl">플래그</div></div>
              <div className="cp cpq"><div className="cn">{stats.qsCnt}</div><div className="cl">질문</div></div>
            </div>
          </div>
          <div className="sic">
            <div className="sit"><i className="fas fa-map" style={{ color: 'var(--nv)' }}></i>&nbsp;내비게이터</div>
            <div className="mmap">
              {cfg.secs.map(s => (
                <React.Fragment key={`map-${s.id}`}>
                  <div style={{ gridColumn: '1/-1', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', color: '#aaa' }}>{s.lb}</div>
                  {Array.from({ length: s.t - s.f + 1 }).map((_, i) => {
                    const q = s.f + i;
                    const st = getState(s.id, q);
                    const cls = `mc ${st.qs ? 'mq' : st.fl ? 'mf' : st.a !== null ? 'ma' : ''}`;
                    return <div key={q} className={cls} onClick={() => scrollToQ(s.id, q)}>{q}</div>;
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {confirmModal && (
        <div className="modov">
          <div className="modb">
            <div style={{ fontSize: '50px', marginBottom: '13px' }}>📝</div>
            <h3>답안을 제출하시겠습니까?</h3>
            <p>제출 후에는 수정이 불가합니다.<br />미응답 <strong style={{ color: 'var(--pk)' }}>{stats.r}</strong>개 &middot; 플래그 <strong style={{ color: 'var(--or)' }}>{stats.f}</strong>개</p>
            <div className="mbtns">
              <button className="bno" onClick={() => setConfirmModal(false)}>다시 확인</button>
              <button className="byes" onClick={() => { setConfirmModal(false); setSuccessModal(true); }}>제출</button>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div className="modov">
          <div className="modb">
            <div style={{ fontSize: '50px', marginBottom: '13px' }}>🎉</div>
            <h3>제출 완료!</h3>
            <p>답안이 제출되었습니다.<br />채점이 완료되면 알림을 보내드립니다.</p>
            <Link href="/review_wrong" className="bgo" style={{ background: 'var(--nv)', color: '#fff' }}>오답노트 바로 보기</Link>
            <Link href="/my_learning" className="bgo" style={{ background: '#f0f0f0', color: '#555' }}>대시보드로</Link>
          </div>
        </div>
      )}
    </div>
  );
}

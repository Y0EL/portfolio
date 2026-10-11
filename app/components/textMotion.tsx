"use client";

import { useEffect } from "react";

const BLOCK = "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dt,dd";
const INLINE = "time,strong,.mono,.textCta";
const TARGET = `${BLOCK},${INLINE}`;
const SKIP = "nav,svg,.stage,.cassette,.miniDeck,[data-still]";
const SCOPE = "main,footer";

export const MOTION_BOOT = `(function(){try{var d=document.documentElement,u=navigator.userAgent;if(/bot|crawl|spider|slurp|lighthouse|headless|inspectiontool/i.test(u))return;if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motionReady");setTimeout(function(){if(!d.classList.contains("motionLive"))d.classList.remove("motionReady")},4000)}catch(e){}})();`;

function pick<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function eligible(el: Element) {
  if (!el.closest(SCOPE) || el.closest(SKIP)) return false;
  if (el.querySelector(BLOCK)) return false;
  const parent = el.parentElement;
  if (parent && parent.closest(TARGET)) return false;
  return true;
}

function split(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.data.trim() && !node.parentElement?.closest("svg")) nodes.push(node);
  }
  let index = 0;
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    node.data.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (!part.trim()) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const word = document.createElement("span");
      word.className = "mWord";
      word.style.setProperty("--w", String(index++));
      const inner = document.createElement("span");
      inner.className = "mInner";
      inner.textContent = part;
      word.appendChild(inner);
      frag.appendChild(word);
    });
    node.replaceWith(frag);
  });
  el.dataset.msplit = "";
}

function lines(el: HTMLElement) {
  let last = -Infinity;
  let line = -1;
  el.querySelectorAll<HTMLElement>(".mWord").forEach((word) => {
    const top = word.getBoundingClientRect().top;
    if (top > last + 4) {
      line += 1;
      last = top;
    }
    word.style.setProperty("--l", String(line));
  });
}

function register(el: HTMLElement, io: IntersectionObserver) {
  if (el.dataset.mstyle) {
    io.observe(el);
    return;
  }
  if (!eligible(el)) return;
  const heading = /^H[1-6]$/.test(el.tagName) && !el.matches(".introTitle");
  const article = !!el.closest(".articleBody");
  const style = heading ? pick(article ? ["words", "blur", "rise"] : ["lines", "words", "blur"]) : pick(["rise", "blur"]);
  if (heading) split(el);
  el.dataset.mstyle = style;
  if (style === "lines") lines(el);
  el.dataset.motion = el.getBoundingClientRect().bottom < 0 ? "above" : "below";
  io.observe(el);
}

export function TextMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motionReady")) return;

    const io = new IntersectionObserver(
      (entries) => {
        let order = 0;
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.setProperty("--md", `${Math.min(order++, 6) * 0.08}s`);
            el.dataset.motion = "in";
            return;
          }
          el.style.setProperty("--md", "0s");
          const edge = entry.rootBounds ? entry.rootBounds.top : 0;
          el.dataset.motion = entry.boundingClientRect.top < edge ? "above" : "below";
        });
      },
      { rootMargin: "-6% 0px -6% 0px" }
    );

    const scan = (node: Element) => {
      if (!node.closest(SCOPE)) return;
      if (node.matches(TARGET)) register(node as HTMLElement, io);
      node.querySelectorAll<HTMLElement>(TARGET).forEach((el) => register(el, io));
    };

    document.querySelectorAll(SCOPE).forEach(scan);
    root.classList.add("motionLive");

    const mo = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          io.unobserve(node);
          node.querySelectorAll("[data-mstyle]").forEach((el) => io.unobserve(el));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const settle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 2) return;
        document.querySelectorAll<HTMLElement>('[data-motion="below"]').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.height && rect.top < window.innerHeight) el.dataset.motion = "in";
        });
      });
    };

    let timer = 0;
    const relayout = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>('[data-mstyle="lines"]').forEach(lines);
      }, 200);
    };

    window.addEventListener("scroll", settle, { passive: true });
    window.addEventListener("resize", relayout);
    settle();

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", settle);
      window.removeEventListener("resize", relayout);
    };
  }, []);

  return null;
}

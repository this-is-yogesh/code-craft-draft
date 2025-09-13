"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Palette,
  Sun,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";
import "../_styles/ThemeSelector.css";

const THEME_ICONS = {
  "vs-dark": <Moon className="icon" />,
  "vs-light": <Sun className="icon" />,
  "github-dark": <Github className="icon" />,
  monokai: <Laptop className="icon" />,
  "solarized-dark": <Cloud className="icon" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="theme-toggle"
      >
        <div className="hover-bg" />

        <Palette className="palette-icon" />

        <span className="theme-label">{currentTheme?.label}</span>

        <div
          className="theme-color-indicator"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="theme-dropdown"
          >
            <div className="dropdown-header">
              <p>Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`dropdown-item ${theme === t.id ? "selected" : ""}`}
                onClick={() => setTheme(t.id)}
              >
                <div className="dropdown-bg" />

                <div
                  className={`dropdown-icon ${theme === t.id ? "selected" : ""}`}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="icon" />}
                </div>

                <span className="dropdown-label">{t.label}</span>

                <div
                  className="theme-color-indicator"
                  style={{ background: t.color }}
                />

                {theme === t.id && (
                  <motion.div
                    className="active-border"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
